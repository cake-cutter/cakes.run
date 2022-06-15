import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import Nav from '../components/Nav'

const Home: NextPage = () => {

  const i = useRef<any>(null);

  useEffect(() => {

    const onKeyPress = (key: any) => {
      if (key.code === "KeyS") {
        i.current?.focus();
      }
    }

    document.addEventListener('keypress', onKeyPress)

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    }

  },[])

  return (
    <div className='w-screen'>

      <div className="bg-green text-white w-screen" style={{ height: "50vh" }}>

        <Nav />

        <div className="flex flex-col justify-center px-44 gap-5">
          <h1
            className='text-center text-4xl mt-10 font-extrabold'
            style={{ textShadow: "1px 3px 2px hsl(115, 31%, 21%)" }}
          >
            Create projects from pre-built cakes (templates) in seconds!
          </h1>

          <form
            className='
              rounded-full
              flex
              search-form
              transition-all
              mt-2
              mx-20
            '
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
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
              </svg>
            </button>
          </form>
  
        </div>


      </div>

      <div className='md:px-52'>
        <div className="flex mt-10 justify-center gap-5 items-center">
          <button className='flex home-links-button justify-center text-gray-800 items-center rounded-full px-7 py-3 gap-2 font-extrabold'>
            <svg width="14" height="17" viewBox="0 0 14 17" fill="#c4890e" xmlns="http://www.w3.org/2000/svg"><path d="M1 13h12v2H1zM5 2h4v5h3l-5 4.996L2 7h3z"/></svg>
            Install Cakecutter
          </button>
          <button className='flex home-links-button justify-center text-gray-800 items-center rounded-full px-8 py-3 gap-2 font-extrabold'>
            <svg width="13" height="15" viewBox="0 0 13 15" fill="#c4890e" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h2v14H0zM4.07 2.192h-.062V.132l.072.013.348.06c.48.08.92.187 1.387.332l.182.057c-.004 1.354-.013 2.03-.027 2.029a5.871 5.871 0 01-.315-.09c-.451-.139-1.394-.341-1.585-.341zM2.578 4.142L2 4.128V2.07l.456.016c.474.016.865.043 1.27.085L4 2.198V4.26c-.067-.027-.94-.106-1.422-.118zM4.063 6.33h-.055V4.27l.072.012.348.06c.48.081.92.187 1.387.333l.182.057c-.002 1.303-.002 1.99 0 2.061-.182-.119-1.731-.464-1.934-.464zM2.567 8.279L2 8.265V6.21l.456.015c.474.017.865.044 1.27.085L4 6.336v2.038c-.064-.027-.956-.083-1.433-.095zM6.34 4.823L6 4.71l.019-2.043.05.016c.082.026.899.335 1.425.54l.49.19A256.271 256.271 0 017.98 5.46c-.003 0-.303-.12-.668-.263a48.765 48.765 0 00-.972-.373zM6.362 8.969l-.332-.12L6 6.806c.645.234 1.143.42 1.494.555l.49.191a256.262 256.262 0 01-.004 2.044c-.003 0-.293-.115-.646-.254-.352-.139-.79-.307-.972-.373zM9.787 3.925c-.65-.161-.977-.253-1.343-.376L8.008 3.4c.005-1.355.01-2.032.017-2.032.009 0 .165.052.348.115.419.145.88.276 1.297.37l.327.072v2.026l-.061-.003a.926.926 0 01-.15-.024zM8.411 7.675l-.403-.137c.006-1.355.012-2.032.018-2.032.01 0 .117.035.238.079.474.17 1.11.35 1.54.437l.193.039c-.002 1.367-.004 2.05-.006 2.05-.003-.002-.15-.036-.326-.078-.48-.113-.806-.206-1.254-.358zM10.264 6.081l-.234-.038-.012-2.05.061.014a15.73 15.73 0 001.465.184c.115.008.262.02.326.026l.116.012V6.26l-.116-.002a15.84 15.84 0 01-1.606-.177zM10.196 10.209l-.166-.03-.012-2.05.05.014c.142.036.864.131 1.248.164l.554.048.116.012v2.031l-.116-.003c-.064-.001-.271-.016-.46-.032-.356-.031-.923-.103-1.214-.154zM12.008 4.202V2.14c.231.019.42.028.569.028H13v2.058l-.992-.024zM12.008 8.34V6.276l.083.015c.045.007.264.014.486.014H13v2.058l-.191-.005a87.421 87.421 0 00-.486-.013l-.315-.007z"></path></svg>
            Getting Started
          </button>
        </div>

        <hr className='mt-10 h-[5px] border-none text-gray-300 bg-gray-300' />
      </div>


    </div>
  )
}

export default Home
