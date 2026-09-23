'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

type Step = "service" | "timeline" | "description" | "name" | "email" | "review" | "done";

interface Bubble {
  from: "bot" | "user";
  text: string;
}

const optionClass =
  "text-sm font-medium border border-primary/30 text-primary rounded-full px-4 py-2.5 hover:bg-primary/10 transition-colors";

// Scripted intake: a guided version of the plain <ContactForm> (which is what
// visitors without working JavaScript get instead). Both post the same fields
// to /submit-contact.
export function ContactChat() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const c = t.contact.chat;
  const f = t.funnel.fields;

  const [step, setStep] = useState<Step>("service");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const answers = useRef<{ service?: string; timeline?: string; description?: string; name?: string; email?: string }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const initRan = useRef(false);

  const say = (text: string, delay = 450) =>
    new Promise<void>((resolve) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setBubbles((prev) => [...prev, { from: "bot", text }]);
        resolve();
      }, delay);
    });

  const start = async () => {
    await say(c.greeting, 300);
    await say(c.qService, 400);
  };

  useEffect(() => {
    if (initRan.current) return;
    initRan.current = true;
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll only the message list. scrollIntoView() would scroll the whole
  // page down to the chat as soon as the greeting appears.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [bubbles, typing, step]);

  const addUser = (text: string) => setBubbles((prev) => [...prev, { from: "user", text }]);

  async function pickOption(field: "service" | "timeline", value: string) {
    addUser(value);
    answers.current[field] = value;
    if (field === "service") {
      setStep("timeline");
      await say(c.qTimeline);
    } else {
      setStep("description");
      await say(c.qDescription);
    }
  }

  async function submitText() {
    const val = inputValue.trim();
    if (!val) return;
    addUser(val);
    setInputValue("");

    if (step === "description") {
      answers.current.description = val;
      setStep("name");
      await say(c.qName);
    } else if (step === "name") {
      answers.current.name = val;
      setStep("email");
      await say(c.qMethod);
    } else if (step === "email") {
      answers.current.email = val;
      setStep("review");
      await say(c.summaryIntro);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers.current),
      });
      if (!res.ok) throw new Error("failed");
      setStep("done");
    } catch {
      toast({ title: c.errorTitle, description: c.errorDesc, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  function restart() {
    answers.current = {};
    setInputValue("");
    setBubbles([]);
    setStep("service");
    start();
  }

  const showTextInput = step === "description" || step === "name" || step === "email";
  const textPlaceholder = step === "description" ? c.descriptionPh : step === "name" ? c.namePh : c.emailPh;

  return (
    <div className="glass-card rounded-xl flex flex-col overflow-hidden min-h-[320px] max-h-[600px]" data-testid="contact-chat">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 shrink-0">
        <span className="w-2 h-2 rounded-full bg-primary" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{c.intro}</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3" aria-live="polite">
        <AnimatePresence initial={false}>
          {bubbles.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                b.from === "bot"
                  ? "self-start bg-card border border-border/60 text-foreground rounded-bl-sm"
                  : "self-end bg-primary text-primary-foreground rounded-br-sm"
              }`}
              data-testid={`chat-bubble-${b.from}-${i}`}
            >
              {b.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="self-start bg-card border border-border/60 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1" data-testid="chat-typing" aria-label={c.typing}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: `${i * 120}ms` }} />
            ))}
          </div>
        )}

        {!typing && step === "service" && bubbles.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1" data-testid="chat-options-service">
            {f.serviceOptions.map((opt, i) => (
              <button key={i} type="button" onClick={() => pickOption("service", opt)} className={optionClass} data-testid={`chat-option-service-${i}`}>
                {opt}
              </button>
            ))}
          </div>
        )}

        {!typing && step === "timeline" && (
          <div className="flex flex-wrap gap-2 mt-1" data-testid="chat-options-timeline">
            {f.timelineOptions.map((opt, i) => (
              <button key={i} type="button" onClick={() => pickOption("timeline", opt)} className={optionClass} data-testid={`chat-option-timeline-${i}`}>
                {opt}
              </button>
            ))}
          </div>
        )}

        {!typing && step === "review" && (
          <div className="self-start w-full border border-primary/25 bg-primary/5 rounded-xl p-4 flex flex-col gap-3 mt-1" data-testid="chat-review">
            <dl className="text-xs text-muted-foreground space-y-1 font-mono">
              <div><dt className="inline text-foreground/70">{f.service}:</dt> <dd className="inline">{answers.current.service}</dd></div>
              <div><dt className="inline text-foreground/70">{f.timeline}:</dt> <dd className="inline">{answers.current.timeline}</dd></div>
              <div><dt className="inline text-foreground/70">{f.name}:</dt> <dd className="inline">{answers.current.name}</dd></div>
              <div><dt className="inline text-foreground/70">{c.methodEmail}:</dt> <dd className="inline">{answers.current.email}</dd></div>
            </dl>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                data-testid="chat-submit"
                className="flex-1 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />{c.sending}</>
                ) : (
                  <>{c.submit}<ArrowRight size={14} /></>
                )}
              </button>
              <button type="button" onClick={restart} data-testid="chat-restart" className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground border border-border/60 rounded-lg transition-colors">
                {c.restart}
              </button>
            </div>
          </div>
        )}

        {!typing && step === "done" && (
          <div className="self-start w-full border border-primary/30 bg-primary/5 rounded-xl p-6 text-center mt-1" data-testid="chat-done">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3"><Check size={20} className="text-primary" /></div>
            <p className="text-sm font-semibold text-foreground">{t.contact.form.sent}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t.contact.form.sentSub}</p>
            <button type="button" onClick={restart} data-testid="chat-send-another" className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border/60 rounded-lg px-4 py-2.5">
              {t.contact.form.another}
            </button>
          </div>
        )}
      </div>

      {showTextInput && (
        <form
          onSubmit={(e) => { e.preventDefault(); submitText(); }}
          className="flex items-center gap-2 px-4 py-3 border-t border-border/40 shrink-0"
        >
          <input
            autoFocus
            type={step === "email" ? "email" : "text"}
            autoComplete={step === "email" ? "email" : step === "name" ? "name" : "off"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={textPlaceholder}
            aria-label={textPlaceholder}
            data-testid="chat-text-input"
            className="flex-1 min-w-0 bg-background border border-border/60 rounded-lg px-3.5 py-2.5 text-base sm:text-sm font-mono outline-none focus:border-primary/50 transition-colors"
          />
          <button
            type="submit"
            aria-label={c.submit}
            data-testid="chat-text-submit"
            className="shrink-0 w-11 h-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40"
            disabled={!inputValue.trim()}
          >
            <ArrowRight size={16} />
          </button>
        </form>
      )}
    </div>
  );
}
