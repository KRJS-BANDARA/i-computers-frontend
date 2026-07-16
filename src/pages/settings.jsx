import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import LoadingScreen from '../components/loadingScreen';


export default function Settings() {
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            api.get("/users/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                setUserData(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                
            }).catch((error) => {
                toast.error("Failed to fetch user data");
                setUserData(null);
            });
        } else {
            window.location.href = "/login";
        }

    }, []);

    async function handleUpdateProfile() {
        setLoading(true);
       let imageUrl = userData.image;
       if (image) {
           imageUrl = await uploadImage(image);
       }
       const token = localStorage.getItem("token");
       if (token) {
           api.put("/users", {
               firstName: firstName,
               lastName: lastName,
               image: imageUrl
           }, {
               headers: {
                   "Authorization": `Bearer ${token}`
               }
           }).then((response) => {
               toast.success("Profile updated successfully");
               setLoading(false);
               window.location.reload();
           }).catch((error) => {
               toast.error("Failed to update profile");
               setLoading(false);
           });
       };
    }

async function handleChangePassword() {
           if (password !== confirmPassword) {
               toast.error("Passwords do not match");
               return;
           }
           setLoading(true);
           const token = localStorage.getItem("token");
           if (token) {
           await api.post("/users/password", {
               password: password
           }, {
               headers: {
                   "Authorization": `Bearer ${token}`
               }
           }).then((response) => {
               toast.success("Password changed successfully");
               setLoading(false);
               window.location.reload();
           }).catch((error) => {
               toast.error("Failed to change password");
               setLoading(false);
           });
        }
       };
       

    return (
        <div className='w-full h-full overflow-auto pb-20 flex flex-col lg:flex-row bg justify-center items-center gap-4'>
            <div className="w-[400px] h-[400px] bg-white shadow-2xl rounded-lg flex flex-col p-4">
                <h1 className='text-2xl font-semibold mb-4'>Profile Infomation</h1>
                <label className='text-sm font-medium'>First Name</label>
                <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} 
                className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                <label className='text-sm font-medium'>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}} 
                className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                <label className='text-sm font-medium'>Profile Image</label>
                <input type="file" onChange={(e) => {setImage(e.target.files[0])}} 
                className="w-full p-2 border border-gray-300 rounded-md mb-4" />
               
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
                onClick={handleUpdateProfile}>Update Profile</button>
            </div>
             {
                    loading && <LoadingScreen />  
                }

            <div className="w-[400px] h-[400px] bg-white shadow-2xl rounded-lg flex flex-col p-4">
                <h1 className='text-2xl font-semibold mb-4'>Change Password</h1>
                 <label className='text-sm font-medium'>Password</label>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} 
                className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                <label className='text-sm font-medium'>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} 
                className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
                onClick={handleChangePassword}>Change Password</button>
               
            </div>
            
        </div>
    )
}