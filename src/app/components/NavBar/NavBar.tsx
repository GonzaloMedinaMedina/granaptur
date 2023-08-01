'use client'
import { NavLinks } from "./NavLinks";
import Link from "next/link";

const NavBar = () => 
{
    const NavLink = NavLinks.map(navLink => 
    {
        return <Link className="m-5 p-2 border rounded-lg drop-shadow-lg transition ease-in-out hover:scale-150 hover:bg-sky-200 duration-300 " href={navLink.path} key={navLink.label}>
                <h1>{navLink.label}</h1>
            </Link>
    })

    return (
        <div className="flex">
            {NavLink}
        </div>
    )
}


export default NavBar;