import {
  MdCategory,
  MdDashboard,
  MdLocalActivity,
  MdPerson,
  MdReceiptLong,
  MdSavings,
  MdWallet,
} from 'react-icons/md';

export const routeMeta = {
  dashboard: {
    icon: MdDashboard,
    label: 'Dashboard',
    slug: '',
  },
  transactions: {
    icon: MdReceiptLong,
    label: 'Transactions',
    slug: 'transactions',
  },
  categories: {
    icon: MdCategory,
    label: 'Categories',
    slug: 'categories',
  },
  occasions: {
    icon: MdLocalActivity,
    label: 'Occasions',
    slug: 'occasions',
  },
  accounts: {
    icon: MdWallet,
    label: 'Accounts',
    slug: 'accounts',
  },
  savings: {
    icon: MdSavings,
    label: 'Savings',
    slug: 'savings',
  },
  profile: {
    icon: MdPerson,
    label: 'Profile',
    slug: 'profile',
  },
};
