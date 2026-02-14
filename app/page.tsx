"use client"

import { useState, useEffect } from "react"

import { UIRenderer } from "@/components/ui/ui-renderer"

import type {
  UITree,
  UIVersion,
  ChatMessage
} from "@/lib/schema"

import { planUI } from "@/lib/planner"
import { generateUI } from "@/lib/generator"
import { explainUI } from "@/lib/explainer"

export default function Home() {

  const [intent, setIntent] = useState("")
  const [currentTree, setCurrentTree] = useState<UITree | null>(null)
  const [code, setCode] = useState("")
  const [history, setHistory] = useState<UIVersion[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [explanation, setExplanation] = useState("")

  // LOAD HISTORY ON START
  useEffect(() => {

    const saved = localStorage.getItem("ui-history")

    if (!saved) return

    try {

      const parsed: UIVersion[] = JSON.parse(saved)

      setHistory(parsed)

      const latest = parsed[parsed.length - 1]

      if (latest) {

        setCurrentTree(latest.tree)

        setCode(JSON.stringify(latest.tree, null, 2))

        setExplanation(String(latest.explanation || ""))

        setMessages(latest.messages || [])

      }

    } catch {}

  }, [])



  async function handleGenerate() {

    if (!intent.trim()) return

    try {

      const previousTree = currentTree

      // PLAN
      const plan = await planUI(intent, previousTree)

      // GENERATE
      const newTree: UITree = await generateUI(plan, previousTree)

      // EXPLAIN
      const result = await explainUI(previousTree, newTree, intent)

      const assistantText = String(result.assistantMessage || "")

      const explanationText = String(result.explanation || "")


      // UPDATE UI
      setCurrentTree(newTree)

      setCode(JSON.stringify(newTree, null, 2))

      setExplanation(explanationText)


      // UPDATE CHAT
      const newMessages: ChatMessage[] = [

        ...messages,

        {
          role: "user",
          content: intent
        },

        {
          role: "assistant",
          content: assistantText
        }

      ]

      setMessages(newMessages)


      // SAVE HISTORY
      const version: UIVersion = {

        id: Date.now().toString(),

        timestamp: Date.now(),

        intent,

        tree: newTree,

        explanation: explanationText,

        messages: newMessages

      }

      const newHistory = [...history, version]

      setHistory(newHistory)

      localStorage.setItem("ui-history", JSON.stringify(newHistory))

      setIntent("")

    }

    catch (err) {

      console.error(err)

      alert("Generation failed")

    }

  }



  function handleRollback(id: string) {

    const version = history.find(v => v.id === id)

    if (!version) return

    setCurrentTree(version.tree)

    setCode(JSON.stringify(version.tree, null, 2))

    setExplanation(String(version.explanation || ""))

    setMessages(version.messages || [])

  }



  function clearHistory() {

    setHistory([])

    localStorage.removeItem("ui-history")

  }



  return (

    <div className="h-screen flex flex-col bg-gray-100 p-4 overflow-hidden">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-black mb-3 flex-shrink-0">
        AI Deterministic UI Generator
      </h1>


      {/* INPUT */}
      <div className="flex gap-3 mb-3 flex-shrink-0">

        <textarea
          className="flex-1 border rounded p-3 bg-white text-black resize-none"
          placeholder="Describe your UI..."
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-6 rounded"
        >
          Generate UI
        </button>

      </div>



      {/* MAIN */}
      <div className="flex flex-col flex-1 overflow-hidden gap-3">


        {/* TOP */}
        <div className="flex gap-3 flex-[0.55] overflow-hidden">


          {/* CHAT */}
          <div className="w-1/3 bg-white border rounded p-3 flex flex-col overflow-hidden">

            <h2 className="font-bold mb-2 text-black">Chat</h2>

            <div className="flex-1 overflow-auto text-sm text-black">

              {messages.length === 0 &&
                <div className="text-gray-400">
                  No messages yet
                </div>
              }

              {messages.map((m, i) => (

                <div key={i}>

                  <b>{String(m.role)}:</b> {String(m.content)}

                </div>

              ))}

            </div>

          </div>



          {/* PREVIEW */}
          <div className="w-1/3 bg-white border rounded p-3 flex flex-col overflow-hidden">

            <h2 className="font-bold text-black">
              Live Preview
            </h2>

            {currentTree &&
              <div className="text-sm text-gray-700 mb-2">
                Version: {currentTree.version}
              </div>
            }

            <div className="flex-1 overflow-auto border rounded p-2">

              {currentTree?.root ?

                <UIRenderer node={currentTree.root} />

                :

                <div className="text-gray-400">
                  No UI generated yet
                </div>

              }

            </div>

          </div>



          {/* JSON */}
          <div className="w-1/3 bg-white border rounded p-3 flex flex-col overflow-hidden">

            <h2 className="font-bold mb-2 text-black">
              JSON Editor
            </h2>

            <textarea
  className="flex-1 border rounded p-2 font-mono text-sm text-black resize-none overflow-auto"
  value={code}
  onChange={(e) => {

    setCode(e.target.value)

    try {

      const parsed = JSON.parse(e.target.value)

      if (parsed.root)
        setCurrentTree(parsed)

    } catch {}

  }}
/>


          </div>

        </div>



        {/* BOTTOM */}
        <div className="flex gap-3 flex-[0.45] overflow-hidden">


          {/* EXPLANATION */}
          <div className="w-1/2 bg-white border rounded p-3 flex flex-col overflow-hidden">

            <h2 className="font-bold mb-2 text-black">
              Explanation
            </h2>

            <div className="flex-1 overflow-auto text-sm text-black whitespace-pre-wrap">

              {String(explanation || "Explanation will appear here")}

            </div>

          </div>



          {/* HISTORY */}
          <div className="w-1/2 bg-white border rounded p-3 flex flex-col overflow-hidden">

            <div className="flex justify-between mb-2">

              <h2 className="font-bold text-black">
                History
              </h2>

              <button
                onClick={clearHistory}
                className="text-red-600"
              >
                Clear
              </button>

            </div>

            <div className="flex-1 overflow-auto">

              {history.length === 0 ?

                <div className="text-gray-400">
                  No history yet
                </div>

                :

                history.map(v => (

                  <button
                    key={v.id}
                    onClick={() => handleRollback(v.id)}
                    className="block w-full text-left p-2 hover:bg-gray-100 text-black"
                  >
                    {v.intent}
                  </button>

                ))

              }

            </div>

          </div>


        </div>


      </div>

    </div>

  )

}
