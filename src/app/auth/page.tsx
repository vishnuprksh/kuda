"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound, LockKeyhole, Zap } from "lucide-react";
import { authClient } from "@/lib/auth/client";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage("");
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      setMessage(error.message || "Unable to sign in. Check your details and try again.");
      setIsPending(false);
      return;
    }
    router.push("/");
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="auth-brand"><span className="brand-mark"><Zap size={17} strokeWidth={3} /></span><span>kuda</span></div>
        <div className="auth-icon"><LockKeyhole size={21} /></div>
        <p className="eyebrow">WELCOME BACK</p>
        <h1 id="auth-title">Build something <em>real.</em></h1>
        <p className="auth-copy">Sign in to return to your workspace and keep shipping.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Work email</label>
          <input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <button className="auth-submit" type="submit" disabled={isPending}><KeyRound size={16} />{isPending ? "Signing in..." : "Sign in"} <ArrowRight size={16} /></button>
        </form>
        {message && <p className="auth-message" role="status">{message}</p>}
        <p className="auth-legal">Authentication is handled securely by your configured Neon Auth provider.</p>
      </section>
    </main>
  );
}
