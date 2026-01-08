"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import apiRequest from "@/lib/api";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingName, setLoadingName] = useState(false);

  // Step 1: Email submit triggers name modal
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setShowNameModal(true);
  };

  // Step 2: Name submit sends both email and name
  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setLoadingName(true);
    setError("");
    try {
      await apiRequest("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email, name }),
      });
      setSubmitted(true);
      setShowNameModal(false);
      setName("");
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoadingName(false);
    }
  };

  return (
    <main className="bg-background px-4 relative overflow-x-hidden">
      {/* Fullscreen Hero */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center max-w-none relative" style={{minHeight: '100dvh'}}>
        <h1 className="text-display-xl md:text-display-2xl font-extrabold text-center text-foreground leading-tight mb-6">
          One Goal.<br />No Noise.
        </h1>
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-10 max-w-xl">
          The antidote to decision fatigue. Eliminate the clutter and focus on one thing at a time.
        </p>
        {submitted ? (
          <div className="text-green-600 text-center font-semibold text-lg mt-8">Thank you for joining the waitlist!</div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center w-full gap-4 justify-center max-w-lg"
          >
            <div className="relative w-full md:w-auto flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5.5A2.5 2.5 0 0 1 5 3h10a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 15 17H5a2.5 2.5 0 0 1-2.5-2.5v-9Zm1.6.4 6.4 4.8 6.4-4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="pl-10 pr-4 py-3 rounded-md border border-input w-full focus:outline-none focus:ring-2 focus:ring-primary text-lg bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loadingSubmit}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto text-lg font-semibold"
              disabled={loadingSubmit}
            >
              {loadingSubmit ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        )}

        {/* Name Modal */}
        <Modal open={showNameModal} onClose={() => setShowNameModal(false)} title="We forgot to ask! What's your name?">
          <form onSubmit={handleNameSubmit} className="flex flex-col gap-4 items-center">
            <input
              type="text"
              required
              placeholder="Enter your name"
              className="px-4 py-3 rounded-md border border-input w-full focus:outline-none focus:ring-2 focus:ring-primary text-lg bg-background"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loadingName}
              autoFocus
            />
            <Button type="submit" size="lg" className="w-full text-lg font-semibold" disabled={loadingName}>
              {loadingName ? "Saving..." : "Submit"}
            </Button>
          </form>
        </Modal>
        {error && (
          <div className="text-red-600 text-center font-semibold text-sm mt-4">{error}</div>
        )}
        <div className="text-muted-foreground text-center text-sm mt-4">
          Join 2,000+ people seeking clarity.
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center animate-bounce z-10">
          <span className="text-muted-foreground text-xs mb-1">Scroll</span>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="text-primary">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full flex flex-col items-center pt-10 pb-20 bg-background">
        <div className="max-w-3xl w-full px-4 mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Clarity in a chaotic world</h2>
          <p className="text-lg md:text-xl text-muted-foreground">We stripped away the features you don’t need to help you focus on the one that matters.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl px-4 mx-auto">
          {/* Single Focus */}
          <div className="flex-1 bg-muted rounded-2xl p-8 flex flex-col items-start shadow-sm">
            <div className="bg-white rounded-xl p-3 mb-6 shadow flex items-center justify-center">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-primary"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M9.5 12a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" stroke="#1877f2" strokeWidth="1.5"/></svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-foreground">Single Focus</h3>
            <p className="text-muted-foreground text-base">One goal at a time — nothing else allowed. Complete it before you move on.</p>
          </div>
          {/* AI Accountability */}
          <div className="flex-1 bg-muted rounded-2xl p-8 flex flex-col items-start shadow-sm">
            <div className="bg-white rounded-xl p-3 mb-6 shadow flex items-center justify-center">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-primary"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4l2 2" stroke="#1877f2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12h6" stroke="#1877f2" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-foreground">AI Accountability</h3>
            <p className="text-muted-foreground text-base">Gentle AI nudges that keep you accountable without the shame or pressure.</p>
          </div>
          {/* Mindful Progress */}
          <div className="flex-1 bg-muted rounded-2xl p-8 flex flex-col items-start shadow-sm">
            <div className="bg-white rounded-xl p-3 mb-6 shadow flex items-center justify-center">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-primary"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v8" stroke="#1877f2" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 16h8" stroke="#1877f2" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 12l2-2" stroke="#1877f2" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-foreground">Mindful Progress</h3>
            <p className="text-muted-foreground text-base">Reflection, mood tracking, and progress visualization without the overwhelm.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full flex flex-col items-center pt-16 pb-24 bg-background">
        <div className="max-w-3xl w-full px-4 mx-auto text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg md:text-xl text-muted-foreground">A simple loop for complex lives.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 w-full max-w-5xl px-4 mx-auto justify-between">
          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-white shadow flex items-center justify-center mb-8 border border-gray-200">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="text-foreground"><rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/><rect x="7" y="2" width="2" height="4" rx="1" fill="currentColor"/><rect x="15" y="2" width="2" height="4" rx="1" fill="currentColor"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">1. Choose Timeframe</h3>
            <p className="text-muted-foreground text-base text-center max-w-xs">Decide if you’re sprinting for the day or pacing for the month.</p>
          </div>
          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-white shadow flex items-center justify-center mb-8 border border-gray-200">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="text-foreground"><rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="10" y="12" width="4" height="4" rx="1" fill="currentColor"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">2. Set One Goal</h3>
            <p className="text-muted-foreground text-base text-center max-w-xs">Commit to a single objective.</p>
          </div>
          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-white shadow flex items-center justify-center mb-8 border border-gray-200">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="text-foreground"><rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 12l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">3. Stay Focused</h3>
            <p className="text-muted-foreground text-base text-center max-w-xs">Receive gentle reminders and reflect on your progress anytime.</p>
          </div>
        </div>
      </section>
            {/* Audience Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto px-4 py-20">
        {/* Left: Headline and checklist */}
        <div className="flex-1 min-w-[320px]">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">For anyone tired of "too many tabs open" in their brain.</h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-3 text-lg text-muted-foreground">
              <span className="mt-1">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-primary"><circle cx="12" cy="12" r="12" fill="#1877f2"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span>Ambitious professionals suffering from decision fatigue</span>
            </li>
            <li className="flex items-start gap-3 text-lg text-muted-foreground">
              <span className="mt-1">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-primary"><circle cx="12" cy="12" r="12" fill="#1877f2"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span>Creatives and founders seeking clarity amidst chaos</span>
            </li>
            <li className="flex items-start gap-3 text-lg text-muted-foreground">
              <span className="mt-1">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-primary"><circle cx="12" cy="12" r="12" fill="#1877f2"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span>Students who need to strip away distractions</span>
            </li>
          </ul>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex items-center justify-center min-w-[320px]">
          <div className="w-full max-w-md aspect-[1.7/1] bg-muted rounded-2xl border border-gray-200 flex items-center justify-center relative overflow-hidden">
            {/* Browser window lines */}
            <div className="absolute top-6 left-6 w-1/4 h-2 bg-gray-200 rounded-full" />
            <div className="absolute top-6 right-6 w-1/5 h-2 bg-gray-200 rounded-full" />
            <div className="absolute bottom-6 left-6 w-1/3 h-2 bg-gray-200 rounded-full" />
            {/* Card in the middle */}
            <div className="relative z-10 bg-white rounded-xl shadow-lg px-8 py-10 flex flex-col items-center" style={{ minWidth: 220 }}>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#e3f0ff"/><path d="M10 5v5" stroke="#1877f2" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 13h.01" stroke="#1877f2" strokeWidth="2" strokeLinecap="round"/><path d="M10 10l2-2" stroke="#1877f2" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div className="h-3 w-32 bg-gray-100 rounded-full mb-2" />
              <div className="h-3 w-20 bg-gray-100 rounded-full" />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full flex flex-col items-center py-24 bg-background">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">Ready to focus?</h2>
        {submitted ? (
          <div className="text-green-600 text-center font-semibold text-lg mt-8">Thank you for joining the waitlist!</div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto"
              style={{ maxWidth: 600 }}
            >
              <div className="relative w-full md:w-auto flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5.5A2.5 2.5 0 0 1 5 3h10a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 15 17H5a2.5 2.5 0 0 1-2.5-2.5v-9Zm1.6.4 6.4 4.8 6.4-4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="pl-12 pr-4 py-3 rounded-lg border border-input w-full focus:outline-none focus:ring-2 focus:ring-primary text-lg bg-muted"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loadingSubmit}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto text-lg font-semibold"
                disabled={loadingSubmit}
              >
                {loadingSubmit ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
            {error && (
              <div className="text-red-600 text-center font-semibold text-sm mt-4">{error}</div>
            )}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-gray-200 mt-0">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm">© 2024 One Goal Inc. All rights reserved.</div>
          <div className="flex items-center gap-8">
            <a href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition">Privacy</a>
            <a href="/terms" className="text-muted-foreground hover:text-primary text-sm transition">Terms</a>
            <a href="https://twitter.com/onegoalhq" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-sm transition flex items-center gap-1">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M22 5.924c-.793.352-1.646.59-2.54.697a4.48 4.48 0 0 0 1.965-2.47c-.87.516-1.834.89-2.86 1.093A4.48 4.48 0 0 0 12.07 9.5c0 .352.04.695.116 1.022-3.726-.187-7.033-1.97-9.244-4.68a4.48 4.48 0 0 0-.606 2.254c0 1.555.792 2.927 2.003 3.733a4.48 4.48 0 0 1-2.03-.56v.057a4.48 4.48 0 0 0 3.594 4.393c-.385.104-.792.16-1.21.16-.297 0-.58-.028-.86-.08.58 1.81 2.263 3.13 4.26 3.166A8.98 8.98 0 0 1 2 19.07a12.67 12.67 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.18 9.18 0 0 0 24 4.59a8.98 8.98 0 0 1-2.6.715Z" fill="currentColor"/></svg>
              Twitter
            </a>
            <a href="https://instagram.com/onegoalhq" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-sm transition flex items-center gap-1">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="7" r="1.5" fill="currentColor"/></svg>
              Instagram
            </a>
            <a href="https://linkedin.com/company/onegoalhq" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-sm transition flex items-center gap-1">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/><path d="M8 11v5M8 8v.01M12 11v5m0-5a2 2 0 0 1 4 0v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
