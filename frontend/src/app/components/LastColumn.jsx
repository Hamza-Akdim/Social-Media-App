"use client";
import React from "react";
import Messages from "../components/Messages";
import { BiSolidMessage } from "react-icons/bi";

const LastColumn = () => {
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
    <div className="mt-1.25 py-1 border-2 rounded-semilg px-2.15 ml-3 sticky top-0">
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
  );
};

export default LastColumn;
