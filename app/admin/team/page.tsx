import { getTeam } from "@/app/actions/team";
import TeamManager from "./TeamManager";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team | JB Barbershop Admin",
};

export default async function AdminTeamPage() {
  const team = await getTeam();

  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <TeamManager initialTeam={team} />
      </div>
    </div>
  );
}
