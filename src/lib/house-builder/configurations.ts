import {
  AmenitiesState,
  ArchStyleId,
  CladdingId,
  FinishingCategoryId,
  FloorConfigId,
  HouseConfig,
  PlotSizeId,
  PlotSpec,
  WallFinishId,
  WindowStyleId,
} from './types';

export const PLOT_SPECS: Record<PlotSizeId, PlotSpec> = {
  '5-marla': {
    id: '5-marla',
    label: '5 Marla',
    dimensionsLabel: '25 × 45 ft',
    widthFt: 25,
    depthFt: 45,
    setbackFrontFt: 7,
    setbackBackFt: 4,
    setbackSideFt: 0,
    allowsPool: false,
    allowsPatioDeck: false,
    baseBedroomsSingle: 2,
    baseBedroomsDouble: 4,
    baseBathroomsSingle: 2,
    baseBathroomsDouble: 4,
  },
  '7-marla': {
    id: '7-marla',
    label: '7 Marla',
    dimensionsLabel: '30 × 52 ft',
    widthFt: 30,
    depthFt: 52,
    setbackFrontFt: 9,
    setbackBackFt: 5,
    setbackSideFt: 2.5,
    allowsPool: false,
    allowsPatioDeck: true,
    baseBedroomsSingle: 2,
    baseBedroomsDouble: 4,
    baseBathroomsSingle: 3,
    baseBathroomsDouble: 5,
  },
  '10-marla': {
    id: '10-marla',
    label: '10 Marla',
    dimensionsLabel: '35 × 65 ft',
    widthFt: 35,
    depthFt: 65,
    setbackFrontFt: 12,
    setbackBackFt: 6,
    setbackSideFt: 3.5,
    allowsPool: true,
    allowsPatioDeck: true,
    baseBedroomsSingle: 3,
    baseBedroomsDouble: 5,
    baseBathroomsSingle: 3,
    baseBathroomsDouble: 6,
  },
  '1-kanal': {
    id: '1-kanal',
    label: '1 Kanal',
    dimensionsLabel: '50 × 90 ft',
    widthFt: 50,
    depthFt: 90,
    setbackFrontFt: 16,
    setbackBackFt: 9,
    setbackSideFt: 5,
    allowsPool: true,
    allowsPatioDeck: true,
    baseBedroomsSingle: 3,
    baseBedroomsDouble: 6,
    baseBathroomsSingle: 4,
    baseBathroomsDouble: 7,
  },
};

export const FLOOR_OPTIONS: Array<{
  id: FloorConfigId;
  label: string;
  shortLabel: string;
  description: string;
  floorCount: number;
}> = [
  {
    id: 'single',
    label: 'Single Story',
    shortLabel: 'Ground Floor',
    description: 'Accessible single-level living with generous ceiling height.',
    floorCount: 1,
  },
  {
    id: 'double',
    label: 'Double Story',
    shortLabel: 'Ground + First Floor',
    description: 'Two full residential levels with private upper-floor bedrooms.',
    floorCount: 2,
  },
  {
    id: 'double-rooftop',
    label: 'Double + Rooftop Lounge',
    shortLabel: 'Ground + First + Mumty',
    description: 'Two full stories crowned with a shaded rooftop lounge & mumty.',
    floorCount: 3,
  },
];

export const ARCH_STYLES: Array<{
  id: ArchStyleId;
  label: string;
  tagline: string;
  features: string[];
}> = [
  {
    id: 'modern-minimalist',
    label: 'Modern Minimalist',
    tagline: 'Clean cantilevers, flat slabs & recessed floor-to-ceiling glazing',
    features: ['Flat cantilevered roof slabs', 'Recessed full-height glass', 'Vertical wood-slat louvers'],
  },
  {
    id: 'mountain-villa',
    label: 'Mountain Villa',
    tagline: 'Abbottabad-inspired pitched roofs, natural stone & warm timber',
    features: ['Pitched shingle gable roof', 'Stacked mountain stone cladding', 'Warm timber beams & soffits'],
  },
  {
    id: 'contemporary-classic',
    label: 'Contemporary Classic',
    tagline: 'Grand entry portico, decorative cornices & framed arched windows',
    features: ['Grand double-pillar portico', 'Crown cornices & parapet trim', 'Framed & arched windows'],
  },
];

export const WALL_FINISHES: Array<{
  id: WallFinishId;
  label: string;
  hex: string;
  accentHex: string;
}> = [
  { id: 'warm-cream', label: 'Warm Cream', hex: '#F3EFE4', accentHex: '#E0D6C1' },
  { id: 'charcoal-slate', label: 'Charcoal Slate', hex: '#434946', accentHex: '#2F3431' },
  { id: 'sage-olive', label: 'Sage Olive', hex: '#737D68', accentHex: '#555E4B' },
  { id: 'sandstone-beige', label: 'Sandstone Beige', hex: '#D8C7AE', accentHex: '#B9A386' },
  { id: 'pure-white', label: 'Pure White', hex: '#FAFAFA', accentHex: '#E5E7EB' },
];

export const CLADDING_OPTIONS: Array<{
  id: CladdingId;
  label: string;
  hex: string;
  description: string;
}> = [
  { id: 'natural-stone', label: 'Natural Stone', hex: '#8F8578', description: 'Textured Abbottabad ashlar stone' },
  { id: 'cedar-wood', label: 'Cedar Wood Slats', hex: '#9A6338', description: 'Warm vertical cedar battens' },
  { id: 'dark-brick', label: 'Dark Brick', hex: '#5D4037', description: 'Architectural kiln-fired brick' },
  { id: 'none', label: 'No Cladding', hex: '#CBD5E1', description: 'Smooth uniform facade plaster' },
];

export const WINDOW_STYLES: Array<{
  id: WindowStyleId;
  label: string;
  glassHex: string;
  frameHex: string;
  opacity: number;
  hasGrid: boolean;
}> = [
  { id: 'clear-modern', label: 'Clear Modern Glass', glassHex: '#93C5FD', frameHex: '#1F2937', opacity: 0.58, hasGrid: false },
  { id: 'warm-tinted', label: 'Warm Tinted Glass', glassHex: '#475569', frameHex: '#111827', opacity: 0.72, hasGrid: false },
  { id: 'framed-grid', label: 'Framed Grid Windows', glassHex: '#BFDBFE', frameHex: '#F8FAFC', opacity: 0.62, hasGrid: true },
];

export const AMENITIES_META: Array<{
  key: keyof AmenitiesState;
  label: string;
  icon: string;
  requiresLargePlot?: boolean;
  description: string;
}> = [
  { key: 'carPorch', label: 'Covered Car Porch / Garage', icon: 'fa-car', description: 'Shaded driveway canopy at front setback' },
  { key: 'frontLawn', label: 'Front Lawn & Landscaping', icon: 'fa-seedling', description: 'Lush green turf across open courtyard' },
  { key: 'treesAndPathways', label: 'Trees & Pathways', icon: 'fa-tree', description: 'Stepping-stone walkway & ornamental trees' },
  { key: 'balconyRailing', label: 'Balcony / Glass Railing', icon: 'fa-grip-lines', description: 'Tempered glass terrace parapet (2+ floors)' },
  { key: 'boundaryWall', label: 'Perimeter Boundary Wall', icon: 'fa-border-all', description: 'Architectural compound enclosure' },
  { key: 'entranceGate', label: 'Main Entrance Gate', icon: 'fa-door-open', description: 'Modern steel & timber double gate' },
  { key: 'solarPanels', label: 'Rooftop Solar Panels', icon: 'fa-solar-panel', description: 'Angled hybrid photovoltaic array' },
  { key: 'patioDeck', label: 'Outdoor Patio Deck', icon: 'fa-umbrella-beach', requiresLargePlot: true, description: 'Timber lounging deck (7 Marla+)' },
  { key: 'swimmingPool', label: 'Swimming Pool', icon: 'fa-water-ladder', requiresLargePlot: true, description: 'Courtyard plunge pool (10 Marla & 1 Kanal)' },
];

export function isAmenityAllowed(key: keyof AmenitiesState, plotSize: PlotSizeId): boolean {
  const spec = PLOT_SPECS[plotSize];
  if (key === 'swimmingPool') return spec.allowsPool;
  if (key === 'patioDeck') return spec.allowsPatioDeck;
  return true;
}

export function sanitizeConfigForPlot(config: HouseConfig, nextPlotSize: PlotSizeId): HouseConfig {
  const spec = PLOT_SPECS[nextPlotSize];
  return {
    ...config,
    plotSize: nextPlotSize,
    amenities: {
      ...config.amenities,
      swimmingPool: spec.allowsPool ? config.amenities.swimmingPool : false,
      patioDeck: spec.allowsPatioDeck ? config.amenities.patioDeck : false,
    },
  };
}

export const FINISHING_LABELS: Record<FinishingCategoryId, { label: string; tagline: string }> = {
  basic: { label: 'Basic', tagline: 'Standard grey structure & durable finishes' },
  premium: { label: 'Premium', tagline: 'Imported tiles, solid woodwork & modern fixtures' },
  luxury: { label: 'Luxury', tagline: 'Bespoke marble, smart systems & designer facade' },
};

