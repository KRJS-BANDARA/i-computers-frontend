import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import UserData from "./userData.jsx";
import { IoCartOutline, IoCubeOutline, IoHomeOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";

export default function Header() {
    return (
        <>
        <header className="w-full h-[100px] bg-accent flex justify-center lg:justify-between p-6">
            <Link to="/">
                <img src="/logo-white.png" className="h-full" />
            </Link>
            <div className="h-full hidden lg:flex justify-center items-center gap-4">
                <Link to="/" className="text-white hover:text-gray-300 transition">Home</Link>
                <Link to="/products" className="text-white hover:text-gray-300 transition">Products</Link>
                <Link to="/contact-us" className="text-white hover:text-gray-300 transition">Contact Us</Link>
            </div>
            <div className="hidden lg:flex justify-center items-center gap-4">
                <Link to="/cart" className="h-full text-white flex justify-center items-center hover:text-gray-400 transition px-4"><BiCart size={24}/></Link>
                <UserData />
            </div>
        </header>

        <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white shadow-2xl flex lg:hidden justify-evenly items-center z-50">
        <Link to="/" className="h-full text-accent flex flex-col justify-center items-center text-3xl">
        <IoHomeOutline/>
            <span className="text-sm text-accent">Home</span>
        </Link>
            <Link to="/products" className="h-full text-accent flex flex-col justify-center items-center text-3xl">
            <IoCubeOutline/>
            <span className="text-sm text-accent">Products</span>
            </Link>      
            <UserData />
        </div>
        </>
    );
}