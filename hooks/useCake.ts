import useSWR from "swr";

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input,init).then(res => res.json())

const useCake = (name: string) => {

    const { data, error } = useSWR('/api/get?name=' + name, fetcher)

    return { data, error }
    
}

export default useCake;