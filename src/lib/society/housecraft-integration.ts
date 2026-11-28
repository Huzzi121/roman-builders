import { sanitizeConfigForPlot } from '@/lib/house-builder/configurations';
import { DEFAULT_HOUSE_CONFIG } from '@/lib/house-builder/presets';
import { HouseConfig } from '@/lib/house-builder/types';
import { DEMO_SOCIETY_LAYOUT, getSocietyLayoutById } from './demo-society';
import { PLOT_TYPE_LABELS, SocietyPlot } from './types';

export function resolveSocietyPlot(
  plotId: string,
  layoutId?: string | null
): SocietyPlot | null {
  const layout = getSocietyLayoutById(layoutId);
  return layout.plots.find((p) => p.id === plotId || p.plotNumber === plotId) || null;
}

/**
 * Derives a valid HouseConfig synchronized with a SocietyPlot as the source of truth.
 * Preserves user style/materials if provided, while locking plotSize and corner-plot geometry.
 */
export function buildConfigFromSocietyPlot(
  plot: SocietyPlot,
  baseConfig: HouseConfig = DEFAULT_HOUSE_CONFIG
): HouseConfig {
  const sanitized = sanitizeConfigForPlot(baseConfig, plot.plotSize);
  return {
    ...sanitized,
    isCornerPlot: plot.plotType === 'corner',
  };
}

export function getHouseCraftUrlForPlot(plot: SocietyPlot): string {
  const params = new URLSearchParams({
    societyPlot: plot.id,
    layout: plot.layoutId || DEMO_SOCIETY_LAYOUT.id,
  });
  return `/build-your-house?${params.toString()}`;
}

export function formatSocietyPlotSummaryLines(plot: SocietyPlot): string[] {
  const roadStr = plot.roadConnections
    .map((r) => `${r.roadName} (${r.roadWidth} ft, ${r.side})`)
    .join(' + ');

  return [
    `Society Plot: Plot ${plot.plotNumber} (${plot.block})`,
    `Street: ${plot.street}`,
    `Plot Category: ${PLOT_TYPE_LABELS[plot.plotType]}`,
    `Orientation / Facing: ${plot.orientation}`,
    `Road Access: ${roadStr}`,
    `Building Footprint: ${plot.buildingFootprint.width} × ${plot.buildingFootprint.depth} ft`,
  ];
}

