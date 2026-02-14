import type { UITree } from "./schema"

export async function generateUI(
  plan: any,
  previousTree?: UITree | null
): Promise<UITree> {

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "generator",
      plan,
      previousTree
    })
  })

  if (!res.ok)
    throw new Error("Generator failed")

  const data = await res.json()

  console.log("GENERATOR RESPONSE:", data)

  // ✅ CRITICAL FIX
  if (data.tree) return data.tree

  if (data.root) return data

  if (data.plan?.tree) return data.plan.tree

  throw new Error("Invalid generator response")
}
