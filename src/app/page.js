"use client";
import axios from "axios";
import React from 'react';
import { useState, useRef, useEffect } from "react";
import ListContactCard from "./components/list_contact_card";
import ContactCardHeader from "./components/contact_card_header";
import ContactCard from "./components/contact_card";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";
import { useDispatch } from "react-redux";
import { setContactInfo } from "./action";
import { IconContext } from "react-icons";

export default function Home() {
  const [isResizing, setIsResizing] = useState(false);
  const [leftWidth, setLeftWidth] = useState(25); // Initial width in percentage
  const [contacts, setContacts] = useState([]);
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/contacts/?format=json');
        var size = response.data.length;
        // console.log(size);
        var all_contacts = [];
        var total = 0

        for (var c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
          var sorted_contacts = []
          for (var j = 0; j < size; j++) {
            const contact = response.data[j].full_name;
            // console.log(contact[contact.length - 1]);
            if (String.fromCharCode(c) == contact[contact.length - 1].toLowerCase().charAt(0)) {
              sorted_contacts.push(response.data[j]);
            }
          }
          all_contacts.push({[String.fromCharCode(c).toUpperCase()] : sorted_contacts});
          total += sorted_contacts.length;
        }

        var leftover_contacts = []
        for (var k = 0; k < size; k++) {
          const contact = response.data[k].full_name;
          if (contact[contact.length - 1] == '' || (contact[contact.length - 1].toLowerCase().charAt(0) 
          < 'a'.charCodeAt(0)) || (contact[contact.length - 1].toLowerCase().charAt(0) 
          > 'z'.charCodeAt(0)) || contact[contact.length - 1].toLowerCase().charAt(0) == '(') {
            leftover_contacts.push(response.data[k]);
          }
        }

        all_contacts.push({'OTHER' : leftover_contacts});
        total += leftover_contacts.length;

        setContacts(all_contacts);
      } catch (e) {
        console.log('Error fetching contacts');
    };
  }
  fetchContacts();
  }, []);

  const handleMouseDown = (e) => {
      e.preventDefault();
      setIsResizing(true);
  };

  const handleMouseMove = (e) => {
      if (isResizing) {
          const newWidth = e.clientX; // x-coordinate of the mouse pointer
          const containerWidth = containerRef.current.offsetWidth;
          const newLeftWidth = (newWidth / containerWidth) * 100;
          setLeftWidth(newLeftWidth);
      }
  };

  const handleMouseUp = () => {
      setIsResizing(false);
  };
  // const initial = contacts.filter((contact_obj) => {
  //   var key = Object.keys(contact_obj)[0];
  //   return contact_obj[key].filter((contact, index) => {
  //     // console.log(contact);
  //     return index == 0;
  //   });
  // })
  // console.log(initial);
  // const sortedKeys = Object.values(contacts)[0];  // Sort keys if needed
  // // const firstElement = contacts[firstKey][0];
  // console.log(sortedKeys);                        

  return (
    <main ref={containerRef} className="flex h-screen w-full overflow-hidden p-12" 
    onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* Contact List Container */}
      <div style={{ width: `${leftWidth}%` }}
        className="relative bg-[#141414] min-w-[25%] h-full w-full flex flex-col rounded-l-xl border-r-[1px] border-[#222222] p-3">
        <div className="flex w-full justify-between border-b-[1px] border-[#2f2f2f] pb-3">
          <h1 className="text-center font-bold text-4xl ml-4 text-[#d4d4d4]">Contacts</h1>
          <div>
            <IoSearchOutline size={35} color="#d4d4d4" className="mr-4 h-full "/>
          </div>
        </div>
        <div className="absolute w-5 h-5 bg-[#d4d4d4] right-[-10px] top-1/2 cursor-col-resize rounded-xl"
        onMouseDown={handleMouseDown} />
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact_obj, index) => {
            var contact_key = Object.keys(contact_obj)[0];
            // <cons></cons>ole.log(key);
            if (index == 0) {
              dispatch(setContactInfo([contact_obj[contact_key][0]]));
            }
            return (
                  contact_obj[contact_key].length > 0 && (<>
                    <ContactCardHeader letter={contact_key}/>
                    {contact_obj[contact_key].map((contact, index,) => {
                      return (
                        <ListContactCard list_index={index} contact_info={contact} />
                      )
                    })}
                  </>)
                  );
                })
              }
        </div>
      </div>
      {/* Contact Info Container */}
      <div style={{ width: `${100 - leftWidth}%`, minWidth: `40%` }}
      className="bg-[#212121] flex-grow rounded-r-xl p-12">
        <ContactCard />
      </div>
    </main>
  );
}
