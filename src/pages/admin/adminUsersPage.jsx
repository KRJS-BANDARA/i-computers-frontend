import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import { BiRefresh } from "react-icons/bi";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      api
        .get("/users/all/"+pageNumber+"/"+pageSize, {
           headers: {
                "Authorization": `Bearer ${token}`
            } 
        })
        .then((response) => {
          setUsers(response.data.users);
          setTotalUsers(response.data.totalUsers);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Failed to fetch users");
        });
    }
  }, [loading]);

  function handleBlockUser(email) {
    const token = localStorage.getItem("token")
    api.put("/users/state/"+email, {}, 
        {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      toast.success("User blocked status updated successfully!");
      setLoading(true);
     
    }).catch((error) => {
      toast.error(error?.response?.data?.message);
    })

  }

  function handleRoleToggle(email) {
    const token = localStorage.getItem("token")
    api.put("/users/role/"+email, {}, 
        {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      toast.success("User blocked successfully!");
      setLoading(true);
     
    }).catch((error) => {
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    })

  }

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col items-center pb-[100px]">
      <div className="w-full min-h-[100px] mb-10 bg-white shadow-2xl rounded-lg flex p-4 items-center justify-between">
        <h1 className="font-semibold text-2xl">All Users</h1>
        <div className="h-full gap-4 flex items-center">
          {totalUsers} Users
        </div>
      </div>
      {loading && <LoadingScreen />}

      <table className="w-full text-center rounded-lg overflow-hidden ">
        <thead className="bg-accent text-white h-[40px]">
          <tr>
            <th className="w-[5%]"></th>
            <th className="w-[7%]">Email</th>
            <th className="w-[22%]">First Name</th>
            <th className="w-[9%]">Last Name</th>
            <th className="w-[9%]">Role</th>
            <th className="w-[7%]">Email Verified</th>
            <th className="w-[7%]">Status</th>
           </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index} className="odd:bg-gray-100 even:bg-white h-60px">
                <td>
                 <img src={user.image}
                  alt="Profile"
                  className="w-23 h-23 object-cover rounded-full"
                 />
                </td>
                <td>{user.email}</td>
                <td>{user.firstName} </td>
                <td>{user.lastName}</td>
                <td className="flex h-[100px] items-center justify-center gap-4">{user.isAdmin?"Admin":"Customer"}<BiRefresh className="cursor-pointer text-2xl text-accent" onClick={() => {handleRoleToggle(user.email)}}/></td>
                <td>{user.isEmailVerified?"Yes":"No"}</td>
                <td className="flex h-[100px] items-center justify-center gap-4">{user.isBlocked?"Blocked":"Active"}<BiRefresh className="cursor-pointer text-2xl text-accent" onClick={() => {handleBlockUser(user.email)}}/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
        <div className="p-2 fixed bottom-4 bg-white shadow-2xl flex items-center justify-center">
          <select value={pageSize} onChange={(e) => {setPageSize(Number(e.target.value));setLoading(true);}} className="h-full px-3 border-r">
            <option value="2">2 per page</option>
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
          </select>
          <div className="h-full flex items-center justify-center gap-4">
            <button disabled={pageNumber === 1} onClick={() => {setPageNumber(pageNumber-1);setLoading(true);}} className="h-full px-3 border-r disabled:text-gray-400">Previous</button>
            <span>Page {pageNumber} of {totalPages}</span>
            <button disabled={pageNumber === totalPages} onClick={() => {setPageNumber(pageNumber+1);setLoading(true);}} className="h-full px-3 border-l disabled:text-gray-400">Next</button>
          </div>
        </div>   
    </div>
  );
}