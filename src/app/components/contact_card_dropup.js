import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowModal, setShowListManagementModal } from '../action';

const ContactCardDropUp = ({ contactInfo }) => {
  const dispatch = useDispatch();
  
  return (
    <>
      <ul className="text-[#9B9B9B] cursor-pointer">
        <li><div className='flex w-full h-fit rounded-lg hover:bg-[#007aff] hover:text-[#d4d4d4] px-2 py-1'>New Contact</div></li>
        <li><div className='flex w-full h-fit rounded-lg hover:bg-[#007aff] hover:text-[#d4d4d4] px-2 py-1'>Delete Contact</div></li>
        <li><div className='flex w-full h-fit rounded-lg hover:bg-[#007aff] hover:text-[#d4d4d4] px-2 py-1'
            onClick={() => dispatch(setShowListManagementModal(1))}>New List</div></li>
        <li className="w-full"><div className='w-full h-fit flex flex-col'>
            <div className='flex w-full h-fit rounded-lg hover:bg-[#007aff] hover:text-[#d4d4d4] px-2 py-1'
            onClick={() => dispatch(setShowListManagementModal(2))}>Empty List</div>
            <div className='border-b-[1px] border-[#2f2f2f] mx-1 pb-1'></div>
        </div></li>
        <li><div className='flex w-full h-fit rounded-lg hover:bg-[#007aff] hover:text-[#d4d4d4] px-2 py-1' 
            onClick={() => dispatch(setShowModal(true))}>Upload Contacts</div></li>
      </ul>
    </>
  );
}

export default ContactCardDropUp;
