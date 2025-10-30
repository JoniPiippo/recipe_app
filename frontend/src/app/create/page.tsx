// frontend/src/app/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiClient from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}

export default function CreateRecipe() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { quantity: "", unit: "", name: "" },
  ]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
/*
  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/auth");
    return null;
  }
*/
  const addIngredient = () => {
    setIngredients([...ingredients, { quantity: "", unit: "", name: "" }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (published: boolean = true) => {
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (!title || !description || !servings || !prepTime || !cookTime) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Upload image if present
      let imageUrl = "";
      if (image) {
        const uploadResponse = await apiClient.uploadImage(image);
        if (uploadResponse.data) {
          imageUrl = uploadResponse.data.url;
        }
      }

      // Prepare recipe data
      const recipeData = {
        title,
        description,
        servings: parseInt(servings),
        prep_time: parseInt(prepTime),
        cook_time: parseInt(cookTime),
        difficulty,
        category,
        image_url: imageUrl,
        ingredients: ingredients.filter(ing => ing.name.trim()),
        instructions: instructions.filter(inst => inst.trim()),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        published,
      };

      const response = await apiClient.createRecipe(recipeData);
      
      if (response.error) {
        setError(response.error);
      } else {
        router.push(`/recipe/${response.data.id}`);
      }
    } catch (err) {
      setError("Failed to create recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark">
      <div className="absolute inset-0 z-0 food-pattern"></div>
      
      <div className="layout-container flex h-full grow flex-col z-10">
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <h1 className="text-text-main text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                Share Your Culinary Masterpiece
              </h1>
            </div>

            {error && (
              <div className="mx-4 mb-4 bg-red-500/10 border border-red-500/50 rounded-xl p-4">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-8 p-4">
              {/* Recipe Details */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-text-main">Recipe Details</h2>
                <label className="flex flex-col w-full">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Recipe Title *
                  </p>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="e.g., Delicious Chocolate Chip Cookies"
                    required
                  />
                </label>
                <label className="flex flex-col w-full">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Recipe Description *
                  </p>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary min-h-36 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="Share the story behind your recipe..."
                    required
                  />
                </label>
              </div>

              {/* Photo Upload */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-text-main">Photo</h2>
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                    <button
                      onClick={() => {
                        setImage(null);
                        setImagePreview("");
                      }}
                      className="absolute top-4 right-4 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-border-color px-6 py-14 bg-card-dark/20 cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="flex max-w-[480px] flex-col items-center gap-2">
                      <p className="text-text-main text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                        Upload a photo
                      </p>
                      <p className="text-text-secondary text-sm font-normal leading-normal text-center">
                        Drag and drop your image here or click to browse
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-xl">
                      <span className="material-symbols-outlined">upload</span>
                      <span className="text-sm font-bold">Upload</span>
                    </div>
                  </label>
                )}
              </div>

              {/* Recipe Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Servings *
                  </p>
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="4"
                    required
                  />
                </label>
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Prep Time (min) *
                  </p>
                  <input
                    type="number"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="20"
                    required
                  />
                </label>
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Cook Time (min) *
                  </p>
                  <input
                    type="number"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="30"
                    required
                  />
                </label>
              </div>

              {/* Difficulty & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Difficulty
                  </p>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="form-select rounded-xl border border-border-color bg-card-dark text-text-main focus:border-primary focus:ring-0 h-14 px-4"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
                <label className="flex flex-col">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Category
                  </p>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-input rounded-xl border border-border-color bg-card-dark text-text-main focus:border-primary focus:ring-0 h-14 px-4"
                    placeholder="e.g., Dessert, Main Course"
                  />
                </label>
              </div>

              {/* Ingredients */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-text-main">Ingredients</h2>
                <div className="flex flex-col gap-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-end gap-4">
                      <label className="flex flex-col min-w-20 flex-1">
                        {index === 0 && (
                          <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                            Quantity
                          </p>
                        )}
                        <input
                          type="text"
                          value={ingredient.quantity}
                          onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                          className="form-input rounded-xl border border-border-color bg-card-dark text-text-main focus:border-primary focus:ring-0 h-14 px-4"
                          placeholder="1"
                        />
                      </label>
                      <label className="flex flex-col min-w-24 flex-1">
                        {index === 0 && (
                          <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                            Unit
                          </p>
                        )}
                        <input
                          type="text"
                          value={ingredient.unit}
                          onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                          className="form-input rounded-xl border border-border-color bg-card-dark text-text-main focus:border-primary focus:ring-0 h-14 px-4"
                          placeholder="cup"
                        />
                      </label>
                      <label className="flex flex-col min-w-40 flex-1">
                        {index === 0 && (
                          <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                            Ingredient Name
                          </p>
                        )}
                        <input
                          type="text"
                          value={ingredient.name}
                          onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                          className="form-input rounded-xl border border-border-color bg-card-dark text-text-main focus:border-primary focus:ring-0 h-14 px-4"
                          placeholder="All-purpose flour"
                        />
                      </label>
                      {ingredients.length > 1 && (
                        <button
                          onClick={() => removeIngredient(index)}
                          className="flex items-center justify-center rounded-xl h-14 w-14 hover:bg-red-500/20 text-red-400 transition-colors"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addIngredient}
                  className="flex items-center justify-center gap-2 self-start px-4 py-2 rounded-xl bg-primary/20 hover:bg-primary/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span className="text-sm font-bold">Add Ingredient</span>
                </button>
              </div>

              {/* Instructions */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-text-main">Instructions</h2>
                <div className="flex flex-col gap-4">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="text-2xl font-bold text-primary pt-3">
                        {index + 1}.
                      </span>
                      <textarea
                        value={instruction}
                        onChange={(e) => updateInstruction(index, e.target.value)}
                        className="form-textarea flex-1 rounded-xl border border-border-color bg-card-dark text-text-main focus:border-primary focus:ring-0 min-h-24 p-4"
                        placeholder="Describe this step..."
                      />
                      {instructions.length > 1 && (
                        <button
                          onClick={() => removeInstruction(index)}
                          className="flex items-center justify-center rounded-xl h-14 w-14 hover:bg-red-500/20 text-red-400 transition-colors mt-2"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addInstruction}
                  className="flex items-center justify-center gap-2 self-start px-4 py-2 rounded-xl bg-primary/20 hover:bg-primary/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span className="text-sm font-bold">Add Step</span>
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-text-main">Tags</h2>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="form-input rounded-xl border border-border-color bg-card-dark text-text-main focus:border-primary focus:ring-0 h-14 px-4"
                  placeholder="Dessert, Vegan, Quick & Easy (comma-separated)"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-border-color">
                <Link href="/">
                  <button className="px-6 py-3 rounded-xl bg-transparent hover:bg-card-dark text-text-main font-bold transition-colors">
                    Cancel
                  </button>
                </Link>
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-surface-dark hover:bg-surface-dark/70 text-text-main font-bold transition-colors disabled:opacity-50"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSubmit(true)}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-background-dark font-bold transition-colors disabled:opacity-50"
                >
                  {loading ? 'Publishing...' : 'Publish Recipe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}