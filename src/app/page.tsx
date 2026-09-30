"use client";

import { useEffect, useRef, useState } from "react";
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

type Project = {
  name: string;
  type: string;
  status: string;
  time: string;
  color: string;
  brief: string;
};

const initialProviders = [
  { name: "GitHub", detail: "Source control", icon: GitBranch, tone: "ink", connected: true },
  { name: "VPS", detail: "Compute layer", icon: Server, tone: "mint", connected: true },
  { name: "Vercel", detail: "Edge delivery", icon: Cloud, tone: "sky", connected: true },
  { name: "Supabase", detail: "Data + auth", icon: Database, tone: "lime", connected: true },
];

const initialProjects: Project[] = [
  { name: "northstar", type: "Marketing site", status: "Live", time: "12m ago", color: "#f2ad3e", brief: "A conversion-focused launch site for a climate startup." },
  { name: "loomboard", type: "SaaS dashboard", status: "Building", time: "Yesterday", color: "#ee6d57", brief: "A collaborative planning dashboard for small teams." },
  { name: "atlas-notes", type: "Web app", status: "Live", time: "2d ago", color: "#79b6a1", brief: "A quiet place to collect and connect research notes." },
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
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("Web app");
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === "undefined") return initialProjects;
    const stored = window.localStorage.getItem("kuda-projects");
    try {
      return stored ? JSON.parse(stored) as Project[] : initialProjects;
    } catch {
      return initialProjects;
    }
  });
  const [providers, setProviders] = useState(initialProviders);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState(initialSteps);
  const [showSettings, setShowSettings] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("Acme workspace");
  const [defaultModel, setDefaultModel] = useState("OpenRouter");
  const [isDeploying, setIsDeploying] = useState(false);
  const [isHydrated] = useState(true);

  useEffect(() => {
    if (isHydrated) window.localStorage.setItem("kuda-projects", JSON.stringify(projects));
  }, [isHydrated, projects]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        startBuild();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  });

  function startBuild() {
    const brief = (document.getElementById("project-prompt") as HTMLTextAreaElement | null)?.value.trim() || prompt.trim();
    if (!brief) return;
    const name = projectName.trim() || brief.split(/\s+/).slice(0, 2).join("-").toLowerCase();
    setProjectName(name);
    setProjects((current) => [{ name, type: projectType, status: "Building", time: "Just now", color: "#79b6a1", brief }, ...current.filter((project) => project.name !== name)]);
    setSelectedProject(name);
    setIsRunning(true);
    setSteps((current) => current.map((step, index) => ({ ...step, state: index < 2 ? "done" : index === 2 ? "active" : "queued" })));
    window.setTimeout(() => {
      setSteps((current) => current.map((step) => ({ ...step, state: "done" })));
      setProjects((current) => current.map((project) => project.name === name ? { ...project, status: "Live", time: "Just now" } : project));
      setIsRunning(false);
    }, 1800);
  }

  function toggleProvider(name: string) {
    setProviders((current) => current.map((provider) => provider.name === name ? { ...provider, connected: !provider.connected } : provider));
  }

  function deployPreview() {
    if (!activeProject) return;
    setIsDeploying(true);
    setProjects((current) => current.map((project) => project.name === activeProject.name ? { ...project, status: "Preview", time: "Deploying now" } : project));
    window.setTimeout(() => {
      setProjects((current) => current.map((project) => project.name === activeProject.name ? { ...project, status: "Live", time: "Just now" } : project));
      setIsDeploying(false);
    }, 1200);
  }

  const activeProject = projects.find((project) => project.name === selectedProject);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><Zap size={17} strokeWidth={3} /></div>
          <span className="brand-name">kuda</span>
          <button className="icon-button mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>
        <div className="workspace-switcher"><span className="workspace-dot" />{workspaceName}<ChevronDown size={15} /></div>
        <nav className="side-nav">
          <span className="nav-label">Workspace</span>
          <a className="nav-item active" href="#overview" onClick={() => setMenuOpen(false)}><Activity size={17} />Overview</a>
          <a className="nav-item" href="#projects" onClick={() => setMenuOpen(false)}><Code2 size={17} />Projects<span className="nav-count">3</span></a>
          <a className="nav-item" href="#activity" onClick={() => setMenuOpen(false)}><Terminal size={17} />Activity</a>
          <span className="nav-label nav-label-spaced">Connect</span>
          <a className="nav-item" href="#services" onClick={() => setMenuOpen(false)}><Globe2 size={17} />Services<span className="status-dot" /></a>
          <button className="nav-item nav-button" onClick={() => { setShowSettings(true); setMenuOpen(false); }}><Settings2 size={17} />Settings</button>
        </nav>
        <div className="sidebar-footer"><div className="model-orb"><Sparkles size={16} /></div><div><strong>{defaultModel}</strong><span>Free model · connected</span></div><CircleHelp size={16} className="muted-icon" /></div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>Overview</strong></div><div className="top-actions"><button className="icon-button" aria-label="Help"><CircleHelp size={18} /></button><div className="avatar">AC</div></div></header>

        <div className="content-wrap">
          <section className="welcome-row"><div><p className="eyebrow">WEDNESDAY, SEP 30, 2026</p><h1>Ship something <em>real.</em></h1><p className="subhead">Your full-stack workspace, orchestrated by AI.</p></div><button className="new-project-button" onClick={() => document.getElementById("project-prompt")?.focus()}><Plus size={17} />New project</button></section>

          <section className="build-layout">
            <div className="prompt-card" id="build-prompt">
              <div className="prompt-topline"><div className="sparkle-chip"><Sparkles size={15} />Build with Kuda</div><span className="model-label">openrouter / free <span className="online-dot" /></span></div>
              <div className="prompt-fields"><input value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Project name (optional)" aria-label="Project name" /><select value={projectType} onChange={(event) => setProjectType(event.target.value)} aria-label="Project type"><option>Web app</option><option>Marketing site</option><option>SaaS dashboard</option><option>Internal tool</option></select></div>
              <textarea ref={promptRef} id="project-prompt" value={prompt} onChange={(event) => setPrompt(event.currentTarget.value)} placeholder="Describe what you want to build..." aria-label="Describe your project" />
              <div className="prompt-footer"><span className="prompt-hint">Try “A waitlist page for a new coffee brand”</span><button className="build-button" onClick={startBuild}><Rocket size={16} />Start building <span className="shortcut">⌘ ↵</span></button></div>
            </div>
            <div className="stack-panel" id="services"><div className="section-heading"><div><p className="eyebrow">DEFAULT STACK</p><h2>Everything connected</h2></div><button className="text-button" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>Manage <ArrowUpRight size={14} /></button></div><div className="provider-list">{providers.map(({ name, detail, icon: Icon, tone, connected }) => <button className={`provider-row provider-button ${connected ? "connected" : ""}`} key={name} onClick={() => toggleProvider(name)} aria-label={`${connected ? "Disconnect" : "Connect"} ${name}`}><div className={`provider-icon ${tone}`}><Icon size={17} /></div><div className="provider-copy"><strong>{name}</strong><span>{detail}</span></div>{connected ? <Check size={16} className="check-icon" /> : <span className="connect-label">Connect</span>}</button>)}</div></div>
          </section>
          {activeProject && <section className="project-detail" aria-live="polite"><div><p className="eyebrow">SELECTED PROJECT</p><h2>{activeProject.name}</h2><p>{activeProject.brief}</p></div><div className="detail-actions"><button className="secondary-button" onClick={() => setPrompt(activeProject.brief)}>Edit brief</button><button className="new-project-button" onClick={deployPreview} disabled={isDeploying}><Rocket size={15} />{isDeploying ? "Deploying..." : "Deploy preview"}</button></div></section>}
          {showSettings && <div className="modal-backdrop" onClick={() => setShowSettings(false)}><section className="settings-modal" onClick={(event) => event.stopPropagation()}><div className="section-heading"><div><p className="eyebrow">WORKSPACE</p><h2>Settings</h2></div><button className="icon-button" onClick={() => setShowSettings(false)} aria-label="Close settings"><X size={18} /></button></div><label>Workspace name<input value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} /></label><label>Default model<select value={defaultModel} onChange={(event) => setDefaultModel(event.target.value)}><option>OpenRouter</option><option>Local model</option></select></label><button className="new-project-button" onClick={() => setShowSettings(false)}>Save settings</button></section></div>}
        </div>
      </main>
    </div>
  );
}
