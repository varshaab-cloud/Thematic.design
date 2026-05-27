import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const PAGE: React.CSSProperties = { background: '#fff', padding: '48px 56px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" };
const BREADCRUMB: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: 8 };
const PAGE_TITLE: React.CSSProperties = { fontSize: 40, fontWeight: 700, color: '#0a0a0a', margin: '0 0 12px', lineHeight: 1.1 };
const PAGE_SUB: React.CSSProperties = { fontSize: 15, color: '#666', lineHeight: 1.6, maxWidth: 560, marginBottom: 48, marginTop: 0 };
const SECTION_TITLE: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 32px' };
const DIVIDER: React.CSSProperties = { height: 1, background: '#f0f0f0', margin: '40px 0', border: 'none' };

// From tokens.json base
const RADIUS_STEPS = [
  { token: 'radius-xs', cssToken: '--base-radius-xs', px: '2px', usage: 'Inner elements' },
  { token: 'radius-sm', cssToken: '--base-radius-sm', px: '4px', usage: 'Buttons, inputs' },
  { token: 'radius-md', cssToken: '--base-radius-md', px: '6px', usage: 'Cards, panels' },
  { token: 'radius-lg', cssToken: '--base-radius-lg', px: '8px', usage: 'Modals' },
  { token: 'radius-xl', cssToken: '--base-radius-xl', px: '10px', usage: 'Large panels' },
  { token: 'radius-xxl', cssToken: '--base-radius-xxl', px: '14px', usage: 'Tooltips, badges' },
];

function FoundationShapePage() {
  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Shape</h1>
      <p style={PAGE_SUB}>
        Six border-radius steps from sharp 2px corners to soft 14px rounding, plus a full-round pill. Every component references one of these tokens — never a hardcoded value.
      </p>

      {/* The scale */}
      <h2 style={SECTION_TITLE}>The scale</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
        {RADIUS_STEPS.map((step) => (
          <div key={step.token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 96,
              height: 96,
              background: 'transparent',
              border: '2px solid #1c21dc',
              borderRadius: step.px,
            }} />
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#555' }}>{step.token}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{step.px}</span>
            <span style={{ fontSize: 10, color: '#aaa' }}>{step.usage}</span>
          </div>
        ))}

        {/* Full pill */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 96,
            height: 40,
            background: 'transparent',
            border: '2px solid #1c21dc',
            borderRadius: 9999,
            marginTop: 28,
          }} />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#555' }}>radius-full</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>9999px (pill)</span>
          <span style={{ fontSize: 10, color: '#aaa' }}>Badges, tags</span>
        </div>
      </div>

      <hr style={DIVIDER} />

      {/* Token reference table */}
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 24px' }}>Token reference</h2>

      <div style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ background: '#fafafa', padding: '10px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 16 }}>
          {['Token', 'Value', 'Usage'].map((h) => (
            <span key={h} style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888', fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {[...RADIUS_STEPS, { token: 'radius-full', cssToken: '--base-radius-full', px: '9999px', usage: 'Pills, avatars, badge chips' }].map((step, i) => (
          <div key={step.token} style={{
            padding: '10px 20px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 2fr',
            gap: 16,
            background: i % 2 === 0 ? '#fff' : '#fafafa',
            borderTop: '1px solid #f0f0f0',
          }}>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#1a1a1a' }}>{step.cssToken}</span>
            <span style={{ fontSize: 12, color: '#555' }}>{step.px}</span>
            <span style={{ fontSize: 12, color: '#666' }}>{step.usage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundation/Shape',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { page: null } },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Shape',
  render: () => <FoundationShapePage />,
};
