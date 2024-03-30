import NavAuthSection from "@/components/navbar/nav-auth-section";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="print:hidden sticky top-0 z-50 w-full h-16 bg-black flex justify-between items-center text-white font-syne font-medium text-lg">
      <div className="flex items-center space-x-6">
        <Link href={"/"}>
          <Image src="/logo.jpg" alt="Panelooza" width={64} height={64} />
        </Link>
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
      </div>
      <NavAuthSection />
    </nav>
  );
}
