"use client";
import MotionWrapper from "@/components/MotionWrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "@utils/api";
import { Post } from "@utils/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchBar from "@components/SearchBar";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  const MAX_SUMMARY_LENGTH = 150;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        setIsLoading(true);
        const response = await getAllPosts();
        setIsLoading(false);
        setPosts(response);
      } catch (error: any) {
        setIsLoading(false);
        console.error(error);
        setError(error.message || "An error occurred fetching the post.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const excerpt = (summary: string): string => {
    return summary.length > MAX_SUMMARY_LENGTH
      ? summary.substring(0, MAX_SUMMARY_LENGTH) + "..."
      : summary;
  };

  const handlePostDetail = (slug: string): void => {
    router.push(`/posts/${slug}`);
  };
  const fetchPosts = async (searchQuery?: string) => {
    setIsLoading(true);
    try {
      // Pass the searchQuery to getAllPosts function
      const response = await getAllPosts(searchQuery);
      setPosts(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred fetching the post.");
    }
  };
  const handleSearch = (searchQuery: string) => {
    fetchPosts(searchQuery);
  };

  const images = [
    "/logos/Laravel.png",
    "/logos/MongoDB.png",
    "/logos/MySQL.png",
    "/logos/Python.png",
    "/logos/React.png",
    "/logos/SQLite.png",
    "/logos/Vue.png",
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <>
      <>
        <MotionWrapper>
          <main className="bg-white relative py-20">
            <img
              alt=""
              width={2170}
              height={1494}
              decoding="async"
              data-nimg={1}
              className="hidden dark:sm:hidden sm:block absolute top-[-6.25rem] left-1/2 max-w-none w-[67.8125rem] ml-[-46.875rem] pointer-events-none"
              src="/showcase/beams@75.2e4c33d3.jpg"
              style={{ color: "transparent" }}
            />
            <img
              alt=""
              width={1318}
              height={1190}
              decoding="async"
              data-nimg={1}
              className="hidden dark:block absolute top-[-5rem] left-1/2 max-w-none w-[41.1875rem] ml-[-40rem] pointer-events-none"
              src="/showcase/beams-index-dark@75.8f02ce8a.jpg"
              style={{ color: "transparent" }}
            />
            <div className="relative max-w-3xl px-4 sm:px-6 lg:px-8 mx-auto sm:text-center">
              <h1 className="text-sm leading-6 font-semibold text-sky-500">
                TechnoPrise Blog List
              </h1>

              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Get our latest stories{" "}
              </p>
              <SearchBar onSearch={handleSearch} />
            </div>
            {isLoading && <>Loading...</>}
            <ul className="grid max-w-[26rem] sm:max-w-[52.5rem] mt-4 sm:mt-4 md:mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 lg:gap-y-8 xl:gap-x-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
              {posts.map((post, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    translateX: -50,
                    translateY: -50,
                  }}
                  animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  key={index}
                >
                  <li
                    onClick={() => handlePostDetail(post.slug)}
                    className="group relative rounded-3xl bg-slate-50 p-6 dark:bg-slate-800/80 dark:highlight-white/5 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  >
                    <div className="aspect-[672/494] relative rounded-md transform overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)] bg-slate-200 dark:bg-slate-700">
                      <Image
                        alt=""
                        width={672}
                        height={494}
                        decoding="async"
                        data-nimg={1}
                        className="absolute inset-0 w-full h-full"
                        src={getRandomImage()}
                        style={{ color: "transparent" }}
                      />
                      <div>
                        <video
                          preload="none"
                          className="absolute inset-0 w-full h-full [mask-image:radial-gradient(white,black)]"
                        >
                          <source
                            src="/showcase/openai.com.e55b5afbebfae62d1350968a66653eef24f49dfe.mp4"
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center mt-6">
                      <h2 className="text-sm leading-6 text-slate-900 dark:text-white font-semibold group-hover:text-sky-500 dark:group-hover:text-sky-400">
                        <Link href={`/posts/${post.slug}`}>
                          <span className="absolute inset-0 rounded-3xl" />
                          {post.title}
                        </Link>
                      </h2>
                      <svg
                        className="w-6 h-6 flex-none opacity-0 group-hover:opacity-100"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9.75 15.25L15.25 9.75M15.25 9.75H10.85M15.25 9.75V14.15"
                          stroke="#0EA5E9"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="w-full flex-none text-[0.8125rem] leading-6 text-slate-500 dark:text-slate-400">
                        {excerpt(post.content)}
                      </p>
                    </div>
                  </li>
                </motion.div>
              ))}
            </ul>
          </main>
        </MotionWrapper>
      </>
    </>
  );
};

export default Home;
