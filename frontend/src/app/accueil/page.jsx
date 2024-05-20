"use client";
import React from "react";
import AuthGuard from "../components/AuthGuard";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
import Feed from "../components/Feed";
import SearchColumn from "../components/SearchColumn";
import LastColumn from "../components/LastColumn";

const Page = () => {
  return (
    <div
      className="bg-cover bg-center bg-gray3 h-screen flex"
      style={{ backgroundImage: "url('zlijj.png')" }}
    >
      <div className="w-3 fixed top-0 h-screen">
        <SideBar />
      </div>
      <div className="flex-1 ml-3 overflow-y-auto">
        <div className="flex flex-row h-full">
          <div className="w-1/4">
            <SearchColumn />
          </div>
          <div className="w-1/2">
            <Feed />
          </div>
          <div className="w-1/4 flex flex-col">
            <LastColumn />
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
