import { NextResponse } from "next/server"

// ✅ ID generator for components
function createId(type: string): string {
  return `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
}

export async function POST(req: Request) {

  const body = await req.json()

  const { type, intent, plan } = body

  if (type === "planner") {

    return NextResponse.json({
      plan: {
        intent,
        layout: "dashboard",
        components: ["Navbar", "Card", "Button"]
      }
    })

  }

  if (type === "generator") {

    const now = Date.now()

    const previousTree = body.previousTree || null

    let children: any[] = []

    if (
      previousTree &&
      previousTree.root &&
      Array.isArray(previousTree.root.children)
    ) {
      children = [...previousTree.root.children]
    }

    let intent = " "
    if (body.plan && typeof body.plan.intent === "string") {
      intent = body.plan.intent.toLowerCase()
    } else if (typeof body.intent === "string") {
      intent = body.intent.toLowerCase()
    }

    // Navbar
    if (
      intent.includes("navbar")
      &&
      !children.some(c => c.type === "Navbar")
    ) {
      children.push({
        id: "navbar-" + now,
        type: "Navbar",
        props: {
          logo: "Company",
          links: ["Home", "Dashboard", "Analytics"]
        },
        children: []
      })
    }

    // Sidebar
    if (
      intent.includes("sidebar")
      &&
      !children.some(c => c.type === "Sidebar")
    ) {
      children.push({
        id: "sidebar-" + now,
        type: "Sidebar",
        props: {
          title: "Navigation",
          items: ["Dashboard", "Projects", "Users", "Settings"]
        },
        children: []
      })
    }

    // Table
    if (
      intent.includes("table")
      &&
      !children.some(c => c.type === "Table")
    ) {
      children.push({
        id: "table-" + now,
        type: "Table",
        props: {
          headers: ["Project", "Status", "Date"],
          rows: [
            { Project: "Website Redesign", Status: "Active", Date: "Today" },
            { Project: "Mobile App", Status: "Pending", Date: "Tomorrow" },
            { Project: "Marketing Campaign", Status: "Completed", Date: "Yesterday" }
          ]
        },
        children: []
      })
    }

    // Chart
    if (
      intent.includes("chart")
      &&
      !children.some(c => c.type === "Chart")
    ) {
      children.push({
        id: "chart-" + now,
        type: "Chart",
        props: {
          title: "Analytics",
          data: [10, 30, 50, 70]
        },
        children: []
      })
    }

    // Email input
    if (
      intent.includes("email")
      &&
      !children.some(c => c.type === "Input" && c.props?.name === "email")
    ) {
      children.push({
        id: "input-email-" + now,
        type: "Input",
        props: {
          label: "Email",
          placeholder: "Enter email",
          type: "email",
          name: "email"
        },
        children: []
      })
    }

    // Password input
    if (
      intent.includes("password")
      &&
      !children.some(c => c.type === "Input" && c.props?.name === "password")
    ) {
      children.push({
        id: "input-password-" + now,
        type: "Input",
        props: {
          label: "Password",
          placeholder: "Enter password",
          type: "password",
          name: "password"
        },
        children: []
      })
    }

    // Button
    if (
      intent.includes("button") || intent.includes("submit")
    ) {
      if (!children.some(c => c.type === "Button")) {
        children.push({
          id: "button-submit-" + now,
          type: "Button",
          props: {
            text: "Submit",
            variant: "primary"
          },
          children: []
        })
      }
    }

    // Card
    if (
      intent.includes("card")
      &&
      !children.some(c => c.type === "Card")
    ) {
      children.push({
        id: "card-" + now,
        type: "Card",
        props: {
          title: intent,
          description: "Generated from intent"
        },
        children: []
      })
    }

    // Modal
    if (
      intent.includes("modal")
      &&
      !children.some(c => c.type === "Modal")
    ) {
      children.push({
        id: "modal-" + now,
        type: "Modal",
        props: {
          title: "Login Modal",
          content: "This is a modal generated from your intent.",
        },
        children: []
      })
    }

    // ✅ ALWAYS RETURN TREE (THIS FIXES GENERATION FAILURE)
    const tree = {
      version: "1.0",
      root: {
        id: "page-" + now,
        type: "Page",
        props: {},
        children
      }
    }

    return NextResponse.json({ tree })

  }

  if (type === "explainer") {

    if (type === "explainer") {

      const intent =
        body.intent ||
        body.plan?.intent ||
        ""

      const newTree =
        body.newTree ||
        body.plan?.current ||
        body.tree ||
        null

      const previousTree =
        body.previousTree ||
        body.plan?.previous ||
        null

      function extractComponents(node: any, set = new Set<string>()) {

        if (!node) return set

        if (node.type && typeof node.type === "string") {
          set.add(node.type)
        }

        if (Array.isArray(node.children)) {
          for (const child of node.children) {
            extractComponents(child, set)
          }
        }

        return set
      }

      const newRoot =
        newTree?.root ||
        newTree?.tree?.root ||
        newTree

      const previousRoot =
        previousTree?.root ||
        previousTree?.tree?.root ||
        previousTree ||
        null

      const newComponents =
        extractComponents(newRoot)

      const previousComponents =
        previousRoot
          ? extractComponents(previousRoot)
          : new Set<string>()

      const addedComponents =
        Array.from(newComponents)
          .filter(c => !previousComponents.has(c))
          .filter(c => c !== "Page")

      const allComponents =
        Array.from(newComponents)
          .filter(c => c !== "Page")

      const componentDescriptions: Record<string, string> = {

        Navbar: "Navigation bar added for page navigation.",
        Sidebar: "Sidebar added for structured navigation.",
        Card: "Card added to organize related content.",
        Input: "Input fields added so users can enter data.",
        Button: "Button added for user actions.",
        Table: "Table added to display structured data.",
        Chart: "Chart added to visualize analytics data.",
        Modal: "Modal added for popup interaction."
      }

      let assistantMessage =
        previousRoot
          ? `I updated your UI based on your prompt: "${intent}".\n\n`
          : `I generated a UI based on your prompt: "${intent}".\n\n`

      const targetComponents =
        previousRoot ? addedComponents : allComponents

      targetComponents.forEach(component => {

        assistantMessage +=
          `• ${component}: ${componentDescriptions[component] ||
          "Component added."
          }\n`

      })

      let explanation =
        previousRoot
          ? `This UI was incrementally updated from your prompt: "${intent}".\n\n`
          : `This UI was generated from your prompt: "${intent}".\n\n`

      allComponents.forEach(component => {

        explanation +=
          `${component} → ${componentDescriptions[component] ||
          "Provides UI functionality."
          }\n\n`

      })

      explanation +=
        "The UI uses only the fixed deterministic component library."

      return NextResponse.json({
        assistantMessage,
        explanation
      })

    }

  }

}
