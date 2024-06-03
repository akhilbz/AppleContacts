import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline"; 
import { setShowDropUp } from '../action';
import ContactCardDropUp from './contact_card_dropup';

const ContactCard = ({ listsColumnWidth, setListsColumnWidth }) => {
    const dispatch = useDispatch();
    const contactInfo = useSelector(state => state.contactInfo);
    const contactsLength = useSelector(state => state.contactsLength);
    const showDropUp = useSelector(state => state.showDropUp);
    const [contact, setContact] = useState(null);
    const [fullName, setFullName] = useState("");
    const [company, setCompany] = useState("");
    const [phoneNo, setPhoneNo] = useState([]);
    const [emails, setEmails] = useState([]);
    const [photoPath, setPhotoPath] = useState("");
    const dropUpRef = useRef(null);

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
    // console.log(contactInfo);
    useEffect(() => {
        let name = "";
        let company = "";
        let phoneNos = [];
        let emails = [];
        let photoPath = "";
        
        
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
            // photoPath = "file://" + contactInfo[0].photo_path;
            photoPath = "file:///Users/akhileshbitla/Work/projects/contacts/src/photo_storage/akhilesh.jpeg"
        }
        // console.log(photoPath);
        if (contactInfo.length != 0) setContact(contactInfo);
        setFullName(name);
        setCompany(company);
        setPhoneNo(phoneNos);
        setEmails(emails);
        setPhotoPath(photoPath);
    }, [contactInfo]);
    // console.log(contactsLength);
   return (
    <section className='flex flex-col w-full h-full'>
    {(contactsLength == 0 || contact == null) && 
    (<div className='flex w-full h-full items-end justify-center '>
        <h1 className='text-[#4a4a4a] font-semibold text-xl'>{ contactsLength == 0 ? "No Cards" : contact == null ? "No Contact Selected" : "No Cards"  }</h1>
    </div>)}
   <div className='flex flex-col w-full h-full justify-between space-y-4 '>
   {(contactsLength != 0 && contact != null) && 
   (<div className='flex flex-col overflow-y-auto w-full h-fit text-[#d4d4d4] space-y-4'>
       <div className='flex w-full items-center space-x-6 justify-between pb-6'> 
            <div className=' w-28 h-28  bg-gray-200 rounded-full overflow-hidden flex items-center justify-center'>
                <img src={photoPath} alt="Profile" className="w-full h-full object-cover" />
            </div>

            <div className='flex-1 border-b-[1px] border-[#7c7c7c] pb-2'> 
                <h1 className='text-4xl text-right font-light'>{ fullName }</h1>
            </div>
        </div>
        {company && (<div className='flex w-full border-b-[1px] border-[#7c7c7c] pb-2 items-center px-5 justify-between'>
            <div className='flex'>
                <h1 className='text-xl'>company</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-xl text-right'>{ company }</h1>
            </div>
        </div>)}
        {phoneNo.length != 0 && (<> 
        {phoneNo['pref'].length > 0 && (<div className='flex w-full items-center border-b-[1px] border-[#7c7c7c] justify-between px-5'> 
            <div className='flex'>
                <h1 className='text-xl'>phone</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-xl text-right truncate'>{phoneNo['pref']}</h1>
            </div>
        </div>)}
        {phoneNo['cell'].length > 0 && (<div className='flex w-full items-center border-b-[1px] border-[#7c7c7c] justify-between px-5'> 
            <div className='flex'>
                <h1 className='text-xl'>cell</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-xl text-right truncate'>{phoneNo['cell'][0]}</h1>
            </div>
        </div>)}
        {phoneNo['home'].length > 0 && (<div className='flex w-full items-center border-b-[1px] border-[#7c7c7c] justify-between px-5'> 
            <div className='flex'>
                <h1 className='text-xl'>home</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-xl text-right truncate'>{phoneNo['home']}</h1>
            </div>
        </div>)}
        </>) }
        {emails.length != 0 && (
            <> {emails['home'].length > 0 && (<div className='flex w-full items-center border-b-[1px] border-[#7c7c7c] justify-between px-5'> 
            <div className='flex'>
                <h1 className='text-xl'>email</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-xl text-right truncate'>{emails['home']}</h1>
            </div>
        </div>)}
        {emails['internet'].length > 0 && (<div className='flex w-full items-center border-b-[1px] border-[#7c7c7c] justify-between px-5'> 
            <div className='flex'>
                <h1 className='text-xl'>other</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-xl text-right truncate'>{emails['internet']}</h1>
            </div>
        </div>)}
        </>)}
    </div>)}
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
        {contact != null && (<div className='h-9 w-fit bg-[#141414] rounded-lg flex justify-center items-center cursor-pointer opacity-1 transition-opacity duration-500'>
            <h1 className='text-[#9B9B9B] font-normal px-6'>Edit</h1>
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