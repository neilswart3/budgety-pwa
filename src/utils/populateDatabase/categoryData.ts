import { Category, SubCategory } from '@/core';

const food = new Category({
  name: 'Food',
  icon: 'MdRestaurant',
  color: '#f00',
  description: 'Everything food related',
});
const homeFood = new SubCategory({
  name: 'Home Food',
  icon: 'MdFoodBank',
  description: 'Food cooked and eaten at home. Daily consumption.',
  category: food.id,
});
const extraFood = new SubCategory({
  name: 'Extra Food',
  icon: 'MdLunchDining',
  description: 'Food eaten at home.',
  category: food.id,
});
const diningOut = new SubCategory({
  name: 'Dining Out',
  icon: 'MdDinnerDining',
  description: 'Dining out in town.',
  category: food.id,
});
const snacks = new SubCategory({
  name: 'Snacks',
  icon: 'MdIcecream',
  description: 'The little in between snacks.',
  category: food.id,
});
food.subCategories = [homeFood.id, extraFood.id, diningOut.id, snacks.id];

const houseHold = new Category({
  name: 'Household',
  icon: 'MdHouse',
  color: '#0f0',
  description: 'Basics for the household.',
});
const utilities = new SubCategory({
  name: 'Utilities',
  icon: 'MdElectricBolt',
  description: 'Electricity, Water, rent, hidden taxes, etc',
  category: houseHold.id,
});
const insurance = new SubCategory({
  name: 'Insurance',
  icon: 'MdHealthAndSafety',
  description: 'Health insurance, home insurance, family insurance, etc',
  category: houseHold.id,
});
const subscriptions = new SubCategory({
  name: 'Subscriptions',
  icon: 'MdConnectedTv',
  description: 'Streaming, phones, internet etc',
  category: houseHold.id,
});
const rent = new SubCategory({
  name: 'Rent',
  icon: 'MdHomeWork',
  description: 'Monthly rent for the house/apartment',
  category: houseHold.id,
});
const tax = new SubCategory({
  name: 'Tax',
  icon: 'MdGavel',
  description: 'Any tax related payments',
  category: houseHold.id,
});
houseHold.subCategories = [
  utilities.id,
  insurance.id,
  subscriptions.id,
  rent.id,
  tax.id,
];

const holiday = new Category({
  name: 'Holiday',
  icon: 'MdFlight',
  color: '#00f',
  description: 'All things holidays',
});
const holidayTransport = new SubCategory({
  name: 'Transport',
  icon: 'MdTrain',
  description:
    'Flights etc. Main form of transport for getting to the destination.',
  category: holiday.id,
});
const holidayInnerTransport = new SubCategory({
  name: 'Local Transport',
  icon: 'MdCommute',
  description:
    'Transport while in the destination as extras. Impromptu tram ride or train or car.',
  category: holiday.id,
});
const holidayFood = new SubCategory({
  name: 'Main Meals',
  icon: 'MdLunchDining',
  description: 'Our main meals during holidays',
  category: holiday.id,
});
const holidaySnacks = new SubCategory({
  name: 'Snacks',
  icon: 'MdIcecream',
  description: 'The snacks on holiday',
  category: holiday.id,
});
const holidayActivities = new SubCategory({
  name: 'Activities',
  icon: 'MdLocalActivity',
  description: 'Boat trips, museums, etc',
  category: holiday.id,
});

holiday.subCategories = [
  holidayTransport.id,
  holidayInnerTransport.id,
  holidayFood.id,
  holidaySnacks.id,
  holidayActivities.id,
];

const lifestyle = new Category({
  name: 'Lifestyle',
  icon: 'MdAttractions',
  color: '#00f',
  description:
    'Things like sport, snowboarding sessions, drinks with friends, etc',
});
const sport = new SubCategory({
  name: 'Sport',
  icon: 'MdSportsRugby',
  description: 'Any sport activities',
  category: lifestyle.id,
});
const generalActivities = new SubCategory({
  name: 'Activities',
  icon: 'MdNaturePeople',
  description: 'General activities',
  category: lifestyle.id,
});
const hangout = new SubCategory({
  name: 'Hang out',
  icon: 'MdLiquor',
  description: 'Haning out with friends, etc',
  category: lifestyle.id,
});
lifestyle.subCategories = [sport.id, generalActivities.id, hangout.id];

const transport = new Category({
  name: 'Transport',
  icon: 'MdCommute',
  color: '#ff9900',
  description: 'All things transport related',
});

const car = new SubCategory({
  name: 'Car',
  icon: 'MdDirectionsCar',
  description: 'Car related expenses, car wash, charge, fines, etc',
  category: transport.id,
});

const publicTransport = new SubCategory({
  name: 'Public Transport',
  icon: 'MdTrain',
  description: 'Bus, tram, train, etc',
  category: transport.id,
});

transport.subCategories = [car.id, publicTransport.id];

export const categories: Category[] = [
  food,
  houseHold,
  holiday,
  lifestyle,
  transport,
];
export const subCategories: SubCategory[] = [
  homeFood,
  extraFood,
  diningOut,
  snacks,
  utilities,
  insurance,
  subscriptions,
  holidayTransport,
  holidayInnerTransport,
  holidayFood,
  holidaySnacks,
  holidayActivities,
  sport,
  generalActivities,
  hangout,
  tax,
  rent,
  car,
  publicTransport,
];
