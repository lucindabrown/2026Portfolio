"use client";

import Image from "next/image";
import AnimateIn from "@/app/components/AnimateIn";

interface Logo {
  _id: string;
  name: string;
  logoUrl: string;
  url?: string;
}

interface LogoModuleProps {
  headline: string;
  logos: Logo[];
  backgroundColor?: string;
}

export default function LogoModule({
  headline,
  logos,
  backgroundColor = "#fffdee",
}: LogoModuleProps) {
  return (
    <section className="w-full px-6 py-16 md:py-24" style={{ backgroundColor }}>
      <div className="mx-auto max-w-[1440px] lg:px-16 xl:px-[108px]">
        <AnimateIn duration={600} delay={0}>
          <h2 className="font-sans text-[38px] font-black leading-tight tracking-[-0.04em] text-black md:text-[64px] md:leading-[72px] mb-16">
            {headline}
          </h2>
        </AnimateIn>
        <div className="grid grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-12">
          {logos.map((logo, i) => {
            const logoImage = (
              <div className="relative h-[120px] w-full">
                <Image
                  src={logo.logoUrl}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </div>
            );
            return (
              <AnimateIn key={logo._id} duration={600} delay={i * 100}>
                {logo.url ? (
                  <a href={logo.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity block">
                    {logoImage}
                  </a>
                ) : (
                  logoImage
                )}
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
