"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BriefcaseIcon, CodeIcon, GraduationCapIcon } from "lucide-react";

export function AboutMe() {
  return (
    <section
      id="portfolio-about"
      className="relative z-30 mx-auto max-w-7xl border-t border-candle/10 px-6 py-24 md:px-12"
    >
      <div className="mb-16 text-center">
        <span className="mb-2 block font-display text-[10px] font-bold uppercase tracking-[0.2em] text-candle/80">
          CV & Biography
        </span>
        <h2 className="font-display text-4xl font-bold leading-tight text-parchment md:text-5xl">
          About{" "}
          <span className="bg-gradient-to-br from-[#F0CB7A] via-[#E6B25E] to-[#C8853A] bg-clip-text text-transparent">
            Me
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Bio & Identity Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative overflow-hidden rounded-3xl border border-candle/10 bg-gradient-to-br from-candle/[0.05] to-transparent p-8 md:p-10 lg:col-span-2 backdrop-blur-sm"
        >
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-candle/10 blur-[80px] transition-all duration-700 group-hover:bg-candle/20" />

          <div className="relative z-10">
            {/* Small avatar & greeting */}
            <div className="mb-8 flex items-center gap-6">
              <div className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-candle/20 shadow-[0_0_20px_rgba(230,178,94,0.1)]">
                <Image
                  src="/images/profile.jpg"
                  alt="Hazem Elerefy"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-parchment">
                  Hazem Elerefy
                </h3>
                <div className="mt-1 font-display text-xs font-medium uppercase tracking-widest text-candle">
                  Data Analyst
                </div>
              </div>
            </div>

            {/* The actual CV statement */}
            <div className="space-y-6 font-heading text-[1.05rem] leading-relaxed text-parchment/70">
              <p>
                I am a <strong className="text-parchment">Data Analyst</strong>{" "}
                with a robust{" "}
                <strong className="text-candle">
                  Front-end Development background
                </strong>
                . I specialize in building high-fidelity dashboards, reports, and
                analytical systems that help stakeholders understand what is
                happening in the data and what they should focus on next.
              </p>
              <p>
                My workflow relies on profound technical execution using{" "}
                <strong className="text-candle">
                  SQL, Python, Power BI, and complex analytics workflows
                </strong>
                . However, what truly separates my work is my relentless focus on
                UI clarity. I don't just calculate numbers; I present them in a
                way that feels clear, practical, and visually irresistible.
              </p>
              <p>
                Because of my front-end expertise, I possess a refined eye for
                layout and interaction. This ensures that every dashboard I
                construct is not only mathematically flawless but functions as a
                premium digital experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative overflow-hidden rounded-3xl border border-candle/10 bg-gradient-to-b from-candle/[0.02] to-transparent p-8 md:p-10 lg:col-span-1 backdrop-blur-sm"
        >
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-candle/10 blur-[80px] transition-all duration-700 group-hover:bg-candle/20" />

          <h4 className="mb-8 border-b border-candle/10 pb-4 font-display text-xl font-bold text-parchment">
            My <span className="text-candle">Journey</span>
          </h4>

          <div className="relative space-y-12 before:absolute before:inset-0 before:left-0 before:h-full before:w-px before:bg-gradient-to-b before:from-candle before:via-candle/50 before:to-transparent">
            {/* EX 1 */}
            <div className="relative flex items-start">
              <div className="absolute -left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-candle bg-[#0B0B0F] text-xs text-candle shadow-[0_0_15px_rgba(230,178,94,0.3)] transition-transform group-hover:scale-110">
                <BriefcaseIcon size={16} />
              </div>
              <div className="ml-10 w-full">
                <div className="mb-3 inline-block rounded-full border border-candle/20 bg-candle/10 px-3 py-1 font-display text-[10px] font-black uppercase tracking-[0.2em] text-candle">
                  Present
                </div>
                <h5 className="mb-1 font-display text-lg font-bold text-parchment transition-colors group-hover:text-candle">
                  Data Analyst
                </h5>
                <div className="mb-3 font-heading text-sm font-semibold text-parchment/40">
                  Digilians | MCIT
                </div>
                <p className="max-w-md font-heading text-xs leading-relaxed text-parchment/60">
                  Architecting KPI dashboards, developing sophisticated SQL
                  reporting queries, and deploying prompt engineering solutions.
                </p>
              </div>
            </div>

            {/* EX 2 */}
            <div className="relative flex items-start">
              <div className="absolute -left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-candle/60 bg-[#0B0B0F] text-xs text-candle/80 shadow-[0_0_15px_rgba(230,178,94,0.2)] transition-transform group-hover:scale-110">
                <CodeIcon size={16} />
              </div>
              <div className="ml-10 w-full">
                <div className="mb-3 font-display text-[10px] font-black uppercase tracking-[0.2em] text-parchment/30">
                  2022 - 2023
                </div>
                <h5 className="mb-1 font-display text-lg font-bold text-parchment transition-colors group-hover:text-candle/80">
                  Front-End Dev
                </h5>
                <div className="mb-3 font-heading text-xs font-bold text-candle/80">
                  Udacity Nano Degree
                </div>
                <p className="max-w-md font-heading text-xs leading-relaxed text-parchment/60">
                  Mastered the core Web stack (HTML5, CSS3, JS) to build
                  responsive, API-integrated web apps. (GPA: 4)
                </p>
              </div>
            </div>

            {/* EX 3 */}
            <div className="relative flex items-start">
              <div className="absolute -left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-candle/40 bg-[#0B0B0F] text-xs text-candle/60 shadow-[0_0_15px_rgba(230,178,94,0.1)] transition-transform group-hover:scale-110">
                <GraduationCapIcon size={16} />
              </div>
              <div className="ml-10 w-full">
                <div className="mb-3 font-display text-[10px] font-black uppercase tracking-[0.2em] text-parchment/30">
                  2020 - 2024
                </div>
                <h5 className="mb-1 font-display text-lg font-bold text-parchment transition-colors group-hover:text-candle/60">
                  Bachelor of Laws
                </h5>
                <div className="mb-3 font-heading text-xs font-bold text-candle/60">
                  Port Said University
                </div>
                <p className="max-w-md font-heading text-xs leading-relaxed text-parchment/60">
                  Developed critical thinking, analytical reasoning, and complex
                  logic patterns through Commercial and Corporate Law.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
