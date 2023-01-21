import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsBarChart, BsChatDots } from "react-icons/bs";
import Moment from "react-moment";

function Comment({ comment }) {
  return (
    <div className="p-3 flex cursor-pointer border-b border-slate-100">
      <img
        src={comment?.userImg}
        alt=""
        className="h-11 w-11 rounded-full mr-4"
      />
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-slate-800">
            <div className="inline-block group">
              <h4 className="font-bold text-slate-800 text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-slate-800 mt-0.5 max-w-lg text-[15px] sm:text-base">
              {comment?.comment}
            </p>
          </div>
          <div className="flex-shrink-0">
            <BiDotsHorizontalRounded className=" text-slate-800 hover:text-deepBlue" />
          </div>
        </div>

        <div className="text-slate-800 flex justify-between w-10/12">
          <div className=" hover:bg-blue-100 rounded-full p-2">
            <BsChatDots className="h-5 w-5 hover:text-deepBlue" />
          </div>

          <div className="hover:bg-pink-600/10 rounded-full p-2">
            <AiOutlineHeart className="h-5 w-5 hover:text-pink-600" />
          </div>

          <div className=" hover:bg-blue-100 rounded-full p-2">
            <AiOutlineShareAlt className="h-5 w-5 hover:text-deepBlue" />
          </div>
          <div className=" hover:bg-blue-100 rounded-full p-2">
            <BsBarChart className="h-5 w-5 hover:text-deepBlue" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
