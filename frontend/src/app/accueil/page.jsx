"use client";
import React from "react";
import AuthGuard from "../components/AuthGuard";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
import Feed from "../components/Feed";
import SearchColumn from "../components/SearchColumn";
import LastColumn from "../components/LastColumn";

const page = () => {
  return (
    <div className="bg-cover bg-center bg-scroll bg-gray3 h-screen flex flex-row fixed w-screen"  style={{backgroundImage: "url('zlijj.png')"}}>
      <div className="w-3 " >
        <SideBar />
      </div>
      <div  >
        <SearchColumn />
      </div>
      <Feed />
      <div>
        <LastColumn />
        <Profile />
      </div>
    </div>
  );
};

export default page;
