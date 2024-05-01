import React from "react";
import { IoMdMenu, IoMdNotifications } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { CgGames } from "react-icons/cg";
import { IoLogOutSharp } from "react-icons/io5";

const SideBar = () => {
  return (
    <div className="mt-2 ml-2 border-2 flex flex-col gap-4 max-w-2 items-center rounded-semilg sticky top-0">
      <div className="pl-1.5 border-b-2 w-full">
        <IoMdMenu size={35} />
      </div>
      <div className="py-2 flex flex-col gap-0.5">
        <FaHome size={35} />
        <MdAccountCircle size={35} />
        <IoMdNotifications size={35} />
        <LuMessagesSquare size={35} />
        <CgGames size={35} />
      </div>
      <div>
        <IoLogOutSharp size={35} />
      </div>
    </div>
  );
};

export default SideBar;
