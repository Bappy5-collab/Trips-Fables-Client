import { useQuery } from "@tanstack/react-query";
import UserAxioxSecure from "../Hooks/UserAxioxSecure";
import Swal from "sweetalert2";
import { FiUsers, FiShield, FiUserCheck } from "react-icons/fi";



const ManageUser = () => {
    const axiosSecure = UserAxioxSecure();
  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;

    }
})
const handleAddmin = user =>{
axiosSecure.patch(`/users/admin/${user._id}`)
.then (res =>{
    console.log(res.data)
    if(res.data.modifiedCount > 0){
        refetch()
        
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} ia an Addmin Now`,
            showConfirmButton: false,
            timer: 1500
          });
    }
})
}


   

    return (
        <div className="min-h-screen w-full">
          <div className="w-full px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-[#2EC1DB] to-sky-500 rounded-xl shadow-lg">
                  <FiUsers className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2EC1DB] to-sky-500/30">
                    Manage Users
                  </h2>
                  <p className="text-gray-600">Manage user roles and permissions</p>
                </div>
              </div>
              <div className="mt-4 inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                Total Users: {users.length}
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#2EC1DB] to-sky-500">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Role</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={user.photo}
                                alt={user.name}
                                className="w-12 h-12 rounded-full ring-2 ring-gray-200"
                              />
                              {user.role === 'admin' && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                                  <FiShield className="text-white" size={10} />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-gray-800">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-700">{user.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          {user.role === 'admin' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                              <FiShield className="mr-1" size={14} />
                              Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                              <FiUserCheck className="mr-1" size={14} />
                              User
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            {user.role === 'admin' ? (
                              <span className="text-gray-400 text-sm">Already Admin</span>
                            ) : (
                              <button
                                onClick={() => handleAddmin(user)}
                                className="px-4 py-2 bg-gradient-to-r from-[#2EC1DB] to-sky-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
                              >
                                Make Admin
                              </button>
                            )}
                            <button className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 text-sm">
                              Make Guide
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ManageUser;