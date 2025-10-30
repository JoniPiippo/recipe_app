// frontend/src/types/index.ts

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  created_at: string;
  followers_count?: number;
  following_count?: number;
  recipes_count?: number;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  author: User;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  is_saved: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Ingredient {
  id?: number;
  quantity: string;
  unit: string;
  name: string;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon?: string;
  description?: string;
  recipes_count?: number;
}

export interface MealPlan {
  id: number;
  user_id: number;
  week_start: string;
  meals: {
    [day: string]: {
      breakfast?: Recipe;
      lunch?: Recipe;
      dinner?: Recipe;
      snack?: Recipe;
    };
  };
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
  has_more: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface CreateRecipeRequest {
  title: string;
  description: string;
  image_url?: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  category?: string;
  ingredients: Omit<Ingredient, 'id'>[];
  instructions: string[];
  tags: string[];
  published: boolean;
}

export interface UpdateRecipeRequest extends Partial<CreateRecipeRequest> {
  id: number;
}

export interface RecipeFilters {
  skip?: number;
  limit?: number;
  category?: string;
  difficulty?: string;
  search?: string;
  author_id?: number;
  tags?: string[];
}