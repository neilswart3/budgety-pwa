import { Occasion } from '@/core';

const demo = new Occasion({
  name: 'Demo Occasion',
  categories: [],
  description: 'A demo thing',
  complete: false,
});

export const occasions = [demo];
