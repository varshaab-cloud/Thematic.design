import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

const PAGE: React.CSSProperties = { background: '#fff', padding: '48px 56px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" };
const BREADCRUMB: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: 8 };
const PAGE_TITLE: React.CSSProperties = { fontSize: 40, fontWeight: 700, color: '#0a0a0a', margin: '0 0 12px', lineHeight: 1.1 };
const PAGE_SUB: React.CSSProperties = { fontSize: 15, color: '#666', lineHeight: 1.6, maxWidth: 560, marginBottom: 48, marginTop: 0 };
const SECTION_TITLE: React.CSSProperties = { fontSize: 24, fontWeight: 700, color: '#111', margin: '0 0 4px' };
const SECTION_SUB: React.CSSProperties = { fontSize: 13, color: '#888', margin: '0 0 32px', lineHeight: 1.5 };
const DIVIDER: React.CSSProperties = { height: 1, background: '#f0f0f0', margin: '40px 0', border: 'none' };

// Token data from tokens.json
const BASE = {
  "--base-color-black": "#000000",
  "--base-color-white": "#ffffff",
  "--base-color-gray-75": "#f5f5f3",
  "--base-color-gray-100": "#eeeeec",
  "--base-color-gray-200": "#e3e3e0",
  "--base-color-gray-300": "#d5d5d5",
  "--base-color-gray-400": "#b1b1b1",
  "--base-color-gray-500": "#909090",
  "--base-color-gray-600": "#6d6d6d",
  "--base-color-gray-700": "#464646",
  "--base-color-gray-900": "#222222",
  "--base-color-blue-100": "#c4c5f4",
  "--base-color-blue-200": "#aaacf0",
  "--base-color-blue-300": "#9194eb",
  "--base-color-blue-400": "#6e71e6",
  "--base-color-blue-600": "#1c21dc",
  "--base-color-blue-700": "#171cbe",
  "--base-color-blue-800": "#1518a6",
  "--base-color-blue-900": "#111487",
  "--base-color-red-100": "#ffe2e2",
  "--base-color-red-200": "#ffb9bb",
  "--base-color-red-300": "#ff999c",
  "--base-color-red-400": "#f55658",
  "--base-color-red-600": "#d21a26",
  "--base-color-red-700": "#ab121b",
  "--base-color-red-800": "#81070d",
  "--base-color-red-900": "#640204",
  "--base-color-green-100": "#dcfce7",
  "--base-color-green-200": "#bbf7d0",
  "--base-color-green-300": "#86efac",
  "--base-color-green-400": "#4ade80",
  "--base-color-green-600": "#16a34a",
  "--base-color-green-700": "#15803d",
  "--base-color-green-800": "#166534",
  "--base-color-green-900": "#14532d",
  "--base-color-success-800": "#dcfce7",
  "--base-color-success-900": "#16a34a",
  "--base-color-info-600": "#e0f2fe",
  "--base-color-info-700": "#0369a1",
  "--base-color-error-200": "#ffe9e5",
  "--base-color-error-300": "#ff4e2a",
  "--base-color-warning-50": "#fffade",
  "--base-color-warning-100": "#f7d307",
} as Record<string, string>;

const ALIAS_COLOR = {
  "--alias-color-text-primary": "#000000",
  "--alias-color-text-secondary": "#222222",
  "--alias-color-text-tertiary": "#464646",
  "--alias-color-text-subtle": "var(--base-color-gray-600)",
  "--alias-color-text-disabled": "#909090",
  "--alias-color-text-inverse": "#ffffff",
  "--alias-color-text-brand": "#111487",
  "--alias-color-background-primary": "#ffffff",
  "--alias-color-background-secondary": "#f5f5f3",
  "--alias-color-background-tertiary": "#eeeeec",
  "--alias-color-background-brand": "#1518a6",
  "--alias-color-background-brand-dark": "#111487",
  "--alias-color-background-hover": "var(--base-color-blue-100)",
  "--alias-color-border-default": "#d5d5d5",
  "--alias-color-border-active": "#1c21dc",
  "--alias-color-border-disabled": "#b1b1b1",
  "--alias-color-border-brand": "var(--base-color-blue-800)",
  "--alias-color-border-success": "#16a34a",
  "--alias-color-border-info": "#0369a1",
  "--alias-color-border-error": "var(--base-color-error-300)",
  "--alias-color-border-warning": "#f7d307",
  "--alias-color-icon-primary": "#222222",
  "--alias-color-icon-secondary": "#464646",
  "--alias-color-icon-disabled": "#b1b1b1",
  "--alias-color-icon-brand": "#171cbe",
  "--alias-color-feedback-success-fg": "#166534",
  "--alias-color-feedback-success-bg": "#dcfce7",
  "--alias-color-feedback-info-fg": "#0369a1",
  "--alias-color-feedback-info-bg": "#e0f2fe",
  "--alias-color-feedback-error-fg": "var(--base-color-red-700)",
  "--alias-color-feedback-error-bg": "#ffe9e5",
  "--alias-color-feedback-warning-fg": "var(--base-color-gray-900)",
  "--alias-color-feedback-warning-bg": "#fffade",
} as Record<string, string>;

const COMPONENT_TOKENS = {
  Button: {
    primary: {
      "--component-button-primary-background": "#1518a6",
      "--component-button-primary-background-hover": "#171cbe",
      "--component-button-primary-background-active": "#111487",
      "--component-button-primary-background-disabled": "#e3e3e0",
      "--component-button-primary-text": "#ffffff",
      "--component-button-primary-text-disabled": "#909090",
      "--component-button-primary-border": "rgba(0, 0, 0, 0)",
      "--component-button-primary-border-radius": "var(--base-radius-md)",
      "--component-button-primary-padding-x": "1.5rem",
      "--component-button-primary-padding-y": "0.75rem",
      "--component-button-primary-font-size": "0.875rem",
      "--component-button-primary-font-weight": "500",
    },
    secondary: {
      "--component-button-secondary-background": "rgba(0, 0, 0, 0)",
      "--component-button-secondary-background-hover": "#c4c5f4",
      "--component-button-secondary-background-active": "#aaacf0",
      "--component-button-secondary-background-disabled": "rgba(0, 0, 0, 0)",
      "--component-button-secondary-text": "#111487",
      "--component-button-secondary-text-disabled": "#909090",
      "--component-button-secondary-border": "#1c21dc",
      "--component-button-secondary-border-radius": "var(--base-radius-md)",
      "--component-button-secondary-padding-x": "1.5rem",
      "--component-button-secondary-padding-y": "0.75rem",
      "--component-button-secondary-font-size": "0.875rem",
      "--component-button-secondary-font-weight": "500",
    },
    ghost: {
      "--component-button-ghost-background": "rgba(0, 0, 0, 0)",
      "--component-button-ghost-background-hover": "#eeeeec",
      "--component-button-ghost-text": "#111487",
      "--component-button-ghost-text-disabled": "#909090",
      "--component-button-ghost-border": "rgba(0, 0, 0, 0)",
      "--component-button-ghost-border-radius": "var(--base-radius-md)",
      "--component-button-ghost-padding-x": "1.5rem",
      "--component-button-ghost-padding-y": "0.75rem",
      "--component-button-ghost-font-size": "0.875rem",
      "--component-button-ghost-font-weight": "500",
    },
    destructive: {
      "--component-button-destructive-background": "#ff4e2a",
      "--component-button-destructive-background-hover": "#d21a26",
      "--component-button-destructive-text": "#ffffff",
      "--component-button-destructive-border": "rgba(0, 0, 0, 0)",
      "--component-button-destructive-border-radius": "var(--base-radius-md)",
      "--component-button-destructive-padding-x": "1.5rem",
      "--component-button-destructive-padding-y": "0.75rem",
      "--component-button-destructive-font-size": "0.875rem",
      "--component-button-destructive-font-weight": "500",
    },
  },
  Input: {
    default: {
      "--component-input-background": "#ffffff",
      "--component-input-background-disabled": "#eeeeec",
      "--component-input-border": "#d5d5d5",
      "--component-input-border-focus": "#1c21dc",
      "--component-input-border-error": "#ff4e2a",
      "--component-input-border-disabled": "#b1b1b1",
      "--component-input-text": "#000000",
      "--component-input-text-placeholder": "#909090",
      "--component-input-text-disabled": "#909090",
      "--component-input-border-radius": "var(--base-radius-md)",
      "--component-input-padding-x": "1rem",
      "--component-input-padding-y": "0.75rem",
      "--component-input-font-size": "0.875rem",
    },
  },
  Card: {
    default: {
      "--component-card-background": "#ffffff",
      "--component-card-border": "#d5d5d5",
      "--component-card-border-radius": "var(--base-radius-md)",
      "--component-card-shadow": "0px 1px 3px 0px rgba(0,0,0,0.06), 0px 4px 16px 0px rgba(0,0,0,0.05)",
      "--component-card-padding": "1.5rem",
      "--component-card-title-color": "#000000",
      "--component-card-body-color": "#222222",
    },
  },
  Badge: {
    variants: {
      "--component-badge-success-background": "#dcfce7",
      "--component-badge-success-text": "#16a34a",
      "--component-badge-success-border-radius": "var(--base-radius-xxl)",
      "--component-badge-info-background": "#e0f2fe",
      "--component-badge-info-text": "#0369a1",
      "--component-badge-info-border-radius": "var(--base-radius-xxl)",
      "--component-badge-error-background": "#ffe9e5",
      "--component-badge-error-text": "#ff4e2a",
      "--component-badge-error-border-radius": "var(--base-radius-xxl)",
      "--component-badge-warning-background": "#fffade",
      "--component-badge-warning-text": "#f7d307",
      "--component-badge-warning-border-radius": "var(--base-radius-xxl)",
    },
  },
} as Record<string, Record<string, Record<string, string>>>;

function resolveValue(val: string, base: Record<string, string>): string {
  if (val.startsWith('var(--')) {
    const inner = val.replace(/^var\(/, '').replace(/\)$/, '');
    return base[inner] || val;
  }
  return val;
}

function isColorValue(val: string): boolean {
  const resolved = resolveValue(val, BASE);
  return resolved.startsWith('#') || resolved.startsWith('rgb');
}

const PALETTE_GROUPS = [
  {
    name: 'Neutral', role: 'Pure black and white anchors',
    tokens: [
      { stop: 'black', hex: '#000000' },
      { stop: 'white', hex: '#ffffff' },
    ]
  },
  {
    name: 'Gray', role: 'Neutral surfaces, borders, disabled states',
    tokens: [
      { stop: '75', hex: '#f5f5f3' },
      { stop: '100', hex: '#eeeeec' },
      { stop: '200', hex: '#e3e3e0' },
      { stop: '300', hex: '#d5d5d5' },
      { stop: '400', hex: '#b1b1b1' },
      { stop: '500', hex: '#909090' },
      { stop: '600', hex: '#6d6d6d' },
      { stop: '700', hex: '#464646' },
      { stop: '900', hex: '#222222' },
    ]
  },
  {
    name: 'Blue', role: 'Brand primary — actions, links, active states',
    tokens: [
      { stop: '100', hex: '#c4c5f4' },
      { stop: '200', hex: '#aaacf0' },
      { stop: '300', hex: '#9194eb' },
      { stop: '400', hex: '#6e71e6' },
      { stop: '600', hex: '#1c21dc' },
      { stop: '700', hex: '#171cbe' },
      { stop: '800', hex: '#1518a6' },
      { stop: '900', hex: '#111487' },
    ]
  },
  {
    name: 'Red', role: 'Destructive actions, critical errors',
    tokens: [
      { stop: '100', hex: '#ffe2e2' },
      { stop: '200', hex: '#ffb9bb' },
      { stop: '300', hex: '#ff999c' },
      { stop: '400', hex: '#f55658' },
      { stop: '600', hex: '#d21a26' },
      { stop: '700', hex: '#ab121b' },
      { stop: '800', hex: '#81070d' },
      { stop: '900', hex: '#640204' },
    ]
  },
  {
    name: 'Green', role: 'Positive confirmations, success states',
    tokens: [
      { stop: '100', hex: '#dcfce7' },
      { stop: '200', hex: '#bbf7d0' },
      { stop: '300', hex: '#86efac' },
      { stop: '400', hex: '#4ade80' },
      { stop: '600', hex: '#16a34a' },
      { stop: '700', hex: '#15803d' },
      { stop: '800', hex: '#166534' },
      { stop: '900', hex: '#14532d' },
    ]
  },
  {
    name: 'Info', role: 'Informational signals, hints, help',
    tokens: [
      { stop: '600', hex: '#e0f2fe' },
      { stop: '700', hex: '#0369a1' },
    ]
  },
  {
    name: 'Warning', role: 'Attention-required, non-critical alerts',
    tokens: [
      { stop: '50', hex: '#fffade' },
      { stop: '100', hex: '#f7d307' },
    ]
  },
  {
    name: 'Error', role: 'System failures, validation errors',
    tokens: [
      { stop: '200', hex: '#ffe9e5' },
      { stop: '300', hex: '#ff4e2a' },
    ]
  },
  {
    name: 'Success', role: 'Completion feedback, positive outcomes',
    tokens: [
      { stop: '800', hex: '#dcfce7' },
      { stop: '900', hex: '#16a34a' },
    ]
  },
];

const ALIAS_GROUPS = [
  {
    name: 'Text',
    tokens: Object.entries(ALIAS_COLOR).filter(([k]) => k.includes('-text-')),
  },
  {
    name: 'Background',
    tokens: Object.entries(ALIAS_COLOR).filter(([k]) => k.includes('-background-')),
  },
  {
    name: 'Border',
    tokens: Object.entries(ALIAS_COLOR).filter(([k]) => k.includes('-border-')),
  },
  {
    name: 'Icon',
    tokens: Object.entries(ALIAS_COLOR).filter(([k]) => k.includes('-icon-')),
  },
  {
    name: 'Feedback',
    tokens: Object.entries(ALIAS_COLOR).filter(([k]) => k.includes('-feedback-')),
  },
];

function TokenRow({ name, value, index }: { name: string; value: string; index: number }) {
  const resolved = resolveValue(value, BASE);
  const isVar = value.startsWith('var(--');
  const sourceBase = isVar ? value.replace(/^var\(--/, '').replace(/\)$/, '') : null;
  const isColor = isColorValue(value);

  return (
    <div style={{
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      borderBottom: '1px solid #f7f7f7',
      background: index % 2 === 0 ? '#fafafa' : '#fff',
    }}>
      {isColor ? (
        <div style={{ width: 26, height: 26, borderRadius: 4, background: resolved, border: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }} />
      ) : (
        <div style={{ width: 26, height: 26, borderRadius: 4, background: '#f5f5f5', border: '1px solid #eee', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 9, color: '#aaa' }}>—</span>
        </div>
      )}
      <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#1a1a1a', fontWeight: 500, flex: '1 1 auto' }}>{name}</span>
      {sourceBase && (
        <span style={{ fontSize: 11, color: '#aaa', flex: '0 0 auto' }}>→ {sourceBase}</span>
      )}
      <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#666', textAlign: 'right', flex: '0 0 auto' }}>{resolved}</span>
    </div>
  );
}

function ComponentAccordion({ groupName, subGroups }: { groupName: string; subGroups: Record<string, Record<string, string>> }) {
  const [open, setOpen] = useState(false);
  const allTokens = Object.entries(subGroups).flatMap(([, tokens]) => Object.entries(tokens));

  return (
    <div style={{ marginBottom: 8 }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: '#fafafa',
          border: '1px solid #eee',
          borderRadius: open ? '8px 8px 0 0' : 8,
          padding: '14px 20px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{groupName}</span>
          <span style={{ fontSize: 11, color: '#888', background: '#eee', padding: '2px 8px', borderRadius: 20 }}>
            {allTokens.length} tokens
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#aaa' }}>{open ? '▾' : '▸'}</span>
      </div>
      {open && (
        <div style={{ border: '1px solid #eee', borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
          {Object.entries(subGroups).map(([subName, tokens]) => (
            <div key={subName}>
              <div style={{ padding: '8px 20px', background: '#f7f7f7', fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {subName}
              </div>
              {Object.entries(tokens).map(([name, value], i) => {
                const resolved = resolveValue(value, BASE);
                const isVar = value.startsWith('var(--');
                const sourceBase = isVar ? value.replace(/^var\(--/, '').replace(/\)$/, '') : null;
                const isColor = isColorValue(value);
                return (
                  <div key={name} style={{
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    borderBottom: '1px solid #f7f7f7',
                    background: i % 2 === 0 ? '#fafafa' : '#fff',
                  }}>
                    {isColor ? (
                      <div style={{ width: 26, height: 26, borderRadius: 4, background: resolved, border: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: 26, height: 26, borderRadius: 4, background: '#f5f5f5', border: '1px solid #eee', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 9, color: '#aaa' }}>—</span>
                      </div>
                    )}
                    <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#1a1a1a', fontWeight: 500, flex: '1 1 auto' }}>{name}</span>
                    {sourceBase && (
                      <span style={{ fontSize: 11, color: '#aaa', flex: '0 0 auto' }}>→ {sourceBase}</span>
                    )}
                    <span style={{ fontSize: isColor ? 11 : 12, fontFamily: 'monospace', color: isColor ? '#666' : '#555', textAlign: 'right', flex: '0 0 auto' }}>{resolved}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FoundationColourPage() {
  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Colour</h1>
      <p style={PAGE_SUB}>
        A three-tier system. The raw palette provides the primitives. Semantic tokens assign those colours to roles. Component tokens lock in slot-level overrides.
      </p>

      {/* Section 1 */}
      <h2 style={SECTION_TITLE}>The raw palette</h2>
      <p style={SECTION_SUB}>Nine scales, each with stops from lightest to darkest.</p>

      {PALETTE_GROUPS.map((group) => (
        <div key={group.name} style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#111' }}>{group.name}</span>
            <span style={{ fontSize: 12, color: '#888' }}>{group.role}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {group.tokens.map((t) => (
              <div key={t.stop} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 72, height: 64, borderRadius: 6, background: t.hex, border: '1px solid rgba(0,0,0,0.07)' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#555', marginTop: 6 }}>{t.stop}</span>
                <span style={{ fontSize: 10, color: '#999', fontFamily: 'monospace' }}>{t.hex}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <hr style={DIVIDER} />

      {/* Section 2 */}
      <h2 style={SECTION_TITLE}>Semantic roles</h2>
      <p style={SECTION_SUB}>
        Alias tokens bind palette stops to UI roles. Component code always references a semantic token — never a base colour directly.
      </p>

      {ALIAS_GROUPS.map((group) => (
        <div key={group.name} style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ background: '#fafafa', padding: '12px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{group.name}</span>
            <span style={{ fontSize: 11, color: '#888', background: '#eee', padding: '2px 8px', borderRadius: 20 }}>
              {group.tokens.length}
            </span>
          </div>
          {group.tokens.map(([name, value], i) => (
            <TokenRow key={name} name={name} value={value} index={i} />
          ))}
        </div>
      ))}

      <hr style={DIVIDER} />

      {/* Section 3 */}
      <h2 style={SECTION_TITLE}>Component slots</h2>
      <p style={SECTION_SUB}>
        Component tokens narrow semantic colours to specific slots. They give every component a stable contract even as the underlying palette evolves.
      </p>

      {Object.entries(COMPONENT_TOKENS).map(([groupName, subGroups]) => (
        <ComponentAccordion key={groupName} groupName={groupName} subGroups={subGroups} />
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Thematic design system/Foundation/Colour',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { page: null } },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Colour',
  render: () => <FoundationColourPage />,
};
