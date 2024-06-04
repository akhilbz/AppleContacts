import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowModal, setShowListManagementModal, setNewContactInstance } from '../action';

const ContactCardDropUp = ({ contactInfo }) => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists);
  const contactsLength = useSelector(state => state.contactsLength);

  return (
    <>
      <ul className="text-[#9B9B9B] cursor-pointer">
        <li><button disabled={lists.length == 0} onClick={() => dispatch(setNewContactInstance(true))} 
        className={`flex w-full h-fit rounded-lg ${lists.length != 0 ? "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`}>New Contact</button></li>
        <li><button disabled={(lists.length == 0 || contactsLength == 0)} 
        className={`flex w-full h-fit rounded-lg ${(lists.length != 0 && contactsLength != 0) ? 
        "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`}
        onClick={() => dispatch(setShowListManagementModal(4))}>Delete Contact</button></li>
        <li><button className={`flex w-full h-fit rounded-lg hover:bg-[#007aff] hover:text-[#d4d4d4] px-2 py-1`}
            onClick={() => dispatch(setShowListManagementModal(1))}>New List</button></li>
        <li className="w-full"><button disabled={(lists.length == 0 || contactsLength == 0)} 
        className={`flex w-full h-fit rounded-lg ${(lists.length != 0 && contactsLength != 0) ? "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`}
            onClick={() => dispatch(setShowListManagementModal(2))}>Empty List</button>
            <div className='border-b-[1px] border-[#2f2f2f] mx-1 pb-1'></div></li>
        <li><button disabled={lists.length == 0} 
        className={`flex w-full h-fit rounded-lg ${lists.length != 0 ? "hover:bg-[#007aff] hover:text-[#d4d4d4]" : ""}  px-2 py-1`} 
            onClick={() => dispatch(setShowModal(true))}>Upload Contacts</button></li>
      </ul>
    </>
  );
}

export default ContactCardDropUp;
