import Link from "next/link";

export function Header() {
  return (
    <div className="sticky top-0 z-50 w-full h-16 bg-black flex justify-between items-center text-white font-syne font-medium text-lg">
      <div className="flex items-center space-x-6">
        <Link href="/"><img src="/logo.jpg" alt="Logo" className="h-16" /></Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="#">Community</Link>
            </li>
            <li>
              <Link href="#">Resources</Link>
            </li>
            <li>
              <Link href="#">Pricing</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Link href="/checkpoint">
        <button className="bg-blue text-black h-16 px-4 py-2">
          Log In/Register
        </button>
      </Link>
    </div>
  );
}