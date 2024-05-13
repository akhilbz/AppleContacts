import React from 'react';
import { useSelector } from 'react-redux';

const ContactCard = () => {
    const contactInfo = useSelector(state => state.contactInfo);
    // console.log("Here!!")
    console.log(contactInfo);
    // var full_name = "";
    // if (contactInfo.full_name.length == 3 && contactInfo.full_name[1] == ' ') {
    //     full_name = contactInfo.full_name.join('');
    // } else if (contactInfo.full_name[0] == '')  {
    //     full_name = "No Name";
    // } else {
    //     full_name = contactInfo.full_name.join(' ');
    // }
   return (
   <div className='flex w-full h-fit'>
       <div className='flex w-full items-center space-x-6 justify-between'> 
            <div className='w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center'>
                {/* Placeholder for profile image */}
            </div>

            <div className='flex-1 border-b-4 pb-4'> 
                <h1 className='text-6xl text-right'>{  }</h1>
            </div>
        </div>
        <div>
        </div>
   </div>
   )
};

export default ContactCard;