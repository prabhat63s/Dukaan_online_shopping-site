/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";

const PAGE_SIZE = 7;

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [auth] = useAuth();

  const indexOfLastUser = currentPage * PAGE_SIZE;
  const indexOfFirstUser = indexOfLastUser - PAGE_SIZE;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("https://dukaan-online-shopping-site.onrender.com/api/v1/auth/users", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setUsers(data.users);
      setTotalPages(Math.ceil(data.total / PAGE_SIZE)); 
      toast.success("Users successfully fetched")
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Users failed to load")
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="">
        <h1 className="text-2xl font-semibold mb-6">All users</h1>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role === 1 ? "Admin" : "User"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
