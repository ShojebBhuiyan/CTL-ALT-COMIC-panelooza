import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  FiDownloadCloud,
  FiFacebook,
  FiGlobe,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

export function Footer() {
  return (
    <div className="w-full mt-auto">
      <div className="w-full flex items-center justify-center gap-6 bg-black text-white text-sm font-syne">
        <div className="w-1/6">
          <img src="/logo.jpg" alt="Logo" className="w-3/4" />
        </div>
        <div className="px-16 py-10 grid grid-cols-4 gap-6 text-center">
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
              <li>
                <Link href="#">Paid vs. Free</Link>
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
      </div>
      <nav className="flex items-center justify-evenly p-4 bg-blue text-black text-xs font-syne font-semibold ">
        <ul className="flex items-center justify-center space-x-6">
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
            <Select>
              <SelectTrigger className="text-xs border-0 focus:ring-0 shadow-none gap-1">
                <FiGlobe />
                <SelectValue placeholder="Change Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Europe & Africa</SelectLabel>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="ng">Nigeria</SelectItem>
                  <SelectItem value="eg">Egypt</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Asia</SelectLabel>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="kr">Korea</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Oceania</SelectLabel>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="nz">New Zealand</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </li>
        </ul>
        <ul className="flex items-center justify-center space-x-4">
          <li>
            <button className="flex items-center justify-center gap-1 p-2 bg-white rounded-full border-2 border-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <FiDownloadCloud className="text-xl" />
              Download
            </button>
          </li>
          <li>
            <Link href="#">
              <FiTwitter
                style={{ fill: "white" }}
                className="text-3xl  text-black drop-shadow-[2px_1px_0px_rgba(0,0,0,1)]"
              />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FiFacebook
                style={{ fill: "white" }}
                className="text-3xl text-black drop-shadow-[2px_1px_0px_rgba(0,0,0,1)]"
              />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FiYoutube
                style={{ fill: "white" }}
                className="text-3xl text-black drop-shadow-[2px_1px_0px_rgba(0,0,0,1)]"
              />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FiLinkedin
                style={{ fill: "white" }}
                className="text-3xl text-black drop-shadow-[2px_1px_0px_rgba(0,0,0,1)]"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
