import CardItem from "@/components/CardItem";
import DeleteUser from "@/components/DeleteUser";
import prisma from "@/lib/prisma";

// Make this page dynamic
export const dynamic = "force-dynamic";

export default async function Page() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto w-full px-4">
      <h1 className="text-4xl font-bold mb-8 mt-16">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.length === 0 && <div className="mb-2">No users found</div>}
        {users.map((user) => (
          // create user card
          <div
            key={user.id}
            className="mb-4 p-4 border border-gray-300 rounded-md space-y-4"
          >
            {/* Header Section: Name and Email */}
            <div className="flex justify-between items-start mb-6 flex-wrap">
              <div className="text-right flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {user.city || "Unknown Location"}
                </span>
                <DeleteUser userId={user.id} />
              </div>
            </div>

            {/* Coordinates Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mr-2">
                  Lat/Long
                </span>
                <code className="text-xs text-gray-600">
                  {user.latitude?.toFixed(4) || "N/A"},{" "}
                  {user.longitude?.toFixed(4) || "N/A"}
                </code>
              </div>
            </div>
            <CardItem
              fieldName="Created At"
              fieldValue={user.createdAt?.toLocaleString() || ""}
            />
            <hr className="my-4" />
            <div className="text-sm text-gray-400 grid grid-cols-2 gap-2 mt-4">
              <CardItem
                fieldName="IP Address"
                fieldValue={user.ipAddress || ""}
              />
              <CardItem
                fieldName="Browser Name"
                fieldValue={user.browserName || ""}
              />
              <CardItem
                fieldName="Browser Version"
                fieldValue={user.browserVersion || ""}
              />
              <CardItem
                fieldName="Country Name"
                fieldValue={user.countryName || ""}
              />
              <CardItem fieldName="City" fieldValue={user.city || ""} />
              <CardItem fieldName="Locality" fieldValue={user.locality || ""} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
