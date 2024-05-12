import React from "react";
import { IoMdMenu } from "react-icons/io";

const SideBar = () => {
  return (
    <div className="h-95 pt-1 pb-2 mt-1 ml-1 border-3 flex flex-col justify-between gap-4 max-w-2 bg-white border-gray2 items-center rounded-mdd sticky top-0">
      <div className="pl-1.5 border-b-2 w-full">
        <IoMdMenu size={35} />
      </div>
      <div className="py-2 flex flex-col gap-0.5">.
        <div className="hover:bg-blueHover p-1 rounded-llg">
          <img src="/Home.png" alt="Menu" width={35} height={35} />
        </div>
        <div className="hover:bg-blueHover p-1 rounded-llg">
          <img src="/Profile.png" alt="Menu" width={35} height={35} /> 
        </div>
        <div className="hover:bg-blueHover p-1 rounded-llg">
          <img src="/Notif.png" alt="Menu" width={35} height={35} />
        </div>
        <div className="hover:bg-blueHover p-1 rounded-llg">
          <img src="/message.png" alt="Menu" width={35} height={35} />
        </div>
        <div className="hover:bg-blueHover p-1 rounded-llg">
          <img src="/Games.png" alt="Menu" width={35} height={35} />
        </div>
      </div>
      <div className="hover:bg-blueHover p-1 rounded-llg">
        <img src="/Logout.png" alt="Menu" width={35} height={35} />
      </div>
    </div>
  );
};

export default SideBar;
