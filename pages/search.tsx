import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
import useSWRInfinite from "swr/infinite";

interface Cake {
    name: string;
    short: string;
    dsc: string;
    author: string;
    cake: string;
}

const getKey = (pageIndex: number, previousPageData: Cake[]) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `/api/search?page=${pageIndex}&limit=10`                  // SWR key
}

const Search: NextPage = ({ q }: any) => {

    const { data, size, setSize } = useSWRInfinite<Cake[]>(getKey, (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input + '&name='+q,init).then(async res => (await res.json()).data))

    const router = useRouter();
    let totalCakes = 0;

    if (data) {
        
        for (let i = 0; i < data.length; i++) {
            totalCakes += data[i].length;
        }
    }

    return (
        <div className="w-screen">
            <Nav input val={q} />

            <Head>
                <title>Search cakes</title>
            </Head>

            <div className="lg:px-60 px-5">
                <div
                    className="
                        flex
                        justify-start
                        items-center
                        px-9 py-10
                        rounded-md
                        mt-5
                        gap-2
                    "
                    style={{ backgroundColor: "#EDEBDD" }}
                >
                    <svg
                        width="32" height="32"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            fill="#FFF"
                            cx="32" cy="32"
                            r="32"
                        />
                        <path
                            d="M35.5 35.5l8 8"
                            stroke="#B23D8A" strokeWidth="4"
                        />
                        <circle
                            stroke="#B23D8A" strokeWidth="2"
                            fill="none"
                            cx="28.5" cy="28.5"
                            r="9.5"
                        />
                    </svg>

                    <h1 className="font-extrabold text-3xl text-gray-800">Search Results <span className="text-gray-600"> for '{q}'</span></h1>
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

export async function getServerSideProps({ query: { q } }: NextPageContext) {
    return {
        props: {
            q: q || ""
        }
    }
}

export default Search;