import { createSystem, defaultConfig } from '@chakra-ui/react';
import * as mdIcons from 'react-icons/md';

export const themeSystem = createSystem(defaultConfig);
export const themeIcons = mdIcons;

export type ThemeIcon = keyof typeof themeIcons;
