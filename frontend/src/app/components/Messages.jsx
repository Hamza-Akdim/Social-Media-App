import React from "react";

const Messages = ({ name, image, lastMsg }) => {
  return (
    <div className="flex gap-0.5 pt-1 pb-1.5 border-b-2 ">
      <img src={image} alt="" className="w-1.25 rounded-lg" />
      <div className="">
        <h6 className="font-bold" >{name}</h6>
        <p className="text-sm">{lastMsg}</p>
      </div>
    </div>
  );
};

export default Messages;
