// frontend/src/app/components/headers.tsx
'use client';

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

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
          className={`text-sm font-medium leading-normal transition-colors ${
            isActive('/') 
              ? 'text-primary' 
              : 'text-text-dark-secondary hover:text-primary'
          }`}
        >
          Home
        </Link>
        <Link
          href="/explore"
          className={`text-sm font-medium leading-normal transition-colors ${
            isActive('/explore') 
              ? 'text-primary' 
              : 'text-text-dark-secondary hover:text-primary'
          }`}
        >
          Explore
        </Link>
        {isAuthenticated && (
          <>
            <Link
              href="/create"
              className={`text-sm font-medium leading-normal transition-colors ${
                isActive('/create') 
                  ? 'text-primary' 
                  : 'text-text-dark-secondary hover:text-primary'
              }`}
            >
              Create
            </Link>
            <Link
              href="/meal-plans"
              className={`text-sm font-medium leading-normal transition-colors ${
                isActive('/meal-plans') 
                  ? 'text-primary' 
                  : 'text-text-dark-secondary hover:text-primary'
              }`}
            >
              Meal Plans
            </Link>
          </>
        )}
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

        {isAuthenticated ? (
          <div className="relative group">
            <Link href="/profile">
              <Image
                src={user?.avatar || '/default-avatar.jpg'}
                alt={user?.name || 'User'}
                width={40}
                height={40}
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              />
            </Link>
            
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-card-dark rounded-xl border border-border-color shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link 
                href="/profile"
                className="flex items-center gap-2 px-4 py-3 hover:bg-surface-dark rounded-t-xl transition-colors"
              >
                <span className="material-symbols-outlined text-lg">person</span>
                <span className="text-sm">Profile</span>
              </Link>
              <Link 
                href="/profile/saved"
                className="flex items-center gap-2 px-4 py-3 hover:bg-surface-dark transition-colors"
              >
                <span className="material-symbols-outlined text-lg">bookmark</span>
                <span className="text-sm">Saved Recipes</span>
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-4 py-3 hover:bg-surface-dark rounded-b-xl transition-colors w-full text-left"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <Link href="/auth">
            <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-background-dark font-medium transition-all">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}