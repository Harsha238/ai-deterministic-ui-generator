// Individual component node
export interface UIComponent {

  id: string

  type:
    | "Page"
    | "Navbar"
    | "Sidebar"
    | "Card"
    | "Button"
    | "Input"
    | "Modal"
    | "Table"
    | "Chart"

  props: Record<string, any>

  children: UIComponent[]
}


// Whole UI tree
export interface UITree {

  version: string

  root: UIComponent
}


// Chat message
export interface ChatMessage {

  role: "user" | "assistant"

  content: string
}


// History version
export interface UIVersion {

  id: string

  timestamp: number

  intent: string

  tree: UITree

  explanation: string

  messages: ChatMessage[]
}
