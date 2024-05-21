import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline"; 
import { setShowModal } from '../action';
const ContactCard = () => {
    const dispatch = useDispatch();
    const contactInfo = useSelector(state => state.contactInfo);
    const [contacts, setContacts] = useState(null);
    const [fullName, setFullName] = useState("");
    const [company, setCompany] = useState("");
    const [phoneNo, setPhoneNo] = useState([]);
    const [emails, setEmails] = useState([]);
    const [photoPath, setPhotoPath] = useState("");

    useEffect(() => {
        let name = "";
        let company = "";
        let phoneNos = [];
        let emails = [];
        let photoPath = "";
        console.log(contactInfo);
        
        if (contactInfo.length > 0) {
            // Name Extraction:
            if (contactInfo[0].full_name.length == 3 && contactInfo[0].full_name[1] == ' ') {
                name = contactInfo[0].full_name.join('');
            } else if (contactInfo[0].full_name[0] == '')  {
                name = "No Name";
            } else {
                name = contactInfo[0].full_name.join(' ');
            }

            // Company Extraction:
            company = contactInfo[0].company;
            // console.log(company);
            // Phone Number Extraction:
            phoneNos = contactInfo[0].phone_no;

            // Email Extraction:
            emails = contactInfo[0].email;

            // Photo Path Extraction:
            photoPath = contactInfo[0].photo_path;
        }
        // console.log(photoPath);
        if (contactInfo.length != 0) setContacts(contactInfo);
        setFullName(name);
        setCompany(company);
        setPhoneNo(phoneNos);
        setEmails(emails);
        setPhotoPath(photoPath);
    }, [contactInfo]);
    // console.log(phoneNo);
    // console.log(emails);
   return (
    <>
    {contacts == null && 
    (<div className='flex w-full h-full items-center justify-center'>
        <h1 className='text-[#4a4a4a] font-semibold text-xl'>No Contact Selected</h1>
    </div>)}
   {contacts != null && 
   (<div className='flex flex-col w-full h-full justify-between space-y-4'>
    <div className='flex flex-col overflow-y-auto w-full h-fit space-y-4'>
       <div className='flex w-full items-center space-x-6 justify-between pb-6'> 
            <div className='w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center'>
                {/* <img src={photoPath} alt="Profile" className="w-full h-full object-cover" /> */}
            </div>

            <div className='flex-1 border-b-4 pb-4'> 
                <h1 className='text-6xl text-right'>{ fullName }</h1>
            </div>
        </div>
        {company && (<div className='flex w-full border-b-[3px] pb-3 items-center space-x-6 justify-between'>
            <div className='flex'>
                <h1 className='text-4xl'>Company</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-4xl text-right'>{ company }</h1>
            </div>
        </div>)}
        {phoneNo.length != 0 && (
            <> {(phoneNo['pref'].length > 0 || phoneNo['cell'].length > 0 ||
        phoneNo['home'].length > 0) && (<div className='flex w-full items-center space-x-6 justify-between px-12'>
            <div className='flex border-b-2 pb-1'>
                <h1 className='text-3xl'>Contact Number</h1>
            </div>
            <div className='flex'></div>
        </div>)}
        {phoneNo['pref'].length > 0 && (<div className='flex w-full items-center border-b-2 space-x-6 justify-between px-24'> 
            <div className='flex'>
                <h1 className='text-2xl'>Main</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-2xl text-right'>{phoneNo['pref']}</h1>
            </div>
        </div>)}
        {phoneNo['cell'].length > 0 && (<div className='flex w-full items-center border-b-2 space-x-6 justify-between px-24'> 
            <div className='flex'>
                <h1 className='text-2xl'>Cell</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-2xl text-right'>{phoneNo['cell'][0]}</h1>
            </div>
        </div>)}
        {phoneNo['home'].length > 0 && (<div className='flex w-full items-center border-b-2 space-x-6 justify-between px-24'> 
            <div className='flex'>
                <h1 className='text-2xl'>Home</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-2xl text-right'>{phoneNo['home']}</h1>
            </div>
        </div>)}
        </>) }
        {emails.length != 0 && (
            <> {(emails['home'].length > 0 || 
        emails['internet'].length > 0) && (<div className='flex w-full items-center space-x-6 justify-between px-12'>
            <div className='flex border-b-2 pb-1'>
                <h1 className='text-3xl'>Email</h1>
            </div>
            <div className='flex'></div>
        </div>)}
        {emails['home'].length > 0 && (<div className='flex w-full items-center border-b-2 space-x-6 justify-between px-24'> 
            <div className='flex'>
                <h1 className='text-2xl'>Main</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-2xl text-right'>{emails['home']}</h1>
            </div>
        </div>)}
        {emails['internet'].length > 0 && (<div className='flex w-full items-center border-b-2 space-x-6 justify-between px-24'> 
            <div className='flex'>
                <h1 className='text-2xl'>Cell</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-2xl text-right'>{emails['internet']}</h1>
            </div>
        </div>)}
        </>)}
     </div>

     <div className='flex w-full h-11 rounded-xl bg-gray-200 p-1 items-center'>
        <div className='h-9 w-16 bg-[#141414] rounded-lg flex justify-center items-center cursor-pointer'>
            <IoAddOutline size={30} color="#d4d4d4" className=" " onClick={() => dispatch(setShowModal(true))}/>
        </div>
        <div>
            
        </div>
     </div>
   </div>)}
   </>
   )
};

export default ContactCard;