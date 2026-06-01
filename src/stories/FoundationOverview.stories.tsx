import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const PAGE: React.CSSProperties = { background: '#fff', padding: '48px 56px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" };
const BREADCRUMB: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: 8 };
const PAGE_TITLE: React.CSSProperties = { fontSize: 40, fontWeight: 700, color: '#0a0a0a', margin: '0 0 12px', lineHeight: 1.1 };
const PAGE_SUB: React.CSSProperties = { fontSize: 15, color: '#666', lineHeight: 1.6, maxWidth: 560, marginBottom: 48, marginTop: 0 };
const DIVIDER: React.CSSProperties = { height: 1, background: '#f0f0f0', margin: '32px 0', border: 'none' };

// Navigate to another story from within the preview iframe.
// Directly manipulates the parent window URL — reliable across all Storybook versions.
function navigateTo(storyId: string) {
  const url = `/?path=/story/${storyId}`;
  if (window.parent !== window) {
    window.parent.location.href = url;
  }
}

function FoundationOverviewPage() {
  const cards = [
    {
      title: 'Colour',
      storyId: 'thematic-design-system-foundation-colour--default',
      description: 'Nine palette scales covering brand, feedback, and neutral. Base swatches → semantic roles → component slots.',
      stats: '92 base · 42 alias · 28 component',
      preview: (
        <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
          {['#c4c5f4','#9194eb','#6e71e6','#1c21dc','#1518a6','#dcfce7','#ffe9e5','#fffade'].map((color, i) => (
            <div key={i} style={{ flex: '1 1 11%', height: '100%', background: color }} />
          ))}
        </div>
      ),
    },
    {
      title: 'Typography',
      storyId: 'thematic-design-system-foundation-typography--default',
      description: 'Open Sans across 14 styles — from 48px display headings to 10px captions, each with paired weight and line-height.',
      stats: '1 font family · 14 styles',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, height: '100%' }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#111', lineHeight: 1.1 }}>Heading</span>
          <span style={{ fontSize: 13, fontWeight: 400, color: '#555', lineHeight: 1.4 }}>Body text</span>
          <span style={{ fontSize: 10, fontWeight: 400, color: '#888', lineHeight: 1.4 }}>Caption label</span>
        </div>
      ),
    },
    {
      title: 'Spacing',
      storyId: 'thematic-design-system-foundation-spacing--default',
      description: '10-step base scale (4px–80px) plus 15 alias tokens naming roles: inline, stack, padding, section, page.',
      stats: '10 base · 15 alias',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, height: '100%' }}>
          {[
            { width: 16, opacity: 0.20 },
            { width: 32, opacity: 0.35 },
            { width: 56, opacity: 0.55 },
            { width: 88, opacity: 0.80 },
          ].map((bar, i) => (
            <div key={i} style={{ width: bar.width, height: 8, borderRadius: 2, background: `rgba(28,33,220,${bar.opacity})` }} />
          ))}
        </div>
      ),
    },
    {
      title: 'Shape',
      storyId: 'thematic-design-system-foundation-shape--default',
      description: 'Six border-radius steps from 2px sharp to 14px soft, plus full-round pill. All components reference these tokens.',
      stats: '6 steps · xs → xxl + pill',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: '100%' }}>
          {[1, 4, 6, 10].map((r, i) => (
            <div key={i} style={{ width: 36, height: 36, border: '2px solid #1c21dc', borderRadius: r, background: 'transparent', flexShrink: 0 }} />
          ))}
        </div>
      ),
    },
    {
      title: 'Elevation',
      storyId: 'thematic-design-system-foundation-elevation--default',
      description: 'Five shadow levels from shadow-01 (barely-there lift) to shadow-05 (full modal overlay depth).',
      stats: '5 levels · shadow-01 → shadow-05',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ width: 80, height: 40, background: '#fff', borderRadius: 4, boxShadow: '0px 4px 6px rgba(0,0,0,0.07), 0px 10px 30px rgba(0,0,0,0.08)' }} />
        </div>
      ),
    },
    {
      title: 'Motion',
      storyId: 'thematic-design-system-foundation-motion-focus--default',
      description: 'Five durations (0ms–500ms) and four easing curves. Alias tokens cover fast/normal/slow/spring transitions.',
      stats: '5 durations · 4 easings',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <line x1="0" y1="20" x2="80" y2="20" stroke="#e5e5e5" strokeDasharray="3 2" />
            <path d="M0,40 C30,40 50,0 80,0" stroke="#1c21dc" strokeWidth="2" fill="none" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>The building blocks</h1>
      <p style={PAGE_SUB}>
        1,351 tokens across three tiers — 140 base, 172 alias, 1,039 component. Each foundation has a dedicated page covering available values, token names, and usage guidance.
      </p>

      <hr style={DIVIDER} />

      <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', marginBottom: 20 }}>
        What's inside
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {cards.map((card) => (
          <button
            key={card.title}
            onClick={() => navigateTo(card.storyId)}
            style={{
              border: '1px solid #eee', borderRadius: 8, padding: 20, background: '#fff',
              textAlign: 'left', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#1c21dc';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(28,33,220,0.08)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#eee';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ height: 60, background: '#f7f7f7', borderRadius: 6, overflow: 'hidden', padding: '12px 16px', marginBottom: 16 }}>
              {card.preview}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{card.title}</div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: '#bbb' }}>
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6, marginBottom: 12 }}>{card.description}</div>
            <div style={{ fontSize: 11, color: '#aaa', fontFamily: 'monospace' }}>{card.stats}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Thematic design system/Foundation/Overview',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { page: null } },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Overview',
  render: () => <FoundationOverviewPage />,
};
