import {createContext} from 'react';
import type Animated from 'react-native-reanimated';
import type {CONTEXT_MENU_STATE} from '../constants';
import type {MenuInternalProps} from '../components/menu/types';

export type Color =
  | `rgba(${string}`
  | `rgb(${string})`
  | `hsl(${string})`
  | `hsla(${string})`
  | `#${string}`;

export type InternalContextType = {
  state: Animated.SharedValue<CONTEXT_MENU_STATE>;
  theme: Animated.SharedValue<'light' | 'dark'>;
  menuProps: Animated.SharedValue<MenuInternalProps>;
  menuBgColors?: {
    light: Color;
    dark: Color;
  };
  safeAreaInsets?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

// @ts-ignore
export const InternalContext = createContext<InternalContextType>();
