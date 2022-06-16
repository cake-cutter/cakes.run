import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import Nav from "../components/Nav";
import { fetcher } from "../hooks/useCake";

interface Cake {
    name: string;
    short: string;
    dsc: string;
    author: string;
    cake: string;
}

const getKey = (pageIndex: number, previousPageData: Cake[]) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `/api/search?page=${pageIndex}&limit=10&name=`                  // SWR key
}

const Browse: NextPage = () => {

    const { data, size, setSize } = useSWRInfinite<Cake[]>(getKey, (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input,init).then(async res => (await res.json()).data))

    const router = useRouter();
    let totalCakes = 0;

    if (data) {
        
        for (let i = 0; i < data?.length || 0; i++) {
            totalCakes += data[i].length;
        }
    }

    return (
        <div className="max-w-screen">
            <Nav input />

            <Head>
                <title>Search cakes</title>
            </Head>

            <div className="lg:px-52 px-5 box-border">

                <div
                    className="
                        flex
                        items-start
                        px-9 py-10
                        rounded-md
                        mt-5
                        flex-col
                        gap-2
                    "
                    style={{ backgroundColor: "#EDEBDD" }}
                >

                    <div className="flex items-center gap-2">
                        <svg
                            width="32" height="32"
                            viewBox="0 0 32 32"
                            className="m-0"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16 32.107c8.837 0 16-7.164 16-16 0-8.837-7.163-16-16-16s-16 7.163-16 16c0 8.836 7.163 16 16 16z" fill="#FFF" />
                            <path d="M20.247 12.548L16 10l-4.224 2.535 4.247 2.452 4.224-2.439zM21 14.423l-4 2.31V21.4l4-2.4v-4.577zm-10-.027V19l4 2.4v-4.695l-4-2.309zM16 8l7 4v8l-7 4-7-4v-8l7-4z" fill="#B13B89" />
                        </svg>

                        <h1 className="font-extrabold text-3xl text-gray-800">All Cakes</h1>
                    </div>

                    <p className="text-gray-500">{totalCakes} cake{totalCakes > 1 && 's'} listed</p>
                </div>

                <div className="mt-5">
                    {data ? data.map((c: any) => {
                                            
                        return c.map((cake: Cake) => {

                            return (
                                <div
                                    className="
                                        flex 
                                        justify-between 
                                        mb-2 p-5
                                        rounded
                                        bg-white 
                                        drop-shadow-md
                                        cursor-pointer
                                        transition-all
                                        hover:drop-shadow-2xl
                                        hover:-translate-x-[3px]
                                        hover:-translate-y-[1px]
                                    "
                                    onClick={() => router.push('/cake/' + cake.name)}
                                >
                                    <div className="flex-1">
                                        <h1 className="font-bold">{cake.name}</h1>
                                        <p className="text-gray-700">{cake.short}</p>
                                    </div>
                                    <div className="flex items-center flex-2 w-fit lg:mr-20">
                                        <ul>
                                            <li className="flex items-center">
                                                <svg
                                                    fill="#B23D8A"
                                                    stroke="#B23D8A" strokeWidth="0"
                                                    viewBox="0 0 20 20"
                                                    height="1.5em" width="1.5em"
                                                    className="inline"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd" clipRule="evenodd"
                                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    />
                                                </svg>
    
                                                {cake.author}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                        
                    }) : null}

                    <div className="flex justify-center items-center">
                        <div 
                            onClick={() => setSize(size + 1)} 
                            className="
                                mt-5
                                px-5 py-3
                                rounded-md
                                border
                                border-green
                                text-green
                                transition-all
                                
                                cursor-pointer
                                hover:bg-green
                                hover:text-white
                            "
                        >
                            Show More
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Browse;