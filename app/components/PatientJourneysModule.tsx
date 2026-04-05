"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import AnimateIn from "@/app/components/AnimateIn";

interface PatientJourneysModuleProps {
  headline: string;
  body: unknown[];
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  backgroundColor?: string;
  imagePosition?: "left" | "right";
}

export default function PatientJourneysModule({
  headline,
  body,
  ctaText,
  ctaLink,
  imageUrl,
  backgroundColor = "#e5eae5",
  imagePosition = "right",
}: PatientJourneysModuleProps) {
  return (
    <section className="w-full px-6 py-16 md:py-24" style={{ backgroundColor }}>
      <div className={`mx-auto flex max-w-[1440px] flex-col items-center gap-12 lg:items-center lg:gap-16 lg:px-16 xl:gap-[80px] xl:px-[108px] ${imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row"}`}>

        {/* Text */}
        <AnimateIn duration={600} delay={0} className="flex flex-col gap-7 lg:gap-12 text-black lg:w-[420px] lg:shrink-0 xl:w-[480px]">
          <h2 className="font-sans text-[38px] font-black leading-tight tracking-[-0.04em] md:text-[64px] md:leading-[72px]">
            {headline}
          </h2>
          <div className="flex flex-col gap-6 font-sans text-[18px] leading-[1.3] tracking-[-0.04em] md:text-[22px] md:leading-[28px] [&_strong]:font-bold [&_em]:italic">
            <PortableText value={body as Parameters<typeof PortableText>[0]["value"]} />
          </div>
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="inline-flex items-center font-sans font-bold underline underline-offset-4 text-black hover:opacity-70 transition-opacity"
            >
              {ctaText}
            </a>
          )}
        </AnimateIn>

        {/* Image */}
        {imageUrl && (
          <AnimateIn duration={800} delay={150} className="order-first lg:order-none flex flex-1 min-w-0 items-center justify-center">
            <Image
              src={imageUrl}
              alt=""
              width={1000}
              height={1000}
              className="w-full h-auto object-cover"
            />
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
