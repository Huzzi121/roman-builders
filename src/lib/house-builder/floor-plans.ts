import { PLOT_SPECS } from './configurations';
import { HouseConfig } from './types';

export interface FloorPlanRoom {
  id: string;
  label: string;
  sizeText: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  w: number; // percentage
  h: number; // percentage
  tone: 'living' | 'bedroom' | 'bath' | 'kitchen' | 'circulation' | 'outdoor' | 'garage';
}

export interface FloorPlanData {
  levelTitle: string;
  subtitle: string;
  rooms: FloorPlanRoom[];
}

export function getIllustrativeFloorPlan(
  config: HouseConfig,
  level: 'ground-floor' | 'first-floor' | 'rooftop'
): FloorPlanData {
  const plot = PLOT_SPECS[config.plotSize];
  const isLarge = config.plotSize === '10-marla' || config.plotSize === '1-kanal';
  const isKanal = config.plotSize === '1-kanal';

  if (level === 'ground-floor') {
    const rooms: FloorPlanRoom[] = [
      // Rear open alley
      {
        id: 'rear-alley',
        label: 'Rear Setback',
        sizeText: `${plot.setbackBackFt}' Deep`,
        x: 4,
        y: 4,
        w: 92,
        h: 8,
        tone: 'outdoor',
      },
      // Master / Ground Bedroom(s)
      {
        id: 'gf-bed-1',
        label: 'Master Bedroom',
        sizeText: isKanal ? "16' × 18'" : isLarge ? "14' × 15'" : "12' × 13'",
        x: 6,
        y: 13,
        w: 38,
        h: 28,
        tone: 'bedroom',
      },
      {
        id: 'gf-bath-1',
        label: 'Attached Bath',
        sizeText: isLarge ? "8' × 9'" : "6' × 8'",
        x: 45,
        y: 13,
        w: 16,
        h: 14,
        tone: 'bath',
      },
      {
        id: 'gf-kitchen',
        label: 'Kitchen',
        sizeText: isKanal ? "14' × 16'" : isLarge ? "12' × 13'" : "9' × 11'",
        x: 62,
        y: 13,
        w: 32,
        h: 28,
        tone: 'kitchen',
      },
      {
        id: 'gf-bath-2',
        label: 'Powder / Bath',
        sizeText: "5' × 7'",
        x: 45,
        y: 28,
        w: 16,
        h: 13,
        tone: 'bath',
      },
      // Living & Dining
      {
        id: 'gf-living',
        label: 'TV Lounge / Living',
        sizeText: isKanal ? "20' × 22'" : isLarge ? "16' × 18'" : "13' × 15'",
        x: 6,
        y: 42,
        w: 44,
        h: 28,
        tone: 'living',
      },
      {
        id: 'gf-dining',
        label: isLarge ? 'Drawing & Dining' : 'Drawing Room',
        sizeText: isKanal ? "16' × 18'" : "12' × 14'",
        x: 51,
        y: 42,
        w: 27,
        h: 28,
        tone: 'living',
      },
      {
        id: 'gf-stair',
        label: config.floors === 'single' ? 'Lobby' : 'Staircase Lobby',
        sizeText: "8' × 14'",
        x: 79,
        y: 42,
        w: 15,
        h: 28,
        tone: 'circulation',
      },
    ];

    // Front Setback Zone
    if (config.amenities.frontLawn || config.amenities.swimmingPool || config.amenities.patioDeck) {
      if (config.amenities.swimmingPool && plot.allowsPool) {
        rooms.push({
          id: 'gf-pool',
          label: 'Swimming Pool',
          sizeText: isKanal ? "16' × 10'" : "12' × 8'",
          x: 6,
          y: 72,
          w: 26,
          h: 22,
          tone: 'outdoor',
        });
        rooms.push({
          id: 'gf-lawn',
          label: config.amenities.patioDeck ? 'Lawn & Patio Deck' : 'Front Lawn',
          sizeText: 'Open Courtyard',
          x: 33,
          y: 72,
          w: config.amenities.carPorch ? 28 : 61,
          h: 22,
          tone: 'outdoor',
        });
      } else {
        rooms.push({
          id: 'gf-lawn',
          label: config.amenities.patioDeck
            ? 'Front Lawn & Patio Deck'
            : config.amenities.frontLawn
            ? 'Front Lawn & Entry'
            : 'Front Courtyard',
          sizeText: `${plot.setbackFrontFt}' Setback`,
          x: 6,
          y: 72,
          w: config.amenities.carPorch ? 55 : 88,
          h: 22,
          tone: 'outdoor',
        });
      }
    }

    if (config.amenities.carPorch) {
      rooms.push({
        id: 'gf-porch',
        label: isKanal ? 'Double Car Porch' : 'Covered Car Porch',
        sizeText: isKanal ? "18' × 20'" : "12' × 16'",
        x: 62,
        y: 72,
        w: 32,
        h: 22,
        tone: 'garage',
      });
    }

    return {
      levelTitle: 'Ground Floor Layout (Illustrative)',
      subtitle: `${plot.label} (${plot.dimensionsLabel}) — ${
        config.floors === 'single' ? 'Single Story' : 'Ground Level'
      }`,
      rooms,
    };
  }

  if (level === 'first-floor') {
    const rooms: FloorPlanRoom[] = [
      {
        id: 'ff-bed-1',
        label: 'Bedroom 2 (Suite)',
        sizeText: isKanal ? "16' × 17'" : "13' × 14'",
        x: 6,
        y: 12,
        w: 38,
        h: 30,
        tone: 'bedroom',
      },
      {
        id: 'ff-bath-1',
        label: 'Bath 2',
        sizeText: "7' × 9'",
        x: 45,
        y: 12,
        w: 16,
        h: 15,
        tone: 'bath',
      },
      {
        id: 'ff-bed-2',
        label: 'Bedroom 3',
        sizeText: isKanal ? "15' × 16'" : "12' × 13'",
        x: 62,
        y: 12,
        w: 32,
        h: 30,
        tone: 'bedroom',
      },
      {
        id: 'ff-bath-2',
        label: 'Bath 3',
        sizeText: "6' × 8'",
        x: 45,
        y: 28,
        w: 16,
        h: 14,
        tone: 'bath',
      },
      {
        id: 'ff-lounge',
        label: 'Upper Family Lounge',
        sizeText: isLarge ? "16' × 18'" : "13' × 14'",
        x: 6,
        y: 43,
        w: 44,
        h: 28,
        tone: 'living',
      },
      {
        id: 'ff-bed-3',
        label: isLarge ? 'Bedroom 4 / Study' : 'Kitchenette / Study',
        sizeText: "11' × 13'",
        x: 51,
        y: 43,
        w: 27,
        h: 28,
        tone: isLarge ? 'bedroom' : 'kitchen',
      },
      {
        id: 'ff-stair',
        label: 'Stair Hall',
        sizeText: "8' × 14'",
        x: 79,
        y: 43,
        w: 15,
        h: 28,
        tone: 'circulation',
      },
      {
        id: 'ff-terrace',
        label: config.amenities.balconyRailing ? 'Front Glass Balcony Terrace' : 'Upper Terrace',
        sizeText: 'Open Sit-Out',
        x: 6,
        y: 72,
        w: 88,
        h: 18,
        tone: 'outdoor',
      },
    ];

    return {
      levelTitle: 'First Floor Layout (Illustrative)',
      subtitle: `${plot.label} Upper Level — Private Bedrooms & Terrace`,
      rooms,
    };
  }

  // Rooftop
  const rooms: FloorPlanRoom[] = [
    {
      id: 'rt-terrace',
      label: 'Open Rooftop Terrace',
      sizeText: 'Barbecue & Sky View',
      x: 6,
      y: 14,
      w: 56,
      h: 72,
      tone: 'outdoor',
    },
    {
      id: 'rt-mumty',
      label: 'Rooftop Lounge & Mumty',
      sizeText: isLarge ? "14' × 18'" : "11' × 14'",
      x: 64,
      y: 14,
      w: 30,
      h: 36,
      tone: 'living',
    },
    {
      id: 'rt-store',
      label: 'Utility / Powder',
      sizeText: "7' × 10'",
      x: 64,
      y: 52,
      w: 30,
      h: 16,
      tone: 'circulation',
    },
  ];

  if (config.amenities.solarPanels) {
    rooms.push({
      id: 'rt-solar',
      label: 'Solar Panel Array',
      sizeText: isKanal ? '15 kW Grid-Tied' : '10 kW Hybrid',
      x: 64,
      y: 70,
      w: 30,
      h: 16,
      tone: 'kitchen',
    });
  }

  return {
    levelTitle: 'Rooftop Lounge & Terrace (Illustrative)',
    subtitle: `${plot.label} — Elevated Living & Utilities`,
    rooms,
  };
}

