import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedList, setUploadAlert, setShowListManagementModal, setDeletedList } from '../action';
import axios from 'axios';

const ListListCard = ({  list, list_index }) => {
  const dispatch = useDispatch();
  const selectedList = useSelector(state => state.selectedList);
  const contactsLength = useSelector(state => state.contactsLength);
  const lists = useSelector(state => state.lists);

  const deleteSelectedList = async () => {
    try {
        const response = await axios.delete(`http://127.0.0.1:3000/lists/${lists[list_index].id}`)
        if (response.status === 200) {
            dispatch(setUploadAlert(3));
            dispatch(setSelectedList((selectedList - 1) < 0 ? selectedList : selectedList - 1));
        } else {
            console.log("Failed to delete selected list");
        }
    } catch (e) {
        console.log("An error occurred while deleting the list: " + e);
    }
  };
//   console.log("Contact Length: ", contactsLength);
  return (
    <div 
      className='flex w-full h-fit rounded-xl group' 
      style={{ backgroundColor: selectedList === (list_index) ? '#4a4a4a' : ''}} 
      onClick={() => dispatch(setSelectedList(list_index))}>
      <h2 className='text-center m-2 flex w-full text-lg text-[#d4d4d4] overflow-ellipsis'>{ list.name }</h2>
      <button 
        className={`text-[#d4d4d4] text-lg mr-2 hidden ${selectedList == (list_index) ? "group-hover:block" : ""}`} 
        onClick={() => {
            const deletedList = { id: list_index, listInfo: lists[list_index]};
            dispatch(setDeletedList(deletedList));

            if (contactsLength == 0) {
                deleteSelectedList();
            } else {
                dispatch(setShowListManagementModal(3));
            }
        }}>
        &times;
      </button>
    </div>
  );
};

export default ListListCard;
