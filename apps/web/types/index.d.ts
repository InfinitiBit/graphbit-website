

declare module 'geist/font/sans' {
  export const GeistSans: {
    variable: string;
  };
}

declare module 'geist/font/mono' {
  export const GeistMono: {
    variable: string;
  };
}

declare module 'lucide-react' {
  import { FC } from 'react';

  interface IconProps {
    className?: string;
    size?: number;
    color?: string;
  }

  export const ArrowRight: FC<IconProps>;
  export const Zap: FC<IconProps>;
  export const Shield: FC<IconProps>;
  export const BarChart3: FC<IconProps>;
  export const Package: FC<IconProps>;
  export const Code: FC<IconProps>;
  export const Users: FC<IconProps>;
  export const Globe: FC<IconProps>;
  export const Sparkles: FC<IconProps>;
  export const Home: FC<IconProps>;
  export const Menu: FC<IconProps>;
  export const X: FC<IconProps>;
  export const MessageSquare: FC<IconProps>;
  export const BarChart: FC<IconProps>;
  export const Filter: FC<IconProps>;
  export const Download: FC<IconProps>;
  export const Star: FC<IconProps>;
  export const Search: FC<IconProps>;
  export const ChevronDown: FC<IconProps>;
  export const Activity: FC<IconProps>;
  export const Clock: FC<IconProps>;
  export const DollarSign: FC<IconProps>;
  export const TrendingUp: FC<IconProps>;
  export const AlertCircle: FC<IconProps>;
  export const CheckCircle: FC<IconProps>;
  export const RefreshCw: FC<IconProps>;
  export const Calendar: FC<IconProps>;
  export const Hash: FC<IconProps>;
  export const Plus: FC<IconProps>;
  export const Check: FC<IconProps>;
}
