
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userBlogs = await prisma.blog.findMany({
    where: { authorId: session.user.id },
    include: { author: true },
  });

  return <Dashboard userBlogs={userBlogs} />;
}
