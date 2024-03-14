"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesSquare } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  signIn,
  signOut,
  useSession,
  ClientSafeProvider,
  getProviders,
} from "next-auth/react";

interface LinkItem {
  href: string;
  text: string;
}

interface Provider {
  id: string;
  name: string;
}

const links: LinkItem[] = [];

function Header() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const path = usePathname();
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);
  return (
    <nav className="fixed z-50 w-full bg-white top-0 flex flex-wrap items-center justify-between px-2 py-3 shadow-lg">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className={`${
              "/" === path
                ? "text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-yellow-700 "
                : "text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-slate-700"
            }`}
            href="/"
          >
            TechnoPrise Blog
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setIsMenuToggled((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: 20 }} />
          </button>
        </div>
        <div
          className="lg:flex flex-grow items-center hidden"
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto"></ul>
          {session?.user ? (
            <>
              <Link
                href={`/create-post`}
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
              >
                Create Post
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
              >
                Sign Out
              </button>
              <Image
                src={
                  session?.user.image
                    ? session?.user.image
                    : "/default-profile.png"
                }
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-slate-200 drop-shadow-lg ">
          {/* Close Icon */}
          <div className="flex justify-end py-4 px-6 bg-white">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <FontAwesomeIcon
                icon={faTimesSquare}
                className="text-slate-700"
                style={{ fontSize: 32 }}
              />
            </button>
          </div>
          <div className="ml-[10%] flex flex-col gap-4">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto"></ul>
            {session?.user ? (
              <>
                <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                  Create Post
                </button>
                <button
                  onClick={() => signOut()}
                  className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                >
                  Sign Out
                </button>
                <Image
                  src={
                    session?.user.image
                      ? session?.user.image
                      : "/default-profile.png"
                  }
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </>
            ) : (
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                      className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                    >
                      Sign In
                    </button>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
