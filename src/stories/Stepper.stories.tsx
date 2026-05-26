import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Stepper, StepperContent, StepperActions } from "@/components/ui/stepper"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const meta: Meta = {
  title: "Navigation/Stepper",
  parameters: { layout: "centered" },
}
export default meta
type Story = StoryObj

// ─── Shared step sets ─────────────────────────────────────────────────────────

const THREE_STEPS = [
  { id: "account", label: "Account details" },
  { id: "team", label: "Team setup" },
  { id: "review", label: "Review" },
]

const THREE_STEPS_WITH_DESC = [
  { id: "account", label: "Account details", description: "Your name and email address" },
  { id: "team", label: "Team setup", description: "Invite colleagues and assign roles" },
  { id: "review", label: "Review", description: "Confirm everything looks right" },
]

const FOUR_STEPS = [
  { id: "personal", label: "Personal info" },
  { id: "billing", label: "Billing" },
  { id: "preferences", label: "Preferences" },
  { id: "confirm", label: "Confirm" },
]

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-10" style={{ width: 480 }}>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--alias-color-text-disabled)]">
          Step 1 — no steps completed
        </span>
        <Stepper steps={THREE_STEPS} currentStep={0} completedSteps={[]} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--alias-color-text-disabled)]">
          Step 2 — step 1 completed
        </span>
        <Stepper steps={THREE_STEPS} currentStep={1} completedSteps={[0]} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--alias-color-text-disabled)]">
          Step 3 — steps 1 and 2 completed
        </span>
        <Stepper steps={THREE_STEPS} currentStep={2} completedSteps={[0, 1]} />
      </div>
    </div>
  ),
}

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [completed, setCompleted] = useState<number[]>([])

    function handleNext() {
      setCompleted((prev) => [...prev, currentStep])
      setCurrentStep((s) => s + 1)
    }

    function handleBack() {
      setCurrentStep((s) => Math.max(0, s - 1))
    }

    function handleSubmit() {
      setCompleted((prev) => [...prev, currentStep])
      alert("Form submitted!")
      setCurrentStep(0)
      setCompleted([])
    }

    return (
      <div className="flex flex-col gap-6" style={{ width: 480 }}>
        <Stepper
          steps={THREE_STEPS}
          currentStep={currentStep}
          completedSteps={completed}
        />

        <div className="rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-primary)] p-5">
          <StepperContent step={0} currentStep={currentStep}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
                Account details
              </h3>
              <Input label="Full name" placeholder="Priya Sharma" required />
              <Input label="Email address" type="email" placeholder="priya@acme.io" required />
            </div>
          </StepperContent>

          <StepperContent step={1} currentStep={currentStep}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
                Team setup
              </h3>
              <Input label="Team name" placeholder="Acme Engineering" required />
              <Input label="Invite a colleague" type="email" placeholder="colleague@acme.io" />
            </div>
          </StepperContent>

          <StepperContent step={2} currentStep={currentStep}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
                Review
              </h3>
              <p className="text-sm text-[var(--alias-color-text-secondary)]">
                Review your details before submitting. Use the Back button to make changes.
              </p>
            </div>
          </StepperContent>

          <StepperActions
            currentStep={currentStep}
            totalSteps={THREE_STEPS.length}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    )
  },
}

// ─── Vertical ─────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [completed, setCompleted] = useState<number[]>([])

    function handleNext() {
      setCompleted((prev) => [...prev, currentStep])
      setCurrentStep((s) => s + 1)
    }

    function handleBack() {
      setCurrentStep((s) => Math.max(0, s - 1))
    }

    function handleSubmit() {
      setCompleted((prev) => [...prev, currentStep])
      alert("Form submitted!")
      setCurrentStep(0)
      setCompleted([])
    }

    return (
      <div className="flex gap-8" style={{ width: 560 }}>
        <Stepper
          steps={THREE_STEPS_WITH_DESC}
          currentStep={currentStep}
          completedSteps={completed}
          orientation="vertical"
          className="w-48 shrink-0"
        />

        <div className="flex flex-1 flex-col gap-4 rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-primary)] p-5">
          <StepperContent step={0} currentStep={currentStep}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
                Account details
              </h3>
              <Input label="Full name" placeholder="Priya Sharma" required />
              <Input label="Email address" type="email" placeholder="priya@acme.io" required />
            </div>
          </StepperContent>

          <StepperContent step={1} currentStep={currentStep}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
                Team setup
              </h3>
              <Input label="Team name" placeholder="Acme Engineering" required />
              <Input label="Invite a colleague" type="email" placeholder="colleague@acme.io" />
            </div>
          </StepperContent>

          <StepperContent step={2} currentStep={currentStep}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
                Review
              </h3>
              <p className="text-sm text-[var(--alias-color-text-secondary)]">
                Review your details before submitting.
              </p>
            </div>
          </StepperContent>

          <StepperActions
            currentStep={currentStep}
            totalSteps={THREE_STEPS_WITH_DESC.length}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    )
  },
}

// ─── FourSteps ────────────────────────────────────────────────────────────────

export const FourSteps: Story = {
  name: "Four steps",
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [completed, setCompleted] = useState<number[]>([])

    function handleNext() {
      setCompleted((prev) => [...prev, currentStep])
      setCurrentStep((s) => s + 1)
    }

    function handleBack() {
      setCurrentStep((s) => Math.max(0, s - 1))
    }

    function handleSubmit() {
      setCompleted((prev) => [...prev, currentStep])
      alert("Setup complete!")
      setCurrentStep(0)
      setCompleted([])
    }

    const stepContent: Record<number, React.ReactNode> = {
      0: (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">Personal info</h3>
          <Input label="First name" placeholder="Priya" required />
          <Input label="Last name" placeholder="Sharma" required />
        </div>
      ),
      1: (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">Billing</h3>
          <Input label="Card number" placeholder="4242 4242 4242 4242" required />
          <Input label="Expiry" placeholder="MM / YY" required />
        </div>
      ),
      2: (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">Preferences</h3>
          <Input label="Notification email" type="email" placeholder="priya@acme.io" />
          <Input label="Timezone" placeholder="Europe/London" />
        </div>
      ),
      3: (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">Confirm</h3>
          <p className="text-sm text-[var(--alias-color-text-secondary)]">
            Everything looks good. Submit to complete your setup.
          </p>
        </div>
      ),
    }

    return (
      <div className="flex flex-col gap-6" style={{ width: 560 }}>
        <Stepper
          steps={FOUR_STEPS}
          currentStep={currentStep}
          completedSteps={completed}
        />

        <div className="rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-primary)] p-5">
          {stepContent[currentStep]}

          <StepperActions
            currentStep={currentStep}
            totalSteps={FOUR_STEPS.length}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    )
  },
}

// ─── WithValidation ───────────────────────────────────────────────────────────

export const WithValidation: Story = {
  name: "With validation",
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [completed, setCompleted] = useState<number[]>([])
    const [agreed, setAgreed] = useState(false)
    const [teamName, setTeamName] = useState("")

    const canProceed = currentStep === 0
      ? agreed
      : currentStep === 1
      ? teamName.trim().length > 0
      : true

    function handleNext() {
      if (!canProceed) return
      setCompleted((prev) => [...prev, currentStep])
      setCurrentStep((s) => s + 1)
    }

    function handleBack() {
      setCurrentStep((s) => Math.max(0, s - 1))
    }

    function handleSubmit() {
      setCompleted((prev) => [...prev, currentStep])
      alert("Submitted!")
      setCurrentStep(0)
      setCompleted([])
      setAgreed(false)
      setTeamName("")
    }

    return (
      <div className="flex flex-col gap-6" style={{ width: 480 }}>
        <Stepper
          steps={THREE_STEPS}
          currentStep={currentStep}
          completedSteps={completed}
        />

        <div className="rounded-[var(--base-radius-md)] border border-[var(--base-color-gray-200)] bg-[var(--alias-color-background-primary)] p-5">
          <StepperContent step={0} currentStep={currentStep}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
                Account details
              </h3>
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--alias-color-background-brand)]"
                />
                <span className="text-sm text-[var(--alias-color-text-secondary)]">
                  I agree to the terms of service and privacy policy
                </span>
              </label>
              {!agreed && (
                <p className="text-xs text-[var(--alias-color-feedback-error-fg)]">
                  You must agree to the terms before continuing.
                </p>
              )}
            </div>
          </StepperContent>

          <StepperContent step={1} currentStep={currentStep}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
                Team setup
              </h3>
              <Input
                label="Team name"
                placeholder="Acme Engineering"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                errorMessage={
                  teamName.trim().length === 0
                    ? "Team name is required to continue."
                    : undefined
                }
              />
            </div>
          </StepperContent>

          <StepperContent step={2} currentStep={currentStep}>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[var(--alias-color-text-primary)]">
                Review
              </h3>
              <p className="text-sm text-[var(--alias-color-text-secondary)]">
                Your setup is complete. Submit to finish.
              </p>
            </div>
          </StepperContent>

          <nav
            aria-label="Step navigation"
            className="flex items-center justify-between gap-3 pt-4"
          >
            <button
              type="button"
              aria-label="Go to previous step"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={cn(
                "text-sm font-medium text-[var(--alias-color-text-secondary)] transition-colors",
                "hover:text-[var(--alias-color-text-primary)] disabled:pointer-events-none disabled:opacity-50",
                currentStep === 0 && "invisible"
              )}
            >
              Back
            </button>

            {currentStep < THREE_STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                className={cn(
                  "inline-flex h-8 items-center justify-center rounded-[var(--base-radius-md)] px-4 text-sm font-medium transition-all",
                  "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)]",
                  "hover:bg-[var(--base-color-blue-700)] disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className={cn(
                  "inline-flex h-8 items-center justify-center rounded-[var(--base-radius-md)] px-4 text-sm font-medium transition-all",
                  "bg-[var(--alias-color-background-brand)] text-[var(--alias-color-text-inverse)]",
                  "hover:bg-[var(--base-color-blue-700)]"
                )}
              >
                Submit
              </button>
            )}
          </nav>
        </div>
      </div>
    )
  },
}

