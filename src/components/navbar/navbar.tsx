import Link from "next/link";
import NavAuthSection from "@/components/navbar/nav-auth-section";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="container flex bg-black w-full justify-between items-center gap-4 md:gap-6">
      <div className="flex gap-4 items-center">
        <Link href={"/"}>
          <Image src="/logo.png" alt="Panelooza" width={100} height={100} />
        </Link>
        <ul className="flex justify-start space-x-4 text-white">
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
