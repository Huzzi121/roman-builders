import { PLOT_SPECS } from '@/lib/house-builder/configurations';
import { PlotSizeId } from '@/lib/house-builder/types';
import {
  RoadConnection,
  SocietyLandmark,
  SocietyLayout,
  SocietyPark,
  SocietyPlot,
  SocietyPlotType,
  SocietyRoad,
} from './types';

export const DEMO_LAYOUT_ID = 'roman-hillview-demo';

function createPlot(params: {
  id: string;
  plotNumber: string;
  block: string;
  street: string;
  plotSize: PlotSizeId;
  x: number;
  z: number;
  rotation: number;
  plotType: SocietyPlotType;
  orientation: string;
  cornerRoadSide?: 'left' | 'right';
  roadConnections: RoadConnection[];
  houseVariation: number;
}): SocietyPlot {
  const spec = PLOT_SPECS[params.plotSize];
  const footprintW = Math.max(16, spec.widthFt - (params.plotType === 'corner' ? 5 : spec.setbackSideFt * 2));
  const footprintD = Math.max(22, spec.depthFt - spec.setbackFrontFt - spec.setbackBackFt);

  return {
    id: params.id,
    plotNumber: params.plotNumber,
    block: params.block,
    street: params.street,
    plotSize: params.plotSize,
    plotSizeLabel: spec.label,
    width: spec.widthFt,
    depth: spec.depthFt,
    position: { x: params.x, z: params.z },
    rotation: params.rotation,
    plotType: params.plotType,
    orientation: params.orientation,
    cornerRoadSide: params.cornerRoadSide,
    roadConnections: params.roadConnections,
    buildingFootprint: {
      width: footprintW,
      depth: footprintD,
    },
    houseVariation: params.houseVariation % 7,
    layoutId: DEMO_LAYOUT_ID,
  };
}

/**
 * Clean, collision-free demonstration master plan (units in feet, centered at 0,0)
 * Society dimensions: 700 ft wide (-350..+350) x 580 ft deep (-290..+290)
 */
const ROADS: SocietyRoad[] = [
  {
    id: 'main-boulevard',
    name: 'Roman Grand Boulevard',
    roadType: 'boulevard',
    x: 0,
    z: 10,
    width: 80, // -40 .. +40
    length: 550, // -265 .. +285
    orientation: 'ns',
    hasMedian: true,
  },
  {
    id: 'main-cross-avenue',
    name: 'Central Avenue',
    roadType: 'main',
    x: 0,
    z: 40, // +15 .. +65
    width: 50,
    length: 620, // -310 .. +310
    orientation: 'ew',
  },
  {
    id: 'south-avenue',
    name: 'South Park Road',
    roadType: 'secondary',
    x: 0,
    z: 196, // +176 .. +216
    width: 40,
    length: 620,
    orientation: 'ew',
  },
  {
    id: 'north-avenue',
    name: 'North Crest Avenue',
    roadType: 'secondary',
    x: 0,
    z: -195, // -215 .. -175
    width: 40,
    length: 620,
    orientation: 'ew',
  },
  {
    id: 'street-01',
    name: 'Street 01',
    roadType: 'residential',
    x: -165, // -182.5 .. -147.5
    z: 0,
    width: 35,
    length: 410,
    orientation: 'ns',
  },
  {
    id: 'west-ring-road',
    name: 'West Perimeter Street',
    roadType: 'secondary',
    x: -295, // -310 .. -280
    z: 0,
    width: 30,
    length: 410,
    orientation: 'ns',
  },
  {
    id: 'street-02',
    name: 'Street 02',
    roadType: 'residential',
    x: 165, // +147.5 .. +182.5
    z: 0,
    width: 35,
    length: 410,
    orientation: 'ns',
  },
  {
    id: 'east-ring-road',
    name: 'East Perimeter Street',
    roadType: 'secondary',
    x: 295, // +280 .. +310
    z: 0,
    width: 30,
    length: 410,
    orientation: 'ns',
  },
  {
    id: 'street-05-culdesac',
    name: 'Street 05 (Cul-de-Sac)',
    roadType: 'dead-end',
    x: 230,
    z: -72, // -87 .. -57
    width: 30,
    length: 95, // +182.5 .. +277.5
    orientation: 'ew',
    isCulDeSac: true,
  },
];

const PARKS: SocietyPark[] = [
  {
    id: 'central-emerald-park',
    name: 'Central Emerald Park',
    x: -94,
    z: -50,
    width: 102, // -145 .. -43
    depth: 94,  // -97 .. -3
    hasFountain: true,
    hasGazebo: true,
  },
  {
    id: 'north-vista-lawn',
    name: 'North Green Belt',
    x: 110,
    z: -248,
    width: 118,
    depth: 44,
    hasFountain: false,
    hasGazebo: true,
  },
];

const LANDMARKS: SocietyLandmark[] = [
  {
    id: 'main-entrance-gate',
    name: 'Grand Entrance & Security Gate',
    subtitle: 'Roman Hillview Main Portal',
    kind: 'gate',
    x: 0,
    z: 274,
    width: 96,
    depth: 22,
    rotation: 0,
  },
  {
    id: 'jamia-mosque',
    name: 'Jamia Masjid Al-Noor',
    subtitle: 'Central Community Mosque',
    kind: 'mosque',
    x: -94,
    z: -136,
    width: 84,
    depth: 56,
    rotation: Math.PI / 2,
  },
  {
    id: 'roman-commercial-square',
    name: 'Roman Commercial Square',
    subtitle: 'Retail & Business Arcade',
    kind: 'commercial',
    x: 104,
    z: 244,
    width: 96,
    depth: 38,
    rotation: Math.PI,
  },
  {
    id: 'community-clubhouse',
    name: 'Hillview Community Clubhouse',
    subtitle: 'Resident Lounge & Fitness',
    kind: 'clubhouse',
    x: -104,
    z: 244,
    width: 90,
    depth: 38,
    rotation: Math.PI,
  },
];

const PLOTS: SocietyPlot[] = [
  // BLOCK A — Quadrant A1: x in [-147.5, -40], z in [65, 176]
  createPlot({
    id: 'A-101',
    plotNumber: 'A-101',
    block: 'Block A',
    street: 'Roman Grand Boulevard',
    plotSize: '7-marla',
    x: -57,
    z: 93,
    rotation: Math.PI,
    plotType: 'corner',
    orientation: 'North-East',
    cornerRoadSide: 'left',
    roadConnections: [
      { side: 'North', roadWidth: 50, roadName: 'Central Avenue' },
      { side: 'East', roadWidth: 80, roadName: 'Roman Grand Boulevard' },
    ],
    houseVariation: 0,
  }),
  createPlot({
    id: 'A-102',
    plotNumber: 'A-102',
    block: 'Block A',
    street: 'Central Avenue',
    plotSize: '5-marla',
    x: -94,
    z: 90,
    rotation: Math.PI,
    plotType: 'main-road',
    orientation: 'North',
    roadConnections: [{ side: 'North', roadWidth: 50, roadName: 'Central Avenue' }],
    houseVariation: 1,
  }),
  createPlot({
    id: 'A-103',
    plotNumber: 'A-103',
    block: 'Block A',
    street: 'Street 01',
    plotSize: '7-marla',
    x: -130,
    z: 93,
    rotation: Math.PI,
    plotType: 'corner',
    orientation: 'North-West',
    cornerRoadSide: 'right',
    roadConnections: [
      { side: 'North', roadWidth: 50, roadName: 'Central Avenue' },
      { side: 'West', roadWidth: 35, roadName: 'Street 01' },
    ],
    houseVariation: 2,
  }),
  createPlot({
    id: 'A-104',
    plotNumber: 'A-104',
    block: 'Block A',
    street: 'Roman Grand Boulevard',
    plotSize: '7-marla',
    x: -57,
    z: 148,
    rotation: 0,
    plotType: 'corner',
    orientation: 'South-East',
    cornerRoadSide: 'right',
    roadConnections: [
      { side: 'South', roadWidth: 40, roadName: 'South Park Road' },
      { side: 'East', roadWidth: 80, roadName: 'Roman Grand Boulevard' },
    ],
    houseVariation: 3,
  }),
  createPlot({
    id: 'A-105',
    plotNumber: 'A-105',
    block: 'Block A',
    street: 'South Park Road',
    plotSize: '5-marla',
    x: -94,
    z: 151,
    rotation: 0,
    plotType: 'standard',
    orientation: 'South',
    roadConnections: [{ side: 'South', roadWidth: 40, roadName: 'South Park Road' }],
    houseVariation: 4,
  }),
  createPlot({
    id: 'A-106',
    plotNumber: 'A-106',
    block: 'Block A',
    street: 'Street 01',
    plotSize: '7-marla',
    x: -130,
    z: 148,
    rotation: 0,
    plotType: 'corner',
    orientation: 'South-West',
    cornerRoadSide: 'left',
    roadConnections: [
      { side: 'South', roadWidth: 40, roadName: 'South Park Road' },
      { side: 'West', roadWidth: 35, roadName: 'Street 01' },
    ],
    houseVariation: 5,
  }),

  // BLOCK A — Quadrant A2: x in [-280, -182.5] (97.5 ft wide), z in [65, 176]
  createPlot({
    id: 'A-107',
    plotNumber: 'A-107',
    block: 'Block A',
    street: 'Street 01',
    plotSize: '5-marla',
    x: -207,
    z: 90,
    rotation: Math.PI / 2,
    plotType: 'side',
    orientation: 'East',
    roadConnections: [{ side: 'East', roadWidth: 35, roadName: 'Street 01' }],
    houseVariation: 6,
  }),
  createPlot({
    id: 'A-108',
    plotNumber: 'A-108',
    block: 'Block A',
    street: 'West Perimeter Street',
    plotSize: '5-marla',
    x: -256,
    z: 90,
    rotation: -Math.PI / 2,
    plotType: 'side',
    orientation: 'West',
    roadConnections: [{ side: 'West', roadWidth: 30, roadName: 'West Perimeter Street' }],
    houseVariation: 0,
  }),
  createPlot({
    id: 'A-109',
    plotNumber: 'A-109',
    block: 'Block A',
    street: 'Street 01',
    plotSize: '5-marla',
    x: -207,
    z: 148,
    rotation: Math.PI / 2,
    plotType: 'side',
    orientation: 'East',
    roadConnections: [{ side: 'East', roadWidth: 35, roadName: 'Street 01' }],
    houseVariation: 1,
  }),
  createPlot({
    id: 'A-110',
    plotNumber: 'A-110',
    block: 'Block A',
    street: 'South Park Road',
    plotSize: '5-marla',
    x: -256,
    z: 151,
    rotation: 0,
    plotType: 'standard',
    orientation: 'South',
    roadConnections: [{ side: 'South', roadWidth: 40, roadName: 'South Park Road' }],
    houseVariation: 2,
  }),

  // BLOCK A — Park-Facing Plots across Street 01 from Central Emerald Park
  createPlot({
    id: 'A-111',
    plotNumber: 'A-111',
    block: 'Block A',
    street: 'Street 01',
    plotSize: '7-marla',
    x: -210,
    z: -24,
    rotation: Math.PI / 2,
    plotType: 'park-facing',
    orientation: 'East (Park View)',
    roadConnections: [{ side: 'East', roadWidth: 35, roadName: 'Street 01' }],
    houseVariation: 3,
  }),
  createPlot({
    id: 'A-112',
    plotNumber: 'A-112',
    block: 'Block A',
    street: 'Street 01',
    plotSize: '7-marla',
    x: -210,
    z: -62,
    rotation: Math.PI / 2,
    plotType: 'park-facing',
    orientation: 'East (Park View)',
    roadConnections: [{ side: 'East', roadWidth: 35, roadName: 'Street 01' }],
    houseVariation: 4,
  }),
  createPlot({
    id: 'A-113',
    plotNumber: 'A-113',
    block: 'Block A',
    street: 'Street 01',
    plotSize: '7-marla',
    x: -210,
    z: -100,
    rotation: Math.PI / 2,
    plotType: 'park-facing',
    orientation: 'East (Park View)',
    roadConnections: [{ side: 'East', roadWidth: 35, roadName: 'Street 01' }],
    houseVariation: 5,
  }),
  createPlot({
    id: 'A-114',
    plotNumber: 'A-114',
    block: 'Block A',
    street: 'North Crest Avenue',
    plotSize: '5-marla',
    x: -210,
    z: -150,
    rotation: Math.PI,
    plotType: 'standard',
    orientation: 'North',
    roadConnections: [{ side: 'North', roadWidth: 40, roadName: 'North Crest Avenue' }],
    houseVariation: 6,
  }),

  // BLOCK B — Executive Sector (10 Marla & 1 Kanal)
  createPlot({
    id: 'B-201',
    plotNumber: 'B-201',
    block: 'Block B',
    street: 'Roman Grand Boulevard',
    plotSize: '1-kanal',
    x: 87,
    z: 96,
    rotation: -Math.PI / 2, // 90ft along X [42..132], 50ft along Z [71..121]
    plotType: 'corner',
    orientation: 'West-North',
    cornerRoadSide: 'right',
    roadConnections: [
      { side: 'West', roadWidth: 80, roadName: 'Roman Grand Boulevard' },
      { side: 'North', roadWidth: 50, roadName: 'Central Avenue' },
    ],
    houseVariation: 0,
  }),
  createPlot({
    id: 'B-202',
    plotNumber: 'B-202',
    block: 'Block B',
    street: 'South Park Road',
    plotSize: '10-marla',
    x: 87,
    z: 151,
    rotation: 0,
    plotType: 'standard',
    orientation: 'South',
    roadConnections: [{ side: 'South', roadWidth: 40, roadName: 'South Park Road' }],
    houseVariation: 1,
  }),

  // BLOCK B — Boulevard Grand Estates (North of Central Ave)
  createPlot({
    id: 'B-203',
    plotNumber: 'B-203',
    block: 'Block B',
    street: 'Roman Grand Boulevard',
    plotSize: '1-kanal',
    x: 87,
    z: -24,
    rotation: -Math.PI / 2,
    plotType: 'main-road',
    orientation: 'West',
    roadConnections: [{ side: 'West', roadWidth: 80, roadName: 'Roman Grand Boulevard' }],
    houseVariation: 2,
  }),
  createPlot({
    id: 'B-204',
    plotNumber: 'B-204',
    block: 'Block B',
    street: 'Roman Grand Boulevard',
    plotSize: '1-kanal',
    x: 87,
    z: -82,
    rotation: -Math.PI / 2,
    plotType: 'main-road',
    orientation: 'West',
    roadConnections: [{ side: 'West', roadWidth: 80, roadName: 'Roman Grand Boulevard' }],
    houseVariation: 3,
  }),
  createPlot({
    id: 'B-205',
    plotNumber: 'B-205',
    block: 'Block B',
    street: 'Roman Grand Boulevard',
    plotSize: '10-marla',
    x: 62,
    z: -140,
    rotation: Math.PI,
    plotType: 'corner',
    orientation: 'North-West',
    cornerRoadSide: 'left',
    roadConnections: [
      { side: 'North', roadWidth: 40, roadName: 'North Crest Avenue' },
      { side: 'West', roadWidth: 80, roadName: 'Roman Grand Boulevard' },
    ],
    houseVariation: 4,
  }),
  createPlot({
    id: 'B-206',
    plotNumber: 'B-206',
    block: 'Block B',
    street: 'Street 02',
    plotSize: '10-marla',
    x: 118,
    z: -140,
    rotation: Math.PI,
    plotType: 'standard',
    orientation: 'North',
    roadConnections: [{ side: 'North', roadWidth: 40, roadName: 'North Crest Avenue' }],
    houseVariation: 5,
  }),

  // BLOCK B — East Wing (x in [182.5, 280], z in [65, 176])
  createPlot({
    id: 'B-207',
    plotNumber: 'B-207',
    block: 'Block B',
    street: 'Central Avenue',
    plotSize: '10-marla',
    x: 204,
    z: 100,
    rotation: Math.PI,
    plotType: 'corner',
    orientation: 'North-West',
    cornerRoadSide: 'left',
    roadConnections: [
      { side: 'North', roadWidth: 50, roadName: 'Central Avenue' },
      { side: 'West', roadWidth: 35, roadName: 'Street 02' },
    ],
    houseVariation: 6,
  }),
  createPlot({
    id: 'B-208',
    plotNumber: 'B-208',
    block: 'Block B',
    street: 'Central Avenue',
    plotSize: '10-marla',
    x: 254,
    z: 100,
    rotation: Math.PI,
    plotType: 'main-road',
    orientation: 'North',
    roadConnections: [{ side: 'North', roadWidth: 50, roadName: 'Central Avenue' }],
    houseVariation: 0,
  }),

  // Dead-End Cul-de-Sac Street Plots (Street 05 z=-72 [-87..-57])
  createPlot({
    id: 'B-209',
    plotNumber: 'B-209',
    block: 'Block B',
    street: 'Street 05 (Cul-de-Sac)',
    plotSize: '7-marla',
    x: 230,
    z: -24,
    rotation: Math.PI, // Faces North toward Street 05
    plotType: 'dead-end',
    orientation: 'North',
    roadConnections: [{ side: 'North', roadWidth: 30, roadName: 'Street 05 (Cul-de-Sac)' }],
    houseVariation: 1,
  }),
  createPlot({
    id: 'B-210',
    plotNumber: 'B-210',
    block: 'Block B',
    street: 'Street 05 (Cul-de-Sac)',
    plotSize: '7-marla',
    x: 230,
    z: -116,
    rotation: 0, // Faces South toward Street 05
    plotType: 'dead-end',
    orientation: 'South',
    roadConnections: [{ side: 'South', roadWidth: 30, roadName: 'Street 05 (Cul-de-Sac)' }],
    houseVariation: 2,
  }),
  createPlot({
    id: 'B-211',
    plotNumber: 'B-211',
    block: 'Block B',
    street: 'North Crest Avenue',
    plotSize: '10-marla',
    x: 230,
    z: -250,
    rotation: 0, // Faces South onto North Crest Ave ([-282.5 .. -217.5]) beside North Green Belt
    plotType: 'park-facing',
    orientation: 'South (Green Belt View)',
    roadConnections: [{ side: 'South', roadWidth: 40, roadName: 'North Crest Avenue' }],
    houseVariation: 3,
  }),
];

export const DEMO_SOCIETY_LAYOUT: SocietyLayout = {
  id: DEMO_LAYOUT_ID,
  name: 'Roman Hillview Enclave (Demo Master Plan)',
  tagline: 'Demonstration 3D Society Layout — Explore streets, parks, landmarks & customize your dream plot',
  isDemonstration: true,
  dimensions: {
    width: 700,
    depth: 580,
  },
  blocks: ['Block A', 'Block B'],
  roads: ROADS,
  parks: PARKS,
  landmarks: LANDMARKS,
  plots: PLOTS,
};

export function getSocietyLayoutById(layoutId?: string | null): SocietyLayout {
  if (!layoutId || layoutId === DEMO_LAYOUT_ID) {
    return DEMO_SOCIETY_LAYOUT;
  }
  return DEMO_SOCIETY_LAYOUT;
}
