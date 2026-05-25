"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React, { useState } from "react"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, Building2, Palette, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// ─── Design tokens ────────────────────────────────────────────────────────────

const t = {
  bg:     "#F5F5F3",
  white:  "#FFFFFF",
  border: "#E3E3E0",
  muted:  "#B1B1B1",
  blue:   "#1518A6",
  label:  "#909090",
  text:   "#222222",
}

// ─── Centred page shell ───────────────────────────────────────────────────────

function AuthShell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: t.bg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 16px",
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
    }}>
      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: t.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>T</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: t.text, letterSpacing: "-0.01em" }}>Thematic</span>
      </div>

      <div style={{ width: "100%", maxWidth: wide ? 520 : 400 }}>
        {children}
      </div>
    </div>
  )
}

// ─── OAuth button ─────────────────────────────────────────────────────────────

function OAuthButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <Button variant="outline" fullWidth>
      {icon}
      {label}
    </Button>
  )
}

// Placeholder Google/GitHub SVG marks
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

// ─── Sign In screen ───────────────────────────────────────────────────────────

function SignInScreen() {
  const [showPw, setShowPw] = useState(false)

  return (
    <AuthShell>
      <Card>
        <CardHeader>
          <CardTitle>Sign in to Thematic</CardTitle>
          <CardDescription>Welcome back — enter your credentials to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <OAuthButton label="Continue with Google" icon={<GoogleIcon />} />
            <OAuthButton label="Continue with GitHub" icon={<GitHubIcon />} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <Separator style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: t.label, fontFamily: "var(--font-sans)" }}>or email</span>
            <Separator style={{ flex: 1 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Input
              label="Email"
              type="email"
              placeholder="you@company.com"
              prefixIcon={<Mail />}
              required
            />
            <Input
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              prefixIcon={<Lock />}
              suffixIcon={
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
                >
                  {showPw ? <EyeOff className="size-4 text-muted-foreground" /> : <Eye className="size-4 text-muted-foreground" />}
                </button>
              }
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
            <Button variant="link" size="xs" style={{ padding: 0, height: "auto" }}>
              Forgot password?
            </Button>
          </div>
        </CardContent>
        <CardFooter style={{ flexDirection: "column", gap: 12 }}>
          <Button fullWidth>
            Sign in
            <ArrowRight className="size-4" />
          </Button>
          <p style={{ fontSize: 12, color: t.label, textAlign: "center", fontFamily: "var(--font-sans)", margin: 0 }}>
            Don't have an account?{" "}
            <span style={{ color: t.blue, cursor: "pointer", fontWeight: 500 }}>Sign up free</span>
          </p>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}

// ─── Sign Up screen ───────────────────────────────────────────────────────────

function SignUpScreen() {
  return (
    <AuthShell>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Start a 14-day free trial. No credit card needed.</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <OAuthButton label="Continue with Google" icon={<GoogleIcon />} />
            <OAuthButton label="Continue with GitHub" icon={<GitHubIcon />} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <Separator style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: t.label, fontFamily: "var(--font-sans)" }}>or email</span>
            <Separator style={{ flex: 1 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="First name" placeholder="Varsha" required />
              <Input label="Last name"  placeholder="S."     required />
            </div>
            <Input
              label="Work email"
              type="email"
              placeholder="you@company.com"
              prefixIcon={<Mail />}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              prefixIcon={<Lock />}
              helperText="Use a mix of letters, numbers and symbols."
              required
            />
          </div>
        </CardContent>
        <CardFooter style={{ flexDirection: "column", gap: 12 }}>
          <Button fullWidth>
            Create account
            <ArrowRight className="size-4" />
          </Button>
          <p style={{ fontSize: 11, color: t.label, textAlign: "center", fontFamily: "var(--font-sans)", margin: 0, lineHeight: 1.5 }}>
            By creating an account you agree to our{" "}
            <span style={{ color: t.blue, cursor: "pointer" }}>Terms of Service</span>
            {" "}and{" "}
            <span style={{ color: t.blue, cursor: "pointer" }}>Privacy Policy</span>.
          </p>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}

// ─── Onboarding — 3-step wizard ───────────────────────────────────────────────

const steps = [
  { icon: <Building2 className="size-5" />, title: "Your workspace",    desc: "Name your workspace and set the URL." },
  { icon: <Palette    className="size-5" />, title: "Pick a theme",      desc: "Choose the look and feel." },
  { icon: <Users      className="size-5" />, title: "Invite your team",  desc: "Add teammates to get started." },
]

function OnboardingScreen() {
  const [step, setStep] = useState(0)

  return (
    <AuthShell wide>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 36, height: 36,
                borderRadius: "50%",
                backgroundColor: i < step ? t.blue : i === step ? t.blue : t.border,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background-color 0.2s",
              }}>
                {i < step
                  ? <Check className="size-4 text-white" />
                  : <span style={{ color: i === step ? "#fff" : t.label, fontSize: 12, fontWeight: 600 }}>{i + 1}</span>
                }
              </div>
              <span style={{ fontSize: 10, color: i === step ? t.blue : t.label, fontFamily: "var(--font-sans)", fontWeight: i === step ? 600 : 400, whiteSpace: "nowrap" }}>
                {s.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 1, backgroundColor: i < step ? t.blue : t.border, maxWidth: 64, marginBottom: 20, transition: "background-color 0.2s" }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#E0E7FF", display: "flex", alignItems: "center", justifyContent: "center", color: t.blue }}>
              {steps[step].icon}
            </div>
            <div>
              <CardTitle>{steps[step].title}</CardTitle>
              <CardDescription>{steps[step].desc}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Input
                label="Workspace name"
                placeholder="Acme Design System"
                helperText="This is your team's display name."
                required
              />
              <Input
                label="Workspace URL"
                placeholder="acme"
                helperText="thematic.design/acme"
                required
              />
              <div style={{ padding: "12px 14px", borderRadius: 8, backgroundColor: "#EEF2FF", border: `1px solid #C7D2FE` }}>
                <p style={{ fontSize: 11, color: t.blue, margin: 0, fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>
                  💡 Your URL can only contain letters, numbers and hyphens, and cannot be changed later.
                </p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: 12, color: t.label, margin: 0, fontFamily: "var(--font-sans)" }}>Select a colour theme for your workspace:</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[
                  { name: "Thematic Blue", color: "#1518A6", active: true },
                  { name: "Forest Green",  color: "#166534" },
                  { name: "Slate Purple",  color: "#4C1D95" },
                ].map((theme, i) => (
                  <div key={i} style={{
                    borderRadius: 10,
                    border: `2px solid ${theme.active ? t.blue : t.border}`,
                    padding: 12,
                    cursor: "pointer",
                    backgroundColor: theme.active ? "#EEF2FF" : t.white,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                  }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: theme.color }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: t.text, fontFamily: "var(--font-sans)" }}>{theme.name}</span>
                    {theme.active && <Badge variant="brand" size="sm">Selected</Badge>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Input
                label="Invite by email"
                type="email"
                placeholder="teammate@company.com"
                prefixIcon={<Mail />}
                helperText="Separate multiple addresses with commas."
              />
              <div style={{ borderRadius: 8, border: `1px solid ${t.border}`, overflow: "hidden" }}>
                {["priya@acme.io", "james@acme.io"].map((email, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 14px",
                    borderBottom: i === 0 ? `1px solid ${t.border}` : undefined,
                    backgroundColor: t.white,
                  }}>
                    <span style={{ fontSize: 12, color: t.text, fontFamily: "var(--font-sans)" }}>{email}</span>
                    <Badge variant="outline">Member</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter style={{ justifyContent: "space-between" }}>
          <Button variant="outline" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
            Back
          </Button>
          <Button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>
            {step === steps.length - 1 ? "Finish setup" : "Continue"}
            <ArrowRight className="size-4" />
          </Button>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Wireframes/Login",
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
}
export default meta
type Story = StoryObj

export const SignIn: Story = {
  name: "Sign In",
  render: () => <SignInScreen />,
}

export const SignUp: Story = {
  name: "Sign Up",
  render: () => <SignUpScreen />,
}

export const Onboarding: Story = {
  name: "Onboarding — Wizard",
  render: () => <OnboardingScreen />,
}
