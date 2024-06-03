import React, { useState } from "react";

const EditContactCard = ({ fullName, company, phoneNo, photoPath, emails }) => {
    const [editedContacts, setEditedContacts] = useState({
        fullName: fullName,
        photoPath: photoPath,
        company: company,
        phoneNo: phoneNo,
        emails: emails,
    });

    const handleFullNameChange = (event) => {
        setEditedContacts({
            ...editedContacts,
            fullName: event.target.value,
        });
    };

    const handleCompanyChange = (event) => {
        setEditedContacts({
            ...editedContacts,
            company: event.target.value,
        });
    };

    return (
        <div className="flex flex-col overflow-y-auto w-full h-full p-5 mb-5 rounded-xl border-[#7c7c7c] border-[1px] bg-[#161616] ">
            <div className='flex flex-col overflow-y-auto w-full h-fit font-light space-y-4'>
                <div className='flex w-full items-center space-x-6 justify-between pb-6'> 
                    <div className=' w-24 h-24  bg-gray-200 rounded-full overflow-hidden flex items-center justify-center'>
                        <img src={photoPath} alt="Profile" className="w-full h-full object-cover" />
                    </div>

                    <div className='flex-1 flex border-b-[1px] items-end justify-end border-[#7c7c7c] pb-2'> 
                        <input
                            type="text"
                            value={editedContacts.fullName}
                            onChange={handleFullNameChange} 
                            className=' text-3xl text-right text-[#797979] bg-[#212121] px-2 rounded-lg flex-shrink-0'
                        />
                    </div>
                </div>
                {company && (<div className='flex w-full border-b-[1px] text-[#cdcdcd] border-[#7c7c7c] pb-1 items-center px-5 justify-between'>
                    <div className='flex'>
                        <h1 className='text-xl'>company</h1>
                    </div>
                    <div className='flex'> 
                        <input
                            type="text"
                            value={editedContacts.company}
                            onChange={handleCompanyChange}
                            className='text-xl text-right text-[#797979] bg-[#212121] px-2 rounded-lg '
                        />
                    </div>
                </div>)}
                {phoneNo && phoneNo.length != 0 && (<> 
                {phoneNo['pref'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                    <div className='flex'>
                        <h1 className='text-xl'>phone</h1>
                    </div>
                    <div className='flex'> 
                        <h1 className='text-xl text-right truncate'>{phoneNo['pref']}</h1>
                    </div>
                </div>)}
                {phoneNo['cell'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                    <div className='flex'>
                        <h1 className='text-xl'>cell</h1>
                    </div>
                    <div className='flex'> 
                        <h1 className='text-xl text-right truncate'>{phoneNo['cell'][0]}</h1>
                    </div>
                </div>)}
                {phoneNo['home'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                    <div className='flex'>
                        <h1 className='text-xl'>home</h1>
                    </div>
                    <div className='flex'> 
                        <h1 className='text-xl text-right truncate'>{phoneNo['home']}</h1>
                    </div>
                </div>)}
                </>) }
                {emails && emails.length != 0 && (
                    <> {emails['home'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                    <div className='flex'>
                        <h1 className='text-xl'>email</h1>
                    </div>
                    <div className='flex'> 
                        <h1 className='text-xl text-right truncate'>{emails['home']}</h1>
                    </div>
                </div>)}
                {emails['internet'].length > 0 && (<div className='flex w-full items-center text-[#cdcdcd] border-b-[1px] border-[#7c7c7c] pb-1 justify-between px-5'> 
                    <div className='flex'>
                        <h1 className='text-xl'>other</h1>
                    </div>
                    <div className='flex'> 
                        <h1 className='text-xl text-right truncate'>{emails['internet']}</h1>
                    </div>
                </div>)}
                </>)}
            </div>
        </div>
    );
};

export default EditContactCard;