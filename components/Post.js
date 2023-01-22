import { AppContext } from "@/contexts/AppContext";
import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Moment from "react-moment";

export default function Post({ id, post }) {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const { data: session } = useSession();
  const router = useRouter();
  const [appContext, setAppContext] = useContext(AppContext);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db, id]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  const openModal = () => {
    setAppContext({
      ...appContext,
      isModalOpen: true,
      post,
      postId: id,
    });
  };

  return (
    <div
      className="border-t border-slate-100 px-4 pt-6 pb-4 cursor-pointer hover:bg-slate-50 duration-200"
      onClick={() => router.push(`/${id}`)}
    >
      <div className="grid grid-cols-[48px,1fr] gap-4">
        <div>
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={post?.userImg}
            alt=""
          />
        </div>

        <div>
          <div className="block sm:flex gap-1">
            <h1 className="font-medium">{post?.username}</h1>

            <div className="flex">
              <p className="text-gray-500">@{post?.tag} &nbsp;·&nbsp;</p>
              <p className="text-gray-500">
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </p>
            </div>
          </div>
          <p>{post?.text}</p>
          <img
            className="max-h-[450px] object-cover rounded-[20px] mt-2"
            src={post?.image}
            alt=""
          />

          <div className="flex justify-between text-xl mt-4 w-[80%]">
            <div className="flex gap-1 items-center">
              <div className=" hover:bg-blue-100 hover:text-deepBlue rounded-full p-2">
                <BsChat
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                />
              </div>
              {comments.length > 0 && (
                <span className="text-sm text-black">{comments.length}</span>
              )}
            </div>

            {session.user.uid !== post?.id ? (
              <div className=" hover:bg-blue-100 hover:text-deepBlue rounded-full p-2">
                <FaRetweet className="h-5 w-5" />
              </div>
            ) : (
              <div className=" hover:bg-blue-100 hover:text-deepBlue rounded-full p-2">
                <RiDeleteBin5Line
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDoc(doc(db, "posts", id));
                  }}
                />
              </div>
            )}

            <div
              className="flex gap-1 items-center"
              onClick={(e) => {
                e.stopPropagation();
                likePost();
              }}
            >
              {liked ? (
                <div className="hover:bg-pink-600/10 hover:text-pink-600 rounded-full p-2">
                  <AiFillHeart className="h-5 w-5 text-pink-600" />
                </div>
              ) : (
                <div className="hover:bg-pink-600/10 hover:text-pink-600 rounded-full p-2">
                  <AiOutlineHeart className="h-5 w-5" />
                </div>
              )}

              {likes.length > 0 && (
                <span className={`${liked && "text-pink-700"} text-sm`}>
                  {likes.length}
                </span>
              )}
            </div>

            <div className=" hover:bg-blue-100 hover:text-deepBlue rounded-full p-2">
              <AiOutlineShareAlt className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
