import { CollectionKey } from '@/constants';
import {
  Account,
  AccountController,
  Category,
  CategoryController,
  Occasion,
  OccasionController,
  Saving,
  SavingController,
  SubCategory,
  SubCategoryController,
  Transaction,
} from '@/core';
import { CollectionController } from '@/core/controllers/Collection.Controller';
import { accounts } from './accountData';
import { categories, subCategories } from './categoryData';
import { occasions } from './occasionData';
import { savings } from './savingsData';

export const populateCollection = async (
  Controller: new () => CollectionController,
  data:
    | Account[]
    | Category[]
    | SubCategory[]
    | Occasion[]
    | Transaction[]
    | Saving[]
) => {
  try {
    const instance = new Controller();

    for (const d of data) {
      await instance.create(d);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const populateDatabase = async (key: CollectionKey) => {
  try {
    if (key === CollectionKey.ACCOUNTS) {
      await populateCollection(AccountController, accounts);
    }

    if (key === CollectionKey.CATEGORIES) {
      await populateCollection(CategoryController, categories);
    }

    if (key === CollectionKey.SUB_CATEGORIES) {
      await populateCollection(SubCategoryController, subCategories);
    }

    if (key === CollectionKey.OCCASIONS) {
      await populateCollection(OccasionController, occasions);
    }

    if (key === CollectionKey.SAVINGS) {
      await populateCollection(SavingController, savings);
    }
  } catch (error) {
    console.log('error:', error);
  }
};
