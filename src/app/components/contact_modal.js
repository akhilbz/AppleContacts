import React, { useState, useCallback } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch } from 'react-redux';
import { setShowModal } from '../action';
import { FileUploader } from "react-drag-drop-files";

import { X } from 'lucide-react';
function ContactModal() {
    const fileTypes = ["vcf"];
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (file) => {
        setFile(file);
      };

    //   console.log(file);

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex justify-center items-center'>
            <div className="w-[80%] h-[90%] flex flex-col text-white bg-[#141414] rounded-xl p-3">
                <button className='place-self-end' onClick={() => dispatch(setShowModal(false))}><X size={30} /></button>
                <div className='p-6 w-full h-full'>
                <Dropzone onDrop={acceptedFiles => {
                    handleChange(acceptedFiles[0]);
                    console.log(acceptedFiles[0]);
                    }}>
                    {({getRootProps, getInputProps}) => (
                        <section className='w-full h-full'>
                        <div {...getRootProps()} className='w-full h-full bg-[#242424] rounded-xl'>
                            <input {...getInputProps()} />
                        </div>
                        </section>
                    )}
                    </Dropzone>
                </div>
            </div>
        </div>
    )
}

export default ContactModal;