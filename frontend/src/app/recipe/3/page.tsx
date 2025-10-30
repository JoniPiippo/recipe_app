// frontend/src/app/recipe/[id]/page.tsx
"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRecipe } from "@/hooks/useRecipe";
import { useComments } from "@/hooks/useComments";
import { LoadingPage, ErrorPage } from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";

export default function RecipeDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const recipeId = parseInt(resolvedParams.id);
  
  const { user } = useAuth();
  const { recipe, loading, error, toggleLike, toggleSave } = useRecipe(recipeId);
  const { comments, addComment, deleteComment, refresh: refreshComments } = useComments(recipeId);
  
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  if (loading) return <LoadingPage message="Loading recipe..." />;
  if (error || !recipe) return <ErrorPage message={error || "Recipe not found"} />;

  const toggleIngredient = (index: number) => {
    if (checkedIngredients.includes(index)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submittingComment) return;

    setSubmittingComment(true);
    const result = await addComment(newComment.trim());
    
    if (result.success) {
      setNewComment("");
      refreshComments();
    }
    setSubmittingComment(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (confirm("Delete this comment?")) {
      await deleteComment(commentId);
    }
  };

  const totalTime = recipe.prep_time + recipe.cook_time;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-text-main">
      <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
        <div className="layout-content-container flex flex-col max-w-6xl flex-1 gap-10">
          {/* Back Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm font-medium text-text-dark-secondary hover:text-primary"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Back to Explore</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column - Image and Details */}
            <div className="flex flex-col gap-6">
              {/* Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-dark">
                {recipe.image_url ? (
                  <Image
                    src={recipe.image_url}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-8xl text-text-dark-secondary">
                      restaurant
                    </span>
                  </div>
                )}
              </div>

              {/* Recipe Header */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap justify-between gap-4 items-start">
                  <div className="flex min-w-72 flex-col gap-2">
                    <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">
                      {recipe.title}
                    </h1>
                    <p className="text-text-dark-secondary text-base font-normal leading-normal">
                      {recipe.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-text-main">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className="material-symbols-outlined text-primary"
                        >
                          {star <= 4 ? "star" : "star_border"}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-medium">({recipe.likes_count} likes)</p>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Link href={`/profile/${recipe.author.id}`}>
                    <Image
                      src={recipe.author.avatar || '/default-avatar.jpg'}
                      alt={recipe.author.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <p className="font-bold">{recipe.author.name}</p>
                    <Link
                      href={`/profile/${recipe.author.id}`}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-start gap-2">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-2 py-2 px-3 rounded-full text-sm font-medium transition-all ${
                    recipe.is_liked
                      ? 'bg-primary/20 text-primary'
                      : 'bg-surface-dark text-text-main hover:bg-surface-dark/70'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {recipe.is_liked ? 'favorite' : 'favorite_border'}
                  </span>
                  <span>{recipe.is_liked ? 'Liked' : 'Like'}</span>
                </button>

                <button className="flex items-center gap-2 bg-surface-dark py-2 px-3 rounded-full text-sm font-medium text-text-main hover:bg-surface-dark/70">
                  <span className="material-symbols-outlined text-lg">share</span>
                  <span>Share</span>
                </button>

                <button
                  onClick={toggleSave}
                  className={`flex items-center gap-2 py-2 px-3 rounded-full text-sm font-medium transition-all ${
                    recipe.is_saved
                      ? 'bg-primary/20 text-primary'
                      : 'bg-surface-dark text-text-main hover:bg-surface-dark/70'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {recipe.is_saved ? 'bookmark' : 'bookmark_border'}
                  </span>
                  <span>{recipe.is_saved ? 'Saved' : 'Save'}</span>
                </button>

                <button className="flex items-center gap-2 bg-surface-dark py-2 px-3 rounded-full text-sm font-medium text-text-main hover:bg-surface-dark/70">
                  <span className="material-symbols-outlined text-lg">print</span>
                  <span>Print</span>
                </button>
              </div>

              {/* Recipe Info Grid */}
              <div className="grid grid-cols-2 border-t border-solid border-t-border-color">
                <div className="flex flex-col gap-1 py-4 pr-2 border-b border-solid border-b-border-color">
                  <p className="text-text-dark-secondary text-sm font-normal leading-normal">
                    Prep time
                  </p>
                  <p className="text-sm font-medium leading-normal">{recipe.prep_time} mins</p>
                </div>
                <div className="flex flex-col gap-1 py-4 pl-2 border-b border-solid border-b-border-color">
                  <p className="text-text-dark-secondary text-sm font-normal leading-normal">
                    Cook time
                  </p>
                  <p className="text-sm font-medium leading-normal">{recipe.cook_time} mins</p>
                </div>
                <div className="flex flex-col gap-1 py-4 pr-2">
                  <p className="text-text-dark-secondary text-sm font-normal leading-normal">
                    Servings
                  </p>
                  <p className="text-sm font-medium leading-normal">{recipe.servings}</p>
                </div>
                <div className="flex flex-col gap-1 py-4 pl-2">
                  <p className="text-text-dark-secondary text-sm font-normal leading-normal">
                    Difficulty
                  </p>
                  <p className="text-sm font-medium leading-normal capitalize">{recipe.difficulty}</p>
                </div>
              </div>

              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Ingredients & Instructions */}
            <div className="flex flex-col gap-8">
              {/* Ingredients */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">Ingredients</h3>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checkedIngredients.includes(index)}
                        onChange={() => toggleIngredient(index)}
                        className="form-checkbox rounded bg-surface-dark border-border-color text-primary focus:ring-primary/50"
                      />
                      <span className="text-base">
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">Instructions</h3>
                <ol className="space-y-4 list-decimal list-inside text-text-main">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-base leading-relaxed">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-solid border-t-border-color pt-10" id="comments">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold">
                Comments ({comments.length})
              </h3>

              {/* Add Comment */}
              {user ? (
                <form onSubmit={handleSubmitComment} className="flex gap-4 items-start">
                  <Image
                    src={user.avatar || '/default-avatar.jpg'}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="form-textarea w-full rounded-xl bg-surface-dark border-none focus:ring-primary/50 placeholder:text-text-dark-secondary text-text-main"
                      placeholder="Add a comment..."
                      rows={3}
                      disabled={submittingComment}
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim() || submittingComment}
                      className="mt-2 px-4 py-2 rounded-xl bg-primary text-background-dark text-sm font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submittingComment ? 'Posting...' : 'Post Comment'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 bg-surface-dark rounded-xl">
                  <p className="text-text-secondary mb-4">Sign in to leave a comment</p>
                  <Link
                    href="/auth"
                    className="inline-block px-6 py-2 rounded-xl bg-primary text-background-dark font-bold hover:bg-primary/90"
                  >
                    Sign In
                  </Link>
                </div>
              )}

              {/* Comments List */}
              <div className="flex flex-col gap-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Image
                      src={comment.author.avatar || '/default-avatar.jpg'}
                      alt={comment.author.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">{comment.author.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-text-dark-secondary">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                          {user?.id === comment.author.id && (
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="mt-1 text-text-main">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}