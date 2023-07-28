import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-[200px] md:h-[250px] bg-mv-black">
      <div className="text-white mx-auto flex flex-col items-center justify-center h-full space-y-2 md:space-y-4">
        <div>
          <Link
            href="/"
            className="flex h-full items-center text-2xl md:text-3xl"
          >
            <span className="text-white">My</span>
            <span className="text-mv-blue-100">Movie</span>
          </Link>
        </div>
        <p>© 2023 This is only for demo</p>
      </div>
    </footer>
  );
}
