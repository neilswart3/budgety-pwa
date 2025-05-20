import { Saving } from '@/core';

const houseSavings = new Saving({
  name: 'House Saving',
  color: '#fff',
  amount: 0,
  contributionMonthly: 1000,
  goalAmount: 70000,
  goalDate: new Date('2028-12-31'),
  icon: 'MdHouse',
  description: 'Savings for buying a house',
});

const holiday = new Saving({
  name: 'Holiday Savings',
  icon: 'MdFlight',
  color: '#fff',
  amount: 0,
  contributionMonthly: 1000,
  goalAmount: 12000,
  goalDate: new Date(`${new Date().getFullYear()}-12-31`),
  description: 'Yearly savings towards yearly travel',
});

const emercencySavings = new Saving({
  name: 'Emergency Savings',
  color: '#fff',
  icon: 'MdSavings',
  amount: 9000,
  contributionMonthly: 0,
  goalAmount: 9000,
  description: '3 months salary income for in case of emergencies',
});

export const savings: Saving[] = [houseSavings, holiday, emercencySavings];
