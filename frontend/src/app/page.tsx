import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-200">
      {/* Main */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 p-4 sticky top-0 h-screen border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-4">
            <nav className="flex flex-col gap-2 mt-4" aria-label="Main navigation">
              <NavItem icon="home" label="Home" href="/" active />
              <NavItem icon="bookmark" label="My Recipes" href="/recipes" />
              <NavItem icon="group" label="Following" href="/following" />
              <NavItem icon="group" label="Create recipe" href="/create" />
              <hr className="border-t border-gray-200 dark:border-gray-700 my-2" />
              <h3 className="px-3 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Categories
              </h3>
              <NavItem icon="breakfast_dining" label="Breakfast" href="/category/breakfast" />
              <NavItem icon="lunch_dining" label="Lunch" href="/category/lunch" />
              <NavItem icon="dinner_dining" label="Dinner" href="/category/dinner" />
              <NavItem icon="icecream" label="Desserts" href="/category/desserts" />
              <NavItem icon="eco" label="Vegetarian" href="/category/vegetarian" />
            </nav>
          </div>
        </aside>

        {/* Feed */}
        <section className="flex-1 p-4 md:p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <FeedCard
              author="JaneDoe"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDPj8TtecZAeWgT8SAlC8NHp77wwnpXoscwGswP7jcLRXe1Pz4SKQVAr6BeJb7PXrCCLV5mu5gMF-IYO2WpNewjDX6HxWI9ZBYmiGPUMqitG0EV3rs_8RwhZP_7OZq5BWG-AWCuDJCqDpG2ij5_LYkXVA4DgaG6VOmYFoGozgtGvIkWuAFJrW8hZl2ke0ZtClKxekVrQ-wYbTXKGC6jXEH8aF6ZpFdiHjnMNP9H1sinPxbLsvWOKKtU7CAxz9CX6vi2q4yxJtnRkDwD"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuC-OLaycMXXQ7hbLWr8nVW_qxIFs_9F_l4UxlgtlTOsMLsv3DWE-fc5Ok7-L4LnHtGqeG2FQSO0cOxcDyMO8pOsXKc5SEoLbmTLnCpIF5XpwpvUz4MoxFFxAFJ_SsA-9zOeU3VA9K6XpM-1gHCuPsFW7NwZWxU6QGt_ug_mr46NQ4HOQLexN1RT9Yu8b1wdZEZipqR4OCwKhvamDHbHJsk0UE1GK9-X3fDrURNsNXIuzwyV0vXK5rcIxEWUEiPe6XKAaSzz6XfsKIuM"
              title="Classic Spaghetti Carbonara"
              description="A quick and easy pasta dish with a creamy egg sauce, crispy pancetta, and a sprinkle of cheese."
              time="30 min | Easy"
              likes="1.2k"
              comments="88"
            />

            <FeedCard
              author="VeganChef"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuC2wSbzH2Aph91YiL9OFvMD8ddLGEXuQFytPFVLkLlFPANesIWzwS0SiL8J7PJDs64bKnZOtaUEFZTMBqLZIGIW7E9e5pPGbwmYLqB2tYDw0PcBGN_in2AeFVlR5f3IAE805he4s_jUDUMlE_K6MCeyNrw5q54-e-e9v2UPwJ5jYlQt18yUnuI_utr_LOesKiDbaFUMXKuu1lo2gd0dXrIUKYACBL5UOKVj9Hq89abomekFBqB1I3sMX8Tn3t-qDkNrk6xMcd7zSXL6"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBlKVyQwpvomKzVdzpYA6efdfuDJ7TFFHW4lcyPdZRnZye2FKm60O14GC-wsd4GSq-4TvuDg8DJyT5lxChYA0mmNvYWsphRmg_mO7_xXDsFpbCzbVG-7VzNjRUFTgshpPI5q4gV1Ta2U27V7uDFmnkA2HWCd4JRiLdq11oAt1TU0nxrHWWmQs7hneTsEi6MO2WPu7fTxIxoL6d5q6RToMbz-BLRLIClGy8AJ3nS96vii2MzMlfB7vvEfMPDWygR1jbOjc3cdKAqhiRJ"
              title="Vegan Chocolate Chip Cookies"
              description="Deliciously soft and chewy vegan cookies packed with chocolate chips. You won't miss the dairy!"
              time="45 min | Medium"
              likes="2.5k"
              comments="152"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/* -------------------- Components -------------------- */

function NavItem({
  icon,
  label,
  href,
  active = false,
}: {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
        active
          ? "bg-emerald-50 dark:bg-gray-800 text-emerald-700 dark:text-emerald-400"
          : "text-gray-700 dark:text-gray-300 hover:bg-emerald-50/50 dark:hover:bg-gray-800/50"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span className="material-symbols-outlined text-xl">
        {icon}
      </span>
      <span className="text-sm font-medium">
        {label}
      </span>
    </Link>
  );
}

function FeedCard({
  author,
  avatar,
  image,
  title,
  description,
  time,
  likes,
  comments,
}: {
  author: string;
  avatar: string;
  image: string;
  title: string;
  description: string;
  time: string;
  likes: string;
  comments: string;
}) {
  return (
    <article className="flex flex-col rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-shadow">
      <Image
        src={image}
        alt={title}
        width={800}
        height={450}
        className="w-full aspect-video object-cover"
        priority={false}
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <Image
            src={avatar}
            alt={`${author}'s avatar`}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {author}
          </p>
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
          <div className="flex items-center gap-4">
            <Action icon="favorite_border" label={likes} ariaLabel="Like recipe" />
            <Action icon="chat_bubble_outline" label={comments} ariaLabel="View comments" />
            <button 
              className="h-8 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-all duration-200 hover:shadow-md active:scale-95"
              aria-label="Save recipe"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Action({ icon, label, ariaLabel }: { icon: string; label: string; ariaLabel: string }) {
  return (
    <button 
      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      aria-label={ariaLabel}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}