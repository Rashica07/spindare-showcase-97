"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { AnimatedWords, BlurReveal } from "@/components/AnimatedText";

const testimonials = [
  {
    name: "Alex M.",
    role: "Senior Full-Stack Developer",
    avatar: "AM",
    gradient: "from-blue-500 to-cyan-500",
    quote:
      "Kristian has an exceptional ability to pick up complex concepts quickly. His work on Spindare shows a level of architectural thinking you rarely see from someone just starting out. He's going to be dangerous when he's older.",
  },
  {
    name: "Sara K.",
    role: "UI/UX Designer",
    avatar: "SK",
    gradient: "from-pink-500 to-rose-500",
    quote:
      "Working alongside Kristian was refreshing. He actually cares about design, not just functionality — and he asks the right questions. The attention to detail in his interfaces is genuinely impressive.",
  },
  {
    name: "Luca B.",
    role: "Backend Engineer",
    avatar: "LB",
    gradient: "from-violet-500 to-purple-500",
    quote:
      "Most junior devs write code that works. Kristian writes code that's structured well too. He understands why things like database design and API structure matter, which puts him ahead of the curve.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label">🗣️ Testimonials</p>
          <AnimatedWords as="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            What people say
          </AnimatedWords>
          <BlurReveal delay={0.2}>
            <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-xl mx-auto">
              Feedback from developers, designers, and collaborators I've worked alongside.
            </p>
          </BlurReveal>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, avatar, gradient, quote }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="glass rounded-3xl p-6 flex flex-col gap-4 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-default"
            >
              {/* Quote icon */}
              <div className="p-2 rounded-xl bg-primary/10 w-fit">
                <Quote className="w-4 h-4 text-primary" />
              </div>

              {/* Quote text */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}
                >
                  <span className="text-xs font-bold text-white">{avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
