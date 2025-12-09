"use client";

import { trpc } from "@/src/lib/trpc";

export function TrpcTest() {
  const { data, isLoading, error } = trpc.userList.useQuery(undefined);

  if (isLoading)
    return <div className="text-blue-500 animate-pulse">Loading tRPC...</div>;
  if (error)
    return <div className="text-red-500">tRPC Error: {error.message}</div>;

  return (
    <div className="mt-8 border rounded-lg overflow-hidden shadow-sm border-blue-200">
      <div className="bg-blue-50 px-6 py-3 border-b border-blue-200">
        <h2 className="text-lg font-bold text-blue-800">
          tRPC Client Response
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
              {/* Added ID column to match your other table */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {data?.map((item, index) => (
              // 💡 Note the key here
              <tr
                key={item._id || index}
                className="hover:bg-blue-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                  {item._id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
