from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.db.models import Q
from io import BytesIO
from PIL import Image
from decouple import config
from .models import Contact
from .contact_serializer import ContactSerializer
import os, vobject, base64


# Create your views here.

# Home page
def home(request):
    return HttpResponse("Welcome to Apple Contacts (with a twist)!")

# Serializes pulled data from database to a JSON representation
class ContactList(ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


# Reads and converts a vcf file into a parseable string
def read_and_convert_vcf_to_string(): # TODO: must pass in a file_path into this function
    # Path to my VCF file on the server
    file_path = os.path.join(config('VCF_FILE_PATH'), 'contacts.vcf')
    try:
        with open(file_path, 'r') as file:
            file_content = file.read().split("BEGIN:VCARD")
            file_content = ['BEGIN:VCARD' + vcard_data for vcard_data in file_content if vcard_data.strip()]

            return file_content
    #     return HttpResponse(file_content, content_type='text/plain')
    except Exception as e:
        return HttpResponse(f"Error reading file: {str(e)}", status=500)

# converts the full name string into a list of the first and last name(s)
def store_full_name_as_list(name):
    full_name = name.split(' ')
    
    for i in range(len(full_name)):
        if full_name[i].startswith(' ') or full_name[i].endswith(' '):
            full_name[i] = full_name[i].strip()
            
    if len(full_name) > 1 and full_name[-1] == '':
        full_name.pop()
    return full_name

# stores all telephone matched with their specific types in the dictionary
def store_telephone_nos(tel_list):
    tel_nos = {'cell': [], 'pref': [], 'home': []}

    for tel in tel_list:
        types = tel.params.get('TYPE', [])
        
        if 'CELL' in types:
            tel_nos['cell'].append(tel.value) 
        elif 'pref' in types:
            tel_nos['pref'].append(tel.value) 
        elif 'HOME' in types:
            tel_nos['home'].append(tel.value) 

    return tel_nos

# stores all emails matched with their specific types in the dictionary
def store_emails(email_list):
    emails = {'internet': [], 'home': []}

    for email in email_list:
        types = email.params.get('TYPE', [])
        
        if 'HOME' in types:
            emails['home'].append(email.value) 
        elif 'INTERNET' in types:
            emails['internet'].append(email.value) 

    return emails
        
# extracts encoded image and saves it locally for later retrieval
def extract_and_save_image(image_data, file_name, folder_path):
    if not image_data:
        return str(config('DEFAULT_PROFILE_PIC_PATH'))
    
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)    
    
    image_path = os.path.join(folder_path, f"{file_name if file_name else 'unnamed'}.jpeg")
        
    with open(image_path, 'wb') as image_file:
        image_file.write(image_data)
    
    return image_path
        
   

# iterates through each vcard from the vcard content list and extracts each
# attribute from the vcard to populate the mysql db.
def parsed_vcf(request):
    file_content = read_and_convert_vcf_to_string()
    errors = []
    
    for v_card_content in file_content:
        vcard = vobject.readOne( v_card_content )
        fn = vcard.fn.value if hasattr(vcard, 'fn') else ''
        tel_nos = vcard.tel_list if hasattr(vcard, 'tel') else []
        emails = vcard.email_list if hasattr(vcard, 'email') else []
        photo_data = vcard.photo.value if hasattr(vcard, 'photo') else ''
        
        fn_list = store_full_name_as_list(fn)
        photo_path = extract_and_save_image(photo_data, fn_list[0].lower(), config('PHOTO_FOLDER_PATH'))
        email_data = store_emails(emails)
        phone_no = store_telephone_nos(tel_nos)
        company = vcard.org.value[0] if hasattr(vcard, 'org') else ''
        try:
            existing_contact = Contact.objects.filter(
                Q(full_name=fn_list) & 
                Q(company=company) & 
                Q(photo_path=photo_path) &
                Q(email=email_data) &
                Q(phone_no=phone_no)).exists()
            
            if not existing_contact:
                contact = Contact(
                    full_name=fn_list,
                    photo_path=photo_path,
                    email=email_data,
                    phone_no=phone_no,
                    company=company)
                contact.save()
        except Exception as e:
            errors.append(f"Failed to process contact {fn}: {str(e)}")

    if errors:
        return JsonResponse({"success": False, "errors": errors}, status=500)
    
    return JsonResponse({"success": True, "message": "All contacts imported successfully"})