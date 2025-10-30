// frontend/src/app/explore/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/api';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  is_saved: boolean;
}

export default function Explore() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Recipes', icon: 'restaurant' },
    { id: 'breakfast', name: 'Breakfast', icon: 'breakfast_dining' },
    { id: 'lunch', name: 'Lunch', icon: 'lunch_dining' },
    { id: 'dinner', name: 'Dinner', icon: 'dinner_dining' },
    { id: 'dessert', name: 'Desserts', icon: 'cake' },
    { id: 'vegetarian', name: 'Vegetarian', icon: 'eco' },
    { id: 'vegan', name: 'Vegan', icon: 'spa' },
  ];

  useEffect(() => {
    loadRecipes();
  }, [selectedCategory, searchQuery]);

  const loadRecipes = async () => {
    setLoading(true);
    const params: any = { limit: 20 };
    if (selectedCategory !== 'all') {
      params.category = selectedCategory;
    }
    if (searchQuery) {
      params.search = searchQuery;
    }

    const response = await apiClient.getRecipes(params);
    if (response.data) {
      setRecipes(response.data as Recipe[]);
    }
    setLoading(false);
  };

  const handleLike = async (recipeId: number) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    if (recipe.is_liked) {
      await apiClient.unlikeRecipe(recipeId);
    } else {
      await apiClient.likeRecipe(recipeId);
    }

    setRecipes(recipes.map(r =>
      r.id === recipeId
        ? { ...r, is_liked: !r.is_liked, likes_count: r.is_liked ? r.likes_count - 1 : r.likes_count + 1 }
        : r
    ));
  };

  const handleSave = async (recipeId: number) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    if (recipe.is_saved) {
      await apiClient.unsaveRecipe(recipeId);
    } else {
      await apiClient.saveRecipe(recipeId);
    }

    setRecipes(recipes.map(r =>
      r.id === recipeId ? { ...r, is_saved: !r.is_saved } : r
    ));
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="px-4 md:px-20 lg:px-40 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-text-main mb-2">Explore Recipes</h1>
          <p className="text-text-secondary">Discover delicious recipes from our community</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex w-full max-w-xl items-stretch rounded-xl h-12 bg-surface-dark">
            <div className="text-text-dark-secondary flex items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex w-full min-w-0 flex-1 bg-transparent border-none text-text-main focus:outline-0 focus:ring-0 placeholder:text-text-dark-secondary px-4 text-base"
              placeholder="Search recipes..."
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-background-dark'
                    : 'bg-surface-dark text-text-main hover:bg-surface-dark/70'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-text-dark-secondary mb-4">search_off</span>
            <p className="text-text-secondary text-lg">No recipes found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <article
                key={recipe.id}
                className="flex flex-col rounded-xl overflow-hidden bg-card-dark border border-border-color hover:border-primary/50 transition-all group"
              >
                <Link href={`/recipe/${recipe.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={recipe.image_url || '/placeholder-recipe.jpg'}
                      alt={recipe.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-4 flex flex-col gap-3">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <Image
                      src={recipe.author.avatar || '/default-avatar.jpg'}
                      alt={recipe.author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <p className="text-sm text-text-dark-secondary">{recipe.author.name}</p>
                  </div>

                  {/* Title */}
                  <Link href={`/recipe/${recipe.id}`}>
                    <h2 className="text-lg font-bold text-text-main hover:text-primary transition-colors">
                      {recipe.title}
                    </h2>
                  </Link>

                  {/* Description */}
                  <p className="text-sm text-text-secondary line-clamp-2">{recipe.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-text-dark-secondary">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">schedule</span>
                      {recipe.prep_time + recipe.cook_time} min
                    </span>
                    <span className="capitalize">{recipe.difficulty}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-border-color">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLike(recipe.id)}
                        className="flex items-center gap-1 text-text-dark-secondary hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {recipe.is_liked ? 'favorite' : 'favorite_border'}
                        </span>
                        <span className="text-sm">{recipe.likes_count}</span>
                      </button>
                      <Link
                        href={`/recipe/${recipe.id}#comments`}
                        className="flex items-center gap-1 text-text-dark-secondary hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">chat_bubble_outline</span>
                        <span className="text-sm">{recipe.comments_count}</span>
                      </Link>
                    </div>
                    <button
                      onClick={() => handleSave(recipe.id)}
                      className="px-4 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 text-text-main text-sm font-medium transition-all"
                    >
                      {recipe.is_saved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}