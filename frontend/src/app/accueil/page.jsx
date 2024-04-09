import React from "react";
import SideBar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";
import Profile from "../components/Profile";
import Poste from "../components/Poste";
import Messages from "../components/Messages";
import { BiSolidMessage } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FaFileVideo } from "react-icons/fa";
import { IoAttach } from "react-icons/io5";

const page = () => {
  const rec = [
    {
      name: "katarina mid",
      src: "/katarina.png",
    },
    {
      name: "tarik support",
      src: "/tarik.png",
    },
    {
      name: "lux mid",
      src: "/lux.png",
    },
    {
      name: "ezreal adc",
      src: "/ezreal.png",
    },
  ];
  const posts = [
    {
      name: "yassine bg",
      caption: "gg ez go next",
      profilePic: "/gilfoyl.png",
      src: "/gilfoyl.png",
      likes: 25,
      comments: 30,
      share: 33,
    },
  ];
  return (
    <div className="flex flex-row sticky">
      <div className="w-4">
        <SideBar />
      </div>
      <div className="mr-1.5">
        <img src="/placeholder1.jpg" alt="" className="w-4.25 mt-2" />
        <div className="flex border-2 p-1 rounded-mdd">
          <CiSearch size={25} />
          <input type="" className="w-4.25 px-1" placeholder="search ..." />
        </div>
        <div className="mt-1.25 py-1 border-2 rounded-semilg px-2.15">
          <h2 className="text-183153 font-bold pb-1.5 pt-2">
            Add to your friend list
          </h2>
          {rec.map((item, index) => (
            <ProfileCard key={index} image={item.src} name={item.name} />
          ))}
          <p className="text-center text-gray-500">view all</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="border-2 max-h-4 mt-2 rounded-semilg mb-1.5">
          <div className="flex flex-row p-2 border-b-2">
            <img src="/gilfoyl.png" alt="" className="w-1.25 rounded-lg" />
            <input
              type="text"
              name=""
              id=""
              className="bg-silver rounded-md pr-4 mx-1.25 px-4"
              placeholder="whats on your mind?"
            />
            <button className="bg-[#538DD7] text-white font-semibold py-1.15 px-2 rounded-md">
              Share
            </button>
          </div>
          <div className="flex flex-row pl-2 pt-2">
            <div className="flex flex-row mr-1.25">
              <CiImageOn size={20} />
              <p>Image</p>
            </div>
            <div className="flex flex-row mr-1.25">
              <FaFileVideo size={20} />
              <p>video</p>
            </div>
            <div className="flex flex-row">
              <IoAttach size={20} />
              <p>attachement</p>
            </div>
          </div>
        </div>
        {posts.map((item, index) => (
          <Poste
            key={index}
            profilePic={item.profilePic}
            name={item.name}
            caption={item.caption}
            src={item.src}
            likes={item.likes}
            comments={item.comments}
            share={item.share}
          />
        ))}
      </div>
      <div>
        <div className="mt-1.25 py-1 border-2 rounded-semilg px-2.15 ml-3">
          <div className="flex flex-row gap-3">
            <h2 className="text-183153 font-bold pb-1.5 pt-2">Messages</h2>
            <BiSolidMessage size={25} className="mt-1.25" />
          </div>
          {rec.map((item, index) => (
            <Messages
              key={index}
              image={item.src}
              name={item.name}
              lastMsg={"salam coco cv?"}
            />
          ))}
          <p className="text-center text-gray-500">view all</p>
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default page;
