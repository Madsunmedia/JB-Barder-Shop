import { getDashboardStats } from "@/app/actions/dashboard";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  return <DashboardClient stats={stats} />;
}
