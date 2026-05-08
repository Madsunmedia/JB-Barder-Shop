import { getDashboardStats } from "@/app/actions/dashboard";
import DashboardClient from "./DashboardClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | JB Barbershop Admin",
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  return <DashboardClient stats={stats} />;
}
