 import React from 'react';
 
 const ListContactCard = ({name}) => {
    return (
    <div className='flex w-full h-fit'>
        <h2 className='text-center m-2 flex w-full text-lg text-[#d4d4d4]'>{ name }</h2>
    </div>
    )
};
 
export default ListContactCard;