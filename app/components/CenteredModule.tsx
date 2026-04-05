"use client";

import { PortableText } from "@portabletext/react";
import AnimateIn from "@/app/components/AnimateIn";

interface CenteredModuleProps {
  headline: string;
  body?: unknown[];
  ctaText?: string;
  ctaLink?: string;
  backgroundImageUrl?: string;
  backgroundColor?: string;
}

export default function CenteredModule({
  headline,
  body,
  ctaText,
  ctaLink,
  backgroundImageUrl,
  backgroundColor = "#f5f5f5",
}: CenteredModuleProps) {
  return (
    <section
      className="w-full px-6 py-16 md:py-24"
      style={{
        backgroundColor,
        ...(backgroundImageUrl && {
          backgroundImage: `url('${backgroundImageUrl}')`,
          backgroundSize: "655px 586px",
          backgroundPosition: "top left",
        }),
      }}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 text-center lg:px-16 xl:px-[108px]">
        <AnimateIn duration={600} delay={0} className="flex flex-col items-center gap-10 max-w-[700px]">
          <h2 className="font-sans text-[38px] font-black leading-tight tracking-[-0.04em] text-black md:text-[64px] md:leading-[72px]">
            {headline}
          </h2>
          {body && (
            <div className="font-sans text-[18px] leading-[1.3] tracking-[-0.04em] text-black md:text-[22px] md:leading-[28px] [&_strong]:font-bold [&_em]:italic">
              <PortableText value={body as Parameters<typeof PortableText>[0]["value"]} />
            </div>
          )}
          {ctaText && (
            ctaLink ? (
              <a
                href={ctaLink}
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-sans text-base font-normal text-white hover:bg-[#FF0AC4] transition-colors"
              >
                {ctaText}
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-sans text-base font-normal text-white">
                {ctaText}
              </span>
            )
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
