import React, { useEffect, useRef } from "react";
import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline";
import { setShowEditDropDown, setShowPhotoModal } from "../action"; 
import EditContactCardDropdown from "./edit_contact_card_dropdown";
import { useSelector, useDispatch} from "react-redux";
import { IoPerson } from "react-icons/io5";

const EditContactCard = ({ editedContacts, setEditedContacts }) => {
    const showEditDropDown = useSelector(state => state.showEditDropDown);
    const photoData = useSelector(state => state.photoData);
    const dropDownRef = useRef(null);
    const dispatch = useDispatch();
    const handleClickOutside = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            dispatch(setShowEditDropDown(false));
        }
        };

    useEffect(() => {
        if (showEditDropDown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        }, [showEditDropDown]);

    useEffect(() => {
        const handlePhotoPathChange = () => {
            setEditedContacts(prevState => ({
                ...prevState,
                photo_path: photoData
            }));
        };
        if (photoData === "" || photoData !== "") {
            handlePhotoPathChange();
        }
    }, [photoData]);

    // Handles Value of Text Fields
    const handleFullNameChange = (event) => {
        const value = event.target.value;
        setEditedContacts({
            ...editedContacts,
            full_name: value === '' ? ["No", "Name"] : value.split(" "),
        });
    };

    const handleCompanyChange = (event) => {
        setEditedContacts({
            ...editedContacts,
            company: event.target.value,
        });
    };

    const handlePhonePreferredChange = (event) => {
        setEditedContacts({
            ...editedContacts,
            phone_no: {
                ...editedContacts.phone_no,
                ['pref']: [event.target.value],
            },
        });
    };

    const handlePhoneCellChange = (event) => {
        setEditedContacts({
            ...editedContacts,
            phone_no: {
                ...editedContacts.phone_no,
                ['cell']: [event.target.value],
            },
        });
    };

    const handlePhoneHomeChange = (event) => {
        setEditedContacts({
            ...editedContacts,
            phone_no: {
                ...editedContacts.phone_no,
                ['home']: [event.target.value],
            },
        });
    };

    const handleEmailHomeChange = (event) => {
        setEditedContacts({
            ...editedContacts,
            email: {
                ...editedContacts.email,
                ['home']: [event.target.value],
            },
        });
    };

    const handleEmailOtherChange = (event) => {
        setEditedContacts({
            ...editedContacts,
            email: {
                ...editedContacts.email,
                ['internet']: [event.target.value],
            },
        });
    };

    // Closes the specific contact field
    const removeCompanyField = () => {
        setEditedContacts({
            ...editedContacts,
            company: '',
        });
    };

    const removePhonePreferredField = () => {
        setEditedContacts({
            ...editedContacts,
            phone_no: {
                ...editedContacts.phone_no,
                ['pref']: [],
            },
        });
    };

    const removePhoneCellField = () => {
        setEditedContacts({
            ...editedContacts,
            phone_no: {
                ...editedContacts.phone_no,
                ['cell']: [],
            },
        });
    };

    const removePhoneHomeField = () => {
        setEditedContacts({
            ...editedContacts,
            phone_no: {
                ...editedContacts.phone_no,
                ['home']: [],
            },
        });
    };

    const removeEmailHomeField = () => {
        setEditedContacts({
            ...editedContacts,
            email: {
                ...editedContacts.email,
                ['home']: [],
            },
        });
    };

    const removeEmailOtherField = () => {
        setEditedContacts({
            ...editedContacts,
            email: {
                ...editedContacts.email,
                ['internet']: [],
            },
        });
    };
    console.log(photoData);
    console.log(editedContacts);
    return (
        <div className="flex flex-col w-full h-full p-5 mb-5 rounded-xl border-[#7c7c7c] border-[1px] bg-[#161616] ">
            <div className='flex flex-col overflow-y-auto w-full h-full font-light space-y-4'>
                <div className='flex w-full items-center space-x-6 justify-between'> 
                    <div className='relative w-24 h-24 bg-[#7c7c7c] rounded-full overflow-hidden flex items-center justify-center group'>
                        {editedContacts.photo_path !== "" ? (<img src={editedContacts.photo_path} className="w-full h-full object-cover" alt="Profile" />) : 
                        (<IoPerson size={50} color="#cdcdcd" />)}
                        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => {dispatch(setShowPhotoModal({ showModal: true, current_photo: editedContacts.photo_path}));}}>
                            <span className="text-[#cdcdcd] text-md font-light">Edit</span>
                        </div>
                    </div>
                    <div className='flex-1 flex border-b-[1px] items-end justify-end border-[#7c7c7c] pb-2'> 
                        <input
                            type="text"
                            placeholder="No Name"
                            value={editedContacts.full_name}
                            onChange={handleFullNameChange} 
                            className=' text-3xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 mr-1 rounded-lg '
                        />
                    </div>
                </div>
                <div className="relative w-full h-fit flex justify-end">
                    <div className='h-9 w-16 bg-[#212121] rounded-lg flex justify-center items-center cursor-pointer' 
                    onClick={() => dispatch(setShowEditDropDown(true))} >
                    <IoAddOutline size={30} color="#9B9B9B"/>
                    </div>
                    {showEditDropDown && (<div className='absolute w-fit top-12 flex flex-col z-20 bg-[#212121] p-2 rounded-lg shadow-lg' ref={dropDownRef}>
                    <EditContactCardDropdown editedContacts={editedContacts} setEditedContacts={setEditedContacts}/> 
                    </div>)}
                </div>
                
                {editedContacts.company && (<div className='flex w-full border-b-[1px] text-[#cdcdcd] border-[#7c7c7c] pb-1 items-center px-2 justify-between'>
                    <div className='flex'>
                        <h1 className='text-xl'>company</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                value={editedContacts.company}
                                onChange={handleCompanyChange}
                                className='text-xl text-right text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                        <button onClick={removeCompanyField} className="text-[#797979]">&times;</button>    
                    </section>
                </div>)}
                {editedContacts.phone_no && editedContacts.phone_no.length != 0 && (<> 
                {editedContacts.phone_no['pref'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>phone</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="+1-234-567-8910"
                                value={editedContacts.phone_no['pref']}
                                onChange={handlePhonePreferredChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                        <button onClick={removePhonePreferredField} className="text-[#797979]">&times;</button>    
                    </section>
                </div>)}
                {editedContacts.phone_no['cell'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>cell</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="+1-234-567-8910"
                                value={editedContacts.phone_no['cell']}
                                onChange={handlePhoneCellChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                        <button onClick={removePhoneCellField} className="text-[#797979]">&times;</button>    
                    </section>
                </div>)}
                {editedContacts.phone_no['home'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>home</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="+1-234-567-8910"
                                value={editedContacts.phone_no['home']}
                                onChange={handlePhoneHomeChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                        <button onClick={removePhoneHomeField} className="text-[#797979]">&times;</button>    
                    </section>
                </div>)}
                </>) }
                {editedContacts.email && editedContacts.email.length != 0 && (
                    <> {editedContacts.email['home'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>email</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="contact@list.gmail.com"
                                value={editedContacts.email['home']}
                                onChange={handleEmailHomeChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                        <button onClick={removeEmailHomeField} className="text-[#797979]">&times;</button>    
                    </section>
                </div>)}
                {editedContacts.email['internet'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>other</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="contact@list.gmail.com"
                                value={editedContacts.email['internet']}
                                onChange={handleEmailOtherChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                        <button onClick={removeEmailOtherField} className="text-[#797979]">&times;</button>    
                    </section>
                </div>)}
                </>)}
            </div>
        </div>
    );
};

export default EditContactCard;