import { useState } from "react";
import api from "../utils/api.js";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useEffect } from "react";


export default function UserData() {
    const [userData, setUserData] = useState(null);
    const [selectedOption, setSelectedOption] = useState("me");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.get("/users/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                setUserData(response.data);
                
            }).catch((error) => {
                toast.error("Failed to fetch user data");
                setUserData(null);
            });
        }

    }, []);

    return (
       <>
       {
        !userData ? <div className="lg:flex">
            <Link to="signin" className="text-white hidden lg:block hover:text-gray-300 transition">Login</Link>
            <span className="text-white hidden lg:block">|</span>
            <Link to="/signup" className="text-white hidden lg:block hover:text-gray-300 transition">Register</Link>
            <Link to="/signin" className="h-full nidden lg:block text-accent flex flex-col justify-center items-center text-3xl">
            <CiLogin/>
            <span className="text-sm text-accent">Login</span>
            </Link>

        </div> : 
        <div className="text-white flex flex-col lg:flex-row justify-center items-center gap-2">
            <img src={userData.image} className="w-[30px] h-[30px] rounded-full" />
            {/* <span className="lg-hidden lg:inline-block text-sm">{userData.firstName}</span> */}
            <select className="bg-accent bg-transparent text-sm text-accent lg:text-white text-center mr-2" value={selectedOption} onChange={(e) => {
                setSelectedOption(e.target.value);
                if (e.target.value === "settings") {
                    navigate("/settings");
                }
                if (e.target.value === "profile") {
                    navigate("/profile");
                }
                if (e.target.value === "my-orders") {
                    navigate("/my-orders");
                }
                if (e.target.value === "logout") {
                    localStorage.removeItem("token");
                    setUserData(null);
                    navigate("/signin");
                }
                setSelectedOption("me");
               
            }}>
                <option className="bg-accent" value="me">{userData.firstName}</option>
                <option className="bg-accent text-white" value="settings">Settings</option>
                <option className="bg-accent text-white" value="my-orders">My Orders</option>
                <option className="bg-accent text-white" value="logout">Logout</option>
            </select>
            
        </div>
       }
       </>
    );
}