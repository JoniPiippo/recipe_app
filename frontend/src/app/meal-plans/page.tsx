// frontend/src/app/meal-plans/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MealPlan {
  id: number;
  day: string;
  meals: {
    breakfast?: { id: number; title: string; image: string };
    lunch?: { id: number; title: string; image: string };
    dinner?: { id: number; title: string; image: string };
  };
}

export default function MealPlans() {
  const [currentWeek, setCurrentWeek] = useState(0);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Mock data - replace with API call
  const mealPlans: MealPlan[] = daysOfWeek.map((day, index) => ({
    id: index + 1,
    day,
    meals: {},
  }));

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="px-4 md:px-20 lg:px-40 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-text-main mb-2">Meal Planner</h1>
            <p className="text-text-secondary">Plan your weekly meals and stay organized</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-background-dark font-medium transition-all">
            <span className="material-symbols-outlined">add</span>
            <span>Generate Plan</span>
          </button>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6 bg-card-dark rounded-xl p-4">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-dark transition-colors"
          >
            <span className="material-symbols-outlined">chevron_left</span>
            <span className="text-sm font-medium">Previous Week</span>
          </button>
          <div className="text-center">
            <p className="text-lg font-bold text-text-main">
              Week of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </p>
            <p className="text-sm text-text-secondary">This Week</p>
          </div>
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-dark transition-colors"
          >
            <span className="text-sm font-medium">Next Week</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Meal Plan Grid */}
        <div className="space-y-4">
          {mealPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-card-dark rounded-xl border border-border-color p-6"
            >
              <h3 className="text-xl font-bold text-text-main mb-4">{plan.day}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Breakfast */}
                <MealSlot
                  mealType="Breakfast"
                  icon="breakfast_dining"
                  meal={plan.meals.breakfast}
                />
                {/* Lunch */}
                <MealSlot
                  mealType="Lunch"
                  icon="lunch_dining"
                  meal={plan.meals.lunch}
                />
                {/* Dinner */}
                <MealSlot
                  mealType="Dinner"
                  icon="dinner_dining"
                  meal={plan.meals.dinner}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Shopping List */}
        <div className="mt-8 bg-card-dark rounded-xl border border-border-color p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-text-main">Shopping List</h3>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors">
              <span className="material-symbols-outlined text-lg">download</span>
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
          <p className="text-text-secondary text-center py-8">
            Add meals to your plan to generate a shopping list
          </p>
        </div>
      </div>
    </div>
  );
}

function MealSlot({
  mealType,
  icon,
  meal,
}: {
  mealType: string;
  icon: string;
  meal?: { id: number; title: string; image: string };
}) {
  return (
    <div className="bg-surface-dark rounded-lg p-4 border border-border-color hover:border-primary/50 transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        <span className="text-sm font-bold text-text-secondary">{mealType}</span>
      </div>
      {meal ? (
        <Link href={`/recipe/${meal.id}`}>
          <div className="flex items-center gap-3 group cursor-pointer">
            <Image
              src={meal.image}
              alt={meal.title}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
            <p className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">
              {meal.title}
            </p>
          </div>
        </Link>
      ) : (
        <button className="w-full py-3 border-2 border-dashed border-border-color rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-text-dark-secondary">add</span>
          <span className="text-sm text-text-dark-secondary">Add Meal</span>
        </button>
      )}
    </div>
  );
}