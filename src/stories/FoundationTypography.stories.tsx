import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const PAGE: React.CSSProperties = { background: '#fff', padding: '48px 56px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" };
const BREADCRUMB: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: 8 };
const PAGE_TITLE: React.CSSProperties = { fontSize: 40, fontWeight: 700, color: '#0a0a0a', margin: '0 0 12px', lineHeight: 1.1 };
const PAGE_SUB: React.CSSProperties = { fontSize: 15, color: '#666', lineHeight: 1.6, maxWidth: 560, marginBottom: 48, marginTop: 0 };

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

function FoundationTypographyPage() {
  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Typography</h1>
      <p style={PAGE_SUB}>
        Open Sans across 14 styles. A variable-weight font with a single family covering every role from editorial display headings to dense UI labels.
      </p>

      {TYPE_STYLES.map((style) => (
        <TypeStyleRow key={style.name} style={style} />
      ))}
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
