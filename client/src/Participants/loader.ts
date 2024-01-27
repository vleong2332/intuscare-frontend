import type { Participant } from "../types";

export async function loader() {
  const response = await fetch("//localhost:5000/participants");
  const data: Participant[] = await response.json();
  return { participants: data }
}
