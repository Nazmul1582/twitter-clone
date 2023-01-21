import React from "react";
import {
  BsBell,
  BsBookmark,
  BsSearch,
  BsThreeDots,
  BsTwitter,
} from "react-icons/bs";
import { AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import {
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import SidebarLink from "./SidebarLink";
import { RiHome7Fill } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <>
      <div className="hidden sm:flex flex-col left-0 xl:w-[275px]  border-r border-slate-200">
        <div className="flex items-center justify-center w-14 h-14 hoverEffect hover:bg-blue-100 p-0">
          <BsTwitter className="text-4xl text-deepBlue" />
        </div>
        <div className="hidden sm:flex flex-col">
          <div className="hidden sm:block space-y-2 mt-4 mb-2.5">
            <SidebarLink text="Home" Icon={RiHome7Fill} />
            <SidebarLink text="Explore" Icon={BiHash} />
            <SidebarLink text="Notifications" Icon={BsBell} />
            <SidebarLink text="Messages" Icon={AiOutlineInbox} />
            <SidebarLink text="Bookmarks" Icon={BsBookmark} />
            <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
            <SidebarLink text="Profile" Icon={AiOutlineUser} />
            <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
          </div>
          <button className="hidden xl:block bg-deepBlue text-white rounded-full w-52 h-[52px] text-lg font-bold hover:bg-[#1a8cd8]">
            {" "}
            Tweet
          </button>
          <div
            className="text-slate-800 flex items-center gap-2 justify-center mt-5 hoverEffect p-2 self-start"
            onClick={signOut}
          >
            <img
              src={session?.user?.image}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div className="hidden xl:inline text-sm">
              <h4 className="font-bold">{session?.user?.name}</h4>
              <p className="text-sm">@{session?.user?.tag}</p>
            </div>
            <BsThreeDots className="h-5 hidden xl:inline" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 sm:hidden fixed left-0 bottom-0  w-full bg-white border-t border-slate-100 py-2 shadow-md">
        <SidebarLink text="Home" Icon={RiHome7Fill} />
        <SidebarLink text="Search" Icon={BsSearch} />
        <SidebarLink text="Notifications" Icon={BsBell} />
        <SidebarLink text="Messages" Icon={AiOutlineInbox} />
      </div>
    </>
  );
}
