import { Suspense } from "react";
import TeamContent from "./TeamContent";
import Footer from "@/components/Footer";
import { getDynamicTeamCategories, getDynamicTeamMembers } from "@/lib/team-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Team | Roman Builders & Developers",
  description: "Meet the executive leadership, engineering experts, advisory council, and software developers behind Roman Builders & Developers.",
};

export default async function TeamPage() {
  const [categories, members] = await Promise.all([
    getDynamicTeamCategories(),
    getDynamicTeamMembers(),
  ]);

  return (
    <main className="relative min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen pt-40 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#3d4435] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <TeamContent categories={categories} members={members} />
      </Suspense>
      <Footer transparent={true} />
    </main>
  );
}
