import type { UITree } from "./schema"

export async function planUI(
  intent: string,
  previousTree?: UITree | null
) {

  const res = await fetch("/api/ai", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      type: "planner",
      intent,
      previousTree
    })

  })

  if (!res.ok)
    throw new Error("Planner failed")

  // ✅ THIS LINE WAS MISSING
  const data = await res.json()

  // ✅ RETURN CORRECT STRUCTURE
  return data.plan ?? data

}
