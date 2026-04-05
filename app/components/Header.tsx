"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setVisible(y < lastY || y < 10);
      setLastY(y);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-6 transition-transform duration-300"
      style={{
        backgroundColor: "#F7F2F6",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="mx-auto max-w-[1440px] py-6 lg:px-16 xl:px-[108px]">
        <a
          href="/"
          className="block text-center text-xl font-bold tracking-[-0.04em] text-black lg:text-left"
        >
          Lucinda Brown
        </a>
      </div>
    </header>
  );
}
