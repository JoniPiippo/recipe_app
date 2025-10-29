"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecipeDetail() {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);

  const toggleIngredient = (index: number) => {
    if (checkedIngredients.includes(index)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
    }
  };

  const ingredients = [
    "1 pound sweet Italian sausage",
    "3/4 pound lean ground beef",
    "1/2 cup minced onion",
    "2 cloves garlic, crushed",
    "1 (28 ounce) can crushed tomatoes",
    "2 (6.5 ounce) cans canned tomato sauce",
    "12 lasagna noodles",
    "16 ounces ricotta cheese",
  ];

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
              {/* Image Carousel */}
              <div
                className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[480px]"
                style={{
                  backgroundImage:
                    'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAheVUFkzaQoq5uPBbtzo7rZu_1K9bzP5ET19-zG0KSUy3IHYWjGyn543EooLeLlRc8FD9a4L3yHYEFBmrWT7FInIRfQhwZFObfKsacEhxDT_3BW6241E8ZD1JUAQyeFBjYEaOwMs4-2O59uUbPNpX1eGlmWd6V0baUNEe4_LzPzb0BQTcSC3_ZrFCCRmH4kj8LKmgJMeA8acU4SGa3OZXeHCcu-iHwMsDRmYxgpBTAFShrYzJPN84-mThsMB_GNIdZn6loCnCymLTR")',
                }}
              >
                <div className="flex justify-center gap-2 p-5">
                  <div className="size-2 rounded-full bg-text-main"></div>
                  <div className="size-2 rounded-full bg-text-main opacity-50"></div>
                  <div className="size-2 rounded-full bg-text-main opacity-50"></div>
                  <div className="size-2 rounded-full bg-text-main opacity-50"></div>
                </div>
              </div>

              {/* Recipe Header */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap justify-between gap-4 items-start">
                  <div className="flex min-w-72 flex-col gap-2">
                    <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">
                      Classic Lasagna
                    </h1>
                    <p className="text-text-dark-secondary text-base font-normal leading-normal">
                      A rich and cheesy traditional lasagna that's perfect for a family
                      dinner.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-text-main">
                      {[1, 2, 3, 4].map((i) => (
                        <span key={i} className="material-symbols-outlined text-primary">
                          star
                        </span>
                      ))}
                      <span className="material-symbols-outlined text-[#4d4d4d]">
                        star
                      </span>
                    </div>
                    <p className="text-sm font-medium">(122 ratings)</p>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9W-A7wLqPEoI7Q5Dmxa7fT5di2SdvHO_y1p1ghSDgM4bIGtWu5jzgB09GKtVJbyDPfU7aeKUtcqsa2qBJXJUP1g9q-VyozNxT6UjIz3Qf2NgKFqvq_L0O82Nyoh9X3f5NHSbdnnqxFE9WBp-QED3w7_TIanHIp6la2r5VDrjvSBg3sRY1wGPxuskqTfEvDrlOstRa8p0cr0uTja__wTPULzMVrrIbn6JwsBcLTHF4FH6yM1ZCJVnXVDmnzt5xfqHfKmKosTAt48hd")',
                    }}
                  />
                  <div>
                    <p className="font-bold">Maria Lopez</p>
                    <Link href="/profile" className="text-primary text-sm font-medium">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-start gap-2">
                {[
                  { icon: "favorite_border", label: "Like" },
                  { icon: "share", label: "Share" },
                  { icon: "bookmark_border", label: "Save" },
                  { icon: "print", label: "Print" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center gap-2 bg-surface-dark py-2 px-3 rounded-full text-sm font-medium text-text-main hover:bg-surface-dark/70"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {action.icon}
                    </span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Recipe Info Grid */}
              <div className="grid grid-cols-2 border-t border-solid border-t-[#333333]">
                <div className="flex flex-col gap-1 py-4 pr-2 border-b border-solid border-b-[#333333]">
                  <p className="text-text-dark-secondary text-sm font-normal leading-normal">
                    Prep time
                  </p>
                  <p className="text-sm font-medium leading-normal">20 mins</p>
                </div>
                <div className="flex flex-col gap-1 py-4 pl-2 border-b border-solid border-b-[#333333]">
                  <p className="text-text-dark-secondary text-sm font-normal leading-normal">
                    Cook time
                  </p>
                  <p className="text-sm font-medium leading-normal">45 mins</p>
                </div>
                <div className="flex flex-col gap-1 py-4 pr-2">
                  <p className="text-text-dark-secondary text-sm font-normal leading-normal">
                    Servings
                  </p>
                  <p className="text-sm font-medium leading-normal">6-8</p>
                </div>
                <div className="flex flex-col gap-1 py-4 pl-2">
                  <p className="text-text-dark-secondary text-sm font-normal leading-normal">
                    Difficulty
                  </p>
                  <p className="text-sm font-medium leading-normal">Medium</p>
                </div>
              </div>
            </div>

            {/* Right Column - Ingredients & Instructions */}
            <div className="flex flex-col gap-8">
              {/* Ingredients */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">Ingredients</h3>
                <ul className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checkedIngredients.includes(index)}
                        onChange={() => toggleIngredient(index)}
                        className="form-checkbox rounded bg-surface-dark border-[#4d4d4d] text-primary focus:ring-primary/50"
                      />
                      <span className="text-base">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">Instructions</h3>
                <ol className="space-y-4 list-decimal list-inside text-text-main">
                  <li>
                    In a Dutch oven, cook sausage, ground beef, onion, and garlic over
                    medium heat until well browned. Stir in crushed tomatoes, tomato
                    sauce, tomato paste, and water. Season with sugar, basil, fennel
                    seeds, Italian seasoning, 1 teaspoon salt, pepper, and 2 tablespoons
                    parsley. Simmer, covered, for about 1 1/2 hours, stirring
                    occasionally.
                  </li>
                  <li>
                    Bring a large pot of lightly salted water to a boil. Cook lasagna
                    noodles in boiling water for 8 to 10 minutes. Drain noodles, and
                    rinse with cold water. In a mixing bowl, combine ricotta cheese with
                    egg, remaining parsley, and 1/2 teaspoon salt.
                  </li>
                  <li>
                    Preheat oven to 375 degrees F (190 degrees C). To assemble, spread 1
                    1/2 cups of meat sauce in the bottom of a 9x13 inch baking dish.
                    Arrange 6 noodles lengthwise over meat sauce. Spread with one half of
                    the ricotta cheese mixture. Top with a third of mozzarella cheese
                    slices. Spoon 1 1/2 cups meat sauce over mozzarella, and sprinkle
                    with 1/4 cup Parmesan cheese.
                  </li>
                  <li>
                    Repeat layers, and top with remaining mozzarella and Parmesan cheese.
                    Cover with foil: to prevent sticking, either spray foil with cooking
                    spray, or make sure the foil does not touch the cheese.
                  </li>
                  <li>
                    Bake in preheated oven for 25 minutes. Remove foil, and bake an
                    additional 25 minutes. Cool for 15 minutes before serving.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-solid border-t-[#333333] pt-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold">Comments (3)</h3>
              <div className="flex flex-col gap-6">
                {/* Existing Comments */}
                <div className="flex gap-4">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKgE3jOuQsqgetitOkiQ7WycL_Jv5aINTcuCgG8sCc7ceecKQgzYNTofQgCZ2zM_b6Okbxq9ozrij3DK_ei61EAuXyRkIdsffSJR4GAw8gIAtWlxftfvqjAuel6aN0LIb3LuR2cLWEr_xEckNF_GNk6QKmNzYWsMU-174s4yzkeAaOdBOpvuDeT0XtP0_v-hGuPaFjLQvqG55otmFfdOu7wyuRpp0SLjXMbOqBEI_pKpAQuJkLtHgRhfgnQOGd9ljd_5oftkQeRIUg"
                    alt="User avatar"
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold">John Doe</p>
                      <p className="text-sm text-text-dark-secondary">2 days ago</p>
                    </div>
                    <p className="mt-1">
                      This was amazing! My family loved it. Will definitely make again.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9enpi6WNmJWHCRslVP2xifCmxMrjEy-px70VwwcfmczPPRqaZHsJaN7Mc83pT1u2jKNdy2fx6S_wR2ewoo2BaikqqzpPHqkMrPVmsqjjYVZOu2oUkBnXlHg71m5SuwZBtQ6htnZicuimvsgdPAT9HOdVGilZBL9LEls_ytB5N3fqMuyk3YRtJHprFvFsIQrgcDoyjekQA9BAm7VRJng6BwktIkD9Ye4NLkL9_6IQ6kzApg17IMy7seAicRMolge4M-ktIZRVOgVWW"
                    alt="User avatar"
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold">Jane Smith</p>
                      <p className="text-sm text-text-dark-secondary">1 day ago</p>
                    </div>
                    <p className="mt-1">
                      I added a little extra garlic and it turned out great. Thanks for
                      the recipe!
                    </p>
                  </div>
                </div>
              </div>

              {/* Add Comment */}
              <div className="flex gap-4 items-start">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD54bM9aSkH3rLTmNSuq2WKKq0Wi0zdfBqvGRnFuabfb699Jhcd5MnotxrRRH9Nlr1GnnNgaRzsbsHWU-wk9OwscZzlEaQIcLt-1Sjew7RI21cd7XKKdPitnpPpmCYnihroqL-spb9eOZm4aN7lmJcxK6-UcsvKFjKTQ55_j8V44h257WEkTGCJXN-KCEiJM9Knu_nSkr-2GsCSdmFdVikv8BDo6ekjyxULTzt9Xg26woMArgTRtGrhAoZKB1cvT6iFYP5LAgkULE57")',
                  }}
                />
                <div className="flex-1">
                  <textarea
                    className="form-textarea w-full rounded-xl bg-surface-dark border-none focus:ring-primary/50 placeholder:text-text-dark-secondary"
                    placeholder="Add a comment..."
                    rows={3}
                  />
                  <button className="mt-2 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Post Comment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}