import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

interface Props {
    input?: boolean;
    val?: string;
}

const Nav = ({ input, val }: Props) => {

    const i = useRef<any>(null);
    const router = useRouter();

    function Search(e: any) {
        e.preventDefault()

        if (i.current.value && i.current.value.length < 1 || !i.current.value.replace(/\s/g, '').length) {
            return alert('Query is empty')
        }

        router.push('/search?q=' + i.current.value)
    }

    useEffect(() => {

        if (input) {
            if (val) i.current.value = val;

            const onKeyPress = (key: any) => {
                if (key.code === "KeyS") {
                    i.current?.focus();
                }
            }

            document.addEventListener('keyup', onKeyPress)

            return () => {
                document.removeEventListener('keyup', onKeyPress);
            }
        }


    }, [])

    return (
        <div
            className={`
                flex
                md:gap-10
                md:justify-between
                items-center
                md:px-52
                justify-center
                text-white
                md:flex-row
                flex-col
                pb-5
                md:pb-0
                ${input ? "bg-green" : ""}
            `}
        >
            <div
                className="
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                "
                onClick={() => router.push('/')}
            >
                <img
                    src="https://avatars.githubusercontent.com/u/107420213?s=200&v=4"
                    height={100}
                    width={100}
                />
                <h1 className="text-2xl font-extrabold">Cakecutter</h1>
            </div>

            {input && (
                <form
                    className='
                        rounded-full
                        flex
                        search-form
                        transition-all
                        flex-grow
                    '
                    onSubmit={Search}
                >
                    <input
                        ref={i}
                        className='border-none rounded-r-none rounded-full text-black h-10 px-5 w-full outline-none'
                        placeholder="Click or press 'S' to search..."
                    />
                    <button className='text-white bg-yellow-400 font-bold py-2 px-3 rounded-l-none rounded-full'>
                        <svg
                            height="15" width="25"
                            viewBox="0 0 512 512"
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                        </svg>
                    </button>
                </form>
            )}

            <h1 className="hidden md:inline-block text-lg">
                <a href="https://cake-cutter.github.io/docs/6-publish/" target="_blank">
                    Publish your own
                </a>
            </h1>

        </div>
    )
}

export default Nav;