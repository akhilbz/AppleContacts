import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContactInfo, setSelectedContact } from '../action';
const ListContactCard = ({ name_index, order_index, contact_info }) => {

    const selectedContact = useSelector(state => state.selectedContact);
    const dispatch = useDispatch();

    var full_name = "";
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
    // console.log(list_index)
    return (
    <div className='flex w-full h-fit rounded-xl ' 
    style={{ backgroundColor: selectedContact[0] == name_index 
        && selectedContact[1] == order_index ? '#007aff' : ''}} 
    onClick={() => {
        dispatch(setSelectedContact([name_index, order_index]));
        dispatch(setContactInfo([contact_info]));
        }}>
        <h2 className='text-center m-2 flex w-full text-lg text-[#d4d4d4]'>{ full_name }</h2>
    </div>
    )
};
 
export default ListContactCard;