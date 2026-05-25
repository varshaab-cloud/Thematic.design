"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, Building2, Palette, Users as UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// ─── OAuth icons ──────────────────────────────────────────────────────────────

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

// ─── Shared shell ─────────────────────────────────────────────────────────────

function AuthShell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen bg-[var(--base-color-gray-75)] flex flex-col items-center justify-center px-4 py-12">
      {/* Wordmark */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-7 h-7 rounded-[7px] bg-[var(--base-color-blue-800)] flex items-center justify-center">
          <span className="text-white text-[11px] font-bold leading-none">T</span>
        </div>
        <span className="text-base font-bold text-foreground tracking-tight">Thematic</span>
      </div>
      <div className={`w-full ${wide ? "max-w-[520px]" : "max-w-[400px]"}`}>
        {children}
      </div>
    </div>
  )
}

// ─── Sign In ──────────────────────────────────────────────────────────────────

function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const router   = useRouter()
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push("/dashboard"), 900)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to Thematic</CardTitle>
        <CardDescription>Welcome back — enter your credentials to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Button variant="outline" fullWidth>
            <GoogleIcon />
            Continue with Google
          </Button>
          <Button variant="outline" fullWidth>
            <GitHubIcon />
            Continue with GitHub
          </Button>
        </div>

        <div className="flex items-center gap-3 my-5">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or email</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPw
                  ? <EyeOff className="size-4" />
                  : <Eye className="size-4" />
                }
              </button>
            }
            required
          />
          <div className="flex justify-end -mt-1">
            <Button variant="link" size="xs" type="button" className="p-0 h-auto text-xs">
              Forgot password?
            </Button>
          </div>
          <Button fullWidth isLoading={loading} type="submit">
            Sign in
            {!loading && <ArrowRight className="size-4" />}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-xs text-muted-foreground">
          Don't have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-[var(--base-color-blue-800)] font-medium hover:underline"
          >
            Sign up free
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}

// ─── Sign Up ──────────────────────────────────────────────────────────────────

function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push("/dashboard"), 900)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Start a 14-day free trial.{" "}
          <Badge variant="success" size="sm">No credit card needed</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Button variant="outline" fullWidth>
            <GoogleIcon />
            Continue with Google
          </Button>
          <Button variant="outline" fullWidth>
            <GitHubIcon />
            Continue with GitHub
          </Button>
        </div>

        <div className="flex items-center gap-3 my-5">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or email</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
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
          <Button fullWidth isLoading={loading} type="submit">
            Create account
            {!loading && <ArrowRight className="size-4" />}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            By creating an account you agree to our{" "}
            <span className="text-[var(--base-color-blue-800)] cursor-pointer hover:underline">Terms of Service</span>
            {" "}and{" "}
            <span className="text-[var(--base-color-blue-800)] cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-[var(--base-color-blue-800)] font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}

// ─── Onboarding wizard ────────────────────────────────────────────────────────

const STEPS = [
  { icon: <Building2 className="size-5" />, title: "Your workspace",   desc: "Name it and set the URL." },
  { icon: <Palette    className="size-5" />, title: "Pick a theme",     desc: "Choose your brand colour." },
  { icon: <UsersIcon  className="size-5" />, title: "Invite your team", desc: "Add teammates to get started." },
]

const THEMES = [
  { name: "Thematic Blue",  hex: "#1518A6" },
  { name: "Forest Green",   hex: "#166534" },
  { name: "Slate Purple",   hex: "#4C1D95" },
]

function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep]       = useState(0)
  const [theme, setTheme]     = useState(0)

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else router.push("/dashboard")
  }

  return (
    <AuthShell wide>
      {/* Step progress */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={[
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                i < step  ? "bg-[var(--base-color-blue-800)]" :
                i === step ? "bg-[var(--base-color-blue-800)]" :
                              "bg-[var(--base-color-gray-200)]",
              ].join(" ")}>
                {i < step
                  ? <Check className="size-4 text-white" />
                  : <span className={`text-xs font-semibold ${i === step ? "text-white" : "text-muted-foreground"}`}>{i + 1}</span>
                }
              </div>
              <span className={`text-[10px] font-medium whitespace-nowrap ${i === step ? "text-[var(--base-color-blue-800)]" : "text-muted-foreground"}`}>
                {s.title}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px max-w-12 mb-4 transition-colors ${i < step ? "bg-[var(--base-color-blue-800)]" : "bg-[var(--base-color-gray-200)]"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[var(--base-color-blue-800)]">
              {STEPS[step].icon}
            </div>
            <div>
              <CardTitle>{STEPS[step].title}</CardTitle>
              <CardDescription>{STEPS[step].desc}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <Input label="Workspace name" placeholder="Acme Design System" helperText="Your team's display name." required />
              <Input label="Workspace URL"  placeholder="acme" helperText="thematic.design/acme — can't be changed later." required />
              <div className="rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] px-3 py-2.5">
                <p className="text-[11px] text-[var(--base-color-blue-800)] leading-relaxed">
                  💡 URL can only contain letters, numbers and hyphens.
                </p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-muted-foreground">Choose your workspace colour theme:</p>
              <div className="grid grid-cols-3 gap-3">
                {THEMES.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTheme(i)}
                    className={[
                      "rounded-xl border-2 p-3 flex flex-col items-center gap-2 transition-colors",
                      theme === i
                        ? "border-[var(--base-color-blue-800)] bg-[#EEF2FF]"
                        : "border-[var(--base-color-gray-200)] bg-white hover:border-[var(--base-color-gray-500)]",
                    ].join(" ")}
                  >
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: t.hex }} />
                    <span className="text-[11px] font-medium text-foreground">{t.name}</span>
                    {theme === i && <Badge variant="brand" size="sm">Selected</Badge>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <Input
                label="Invite by email"
                type="email"
                placeholder="teammate@company.com"
                prefixIcon={<Mail />}
                helperText="Separate multiple addresses with commas."
              />
              <div className="rounded-xl border border-[var(--base-color-gray-200)] overflow-hidden">
                {["priya@acme.io", "james@acme.io"].map((email, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2.5 border-b border-[var(--base-color-gray-200)] last:border-0 bg-white">
                    <span className="text-xs text-foreground">{email}</span>
                    <Badge variant="outline" size="sm">Member</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button onClick={next}>
            {step === STEPS.length - 1 ? "Go to dashboard" : "Continue"}
            <ArrowRight className="size-4" />
          </Button>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [tab, setTab] = useState<"signin" | "signup" | "onboarding">("signin")

  if (tab === "onboarding") return <OnboardingWizard />

  return (
    <AuthShell>
      <Tabs value={tab} onValueChange={v => setTab(v as typeof tab)}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="signin"  className="flex-1">Sign in</TabsTrigger>
          <TabsTrigger value="signup"  className="flex-1">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm onSwitch={() => setTab("signup")} />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm onSwitch={() => setTab("signin")} />
        </TabsContent>
      </Tabs>
    </AuthShell>
  )
}
