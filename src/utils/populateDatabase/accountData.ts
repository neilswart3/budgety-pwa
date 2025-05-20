import { Account } from '@/core';

const maaltijdCheques = new Account({
  name: 'MaaltijdCheques',
  amount: 168,
  monthBudget: 168,
  description: 'Lunch allowance from work',
});
const spendingAllowance = new Account({
  name: 'Spending Allowance',
  amount: 400,
  monthBudget: 400,
  description: 'Your own descretionary allowance',
});
const pocketMoney = new Account({
  name: 'Pocket Money',
  amount: 100,
  monthBudget: 100,
  description: 'Own spending that doesnt matter',
});
const emergencyAccount = new Account({
  name: 'Emergency Allowance',
  amount: 2000,
  monthBudget: 0,
  description:
    'For in case of emercencies. To be replenished as soon as possible',
});

export const accounts: Account[] = [
  maaltijdCheques,
  spendingAllowance,
  pocketMoney,
  emergencyAccount,
];
