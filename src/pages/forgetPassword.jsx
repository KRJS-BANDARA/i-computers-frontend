import React from "react";
import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingScreen from "../components/loadingScreen";
import { useNavigate } from "react-router-dom";



export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    function sendOTP() {
        setLoading(true);
        api.post("/users/otp", {
            email: email
        }).then((response) => {
            console.log(response);
            setLoading(false);
            toast.success("OTP sent successfully");
            setOtpSent(true);

        }).catch((error) => {
            toast.error(error?.response?.data?.message || "Login failed. Please try again.");
            setLoading(false);
            
        });
    }

    function verifyOTP() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        api.post("/users/verify-otp", {
            email: email,
            otp: otp,
            password: newPassword

        }).then((response) => {
            toast.success("verified successfully");
            navigate("/signin");

        }).catch((error) => {
            toast.error(error?.response?.data?.message || "Login failed. Please try again.");
            setLoading(false);
            
        });
    }


    return (
        <div className="w-full h-screen bg-[url('/login-bg.png')] bg-cover bg-no-repeat flex justify-center items-center">
            {loading && <LoadingScreen />}
        {otpSent? 

            <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-center items-center p-4">
                <h1 className="font-semibold text-3xl font-white">Enter Your Email</h1>
                <input value={email} disabled={true} onChange={(e) => setEmail(e.target.value)} className="w-full h-[50px] text-white bg-transparent border border-white rounded-lg mt-4" type="email" />
                <input value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full h-[50px] text-white bg-transparent border border-white rounded-lg mt-4" type="email" placeholder="Enter OTP" />
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full h-[50px] text-white bg-transparent border border-white rounded-lg mt-4" type="password" placeholder="Enter New Password" />
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full h-[50px] text-white bg-transparent border border-white rounded-lg mt-4" type="password" placeholder="Confirm New Password" />
                <button disabled={loading} onClick={verifyOTP} className="w-full h-[50px] rounded-lg mt-4 bg-accent text-white font-semibold">Submit</button>
            </div> 

            :  

            <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-center items-center p-4">
                <h1 className="font-semibold text-3xl font-white">Enter Your Email</h1>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-[50px] text-white bg-transparent border border-white rounded-lg mt-4" type="email" placeholder="john@example.com" />
                <button disabled={loading} onClick={sendOTP} className="w-full h-[50px] rounded-lg mt-4 bg-accent text-white font-semibold">Submit</button>
            </div>
            }
        </div>
    );
}