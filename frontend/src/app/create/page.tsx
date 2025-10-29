"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateRecipe() {
  const [ingredients, setIngredients] = useState([
    { quantity: "", unit: "", name: "" },
  ]);
  const [instructions, setInstructions] = useState([""]);

  const addIngredient = () => {
    setIngredients([...ingredients, { quantity: "", unit: "", name: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark">
      <div className="absolute inset-0 z-0 food-pattern"></div>
      
      <div className="layout-container flex h-full grow flex-col z-10">
        <header className="flex h-20 items-center justify-between gap-4 px-4 md:px-20 lg:px-40 border-b border-border-color bg-background-dark/80 backdrop-blur-sm sticky top-0">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl text-primary">
              lunch_dining
            </span>
            <span className="text-xl font-bold text-text-main">RecipeShare</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-transparent text-text-main text-sm font-bold leading-normal tracking-[0.015em] hover:bg-card-dark">
                <span className="truncate">Cancel</span>
              </button>
            </Link>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
              <span className="truncate">Save Recipe</span>
            </button>
          </div>
        </header>

        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <h1 className="text-text-main text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                Share Your Culinary Masterpiece
              </h1>
            </div>

            <div className="flex flex-col gap-8 p-4">
              {/* Recipe Details */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-text-main">Recipe Details</h2>
                <label className="flex flex-col w-full">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Recipe Title
                  </p>
                  <input
                    type="text"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="e.g., Delicious Chocolate Chip Cookies"
                  />
                </label>
                <label className="flex flex-col w-full">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Recipe Description
                  </p>
                  <textarea
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary min-h-36 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="Share the story behind your recipe..."
                  />
                </label>
              </div>

              {/* Photo Upload */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-text-main">Photo</h2>
                <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-border-color px-6 py-14 bg-card-dark/20">
                  <div className="flex max-w-[480px] flex-col items-center gap-2">
                    <p className="text-text-main text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                      Upload a photo
                    </p>
                    <p className="text-text-secondary text-sm font-normal leading-normal text-center">
                      Drag and drop your image here or click to browse
                    </p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary/20 hover:bg-primary/30 text-text-main text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Upload</span>
                  </button>
                </div>
              </div>

              {/* Recipe Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Servings
                  </p>
                  <input
                    type="text"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="e.g., 4"
                  />
                </label>
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Prep Time
                  </p>
                  <input
                    type="text"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="e.g., 20 minutes"
                  />
                </label>
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Cook Time
                  </p>
                  <input
                    type="text"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="e.g., 30 minutes"
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
                        <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                          Quantity
                        </p>
                        <input
                          type="text"
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                          placeholder="e.g., 1"
                        />
                      </label>
                      <label className="flex flex-col min-w-24 flex-1">
                        <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                          Unit
                        </p>
                        <input
                          type="text"
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                          placeholder="e.g., cup"
                        />
                      </label>
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                          Ingredient Name
                        </p>
                        <input
                          type="text"
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                          placeholder="e.g., All-purpose flour"
                        />
                      </label>
                      {ingredients.length > 1 && (
                        <button
                          onClick={() => removeIngredient(index)}
                          className="flex items-center justify-center rounded-xl h-14 w-14 bg-transparent text-text-main hover:bg-card-dark"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addIngredient}
                  className="flex items-center justify-center gap-2 self-start min-w-[84px] max-w-[480px] cursor-pointer overflow-hidden rounded-xl h-10 px-4 bg-primary/20 hover:bg-primary/30 text-text-main text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span className="truncate">Add Ingredient</span>
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
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary min-h-24 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                        placeholder="e.g., In a large bowl, whisk together the flour, baking soda, and salt."
                      />
                      {instructions.length > 1 && (
                        <button
                          onClick={() => removeInstruction(index)}
                          className="flex items-center justify-center rounded-xl h-14 w-14 bg-transparent text-text-main hover:bg-card-dark mt-2"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addInstruction}
                  className="flex items-center justify-center gap-2 self-start min-w-[84px] max-w-[480px] cursor-pointer overflow-hidden rounded-xl h-10 px-4 bg-primary/20 hover:bg-primary/30 text-text-main text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span className="truncate">Add Step</span>
                </button>
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-text-main">Categories</h2>
                <label className="flex flex-col w-full">
                  <p className="text-text-secondary text-base font-medium leading-normal pb-2">
                    Tags
                  </p>
                  <input
                    type="text"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border border-border-color bg-card-dark focus:border-primary h-14 placeholder:text-text-secondary/70 p-[15px] text-base font-normal leading-normal"
                    placeholder="e.g., Dessert, Vegan, Quick & Easy"
                  />
                </label>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-border-color">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-transparent text-text-main text-base font-bold leading-normal tracking-[0.015em] hover:bg-card-dark">
                  <span className="truncate">Save as Draft</span>
                </button>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-background-dark text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                  <span className="truncate">Publish Recipe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}