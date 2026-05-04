import { fetchAvailability } from "./app/actions/availability";

async function test() {
  const result = await fetchAvailability("2026-05-07");
  console.log("Availability Result:", result);
}

test().catch(console.error);
