// frontend/src/components/RecipeCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
  onLike?: (recipeId: number) => void;
  onSave?: (recipeId: number) => void;
  showAuthor?: boolean;
}

export default function RecipeCard({ 
  recipe, 
  onLike, 
  onSave,
  showAuthor = true 
}: RecipeCardProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLiking || !onLike) return;
    
    setIsLiking(true);
    await onLike(recipe.id);
    setIsLiking(false);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSaving || !onSave) return;
    
    setIsSaving(true);
    await onSave(recipe.id);
    setIsSaving(false);
  };

  return (
    <article className="flex flex-col rounded-xl overflow-hidden bg-card-dark border border-border-color hover:border-primary/50 transition-all group">
      {/* Image */}
      <Link href={`/recipe/${recipe.id}`}>
        <div className="relative aspect-video overflow-hidden bg-surface-dark">
          {recipe.image_url ? (
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-text-dark-secondary">
                restaurant
              </span>
            </div>
          )}
          
          {/* Difficulty Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
              recipe.difficulty === 'easy' 
                ? 'bg-green-500/90 text-white' 
                : recipe.difficulty === 'medium'
                ? 'bg-yellow-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Author */}
        {showAuthor && (
          <Link 
            href={`/profile/${recipe.author.id}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src={recipe.author.avatar || '/default-avatar.jpg'}
              alt={recipe.author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="text-sm text-text-dark-secondary">{recipe.author.name}</p>
          </Link>
        )}

        {/* Title */}
        <Link href={`/recipe/${recipe.id}`}>
          <h2 className="text-lg font-bold text-text-main hover:text-primary transition-colors line-clamp-2">
            {recipe.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 flex-1">
          {recipe.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-text-dark-secondary">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-base">schedule</span>
            {recipe.prep_time + recipe.cook_time} min
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-base">restaurant</span>
            {recipe.servings} servings
          </span>
        </div>

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 bg-surface-dark text-text-dark-secondary rounded-md text-xs">
                +{recipe.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border-color">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className="flex items-center gap-1 text-text-dark-secondary hover:text-primary transition-colors disabled:opacity-50"
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
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 text-text-main text-sm font-medium transition-all disabled:opacity-50"
          >
            {recipe.is_saved ? (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">bookmark</span>
                Saved
              </span>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

// frontend/src/components/RecipeGrid.tsx
'use client';

import RecipeCard from './RecipeCard';
import type { Recipe } from '@/types';

interface RecipeGridProps {
  recipes: Recipe[];
  loading?: boolean;
  onLike?: (recipeId: number) => void;
  onSave?: (recipeId: number) => void;
  emptyMessage?: string;
}

export function RecipeGrid({ 
  recipes, 
  loading, 
  onLike, 
  onSave,
  emptyMessage = 'No recipes found'
}: RecipeGridProps) {
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-text-secondary">Loading recipes...</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-6xl text-text-dark-secondary mb-4">
          search_off
        </span>
        <p className="text-text-secondary text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onLike={onLike}
          onSave={onSave}
        />
      ))}
    </div>
  );
}