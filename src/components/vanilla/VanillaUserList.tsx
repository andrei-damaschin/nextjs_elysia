"use client";

import { useEffect, useState } from "react";
import client from "../../lib/eden";

export function VanillaUserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await client.users.index.get();
      if (data) {
        setUsers(data);
      } else {
        console.error("Failed to fetch vanilla users:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading)
    return <p className="text-blue-500 animate-pulse">Loading table...</p>;

  return (
    <div className="mt-8 border rounded-lg overflow-hidden shadow-sm border-blue-200">
      <div className="bg-blue-50 px-6 py-3 border-b border-blue-200">
        <h2 className="text-lg font-bold text-blue-800">
          User List (Vanilla API)
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-blue-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                  {user._id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
