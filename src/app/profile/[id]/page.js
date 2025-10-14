
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import NotFound from "@/components/NotFound";

export default async function ProfilePage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const profile = await prisma.user.findUnique({
    where: { id: params.id },
    include: { blogs: true, followers: true, following: true },
  });

  if (!profile) return <NotFound message="User profile not found" />;

  return <ProfileCard profile={profile} session={session} />;
}
