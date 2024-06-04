import React from 'react';
import { useSelector } from 'react-redux';
import {  } from '../action';

const EditContactCardDropdown = ({ editedContacts, setEditedContacts }) => {

    const handleCompanyChange = () => {
        setEditedContacts({
            ...editedContacts,
            company: 'company_name',
        });
    };

    const handlePhonePreferredChange = () => {
        setEditedContacts({
            ...editedContacts,
            phone_no: {
                ...editedContacts.phone_no,
                ['pref']: [''],
            },
        });
    };

    const handlePhoneCellChange = () => {
        setEditedContacts({
            ...editedContacts,
            phone_no: {
                ...editedContacts.phone_no,
                ['cell']: [''],
            },
        });
    };

    const handlePhoneHomeChange = () => {
        setEditedContacts({
            ...editedContacts,
            phone_no: {
                ...editedContacts.phone_no,
                ['home']: [''],
            },
        });
    };

    const handleEmailHomeChange = () => {
        setEditedContacts({
            ...editedContacts,
            email: {
                ...editedContacts.email,
                ['home']: [''],
            },
        });
    };

    const handleEmailOtherChange = () => {
        setEditedContacts({
            ...editedContacts,
            email: {
                ...editedContacts.email,
                ['internet']: [''],
            },
        });
    };
//   console.log("editedContacts: ", editedContacts);
  return (
    <>
      <ul className="text-[#9B9B9B] cursor-pointer">
        <li><button disabled={editedContacts.company != ""} onClick={handleCompanyChange} className={`flex w-full h-fit rounded-lg ${editedContacts.company == "" ? "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`}>Add Company</button></li>
        <li><button disabled={editedContacts.phone_no['pref'].length != 0} onClick={handlePhonePreferredChange} className={`flex w-full h-fit rounded-lg ${editedContacts.phone_no['pref'].length == 0 ? "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`}>Add Phone No.</button></li>
        <li><button disabled={editedContacts.phone_no['cell'].length != 0} onClick={handlePhoneCellChange} className={`flex w-full h-fit rounded-lg ${editedContacts.phone_no['cell'].length == 0 ? "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`}>Add Cell No.</button></li>
        <li><button disabled={editedContacts.phone_no['home'].length != 0} onClick={handlePhoneHomeChange} className={`flex w-full h-fit rounded-lg ${editedContacts.phone_no['home'].length == 0 ? "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`}>Add Home No.</button></li>
        <li><button disabled={editedContacts.email['home'].length != 0} onClick={handleEmailHomeChange} className={`flex w-full h-fit rounded-lg ${editedContacts.email['home'].length == 0 ? "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`}>Add Main Email</button></li>
        <li><button disabled={editedContacts.email['internet'].length != 0} onClick={handleEmailOtherChange} className={`flex w-full h-fit rounded-lg ${editedContacts.email['internet'].length == 0 ? "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`}>{`Add Other Email(s)`}</button></li>
      </ul>
    </>
  );
}

export default EditContactCardDropdown;
