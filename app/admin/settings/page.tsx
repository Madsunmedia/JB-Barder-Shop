import { getSettings } from "@/app/actions/settings";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsAdminPage() {
  const settings = await getSettings();
  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <SettingsClient initialSettings={settings as any} />
      </div>
    </div>
  );
}
