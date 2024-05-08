import React from 'react';
 
const ContactCardHeader = ({ letter }) => {
   return (
   <div className='flex w-full h-fit'>
       <h2 className='text-center m-2 flex w-full text-lg text-[#3f3f3f] border-b-[1px] border-[#3f3f3f]'>{ letter }</h2>
   </div>
   )
};

export default ContactCardHeader;