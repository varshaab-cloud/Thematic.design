import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const PAGE: React.CSSProperties = { background: '#fff', padding: '48px 56px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" };
const BREADCRUMB: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: 8 };
const PAGE_TITLE: React.CSSProperties = { fontSize: 40, fontWeight: 700, color: '#0a0a0a', margin: '0 0 12px', lineHeight: 1.1 };
const PAGE_SUB: React.CSSProperties = { fontSize: 15, color: '#666', lineHeight: 1.6, maxWidth: 540, marginBottom: 48, marginTop: 0 };

// From tokens.json base
const SHADOWS = [
  {
    token: '--base-shadow-01',
    value: '0px 1px 2px 0px rgba(0,0,0,0.05)',
    usage: 'Cards at rest',
    layer: 'Surface',
    levelColor: '#888',
    level: 1,
  },
  {
    token: '--base-shadow-02',
    value: '0px 1px 3px 0px rgba(0,0,0,0.06), 0px 4px 16px 0px rgba(0,0,0,0.05)',
    usage: 'Dropdowns, select menus',
    layer: 'Dropdown',
    levelColor: '#6e71e6',
    level: 2,
  },
  {
    token: '--base-shadow-03',
    value: '0px 2px 4px 0px rgba(0,0,0,0.07), 0px 6px 20px 0px rgba(0,0,0,0.06)',
    usage: 'Popovers, tooltips',
    layer: 'Popover',
    levelColor: '#1c21dc',
    level: 3,
  },
  {
    token: '--base-shadow-04',
    value: '0px 4px 6px 0px rgba(0,0,0,0.07), 0px 10px 30px 0px rgba(0,0,0,0.08)',
    usage: 'Drawers, side panels',
    layer: 'Panel',
    levelColor: '#1518a6',
    level: 4,
  },
  {
    token: '--base-shadow-05',
    value: '0px 8px 16px 0px rgba(0,0,0,0.10), 0px 20px 48px 0px rgba(0,0,0,0.10)',
    usage: 'Modals, dialogs',
    layer: 'Modal',
    levelColor: '#111487',
    level: 5,
  },
];

function LevelDots({ level }: { level: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', justifyContent: 'center' }}>
      {[5, 4, 3, 2, 1].map((dot) => (
        <div
          key={dot}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: dot <= level ? '#1c21dc' : '#e5e5e5',
          }}
        />
      ))}
    </div>
  );
}

function FoundationElevationPage() {
  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Elevation</h1>
      <p style={PAGE_SUB}>
        Five shadow levels, each calibrated for a specific layer in the UI stack. Use higher shadows for content that floats above more layers.
      </p>

      {SHADOWS.map((shadow) => (
        <div key={shadow.token} style={{
          padding: '28px 0',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          gap: 32,
          alignItems: 'center',
        }}>
          {/* Left: preview */}
          <div style={{
            width: 180,
            height: 120,
            borderRadius: 8,
            background: '#f7f7f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              width: 140,
              height: 80,
              background: '#fff',
              borderRadius: 8,
              boxShadow: shadow.value,
            }} />
          </div>

          {/* Middle: info */}
          <div style={{ flex: '1 1 auto' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 4 }}>
              {shadow.token}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: shadow.levelColor, marginBottom: 4 }}>
              {shadow.layer}
            </div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{shadow.usage}</div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#aaa', wordBreak: 'break-all', maxWidth: 400 }}>
              {shadow.value}
            </div>
          </div>

          {/* Right: level dots */}
          <div style={{ flexShrink: 0 }}>
            <LevelDots level={shadow.level} />
          </div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Thematic design system/Foundation/Elevation',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { page: null } },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Elevation',
  render: () => <FoundationElevationPage />,
};
