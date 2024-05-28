import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowDropupModal, setSelectedList } from '../action';
import axios from 'axios';
import { MdOutlineFileUpload } from "react-icons/md";
import { X } from 'lucide-react';

function DropupModal() {
    const [listName, setListName] = useState('');
    const selectedList = useSelector(state => state.selectedList);
    const dispatch = useDispatch();
    // console.log(listName);

    const createNewList = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/lists/', { name: listName },
            { headers: { 'Content-Type': 'application/json' }});
            if (response.status === 201) { 
                setListName(''); 
                dispatch(setShowDropupModal(false));
                dispatch(setSelectedList(response.data.id));
            } else {
                // Handle errors here
                console.error('Error creating list:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex flex-col justify-center items-center'>
            <div className="w-[50%] h-[20%] flex flex-col text-white bg-[#141414] rounded-xl p-5 space-y-4">
                <div className="flex flex-row w-full justify-between">
                    <h1 className=' text-2xl text-[#d4d4d4] font-semibold'>Enter List Name</h1>
                    <button className='place-self-end' onClick={() => dispatch(setShowDropupModal(false))}>
                        <X size={30} color='#d4d4d4' />
                    </button>
                </div>
                <div className='flex flex-row w-full justify-evenly items-center h-[50%] bg-[#111111] rounded-xl mx-5'>
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
                            className="p-2 h-10 w-fit bg-[#545454] text-[#141414] rounded-lg flex justify-center items-center cursor-pointer"
                        >
                            Create List
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DropupModal;
