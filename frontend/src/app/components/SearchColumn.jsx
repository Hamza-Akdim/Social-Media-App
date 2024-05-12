"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";
import ProfileCard from "./ProfileCard";

const SearchRow = () => {
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
  return (
    <div className="mr-1.5">
      <div className="mt-1.5">
        <img src="/AtlasNet.png" alt="" className="w-4.25" />
      </div>
      <div className="flex align-items border-3 border-gray2 p-1.15 mt-1 h-10 bg-white rounded-mdd">
        <img src="Search.png" size={25} className="mr-1 ml-0.5"/>
        <input type="" className="w-4.25 px-1" placeholder="search ..." />
      </div>
      <div className="mt-0.7 py-1 border-3 border-gray2 bg-white rounded-mdd px-2.15">
        <h2 className="text-183153 font-bold pb-1.5 pt-2">
          Add to your friend list
        </h2>
        {rec.map((item, index) => (
          <ProfileCard key={index} image={item.src} name={item.name} />
        ))}
        <p className="text-center text-gray-500">view all</p>
      </div>
    </div>
  );
};

export default SearchRow;
