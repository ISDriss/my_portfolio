import { ThemeColor } from '@/data/projects';

export const colorStyles: Record<
  ThemeColor,
  {
    accent: string;
    pill: { active: string; inactive: string };
    badge: string;
  }
> = {
  purple: {
    accent: 'bg-purple',
    pill: {
      active: 'bg-purple text-white border-purple shadow-lg',
      inactive: 'text-purple border-purple/40 bg-purple/10 hover:bg-purple/15',
    },
    badge: 'text-purple border-purple/40 bg-purple/10',
  },
  green: {
    accent: 'bg-green',
    pill: {
      active: 'bg-green text-white border-green shadow-lg',
      inactive: 'text-green border-green/40 bg-green/10 hover:bg-green/15',
    },
    badge: 'text-green border-green/40 bg-green/10',
  },
  orange: {
    accent: 'bg-orange',
    pill: {
      active: 'bg-orange text-white border-orange shadow-lg',
      inactive: 'text-orange border-orange/40 bg-orange/10 hover:bg-orange/15',
    },
    badge: 'text-orange border-orange/40 bg-orange/10',
  },
  yellow: {
    accent: 'bg-yellow',
    pill: {
      active: 'bg-yellow text-navy border-yellow shadow-lg',
      inactive: 'text-yellow border-yellow/60 bg-yellow/10 hover:bg-yellow/15',
    },
    badge: 'text-yellow border-yellow/60 bg-yellow/10',
  },
};
