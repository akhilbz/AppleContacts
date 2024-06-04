import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowListManagementModal, setSelectedList, setDeletedContact, setUploadAlert, setContactInfo } from '../action';
import axios from 'axios';
import { MdOutlineFileUpload } from "react-icons/md";
import { X } from 'lucide-react';

function ListManagementModal() {
    const [listName, setListName] = useState('');
    const selectedList = useSelector(state => state.selectedList);
    const lists = useSelector(state => state.lists);
    const deletedList = useSelector(state => state.deletedList);
    const contactsLength = useSelector(state => state.contactsLength);
    const showListManagementModal = useSelector(state => state.showListManagementModal);
    const contactInfo = useSelector(state => state.contactInfo);
    const dispatch = useDispatch();
    // showListManagementModal == 1
    const createNewList = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/lists/', { name: listName },
            { headers: { 'Content-Type': 'application/json' }});
            if (response.status === 201) { 
                setListName(''); 
                dispatch(setUploadAlert(1));
                dispatch(setShowListManagementModal(0));
                dispatch(setSelectedList(selectedList < 0 ? 0 : lists.length));
            } else {
                console.error('Error creating list:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // showListManagementModal == 2
    const emptySelectedList = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3000/lists/${lists[selectedList].id}/empty`);
            dispatch(setUploadAlert(2));
            dispatch(setShowListManagementModal(0));
            console.log(response.data.message);
        } catch (error) {
            console.log('Failed to clear contacts: ' + error.response.data.error);
        }
    };

    // console.log(selectedList);
    // console.log(lists[selectedList].id)
    // console.log(deletedList)
    // showListManagementModal == 3 
    // Empty the contacts and then delete the list
    const deleteSelectedList = async () => {
        
        try {
            try {
                const responseEmptyList = await axios.delete(`http://127.0.0.1:3000/lists/${lists[selectedList].id}/empty`);
                console.log(responseEmptyList.data.message);
            } catch (error) {
                console.error('Failed to clear contacts: ', error.response ? error.response.data.error : error.message);
                return; // Exit if clearing contacts fails
            }
    
            // Attempt to delete the selected list
            const responseDeleteList = await axios.delete(`http://127.0.0.1:3000/lists/${lists[selectedList].id}`);
            if (responseDeleteList.status === 200) {
                console.log("test");
                dispatch(setUploadAlert(3));
                dispatch(setSelectedList((selectedList - 1) < 0 ? selectedList : selectedList - 1));
                dispatch(setShowListManagementModal(0));
            } else {
                console.log("Failed to delete selected list: ", responseDeleteList.data);
            }
        } catch (e) {
            console.error("An error occurred while deleting the list: ", e.message);
        }
    };

    // showListManagementModal == 4
    // Delete the selected contact
    const deleteSelectedContact = async () => {
        try {
            const responseDeleteContact = await axios.delete(`http://127.0.0.1:3000/contacts/${contactInfo.id}.json`, { list_id: lists[selectedList].id});
            console.log(responseDeleteContact);
            if (responseDeleteContact.status === 204) {
                dispatch(setUploadAlert(5));
                dispatch(setContactInfo(null));
                dispatch(setDeletedContact(contactInfo.full_name.join(" ")));
                dispatch(setShowListManagementModal(0));
            } else {
                console.log("Failed to delete selected contact: ", responseDeleteList.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 flex flex-col justify-center items-center'>
            <div className={`w-[50%] ${[2, 3, 4].includes(showListManagementModal) ? "h-[30%]" : "" }  flex flex-col text-white bg-[#141414] rounded-xl p-5 space-y-4`}>
                <div className="flex flex-row w-full justify-between">
                    {lists.length != 0 && contactInfo && (<h1 className=' text-2xl text-[#d4d4d4] font-semibold'>{`${showListManagementModal == 1 ? "Enter List Name" : 
                    showListManagementModal == 2 ? `Empty ${lists[selectedList]?.name}` : showListManagementModal == 3 ? `Delete ${lists[selectedList]?.name}` : `Delete Contact: ${contactInfo.full_name.join(" ")}`}`}</h1>)}
                    <button className='place-self-end' onClick={() => dispatch(setShowListManagementModal(0))}>
                        <X size={30} color='#d4d4d4' />
                    </button>
                </div>
                {showListManagementModal == 1 && (<div className='flex flex-row w-full justify-evenly items-center h-[50%] bg-[#111111] rounded-xl p-3'>
                    <form onSubmit={createNewList} className='flex flex-row w-full justify-evenly items-center'>
                        <input
                            type="text"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            placeholder="Enter List Name"
                            className="p-2 rounded-lg text-[#d4d4d4] bg-[#4a4a4a] placeholder-[#141414]"
                            required
                        />
                        <button
                            type="submit"
                            className="p-2 h-10 w-fit bg-[#545454] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer">
                            Create List
                        </button>
                    </form>
                </div>)}
                { showListManagementModal == 2 && (<div className='w-full h-full flex flex-col justify-evenly'>
                    <div className='flex w-full justify-evenly items-center h-[30%] p-1 bg-[#111111] text-[#FF4C4C] rounded-xl'>
                        <p>Are you sure you want to clear all contacts from this list?</p>
                    </div>
                    <div className='flex flex-row w-full justify-evenly items-center h-[40%] bg-[#111111] rounded-xl'>
                        <button className="p-2 h-10 w-fit bg-[#343434] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer"
                        onClick={() => dispatch(setShowListManagementModal(0))}>
                        Cancel
                        </button>
                        <button className="p-2 h-10 w-fit bg-[#545454] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer"
                        onClick={() => emptySelectedList()}>
                        Empty List
                        </button>
                    </div>
                </div>)}
                { showListManagementModal == 3 && (<div className='w-full h-full flex flex-col justify-evenly'>
                    <div className='flex w-full justify-evenly items-center h-[40%] p-2 text-center bg-[#111111] text-[#FF4C4C] rounded-xl'>
                        <p>{`You currently have ${contactsLength} contacts associated with this list. Deleting the list will permanently remove all related contacts and their data. 
                        Are you sure you want to delete this list? `}</p>
                    </div>
                    <div className='flex flex-row w-full justify-evenly items-center h-[40%] bg-[#111111] rounded-xl'>
                        <button className="p-2 h-10 w-fit bg-[#343434] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer"
                        onClick={() => dispatch(setShowListManagementModal(0))}>
                        Cancel
                        </button>
                        <button className="p-2 h-10 w-fit bg-[#545454] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer"
                        onClick={() => deleteSelectedList()}>
                        Delete List
                        </button>
                    </div>
                </div>)}
                { showListManagementModal == 4 && contactInfo && (<div className='w-full h-full flex flex-col justify-evenly'>
                    <div className='flex w-full justify-evenly items-center h-[40%] p-2 text-center bg-[#111111] text-[#FF4C4C] rounded-xl'>
                        <p>{`Are you sure you want to delete the following contact: ${contactInfo.full_name.join(" ")}? `}</p>
                    </div>
                    <div className='flex flex-row w-full justify-evenly items-center h-[40%] bg-[#111111] rounded-xl'>
                        <button className="p-2 h-10 w-fit bg-[#343434] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer"
                        onClick={() => dispatch(setShowListManagementModal(0))}>
                        Cancel
                        </button>
                        <button className="p-2 h-10 w-fit bg-[#545454] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer"
                        onClick={() => deleteSelectedContact()}>
                        Delete Contact
                        </button>
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default ListManagementModal;
