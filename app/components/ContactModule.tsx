"use client";

import Image from "next/image";
import { useState } from "react";
import AnimateIn from "@/app/components/AnimateIn";

interface ContactModuleProps {
  headline: string;
  body?: string;
  photoUrl?: string;
  backgroundColor?: string;
}

export default function ContactModule({
  headline,
  body,
  photoUrl,
  backgroundColor = "#fffdee",
}: ContactModuleProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string).trim();
    const email = (data.get("email") as string).trim();
    const message = (data.get("message") as string).trim();

    const errors: { name?: string; email?: string; message?: string } = {};
    if (!name) errors.name = "Please share your name";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address";
    if (!message) errors.message = "Please share a note about what you're working on";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    const res = await fetch("https://formspree.io/f/mqegqzpw", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  const inputClass = "w-full rounded-xl border-[3px] border-[#ffeae3] bg-[#fffbdc] px-4 h-[68px] font-sans text-[18px] tracking-[-0.04em] md:text-[22px] outline-none focus:border-black transition-colors";
  const labelClass = "font-sans text-[18px] leading-[1.3] tracking-[-0.04em] text-black md:text-[22px] md:leading-[28px]";

  return (
    <section id="contact" className="w-full px-6 py-16 md:py-24" style={{ backgroundColor }}>
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16 lg:px-16 xl:gap-[120px] xl:px-[108px]">

        {/* Left — headline, body, form */}
        <AnimateIn duration={600} delay={0} className="flex flex-col gap-10 text-black lg:w-[500px] lg:shrink-0 xl:w-[600px]">
          <h2 className="font-sans text-[38px] font-black leading-tight tracking-[-0.04em] md:text-[64px] md:leading-[72px]">
            {headline}
          </h2>
          {body && status !== "success" && (
            <p className="font-sans text-[18px] leading-[1.3] tracking-[-0.04em] md:text-[22px] md:leading-[28px]">
              {body}
            </p>
          )}

          {status === "success" ? (
            <p className="font-sans text-[18px] leading-[1.3] tracking-[-0.04em] text-black md:text-[22px] md:leading-[28px]">
              Thanks! I'll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className={labelClass}>Your name</label>
                <input id="name" name="name" className={inputClass} />
                {fieldErrors.name && <p className="text-right font-sans text-base text-[#FF0AC4]">{fieldErrors.name}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" name="email" type="email" className={inputClass} />
                {fieldErrors.email && <p className="text-right font-sans text-base text-[#FF0AC4]">{fieldErrors.email}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="message" className={labelClass}>What would you like to discuss?</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full rounded-xl border-[3px] border-[#ffeae3] bg-[#fffbdc] px-4 py-4 h-[137px] font-sans text-[18px] tracking-[-0.04em] md:text-[22px] outline-none focus:border-black transition-colors resize-none"
                />
                {fieldErrors.message && <p className="text-right font-sans text-base text-[#FF0AC4]">{fieldErrors.message}</p>}
              </div>
              {status === "error" && (
                <p className="text-right font-sans text-base text-[#FF0AC4]">Something went wrong — please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="self-start inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-sans text-base text-white hover:bg-[#FF0AC4] transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </AnimateIn>

        {/* Photo — first on mobile */}
        {photoUrl && (
          <AnimateIn duration={800} delay={150} className="order-first lg:order-none w-[280px] mx-auto lg:mx-0 lg:w-auto lg:min-w-0 lg:flex-1 lg:max-w-[400px] xl:max-w-[500px]">
            <div className="relative aspect-square overflow-hidden rounded-full">
              <Image
                src={photoUrl}
                alt="Lucinda Brown"
                fill
                className="object-cover"
              />
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
