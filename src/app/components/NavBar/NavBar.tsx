'use client'
import { NavLinks } from "./NavLinks";
import Link from "next/link";
import Image from 'next/image'
import granaptur2 from "./granaptur2.png"

const NavBar = () => 
{
    const NavLink = NavLinks.map(navLink => 
    {
        return <Link className="bg-white m-10 p-2 border rounded-lg drop-shadow-lg transition ease-in-out hover:scale-150 hover:bg-sky-600 duration-300 " href={navLink.path} key={navLink.label}>
                <h1>{navLink.label}</h1>
            </Link>
    })

    return (
        <div className="flex items-center">
            {NavLink}
            <div className="w-full flex justify-center">
                <Image src={granaptur2} alt="Granaptur" className="self-center font-semibold text-[#3a89f8] rounded-xl p-1"></Image>
            </div>
        </div>
    )
}

export default NavBar;