import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const PAGE: React.CSSProperties = { background: '#fff', padding: '48px 56px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" };
const BREADCRUMB: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: 8 };
const PAGE_TITLE: React.CSSProperties = { fontSize: 40, fontWeight: 700, color: '#0a0a0a', margin: '0 0 12px', lineHeight: 1.1 };
const PAGE_SUB: React.CSSProperties = { fontSize: 15, color: '#666', lineHeight: 1.6, maxWidth: 560, marginBottom: 48, marginTop: 0 };
const SECTION_TITLE: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: '#111', margin: '48px 0 6px' };
const SECTION_DESC: React.CSSProperties = { fontSize: 13, color: '#666', margin: '0 0 20px', lineHeight: 1.6 };
const DIVIDER: React.CSSProperties = { height: 1, background: '#f0f0f0', margin: '40px 0', border: 'none' };
const TH: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#999', textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #eee' };
const TD: React.CSSProperties = { padding: '10px 12px', fontSize: 12, color: '#1a1a1a', borderBottom: '1px solid #f5f5f5' };

interface TypeStyle {
  name: string;
  role: string;
  sizeRem: string;
  sizePx: number;
  weight: number;
  lineHeight: number;
  letterSpacing: string;
}

const TYPE_STYLES: TypeStyle[] = [
  { name: 'Heading 1', role: 'Page-level headings, hero text', sizeRem: '3rem', sizePx: 48, weight: 700, lineHeight: 1.25, letterSpacing: '-1%' },
  { name: 'Heading 2', role: 'Section headings, modal titles', sizeRem: '2.625rem', sizePx: 42, weight: 700, lineHeight: 1.25, letterSpacing: '-0.5%' },
  { name: 'Heading 3', role: 'Sub-section headings', sizeRem: '2.25rem', sizePx: 36, weight: 700, lineHeight: 1.3, letterSpacing: '-0.5%' },
  { name: 'Heading 4', role: 'Panel headers', sizeRem: '2rem', sizePx: 32, weight: 700, lineHeight: 1.3, letterSpacing: '0%' },
  { name: 'Heading 5', role: 'Card titles, sidebar headings', sizeRem: '1.875rem', sizePx: 30, weight: 700, lineHeight: 1.35, letterSpacing: '0%' },
  { name: 'Heading 6', role: 'Small section labels', sizeRem: '1.875rem', sizePx: 30, weight: 600, lineHeight: 1.35, letterSpacing: '0%' },
  { name: 'Subheading 1', role: 'Lead paragraphs, intro text', sizeRem: '1rem', sizePx: 16, weight: 400, lineHeight: 1.5, letterSpacing: '0%' },
  { name: 'Subheading 2', role: 'UI sub-labels, emphasis', sizeRem: '0.875rem', sizePx: 14, weight: 500, lineHeight: 1.5, letterSpacing: '0%' },
  { name: 'Body 1', role: 'Primary reading content', sizeRem: '1rem', sizePx: 16, weight: 400, lineHeight: 1.5, letterSpacing: '0%' },
  { name: 'Body 2', role: 'Secondary reading content, descriptions', sizeRem: '0.875rem', sizePx: 14, weight: 400, lineHeight: 1.5, letterSpacing: '0%' },
  { name: 'Body 3', role: 'Dense UI text, metadata', sizeRem: '0.75rem', sizePx: 12, weight: 400, lineHeight: 1.5, letterSpacing: '0%' },
  { name: 'Button', role: 'Interactive labels, CTAs', sizeRem: '0.875rem', sizePx: 14, weight: 500, lineHeight: 1.25, letterSpacing: '0%' },
  { name: 'Caption 1', role: 'Timestamps, footnotes, helper text', sizeRem: '0.75rem', sizePx: 12, weight: 400, lineHeight: 1.25, letterSpacing: '0%' },
  { name: 'Caption 2', role: 'Tooltip labels, badge text', sizeRem: '0.625rem', sizePx: 10, weight: 400, lineHeight: 1.25, letterSpacing: '0%' },
];

function TypeStyleRow({ style }: { style: TypeStyle }) {
  const lineHeightPx = style.sizePx * style.lineHeight;
  const barRatio = style.sizePx / lineHeightPx;
  const barWidth = Math.round(barRatio * 200);

  return (
    <div style={{ borderBottom: '1px solid #f0f0f0', padding: '32px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{style.name}</span>
        <span style={{ fontSize: 12, color: '#888' }}>{style.role}</span>
      </div>

      <div style={{
        fontSize: style.sizeRem,
        fontWeight: style.weight,
        fontFamily: "'Open Sans', system-ui, sans-serif",
        color: '#111',
        lineHeight: style.lineHeight,
        marginBottom: 20,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}>
        Aa Bb Cc — The quick brown fox jumps over the lazy dog
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 200, height: 4, borderRadius: 2, background: '#eee', position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: 4, width: barWidth, borderRadius: 2, background: '#1c21dc' }} />
        </div>
        <span style={{ fontSize: 10, color: '#888' }}>line-height ratio · {style.lineHeight.toFixed(1)}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
        {[
          { label: 'Font', value: 'Open Sans' },
          { label: 'Weight', value: String(style.weight) },
          { label: 'Font Size', value: `${style.sizeRem} / ${style.sizePx}px` },
          { label: 'Line Height', value: String(style.lineHeight) },
          { label: 'Letter Spacing', value: style.letterSpacing },
        ].map((spec) => (
          <div key={spec.label}>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#aaa', marginBottom: 3 }}>{spec.label}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>{spec.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Typography tokens (from tokens.css) ─────────────────────────────────────

const TYPE_TOKENS = [
  { style: 'Heading 1',   tokens: [{ name: '--alias-typography-heading1-font-size', value: '3rem' }, { name: '--alias-typography-heading1-font-weight', value: '700' }, { name: '--alias-typography-heading1-line-height', value: '1.5rem' }] },
  { style: 'Heading 2',   tokens: [{ name: '--alias-typography-heading2-font-size', value: '2.625rem' }, { name: '--alias-typography-heading2-font-weight', value: '700' }, { name: '--alias-typography-heading2-line-height', value: '1.5rem' }] },
  { style: 'Heading 3',   tokens: [{ name: '--alias-typography-heading3-font-size', value: '2.25rem' }, { name: '--alias-typography-heading3-font-weight', value: '700' }, { name: '--alias-typography-heading3-line-height', value: '1.5rem' }] },
  { style: 'Heading 4',   tokens: [{ name: '--alias-typography-heading4-font-size', value: '2rem' }, { name: '--alias-typography-heading4-font-weight', value: '700' }, { name: '--alias-typography-heading4-line-height', value: '1.5rem' }] },
  { style: 'Heading 5',   tokens: [{ name: '--alias-typography-heading5-font-size', value: '1.875rem' }, { name: '--alias-typography-heading5-font-weight', value: '700' }, { name: '--alias-typography-heading5-line-height', value: '1.5rem' }] },
  { style: 'Heading 6',   tokens: [{ name: '--alias-typography-heading6-font-size', value: '1.875rem' }, { name: '--alias-typography-heading6-font-weight', value: '600' }, { name: '--alias-typography-heading6-line-height', value: '1.5rem' }] },
  { style: 'Subheading 1', tokens: [{ name: '--alias-typography-subheading1-font-size', value: '1rem' }, { name: '--alias-typography-subheading1-font-weight', value: '400' }, { name: '--alias-typography-subheading1-line-height', value: '1.5rem' }] },
  { style: 'Subheading 2', tokens: [{ name: '--alias-typography-subheading2-font-size', value: '0.875rem' }, { name: '--alias-typography-subheading2-font-weight', value: '500' }, { name: '--alias-typography-subheading2-line-height', value: '1.5rem' }] },
  { style: 'Body 1',      tokens: [{ name: '--alias-typography-body-text1-font-size', value: '1rem' }, { name: '--alias-typography-body-text1-font-weight', value: '400' }, { name: '--alias-typography-body-text1-line-height', value: '1.5rem' }] },
  { style: 'Body 2',      tokens: [{ name: '--alias-typography-body-text2-font-size', value: '0.875rem' }, { name: '--alias-typography-body-text2-font-weight', value: '400' }, { name: '--alias-typography-body-text2-line-height', value: '1.5rem' }] },
];

const SHARED_TOKENS = [
  { name: '--base-font-family-primary', value: "'Open Sans', sans-serif", usage: 'All UI text — the single typeface for the system' },
  { name: '--base-font-family-mono',    value: "'JetBrains Mono', monospace", usage: 'Code, token names, technical labels' },
];

function FoundationTypographyPage() {
  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Typography</h1>
      <p style={PAGE_SUB}>
        Open Sans across 14 styles. A single family covering every role from display headings to dense UI labels.
      </p>

      {TYPE_STYLES.map((style) => (
        <TypeStyleRow key={style.name} style={style} />
      ))}

      <hr style={DIVIDER} />

      {/* Typography tokens */}
      <h2 style={SECTION_TITLE}>Typography tokens</h2>
      <p style={SECTION_DESC}>
        Each style has three alias tokens — font-size, font-weight, and line-height. All share the same
        font-family token. Reference these in component code instead of hardcoding values.
      </p>

      {/* Shared tokens */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
        <thead>
          <tr><th style={TH}>Token</th><th style={TH}>Value</th><th style={TH}>Usage</th></tr>
        </thead>
        <tbody>
          {SHARED_TOKENS.map(t => (
            <tr key={t.name}>
              <td style={{ ...TD, fontFamily: 'monospace', color: '#555' }}>{t.name}</td>
              <td style={{ ...TD, fontFamily: 'monospace' }}>{t.value}</td>
              <td style={{ ...TD, color: '#666' }}>{t.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Per-style token table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={TH}>Style</th>
            <th style={TH}>Token</th>
            <th style={TH}>Value</th>
          </tr>
        </thead>
        <tbody>
          {TYPE_TOKENS.map(({ style, tokens }) =>
            tokens.map((t, i) => (
              <tr key={t.name}>
                {i === 0 && (
                  <td style={{ ...TD, fontWeight: 600, color: '#444', verticalAlign: 'top' }} rowSpan={tokens.length}>
                    {style}
                  </td>
                )}
                <td style={{ ...TD, fontFamily: 'monospace', color: '#555' }}>{t.name}</td>
                <td style={{ ...TD, fontFamily: 'monospace' }}>{t.value}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const meta: Meta = {
  title: 'Thematic design system/Foundation/Typography',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { page: null } },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Typography',
  render: () => <FoundationTypographyPage />,
};
