import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowListManagementModal, setSelectedList, setUploadAlert } from '../action';
import axios from 'axios';
import { MdOutlineFileUpload } from "react-icons/md";
import { X } from 'lucide-react';

function ListManagementModal() {
    const [listName, setListName] = useState('');
    const selectedList = useSelector(state => state.selectedList);
    const lists = useSelector(state => state.lists);
    const showListManagementModal = useSelector(state => state.showListManagementModal);
    const dispatch = useDispatch();

    // showListManagementModal == 1
    const createNewList = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/lists/', { name: listName },
            { headers: { 'Content-Type': 'application/json' }});
            if (response.status === 201) { 
                setListName(''); 
                dispatch(setShowListManagementModal(0));
                dispatch(setSelectedList(response.data.id));
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
            const response = await axios.delete(`http://127.0.0.1:3000/lists/${selectedList}/empty`);
            dispatch(setUploadAlert(true));
            dispatch(setShowListManagementModal(0));
            console.log(response.data.message);
        } catch (error) {
            console.log('Failed to clear contacts: ' + error.response.data.error);
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 flex flex-col justify-center items-center'>
            <div className={`w-[50%] ${showListManagementModal == 2 ? "h-[30%]" : "" }  flex flex-col text-white bg-[#141414] rounded-xl p-5 space-y-4`}>
                <div className="flex flex-row w-full justify-between">
                    <h1 className=' text-2xl text-[#d4d4d4] font-semibold'>{`${showListManagementModal == 1 ? "Enter List Name" : `Empty ${lists[selectedList - 1].name}`}`}</h1>
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
                <div className='w-full h-full flex flex-col justify-evenly'>
                    { showListManagementModal == 2 && (<div className='flex w-full justify-evenly items-center h-[30%] p-1 bg-[#111111] text-[#FF4C4C] rounded-xl'>
                        <p>Are you sure you want to clear all contacts from this list?</p>
                    </div>)}
                    {showListManagementModal == 2 && (<div className='flex flex-row w-full justify-evenly items-center h-[40%] bg-[#111111] rounded-xl'>
                        <button className="p-2 h-10 w-fit bg-[#343434] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer"
                        onClick={() => dispatch(setShowListManagementModal(0))}>
                        Cancel
                        </button>
                        <button className="p-2 h-10 w-fit bg-[#545454] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer"
                        onClick={() => emptySelectedList()}>
                        Empty List
                        </button>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default ListManagementModal;
