import Link from "next/link";

export function Header() {
  return (
    <div className="w-full h-16 bg-black text-white flex justify-between items-center">
      <div className="flex h-full items-center space-x-4 text-white">
        <img src="/logo.png" alt="Logo" className="h-full" />
        <nav>
          <ul className="flex space-x-4">
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
      <button className="bg-blue text-black h-full px-4 py-2">
        Log In/Register
      </button>
    </div>
  );
}
