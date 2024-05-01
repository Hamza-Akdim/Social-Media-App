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
    <div className="flex flex-row sticky">
      <div className="w-4">
        <SideBar />
      </div>
      <SearchColumn />
      <Feed />
      <div>
        <LastColumn />
        <Profile />
      </div>
    </div>
  );
};

export default AuthGuard(page);
