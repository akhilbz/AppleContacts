import React from 'react';
import { useSelector } from "react-redux";

const ContactCard = () => {
    // const contact_info = useSelector(state => state.contactInfo)[0];
    // var full_name = "";
    // if (contact_info.full_name.length == 3 && contact_info.full_name[1] == ' ') {
    //     full_name = contact_info.full_name.join('');
    // } else if (contact_info.full_name[0] == '')  {
    //     full_name = "No Name";
    // } else {
    //     full_name = contact_info.full_name.join(' ');
    // }
   return (
   <div className='flex w-full h-fit'>
       <div className='flex w-full items-center space-x-6 justify-between'> 
            <div className='w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center'>
                {/* Placeholder for profile image */}
            </div>

            <div className='flex-1 border-b-4 pb-4'> 
                <h1 className='text-6xl text-right'>nn</h1>
            </div>
        </div>
        <div>

        </div>
   </div>
   )
};

export default ContactCard;