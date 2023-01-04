import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, Fragment } from "react";
import { Dialog } from '@headlessui/react';
import {
  EmojiHappyIcon as EmojiHappyIconSolid,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  ThumbUpIcon,
  XIcon,
  Bars3Icon, 
  XMarkIcon
} from "@heroicons/react/solid";
export default function Home() {
  // React Hooks
  const [data, setData] = useState({ text: "" });
  const [query, setQuery] = useState();
  const [query2, setQuery2] = useState();
  const [query3, setQuery3] = useState();
  const [search, setSearch] = useState();
  const [search2, setSearch2] = useState();
  const [search3, setSearch3] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search,
            name2: search2,
            name3: search3,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, search2, search3]);
  // What we want to render
  return (
    <Fragment>
      <Head>
        <title>Self-Prop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-br from-emerald-400 via-blue-600 to-violet-500 min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <main className="flex flex-col justify-center  max-w-3xl w-full align-center">
          <h1 className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-indigo-600 duration-300 text-4xl text-center font-semibold text-slate-800 drop-shadow sm:text-2xl mb-1 mx-16">
            Starfish
          </h1>
          <div className="relative overflow-hidden bg-gradient-to-bl from-emerald-400 via-blue-300 to-violet-400 rounded-3xl py-2 px-8 text-sm leading-6 ring-4 mt-6 ring-gray-900/10 hover:ring-gray-900/20">
            <p className="block text-[16px] text-center mt-6 text-gray-800 underline decoration-violet-500">
            Select a topic or domain.
        </p>

          {/* Card & Input field  */}
          <div className="text-center relative backdrop-filter overflow-hidden mb-6 max-w w-full rounded-md  ring-1 ring-black ring-opacity-0 px-4 py-2 ">
            <textarea
              className="max-w shadow-md bg-gray-100 text-gray-800 px-4 py-2   h-24  block w-full caret-pink-500 focus:ring-pink-500 focus:border-pink-500 text-sm border border-gray-300 rounded-lg"
              type="textarea"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="(Natural language processing, language translation, sentiment analysis)"
              defaultValue={""}
            />

            
            <p className="block text-[16px] text-center mt-8 px-4 text-gray-800 underline decoration-sky-500">
            Enter a specific task for your prompt.
          </p>

          {/* Card & Input field  */}
          <div className="text-center relative backdrop-filter overflow-hidden mb-6  px-0 max-w w-full rounded-md  ring-1 ring-black ring-opacity-0 p-2 ">
            <textarea
              className="max-w shadow-md bg-gray-100 text-gray-800 px-4 py-2 h-24 block w-full caret-pink-500 focus:ring-inset focus:ring-pink-500 focus:border-pink-500 text-sm border border-gray-300 rounded-lg"
              type="textarea"
              value={query2}
              onChange={(event) => setQuery2(event.target.value)}
              placeholder="Describe your task (e.g. write a summary of the main points in this article, analyze and shift the tone of a passage)"
              defaultValue={""}
            />
            <p className="block text-[16px] text-center mt-8 px-8 text-gray-800 underline decoration-violet-500">
            (Optional) Any additional details or requirements for your prompt.
          </p>

          {/* Card & Input field  */}
          <div className="text-center relative backdrop-filter overflow-hidden mb-6 max-w w-full rounded-md  ring-1 ring-black ring-opacity-0 py-2 ">
            <textarea
              className="max-w shadow-md bg-gray-100 text-gray-800 px-4 py-2    h-32  block w-full caret-pink-500 focus:ring-inset focus:ring-pink-500 focus:border-pink-500 text-sm border border-gray-300 rounded-lg"
              type="textarea"
              value={query3}
              onChange={(event) => setQuery3(event.target.value)}
              placeholder="(e.g. the summary should be concise and focus on the main points of the article, the sentiment of the text should be accurately classified)"
              defaultValue={""}
            />
            
            {/* Button to that calls API */}
            <div className="text-center relative backdrop-filter overflow-hidden mb-6 mt-2 max-w w-full rounded-md  ring-1 ring-black ring-opacity-0 py-4 ">  
            <button
              className="inline-block rounded-full bg-gradient-to-tr from-emerald-500/90 via-blue-600/80 to-violet-500 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-2 ring-emerald-600 hover:from-pink-500 hover:to-yellow-500 hover:ring-teal-600"
              type="button"
              onClick={() => [setSearch(query), setSearch2(query2), setSearch3(query3)]}
            >
              Prompt Me!
            </button>

              <div className="mt-5 p-5 text-sm text-gray-900 border-t-2 border-slate-200 ">
              {isLoading ? <div>Loading ...</div> : <span> {data.text} </span>}
              {/* {lorem} */}
              </div>
            </div>
          </div>
           </div> 
            </div>
          </div>  
        </main>
      </div>
    </Fragment>
  );
}
