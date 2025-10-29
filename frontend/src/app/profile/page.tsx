import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  const recipes = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDsenPJudyow9i4z-AiBLe-Yg-iGCBBLR0MOLBFfJ-7xS4BMXepOBL1NJZJMNviw3wM4P0vzFLadNRAN6Qx0TmmRCnrQ6cDhHRieVmhkQBh-ZxDtc6moo_TIrmP45vur5Zor4jD7NEWUrHjRu9CAajtHEoKW6DcZr-EazSgVxR2qMZcNxiwmkNmruOHwsN4GTODBmtWIdsjT4_zA-m2dPFsek5ceUeA7JWTiaEdjptTHBA7zZcDTSbyCvprbSGBv74JpVRa-nrrJcgC",
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish",
      stars: 4,
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAIKEOidQAYn_mL-bNjqcFe__St4BColCND8qAWxIDTpExqP-Z-ISx9UL_eNoz_YORxAQPnPs7IOJfvKPByx9fw8q3Zlg0lP4a5RL6VH7-RqmK9alYr2gXzCYcuI1mjHvLqESv8Qq2vPv3IjxlT6OgFwsKTJ6aMSujs2WDfk50NMG5s8Tlx2JTjwFeiS8KUHQJpeggnt0J_-AfcY0dtZ-Ar00FQt4_mqR6hqEwoGjVXWdYmDjkxAkQpi1jyGybokZFfFPWKniVAyAB3",
      title: "Chicken Tikka Masala",
      description: "A popular Indian curry",
      stars: 4.5,
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_23OJEZ2SgwhZSADTNPkmLbVwhOz33ZwTjblz-4FVVD3hVzuHCoKvWhXAlgnYphvKuN_us9H7fuzUssVnrg0jhBy1zs8c5iP6ulONK5miFSSUsEXnODTUwU-m2l_hRZguM45-nLQ-k8sOhjQcQZY6gFG1MCr6w1hMsAuk5m2I6dPEkfG8Y4-bERsmQqjwedMw2uz6N5t2I7ut_NUXeb_LCuSYbKaAjFasR1WbPn3XZ1HkNdC_zYWdVIEFRK5gIgPQlIeFVyJPK5di",
      title: "Chocolate Chip Cookies",
      description: "The best homemade cookies",
      stars: 5,
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDorr7x_mejbr3W-v6MxLViLqWUmc5bkeYU6Rd_NM5Ij4ShjlpwSXb6YJsSPYJnA34uBXhxCYlHS9S8Eb-6VQvzAr8y0MxLfpXxjQmzaVyhWYo6szigA3oTn-xiczYe8cfefJalb5UcgVKOUU8-XoDhPfxPRQY_LR7llWlFQxqBAx4cbUWhpB2xzNhmsw4RG8KyBYXEjXhSTteZKdnrlb909Iio6GULLOefM23xxA9HfIAzT218zlACmBm76pU5xxZ0bamvb-hYGSG3",
      title: "Beef Tacos",
      description: "Quick and easy weeknight meal",
      stars: 3.5,
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCFod-6SBL-2RtsQsMTK_6eVzF6wnnauoXSIKlGI8_mKA5WxXo5asoHny4AlO1wcb-JqAeoIO10FYGnGspAArwsdZtmsIYRYOA0GTaue7MRfUgZnuG89jyK8pkDvJrPl6mdIDkZ0gSKIvBkTysQddHtcd0Qf2VyhOwwKmqvw6G23NNQOSClq32zDRwnE1b18ZS1IS908rSVE6ewcrWggXf83qj_J0T0SdMDCplCd2Th9-hWeRKThXyL8krSxMsA2S-L-L9RYz0WqQNY",
      title: "Caesar Salad",
      description: "A refreshing and healthy salad",
      stars: 4,
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1dp1FHKBBc3q6kIxh7PTlKHB2xHYa1Tm_C9LtwAf_YOBFqI5qIYM755Z7eOXytKM9aRyAOVkD8xBRRl-heilI3X4WtAjn8MoVkIWIUqeDxudOp-xFGqQpv2FqxyQZzpwIHI-Ros-gROlfpXRe4hUwZ0nbZURCBi-UMWKjkItTn_z8Cun-rRS_BxuMjtzsxPfpCDDHiAFmG9MP248aL-yW6brei3yCdfPRaojZ4pKGW7pt30_TJ9uPgP4y50fWAhGb2jV8J6_VnQN9",
      title: "Pancakes",
      description: "Fluffy and delicious pancakes",
      stars: 4.5,
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-neutral-900 text-neutral-50">
      <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Profile Header */}
          <div className="flex p-4">
            <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
              <div className="flex gap-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJk_YXWKM0NGPLUynNaxH56iQUZm3AWp5weqmwh4yFilDMDt_UiusAjdms-T3jlwVbeIiw7njnqY-o4RZWY0jS4g44TF4bq4PXLPTUFNW3F2uQCzIuPbti8BP-GbaZISzMpO5Pth3Oy2X2Z_KJ98t3uvdmsIwx45cc_safjgAq-tCKoGt6p-SdVnxo_arMOeOykNXwb7JIMyfBKs08CTKIxbvCZMlxXOHJUYdJNWfEUgm2wEe_Bpj4Y459sEOuLA6sAfSD9nJ5wuLZ")',
                  }}
                />
                <div className="flex flex-col justify-center">
                  <p className="text-neutral-50 text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    Alex Thompson
                  </p>
                  <p className="text-neutral-400 text-base font-normal leading-normal">
                    Lover of home-cooked meals and spicy food.
                  </p>
                </div>
              </div>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-neutral-900 text-sm font-bold leading-normal tracking-[0.015em] w-full md:w-auto">
                <span className="truncate">Follow</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 px-4 py-3">
            <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-neutral-800 p-3 items-start bg-neutral-900">
              <p className="text-neutral-50 tracking-light text-2xl font-bold leading-tight">
                1.2k
              </p>
              <p className="text-neutral-400 text-sm font-normal leading-normal">
                Followers
              </p>
            </div>
            <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-neutral-800 p-3 items-start bg-neutral-900">
              <p className="text-neutral-50 tracking-light text-2xl font-bold leading-tight">
                245
              </p>
              <p className="text-neutral-400 text-sm font-normal leading-normal">
                Following
              </p>
            </div>
            <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-neutral-800 p-3 items-start bg-neutral-900">
              <p className="text-neutral-50 tracking-light text-2xl font-bold leading-tight">
                58
              </p>
              <p className="text-neutral-400 text-sm font-normal leading-normal">
                Recipes
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="pb-3">
            <div className="flex border-b border-neutral-800 px-4 gap-8">
              <Link
                href="/profile"
                className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-primary pb-[13px] pt-4"
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                  Uploaded Recipes
                </p>
              </Link>
              <Link
                href="/profile/saved"
                className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-neutral-400 hover:text-neutral-200 transition-colors pb-[13px] pt-4"
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                  Saved Recipes
                </p>
              </Link>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
            {recipes.map((recipe, index) => (
              <div key={index} className="flex flex-col gap-3 pb-3 group">
                <div className="relative w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <button className="text-white">
                      <span className="material-symbols-outlined text-4xl">
                        bookmark_add
                      </span>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-neutral-50 text-base font-medium leading-normal">
                    {recipe.title}
                  </p>
                  <p className="text-neutral-400 text-sm font-normal leading-normal">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-base">
                        {i < Math.floor(recipe.stars)
                          ? "star"
                          : i < recipe.stars
                          ? "star_half"
                          : "star_border"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}