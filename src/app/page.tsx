"use client";

import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Menu,
  MoreHorizontal,
  Plus,
  Rocket,
  Server,
  Settings2,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

const providers = [
  { name: "GitHub", detail: "Source control", icon: GitBranch, tone: "ink" },
  { name: "VPS", detail: "Compute layer", icon: Server, tone: "mint" },
  { name: "Vercel", detail: "Edge delivery", icon: Cloud, tone: "sky" },
  { name: "Supabase", detail: "Data + auth", icon: Database, tone: "lime" },
];

const projects = [
  { name: "northstar", type: "Marketing site", status: "Live", time: "12m ago", color: "#f2ad3e" },
  { name: "loomboard", type: "SaaS dashboard", status: "Building", time: "Yesterday", color: "#ee6d57" },
  { name: "atlas-notes", type: "Web app", status: "Live", time: "2d ago", color: "#79b6a1" },
];

const initialSteps = [
  { label: "Brief understood", meta: "Kuda parsed your requirements", state: "done" },
  { label: "Scaffolding app", meta: "Next.js + TypeScript", state: "active" },
  { label: "Connecting services", meta: "GitHub, Vercel, Supabase", state: "queued" },
  { label: "Ready to ship", meta: "Preview URL and handoff", state: "queued" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState(initialSteps);

  function startBuild() {
    if (!prompt.trim()) return;
    setIsRunning(true);
    setSteps((current) => current.map((step, index) => ({ ...step, state: index < 2 ? "done" : index === 2 ? "active" : "queued" })));
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><Zap size={17} strokeWidth={3} /></div>
          <span className="brand-name">kuda</span>
          <button className="icon-button mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>
        <div className="workspace-switcher"><span className="workspace-dot" />Acme workspace<ChevronDown size={15} /></div>
        <nav className="side-nav">
          <span className="nav-label">Workspace</span>
          <a className="nav-item active" href="#overview"><Activity size={17} />Overview</a>
          <a className="nav-item" href="#projects"><Code2 size={17} />Projects<span className="nav-count">3</span></a>
          <a className="nav-item" href="#activity"><Terminal size={17} />Activity</a>
          <span className="nav-label nav-label-spaced">Connect</span>
          <a className="nav-item" href="#services"><Globe2 size={17} />Services<span className="status-dot" /></a>
          <a className="nav-item" href="#settings"><Settings2 size={17} />Settings</a>
        </nav>
        <div className="sidebar-footer"><div className="model-orb"><Sparkles size={16} /></div><div><strong>OpenRouter</strong><span>Free model · connected</span></div><CircleHelp size={16} className="muted-icon" /></div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>Overview</strong></div><div className="top-actions"><button className="icon-button" aria-label="Help"><CircleHelp size={18} /></button><div className="avatar">AC</div></div></header>

        <div className="content-wrap">
          <section className="welcome-row"><div><p className="eyebrow">WEDNESDAY, SEP 30, 2026</p><h1>Ship something <em>real.</em></h1><p className="subhead">Your full-stack workspace, orchestrated by AI.</p></div><button className="new-project-button" onClick={() => document.getElementById("build-prompt")?.focus()}><Plus size={17} />New project</button></section>

          <section className="build-layout">
            <div className="prompt-card" id="build-prompt">
              <div className="prompt-topline"><div className="sparkle-chip"><Sparkles size={15} />Build with Kuda</div><span className="model-label">openrouter / free <span className="online-dot" /></span></div>
              <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe what you want to build..." aria-label="Describe your project" />
              <div className="prompt-footer"><span className="prompt-hint">Try “A waitlist page for a new coffee brand”</span><button className="build-button" onClick={startBuild} disabled={!prompt.trim()}><Rocket size={16} />Start building <span className="shortcut">⌘ ↵</span></button></div>
            </div>
            <div className="stack-panel" id="services"><div className="section-heading"><div><p className="eyebrow">DEFAULT STACK</p><h2>Everything connected</h2></div><button className="text-button">Manage <ArrowUpRight size={14} /></button></div><div className="provider-list">{providers.map(({ name, detail, icon: Icon, tone }) => <div className="provider-row" key={name}><div className={`provider-icon ${tone}`}><Icon size={17} /></div><div className="provider-copy"><strong>{name}</strong><span>{detail}</span></div><Check size={16} className="check-icon" /></div>)}</div></div>
          </section>

          <section className="lower-grid"><div className="run-panel" id="activity"><div className="section-heading"><div><p className="eyebrow">{isRunning ? "BUILD IN PROGRESS" : "LATEST RUN"}</p><h2>{isRunning ? "Your project is taking shape" : "Ready when you are"}</h2></div><span className={`run-badge ${isRunning ? "building" : "ready"}`}><span />{isRunning ? "Building" : "Idle"}</span></div><div className="timeline">{steps.map((step) => <div className={`timeline-row ${step.state}`} key={step.label}><div className="timeline-marker">{step.state === "done" ? <Check size={13} /> : step.state === "active" ? <span className="pulse" /> : null}</div><div><strong>{step.label}</strong><span>{step.meta}</span></div>{step.state === "active" && <span className="now-label">Now</span>}</div>)}</div></div><div className="projects-panel" id="projects"><div className="section-heading"><div><p className="eyebrow">YOUR PROJECTS</p><h2>Recent work</h2></div><button className="icon-button" aria-label="More project options"><MoreHorizontal size={18} /></button></div><div className="project-list">{projects.map((project) => <div className="project-row" key={project.name}><span className="project-color" style={{ background: project.color }} /><div className="project-copy"><strong>{project.name}</strong><span>{project.type}</span></div><div className={`project-status ${project.status.toLowerCase()}`}><span />{project.status}</div><span className="project-time">{project.time}</span></div>)}</div><button className="view-all">View all projects <ArrowUpRight size={14} /></button></div></section>
        </div>
      </main>
    </div>
  );
}
