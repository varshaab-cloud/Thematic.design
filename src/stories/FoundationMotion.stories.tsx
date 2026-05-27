import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const PAGE: React.CSSProperties = { background: '#fff', padding: '48px 56px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" };
const BREADCRUMB: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: 8 };
const PAGE_TITLE: React.CSSProperties = { fontSize: 40, fontWeight: 700, color: '#0a0a0a', margin: '0 0 12px', lineHeight: 1.1 };
const PAGE_SUB: React.CSSProperties = { fontSize: 15, color: '#666', lineHeight: 1.6, maxWidth: 480, marginBottom: 48, marginTop: 0 };
const SECTION_TITLE: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: '#111', margin: '0 0 24px' };
const DIVIDER: React.CSSProperties = { height: 1, background: '#f0f0f0', margin: '40px 0', border: 'none' };

// Duration tokens from tokens.json
const DURATIONS = [
  { token: '--base-duration-instant', name: 'instant', value: '0ms', ms: 0 },
  { token: '--base-duration-fast', name: 'fast', value: '100ms', ms: 100 },
  { token: '--base-duration-normal', name: 'normal', value: '200ms', ms: 200 },
  { token: '--base-duration-slow', name: 'slow', value: '300ms', ms: 300 },
  { token: '--base-duration-slower', name: 'slower', value: '500ms', ms: 500 },
];

// Easing tokens from tokens.json
const EASINGS = [
  { token: '--base-easing-linear', name: 'linear', value: 'linear', desc: 'No acceleration', svgD: 'M5,50 L75,10' },
  { token: '--base-easing-ease-in', name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', desc: 'Slow start, fast end', svgD: 'M5,50 C37,50 75,15 75,10' },
  { token: '--base-easing-ease-out', name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', desc: 'Fast start, slow end', svgD: 'M5,50 C5,45 43,10 75,10' },
  { token: '--base-easing-ease-in-out', name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', desc: 'Symmetrical', svgD: 'M5,50 C37,50 43,10 75,10' },
  { token: '--base-easing-spring', name: 'spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', desc: 'Elastic overshoot', svgD: 'M5,50 C30,50 38,-8 60,5 C68,10 72,10 75,10' },
];

// Alias transition tokens from tokens.json
const ALIAS_TRANSITIONS = [
  { token: '--alias-motion-transition-fast', value: '100ms cubic-bezier(0, 0, 0.2, 1)', usedFor: 'Micro-interactions, hover states' },
  { token: '--alias-motion-transition-normal', value: '200ms cubic-bezier(0, 0, 0.2, 1)', usedFor: 'Standard UI transitions' },
  { token: '--alias-motion-transition-slow', value: '300ms cubic-bezier(0, 0, 0.2, 1)', usedFor: 'Panels, drawers, expanding content' },
  { token: '--alias-motion-transition-spring', value: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)', usedFor: 'Playful, bouncy interactions' },
  { token: '--alias-motion-transition-fade', value: '200ms cubic-bezier(0.4, 0, 0.2, 1)', usedFor: 'Opacity transitions, fades' },
];

const ANIMATION_STYLE = `
@keyframes motion-slide-instant { 0%,100%{transform:translateX(0)} 50%{transform:translateX(52px)} }
@keyframes motion-slide-fast { 0%,100%{transform:translateX(0)} 50%{transform:translateX(52px)} }
@keyframes motion-slide-normal { 0%,100%{transform:translateX(0)} 50%{transform:translateX(52px)} }
@keyframes motion-slide-slow { 0%,100%{transform:translateX(0)} 50%{transform:translateX(52px)} }
@keyframes motion-slide-slower { 0%,100%{transform:translateX(0)} 50%{transform:translateX(52px)} }
`;

function FoundationMotionPage() {
  return (
    <div style={PAGE}>
      <style>{ANIMATION_STYLE}</style>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Motion</h1>
      <p style={PAGE_SUB}>
        Five durations and four easing curves. Alias transition tokens package them into ready-to-use values.
      </p>

      {/* Section: Durations */}
      <h2 style={SECTION_TITLE}>Durations</h2>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 8 }}>
        {DURATIONS.map((d) => {
          const animName = `motion-slide-${d.name}`;
          const iterDuration = d.ms === 0 ? '0ms' : `${d.ms * 2 + 400}ms`;
          return (
            <div key={d.token} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
              <div style={{
                width: 100,
                height: 40,
                background: '#f0f0ff',
                borderRadius: 6,
                overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  background: '#1c21dc',
                  borderRadius: 4,
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  animation: d.ms === 0
                    ? 'none'
                    : `${animName} ${iterDuration} cubic-bezier(0,0,0.2,1) infinite`,
                }} />
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#555' }}>{d.token}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{d.value}</span>
            </div>
          );
        })}
      </div>

      <hr style={DIVIDER} />

      {/* Section: Easing curves */}
      <h2 style={SECTION_TITLE}>Easing curves</h2>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 8 }}>
        {EASINGS.map((e) => (
          <div key={e.token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
              {/* Axes */}
              <line x1="5" y1="50" x2="75" y2="50" stroke="#e5e5e5" strokeWidth="1" />
              <line x1="5" y1="10" x2="5" y2="50" stroke="#e5e5e5" strokeWidth="1" />
              {/* Curve */}
              <path d={e.svgD} stroke="#1c21dc" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#555' }}>{e.token}</span>
            <span style={{ fontSize: 10, color: '#888' }}>{e.desc}</span>
          </div>
        ))}
      </div>

      <hr style={DIVIDER} />

      {/* Section: Alias transitions */}
      <h2 style={SECTION_TITLE}>Alias transitions</h2>

      <div style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ background: '#fafafa', padding: '12px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Transition tokens</span>
          <span style={{ fontSize: 11, color: '#888', background: '#eee', padding: '2px 8px', borderRadius: 20 }}>{ALIAS_TRANSITIONS.length}</span>
        </div>
        {ALIAS_TRANSITIONS.map((t, i) => (
          <div key={t.token} style={{
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            borderBottom: '1px solid #f7f7f7',
            background: i % 2 === 0 ? '#fafafa' : '#fff',
          }}>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#1a1a1a', fontWeight: 500, flex: '0 0 300px' }}>{t.token}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#555', flex: '0 0 280px' }}>{t.value}</span>
            <span style={{ fontSize: 12, color: '#888', flex: '1 1 auto' }}>{t.usedFor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Thematic design system/Foundation/Motion',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { page: null } },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Motion',
  render: () => <FoundationMotionPage />,
};
