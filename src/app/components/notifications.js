import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUploadNotification } from '../action';

const Notifications = ({ }) => {
    const lists = useSelector(state => state.lists);
    const selectedList = useSelector(state => state.selectedList);
    const deletedList = useSelector(state => state.deletedList);
    const uploadNotification = useSelector(state => state.uploadNotification);
    const dispatch = useDispatch();
    
    /* Upload Notification Scenarios: 
    0 - Close/Hide Notif
    1 - New List Created Notif
    2 - Empty List Notif
    3 - Delete List Notif 
    4 - VCF File Upload Notif
    */ 

    const notifs = () => {
        switch (uploadNotification) {
            case 1:
                return (
                    <div className="mt-[85px] w-fit z-10 flex bg-green-400 text-black p-2 rounded-lg shadow-lg space-x-2 items-center">
                    { selectedList >= 0 && (<p className="text-sm font-normal"><span className="font-semibold">{`${lists[selectedList]?.name}`}</span> created.</p>)}
                    <button onClick={() => dispatch(setUploadNotification(0))} className="text-black">&times;</button>
                    </div>
                );
            case 2:
                return (
                    <div className="mt-[85px] w-fit z-10 flex bg-yellow-400 text-black p-2 rounded-lg shadow-lg space-x-2 items-center">
                    { selectedList >= 0 && (<p className="text-sm font-normal"><span className="font-semibold">{`${lists[selectedList]?.name}`}</span> emptied.</p>)}
                    <button onClick={() => dispatch(setUploadNotification(0))} className="text-black">&times;</button>
                    </div>
                );
            case 3:
                return (
                    <div className="mt-[85px] w-fit z-10 flex bg-red-400 text-black p-2 rounded-lg shadow-lg space-x-2 items-center">
                    { selectedList >= 0 && (<p className="text-sm font-normal"><span className="font-semibold">{`${deletedList.listInfo.name}`}</span> deleted.</p>)}
                    <button onClick={() => dispatch(setUploadNotification(0))} className="text-black">&times;</button>
                    </div>
                );
            case 4:
                return (
                    <div className="mt-[85px] w-fit z-10 flex bg-green-400 text-black p-2 rounded-lg shadow-lg space-x-2 items-center">
                    { selectedList >= 0 && (<p className="text-sm font-normal">Contacts Uploaded to <span className="font-semibold">{`${lists[selectedList]?.name}`}</span>.</p>)}
                    <button onClick={() => dispatch(setUploadNotification(0))} className="text-black">&times;</button>
                    </div>
                );
            default:
                break;
        }
    }

    return (
        <div className={`fixed top-1 left-0 w-full flex justify-center z-10`}>
            {notifs()}
        </div>
    );
};
 
export default Notifications;