import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full mt-auto">
      <div className="py-16 px-12 bg-black text-white text-sm grid grid-cols-5 gap-1">
        <div>
          <img src="/logo.png" alt="Logo" />
        </div>
        <div>
          <p className="font-bold mb-2">Why Panelooza?</p>
          <ul className="space-y-2">
            <li>
              <Link href="#">Watch the Demo</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold mb-2">Pricing</p>
          <ul className="space-y-2">
            <li>
              <Link href="#">Plans</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold mb-2">Resources</p>
          <ul className="space-y-2">
            <li>
              <Link href="#">Styles</Link>
            </li>
            <li>
              <Link href="#">Shapes</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold mb-2">Company</p>
          <ul className="space-y-2">
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">News</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
          </ul>
        </div>
      </div>
      <nav className="flex items-center justify-evenly p-4 space-x-4 bg-blue text-black text-xs font-semibold ">
        <ul className="flex space-x-4">
          <li>
            <Link href="#">Privacy</Link>
          </li>
          <li>
            <Link href="#">Terms</Link>
          </li>
          <li>
            <Link href="#">Cookie Preferences</Link>
          </li>
          <li>
            <Link href="#">Contact Us</Link>
          </li>
          <li>
            <Link href="#">Change Region</Link>
          </li>
        </ul>
        <ul className="flex items-center justify-center space-x-4">
          <li>
            <button className="flex bg-white items-center justify-center gap-1 p-2 rounded-full border-2 border-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <img src="/icons/download-cloud.svg" alt="download" />
              Download
            </button>
          </li>
          <li>
            <Link href="#">
              <img src="/icons/twitter.svg" alt="twitter" />
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/icons/facebook.svg" alt="facebook" />
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/icons/youtube.svg" alt="youtube" />
            </Link>
          </li>
          <li>
            <Link href="#">
              <img src="/icons/linkedin.svg" alt="linkedin" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
