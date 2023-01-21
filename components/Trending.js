import React from "react";
import { FiSearch } from "react-icons/fi";
import TrendingList from "./TrendingList";

const Trending = () => {
  return (
    <div className="hidden lg:block mt-2 flex-1 max-w-[350px] mr-3 sm:mr-5">
      <div className="bg-gray-100 flex gap-2 rounded-full py-2 px-4  items-center text-[20px] sticky top-1 z-10">
        <FiSearch />
        <input
          className="bg-transparent w-[100%] outline-none"
          type="text"
          placeholder="Search Twitter"
        />
      </div>

      <div className="bg-gray-100 rounded-[20px]  mt-4">
        <h1 className="text-[20px] font-medium p-4">Trends for you</h1>

        <TrendingList />
        <TrendingList />
        <TrendingList />
        <TrendingList />
        <TrendingList />
        <TrendingList />
      </div>
    </div>
  );
};

export default Trending;
