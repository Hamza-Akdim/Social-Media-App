import React from "react";

const ProfileCard = ({ name, image }) => {
  return (
    <div className="flex gap-0.5 pt-1 pb-1.5 border-b-2 ">
      <img src={image} alt="" className="w-1.25 rounded-lg" />
      <div className="">
        <h6>{name}</h6>
        <button className="text-sm border-2">add now</button>
      </div>
    </div>
  );
};

export default ProfileCard;
