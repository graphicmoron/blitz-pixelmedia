"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Aboutus() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Hero → Section transition */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          filter: "blur(20px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 w-full max-w-[48em] mx-auto px-6 text-center text-dirty-yellow"
      >
        <p className="tracking-[-0.03em] text-[2.5rem] font-bricolage leading-[1.05]">
          We're a creative production team that started as a small Instagram
          page run by a bunch of college students who simply loved creating
          things.
        </p>
      </motion.div>
    </section>
  );
}