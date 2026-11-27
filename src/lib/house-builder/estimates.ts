import {
  AMENITIES_META,
  ARCH_STYLES,
  CLADDING_OPTIONS,
  FINISHING_LABELS,
  FLOOR_OPTIONS,
  PLOT_SPECS,
  WALL_FINISHES,
  WINDOW_STYLES,
} from './configurations';
import { ConstructionRatesConfig, HouseConfig, HouseEstimate } from './types';

/**
 * Default configurable construction rates (PKR per sq. ft.).
 * Can be overridden at runtime via Supabase or environment configuration without editing UI logic.
 */
export const DEFAULT_CONSTRUCTION_RATES: ConstructionRatesConfig = {
  currency: 'PKR',
  ratePerSqFt: {
    basic: {
      min: 4800,
      max: 5600,
      label: 'Basic',
      description: 'Standard grey structure with reliable local finishing materials.',
    },
    premium: {
      min: 6200,
      max: 7400,
      label: 'Premium',
      description: 'High-grade porcelain tiles, hardwood cabinetry & designer fittings.',
    },
    luxury: {
      min: 8200,
      max: 9800,
      label: 'Luxury',
      description: 'Imported stone/marble, automated smart home readiness & custom joinery.',
    },
  },
  amenityFixedCost: {
    carPorch: 350000,
    frontLawn: 150000,
    treesAndPathways: 180000,
    balconyRailing: 240000,
    boundaryWall: 550000,
    entranceGate: 320000,
    solarPanels: 1150000,
    swimmingPool: 2200000,
    patioDeck: 480000,
  },
};

export const ESTIMATE_DISCLAIMER =
  'This is an indicative estimate only. Final construction costs depend on architectural drawings, structural requirements, material specifications, site conditions and a formal quotation.';

export function formatPKR(amount: number): string {
  if (amount >= 10_000_000) {
    return `PKR ${(amount / 10_000_000).toFixed(2)} Cr`;
  }
  if (amount >= 100_000) {
    return `PKR ${(amount / 100_000).toFixed(1)} Lac`;
  }
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function calculateHouseEstimate(
  config: HouseConfig,
  rates: ConstructionRatesConfig = DEFAULT_CONSTRUCTION_RATES
): HouseEstimate {
  const plot = PLOT_SPECS[config.plotSize];
  const plotAreaSqFt = plot.widthFt * plot.depthFt;

  const buildableWidth = Math.max(12, plot.widthFt - plot.setbackSideFt * 2);
  const buildableDepth = Math.max(16, plot.depthFt - plot.setbackFrontFt - plot.setbackBackFt);
  const buildableFootprintSqFt = Math.round(buildableWidth * buildableDepth);

  const groundCoveredSqFt =
    buildableFootprintSqFt + (config.amenities.carPorch ? Math.round(plot.widthFt * 0.4 * 12) : 0);

  const hasFirstFloor = config.floors === 'double' || config.floors === 'double-rooftop';
  const hasRooftop = config.floors === 'double-rooftop';

  const firstFloorCoveredSqFt = hasFirstFloor ? Math.round(buildableFootprintSqFt * 0.88) : 0;
  const rooftopCoveredSqFt = hasRooftop ? Math.round(buildableFootprintSqFt * 0.28) : 0;

  const totalCoveredAreaSqFt =
    groundCoveredSqFt + firstFloorCoveredSqFt + rooftopCoveredSqFt;

  const rateTier = rates.ratePerSqFt[config.finishing];

  let amenitiesAddOn = 0;
  (Object.keys(config.amenities) as Array<keyof typeof config.amenities>).forEach((key) => {
    if (config.amenities[key]) {
      amenitiesAddOn += rates.amenityFixedCost[key] || 0;
    }
  });

  // Balcony railing only applies meaningfully when upper floor exists
  if (!hasFirstFloor && config.amenities.balconyRailing) {
    amenitiesAddOn -= rates.amenityFixedCost.balconyRailing * 0.5;
  }

  const minCostPKR = Math.round(totalCoveredAreaSqFt * rateTier.min + amenitiesAddOn * 0.9);
  const maxCostPKR = Math.round(totalCoveredAreaSqFt * rateTier.max + amenitiesAddOn * 1.15);

  const suggestedBedrooms = hasFirstFloor ? plot.baseBedroomsDouble : plot.baseBedroomsSingle;
  const suggestedBathrooms = hasFirstFloor ? plot.baseBathroomsDouble : plot.baseBathroomsSingle;

  return {
    plotAreaSqFt,
    buildableFootprintSqFt,
    groundCoveredSqFt,
    firstFloorCoveredSqFt,
    rooftopCoveredSqFt,
    totalCoveredAreaSqFt,
    suggestedBedrooms,
    suggestedBathrooms,
    minCostPKR,
    maxCostPKR,
    formattedRangePKR: `${formatPKR(minCostPKR)} – ${formatPKR(maxCostPKR)}`,
    disclaimer: ESTIMATE_DISCLAIMER,
  };
}

export function formatConfigurationSummary(
  config: HouseConfig,
  estimate: HouseEstimate,
  configRef?: string
): string {
  const plot = PLOT_SPECS[config.plotSize];
  const floor = FLOOR_OPTIONS.find((f) => f.id === config.floors);
  const style = ARCH_STYLES.find((s) => s.id === config.style);
  const wall = WALL_FINISHES.find((w) => w.id === config.wallFinish);
  const cladding = CLADDING_OPTIONS.find((c) => c.id === config.cladding);
  const win = WINDOW_STYLES.find((w) => w.id === config.windowStyle);
  const finish = FINISHING_LABELS[config.finishing];

  const enabledAmenities = AMENITIES_META.filter((a) => config.amenities[a.key]).map((a) => a.label);

  const lines = [
    `Plot Size: ${plot.label} (${plot.dimensionsLabel})`,
    `Floors: ${floor?.label} (${floor?.shortLabel})`,
    `Architectural Style: ${style?.label}`,
    `Exterior Color: ${wall?.label}`,
    `Accent Cladding: ${cladding?.label}`,
    `Window Style: ${win?.label}`,
    `Finishing Category: ${finish.label}`,
    `Selected Amenities: ${enabledAmenities.length > 0 ? enabledAmenities.join(', ') : 'None'}`,
    `Estimated Covered Area: ${estimate.totalCoveredAreaSqFt.toLocaleString()} sq. ft.`,
    `Suggested Layout: ${estimate.suggestedBedrooms} Bedrooms, ${estimate.suggestedBathrooms} Bathrooms`,
  ];

  if (configRef) {
    lines.push(`Configuration Reference: ${configRef}`);
  }

  return lines.join('\n');
}

export const WHATSAPP_QUOTE_NUMBER = '923139986707';

export function buildHouseQuoteWhatsAppUrl(
  config: HouseConfig,
  estimate: HouseEstimate,
  configRef?: string
): string {
  const summary = formatConfigurationSummary(config, estimate, configRef);
  const message = `Assalamualaikum Roman Builders, I designed a custom house on your 3D House Builder and would like to request a formal quotation:\n\n${summary}\n\nPlease share the next steps for architectural drawings and a formal quote.`;
  return `https://wa.me/${WHATSAPP_QUOTE_NUMBER}?text=${encodeURIComponent(message)}`;
}

