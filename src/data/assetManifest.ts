export type AssetSlot =
  | 'hero_bg'
  | 'who_is_ctx_image'
  | 'services_card_1'
  | 'services_card_2'
  | 'services_card_3'
  | 'services_card_4'
  | 'services_card_5'
  | 'services_card_6'
  | 'services_card_7'
  | 'services_card_8'
  | 'capability_row_1_image'
  | 'capability_row_2_image'
  | 'benefits_image_1'
  | 'benefits_image_2'
  | 'faq_bg_or_thumb'
  | 'footer_map_placeholder'
  | 'unknown';

export interface AssetItem {
  file: string;
  path: string;
  ext: string;
  inferredSlot: AssetSlot;
  confidence: number;
  reason: string;
  altDraft: string;
}

export const assetManifest: AssetItem[] = [
  {
    file: 'hero-bg.jpeg',
    path: 'src/assets/hero-bg.jpeg',
    ext: 'jpeg',
    inferredSlot: 'hero_bg',
    confidence: 0.99,
    reason: 'Deterministic keyword match: hero + bg.',
    altDraft: 'Land clearing equipment opening an overgrown Austin property'
  },
  {
    file: 'who-is-ctx.png',
    path: 'src/assets/who-is-ctx.png',
    ext: 'png',
    inferredSlot: 'who_is_ctx_image',
    confidence: 0.99,
    reason: 'Deterministic keyword match: who.',
    altDraft: 'CTX land clearing crew and machine on active site'
  },
  {
    file: 'land-clearning-thumbnail.jpeg',
    path: 'src/assets/land-clearning-thumbnail.jpeg',
    ext: 'jpeg',
    inferredSlot: 'services_card_1',
    confidence: 0.93,
    reason: 'Deterministic keyword match: land-clearing (typo-tolerant).',
    altDraft: 'Land clearing pass creating open build-ready space'
  },
  {
    file: 'lot-clearing-thumbnail.jpeg',
    path: 'src/assets/lot-clearing-thumbnail.jpeg',
    ext: 'jpeg',
    inferredSlot: 'services_card_2',
    confidence: 0.96,
    reason: 'Deterministic keyword match: lot.',
    altDraft: 'Lot clearing results on dense vegetation in Central Texas'
  },
  {
    file: 'brush-removal-thumbnail.jpeg',
    path: 'src/assets/brush-removal-thumbnail.jpeg',
    ext: 'jpeg',
    inferredSlot: 'services_card_3',
    confidence: 0.82,
    reason: 'Fuzzy service-intent mapping: brush removal aligns with mulching/clearing services.',
    altDraft: 'Brush removal workflow improving property access and visibility'
  },
  {
    file: 'right-of-way-clearing-thumbnail.jpeg',
    path: 'src/assets/right-of-way-clearing-thumbnail.jpeg',
    ext: 'jpeg',
    inferredSlot: 'services_card_4',
    confidence: 0.84,
    reason: 'Fuzzy service-intent mapping: right-of-way clearing is a core service variant.',
    altDraft: 'Right-of-way clearing for utility and access corridor prep'
  },
  {
    file: 'grading-and-leveling.jpeg',
    path: 'src/assets/grading-and-leveling.jpeg',
    ext: 'jpeg',
    inferredSlot: 'services_card_5',
    confidence: 0.9,
    reason: 'Deterministic service keyword match: grading.',
    altDraft: 'Land grading and leveling for improved drainage and site readiness'
  },
  {
    file: 'tree-stump-removal-thumbnail.jpeg',
    path: 'src/assets/tree-stump-removal-thumbnail.jpeg',
    ext: 'jpeg',
    inferredSlot: 'services_card_6',
    confidence: 0.81,
    reason: 'Fuzzy service-intent mapping: stump removal is a clearing-adjacent service.',
    altDraft: 'Tree stump removal after clearing and mulching operations'
  },
  {
    file: 'construction-site-prep.jpeg',
    path: 'src/assets/construction-site-prep.jpeg',
    ext: 'jpeg',
    inferredSlot: 'capability_row_1_image',
    confidence: 0.97,
    reason: 'Deterministic keyword match: construction + prep.',
    altDraft: 'Construction site prep after vegetation clearing'
  },
  {
    file: 'tree-clearing-thumbnail.jpeg',
    path: 'src/assets/tree-clearing-thumbnail.jpeg',
    ext: 'jpeg',
    inferredSlot: 'capability_row_2_image',
    confidence: 0.72,
    reason: 'Fuzzy capability fallback: tree clearing supports broader site-prep capability row.',
    altDraft: 'Tree clearing work supporting access road and homesite planning'
  },
  {
    file: 'benefits-of-working-with-us-1.jpeg',
    path: 'src/assets/benefits-of-working-with-us-1.jpeg',
    ext: 'jpeg',
    inferredSlot: 'benefits_image_1',
    confidence: 0.99,
    reason: 'Deterministic keyword match: benefits.',
    altDraft: 'Land management outcome highlighting clean and efficient clearing'
  },
  {
    file: 'benefits-of-working-with-us-2.jpeg',
    path: 'src/assets/benefits-of-working-with-us-2.jpeg',
    ext: 'jpeg',
    inferredSlot: 'benefits_image_2',
    confidence: 0.99,
    reason: 'Deterministic keyword match: benefits.',
    altDraft: 'Cleared and improved lot with preserved usable terrain'
  },
  {
    file: 'ctx-logo.png',
    path: 'src/assets/ctx-logo.png',
    ext: 'png',
    inferredSlot: 'unknown',
    confidence: 0.45,
    reason: 'No deterministic slot keyword; brand asset likely reusable in header/footer identity.',
    altDraft: 'CTX Land Clearing logo'
  }
];
