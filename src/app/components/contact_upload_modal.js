import React, { useState, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setShowModal, setUploadAlert } from '../action';
import { MdOutlineFileUpload } from "react-icons/md";
import { X } from 'lucide-react';

function ContactModal() {
    const fileTypes = ["vcf"];
    const [file, setFile] = useState(null);
    const [incorrectFileAlert, setIncorrectFileAlert] = useState(false);
    const dispatch = useDispatch();
    const selectedList = useSelector(state => state.selectedList);

    const handleChange = (file) => {
        if (file?.name.split('.').pop() === "vcf") {
            setIncorrectFileAlert(false);
            setFile(file);
        } else {
            setIncorrectFileAlert(true);
        }
        
    };

    console.log(file);

    const handleSubmit = () => {
        console.log(file.path);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', selectedList);
    
        axios.post('http://127.0.0.1:3000/upload-vcf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log('File uploaded successfully:', response.data);
          dispatch(setUploadAlert(true));
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    };


    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex flex-col justify-center items-center'>
            <div className="w-[80%] h-[70%] flex flex-col text-white bg-[#141414] rounded-xl p-5">
                <div className="flex flex-row w-full justify-between">
                    <h1 className=' text-2xl text-[#d4d4d4] font-semibold'>Upload VCF File</h1>
                    <button className='place-self-end' onClick={() => {dispatch(setShowModal(false)); dispatch(setUploadAlert(false)); }}><X size={30} color='#d4d4d4' /></button>
                </div>
                <div className='p-6 w-full h-full'>
                <Dropzone onDrop={acceptedFiles => {
                    handleChange(acceptedFiles[0]);
                    console.log(acceptedFiles[0]);
                    }}>
                    {({getRootProps, getInputProps}) => (
                        <section className='w-full h-full'>
                        <div {...getRootProps()} className='w-full h-full bg-[#242424] rounded-xl flex items-center justify-center'>
                            <input {...getInputProps()} />
                            <div className="w-full flex flex-col justify-center h-full items-center">
                                <MdOutlineFileUpload size={100} color="#343434" className=" "/>
                                <p className='text-[#4f4f4f]'>Drag and drop a VCF file to import contacts.</p>
                            </div>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                </div>
                <div className='flex flex-row w-[full] justify-evenly items-center h-[15%] bg-[#111111] rounded-xl mx-5'>
                    <h1 className={`text-[#343434] ${incorrectFileAlert ? "text-[#e63946]" : "text-[#343434]"} text-xl`}>{`Uploaded File: ${ incorrectFileAlert ? "Incorrect File Type - Must Use (.vcf)" : file ? file.name : "No File Uploaded"}`}</h1>
                    <button disabled={!file} className={`w-fit p-2 ${file ? 'bg-[#545454] text-[#141414] cursor-pointer' : 'bg-[#4a4a4a] text-[#242424] cursor-default'}  rounded-lg flex justify-center items-center cursor-pointer`}
                    onClick={() => { handleSubmit(); dispatch(setShowModal(false));}}>
                        <h1 className='text-center'>Extract Contacts</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContactModal;