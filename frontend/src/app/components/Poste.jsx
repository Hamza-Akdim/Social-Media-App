import React from "react";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaShare } from "react-icons/fa";

const Poste = ({ name, caption, profilePic, src, likes, comments, share }) => {
  return (
    <div className="flex flex-col border-2 rounded-semilg">
      <div className="flex flex-row pt-2 pl-2">
        <img src={profilePic} alt="" className="w-1.25 rounded-lg mr-1.25" />
        <h6 className="text-base font-semibold">{name}</h6>
      </div>
      <p className="pl-2 pt-1 pb-2">{caption}</p>
      <img
        src={src}
        alt=""
        className="w-8 h-5 m-auto rounded-mdd border-b-2 mb-1.25"
      />
      <div className="flex flex-row gap-4 mx-auto pb-2">
        <div className="flex">
          <BiSolidLike size={20} />
          <p className="">{likes}likes</p>
        </div>
        <div className="flex flex-row">
          <BiSolidCommentDetail size={20} />
          <p>{comments}comments</p>
        </div>
        <div className="flex">
          <FaShare size={20} />
          <p>{share}share</p>
        </div>
      </div>
      <div className="flex flex-row pl-2  mb-1.5">
        <img src={profilePic} alt="" className="w-1 rounded-lg mr-1.25" />
        <input
          type="text"
          name=""
          id=""
          className="bg-silver rounded-md pr-4 mx-1.25 px-5"
          placeholder="whats on your mind?"
        />
      </div>
    </div>
  );
};

export default Poste;
