"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─── Intersection Observer hook for reveal animations ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-forest-dark/95 backdrop-blur-sm py-4 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center">
          <Image
            src="/logotype.png"
            alt="Courtside Vending"
            width={140}
            height={50}
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#about" className="nav-link">About</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#machines" className="nav-link">Machines</a>
          <a href="#partner" className="nav-link">Partner With Us</a>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a href="#contact" className="btn-primary text-xs">Get In Touch</a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-cream transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-cream transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-cream transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-forest-dark/98 px-8 py-6 flex flex-col gap-6 border-t border-white/10">
          {["About", "How It Works", "Machines", "Partner With Us"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="nav-link text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-center mt-2" onClick={() => setMenuOpen(false)}>
            Get In Touch
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?fit=crop&w=1920&q=85"
          alt="Aerial view of a clay tennis court"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest-dark/50 to-forest-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="section-label text-olive mb-6 fade-up">Est. Miami, FL</p>

        <h1 className="font-display text-cream mb-2 leading-none fade-up fade-up-delay-1">
          <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-widest uppercase">
            Courtside
          </span>
          <span className="font-script text-olive text-6xl sm:text-7xl md:text-9xl lg:text-[8rem] leading-tight block">
            Vending
          </span>
        </h1>

        <div className="divider-olive my-8 fade-up fade-up-delay-2" />

        <p className="font-body text-cream/80 text-xl md:text-2xl font-light max-w-xl mx-auto leading-relaxed fade-up fade-up-delay-3">
          Premium vending solutions designed for the discerning tennis player.
          Everything you need, always courtside.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10 fade-up fade-up-delay-4">
          <a href="#about" className="btn-primary">Discover More</a>
          <a href="#partner" className="btn-cream">Partner With Us</a>
        </div>
      </div>

    </section>
  );
}

/* ─── About ─── */
function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="bg-warm-white py-32 px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div>
            <p className="section-label mb-6">Our Mission</p>
            <h2 className="font-display text-forest-dark text-4xl md:text-5xl leading-tight mb-2">
              Elevating the
            </h2>
            <h2 className="font-script text-olive text-5xl md:text-6xl mb-8">
              Court Experience
            </h2>
            <div className="w-14 h-px bg-forest mb-8" />
            <p className="font-body text-forest-dark/80 text-lg leading-relaxed mb-6">
              Tennis is a sport of precision, elegance, and dedication. Yet too often,
              the moment a player needs a fresh can of balls or a cold drink, the experience
              is broken — a long walk, a closed pro shop, a vending machine that wasn&apos;t
              built with the court in mind.
            </p>
            <p className="font-body text-forest-dark/80 text-lg leading-relaxed mb-10">
              Courtside Vending changes that. We place thoughtfully designed, premium
              vending machines directly at tennis facilities — stocked with everything
              a player needs to stay in the game, in style.
            </p>
            <a href="#how-it-works" className="btn-dark">How It Works</a>
          </div>

          {/* Image / decorative panel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-sm aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1530915365347-e35b749a0381?fit=crop&w=800&q=85"
                alt="Tennis player detail on clay court"
                fill
                className="object-cover object-center"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-olive/30 rounded-sm -z-10" />
            <div className="absolute -bottom-8 -right-8 w-full h-full border border-olive/15 rounded-sm -z-20" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats strip ─── */
function Stats() {
  const { ref, visible } = useReveal();
  const stats = [
    { value: "24/7", label: "Always Available" },
    { value: "100%", label: "Court-Side Placement" },
    { value: "Zero", label: "Hassle. Ever." },
    { value: "∞", label: "Match Days Improved" },
  ];

  return (
    <section className="bg-forest py-20 px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {stats.map(({ value, label }, i) => (
          <div key={i} className="text-center">
            <div className="font-display text-olive text-5xl md:text-6xl mb-3">{value}</div>
            <div className="font-sans-light text-cream/70 text-xs tracking-widest uppercase">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const { ref, visible } = useReveal();
  const steps = [
    {
      number: "01",
      title: "We Partner With You",
      body:
        "We work with tennis clubs, resorts, and recreational facilities to identify the ideal machine placement — seamlessly integrated into your courts.",
    },
    {
      number: "02",
      title: "We Install & Stock",
      body:
        "Our team handles full installation at no cost to you. We stock each machine with premium tennis balls and court accessories.",
    },
    {
      number: "03",
      title: "Players Play, You Earn",
      body:
        "Your players enjoy uninterrupted access to everything they need — zero overhead, zero management required on your end.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-cream py-32 px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <p className="section-label mb-6">The Process</p>
          <h2 className="font-display text-forest-dark text-4xl md:text-5xl mb-2">How It</h2>
          <h2 className="font-script text-olive text-5xl md:text-6xl mb-8">Works</h2>
          <div className="divider-olive" />
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map(({ number, title, body }, i) => (
            <div
              key={i}
              className={`transition-all duration-1000 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="font-display text-olive/30 text-8xl mb-4 leading-none">{number}</div>
              <div className="w-8 h-px bg-olive mb-6" />
              <h3 className="font-display text-forest-dark text-xl mb-4">{title}</h3>
              <p className="font-body text-forest-dark/70 text-lg leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Machines / Products ─── */
function Machines() {
  const { ref, visible } = useReveal();
  const items = [
    {
      icon: "◉",
      category: "Tennis Balls",
      products: ["A curated selection of tennis balls for every level of play"],
    },
    {
      icon: "◎",
      category: "Tennis Accessories",
      products: ["A selection of essential tennis accessories to keep you game-ready"],
    },
  ];

  return (
    <section id="machines" className="bg-forest-dark py-32 px-6 relative overflow-hidden">
      {/* Subtle court lines decoration */}
      <svg className="court-lines" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <rect x="360" y="80" width="720" height="640" fill="none" stroke="white" strokeWidth="1" />
        <line x1="360" y1="400" x2="1080" y2="400" stroke="white" strokeWidth="1" />
        <line x1="720" y1="80" x2="720" y2="720" stroke="white" strokeWidth="1" />
        <rect x="480" y="80" width="480" height="640" fill="none" stroke="white" strokeWidth="0.5" />
      </svg>

      <div
        ref={ref}
        className={`max-w-6xl mx-auto relative z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <p className="section-label mb-6">What We Offer</p>
          <h2 className="font-display text-cream text-4xl md:text-5xl mb-2">Stocked for</h2>
          <h2 className="font-script text-olive text-5xl md:text-6xl mb-8">Excellence</h2>
          <div className="divider-olive" />
          <p className="font-body text-cream/60 text-lg mt-8 max-w-xl mx-auto">
            Every machine is stocked exclusively with tennis balls and accessories —
            everything a player needs to stay on the court, always within reach.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/10 max-w-3xl mx-auto w-full">
          {items.map(({ icon, category, products }, i) => (
            <div
              key={i}
              className="bg-forest-dark p-8 group hover:bg-forest transition-colors duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-olive text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
              <h3 className="font-display text-cream text-base mb-6 tracking-wide">{category}</h3>
              <ul className="space-y-3">
                {products.map((p, j) => (
                  <li key={j} className="font-body text-cream/60 text-base flex items-start gap-2">
                    <span className="text-olive mt-1 text-xs">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Machine showcase */}
        <div className="mt-24 flex justify-center">
          <div className="relative" style={{ maxWidth: "460px", width: "100%" }}>
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src="/machine-render.png"
                alt="Courtside Vending Machine on a tennis court"
                width={920}
                height={1200}
                className="w-full h-auto"
              />
            </div>

            {/* Decorative offset frames */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-olive/30 rounded-sm -z-10" />
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-olive/15 rounded-sm -z-20" />

            {/* Label beneath */}
            <p className="font-sans-light text-cream/50 text-xs tracking-widest uppercase text-center mt-8">
              The Courtside Machine
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Courtside ─── */
function WhyCourtside() {
  const { ref, visible } = useReveal();
  const reasons = [
    {
      title: "Zero Cost to You",
      body: "We handle procurement, installation, maintenance, and restocking — all at no cost to your facility.",
    },
    {
      title: "Effortless for You",
      body: "Once installed, the machine runs itself. No management, no overhead, and no disruption to your facility's operations.",
    },
    {
      title: "Premium Aesthetics",
      body: "Our machines are designed to complement the refined look of a high-end tennis facility, not detract from it.",
    },
    {
      title: "Player Satisfaction",
      body: "Happy players come back. Giving them the essentials without leaving the court improves retention and experience.",
    },
    {
      title: "Smart & Cashless",
      body: "Modern payment technology — card, tap, and mobile pay. No cash handling, no jammed machines.",
    },
    {
      title: "Dedicated Support",
      body: "A direct line to our team for restocking, maintenance, and customization. We treat every partner as a priority.",
    },
  ];

  return (
    <section className="bg-warm-white py-32 px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-20">
          <p className="section-label mb-6">The Courtside Difference</p>
          <h2 className="font-display text-forest-dark text-4xl md:text-5xl mb-2">Why Choose</h2>
          <h2 className="font-script text-olive text-5xl md:text-6xl mb-8">Courtside</h2>
          <div className="divider-olive" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {reasons.map(({ title, body }, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-8 h-px bg-olive mb-6" />
              <h3 className="font-display text-forest-dark text-lg mb-4">{title}</h3>
              <p className="font-body text-forest-dark/70 text-lg leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Partner CTA ─── */
function PartnerCTA() {
  const { ref, visible } = useReveal();

  return (
    <section id="partner" className="bg-forest py-32 px-6 relative overflow-hidden">
      {/* Court lines */}
      <svg className="court-lines" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <rect x="220" y="60" width="1000" height="480" fill="none" stroke="white" strokeWidth="1" />
        <line x1="220" y1="300" x2="1220" y2="300" stroke="white" strokeWidth="1" />
        <line x1="720" y1="60" x2="720" y2="540" stroke="white" strokeWidth="1" />
      </svg>

      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="section-label mb-6">Ready to Join Us?</p>
        <h2 className="font-display text-cream text-4xl md:text-5xl mb-2">Partner With</h2>
        <h2 className="font-script text-olive text-5xl md:text-6xl mb-8">Courtside</h2>
        <div className="divider-olive mb-10" />
        <p className="font-body text-cream/70 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          Whether you manage a private club, a municipal facility, or a luxury resort
          with tennis courts — we&apos;d love to bring the Courtside experience to your players.
          Reach out and let&apos;s talk.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#contact" className="btn-primary">Get In Touch</a>
          <a href="#how-it-works" className="btn-cream">Learn More</a>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  // Replace YOUR_FORM_ID with the ID from your Formspree dashboard (formspree.io)
  const FORMSPREE_ID = "mojykvag";

  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: "", facility: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          facility: form.facility,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-cream py-32 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <p className="section-label mb-6">Contact Us</p>
            <h2 className="font-display text-forest-dark text-4xl md:text-5xl mb-2">Let&apos;s</h2>
            <h2 className="font-script text-olive text-5xl md:text-6xl mb-8">Connect</h2>
            <div className="w-8 h-px bg-forest mb-8" />
            <p className="font-body text-forest-dark/70 text-lg leading-relaxed mb-10">
              Interested in bringing Courtside Vending to your facility?
              Fill out the form and our team will be in touch within 24 hours.
            </p>
            <div className="space-y-6">
              <div>
                <p className="font-sans-light text-forest/60 text-xs tracking-widest uppercase mb-1">Email</p>
                <p className="font-body text-forest-dark text-lg">hello@courtsidevend.com</p>
              </div>
              <div>
                <p className="font-sans-light text-forest/60 text-xs tracking-widest uppercase mb-1">Location</p>
                <p className="font-body text-forest-dark text-lg">Miami, Florida</p>
              </div>
              <div>
                <p className="font-sans-light text-forest/60 text-xs tracking-widest uppercase mb-1">Service Area</p>
                <p className="font-body text-forest-dark text-lg">South Florida & Expanding Nationwide</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="h-full flex items-center justify-center text-center py-16">
                <div>
                  <div className="text-olive text-5xl mb-6">✓</div>
                  <h3 className="font-display text-forest-dark text-2xl mb-4">Thank You</h3>
                  <p className="font-body text-forest-dark/70 text-lg">
                    We&apos;ll be in touch shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "John Smith" },
                  { key: "facility", label: "Facility Name", type: "text", placeholder: "The Tennis Club at..." },
                  { key: "email", label: "Email Address", type: "email", placeholder: "john@yourclub.com" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="font-sans-light text-forest/60 text-xs tracking-widest uppercase block mb-2">
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-forest/30 py-3 font-body text-forest-dark text-lg placeholder:text-forest-dark/30 focus:outline-none focus:border-forest transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-sans-light text-forest/60 text-xs tracking-widest uppercase block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your facility..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-forest/30 py-3 font-body text-forest-dark text-lg placeholder:text-forest-dark/30 focus:outline-none focus:border-forest transition-colors resize-none"
                  />
                </div>
                {error && (
                  <p className="font-body text-red-700 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-dark mt-4 w-full text-center disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-forest-dark py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/10 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logotype.png"
              alt="Courtside Vending"
              width={140}
              height={50}
              className="h-10 w-auto mb-6"
            />
            <p className="font-body text-cream/50 text-base leading-relaxed max-w-xs">
              Premium vending solutions for the modern tennis facility.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans-light text-cream/40 text-xs tracking-widest uppercase mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              {["About", "How It Works", "Machines", "Partner With Us", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-body text-cream/60 text-base hover:text-olive transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans-light text-cream/40 text-xs tracking-widest uppercase mb-6">
              Get In Touch
            </p>
            <p className="font-body text-cream/60 text-base mb-2">hello@courtsidevend.com</p>
            <p className="font-body text-cream/60 text-base mb-8">Miami, Florida</p>
            <a href="#contact" className="btn-primary">
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans-light text-cream/30 text-xs tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Courtside Vending. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-sans-light text-cream/30 text-xs tracking-widest uppercase text-center">
              Elevating the Court Experience
            </span>
            <span className="w-4 h-px bg-olive/40" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <HowItWorks />
      <Machines />
      <WhyCourtside />
      <PartnerCTA />
      <Contact />
      <Footer />
    </>
  );
}
