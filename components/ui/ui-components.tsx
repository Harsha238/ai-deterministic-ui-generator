"use client"

import React from "react"

/* PAGE */
function Page({ children }: any) {

  return (
    <div style={{
      padding: "20px",
      background: "#f5f5f5",
      minHeight: "100%"
    }}>
      {children}
    </div>
  )
}


/* NAVBAR */
function Navbar({ logo, links }: any) {

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      background: "#222",
      color: "white",
      padding: "10px"
    }}>
      <div>{logo}</div>

      <div>
        {links?.map((link: string, i: number) => (
          <span key={i} style={{ marginLeft: "10px" }}>
            {link}
          </span>
        ))}
      </div>
    </div>
  )
}


/* SIDEBAR */
function Sidebar({ title, items }: any) {

  return (
    <div style={{
      background: "#ddd",
      padding: "10px",
      marginTop: "10px"
    }}>
      <h4>{title}</h4>

      {items?.map((item: string, i: number) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  )
}


/* CARD */
function Card({ title, description, children }: any) {

  return (
    <div style={{
      background: "white",
      padding: "15px",
      marginTop: "10px",
      border: "1px solid #ccc"
    }}>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  )
}


/* BUTTON */
function Button({ text }: any) {

  function handleClick() {
    alert(text)
  }

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px",
        background: "#0070f3",
        color: "white",
        border: "none",
        marginTop: "10px"
      }}
    >
      {text}
    </button>
  )
}


/* INPUT */
function Input({
  label,
  placeholder,
  type,
  value
}: {
  label?: string
  placeholder?: string
  type?: string
  value?: string
}) {

  return (

    <div style={{ marginTop: "12px", width: "100%" }}>

      {label && (
        <label style={{
          display: "block",
          marginBottom: "4px",
          fontWeight: "500"
        }}>
          {label}
        </label>
      )}

      <input
        type={type || "text"}
        placeholder={placeholder || ""}
        defaultValue={value || ""}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px"
        }}
      />

    </div>

  )
}



/* TABLE */
function Table({ headers, rows }: any) {

  return (
    <table
      border={1}
      style={{ marginTop: "10px", width: "100%" }}
    >

      <thead>
        <tr>
          {headers?.map((h: string, i: number) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows?.map((row: any, i: number) => (
          <tr key={i}>
            {headers.map((h: string, j: number) => (
              <td key={j}>{row[h]}</td>
            ))}
          </tr>
        ))}
      </tbody>

    </table>
  )
}

/*Modal*/
function Modal({ title, isOpen, children }: any) {

  // ✅ Don't render if not open
  if (!isOpen) return null

  return (
    <div style={{
      border: "2px solid black",
      padding: "10px",
      marginTop: "10px",
      background: "white"
    }}>
      <b>{title}</b>

      <div style={{ marginTop: "10px" }}>
        {children}
      </div>

    </div>
  )
}




/* CHART (mock) */
function Chart({ title, data }: any) {

  return (
    <div style={{
      marginTop: "10px",
      padding: "10px",
      border: "1px solid black"
    }}>
      <h4>{title}</h4>

      {data?.map((d: number, i: number) => (
        <div key={i}>
          {d}
        </div>
      ))}
    </div>
  )
}


export const UIComponents = {

  Page,
  Navbar,
  Sidebar,
  Card,
  Button,
  Input,
  Table,
  Modal,
  Chart

}
