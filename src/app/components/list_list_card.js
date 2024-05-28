import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedList } from '../action';

const ListListCard = ({ list, list_index }) => {

    const selectedList = useSelector(state => state.selectedList);
    const dispatch = useDispatch();
    // console.log(list_index);
    return (
    <div className='flex w-full h-fit rounded-xl' 
    style={{ backgroundColor: selectedList == (list_index + 1) ? '#4a4a4a' : ''}} 
    onClick={() => dispatch(setSelectedList(list_index + 1))}>
        <h2 className='text-center m-2 flex w-full text-lg text-[#d4d4d4] truncate'>{ list.name }</h2>
    </div>
    )
};
 
export default ListListCard;