// frontend/src/lib/constants.ts

export const APP_NAME = 'RecipeShare';
export const APP_DESCRIPTION = 'Share and discover amazing recipes from around the world';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  CREATE: '/create',
  MEAL_PLANS: '/meal-plans',
  PROFILE: '/profile',
  AUTH: '/auth',
  RECIPE: (id: number) => `/recipe/${id}`,
  USER_PROFILE: (id: number) => `/profile/${id}`,
  CATEGORY: (category: string) => `/category/${category}`,
} as const;

export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'hard', label: 'Hard', color: 'red' },
] as const;

export const RECIPE_CATEGORIES = [
  { id: 'breakfast', name: 'Breakfast', icon: 'breakfast_dining' },
  { id: 'lunch', name: 'Lunch', icon: 'lunch_dining' },
  { id: 'dinner', name: 'Dinner', icon: 'dinner_dining' },
  { id: 'dessert', name: 'Desserts', icon: 'cake' },
  { id: 'appetizer', name: 'Appetizers', icon: 'tapas' },
  { id: 'snack', name: 'Snacks', icon: 'local_pizza' },
  { id: 'soup', name: 'Soups', icon: 'ramen_dining' },
  { id: 'salad', name: 'Salads', icon: 'salad' },
  { id: 'beverage', name: 'Beverages', icon: 'local_cafe' },
] as const;

export const DIETARY_PREFERENCES = [
  { id: 'vegetarian', name: 'Vegetarian', icon: 'eco' },
  { id: 'vegan', name: 'Vegan', icon: 'spa' },
  { id: 'gluten-free', name: 'Gluten Free', icon: 'no_food' },
  { id: 'dairy-free', name: 'Dairy Free', icon: 'no_meals' },
  { id: 'low-carb', name: 'Low Carb', icon: 'fitness_center' },
  { id: 'keto', name: 'Keto', icon: 'monitoring_weight' },
] as const;

export const MEASUREMENT_UNITS = [
  // Volume
  'tsp', 'tbsp', 'fl oz', 'cup', 'pint', 'quart', 'gallon', 'ml', 'l',
  // Weight
  'oz', 'lb', 'g', 'kg',
  // Other
  'piece', 'slice', 'pinch', 'dash', 'to taste', 'whole',
] as const;

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const MEAL_TYPES = [
  { id: 'breakfast', name: 'Breakfast', icon: 'breakfast_dining' },
  { id: 'lunch', name: 'Lunch', icon: 'lunch_dining' },
  { id: 'dinner', name: 'Dinner', icon: 'dinner_dining' },
  { id: 'snack', name: 'Snack', icon: 'cookie' },
] as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 50,
} as const;

export const IMAGE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_SERVINGS: 1,
  MAX_SERVINGS: 50,
  MIN_TIME: 1,
  MAX_TIME: 1440, // 24 hours
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please sign in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;

export const SUCCESS_MESSAGES = {
  RECIPE_CREATED: 'Recipe created successfully!',
  RECIPE_UPDATED: 'Recipe updated successfully!',
  RECIPE_DELETED: 'Recipe deleted successfully!',
  COMMENT_ADDED: 'Comment added successfully!',
  COMMENT_DELETED: 'Comment deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!',
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme',
  RECENT_SEARCHES: 'recent_searches',
} as const;

// Social share templates
export const SHARE_TEMPLATES = {
  recipe: (title: string, url: string) => ({
    title: `Check out this recipe: ${title}`,
    text: `I found this amazing recipe on ${APP_NAME}!`,
    url,
  }),
  profile: (name: string, url: string) => ({
    title: `Check out ${name}'s profile on ${APP_NAME}`,
    text: `See all the amazing recipes from ${name}!`,
    url,
  }),
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_MEAL_PLANS: true,
  ENABLE_SOCIAL_LOGIN: false,
  ENABLE_RECIPE_RATINGS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_SHOPPING_LIST: true,
} as const;