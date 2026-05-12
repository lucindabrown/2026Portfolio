"use client";

import Lottie from "lottie-react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import AnimateIn from "@/app/components/AnimateIn";

interface HeroModuleProps {
  headline: string;
  accentText?: string;
  accentColor?: string;
  body?: unknown[];
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  lottieUrl?: string;
  backgroundColor?: string;
}

export default function HeroModule({
  headline,
  accentText,
  accentColor = "#4f46e5",
  body,
  ctaText,
  ctaLink,
  imageUrl,
  lottieUrl,
  backgroundColor = "#e5eae5",
}: HeroModuleProps) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (!lottieUrl) return;
    fetch(lottieUrl)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, [lottieUrl]);

  return (
    <section className="w-full px-6 py-16 md:py-24" style={{ backgroundColor }}>
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16 lg:px-16 xl:gap-[80px] xl:px-[108px]">
        {/* Text */}
        <AnimateIn duration={600} delay={0} className="flex flex-col gap-8 text-black lg:w-[420px] lg:shrink-0 xl:w-[480px]">
          <h1 className="font-sans text-[28px] font-black leading-[40px] tracking-[-0.04em] md:text-[64px] md:leading-[68px]">
            {headline}
            {accentText && (
              <span className="block mt-6" style={{ color: accentColor }}>{accentText}</span>
            )}
          </h1>
          {body && (
            <div className="font-sans text-[18px] leading-[1.3] tracking-[-0.04em] md:text-[22px] md:leading-[28px] [&_strong]:font-bold [&_em]:italic">
              <PortableText value={body as Parameters<typeof PortableText>[0]["value"]} />
            </div>
          )}
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="self-start inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-sans text-base text-white hover:bg-[#FF0AC4] transition-colors"
            >
              {ctaText}
            </a>
          )}
        </AnimateIn>

        {/* Still image — takes priority over Lottie */}
        {imageUrl && (
          <AnimateIn duration={800} delay={150} className="order-first lg:order-none flex flex-1 min-w-0 items-center justify-center">
            <Image src={imageUrl} alt="" width={1000} height={1000} className="w-full h-auto object-contain" />
          </AnimateIn>
        )}

        {/* Lottie — first on mobile */}
        {!imageUrl && animationData && (
          <AnimateIn duration={800} delay={150} className="order-first lg:order-none flex min-w-0 items-center justify-center lg:max-w-[400px] xl:max-w-[500px]">
            <Lottie animationData={animationData} loop className="w-full" />
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
