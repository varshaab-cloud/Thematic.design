import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

// ─── Styles ──────────────────────────────────────────────────────────────────

const PAGE: React.CSSProperties = {
  background: '#fff', padding: '48px 56px',
  maxWidth: 1100, margin: '0 auto',
  fontFamily: "'Open Sans', system-ui, sans-serif",
};
const BREADCRUMB: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: '#999', marginBottom: 8,
};
const PAGE_TITLE: React.CSSProperties = {
  fontSize: 36, fontWeight: 700, color: '#0a0a0a',
  margin: '0 0 10px', lineHeight: 1.1,
};
const PAGE_SUB: React.CSSProperties = {
  fontSize: 14, color: '#666', lineHeight: 1.6,
  maxWidth: 560, marginBottom: 48, marginTop: 0,
};
const SECTION_LABEL: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: '#aaa', marginBottom: 4,
};
const SECTION_TITLE: React.CSSProperties = {
  fontSize: 20, fontWeight: 600, color: '#111', margin: '0 0 4px',
};
const SECTION_SUB: React.CSSProperties = {
  fontSize: 13, color: '#888', margin: '0 0 24px', lineHeight: 1.5,
};
const DIVIDER: React.CSSProperties = {
  height: 1, background: '#f0f0f0', margin: '48px 0', border: 'none',
};

// ─── Token data ───────────────────────────────────────────────────────────────

const BASE_RESOLVE: Record<string, string> = {
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
  "--base-color-blue-500": "#3a3dee",
  "--base-color-blue-600": "#1c21dc",
  "--base-color-blue-700": "#171cbe",
  "--base-color-blue-800": "#1518a6",
  "--base-color-blue-900": "#111487",
  "--base-color-teal-100": "#ccfbf1",
  "--base-color-teal-200": "#99f6e4",
  "--base-color-teal-300": "#5eead4",
  "--base-color-teal-400": "#2dd4bf",
  "--base-color-teal-500": "#14b8a6",
  "--base-color-teal-600": "#0d9488",
  "--base-color-teal-700": "#0f766e",
  "--base-color-teal-800": "#115e59",
  "--base-color-teal-900": "#134e4a",
  "--base-color-rose-100": "#fdf2f8",
  "--base-color-rose-200": "#fce7f3",
  "--base-color-rose-300": "#fbcfe8",
  "--base-color-rose-400": "#f9a8d4",
  "--base-color-rose-500": "#f472b6",
  "--base-color-rose-600": "#db2777",
  "--base-color-rose-700": "#be185d",
  "--base-color-rose-800": "#9d174d",
  "--base-color-rose-900": "#831843",
  "--base-color-slate-50":  "#f8fafc",
  "--base-color-slate-100": "#f1f5f9",
  "--base-color-slate-200": "#e2e8f0",
  "--base-color-slate-300": "#cbd5e1",
  "--base-color-slate-400": "#94a3b8",
  "--base-color-slate-500": "#64748b",
  "--base-color-slate-600": "#475569",
  "--base-color-slate-700": "#334155",
  "--base-color-slate-800": "#1e293b",
  "--base-color-slate-900": "#0f172a",
  "--base-color-emerald-100": "#ecfdf5",
  "--base-color-emerald-200": "#d1fae5",
  "--base-color-emerald-300": "#a7f3d0",
  "--base-color-emerald-400": "#6ee7b7",
  "--base-color-emerald-500": "#34d399",
  "--base-color-emerald-600": "#166534",
  "--base-color-emerald-700": "#14532d",
  "--base-color-emerald-800": "#0f3d22",
  "--base-color-emerald-900": "#0a2718",
  "--base-color-sienna-100": "#fff7ed",
  "--base-color-sienna-200": "#ffedd5",
  "--base-color-sienna-300": "#fed7aa",
  "--base-color-sienna-400": "#fdba74",
  "--base-color-sienna-500": "#c2521a",
  "--base-color-sienna-600": "#a3400f",
  "--base-color-sienna-700": "#823010",
  "--base-color-sienna-800": "#61210b",
  "--base-color-sienna-900": "#401407",
  "--base-color-gold-100": "#fffbeb",
  "--base-color-gold-200": "#fef3c7",
  "--base-color-gold-300": "#fde68a",
  "--base-color-gold-400": "#fcd34d",
  "--base-color-gold-500": "#f59e0b",
  "--base-color-gold-600": "#b45309",
  "--base-color-gold-700": "#92400e",
  "--base-color-gold-800": "#6e3008",
  "--base-color-gold-900": "#451d05",
  "--base-color-sand-50":  "#fdfcf8",
  "--base-color-sand-100": "#f5f2ea",
  "--base-color-sand-200": "#e8e2d5",
  "--base-color-sand-300": "#cec6b4",
  "--base-color-sand-400": "#a89e8c",
  "--base-color-sand-500": "#7a7265",
  "--base-color-sand-600": "#504a40",
  "--base-color-sand-700": "#35302a",
  "--base-color-sand-800": "#1e1a15",
  "--base-color-sand-900": "#0d0b09",
  "--semantic-color-success-100": "#f0fdf4",
  "--semantic-color-success-200": "#dcfce7",
  "--semantic-color-success-300": "#bbf7d0",
  "--semantic-color-success-400": "#86efac",
  "--semantic-color-success-500": "#4ade80",
  "--semantic-color-success-600": "#16a34a",
  "--semantic-color-success-700": "#15803d",
  "--semantic-color-success-800": "#166534",
  "--semantic-color-success-900": "#14532d",
  "--semantic-color-info-100": "#f0f9ff",
  "--semantic-color-info-200": "#e0f2fe",
  "--semantic-color-info-300": "#bae6fd",
  "--semantic-color-info-400": "#7dd3fc",
  "--semantic-color-info-500": "#38bdf8",
  "--semantic-color-info-600": "#0284c7",
  "--semantic-color-info-700": "#0369a1",
  "--semantic-color-info-800": "#075985",
  "--semantic-color-info-900": "#0c4a6e",
  "--semantic-color-warning-100": "#fffbeb",
  "--semantic-color-warning-200": "#fef3c7",
  "--semantic-color-warning-300": "#fde68a",
  "--semantic-color-warning-400": "#fcd34d",
  "--semantic-color-warning-500": "#fbbf24",
  "--semantic-color-warning-600": "#d97706",
  "--semantic-color-warning-700": "#b45309",
  "--semantic-color-warning-800": "#92400e",
  "--semantic-color-warning-900": "#78350f",
  "--semantic-color-error-100": "#fff5f5",
  "--semantic-color-error-200": "#fee2e2",
  "--semantic-color-error-300": "#fecaca",
  "--semantic-color-error-400": "#fca5a5",
  "--semantic-color-error-500": "#f87171",
  "--semantic-color-error-600": "#dc2626",
  "--semantic-color-error-700": "#b91c1c",
  "--semantic-color-error-800": "#991b1b",
  "--semantic-color-error-900": "#7f1d1d",
};

function resolve(val: string): string {
  if (val?.startsWith('var(--')) {
    const key = val.replace(/^var\(/, '').replace(/\)$/, '').trim();
    return BASE_RESOLVE[key] || val;
  }
  return val;
}

// ─── Brand palette data ───────────────────────────────────────────────────────

type PaletteRole = {
  role: string;
  hue: string;
  basePrefix: string;
  brandPrefix: string;
  isNeutral?: boolean;
  stops: { stop: string; hex: string; isNeutral?: boolean }[];
};

type BrandDef = {
  name: string;
  id: string;
  accentHex: string;
  personality: string;
  roles: PaletteRole[];
};

const BRANDS: BrandDef[] = [
  {
    name: 'Cobalt', id: 'cobalt', accentHex: '#1c21dc',
    personality: 'Enterprise · Sophisticated · Classic',
    roles: [
      {
        role: 'Primary', hue: 'Blue', basePrefix: '--base-color-blue',
        brandPrefix: '--brand-cobalt-primary',
        stops: [
          { stop: '100', hex: '#c4c5f4' }, { stop: '200', hex: '#aaacf0' },
          { stop: '300', hex: '#9194eb' }, { stop: '400', hex: '#6e71e6' },
          { stop: '500', hex: '#3a3dee' }, { stop: '600', hex: '#1c21dc' },
          { stop: '700', hex: '#171cbe' }, { stop: '800', hex: '#1518a6' },
          { stop: '900', hex: '#111487' },
        ],
      },
      {
        role: 'Secondary', hue: 'Teal', basePrefix: '--base-color-teal',
        brandPrefix: '--brand-cobalt-secondary',
        stops: [
          { stop: '100', hex: '#ccfbf1' }, { stop: '200', hex: '#99f6e4' },
          { stop: '300', hex: '#5eead4' }, { stop: '400', hex: '#2dd4bf' },
          { stop: '500', hex: '#14b8a6' }, { stop: '600', hex: '#0d9488' },
          { stop: '700', hex: '#0f766e' }, { stop: '800', hex: '#115e59' },
          { stop: '900', hex: '#134e4a' },
        ],
      },
      {
        role: 'Tertiary', hue: 'Rose', basePrefix: '--base-color-rose',
        brandPrefix: '--brand-cobalt-tertiary',
        stops: [
          { stop: '100', hex: '#fdf2f8' }, { stop: '200', hex: '#fce7f3' },
          { stop: '300', hex: '#fbcfe8' }, { stop: '400', hex: '#f9a8d4' },
          { stop: '500', hex: '#f472b6' }, { stop: '600', hex: '#db2777' },
          { stop: '700', hex: '#be185d' }, { stop: '800', hex: '#9d174d' },
          { stop: '900', hex: '#831843' },
        ],
      },
      {
        role: 'Neutral', hue: 'Slate', basePrefix: '--base-color-slate',
        brandPrefix: '--brand-cobalt-neutral', isNeutral: true,
        stops: [
          { stop: '50',  hex: '#f8fafc', isNeutral: true },
          { stop: '100', hex: '#f1f5f9', isNeutral: true },
          { stop: '200', hex: '#e2e8f0', isNeutral: true },
          { stop: '300', hex: '#cbd5e1', isNeutral: true },
          { stop: '400', hex: '#94a3b8', isNeutral: true },
          { stop: '500', hex: '#64748b' }, { stop: '600', hex: '#475569' },
          { stop: '700', hex: '#334155' }, { stop: '800', hex: '#1e293b' },
          { stop: '900', hex: '#0f172a' },
        ],
      },
    ],
  },
  {
    name: 'Terra', id: 'terra', accentHex: '#166534',
    personality: 'Sustainable · Wellness · Healthcare',
    roles: [
      {
        role: 'Primary', hue: 'Emerald', basePrefix: '--base-color-emerald',
        brandPrefix: '--brand-terra-primary',
        stops: [
          { stop: '100', hex: '#ecfdf5' }, { stop: '200', hex: '#d1fae5' },
          { stop: '300', hex: '#a7f3d0' }, { stop: '400', hex: '#6ee7b7' },
          { stop: '500', hex: '#34d399' }, { stop: '600', hex: '#166534' },
          { stop: '700', hex: '#14532d' }, { stop: '800', hex: '#0f3d22' },
          { stop: '900', hex: '#0a2718' },
        ],
      },
      {
        role: 'Secondary', hue: 'Sienna', basePrefix: '--base-color-sienna',
        brandPrefix: '--brand-terra-secondary',
        stops: [
          { stop: '100', hex: '#fff7ed' }, { stop: '200', hex: '#ffedd5' },
          { stop: '300', hex: '#fed7aa' }, { stop: '400', hex: '#fdba74' },
          { stop: '500', hex: '#c2521a' }, { stop: '600', hex: '#a3400f' },
          { stop: '700', hex: '#823010' }, { stop: '800', hex: '#61210b' },
          { stop: '900', hex: '#401407' },
        ],
      },
      {
        role: 'Tertiary', hue: 'Gold', basePrefix: '--base-color-gold',
        brandPrefix: '--brand-terra-tertiary',
        stops: [
          { stop: '100', hex: '#fffbeb' }, { stop: '200', hex: '#fef3c7' },
          { stop: '300', hex: '#fde68a' }, { stop: '400', hex: '#fcd34d' },
          { stop: '500', hex: '#f59e0b' }, { stop: '600', hex: '#b45309' },
          { stop: '700', hex: '#92400e' }, { stop: '800', hex: '#6e3008' },
          { stop: '900', hex: '#451d05' },
        ],
      },
      {
        role: 'Neutral', hue: 'Sand', basePrefix: '--base-color-sand',
        brandPrefix: '--brand-terra-neutral',
        stops: [
          { stop: '50',  hex: '#fdfcf8', isNeutral: true },
          { stop: '100', hex: '#f5f2ea', isNeutral: true },
          { stop: '200', hex: '#e8e2d5', isNeutral: true },
          { stop: '300', hex: '#cec6b4', isNeutral: true },
          { stop: '400', hex: '#a89e8c', isNeutral: true },
          { stop: '500', hex: '#7a7265' }, { stop: '600', hex: '#504a40' },
          { stop: '700', hex: '#35302a' }, { stop: '800', hex: '#1e1a15' },
          { stop: '900', hex: '#0d0b09' },
        ],
      },
    ],
  },
];

// ─── Alias colour tokens ──────────────────────────────────────────────────────

const ALIAS_GROUPS = [
  {
    name: 'Text',
    description: 'Use for all text and icon content',
    tokens: [
      { name: '--alias-color-text-primary',   value: 'var(--base-color-black)',         usage: 'Headings, primary body copy',       brand: false },
      { name: '--alias-color-text-secondary',  value: 'var(--base-color-gray-900)',      usage: 'Secondary body copy',               brand: false },
      { name: '--alias-color-text-tertiary',   value: 'var(--base-color-gray-700)',      usage: 'Supporting text, labels',           brand: false },
      { name: '--alias-color-text-subtle',     value: 'var(--base-color-gray-600)',      usage: 'Placeholders, muted text',          brand: false },
      { name: '--alias-color-text-disabled',   value: 'var(--base-color-gray-500)',      usage: 'Disabled state copy',               brand: false },
      { name: '--alias-color-text-inverse',    value: 'var(--base-color-white)',         usage: 'Text on dark/brand backgrounds',    brand: false },
      { name: '--alias-color-text-brand',      value: '#111487',                         usage: 'Brand-coloured text links',         brand: true  },
    ],
  },
  {
    name: 'Background',
    description: 'Surfaces, layers and brand fills',
    tokens: [
      { name: '--alias-color-background-primary',    value: 'var(--base-color-white)',         usage: 'Page background',              brand: false },
      { name: '--alias-color-background-secondary',  value: 'var(--base-color-gray-75)',       usage: 'Subtle surfaces, sidebars',    brand: false },
      { name: '--alias-color-background-tertiary',   value: 'var(--base-color-gray-100)',      usage: 'Component internal layers',    brand: false },
      { name: '--alias-color-background-brand',      value: '#1518a6',                         usage: 'Brand-filled surfaces',        brand: true  },
      { name: '--alias-color-background-brand-dark', value: '#111487',                         usage: 'Dark brand surface variant',   brand: true  },
      { name: '--alias-color-background-hover',      value: 'var(--base-color-blue-100)',      usage: 'Interactive hover tint',       brand: true  },
    ],
  },
  {
    name: 'Border',
    description: 'Dividers, field borders and brand outlines',
    tokens: [
      { name: '--alias-color-border-default',  value: 'var(--base-color-gray-300)',          usage: 'Default field and card borders',    brand: false },
      { name: '--alias-color-border-active',   value: '#1c21dc',                             usage: 'Focus / active field border',       brand: true  },
      { name: '--alias-color-border-disabled', value: 'var(--base-color-gray-400)',          usage: 'Disabled field border',             brand: false },
      { name: '--alias-color-border-brand',    value: 'var(--base-color-blue-800)',          usage: 'Checked checkbox / radio ring',     brand: true  },
      { name: '--alias-color-border-success',  value: 'var(--semantic-color-success-600)',   usage: 'Success state border',              brand: false },
      { name: '--alias-color-border-info',     value: 'var(--semantic-color-info-600)',      usage: 'Info state border',                 brand: false },
      { name: '--alias-color-border-warning',  value: 'var(--semantic-color-warning-600)',   usage: 'Warning state border',              brand: false },
      { name: '--alias-color-border-error',    value: 'var(--semantic-color-error-600)',     usage: 'Error state border',                brand: false },
    ],
  },
  {
    name: 'Icon',
    description: 'Icon fill colours by prominence',
    tokens: [
      { name: '--alias-color-icon-primary',   value: 'var(--base-color-gray-900)', usage: 'High-emphasis icons',   brand: false },
      { name: '--alias-color-icon-secondary', value: 'var(--base-color-gray-700)', usage: 'Supporting icons',       brand: false },
      { name: '--alias-color-icon-disabled',  value: 'var(--base-color-gray-400)', usage: 'Disabled icons',         brand: false },
      { name: '--alias-color-icon-brand',     value: '#171cbe',                    usage: 'Brand-coloured icons',   brand: true  },
    ],
  },
];

// Brand-specific values for tokens marked brand: true
const BRAND_ALIAS: Record<string, Record<string, string>> = {
  cobalt: {
    '--alias-color-text-brand':             '#111487',  // blue-900
    '--alias-color-background-brand':       '#1518a6',  // blue-800
    '--alias-color-background-brand-dark':  '#111487',  // blue-900
    '--alias-color-background-hover':       '#c4c5f4',  // blue-100
    '--alias-color-border-active':          '#1c21dc',  // blue-600
    '--alias-color-border-brand':           '#1518a6',  // blue-800
    '--alias-color-icon-brand':             '#171cbe',  // blue-700
  },
  terra: {
    '--alias-color-text-brand':             '#0a2718',  // emerald-900
    '--alias-color-background-brand':       '#0f3d22',  // emerald-800
    '--alias-color-background-brand-dark':  '#0a2718',  // emerald-900
    '--alias-color-background-hover':       '#ecfdf5',  // emerald-100
    '--alias-color-border-active':          '#166534',  // emerald-600
    '--alias-color-border-brand':           '#0f3d22',  // emerald-800
    '--alias-color-icon-brand':             '#14532d',  // emerald-700
  },
};

// ─── Semantic system data ─────────────────────────────────────────────────────

const SEMANTIC_SYSTEM = [
  {
    name: 'Success', key: 'success',
    description: 'Confirmations, completed actions, positive outcomes',
    stops: [
      { stop: '100', hex: '#f0fdf4' }, { stop: '200', hex: '#dcfce7' },
      { stop: '300', hex: '#bbf7d0' }, { stop: '400', hex: '#86efac' },
      { stop: '500', hex: '#4ade80' }, { stop: '600', hex: '#16a34a' },
      { stop: '700', hex: '#15803d' }, { stop: '800', hex: '#166534' },
      { stop: '900', hex: '#14532d' },
    ],
    aliasTokens: [
      { token: '--alias-color-feedback-success-bg',     stop: '100', usage: 'Banner / toast background' },
      { token: '--alias-color-feedback-success-border', stop: '400', usage: 'Border accent' },
      { token: '--alias-color-feedback-success-fg',     stop: '800', usage: 'Text and icon on bg' },
    ],
    hex600: '#16a34a',
  },
  {
    name: 'Info', key: 'info',
    description: 'Informational hints, help text, neutral notifications',
    stops: [
      { stop: '100', hex: '#f0f9ff' }, { stop: '200', hex: '#e0f2fe' },
      { stop: '300', hex: '#bae6fd' }, { stop: '400', hex: '#7dd3fc' },
      { stop: '500', hex: '#38bdf8' }, { stop: '600', hex: '#0284c7' },
      { stop: '700', hex: '#0369a1' }, { stop: '800', hex: '#075985' },
      { stop: '900', hex: '#0c4a6e' },
    ],
    aliasTokens: [
      { token: '--alias-color-feedback-info-bg',     stop: '100', usage: 'Banner / toast background' },
      { token: '--alias-color-feedback-info-border', stop: '400', usage: 'Border accent' },
      { token: '--alias-color-feedback-info-fg',     stop: '800', usage: 'Text and icon on bg' },
    ],
    hex600: '#0284c7',
  },
  {
    name: 'Warning', key: 'warning',
    description: 'Caution states, attention-required, non-critical alerts',
    stops: [
      { stop: '100', hex: '#fffbeb' }, { stop: '200', hex: '#fef3c7' },
      { stop: '300', hex: '#fde68a' }, { stop: '400', hex: '#fcd34d' },
      { stop: '500', hex: '#fbbf24' }, { stop: '600', hex: '#d97706' },
      { stop: '700', hex: '#b45309' }, { stop: '800', hex: '#92400e' },
      { stop: '900', hex: '#78350f' },
    ],
    aliasTokens: [
      { token: '--alias-color-feedback-warning-bg',     stop: '100', usage: 'Banner / toast background' },
      { token: '--alias-color-feedback-warning-border', stop: '400', usage: 'Border accent' },
      { token: '--alias-color-feedback-warning-fg',     stop: '800', usage: 'Text and icon on bg' },
    ],
    hex600: '#d97706',
  },
  {
    name: 'Error', key: 'error',
    description: 'Failures, validation errors, destructive states',
    stops: [
      { stop: '100', hex: '#fff5f5' }, { stop: '200', hex: '#fee2e2' },
      { stop: '300', hex: '#fecaca' }, { stop: '400', hex: '#fca5a5' },
      { stop: '500', hex: '#f87171' }, { stop: '600', hex: '#dc2626' },
      { stop: '700', hex: '#b91c1c' }, { stop: '800', hex: '#991b1b' },
      { stop: '900', hex: '#7f1d1d' },
    ],
    aliasTokens: [
      { token: '--alias-color-feedback-error-bg',     stop: '100', usage: 'Banner / toast background' },
      { token: '--alias-color-feedback-error-border', stop: '400', usage: 'Border accent' },
      { token: '--alias-color-feedback-error-fg',     stop: '800', usage: 'Text and icon on bg' },
    ],
    hex600: '#dc2626',
  },
];

// ─── Helper: is this hex dark enough to need white text? ─────────────────────

function needsWhiteText(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

// ─── Section B: Brand palette detail (tabbed) ────────────────────────────────

function PaletteRow({ roleData }: { roleData: PaletteRole }) {
  const action600 = roleData.stops.find(s => s.stop === '600') ?? roleData.stops[5];
  const bg200 = roleData.stops.find(s => s.stop === '200') ?? roleData.stops[1];
  const text800 = roleData.stops.find(s => s.stop === '800') ?? roleData.stops[7];

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Role header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{roleData.role}</span>
        <span style={{ fontSize: 11, color: '#aaa' }}>{roleData.hue}</span>
      </div>

      {/* Swatch strip */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {roleData.stops.map((s) => {
          const isAction = s.stop === '600';
          const white = needsWhiteText(s.hex);
          return (
            <div key={s.stop} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%', height: isAction ? 48 : 40,
                borderRadius: 5, background: s.hex,
                border: s.isNeutral ? '0.5px solid #e5e5e5' : (isAction ? `2px solid ${s.hex}` : 'none'),
                outline: isAction ? '2px solid ' + s.hex : 'none',
                outlineOffset: isAction ? 2 : 0,
                boxSizing: 'border-box',
              }} />
              <span style={{ fontSize: 9, color: '#999', marginTop: 4 }}>{s.stop}</span>
              <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#bbb' }}>{s.hex}</span>
            </div>
          );
        })}
      </div>

      {/* Key token resolution row */}
      <div style={{ display: 'flex', gap: 6 }}>
        {[
          { label: 'Background', stop: bg200 },
          { label: 'Action', stop: action600 },
          { label: 'Text', stop: text800 },
        ].map(({ label, stop }) => (
          <div key={label} style={{
            flex: 1, background: '#fafafa', border: '1px solid #eee',
            borderRadius: 6, padding: '8px 10px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{
                width: 12, height: 12, borderRadius: 2, background: stop.hex,
                border: stop.isNeutral ? '0.5px solid #e5e5e5' : 'none', flexShrink: 0,
              }} />
              <span style={{ fontSize: 10, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label} · {stop.stop}</span>
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#1c21dc', margin: '0 0 2px', fontWeight: 600, wordBreak: 'break-all' }}>
              {roleData.brandPrefix}-{stop.stop}
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#aaa', margin: '0 0 2px', wordBreak: 'break-all' }}>
              → {roleData.basePrefix}-{stop.stop}
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#666', margin: 0 }}>{stop.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandPaletteDetail({ activeBrand, setActiveBrand }: {
  activeBrand: 'cobalt' | 'terra';
  setActiveBrand: (b: 'cobalt' | 'terra') => void;
}) {
  const brand = BRANDS.find(b => b.id === activeBrand)!;

  return (
    <div>
      {/* Tab toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <p style={SECTION_LABEL}>Palette detail</p>
          <p style={{ ...SECTION_TITLE, margin: 0 }}>{brand.name}</p>
        </div>
        <div style={{ display: 'flex', gap: 2, background: '#f5f5f5', borderRadius: 8, padding: 3 }}>
          {BRANDS.map(b => (
            <button
              key={b.id}
              onClick={() => setActiveBrand(b.id as 'cobalt' | 'terra')}
              style={{
                padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600,
                background: activeBrand === b.id ? '#fff' : 'transparent',
                color: activeBrand === b.id ? '#111' : '#888',
                boxShadow: activeBrand === b.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Palette rows */}
      {brand.roles.map(role => (
        <PaletteRow key={role.role} roleData={role} />
      ))}

      {/* Token naming note */}
      <div style={{
        background: '#f8f8f8', border: '1px solid #eee', borderRadius: 8,
        padding: '12px 16px', marginTop: 8,
      }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#555', margin: '0 0 4px' }}>Token naming pattern</p>
        <p style={{ fontSize: 11, color: '#888', margin: 0, lineHeight: 1.6 }}>
          <code style={{ fontFamily: 'monospace', background: '#eee', padding: '1px 5px', borderRadius: 3 }}>
            --brand-{activeBrand}-{'{role}'}-{'{stop}'}
          </code>
          {' '}references{' '}
          <code style={{ fontFamily: 'monospace', background: '#eee', padding: '1px 5px', borderRadius: 3 }}>
            --base-color-{'{hue}'}-{'{stop}'}
          </code>
          . Use brand alias tokens in components — never reference base tokens directly.
        </p>
      </div>
    </div>
  );
}

// ─── Section C: Semantic roles ────────────────────────────────────────────────

function AliasTokenRow({ name, value, usage, index, isBrandToken }: {
  name: string; value: string; usage: string; index: number; isBrandToken?: boolean;
}) {
  const resolved = resolve(value);
  const isVar = value.startsWith('var(--');
  const sourceKey = isVar ? value.replace(/^var\(/, '').replace(/\)$/, '').trim() : null;
  const isColor = resolved.startsWith('#') || resolved.startsWith('rgb');

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 16px',
      borderBottom: '1px solid #f7f7f7',
      background: index % 2 === 0 ? '#fafafa' : '#fff',
    }}>
      {isColor ? (
        <div style={{
          width: 28, height: 28, borderRadius: 5, flexShrink: 0,
          background: resolved, border: '1px solid rgba(0,0,0,0.07)',
        }} />
      ) : (
        <div style={{
          width: 28, height: 28, borderRadius: 5, flexShrink: 0,
          background: '#f0f0f0', border: '1px solid #e8e8e8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 9, color: '#bbb' }}>—</span>
        </div>
      )}
      <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#111', fontWeight: 400, flex: '2 1 0', minWidth: 0 }}>{name}</span>
      <span style={{ fontSize: 11, color: '#bbb', flex: '0 0 auto' }}>
        {sourceKey ? `→ ${sourceKey}` : ''}
      </span>
      <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#888', flex: '1 1 0', textAlign: 'right' }}>{resolved}</span>
      <span style={{ fontSize: 11, color: '#aaa', flex: '1 1 0', textAlign: 'right' }}>{usage}</span>
    </div>
  );
}

function SemanticRoles({ activeBrand }: { activeBrand: 'cobalt' | 'terra' }) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(ALIAS_GROUPS.map(g => [g.name, true]))
  );

  function toggleGroup(name: string) {
    setOpenGroups(prev => ({ ...prev, [name]: !prev[name] }));
  }

  const brandValues = BRAND_ALIAS[activeBrand];

  return (
    <div>
      {ALIAS_GROUPS.map((group) => {
        const isOpen = openGroups[group.name];
        return (
          <div key={group.name} style={{ marginBottom: 16 }}>
            {/* Group header — clickable */}
            <button
              onClick={() => toggleGroup(group.name)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                background: '#f7f7f7', padding: '10px 16px',
                borderRadius: isOpen ? '8px 8px 0 0' : '8px',
                border: '1px solid #eee', cursor: 'pointer', textAlign: 'left',
              }}
            >
              {/* Chevron */}
              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                style={{ flexShrink: 0, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s', color: '#aaa' }}
              >
                <path d="M4 2.5L7.5 6L4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{group.name}</span>
              <span style={{ fontSize: 11, color: '#aaa' }}>{group.description}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: '#ccc' }}>{group.tokens.length}</span>
            </button>

            {isOpen && (
              <>
                {/* Column headers */}
                <div style={{
                  display: 'flex', gap: 12, padding: '6px 16px',
                  background: '#fafafa', borderLeft: '1px solid #eee', borderRight: '1px solid #eee',
                }}>
                  <span style={{ width: 28, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#bbb', flex: '2 1 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Token</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#bbb', flex: '0 0 auto', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Source</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#bbb', flex: '1 1 0', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Value</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#bbb', flex: '1 1 0', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Usage</span>
                </div>
                <div style={{ border: '1px solid #eee', borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
                  {group.tokens.map(({ name, value, usage, brand: isBrandToken }, i) => {
                    const resolvedValue = isBrandToken ? (brandValues[name] ?? value) : value;
                    return (
                      <AliasTokenRow key={name} name={name} value={resolvedValue} usage={usage} index={i} isBrandToken={isBrandToken} />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Section D: Semantic system colours ──────────────────────────────────────

function SemanticSystemRow({ item }: { item: typeof SEMANTIC_SYSTEM[0] }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {/* Row header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: item.hex600, flexShrink: 0, marginBottom: 2 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{item.name}</span>
        <span style={{ fontSize: 11, color: '#aaa' }}>{item.description}</span>
      </div>

      {/* Scale strip */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
        {item.stops.map((s) => {
          const isAction = s.stop === '600';
          return (
            <div key={s.stop} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%', height: isAction ? 40 : 32, borderRadius: 4, background: s.hex,
                border: parseInt(s.stop) <= 300 ? '0.5px solid #e5e5e5' : 'none',
                outline: isAction ? `2px solid ${s.hex}` : 'none', outlineOffset: 2,
                boxSizing: 'border-box',
              }} />
              <span style={{ fontSize: 9, color: '#aaa', marginTop: 3 }}>{s.stop}</span>
            </div>
          );
        })}
      </div>

      {/* Alias usage tokens */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {item.aliasTokens.map(({ token, stop, usage }) => {
          const stopData = item.stops.find(s => s.stop === stop)!;
          return (
            <div key={token} style={{
              background: '#fafafa', border: '1px solid #eee', borderRadius: 6, padding: '8px 10px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div style={{
                  width: 12, height: 12, borderRadius: 2, background: stopData.hex,
                  border: parseInt(stop) <= 300 ? '0.5px solid #e5e5e5' : 'none', flexShrink: 0,
                }} />
                <span style={{ fontSize: 10, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{usage}</span>
              </div>
              <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#1c21dc', fontWeight: 600, margin: '0 0 2px', wordBreak: 'break-all' }}>{token}</p>
              <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#aaa', margin: '0 0 1px', wordBreak: 'break-all' }}>
                → --semantic-color-{item.key}-{stop}
              </p>
              <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#666', margin: 0 }}>{stopData.hex}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function FoundationColourPage() {
  const [activeBrand, setActiveBrand] = useState<'cobalt' | 'terra'>('cobalt');

  return (
    <div style={PAGE}>
      <div style={BREADCRUMB}>Foundation</div>
      <h1 style={PAGE_TITLE}>Colour</h1>
      <p style={PAGE_SUB}>
        Two brand palettes, one shared semantic system. Brand tokens define identity — semantic tokens define meaning.
      </p>

      {/* ── B: Brand palette detail ────────────────────────────────────────── */}
      <BrandPaletteDetail activeBrand={activeBrand} setActiveBrand={setActiveBrand} />

      <hr style={DIVIDER} />

      {/* ── C: Semantic roles ─────────────────────────────────────────────── */}
      <p style={SECTION_LABEL}>Semantic roles</p>
      <h2 style={{ ...SECTION_TITLE, marginBottom: 4 }}>Alias tokens</h2>
      <p style={SECTION_SUB}>
        These are the tokens components use. Brand-specific values (marked ●) update when you switch brand above.
      </p>
      <SemanticRoles activeBrand={activeBrand} />

      <hr style={DIVIDER} />

      {/* ── D: Semantic system ────────────────────────────────────────────── */}
      <p style={SECTION_LABEL}>Semantic system colours</p>
      <h2 style={{ ...SECTION_TITLE, marginBottom: 4 }}>Success · Info · Warning · Error</h2>
      <p style={SECTION_SUB}>
        Brand-agnostic and fixed. These never change when a brand theme is swapped. Each scale has nine stops; the three alias tokens are what you actually use in components.
      </p>
      {SEMANTIC_SYSTEM.map(item => (
        <SemanticSystemRow key={item.key} item={item} />
      ))}
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

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
