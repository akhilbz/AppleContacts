import React, { useEffect, useRef } from "react";
import { setShowEditDropDown } from "../action"; 
import { useSelector, useDispatch} from "react-redux";

const NewContactCard = ({ newContact, setNewContact }) => {
    const showEditDropDown = useSelector(state => state.showEditDropDown);
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

    // Handles Value of Text Fields
    const handleFullNameChange = (event) => {
        const value = event.target.value;
        setNewContact({
            ...newContact,
            full_name: [value],
        });
    };

    const handleCompanyChange = (event) => {
        setNewContact({
            ...newContact,
            company: event.target.value,
        });
    };

    const handlePhonePreferredChange = (event) => {
        setNewContact({
            ...newContact,
            phone_no: {
                ...newContact.phone_no,
                ['pref']: [event.target.value],
            },
        });
    };

    const handlePhoneCellChange = (event) => {
        setNewContact({
            ...newContact,
            phone_no: {
                ...newContact.phone_no,
                ['cell']: [event.target.value],
            },
        });
    };

    const handlePhoneHomeChange = (event) => {
        setNewContact({
            ...newContact,
            phone_no: {
                ...newContact.phone_no,
                ['home']: [event.target.value],
            },
        });
    };

    const handleEmailHomeChange = (event) => {
        setNewContact({
            ...newContact,
            email: {
                ...newContact.email,
                ['home']: [event.target.value],
            },
        });
    };

    const handleEmailOtherChange = (event) => {
        setNewContact({
            ...newContact,
            email: {
                ...newContact.email,
                ['internet']: [event.target.value],
            },
        });
    };

    console.log(newContact);
    return (
        <div className="flex flex-col w-full h-full p-5 mb-5 rounded-xl border-[#7c7c7c] border-[1px] bg-[#161616] ">
            <div className='flex flex-col overflow-y-auto w-full h-full font-light space-y-4'>
                <div className='flex w-full items-center space-x-6 justify-between pb-6'> 
                    <div className=' w-24 h-24  bg-[#7c7c7c] rounded-full overflow-hidden flex items-center justify-center'>
                        <img src={newContact.photo_path} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className='flex-1 flex border-b-[1px] items-end justify-end border-[#7c7c7c] pb-2'> 
                        <input
                            type="text"
                            placeholder="No Name"
                            onChange={handleFullNameChange} 
                            className=' text-3xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 mr-1 rounded-lg '
                        />
                    </div>
                </div>
            
                <div className='flex w-full border-b-[1px] text-[#cdcdcd] border-[#7c7c7c] pb-1 items-center px-2 justify-between'>
                    <div className='flex'>
                        <h1 className='text-xl'>company</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                placeholder="organization name"
                                type="text"
                                value={newContact.company}
                                onChange={handleCompanyChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                    </section>
                </div>
                
                <div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>phone</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="+1-234-567-8910"
                                value={newContact.phone_no['pref']}
                                onChange={handlePhonePreferredChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                    </section>
                </div>
                <div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>cell</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="+1-234-567-8910"
                                value={newContact.phone_no['cell']}
                                onChange={handlePhoneCellChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                    </section>
                </div>
                <div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>home</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="+1-234-567-8910"
                                value={newContact.phone_no['home']}
                                onChange={handlePhoneHomeChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                    </section>
                </div>
                <div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>email</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="contact@list.gmail.com"
                                value={newContact.email['home']}
                                onChange={handleEmailHomeChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                    </section>
                </div>
                <div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-2'> 
                    <div className='flex'>
                        <h1 className='text-xl'>other</h1>
                    </div>
                    <section className="flex justify-end space-x-1">
                        <input
                                type="text"
                                placeholder="contact@list.gmail.com"
                                value={newContact.email['internet']}
                                onChange={handleEmailOtherChange}
                                className='text-xl text-right placeholder:text-[#444444] text-[#797979] bg-[#212121] px-2 rounded-lg '
                            />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default NewContactCard;