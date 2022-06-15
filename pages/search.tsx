import { NextPage, NextPageContext } from "next";
import Nav from "../components/Nav";

const Search: NextPage = ({ q }: any) => {
    return (
        <div className="w-screen">
            <Nav input />

            <div>
                
            </div>
        </div>
    )
}

export async function getServerSideProps({ query: { q } }: NextPageContext) {
    return {
        props: {
            q : q || ""
        }
    }
}

export default Search;