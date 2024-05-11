"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ListContactCard from "./components/list_contact_card";
import ContactCardHeader from "./components/contact_card_header";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";
import { IconContext } from "react-icons";
import vCard from "vcf";
export default function Home() {
  const [isResizing, setIsResizing] = useState(false);
  const [leftWidth, setLeftWidth] = useState(25); // Initial width in percentage
  const containerRef = useRef(null);

  // var cards = vCard.parse(JSON.stringify(/Users/akhileshbitla/Work/projects/contacts/src/contacts.vcf))
  // console.log(cards);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/read-vcf/') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
          console.log(text);
          var cards = vCard.parse(text);
          console.log(cards);
        })
        .catch(error => {
            console.log(error);
        });
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


  return (
    <main ref={containerRef} className="flex h-screen w-full overflow-hidden p-12" 
    onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* Contact List Container */}
      <div style={{ width: `${leftWidth}%` }}
        className="relative bg-[#141414] min-w-[25%] h-full w-full flex-col rounded-l-xl border-r-[1px] border-[#222222] p-3">
        <div className="flex w-full justify-between border-b-[1px] border-[#2f2f2f] pb-3">
          <h1 className="text-center font-bold text-4xl ml-4 text-[#d4d4d4]">Contacts</h1>
          <div>
            <IoSearchOutline size={35} color="#d4d4d4" className="mr-4 h-full "/>
          </div>
        </div>
        <div className="absolute w-5 h-5 bg-[#d4d4d4] right-[-10px] top-1/2 cursor-col-resize rounded-xl"
        onMouseDown={handleMouseDown} />
        <ContactCardHeader letter={"A"}/>
        <ListContactCard name={"Akhilesh Bitla"} />

      </div>
      {/* Contact Info Container */}
      <div style={{ width: `${100 - leftWidth}%`, minWidth: `40%` }}
          className="bg-[#212121] flex-grow rounded-r-xl"
      />
    </main>
  );
}
