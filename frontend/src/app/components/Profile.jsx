import React from "react";
import { IoLogOutOutline } from "react-icons/io5";

const Profile = () => {
  return (
    <div className="ml-3 mt-1.5 border-2 rounded-semilg">
      <div className="bg-silver p-2 mx-1.25 mt-1.25 rounded-semilg">
        <div className="flex flex-row">
          <img src="/gilfoyl.png" alt="" className="w-1.25 rounded-lg" />
          <div className="ml-1.25">
            <h4 className="text-blue-500 font-semibold">yassine bg</h4>
            <h6 className="text-sm">@yassine_bg_2002</h6>
          </div>
        </div>
        <div className="flex pt-2.15 gap-1 text-blue-900 font-semibold">
          <div className="flex flex-col">
            <p className="text-center">
              69 <br />
            </p>
            <p>friends</p>
          </div>
          <div className="flex flex-col ">
            <p className="text-center">
              69 <br />
            </p>
            <p>followers</p>
          </div>
          <div className="flex flex-col">
            <p className="text-center">
              69 <br />
            </p>
            <p>posts</p>
          </div>
        </div>
      </div>
      <div className="flex pl-4 my-1">
        <IoLogOutOutline size={25} />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Profile;
