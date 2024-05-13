import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ContactCard = () => {
    const contactInfo = useSelector(state => state.contactInfo);
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
            console.log(company[0]);
            // Phone Number Extraction:
            phoneNos = contactInfo[0].phone_no;

            // Email Extraction:
            emails = contactInfo[0].email;

            // Photo Path Extraction:
            photoPath = contactInfo[0].photo_path_url;
        }
        console.log(photoPath);
        setFullName(name);
        setCompany(company);
        setPhoneNo(phoneNos);
        setEmails(emails);
        setPhotoPath(photoPath);
    }, [contactInfo]);
    console.log(phoneNo);
    console.log(emails);
   return (
   <div className='flex flex-col w-full h-fit space-y-4'>
       <div className='flex w-full items-center space-x-6 justify-between'> 
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
        <div className='flex w-full items-center space-x-6 justify-between px-12'>
            <div className='flex border-b-2 pb-1'>
                <h1 className='text-3xl'>Contact Number</h1>
            </div>
            <div className='flex'></div>
        </div>
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
                <h1 className='text-2xl text-right'>{phoneNo['cell']}</h1>
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
        {/* <div className='flex w-full items-center space-x-6 justify-between px-12'>
            <div className='flex border-b-2 pb-1'>
                <h1 className='text-3xl'>Email</h1>
            </div>
            <div className='flex'></div>
        </div> */}
        {/* {phoneNo['pref'].length > 0 && (<div className='flex w-full items-center border-b-2 space-x-6 justify-between px-24'> 
            <div className='flex'>
                <h1 className='text-2xl'>Main</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-2xl text-right'>{phoneNo['pref']}</h1>
            </div>
        </div>)} */}
        {/* {phoneNo['cell'].length > 0 && (<div className='flex w-full items-center border-b-2 space-x-6 justify-between px-24'> 
            <div className='flex'>
                <h1 className='text-2xl'>Cell</h1>
            </div>
            <div className='flex'> 
                <h1 className='text-2xl text-right'>{phoneNo['cell']}</h1>
            </div>
        </div>)} */}
   </div>
   )
};

export default ContactCard;