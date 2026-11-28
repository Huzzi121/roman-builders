import { PlotSizeId } from '@/lib/house-builder/types';

export type SocietyPlotType =
  | 'standard'
  | 'corner'
  | 'main-road'
  | 'park-facing'
  | 'side'
  | 'dead-end';

export type RoadType =
  | 'boulevard'
  | 'main'
  | 'secondary'
  | 'residential'
  | 'dead-end';

export interface RoadConnection {
  side: 'North' | 'South' | 'East' | 'West';
  roadWidth: number;
  roadName: string;
}

export interface SocietyPlot {
  id: string;
  plotNumber: string;
  block: string;
  street: string;
  plotSize: PlotSizeId;
  plotSizeLabel: string;
  width: number; // feet
  depth: number; // feet
  position: {
    x: number; // feet relative to society center
    z: number; // feet relative to society center
  };
  rotation: number; // radians, 0 = front faces +Z (South), PI = North, PI/2 = East, -PI/2 = West
  plotType: SocietyPlotType;
  orientation: string; // e.g. "South-East", "North", "West"
  cornerRoadSide?: 'left' | 'right'; // side where secondary street meets corner plot in HouseCraft view
  roadConnections: RoadConnection[];
  buildingFootprint: {
    width: number; // feet
    depth: number; // feet
  };
  houseVariation: number; // 0..6 generic building architecture index
  layoutId: string;
}

export interface SocietyRoad {
  id: string;
  name: string;
  roadType: RoadType;
  x: number; // center X in feet
  z: number; // center Z in feet
  width: number; // road width in feet
  length: number; // road length in feet
  orientation: 'ns' | 'ew';
  hasMedian?: boolean;
  isCulDeSac?: boolean;
}

export interface SocietyPark {
  id: string;
  name: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  hasFountain?: boolean;
  hasGazebo?: boolean;
}

export interface SocietyLandmark {
  id: string;
  name: string;
  subtitle: string;
  kind: 'gate' | 'mosque' | 'commercial' | 'clubhouse';
  x: number;
  z: number;
  width: number;
  depth: number;
  rotation: number;
}

export interface SocietyLayout {
  id: string;
  name: string;
  tagline: string;
  isDemonstration: boolean;
  dimensions: {
    width: number; // feet
    depth: number; // feet
  };
  blocks: string[];
  roads: SocietyRoad[];
  parks: SocietyPark[];
  landmarks: SocietyLandmark[];
  plots: SocietyPlot[];
}

export const PLOT_TYPE_LABELS: Record<SocietyPlotType, string> = {
  standard: 'Standard Plot',
  corner: 'Corner Plot',
  'main-road': 'Main Boulevard / Main Road Plot',
  'park-facing': 'Park-Facing Plot',
  side: 'Side Street Plot',
  'dead-end': 'Dead-End Street Plot',
};

