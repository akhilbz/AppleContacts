import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setShowPhotoModal, setPhotoData } from '../action';
import { MdOutlineFileUpload } from "react-icons/md";
import { X } from 'lucide-react';
import { IoPerson } from "react-icons/io5";


function ContactPhotoModal({ current_photo }) {
    const [photo, setPhoto] = useState(null);
    const [photoPath, setPhotoPath] = useState("");
    const [incorrectPhotoTypeAlert, setIncorrectPhotoTypeAlert] = useState(false);
    const dispatch = useDispatch();

    console.log(current_photo);
    useEffect(() => {
        setPhotoPath(current_photo);
    }, [current_photo]);

    const handleChange = (photo) => {
        if (["jpeg", "jpg", "png", "webp"].includes(photo?.name.split('.').pop().toLowerCase()))  {
            setIncorrectPhotoTypeAlert(false);
            setPhoto(photo);
        } else {
            setIncorrectPhotoTypeAlert(true);
        }
        
    };

    const deleteExistingPhoto = () => {
        if (photoPath) {
            axios.delete(`http://127.0.0.1:3000/delete-photo`, { data: { photo_path: photoPath } })
            .then(() => {
                console.log('Old photo deleted');
            })
            .catch(error => {
                console.error('Error deleting old photo:', error);
            });
        }
    }
    useEffect(() => {
        const handleUpload = () => {

            deleteExistingPhoto();

            const formData = new FormData();
            formData.append('photo', photo);
            axios.post('http://127.0.0.1:3000/upload-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log('Response:', response);
                const photoRelPath = response.data.photo_rel_path;
                console.log('Photo Relative Path:', photoRelPath);
                setPhotoPath(photoRelPath);
                // Update the state or perform further actions with photoRelPath
            })
            .catch(error => {
                console.error('Error uploading photo:', error);
            });  
        };
        
        if (photo) handleUpload();
    }, [photo]);
    
    const truncateFileName = (name, maxLength) => {
        if (name.length <= maxLength) return name;
        
        const extension = name.split('.').pop();
        const baseName = name.slice(0, name.lastIndexOf('.')).slice(0, maxLength - extension.length - 4);
        return `${baseName}...${extension}`;
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex flex-col justify-center items-center'>
            <div className="w-[65%] h-[42%] flex flex-col text-white bg-[#141414] rounded-xl p-5">
                <div className="flex flex-row w-full justify-between">
                    <h1 className=' text-2xl text-[#d4d4d4] font-semibold'>Upload Profile Picture</h1>
                    <button className='place-self-end' onClick={() => { deleteExistingPhoto(); dispatch(setShowPhotoModal(false)); }}><X size={30} color='#d4d4d4' /></button>
                </div>
                <div className='p-6 w-full h-full flex justify-between items-center'>
                    <div className="rounded-xl full h-full bg-[#181818] mr-5 p-5 flex items-center">
                        <div className='relative w-28 h-28 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center group'>
                            {photoPath ? (<img src={photoPath} className="w-full h-full object-cover" alt="Profile" />) : (
                            <IoPerson size={50} color="#141414" />)}
                        </div>
                    </div>
                    <Dropzone onDrop={acceptedPhoto => {
                        handleChange(acceptedPhoto[0]);
                        console.log(acceptedPhoto[0]);
                        }}>
                        {({getRootProps, getInputProps}) => (
                            <section className='w-full h-full'>
                                <div {...getRootProps()} className='w-full h-full bg-[#242424] rounded-xl flex items-center justify-center'>
                                    <input {...getInputProps()} />
                                    <div className="w-full flex flex-col justify-center h-full items-center">
                                        <MdOutlineFileUpload size={100} color="#343434" className=" "/>
                                        <p className='text-[#4f4f4f]'>Drag and drop an image to set your profile picture.</p>
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className='flex flex-row w-[full] justify-evenly items-center h-[35%] bg-[#111111] rounded-xl mx-5'>
                    <div className="overflow-ellipsis overflow-hidden whitespace-nowrap w-[60%]">
                        <h1 className={`text-[#343434]  ${incorrectPhotoTypeAlert ? "text-[#e63946] text-lg" : "text-xl"}`}>{`${ incorrectPhotoTypeAlert ? "Incorrect Image Type - Must be one of the following (.png/.jpg/.jpeg)" : photo ? `Uploaded Image: ${truncateFileName(photo.name, 30)}` : "No Image Uploaded"}`}</h1>
                    </div>
                    {photoPath != "" && (<button disabled={!photo} className={`w-fit p-2 ${photo ? 'bg-[#545454] text-[#141414] cursor-pointer' : 'bg-[#4a4a4a] text-[#242424] cursor-auto'}  rounded-lg flex justify-center items-center cursor-pointer`}
                    onClick={() => {dispatch(setPhotoData(photoPath)); dispatch(setShowPhotoModal(false));}}>
                        <h1 className='text-center'>Set Profile Picture</h1>
                    </button>)}
                    {photoPath != "" && (<button className={`w-fit p-2 ${photo ? 'bg-[#545454] text-[#141414] cursor-pointer' : 'bg-[#4a4a4a] text-[#242424]'}  rounded-lg flex justify-center items-center cursor-pointer`}
                    onClick={() => {deleteExistingPhoto(); setPhotoPath("")}}>
                        <h1 className='text-center'>Clear Photo</h1>
                    </button>)}
                    {photoPath == "" && (<button className={`w-fit py-2 px-5 ${photo ? 'bg-[#545454] text-[#141414] cursor-pointer' : 'bg-[#4a4a4a] text-[#242424]'}  rounded-lg flex justify-center items-center cursor-pointer`}
                    onClick={() => {dispatch(setPhotoData(photoPath)); dispatch(setShowPhotoModal(false));}}>
                        <h1 className='text-center'>Done</h1>
                    </button>)}
                </div>
            </div>
        </div>
    )
}

export default ContactPhotoModal;