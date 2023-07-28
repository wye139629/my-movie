import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useId } from "react";

const navItems = [
  { title: "首頁", url: "/home", icon: <HomeIcon /> },
  {
    title: "搜尋",
    url: "/search",
    icon: <MagnifyingGlassIcon />,
  },
  { title: "我的片單", url: "/myList", icon: <PlusIcon /> },
];

const NavLink = ({
  title,
  url,
  icon,
}: {
  title: string;
  url: string;
  icon?: React.ReactElement;
}) => {
  return (
    <Link
      href={url}
      className="flex h-full items-center space-x-2 text-gray-100 text-sm"
    >
      <span className="w-4">{icon ? icon : null}</span>
      <span className="hidden md:block">{title}</span>
    </Link>
  );
};

export default function Navbar() {
  const id = useId();

  return (
    <header className="bg-mv-black/50">
      <nav className="block h-[72px] px-8">
        <div className="flex h-full space-x-10">
          <div>
            <Link
              href="/"
              className="flex h-full items-center text-2xl md:text-4xl"
            >
              <span className="text-white">My</span>
              <span className="text-mv-blue-100">Movie</span>
            </Link>
          </div>
          <ul className="flex space-x-10">
            {navItems.map(({ title, url, icon }, index) => (
              <li key={`${id}-${index}`}>
                <NavLink title={title} url={url} icon={icon} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
