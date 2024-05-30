import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedList } from '../action';
import { X } from 'lucide-react';

const ListListCard = ({ list, list_index }) => {
  const selectedList = useSelector(state => state.selectedList);
  const dispatch = useDispatch();

  return (
    <div 
      className='flex w-full h-fit rounded-xl group' 
      style={{ backgroundColor: selectedList === (list_index + 1) ? '#4a4a4a' : ''}} 
      onClick={() => dispatch(setSelectedList(list_index + 1))}
    >
      <h2 className='text-center m-2 flex w-full text-lg text-[#d4d4d4] truncate'>{ list.name }</h2>
      <button 
        className="text-[#d4d4d4] text-lg mr-2 hidden group-hover:block">
        &times;
      </button>
    </div>
  );
};

export default ListListCard;
