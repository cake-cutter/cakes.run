import { NextPage } from "next";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import useCake from "../../hooks/useCake";
import rehypeRaw from "rehype-raw";
import Head from "next/head";
import { useRouter } from "next/router";

const Cake: NextPage = ({ name }: any) => {

    const { data, error } = useCake(name)
    const router = useRouter();

    useEffect(() => {

        if (data) {
            console.log(data)
            if (data.success != 0) {
                router.push('/')
            }
        }


    },[data, error])

    return (
        <div className="w-screen">
            <Nav input />
            
            <Head>
                <title>{data?.data?.name} - cakecutter</title>
                <meta name="description" content="Cakecutter is a powerful tool for setting up a basic app of any type/language/framework." />
            </Head>

            <div className="lg:px-60 px-5 box-border">

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

                        <h1 className="font-extrabold text-3xl text-gray-800">{data?.data?.name}</h1>
                    </div>

                    <p className="text-gray-500">{data?.data?.short}</p>
                </div>

                <div className="cake-info mt-5">
                    <div className="readme">
                        <article className="prose">
                            <ReactMarkdown children={data?.data?.dsc} rehypePlugins={[require('@mapbox/rehype-prism'), rehypeRaw]} />
                        </article>
                    </div>

                    <section className="sidebar mb-10" style={{ color: '#383838' }}>
                        <h1 className="font-extrabold text-xl">Metadata</h1>

                        <ul className="mt-2">
                            <li>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                viewBox="0 0 100 100" 
                                width="1.5em" height="1.5em"
                            >
                                <path d="M35.156 56.25h-7.812A2.35 2.35 0 0125 53.906v-7.812a2.35 2.35 0 012.344-2.344h7.812a2.35 2.35 0 012.344 2.344v7.812a2.35 2.35 0 01-2.344 2.344zm21.094-2.344v-7.812a2.35 2.35 0 00-2.344-2.344h-7.812a2.35 2.35 0 00-2.344 2.344v7.812a2.35 2.35 0 002.344 2.344h7.812a2.35 2.35 0 002.344-2.344zm18.75 0v-7.812a2.35 2.35 0 00-2.344-2.344h-7.812a2.35 2.35 0 00-2.344 2.344v7.812a2.35 2.35 0 002.344 2.344h7.812A2.35 2.35 0 0075 53.906zm-18.75 18.75v-7.812a2.35 2.35 0 00-2.344-2.344h-7.812a2.35 2.35 0 00-2.344 2.344v7.812A2.35 2.35 0 0046.094 75h7.812a2.35 2.35 0 002.344-2.344zm-18.75 0v-7.812a2.35 2.35 0 00-2.344-2.344h-7.812A2.35 2.35 0 0025 64.844v7.812A2.35 2.35 0 0027.344 75h7.812a2.35 2.35 0 002.344-2.344zm37.5 0v-7.812a2.35 2.35 0 00-2.344-2.344h-7.812a2.35 2.35 0 00-2.344 2.344v7.812A2.35 2.35 0 0064.844 75h7.812A2.35 2.35 0 0075 72.656zm18.75-50.781v68.75c0 5.176-4.2 9.375-9.375 9.375h-68.75c-5.176 0-9.375-4.2-9.375-9.375v-68.75c0-5.176 4.2-9.375 9.375-9.375H25V2.344A2.35 2.35 0 0127.344 0h7.812A2.35 2.35 0 0137.5 2.344V12.5h25V2.344A2.35 2.35 0 0164.844 0h7.812A2.35 2.35 0 0175 2.344V12.5h9.375c5.176 0 9.375 4.2 9.375 9.375zm-9.375 67.578V31.25h-68.75v58.203c0 .645.527 1.172 1.172 1.172h66.406c.645 0 1.172-.527 1.172-1.172z"/>
                            </svg>
                                {data?.data?.lastUpdate}
                            </li>

                            <li>
                                <svg
                                    fill="currentColor"
                                    stroke="currentColor" strokeWidth="0"
                                    viewBox="0 0 20 20"
                                    height="1.5em" width="1.5em"
                                    className="inline-block mr-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd" clipRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    />
                                </svg>
                                {data?.data?.author}
                            </li>
                        </ul>

                        <h1 className="font-extrabold text-xl mt-3 mb-1">Usage</h1>
                        <p className="text-gray-500 text-sm">Install the cli and run this command</p>
                        <button 
                            className="text-center cursor-pointer copy-button" 
                            title="Copy command to clipboard" 
                            type="button"
                            onClick={() => {                              
                                navigator.clipboard.writeText(`cc cut ${data?.data?.name}`);
                            }}
                        >

                            <span>cc cut {data?.data?.name}</span>
                            <svg 
                                width="24" height="25" 
                                viewBox="0 0 24 25" 
                                fill="currentColor" 
                                xmlns="http://www.w3.org/2000/svg" 
                                aria-hidden="true" 
                            >
                                <path d="M18 20h2v3c0 1-1 2-2 2H2c-.998 0-2-1-2-2V5c0-.911.755-1.667 1.667-1.667h5A3.323 3.323 0 0110 0a3.323 3.323 0 013.333 3.333h5C19.245 3.333 20 4.09 20 5v8.333h-2V9H2v14h16v-3zM3 7h14c0-.911-.793-1.667-1.75-1.667H13.5c-.957 0-1.75-.755-1.75-1.666C11.75 2.755 10.957 2 10 2s-1.75.755-1.75 1.667c0 .911-.793 1.666-1.75 1.666H4.75C3.793 5.333 3 6.09 3 7z"/>
                                <path d="M4 19h6v2H4zM12 11H4v2h8zM4 17h4v-2H4zM15 15v-3l-4.5 4.5L15 21v-3l8.027-.032L23 15z"/>
                            </svg>

                        </button>

                    </section>

                </div>
            </div>

        </div>
    )
}

export async function getServerSideProps({ params: { name } }: any) {
    return {
        props: {
            name
        }
    }
}

export default Cake;