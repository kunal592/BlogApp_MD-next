
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileDashboard from "@/components/ProfileDashboard";
import NotFound from "@/components/NotFound";

export default async function ProfilePage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      followers: true,
      following: true,
    },
  });

  if (!user) return <NotFound message="User profile not found" />;

  return <ProfileDashboard user={user} />;
}
