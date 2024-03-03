"use client";
import React from "react";
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

  return (
    <div
      onClick={() => {
        if (selectUser === id) {
          setselectUser(""); // Unselect
        } else {
          setselectUser(id); // Select
        }
      }}
      className={`w-64 h-64 bg-white rounded-lg shadow-md cursor-pointer 
                 transition-colors duration-200 hover:shadow-lg
                 ${selectUser === id ? "bg-blue-100 hover:bg-blue-200" : ""}`}
    >
      <div className="border border-gray-200 rounded-lg p-5 flex items-center">
        <button className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 transition-colors flex items-center justify-center">
          <span className="font-bold text-gray-700">&times;</span>
        </button>

        <div className="flex items-center mr-4">
          <Image
            src={profile}
            alt={`profile ${username}`}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">{username}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mt-3">
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
