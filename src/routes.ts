import {
  MdCategory,
  MdDashboard,
  MdLocalActivity,
  MdPerson,
  MdReceiptLong,
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
  occurrences: {
    icon: MdLocalActivity,
    label: 'Occurrences',
    slug: 'occurrences',
  },
  accounts: {
    icon: MdWallet,
    label: 'Accounts',
    slug: 'accounts',
  },
  profile: {
    icon: MdPerson,
    label: 'Profile',
    slug: 'profile',
  },
};
