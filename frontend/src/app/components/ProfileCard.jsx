import React from "react";

const ProfileCard = ({ name, image }) => {
  return (
    <div className="flex gap-0.5 pt-1 pb-1.5 border-b-2 ">
      <img src={image} alt="" className="w-1.25 rounded-lg" />
      <div className="">
        <h6 className="font-bold">{name}</h6>
        <button className="text-sm font-medium  pl-1.15 pr-1.15  bg-gray3 rounded-md">add now</button>
      </div>
    </div>
  );
};

export default ProfileCard;
