import { BsGift } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { TbUser, TbUsers } from 'react-icons/tb';
import { Link, Route, Routes } from 'react-router-dom'
import AdminProductPage from './admin/adminProductPage';
import AdminAddProductForm from './admin/adminAddProductForm';
import AdminEditProductForm from './admin/adminEditProductForm';
import AdminOrdersPage from './admin/adminOrdersPage';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/loadingScreen';
import AdminUsersPage from './admin/adminUsersPage';

function AdminPage() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.get("/users/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                if (response.data.isAdmin) {
                    setUserData(response.data);
                } else {
                    toast.error("You are not authorized to access this page.");
                    navigate("/");
                }  
                
            }).catch((error) => {
                toast.error("Failed to fetch user data");
                setUserData(null);
            });
        } else {
            toast.error("You are not authorized to access this page.");
            navigate("/login");
        }

    }, []);

    return (
        
        <div className='w-full h-full flex bg-primary justify-center items-center'>
            <div className= 'w-72 h-full bg-white flex flex-col shadow-2xl'>
               <div className='w-full h-[125px] py-2 px-2'>
                <img src="/logo.png" className='w-full h-full object-cover'/>
                    <Link to='/admin' className='w-full p-4 text-xl text-gray-500 flex items-center gap-4'> 
                        <FiShoppingCart/>
                        <span className='w-full h-full block'>Orders</span>
                    </Link>

                    <Link to='/admin/products' className='w-full p-4 text-xl text-gray-500 flex items-center gap-4'> 
                        <BsGift/>
                        <span className='w-full h-full block'>Products</span>
                    </Link>

                    <Link to='/admin/users' className='w-full p-4 text-xl text-gray-500 flex items-center gap-4'> 
                        <TbUsers/>
                        <span className='w-full h-full block'>Users</span>
                    </Link>

               </div>
            </div>

            <div className= 'w-[calc(100%-300px)] h-full p-4'>
                {!userData ? <LoadingScreen/> :
                <Routes>
                    <Route path='/' element={<AdminOrdersPage/>}/>
                    <Route path='/products' element={<AdminProductPage/>}/>
                    <Route path='/users' element={<AdminUsersPage/>}/>
                    <Route path='/add-product' element={<AdminAddProductForm/>}/>
                    <Route path='/edit-product' element={<AdminEditProductForm/>}/>
                </Routes>
                }
            </div>
        </div>

    );
}
export default AdminPage