import React from "react";

const Poste = ({ name, caption, profilePic, src, likes }) => {
  return (
    <div className="flex flex-col border-3 border-gray2 rounded-mdd bg-white mb-1.5">
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
      <div className="flex flex-row items-center justify-between  m-auto mb-1 bg-gray2 w-8">
        <div className="flex items-center">
          <img src="/Add.png" width={20} height={20} className="mr-1"/>
          <div>
            <p className="">{likes} found this interesting</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <img src="/Comment.png" width={20} height={20} className="mr-1"/>
          <div>
            <p>0 comments</p>
          </div>
        </div>
        <div className="flex items-center">
          <img src="/Share.png" width={20} height={20} className="mr-1"/>
          <div>
            <p>0 share</p>
          </div>
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
