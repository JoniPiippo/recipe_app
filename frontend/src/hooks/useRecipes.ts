// frontend/src/hooks/useRecipes.ts
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import type { Recipe, RecipeFilters, PaginatedResponse } from '@/types';

export function useRecipes(filters?: RecipeFilters) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadRecipes();
  }, [JSON.stringify(filters)]);

  const loadRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getRecipes(filters);
      
      if (response.error) {
        setError(response.error);
        setRecipes([]);
      } else if (response.data) {
        const data = response.data as PaginatedResponse<Recipe>;
        setRecipes(data.items);
        setTotal(data.total);
        setHasMore(data.has_more);
      }
    } catch (err) {
      setError('Failed to load recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;

    const skip = recipes.length;
    const response = await apiClient.getRecipes({ ...filters, skip });

    if (response.data) {
      const data = response.data as PaginatedResponse<Recipe>;
      setRecipes([...recipes, ...data.items]);
      setHasMore(data.has_more);
    }
  };

  const refresh = () => {
    loadRecipes();
  };

  return { recipes, loading, error, hasMore, total, loadMore, refresh };
}

// frontend/src/hooks/useRecipe.ts
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import type { Recipe } from '@/types';

export function useRecipe(id: number | string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getRecipe(Number(id));
      
      if (response.error) {
        setError(response.error);
        setRecipe(null);
      } else if (response.data) {
        setRecipe(response.data as Recipe);
      }
    } catch (err) {
      setError('Failed to load recipe');
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!recipe) return;

    const wasLiked = recipe.is_liked;
    
    // Optimistic update
    setRecipe({
      ...recipe,
      is_liked: !wasLiked,
      likes_count: wasLiked ? recipe.likes_count - 1 : recipe.likes_count + 1,
    });

    try {
      if (wasLiked) {
        await apiClient.unlikeRecipe(recipe.id);
      } else {
        await apiClient.likeRecipe(recipe.id);
      }
    } catch (err) {
      // Revert on error
      setRecipe({
        ...recipe,
        is_liked: wasLiked,
        likes_count: recipe.likes_count,
      });
    }
  };

  const toggleSave = async () => {
    if (!recipe) return;

    const wasSaved = recipe.is_saved;
    
    // Optimistic update
    setRecipe({
      ...recipe,
      is_saved: !wasSaved,
    });

    try {
      if (wasSaved) {
        await apiClient.unsaveRecipe(recipe.id);
      } else {
        await apiClient.saveRecipe(recipe.id);
      }
    } catch (err) {
      // Revert on error
      setRecipe({
        ...recipe,
        is_saved: wasSaved,
      });
    }
  };

  const refresh = () => {
    loadRecipe();
  };

  return { recipe, loading, error, toggleLike, toggleSave, refresh };
}

// frontend/src/hooks/useComments.ts
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import type { Comment } from '@/types';

export function useComments(recipeId: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadComments();
  }, [recipeId]);

  const loadComments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getComments(recipeId);
      
      if (response.error) {
        setError(response.error);
        setComments([]);
      } else if (response.data) {
        setComments(response.data as Comment[]);
      }
    } catch (err) {
      setError('Failed to load comments');
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string) => {
    try {
      const response = await apiClient.addComment(recipeId, content);
      
      if (response.error) {
        return { error: response.error };
      }
      
      // Reload comments
      await loadComments();
      return { success: true };
    } catch (err) {
      return { error: 'Failed to add comment' };
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const response = await apiClient.deleteComment(recipeId, commentId);
      
      if (response.error) {
        return { error: response.error };
      }
      
      // Remove from local state
      setComments(comments.filter(c => c.id !== commentId));
      return { success: true };
    } catch (err) {
      return { error: 'Failed to delete comment' };
    }
  };

  return { comments, loading, error, addComment, deleteComment, refresh: loadComments };
}