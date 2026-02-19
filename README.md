
# AI Deterministic UI Generator
https://ai-deterministic-ui-generator.vercel.app/


## Overview

This project is an AI-powered deterministic UI generator that converts natural language prompts into working React UI using a fixed, deterministic component library.

The system follows a structured agent architecture inspired by Claude-Code style UI generation, ensuring predictable, safe, and reproducible UI output.

Users can:

• Describe UI in natural language
• Generate working UI instantly
• Modify UI incrementally
• See live preview
• Understand AI decisions

---

## Agent Architecture

The system uses a 3-step agent pipeline:

### 1. Planner

Purpose: Interpret user intent and select appropriate components.

Input:
Natural language prompt

Output:
Structured plan containing selected components and layout intent.

Responsibilities:

• Intent interpretation
• Component selection
• Layout planning

---

### 2. Generator

Purpose: Convert structured plan into deterministic UI tree.

Responsibilities:

• Uses only allowed components
• Prevents duplicate components
• Preserves existing UI during updates
• Generates structured UI tree

Output Example:

Page
├ Navbar
├ Sidebar
├ Card
└ Button

---

### 3. Explainer

Purpose: Explain AI decisions transparently.

Example output:

Navbar added for navigation
Table added for structured data display

Responsibilities:

• Identify added components
• Explain reasoning
• Improve transparency

---

### Example prompts
1.simple dashboard with navbar
2.login page with email password and submit button
3.simple sidebar navigation to dashboard
4.add project table to dashboard
5.add analytics chart to dashboard
6.simple login modal with submit button
7.add card with welcome message
8.create dashboard with navbar sidebar table and chart

---

## Component System Design

The system uses a fixed deterministic component library.

Allowed components:

Navbar
Sidebar
Card
Button
Input
Table
Chart
Modal

Constraints enforced:

• No dynamic component creation
• No external UI libraries
• No arbitrary styling generation
• Only predefined components allowed

This ensures deterministic and safe UI generation.

---

## Technical Architecture

Frontend:
Next.js (React)

Backend:
Next.js API Routes

Language:
TypeScript

Deployment:
Vercel

---

## Deterministic Rendering

The generator produces a structured UI tree.

Renderer converts the tree into React components recursively.

This ensures:

• Predictable UI
• Safe generation
• Consistent output

---

## Known Limitations

• Basic layout intelligence
• No persistent storage
• Limited styling
• Rule-based planning instead of full LLM reasoning

---

## Improvements With More Time

• Add version history and rollback
• Integrate full LLM planner
• Add diff view between versions
• Improve layout intelligence
• Add persistent database
• Enhance styling system

---

## Local Setup

Install dependencies:

npm install

Run development server:

npm run dev

Open browser:

http://localhost:3000

---

## Deployment

The application is deployed using Vercel.

---

## Assignment Coverage

- Planner agent implemented
- Generator agent implemented
- Explainer agent implemented
- Deterministic component system implemented
- Live preview supported
- Incremental updates supported

---



KUMMARI SAI HARSHITHA
AI Deterministic UI Generator 

