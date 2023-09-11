"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<any[]>([]);

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    setTimeout(() => {
      fetchSuggestionFunc();
    }, 3000);
  }, [board]);
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055d1] rounded-md filter blur-3xl opacity-50 -z-50"></div>

        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form
            action=""
            className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              placeholder="Search"
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="Vishnu Bansal" round size="50" color="#0055D1" />
        </div>
      </div>

      <div className="flex items-center justify-center py-2 px-5 md:py-5">
        <p className="flex p-5 items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055d1] mr-1  ${
              loading && "animate-spin"
            }`}
          />
          {suggestion.length !== 0
            ? `You have ${
                suggestion[0] === 1
                  ? "1 task to do"
                  : `${suggestion[0]} tasks to do`
              }, ${
                suggestion[1] === 1
                  ? "1 task in progress"
                  : `${suggestion[1]} tasks in progress `
              } and ${
                suggestion[2] === 1
                  ? "1 task done"
                  : `${suggestion[2]} tasks done`
              }`
            : "We are summarising your tasks for the day"}
        </p>
      </div>
    </header>
  );
}

export default Header;
