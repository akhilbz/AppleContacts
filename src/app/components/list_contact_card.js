 import React from 'react';
 
 const ListContactCard = ({ contact_info }) => {
    var full_name = ""
    if (contact_info.full_name.length == 3 && contact_info.full_name[1] == ' ') {
        full_name = contact_info.full_name.join('');
    } else if (contact_info.full_name[0] == '')  {
        // Go through each phone number/email type and 
        // find a match for alternative name
        if (contact_info.phone_no['pref'].length > 0) {
            full_name = contact_info.phone_no['pref'][0]
        } else if (contact_info.phone_no['cell'].length > 0) {
            full_name = contact_info.phone_no['cell'][0]
        } else if (contact_info.phone_no['home'].length > 0) {
            full_name = contact_info.phone_no['home'][0]
        } else if (contact_info.email['home'].length > 0) {
            full_name = contact_info.email['home'][0]
        } else if (contact_info.email['internet'].length > 0) {
            full_name = contact_info.email['internet'][0]
        } else {
            full_name = "Unknown Contact"
        }
        
    } else {
        full_name = contact_info.full_name.join(' ');
    } 
    
    return (
    <div className='flex w-full h-fit'>
        <h2 className='text-center m-2 flex w-full text-lg text-[#d4d4d4]'>{ full_name }</h2>
    </div>
    )
};
 
export default ListContactCard;