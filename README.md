# SOVEREIGN (v1.0)
> **The Autonomous Neural Research Protocol**

![Status](https://img.shields.io/badge/STATUS-OPERATIONAL-cyan?style=for-the-badge&logoColor=white)
![Core](https://img.shields.io/badge/CORE-LLAMA3-blue?style=for-the-badge&logoColor=white)
![Latency](https://img.shields.io/badge/LATENCY-REALTIME-red?style=for-the-badge&logoColor=white)

---

## ⚡ Overview

**SOVEREIGN** is a next-generation autonomous research agent designed to synthesize high-fidelity intelligence reports in real-time. It moves beyond simple RAG (Retrieval-Augmented Generation) by employing a **Multi-Agent Cognitive Architecture** that mimics a human research team.

Using a specialized graph-based workflow (`LangGraph`), Sovereign decomposes complex objectives into sub-tasks, executes parallel search operations, fact-checks its own findings, and compiles everything into a stunning, download-ready dossier.

### 🧠 The Neural Architecture
The system is composed of four distinct neural agents working in concert:
1.  **STRATEGIST** (Zap): Analyzes the user's objective and formulates deep-dive search vectors.
2.  **SCOUT** (Search): Executes parallel reconnaissance across the live web to gather raw data.
3.  **FACT-CHECKER** (Shield): Scrutinizes gathered intelligence for contradictions, hallucinations, and validity.
4.  **WRITER** (Pen): Synthesizes verified data into a cohesive, narrative-driven intelligence report.

---

## 💎 Key Features

- **Autonomous Research Loop**: Just give it a topic. Sovereign handles the rest.
- **Self-Correcting Logic**: Built-in fact-checking step ensures high reliability of information.
- **Real-Time Neural Link**: Watch the agents "think" and resolve tasks via a live terminal feed.
- **Aesthetic Intelligence Reports**: Export your research as a beautifully formatted, dark-mode PDF dossier.
- **Local Privacy**: Powered by local LLMs (Llama 3 & Mistral) via Ollama. No data leaves your machine.

---

## 🛠️ Tech Stack

### **Cortex (Backend)**
-   **LangGraph**: Cyclic graph architecture for agent orchestration.
-   **LangChain**: LLM tooling and abstractions.
-   **FastAPI**: High-performance async server for real-time event streaming (`SSE`).
-   **Ollama**: Local inference engine running Llama 3 (Logic) and Mistral (Creative).

### **Interface (Frontend)**
-   **Next.js 14**: React framework for the neural interface.
-   **Tailwind CSS**: Utility-first styling for the "Cyber-Native" aesthetic.
-   **Framer Motion**:Fluid, cinematic UI animations.
-   **jsPDF**: Client-side aesthetic PDF generation engine.

---

## 🚀 Deployment Protocol

### Prerequisites
1.  **Ollama**: Installed and running (`ollama serve`).
2.  **Python 3.10+**
3.  **Node.js 18+**

### Phase 1: Initialize Cortex (Backend)
```bash
# Clone the repository
git clone https://github.com/yourusername/sovereign-researcher.git
cd sovereign-researcher

# Ignite Python Environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install Neural Dependencies
pip install -r requirements.txt

# Download Agent Models (REQUIRED)
ollama pull llama3
ollama pull mistral

# Launch Cortex
python main.py
```

### Phase 2: Initialize Interface (Frontend)
```bash
# Open a new terminal
cd frontend/researcher

# Install Packages
npm install

# Launch Interface
npm run dev
```

### Phase 3: Execute
Access the Neural Interface at `http://localhost:3000`. Enter your target objective and watch Sovereign work.

---

## 📸 Interface Preview

*(Add screenshots here)*

---

## 📜 License
MIT License. **Sovereign** is open research technology.
