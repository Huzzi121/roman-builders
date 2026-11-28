import { HouseConfig } from './types';

export interface ConfigPreset {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  config: HouseConfig;
}

export const CONFIGURATION_PRESETS: ConfigPreset[] = [
  {
    id: 'modern-5-marla',
    title: 'Modern 5 Marla Family Home',
    subtitle: 'Double story minimalist facade with car porch & clean lines',
    badge: '5 Marla',
    config: {
      plotSize: '5-marla',
      floors: 'double',
      style: 'modern-minimalist',
      wallFinish: 'warm-cream',
      cladding: 'cedar-wood',
      windowStyle: 'clear-modern',
      finishing: 'premium',
      amenities: {
        carPorch: true,
        frontLawn: true,
        treesAndPathways: true,
        balconyRailing: true,
        boundaryWall: true,
        entranceGate: true,
        solarPanels: false,
        swimmingPool: false,
        patioDeck: false,
      },
    },
  },
  {
    id: 'premium-10-marla',
    title: 'Premium 10 Marla Villa',
    subtitle: 'Double story + rooftop lounge with patio deck & solar readiness',
    badge: '10 Marla',
    config: {
      plotSize: '10-marla',
      floors: 'double-rooftop',
      style: 'contemporary-classic',
      wallFinish: 'pure-white',
      cladding: 'natural-stone',
      windowStyle: 'framed-grid',
      finishing: 'premium',
      amenities: {
        carPorch: true,
        frontLawn: true,
        treesAndPathways: true,
        balconyRailing: true,
        boundaryWall: true,
        entranceGate: true,
        solarPanels: true,
        swimmingPool: false,
        patioDeck: true,
      },
    },
  },
  {
    id: 'mountain-family-residence',
    title: 'Mountain-Style Family Residence',
    subtitle: 'Abbottabad pitched roof villa with stone cladding & cedar timber',
    badge: '7 Marla',
    config: {
      plotSize: '7-marla',
      floors: 'double',
      style: 'mountain-villa',
      wallFinish: 'sandstone-beige',
      cladding: 'natural-stone',
      windowStyle: 'warm-tinted',
      finishing: 'premium',
      amenities: {
        carPorch: true,
        frontLawn: true,
        treesAndPathways: true,
        balconyRailing: true,
        boundaryWall: true,
        entranceGate: true,
        solarPanels: true,
        swimmingPool: false,
        patioDeck: true,
      },
    },
  },
  {
    id: 'kanal-luxury-residence',
    title: '1 Kanal Luxury Residence',
    subtitle: 'Full estate footprint with pool, patio deck, rooftop lounge & solar',
    badge: '1 Kanal',
    config: {
      plotSize: '1-kanal',
      isCornerPlot: true,
      floors: 'double-rooftop',
      style: 'modern-minimalist',
      wallFinish: 'charcoal-slate',
      cladding: 'cedar-wood',
      windowStyle: 'warm-tinted',
      finishing: 'luxury',
      amenities: {
        carPorch: true,
        frontLawn: true,
        treesAndPathways: true,
        balconyRailing: true,
        boundaryWall: true,
        entranceGate: true,
        solarPanels: true,
        swimmingPool: true,
        patioDeck: true,
      },
    },
  },
];

export const DEFAULT_HOUSE_CONFIG: HouseConfig = CONFIGURATION_PRESETS[1].config;

