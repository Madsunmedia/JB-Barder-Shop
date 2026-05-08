import { getServices } from "@/app/actions/services";
import ServicesManager from "./ServicesManager";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | JB Barbershop Admin",
};

export default async function ServicesAdminPage() {
  const services = await getServices();
  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <ServicesManager initialServices={services} />
      </div>
    </div>
  );
}
