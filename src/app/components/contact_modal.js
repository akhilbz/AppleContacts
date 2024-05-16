import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setShowModal } from '../action';
import { X } from 'lucide-react';
function ContactModal() {
    const dispatch = useDispatch();
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex justify-center items-center'>
            <div className="w-[80%] h-[90%] flex flex-col text-white bg-[#141414] rounded-xl p-3">
                <button className='place-self-end' onClick={() => dispatch(setShowModal(false))}><X size={30} /></button>
                <div>

                </div>
            </div>
        </div>
    )
}

export default ContactModal;