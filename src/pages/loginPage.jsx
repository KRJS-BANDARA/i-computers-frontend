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

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            api.post("/users/google-login", {
                accessToken: response.access_token
            }).then((response) => {
            
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
    
    async function handleLogin() {
        //console.log("Email:", email);
        //console.log("Password:", password);
        setLoading(true);
        try {
            // const response = await axios.post("http://localhost:3000/users/login", {
            //     email: email,
            //     password: password
            // });
            const response = await api.post("/users/login", {
                email: email,
                password: password
            });
            console.log("Login successful:", response.data);
            localStorage.setItem("token", response.data.token);
            if(response.data.isAdmin){
                //window.location.href = "/admin";
                navigate("/admin");
            }else{
                //window.location.href = "/";
                navigate("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed. Please try again.");
        }
        setLoading(false);
    }
    return (
        <div className='w-full h-full bg-[url("/login-bg.png")] flex bg-cover bg-no-repeat justify-center items-center'>
            <div className='w-[400px] h-[600px] backdrop-blur-sm shadow-white rounded-lg shadow-2xl flex flex-col p-4'>
                <h1 className='w-full h-[100px] text-center text-3xl font-bold text-white'>Login</h1>
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
                 <p className='w-full h-2 text-sm italic text-gray-300 mt-2 hover:text-gray-400 text-right'>Forgot password? Click <Link to="/forget-password" className='text-accent'>here</Link></p>
                    <button disabled={loading} className='w-full h-[50px] bg-accent mt-10 text-white rounded-lg mt-5' onClick={handleLogin}>
                        {
                        loading ? "Signing In..." : "Sign In"
                        }
                        </button>
                    <p className='w-full h-2 text-sm italic text-gray-300 mt-2 hover:text-gray-400 text-right'>Don't have an account? Click <Link to="/signup" className='text-accent'>here</Link></p>
                    <button onClick={googleLogin} className='w-full h-[50px] bg-gray-700 mt-5 text-white rounded-lg 
                    flex justify-center items-center gap-2'><BsGoogle/>Sign In with Google</button>
            </div>   
        </div>
    );
}
export default LoginPage