"use client";

import { HeroParallax } from "../ui/hero-parallax";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

export const Header = () => {
  return (
    <div className="px-16 py-40 md:py-40 text-white z-10">
      <div className="w-1/2">
        <TypewriterEffectSmooth
          words={[
            {
              text: "Welcome",
            },
            {
              text: "to",
            },
            {
              text: "Panelooza",
              className: "text-yellow dark:text-yellow",
            },
          ]}
        />
        <p className="text-xl mb-8">
          na use korle kharap hobe na, kintu korle valo hobe
        </p>
        <div className="flex items-center justify-center px-36">
          <button className="w-full bg-blue py-2 px-4 drop-shadow-[3px_3px_0px_rgba(255,255,255,1)]">
            <p
              className="text-yellow font-karla text-3xl font-extrabold drop-shadow-[3px_3px_0px_rgba(255,255,255,1)]"
              style={{
                textShadow:
                  "rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px",
              }}
            >
              Get Started
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export function Hero() {
  return <HeroParallax strips={strips} />;
}

export const strips = [
  {
    title: "1",
    link: "https://tmblr.co/ZVgbcwfMI2NTuu00",
    thumbnail:
      "https://64.media.tumblr.com/765d46d33a17f0df49a5d4cfee608f0b/35d9ed3d712650a1-7e/s2048x3072/5d7275391bac5b1e9ce25295c01c2b312870b2d0.jpg",
  },
  {
    title: "2",
    link: "https://tmblr.co/ZVgbcwfK2sUBOa00",
    thumbnail:
      "https://64.media.tumblr.com/aedaf6530546c393e8f2b7ba8bb66da6/5a29c7033f26bc95-59/s1280x1920/bb88ce46dfc977d98bc85541e909ee0bc3e49b25.jpg",
  },

  {
    title: "3",
    link: "https://tmblr.co/ZVgbcwfK2ipg0a00",
    thumbnail:
      "https://64.media.tumblr.com/c8be31ed9bef7551ac7c98e7a7407f9f/b538e67b657c3e5d-6c/s2048x3072/a0183d26c98ce620d7c334ee3d679c2275712143.jpg",
  },
  {
    title: "4",
    link: "https://tmblr.co/ZVgbcwfHVhOriy00",
    thumbnail:
      "https://64.media.tumblr.com/94b22b4aec41ed28bbbbf5310b1f62a1/645e513e0357a7cf-26/s2048x3072/a7331be007dd5af4393639ccf6625015b20342da.jpg",
  },
  {
    title: "5",
    link: "https://tmblr.co/ZVgbcwfFv59vOq01",
    thumbnail:
      "https://64.media.tumblr.com/52d1a313afc15c447c9ffcae7604358b/211c7ad166aa4f1f-39/s2048x3072/cb3362f31cea68f85c32c1e8e388995e30af1683.jpg",
  },

  {
    title: "6",
    link: "https://tmblr.co/ZVgbcwe-VaLyCu00",
    thumbnail:
      "https://64.media.tumblr.com/7cf56dfea254d55d09441796152b5f37/7be75c5407c9ec51-4e/s2048x3072/580ff3b092caf43c351bdc151c79bbcefd5e071a.jpg",
  },
  {
    title: "7",
    link: "https://tmblr.co/ZVgbcwezTs_IWe00",
    thumbnail:
      "https://64.media.tumblr.com/162fac8c65e0a440717c217dce4788a2/785f9742004a76fc-c9/s2048x3072/3b656c0bf032cfc0f745f04b86496847a12f7eaf.jpg",
  },
  {
    title: "8",
    link: "https://tmblr.co/ZVgbcwexbh0Vmy00",
    thumbnail:
      "https://64.media.tumblr.com/82a2f7fe4942c5d1973a66b71a5c8c68/40273ae3b50a5d2d-e8/s2048x3072/7e6954c5d174bb4bdf8bc3211551aec7978909e6.jpg",
  },
  {
    title: "9",
    link: "https://tmblr.co/ZVgbcwetRITqCW00",
    thumbnail:
      "https://64.media.tumblr.com/5e1f7e3759915c048d5a3da1931ebfae/113ed7562bf5873e-18/s2048x3072/0937ecaf88761de19fa4eac0afaef7326b6318ae.jpg",
  },
  {
    title: "10",
    link: "https://tmblr.co/ZVgbcwesRRS34u00",
    thumbnail:
      "https://64.media.tumblr.com/f0cc2b1534eb54d1de3e016eefebdf75/08e1623b1f6d3836-61/s2048x3072/078faa99b5eb4dafe34e9950681892ea0139b9b2.jpg",
  },
];
