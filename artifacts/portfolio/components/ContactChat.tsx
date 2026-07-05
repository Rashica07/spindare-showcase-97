'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

type Step = "service" | "timeline" | "description" | "name" | "method" | "contactValue" | "review" | "done";
type Method = "email" | "phone";

interface Bubble {
  from: "bot" | "user";
  text: string;
}

export function ContactChat() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const c = t.contact.chat;
  const f = t.funnel.fields;

  const [step, setStep] = useState<Step>("service");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [method, setMethod] = useState<Method>("email");
  const [submitting, setSubmitting] = useState(false);

  const answers = useRef<{ service?: string; timeline?: string; description?: string; name?: string; contactValue?: string }>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const initRan = useRef(false);

  const say = (text: string, delay = 550) =>
    new Promise<void>((resolve) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setBubbles((prev) => [...prev, { from: "bot", text }]);
        resolve();
      }, delay);
    });

  useEffect(() => {
    if (initRan.current) return;
    initRan.current = true;
    (async () => {
      await say(c.greeting, 400);
      await say(c.qService, 500);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [bubbles, typing]);

  async function pickOption(field: "service" | "timeline", value: string) {
    setBubbles((prev) => [...prev, { from: "user", text: value }]);
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
    setBubbles((prev) => [...prev, { from: "user", text: val }]);
    setInputValue("");

    if (step === "description") {
      answers.current.description = val;
      setStep("name");
      await say(c.qName);
    } else if (step === "name") {
      answers.current.name = val;
      setStep("method");
      await say(c.qMethod);
    } else if (step === "contactValue") {
      answers.current.contactValue = val;
      setStep("review");
      await say(`${c.summaryIntro}`);
    }
  }

  async function chooseMethod(m: Method) {
    setMethod(m);
    setBubbles((prev) => [...prev, { from: "user", text: m === "email" ? c.methodEmail : c.methodPhone }]);
    setStep("contactValue");
  }

  function switchMethod() {
    const next: Method = method === "email" ? "phone" : "email";
    setMethod(next);
    answers.current.contactValue = undefined;
    setInputValue("");
    setStep("contactValue");
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.current.name,
          contactMethod: method,
          contactValue: answers.current.contactValue,
          service: answers.current.service,
          timeline: answers.current.timeline,
          description: answers.current.description,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStep("done");
    } catch {
      toast({ title: "Error", description: "Failed to send. Please email contact@kiqa-dev.it directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  function restart() {
    answers.current = {};
    setMethod("email");
    setInputValue("");
    setBubbles([]);
    setStep("service");
    initRan.current = false;
    (async () => {
      initRan.current = true;
      await say(c.greeting, 300);
      await say(c.qService, 400);
    })();
  }

  const showTextInput = step === "description" || step === "name" || step === "contactValue";
  const textPlaceholder =
    step === "description" ? c.descriptionPh :
    step === "name" ? c.namePh :
    method === "email" ? c.emailPh : c.phonePh;
  const textInputType = step === "contactValue" && method === "phone" ? "tel" : step === "contactValue" ? "email" : "text";

  return (
    <div className="glass-card rounded-xl flex flex-col overflow-hidden" data-testid="contact-chat" style={{ height: 560 }}>
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 shrink-0">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{c.intro}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="self-start bg-card border border-border/60 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1"
            data-testid="chat-typing"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </motion.div>
        )}

        {/* quick reply options */}
        {!typing && step === "service" && bubbles.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1" data-testid="chat-options-service">
            {f.serviceOptions.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => pickOption("service", opt)}
                className="text-xs font-medium border border-primary/30 text-primary rounded-full px-3.5 py-2 hover:bg-primary/10 transition-colors"
                data-testid={`chat-option-service-${i}`}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        )}

        {!typing && step === "timeline" && (
          <div className="flex flex-wrap gap-2 mt-1" data-testid="chat-options-timeline">
            {f.timelineOptions.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => pickOption("timeline", opt)}
                className="text-xs font-medium border border-primary/30 text-primary rounded-full px-3.5 py-2 hover:bg-primary/10 transition-colors"
                data-testid={`chat-option-timeline-${i}`}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        )}

        {!typing && step === "method" && (
          <div className="flex flex-col items-start gap-3 mt-1" data-testid="chat-method-toggle">
            <div className="relative flex items-center bg-card border border-border/60 rounded-full p-1">
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-primary"
                initial={false}
                animate={{ left: method === "email" ? 4 : "50%", width: "calc(50% - 4px)" }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
              <button
                onClick={() => chooseMethod("email")}
                className={`relative z-10 flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-colors ${method === "email" ? "text-primary-foreground" : "text-muted-foreground"}`}
                data-testid="chat-method-email"
              >
                <Mail size={13} /> {c.methodEmail}
              </button>
              <button
                onClick={() => chooseMethod("phone")}
                className={`relative z-10 flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-colors ${method === "phone" ? "text-primary-foreground" : "text-muted-foreground"}`}
                data-testid="chat-method-phone"
              >
                <Phone size={13} /> {c.methodPhone}
              </button>
            </div>
          </div>
        )}

        {!typing && step === "review" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="self-start w-full border border-primary/25 bg-primary/5 rounded-xl p-4 flex flex-col gap-3 mt-1"
            data-testid="chat-review"
          >
            <div className="text-xs text-muted-foreground space-y-1 font-mono">
              <p><span className="text-foreground/70">{f.service}:</span> {answers.current.service}</p>
              <p><span className="text-foreground/70">{f.timeline}:</span> {answers.current.timeline}</p>
              <p><span className="text-foreground/70">{f.name}:</span> {answers.current.name}</p>
              <p className="flex items-center gap-2">
                <span className="text-foreground/70">{method === "email" ? c.methodEmail : c.methodPhone}:</span> {answers.current.contactValue}
                <button
                  type="button"
                  onClick={switchMethod}
                  data-testid="chat-switch-method-review"
                  className="ml-auto text-primary hover:underline"
                >
                  {c.switchMethod} {method === "email" ? c.methodPhone : c.methodEmail}
                </button>
              </p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={submitting}
                data-testid="chat-submit"
                className="flex-1 py-2.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />{c.sending}</>
                ) : (
                  <>{c.submit}<ArrowRight size={13} /></>
                )}
              </motion.button>
              <button onClick={restart} data-testid="chat-restart" className="px-3 py-2.5 text-xs text-muted-foreground hover:text-foreground border border-border/60 rounded-lg transition-colors">
                {c.restart}
              </button>
            </div>
          </motion.div>
        )}

        {!typing && step === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="self-start w-full border border-primary/30 bg-primary/5 rounded-xl p-6 text-center mt-1"
            data-testid="chat-done"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3"><Check size={20} className="text-primary" /></div>
            <p className="text-sm font-semibold text-foreground">{t.contact.form.sent}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t.contact.form.sentSub}</p>
            <button onClick={restart} data-testid="chat-send-another" className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border/60 rounded-lg px-4 py-2">
              {t.contact.form.another}
            </button>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {showTextInput && (
        <div className="border-t border-border/40 shrink-0">
          {step === "contactValue" && (
            <div className="px-4 pt-2.5 flex justify-end">
              <button
                type="button"
                onClick={switchMethod}
                data-testid="chat-switch-method"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                {method === "email" ? <Phone size={12} /> : <Mail size={12} />}
                {c.switchMethod} {method === "email" ? c.methodPhone : c.methodEmail}
              </button>
            </div>
          )}
          <form
            onSubmit={(e) => { e.preventDefault(); submitText(); }}
            className="flex items-center gap-2 px-4 py-3"
          >
            <input
              autoFocus
              type={textInputType}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={textPlaceholder}
              data-testid="chat-text-input"
              className="flex-1 bg-background border border-border/60 rounded-lg px-3.5 py-2.5 text-sm font-mono outline-none focus:border-primary/50 transition-colors"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="chat-text-submit"
              className="shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40"
              disabled={!inputValue.trim()}
            >
              <ArrowRight size={16} />
            </motion.button>
          </form>
        </div>
      )}
    </div>
  );
}
