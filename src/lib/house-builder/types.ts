export type PlotSizeId = '5-marla' | '7-marla' | '10-marla' | '1-kanal';

export type FloorConfigId = 'single' | 'double' | 'double-rooftop';

export type ArchStyleId =
  | 'modern-minimalist'
  | 'mountain-villa'
  | 'contemporary-classic';

export type WallFinishId =
  | 'warm-cream'
  | 'charcoal-slate'
  | 'sage-olive'
  | 'sandstone-beige'
  | 'pure-white';

export type CladdingId =
  | 'natural-stone'
  | 'cedar-wood'
  | 'dark-brick'
  | 'none';

export type WindowStyleId =
  | 'clear-modern'
  | 'warm-tinted'
  | 'framed-grid';

export type FinishingCategoryId = 'basic' | 'premium' | 'luxury';

export type LightingMode = 'daylight' | 'golden-hour';

export type ViewMode = '3d' | 'ground-floor' | 'first-floor' | 'rooftop';

export type CameraPreset = 'front' | 'side' | 'aerial' | 'reset';

export interface AmenitiesState {
  carPorch: boolean;
  frontLawn: boolean;
  treesAndPathways: boolean;
  balconyRailing: boolean;
  boundaryWall: boolean;
  entranceGate: boolean;
  solarPanels: boolean;
  swimmingPool: boolean;
  patioDeck: boolean;
}

export interface HouseConfig {
  plotSize: PlotSizeId;
  isCornerPlot?: boolean;
  floors: FloorConfigId;
  style: ArchStyleId;
  wallFinish: WallFinishId;
  cladding: CladdingId;
  windowStyle: WindowStyleId;
  finishing: FinishingCategoryId;
  amenities: AmenitiesState;
}

export interface PlotSpec {
  id: PlotSizeId;
  label: string;
  dimensionsLabel: string;
  widthFt: number;
  depthFt: number;
  setbackFrontFt: number;
  setbackBackFt: number;
  setbackSideFt: number;
  allowsPool: boolean;
  allowsPatioDeck: boolean;
  baseBedroomsSingle: number;
  baseBedroomsDouble: number;
  baseBathroomsSingle: number;
  baseBathroomsDouble: number;
}

export interface ConstructionRatesConfig {
  currency: 'PKR';
  ratePerSqFt: Record<FinishingCategoryId, { min: number; max: number; label: string; description: string }>;
  amenityFixedCost: {
    carPorch: number;
    frontLawn: number;
    treesAndPathways: number;
    balconyRailing: number;
    boundaryWall: number;
    entranceGate: number;
    solarPanels: number;
    swimmingPool: number;
    patioDeck: number;
  };
}

export interface HouseEstimate {
  plotAreaSqFt: number;
  buildableFootprintSqFt: number;
  groundCoveredSqFt: number;
  firstFloorCoveredSqFt: number;
  rooftopCoveredSqFt: number;
  totalCoveredAreaSqFt: number;
  suggestedBedrooms: number;
  suggestedBathrooms: number;
  minCostPKR: number;
  maxCostPKR: number;
  formattedRangePKR: string;
  disclaimer: string;
}

