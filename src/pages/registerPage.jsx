import { BsGoogle } from "react-icons/bs";
import { CgKey } from "react-icons/cg";
import { MdEmail, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            //console.log(response);
            api.post("/users/google-login", {
                accessToken: response.access_token
            }).then((response) => {
                //console.log(response);
                localStorage.setItem("token", response.data.token);
                if (response.data.isAdmin) {
                    navigate("/admin");
            
                } else {
                    navigate("/");
                    
                }

            })
        },
        onError: (error) => {
            console.log(error);
        }
    })
    
    async function handleRegister() {

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        
        setLoading(true);
        try {
            
            const response = await api.post("/users/login", {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            });
            
            navigate("/signin");
           
        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
        }
        setLoading(false);
    }
    return (
        <div className='w-full h-full bg-[url("/login-bg.png")] flex bg-cover bg-no-repeat justify-center items-center'>
            <div className='w-[400px] backdrop-blur-sm shadow-white rounded-lg shadow-2xl flex flex-col p-4'>
                <h1 className='w-full h-[100px] text-center text-3xl font-bold text-white'>Register</h1>
                <div className='w-full'>
                    <label className='text-white text-lg flex items-center gap-2'><MdEmail/>Email</label>
                    <input type="email" className='w-full h-[50px] rounded-lg bg-transparent border-2
                     border-gray-300 focus:border-blue-500 focus:outline-none text-white px-4' 
                     placeholder='Enter your email' 
                     onChange={
                        (e)=>{
                            setEmail(e.target.value);
                        }
                     }
                     value={email}
                     />
                 </div>
                 <div className='w-full flex flex-row gap-2 mt-5'>
                     <div className='w-1/2'>
                        <label className='text-white text-lg flex items-center gap-2'>First Name</label>
                        <input type="text" className='w-full h-[50px] rounded-lg bg-transparent border-2
                         border-gray-300 focus:border-blue-500 focus:outline-none text-white px-4' 
                         placeholder='Enter your first name' 
                         onChange={
                            (e)=>{
                                setFirstName(e.target.value);
                            }
                         }
                         value={firstName}
                         />
                     </div>
                     <div className='w-1/2'>
                        <label className='text-white text-lg flex items-center gap-2'>Last Name</label>
                        <input type="text" className='w-full h-[50px] rounded-lg bg-transparent border-2
                         border-gray-300 focus:border-blue-500 focus:outline-none text-white px-4' 
                         placeholder='Enter your last name' 
                         onChange={
                            (e)=>{
                                setLastName(e.target.value);
                            }
                         }
                         value={lastName}
                         />
                     </div>

                 </div>
                 <div className='w-full mt-5'>
                    <label className='text-white text-lg flex items-center gap-2'><CgKey/>Password</label>
                    <input type="password" className='w-full h-[50px] rounded-lg bg-transparent border-2
                     border-gray-300 focus:border-blue-500 focus:outline-none text-white px-4' 
                     placeholder='Enter your password' 
                     onChange={
                        (e)=>{
                            setPassword(e.target.value);
                        }
                     }
                     value={password}
                     />
                 </div>
                  <div className='w-full mt-5'>
                    <label className='text-white text-lg flex items-center gap-2'><CgKey/>Confirm Password</label>
                    <input type="password" className='w-full h-[50px] rounded-lg bg-transparent border-2
                     border-gray-300 focus:border-blue-500 focus:outline-none text-white px-4' 
                     placeholder='Enter your password' 
                     onChange={
                        (e)=>{
                            setConfirmPassword(e.target.value);
                        }
                     }
                     value={confirmPassword}
                     />
                 </div>
            
                    <button disabled={loading} className='w-full h-[50px] bg-accent mt-10 text-white rounded-lg mt-5' onClick={handleRegister}>
                        {
                        loading ? "Signing up..." : "Sign up"
                        }
                        </button>
                    <p className='w-full h-2 text-sm italic text-gray-300 mt-2 hover:text-gray-400 text-right'>Already have an account? Click <Link to="/signin" className='text-accent'>here</Link></p>
                    <button onClick={googleLogin} className='w-full h-[50px] bg-gray-700 mt-5 text-white rounded-lg 
                    flex justify-center items-center gap-2'><BsGoogle/>Sign In with Google</button>
            </div>   
        </div>
    );
}