"use client";
import axios from "axios";
import React from 'react';
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setUploadAlert, setLists, setContactsLength, setUploadNotification } from "./action";
import ListContactCard from "./components/list_contact_card";
import ListListCard from "./components/list_list_card";
import ContactCardHeader from "./components/contact_card_header";
import ContactCard from "./components/contact_card";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";
import ContactModal from "./components/contact_upload_modal";
import ListManagementModal from "./components/list_management_modal";
import Notifications from "./components/notifications";
import { throttle } from "lodash";

export default function Home() {
  const [isMCResizing, setIsMCResizing] = useState(false);
  const [middleWidth, setMiddleWidth] = useState(25); // Initial width in percentage
  const [isLCResizing, setIsLCResizing] = useState(false);
  const [leftWidth, setLeftWidth] = useState(20); // Initial width in percentage
  const [rightWidth, setRightWidth] = useState(55); // Initial width in percentage
  const [contacts, setContacts] = useState([]);
  const containerRef = useRef(null);
  const showModal = useSelector(state => state.showModal);
  const uploadAlert = useSelector(state => state.uploadAlert);
  const showListManagementModal = useSelector(state => state.showListManagementModal);
  const selectedList = useSelector(state => state.selectedList);
  const lists = useSelector(state => state.lists);
  const uploadNotification = useSelector(state => state.uploadNotification);
  const dispatch = useDispatch();

  // TODO: Add an Activity Indicator for Uploading Contacts
  useEffect(() => {
    /* Alerts the useEffect to rerun fetchData and sets to false as upload modal is successful. */
    
    const fetchData = async () => {
      if (uploadAlert != 0) {
        dispatch(setUploadNotification(uploadAlert));
      }
      
      try {
        /* Extract List Data */
        const responseLists = await axios.get('http://127.0.0.1:3000/lists/');
        const listsData = responseLists.data.list;
        dispatch(setLists(listsData));
        // console.log(listsData.length);
        // console.log(selectedList);
  
        if (listsData.length === 0) {
          // No lists available, handle the empty state
          dispatch(setContactsLength(0));
          setContacts([]);
          dispatch(setUploadAlert(0));
          return;
        }
  
        if (selectedList >= 0 && selectedList < listsData.length) {
          const selectedListId = listsData[selectedList].id;
          /* Extract Corresponding Contacts Data */
          const responseContacts = await axios.get(`http://127.0.0.1:3000/lists/${selectedListId}`);
          var size = responseContacts.data.contacts.length;
          dispatch(setContactsLength(size));
          dispatch(setUploadAlert(0)); 
  
          /* Contacts Sorting Algorithm A-Z */
          var all_contacts = [];
          var total = 0;
          for (var c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
            var sorted_contacts = [];
            for (var j = 0; j < size; j++) {
              const contact = responseContacts.data.contacts[j].full_name;
              if (String.fromCharCode(c) == contact[contact.length - 1].toLowerCase().charAt(0)) {
                sorted_contacts.push(responseContacts.data.contacts[j]);
              }
            }
            all_contacts.push({ [String.fromCharCode(c).toUpperCase()]: sorted_contacts });
            total += sorted_contacts.length;
          }
  
          var leftover_contacts = [];
          for (var k = 0; k < size; k++) {
            const contact = responseContacts.data.contacts[k].full_name;
            if (contact[contact.length - 1] == '' || (contact[contact.length - 1].toLowerCase().charAt(0) < 'a'.charCodeAt(0)) 
            || (contact[contact.length - 1].toLowerCase().charAt(0) > 'z'.charCodeAt(0)) 
            || contact[contact.length - 1].toLowerCase().charAt(0) == '(') {
              leftover_contacts.push(responseContacts.data.contacts[k]);
            }
          }
  
          all_contacts.push({ 'OTHER': leftover_contacts });
          total += leftover_contacts.length;
          /* ^^^^^^^^^^^^^^^^^^^^^^ */
          setContacts(all_contacts);
        } else {
          // Handle case where selectedList index is out of bounds
          dispatch(setContactsLength(0));
          setContacts([]);
        }
      } catch (e) {
        console.log('Error fetching data: ', e.message);
      }
    };
    
    fetchData();
  }, [selectedList, uploadAlert, dispatch]);
  
  useEffect(() => {
    let timer;
    console.log(uploadNotification != 0);
    if (uploadNotification !== 0) {
        timer = setTimeout(() => {
            dispatch(setUploadNotification(0));
        }, 4000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [uploadNotification]);

  const mcHandleMouseDown = (e) => {
    e.preventDefault();
    setIsMCResizing(true);
  };

  const mcHandleMouseMove = throttle((e) => {
    if (isMCResizing) {
      const newWidth = e.clientX;
      const containerWidth = containerRef.current.offsetWidth;
      const newMiddleWidth = (newWidth / containerWidth) * 100;
      setMiddleWidth(newMiddleWidth);
    }
  }, 10); 

  const mcHandleMouseUp = () => {
    setIsMCResizing(false);
  };

  const lcHandleMouseUp = () => {
    setIsLCResizing(false);
  };

  const lcHandleMouseDown = (e) => {
    e.preventDefault();
    setIsLCResizing(true);
  };

  // throttle helps with the smoothness of the slider.
  const lcHandleMouseMove = throttle((e) => {
    if (isLCResizing) {
      const newWidth = e.clientX;
      const containerWidth = containerRef.current.offsetWidth;
      const newLeftWidth = (newWidth / containerWidth) * 100;
      setLeftWidth(newLeftWidth);
    }
  }, 50); 

  const handleMouseMove = (e) => {
    if (isLCResizing) lcHandleMouseMove(e);
    else if (isMCResizing) mcHandleMouseMove(e);
  };

  const handleMouseUp = () => {
    if (isLCResizing) lcHandleMouseUp();
    else if (isMCResizing) mcHandleMouseUp();
  };

  // console.log(middleWidth + " " + leftWidth + " " + rightWidth);

  return (
    <main ref={containerRef} className="flex h-screen w-full overflow-hidden p-12"
      onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {uploadNotification != 0 && (<Notifications />)}
      {showModal && <ContactModal />}
      {([1, 2, 3].includes(showListManagementModal)) && <ListManagementModal />}
      {leftWidth != 0 && (<div className="relative bg-[#161616] h-full rounded-l-xl  flex flex-col p-3" style={{ width: `${leftWidth}%`, maxWidth: `20%` }}>
        <div className="flex w-full h-fit justify-between border-b-[1px] border-[#2f2f2f] pb-3">
          <h1 className="text-center font-bold text-4xl ml-4 text-[#d4d4d4]">Lists</h1>
        </div>
        <div className="flex flex-col overflow-y-auto my-2">
          <React.Fragment>
            {lists.map((list, list_index) => {
              return (
                <ListListCard list={list} list_index={list_index} />
              )
            })}
          </React.Fragment>
        </div>
        <div className="absolute w-1 h-5 bg-[#7c7c7c] right-[-2px] z-[5] top-1/2 cursor-col-resize rounded-xl"
          onMouseDown={lcHandleMouseDown} />
        </div>)}
      <div className="flex h-full w-full">
        <div className="flex flex-grow w-full" style={{ width: `${rightWidth}%` }}>
          {/* Contact List Container */}
          <div style={{ width: `${middleWidth - leftWidth}%`, minWidth: `30%` }}
            className={`relative bg-[#141414] h-full w-full flex flex-col border-r-[1px] border-[#222222] p-3 ${leftWidth == 0 ? 'rounded-l-xl' : ''}`}>
            <div className="flex w-full justify-between border-b-[1px] border-[#2f2f2f] pb-3">
              <h1 className="text-center font-bold text-4xl ml-4 text-[#d4d4d4]">Contacts</h1>
              <div>
                <IoSearchOutline size={35} color="#d4d4d4" className="mr-4 h-full " />
              </div>
            </div>
            <div className="absolute w-1 h-5 bg-[#7c7c7c] right-[-2px] top-1/2 cursor-col-resize rounded-xl"
              onMouseDown={mcHandleMouseDown} />
            <div className="flex-1 overflow-y-auto px-2">
              {contacts.map((contact_obj, order_index) => {
                var contact_key = Object.keys(contact_obj)[0];
                return (
                  contact_obj[contact_key].length > 0 && (<React.Fragment>
                    <ContactCardHeader key={order_index} letter={contact_key} />
                    {contact_obj[contact_key].map((contact, name_index) => {
                      return (
                        <ListContactCard key={contact.id} name_index={name_index} order_index={order_index} contact_info={contact} />
                      )
                    })}
                  </React.Fragment>)
                );
              })
              }
            </div>
          </div>
          {/* Contact Info Container */}
          <div style={{ width: `${rightWidth - middleWidth}%`, minWidth: `60%` }}
            className="bg-[#212121] flex-grow rounded-r-xl p-12">
            <ContactCard listsColumnWidth={leftWidth} setListsColumnWidth={setLeftWidth} />
          </div>
        </div>
      </div>
    </main>
  );
}
