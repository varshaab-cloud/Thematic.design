import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const PAGE: React.CSSProperties = { background: '#fff', padding: '48px 56px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" };
const BREADCRUMB: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: 8 };
const PAGE_TITLE: React.CSSProperties = { fontSize: 40, fontWeight: 700, color: '#0a0a0a', margin: '0 0 12px', lineHeight: 1.1 };
const PAGE_SUB: React.CSSProperties = { fontSize: 15, color: '#666', lineHeight: 1.6, maxWidth: 560, marginBottom: 48, marginTop: 0 };
const SECTION_TITLE: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 24px' };
const DIVIDER: React.CSSProperties = { height: 1, background: '#f0f0f0', margin: '40px 0', border: 'none' };

// Base spacing tokens from tokens.json
const BASE_SPACING = [
  { token: '--base-spacing-1', value: '0.25rem', px: 4 },
  { token: '--base-spacing-2', value: '0.5rem', px: 8 },
  { token: '--base-spacing-3', value: '0.75rem', px: 12 },
  { token: '--base-spacing-4', value: '1rem', px: 16 },
  { token: '--base-spacing-5', value: '1.5rem', px: 24 },
  { token: '--base-spacing-6', value: '2rem', px: 32 },
  { token: '--base-spacing-7', value: '2.5rem', px: 40 },
  { token: '--base-spacing-8', value: '3rem', px: 48 },
  { token: '--base-spacing-9', value: '4rem', px: 64 },
  { token: '--base-spacing-10', value: '5rem', px: 80 },
];

// Alias spacing tokens from tokens.json
const ALIAS_SPACING_GROUPS = [
  {
    name: 'Inline spacing',
    tokens: [
      { token: '--alias-spacing-inline-xs', value: '0.25rem', desc: 'Tight inline gaps, icon-to-label' },
      { token: '--alias-spacing-inline-sm', value: '0.5rem', desc: 'Standard inline gaps' },
      { token: '--alias-spacing-inline-md', value: '0.75rem', desc: 'Comfortable inline gaps' },
    ],
  },
  {
    name: 'Stack spacing',
    tokens: [
      { token: '--alias-spacing-stack-xs', value: '0.5rem', desc: 'Tight vertical rhythm' },
      { token: '--alias-spacing-stack-sm', value: '0.75rem', desc: 'Compact list items' },
      { token: '--alias-spacing-stack-md', value: '1rem', desc: 'Standard paragraph spacing' },
      { token: '--alias-spacing-stack-lg', value: '1.5rem', desc: 'Generous vertical gap' },
    ],
  },
  {
    name: 'Padding',
    tokens: [
      { token: '--alias-spacing-padding-xs', value: '0.5rem', desc: 'Dense component padding' },
      { token: '--alias-spacing-padding-sm', value: '0.75rem', desc: 'Compact component padding' },
      { token: '--alias-spacing-padding-md', value: '1rem', desc: 'Standard component padding' },
      { token: '--alias-spacing-padding-lg', value: '1.5rem', desc: 'Roomy component padding' },
    ],
  },
  {
    name: 'Section & page',
    tokens: [
      { token: '--alias-spacing-section-md', value: '2rem', desc: 'Section separation' },
      { token: '--alias-spacing-section-lg', value: '3rem', desc: 'Major section separation' },
      { token: '--alias-spacing-page-md', value: '4rem', desc: 'Page-level padding medium' },
      { token: '--alias-spacing-page-lg', value: '5rem', desc: 'Page-level padding large' },
    ],
  },
];

function FoundationSpacingPage() {
  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Spacing</h1>
      <p style={PAGE_SUB}>
        A 4px-base scale with 10 steps. Alias tokens name each step's role — keeping component padding consistent and layouts scannable.
      </p>

      {/* The scale */}
      <h2 style={SECTION_TITLE}>The scale</h2>

      <div>
        {BASE_SPACING.map((item) => (
          <div key={item.token} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #f7f7f7',
            gap: 20,
          }}>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#555', width: 180, flexShrink: 0 }}>{item.token}</span>
            <span style={{ fontSize: 11, color: '#888', width: 80, flexShrink: 0 }}>{item.value} / {item.px}px</span>
            <div style={{
              height: 10,
              borderRadius: 3,
              background: 'linear-gradient(90deg, #1c21dc, #6e71e6)',
              width: Math.min(item.px * 4, 400),
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 11, color: '#aaa', marginLeft: 8 }}>{item.px}px</span>
          </div>
        ))}
      </div>

      <hr style={DIVIDER} />

      {/* Alias roles */}
      <h2 style={{ ...SECTION_TITLE, marginTop: 0 }}>Alias roles</h2>
      <p style={{ fontSize: 13, color: '#888', marginTop: 0, marginBottom: 24, lineHeight: 1.5 }}>
        Semantic names for common spacing use cases.
      </p>

      {ALIAS_SPACING_GROUPS.map((group) => (
        <div key={group.name} style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ background: '#fafafa', padding: '12px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{group.name}</span>
            <span style={{ fontSize: 11, color: '#888', background: '#eee', padding: '2px 8px', borderRadius: 20 }}>
              {group.tokens.length}
            </span>
          </div>
          {group.tokens.map((row, i) => (
            <div key={row.token} style={{
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderBottom: '1px solid #f7f7f7',
              background: i % 2 === 0 ? '#fafafa' : '#fff',
            }}>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#1a1a1a', fontWeight: 500, flex: '1 1 auto' }}>{row.token}</span>
              <span style={{ fontSize: 12, color: '#555', flex: '0 0 auto', width: 80 }}>{row.value}</span>
              <span style={{ fontSize: 12, color: '#888', flex: '1 1 auto', textAlign: 'right' }}>{row.desc}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Foundation/Spacing',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { page: null } },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Spacing',
  render: () => <FoundationSpacingPage />,
};
