export async function explainUI(
  previousTree: any,
  newTree: any,
  intent: string
) {

  try {

    const res = await fetch("/api/ai", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        type: "explainer",
        previousTree,
        newTree,
        intent
      })

    })


    // safer error handling
    if (!res.ok) {

      const errorText = await res.text()

      console.error("Explainer API error:", errorText)

      return {
        assistantMessage:
          "I tried to explain the UI, but something went wrong.",

        explanation:
          "The explainer service failed. Please check the backend API."
      }

    }


    const data = await res.json()


    // safe fallback values
    return {

      assistantMessage:
        data.assistantMessage ||
        "The UI was generated successfully.",

      explanation:
        data.explanation ||
        "This UI was generated based on your prompt."

    }

  }
  catch (error) {

    console.error("Explainer fetch failed:", error)

    return {

      assistantMessage:
        "The UI was created, but explanation is temporarily unavailable.",

      explanation:
        "Explainer system encountered an error."

    }

  }

}
