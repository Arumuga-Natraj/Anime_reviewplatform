import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome {session.user.email}</h1>
    </div>
  );
}
