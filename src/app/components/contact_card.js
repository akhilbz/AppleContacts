import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline"; 
import { setShowDropUp, setContactInfo, setNewContactInstance, setUploadAlert, setNotifySelectedContact } from '../action';
import ContactCardDropUp from './contact_card_dropup';
import EditContactCard from './edit_contact_card';
import NewContactCard from './new_contact_card';

const ContactCard = ({ listsColumnWidth, setListsColumnWidth }) => {
    const dispatch = useDispatch();
    const contactInfo = useSelector(state => state.contactInfo);
    const contactsLength = useSelector(state => state.contactsLength);
    const showDropUp = useSelector(state => state.showDropUp);
    const [contact, setContact] = useState(null);
    const [contactId, setContactId] = useState(0);
    const [fullName, setFullName] = useState("");
    const [company, setCompany] = useState("");
    const [phoneNo, setPhoneNo] = useState([]);
    const [emails, setEmails] = useState([]);
    const [photoPath, setPhotoPath] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const newContactInstance = useSelector(state => state.newContactInstance);
    const selectedList = useSelector(state => state.selectedList);
    const lists = useSelector(state => state.lists);
    const dropUpRef = useRef(null);
    const [editedContacts, setEditedContacts] = useState(null);
    const [newContact, setNewContact] = useState({
        full_name: [""],
        company: "",
        photo_path: "",
        phone_no: {"cell": [], "home": [], "pref": []},
        email: {"home": [], "internet": []},
    });
    
    const handleClickOutside = (event) => {
    if (dropUpRef.current && !dropUpRef.current.contains(event.target)) {
        dispatch(setShowDropUp(false));
    }
    };

    useEffect(() => {
    if (showDropUp) {
        document.addEventListener('mousedown', handleClickOutside);
    } else {
        document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, [showDropUp]);

    useEffect(() => {
        let id = 0;
        let name = "";
        let company = "";
        let phoneNos = [];
        let emails = [];
        let photoPath = "";
        
        
        if (contactInfo) {
            // ID Extraction:
            id = contactInfo.id
            // Name Extraction:
            if (contactInfo.full_name.length == 3 && contactInfo.full_name[1] == ' ') {
                name = contactInfo.full_name.join('');
            } else if (contactInfo.full_name == '')  {
                name = "No Name";
            } else {
                name = contactInfo.full_name.join(' ');
            }

            // Company Extraction:
            company = contactInfo.company;
            // Phone Number Extraction:
            phoneNos = contactInfo.phone_no;

            // Email Extraction:
            emails = contactInfo.email;

            // Photo Path Extraction:
            // photoPath = "file://" + contactInfo[0].photo_path;
            photoPath = contactInfo.photo_path;
        }
        setContact(contactInfo);
        setContactId(id);
        setFullName(name);
        setCompany(company);
        setPhoneNo(phoneNos);
        setEmails(emails);
        setPhotoPath(photoPath);
        setEditedContacts({
            id: id,
            full_name: name,
            company: company,
            photo_path: photoPath,
            phone_no: phoneNos,
            email: emails,
            url: `http://127.0.0.1:3000/contacts/${id}.json`
        })
    }, [contactInfo]);
    // console.log(contactInfo);
    // console.log(phoneNo.length != 0 && emails.length != 0 && company == "" && phoneNo['pref'].length == 0 && phoneNo['cell'].length == 0 
    // && phoneNo['home'].length == 0 && emails['home'].length == 0 && 
    // emails['internet'].length == 0);
    useEffect(() => {
        const updateContact = async () => {
            try {
                const response = await axios.put(`http://127.0.0.1:3000/contacts/${contactId}.json`, editedContacts);
                // console.log(response);
                try {
                    const response = await axios.get(`http://127.0.0.1:3000/contacts/${contactId}.json`)
                    dispatch(setContactInfo(response.data));
                } catch (err) {
                    // console.log(err);
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (!showEdit) {
            updateContact();
        }
    }, [showEdit]);

    const createNewContact = async () => {

        try {
            const payload = {
                contact: newContact,
                list_id: lists[selectedList].id
            };
            const response = await axios.post(`http://127.0.0.1:3000/contacts.json`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
            console.log(response);
            const contact_name = response.data.full_name;
            const charPos = contact_name[contact_name.length - 1].toLowerCase().charAt(0).charCodeAt(0) 
            - 'a'.charCodeAt(0);
            
            dispatch(setNotifySelectedContact({char_pos: charPos, letter: contact_name[contact_name.length - 1].charAt(0)}));
            dispatch(setNewContactInstance(!newContactInstance));
            dispatch(setUploadAlert(6));
            dispatch(setContactInfo(response.data));
            setNewContact({
                full_name: [""],
                company: "",
                photo_path: "",
                phone_no: {"cell": [], "home": [], "pref": []},
                email: {"home": [], "internet": []},
            });
        } catch (err) {
            console.log(err);
        } 
    };

    const cancelNewContact = () => {
        dispatch(setNewContactInstance(!newContactInstance));
        setNewContact({
            full_name: [""],
            company: "",
            photo_path: "",
            phone_no: {"cell": [], "home": [], "pref": []},
            email: {"home": [], "internet": []},
        });
    };


    return (
    <section className='flex flex-col w-full h-full'>
    {(contactsLength == 0 || contact == null) && !showEdit && !newContactInstance &&
    (<div className='flex w-full h-full items-end justify-center '>
        <h1 className='text-[#4a4a4a] font-semibold text-xl'>{ contactsLength == 0 ? "No Cards" : contact == null ? "No Contact Selected" : "No Cards"  }</h1>
    </div>)}
   <div className='flex flex-col w-full h-full justify-between space-y-4 '>
   {(contactsLength != 0 && contact != null && !showEdit && !newContactInstance) && 
    (<div className='flex flex-col overflow-y-auto w-full h-fit font-light space-y-4'>
        <div className='flex w-full items-center space-x-6 justify-between pb-6'> 
                <div className='w-28 h-28 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center'>
                    <img src={photoPath} alt="Profile" className="w-full h-full object-cover" />
                </div>

                <div className='flex-1 border-b-[1px] border-[#7c7c7c] pb-2'> 
                    <h1 className='text-4xl text-right text-[#d4d4d4]'>{ fullName }</h1>
                </div>
            </div>
            {company && (<div className='flex w-full border-b-[1px] text-[#cdcdcd] border-[#7c7c7c] pb-1 items-center px-5 justify-between'>
                <div className='flex'>
                    <h1 className='text-xl'>company</h1>
                </div>
                <div className='flex'> 
                    <h1 className='text-xl text-right'>{ company }</h1>
                </div>
            </div>)}
            {phoneNo.length != 0 && (<> 
            {phoneNo['pref'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                <div className='flex'>
                    <h1 className='text-xl'>phone</h1>
                </div>
                <div className='flex'> 
                    <h1 className='text-xl text-right truncate'>{phoneNo['pref']}</h1>
                </div>
            </div>)}
            {phoneNo['cell'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                <div className='flex'>
                    <h1 className='text-xl'>cell</h1>
                </div>
                <div className='flex'> 
                    <h1 className='text-xl text-right truncate'>{phoneNo['cell']}</h1>
                </div>
            </div>)}
            {phoneNo['home'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                <div className='flex'>
                    <h1 className='text-xl'>home</h1>
                </div>
                <div className='flex'> 
                    <h1 className='text-xl text-right truncate'>{phoneNo['home']}</h1>
                </div>
            </div>)}
            </>) }
            {emails.length != 0 && (
                <> {emails['home'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                <div className='flex'>
                    <h1 className='text-xl'>email</h1>
                </div>
                <div className='flex'> 
                    <h1 className='text-xl text-right truncate'>{emails['home']}</h1>
                </div>
            </div>)}
            {emails['internet'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                <div className='flex'>
                    <h1 className='text-xl'>other</h1>
                </div>
                <div className='flex'> 
                    <h1 className='text-xl text-right truncate'>{emails['internet']}</h1>
                </div>
            </div>)}
            </>)}
            {phoneNo.length != 0 && emails.length != 0 && (<>
            {company == "" && phoneNo['pref'].length == 0 && phoneNo['cell'].length == 0 
            && phoneNo['home'].length == 0 && emails['home'].length == 0 && 
            emails['internet'].length == 0 && !showEdit && !newContactInstance && (<div className='flex flex-col w-full h-96 justify-center items-center'>
                    <h1 className='text-[#4a4a4a] font-semibold text-xl'>No Contact Information Provided</h1>
            </div>)}
            </>)}
        </div>)}
        {(contactsLength != 0 && contact != null && !newContactInstance && showEdit) && 
        (<EditContactCard editedContacts={editedContacts} setEditedContacts={setEditedContacts} />)}
        {(newContactInstance && !showEdit) && 
        (<NewContactCard newContact={newContact} setNewContact={setNewContact}/>)}
    </div>
    
    <div className='relative flex w-full justify-between h-11 rounded-xl bg-[#4a4a4a] p-1'>
        {showDropUp && (<div className='absolute w-fit bottom-12 flex flex-col z-[5] gap-4 bg-[#141414] p-2 rounded-lg shadow-lg' ref={dropUpRef}>
        <ContactCardDropUp contactInfo={contact} />
        </div>)}
        <div className='h-9 w-16 bg-[#141414] rounded-lg flex justify-center items-center cursor-pointer' 
        onClick={() => dispatch(setShowDropUp(true))} >
        <IoAddOutline size={30} color="#9B9B9B"/>
        </div>
        <div className="flex space-x-2">
        {contact != null && !newContactInstance && (<div className='h-9 w-fit bg-[#141414] rounded-lg flex justify-center items-center cursor-pointer opacity-1 transition-opacity duration-500'
        onClick={() => setShowEdit(!showEdit)}>
            <h1 className={`${showEdit ? "text-[#66b3ff]" : "text-[#9B9B9B]"} font-normal px-6`}>{showEdit ? "Done" : "Edit"}</h1>
        </div>)}
        {newContactInstance && (<div className='h-9 w-fit bg-[#141414] rounded-lg flex justify-center items-center cursor-pointer opacity-1 transition-opacity duration-500'
        onClick={cancelNewContact}>
            <h1 className={` text-[#9B9B9B] font-normal px-6`}>Cancel</h1>
        </div>)}
        {newContactInstance && (<div className='h-9 w-fit bg-[#141414] rounded-lg flex justify-center items-center cursor-pointer opacity-1 transition-opacity duration-500'
        onClick={createNewContact}>
            <h1 className={`${newContactInstance ? "text-[#66b3ff]" : "text-[#9B9B9B]"} font-normal px-6`}>Create New Contact</h1>
        </div>)}
        {listsColumnWidth === 0 && (
            <div className='h-9 w-fit bg-[#141414] rounded-lg flex justify-center items-center cursor-pointer'
            onClick={() => {setListsColumnWidth(20)}}>
                <h1 className='text-[#9B9B9B] font-normal px-2'>Show Lists</h1>
            </div>
        )}
        </div>
    </div>
   </section>
   )
};

export default ContactCard;