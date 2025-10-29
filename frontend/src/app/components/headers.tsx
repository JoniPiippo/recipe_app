import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between gap-4 px-4 md:px-20 lg:px-40 border-b border-border-color bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-4xl text-primary">
          lunch_dining
        </span>
        <span className="text-xl font-bold text-text-main">RecipeShare</span>
      </Link>

      <nav className="hidden md:flex items-center gap-9">
        <Link
          href="/"
          className="text-sm font-medium leading-normal text-text-dark-secondary hover:text-primary transition-colors"
        >
          Home
        </Link>
        <Link
          href="/explore"
          className="text-sm font-medium leading-normal text-primary"
        >
          Explore
        </Link>
        <Link
          href="/create"
          className="text-sm font-medium leading-normal text-text-dark-secondary hover:text-primary transition-colors"
        >
          Create
        </Link>
        <Link
          href="/meal-plans"
          className="text-sm font-medium leading-normal text-text-dark-secondary hover:text-primary transition-colors"
        >
          Meal Plans
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-text-dark-secondary flex border-none bg-surface-dark items-center justify-center pl-4 rounded-l-xl">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="search"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-text-main focus:outline-0 focus:ring-0 border-none bg-surface-dark h-full placeholder:text-text-dark-secondary px-4 text-base font-normal"
              placeholder="Search"
            />
          </div>
        </label>
        <Link href="/profile">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHq17u7FdUujvjVdCM_wDjCkgUMKSiZ_L-VKHSk44VS3kehYJh9ZRM4L4motN7iZxUH4mAeBdxMp8oZTwJuINW1YtjprZxuBOYRQNFKPQ9Gh2_we3SuwHeIUOOMNi-iBLhwGhY9tmBxA4cU6_J-eVJANfn7ydTs9qsifVNTVIZzGl_9wIfK07GVVTL4F3izayi1VR5g61eegS5NzURXrYl2pYBMXemUvMSeXu8dXLRBKYjJaHXEv7a9WR82OID-bWvnZVpGXJpl155")',
            }}
          />
        </Link>
      </div>
    </header>
  );
}