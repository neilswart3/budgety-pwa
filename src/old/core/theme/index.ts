import { createSystem, defaultConfig } from '@chakra-ui/react';
import { MdCategory, MdFormatShapes } from 'react-icons/md';
// import * as mdIcons from 'react-icons/md';

export const themeSystem = createSystem(defaultConfig);
// export const themeIcons = mdIcons;
export const themeIcons = {
  MdCategory,
  MdFormatShapes,
};

export type ThemeIcon = keyof typeof themeIcons;
