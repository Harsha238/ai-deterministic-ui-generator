
# AI Deterministic UI Generator


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

Planner agent implemented
Generator agent implemented
Explainer agent implemented
Deterministic component system implemented
Live preview supported
Incremental updates supported

---

<<<<<<< HEAD
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# ai-deterministic-ui-generator
>>>>>>> df4eb7aa9c4ad904e18ff90a008d8363221e0a5e
=======
## Author

KUMMARI SAI HARSHITHA
AI Deterministic UI Generator – Ryze AI Assignment
>>>>>>> 1dbeef23ae75b2c4b8dddf245861d44b4ed9ec11
