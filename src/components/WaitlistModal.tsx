"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle, Loader2, ArrowRight, Bell } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  product: string;
  description?: string;
  color?: "primary" | "orange";
}

export default function WaitlistModal({ open, onClose, product, description, color = "primary" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isOrange = color === "orange";
  const accentClass = isOrange
    ? "from-orange-400 via-yellow-400 to-red-400"
    : "from-primary via-accent to-secondary";
  const btnClass = isOrange
    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
    : "bg-primary text-primary-foreground glow-primary";
  const iconBg = isOrange ? "bg-orange-500/10 border-orange-500/20" : "bg-primary/10 border-primary/20";
  const iconColor = isOrange ? "text-orange-400" : "text-primary";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
      setStatus("error");
    }
  };

  const close = () => {
    if (status === "loading") return;
    onClose();
    setTimeout(() => {
      setEmail("");
      if (status !== "success") setStatus("idle");
      setErrorMsg("");
    }, 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-[100]"
            style={{ backdropFilter: "blur(4px)" }}
            onClick={close}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex items-center justify-center z-[101] px-4 pointer-events-none"
          >
            <div className="glass-strong border border-border rounded-3xl w-full max-w-md shadow-2xl pointer-events-auto relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accentClass}`} />

              <div className="p-7 sm:p-8">
                <button
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                      className="text-center py-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.05 }}
                        className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5"
                      >
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground mb-2">You're on the list!</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        We'll send one email to{" "}
                        <span className="text-foreground font-medium">{email}</span>{" "}
                        the moment <span className="text-foreground font-semibold">{product}</span> is ready to download.
                        No spam, ever.
                      </p>
                      <button
                        onClick={close}
                        className="px-6 py-2.5 rounded-xl glass border border-border text-sm font-semibold hover:border-primary/40 transition-colors"
                      >
                        Got it 👍
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-3 mb-6 pr-6">
                        <div className={`p-2.5 rounded-xl border shrink-0 ${iconBg}`}>
                          <Bell className={`w-5 h-5 ${iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg leading-tight">
                            Get notified when {product} launches
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {description ?? "One email. No spam. Unsubscribe anytime."}
                          </p>
                        </div>
                      </div>

                      <form onSubmit={submit} className="space-y-4">
                        <div>
                          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 block">
                            Your email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                              placeholder="you@example.com"
                              className="w-full bg-muted/30 border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                              autoFocus
                              data-testid="input-waitlist-email"
                            />
                          </div>
                        </div>

                        <AnimatePresence>
                          {status === "error" && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                            >
                              {errorMsg}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        <button
                          type="submit"
                          disabled={status === "loading" || !email}
                          data-testid="button-waitlist-submit"
                          className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${btnClass}`}
                        >
                          {status === "loading" ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Joining…</>
                          ) : (
                            <>Notify Me <ArrowRight className="w-4 h-4" /></>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
