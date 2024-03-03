"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useMyContext } from "@/Contexts/MyContext";

interface CardProps {
  id: string;
  username: string;
  profile: string;
  description: string;
}
const Card: React.FC<CardProps> = ({ username, profile, description, id }) => {
  const { handleDelete, setselectUser, selectUser } = useMyContext();

  console.log(selectUser);

  const cartStyle =
    "w-[400px] h-[270px] bg-white rounded-lg shadow-sm shadow-slate-500 cursor-pointer";
  return (
    <>
      <div
        onClick={() => {
          if (selectUser === id) {
            // unselect
            setselectUser("");
          } else {
            // select
            setselectUser(id);
          }
        }}
        className={
          selectUser === id ? `${cartStyle} bg-blue-300` : `${cartStyle}`
        }
      >
        <div className="bg-white-500 w-[500px] border border-gray-200 rounded-lg shadow-md p-5 flex items-center">
          <button className="absolute top-3 left-[460px] bg-gray-200 hover:bg-gray-300 rounded-full w-[30px] h-[30px] transition-colors">
            <span className="font-bold text-gray-700">&times;</span>
          </button>
          <div className="flex justify-center items-center mr-4">
            <Image
              src={profile}
              alt={`profile ${name}`}
              width={100}
              height={100}
            />
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">{username}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mt-3">
              Preview
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
