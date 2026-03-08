import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Dumbbell,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  Loader2,
  type LucideIcon,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Music2,
  Package,
  Phone,
  Quote,
  Settings2,
  ShowerHead,
  Star,
  User,
  Users,
  Wind,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { MembershipPlan, ServiceType, TimeSlot } from "./backend.d";
import {
  useSubmitClassBooking,
  useSubmitContactForm,
  useSubmitMembershipInquiry,
  useSubmitNewsletterSignup,
} from "./hooks/useGymMutations";

/* ─── Animation Variants ───────────────────────────────────────────────────── */
type AnimVariant = {
  hidden: Record<string, number | string>;
  visible: Record<string, number | string>;
};

const fadeInUp: AnimVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft: AnimVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight: AnimVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

/* ─── Scroll Reveal Wrapper ─────────────────────────────────────────────────── */
function ScrollReveal({
  children,
  variants = fadeInUp,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  variants?: AnimVariant;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section Header ─────────────────────────────────────────────────────────── */
function SectionHeader({
  label,
  title,
  centered = true,
}: {
  label: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <ScrollReveal className={`mb-14 ${centered ? "text-center" : ""}`}>
      <div
        className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}
      >
        <div className="h-px w-8 bg-red-500/60" />
        <p className="text-xs font-bold tracking-[0.35em] uppercase text-red-500">
          {label}
        </p>
        <div className="h-px w-8 bg-red-500/60" />
      </div>
      <h2
        className="section-title text-white"
        style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
      >
        {title}
      </h2>
    </ScrollReveal>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────────── */
function Navbar({ onBookNow }: { onBookNow: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll handler setup
  useState(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Membership", href: "#membership" },
    { label: "Gallery", href: "#gallery" },
    { label: "Locations", href: "#locations" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-1">
            <span
              className="text-xl md:text-2xl font-black tracking-tight text-white"
              style={{
                fontFamily:
                  "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                fontWeight: 900,
              }}
            >
              ROY <span className="text-red-500">FITNESS</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onBookNow}
              className="hidden md:flex bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-2 btn-glow transition-all"
              data-ocid="nav.button"
            >
              Book Now
            </Button>
            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-red-400 py-2 text-base font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  onBookNow();
                  setIsOpen(false);
                }}
                className="bg-red-600 hover:bg-red-500 text-white font-bold mt-2"
                data-ocid="nav.button"
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────────── */
function HeroSection({
  onJoinNow,
  onViewPlans,
}: { onJoinNow: () => void; onViewPlans: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-slash"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-gym-bg.dim_1920x1080.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Multi-layer overlays for depth */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      {/* Vignette */}
      <div className="absolute inset-0 hero-vignette" />

      {/* Decorative red vertical line — left gutter accent */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 w-0.5 h-32 hidden lg:block"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.55 0.22 25 / 0.8) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-24">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-5"
        >
          {/* Location badge */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.35em] uppercase px-5 py-2.5 border border-red-500/40 text-red-400 rounded-full bg-red-500/8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-pulse" />
              Est. Indore, India
            </span>
          </motion.div>

          {/* HERO HEADLINE — magazine scale */}
          <motion.h1 variants={fadeInUp} className="hero-headline">
            <span className="text-white block">ROY</span>
            <span className="accent" style={{ color: "oklch(0.62 0.24 25)" }}>
              FITNESS
            </span>
            <span
              className="text-white block"
              style={{
                fontSize: "0.62em",
                letterSpacing: "-0.02em",
                marginTop: "0.08em",
                color: "oklch(0.88 0 0)",
              }}
            >
              GYM
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl font-normal leading-relaxed tracking-wide mt-1"
          >
            Transform Your Body.{" "}
            <span className="text-white font-semibold">Build Strength.</span>{" "}
            Stay Consistent.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mt-3"
          >
            <Button
              onClick={onJoinNow}
              size="lg"
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wider uppercase px-10 py-4 h-auto btn-glow transition-all duration-300 border border-red-500 rounded-none"
              data-ocid="hero.primary_button"
            >
              Join Now
            </Button>
            <Button
              onClick={onViewPlans}
              size="lg"
              variant="outline"
              className="border border-white/30 text-white/80 hover:bg-white/10 hover:text-white font-bold text-sm tracking-wider uppercase px-10 py-4 h-auto transition-all duration-300 bg-transparent rounded-none backdrop-blur-sm"
              data-ocid="hero.secondary_button"
            >
              View Plans
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeInUp}
            className="flex items-stretch gap-0 mt-10 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm bg-black/30"
          >
            {[
              { value: "3", label: "Locations" },
              { value: "500+", label: "Members" },
              { value: "5+", label: "Years" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-8 py-4 ${i < 2 ? "border-r border-white/10" : ""}`}
              >
                <span
                  className="text-3xl font-black text-red-500"
                  style={{
                    fontFamily:
                      "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-[0.15em] mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-xs text-gray-500 uppercase tracking-[0.2em]">
          Scroll
        </span>
        <div className="animate-bounce-slow">
          <ChevronDown size={20} className="text-red-500/70" />
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ──────────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/section-texture-bg.dim_1920x1080.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      data-ocid="about.section"
    >
      <div className="absolute inset-0 overlay-about" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <ScrollReveal variants={fadeInLeft}>
            <div className="relative">
              {/* Offset red frame behind the photo */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-red-500/50"
                style={{ zIndex: 0 }}
              />
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ zIndex: 1 }}
              >
                <img
                  src="/assets/ashish2.jpeg"
                  alt="Ashish Roy - Founder & Head Trainer"
                  className="w-full object-cover rounded-2xl"
                  style={{
                    maxHeight: "620px",
                    objectPosition: "top center",
                    display: "block",
                  }}
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl" />
                {/* Inner red border */}
                <div className="absolute inset-0 rounded-2xl border border-red-500/25 pointer-events-none" />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-5 -right-5 bg-red-600 text-white px-5 py-3 rounded-none font-bold text-sm shadow-glow-red"
                style={{ zIndex: 2 }}
              >
                <div
                  className="text-2xl font-black leading-none"
                  style={{
                    fontFamily:
                      "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  5+
                </div>
                <div className="text-xs uppercase tracking-[0.15em] mt-0.5 text-red-100">
                  Years
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Text */}
          <ScrollReveal variants={fadeInRight}>
            <div className="flex flex-col gap-6">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-red-500">
                ABOUT US
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-white leading-tight"
                style={{
                  fontFamily:
                    "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                  fontWeight: 900,
                }}
              >
                Meet <span className="text-red-500">Ashish Roy</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                My passion is to help people change their life in the simplest
                and most realistic way possible. I believe everyone deserves the
                right to good health and to be happy with themselves inside and
                out.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Roy Fitness Gym was founded with a mission to create a welcoming
                environment where beginners and advanced athletes alike can
                thrive. With professional trainers, modern equipment, and a
                supportive community, we make fitness accessible to everyone in
                Indore.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-700/50">
                {[
                  { value: "3", label: "Locations" },
                  { value: "5+", label: "Years" },
                  { value: "500+", label: "Members" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-3xl font-black text-red-500"
                      style={{
                        fontFamily:
                          "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-fit bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 btn-glow transition-all"
                data-ocid="about.button"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Our Services
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Services Section ───────────────────────────────────────────────────────── */
const services = [
  {
    icon: Heart,
    title: "Cardio Training",
    desc: "Treadmills, stationary bikes, ellipticals, HIIT classes and spinning for a powerful cardiovascular workout.",
  },
  {
    icon: Dumbbell,
    title: "Weight Training",
    desc: "Comprehensive range of equipment and expert guidance to build strength and tone muscles effectively.",
  },
  {
    icon: Music2,
    title: "Zumba & Group Classes",
    desc: "Fun dance and aerobic workouts — Zumba, Fathlick and more group classes for all fitness levels.",
  },
  {
    icon: User,
    title: "Personal Training",
    desc: "Customized workout plans and 1-on-1 coaching with expert trainers to accelerate your results.",
  },
  {
    icon: Leaf,
    title: "Nutrition Guidance",
    desc: "Personalized dietary plans to optimize performance and achieve a balanced, healthy lifestyle.",
  },
  {
    icon: Settings2,
    title: "Advanced Machines",
    desc: "Wide range of modern machines including Treadmills, Ellipticals, cable systems and strength equipment.",
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="relative py-20 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.10 0.01 260) 0%, oklch(0.14 0.01 260) 100%)",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.55 0.22 25) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="OUR SERVICES" title="What We Offer" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="service-card rounded-2xl p-8 flex flex-col gap-5 cursor-pointer group"
                data-ocid={`services.card.${i + 1}`}
              >
                {/* Icon with animated ring on hover */}
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300" />
                  <div className="absolute inset-0 rounded-xl border border-red-500/0 group-hover:border-red-500/40 transition-all duration-300" />
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <Icon
                      className="text-red-500 group-hover:scale-110 transition-transform duration-300"
                      size={28}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-black text-white mb-2.5 leading-tight"
                    style={{
                      fontFamily:
                        "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                {/* Animated red underline */}
                <div className="h-px w-0 bg-gradient-to-r from-red-500 to-transparent group-hover:w-full transition-all duration-500 ease-out" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Why Join Us ────────────────────────────────────────────────────────────── */
const features = [
  {
    icon: Users,
    title: "Expert Staff",
    desc: "Friendly, professional staff always ready to help you achieve your fitness goals.",
  },
  {
    icon: Dumbbell,
    title: "Quality Equipment",
    desc: "Extensive range of dumbbells, weight plates, cardio machines and modern strength equipment.",
  },
  {
    icon: Wind,
    title: "Fully Ventilated",
    desc: "Excellent ventilation system providing a healthy and comfortable workout environment.",
  },
  {
    icon: Package,
    title: "Quality Supplements",
    desc: "High quality supplements available at reception to support your nutrition goals.",
  },
  {
    icon: ShowerHead,
    title: "Shower Rooms",
    desc: "Access to clean, well-maintained shower rooms after every workout session.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    desc: "Open 5 AM – 11 PM (Mon-Sat) and 5 PM – 10 PM (Sun) to fit any schedule.",
  },
];

function WhyJoinSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative py-20 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.14 0.01 260) 0%, oklch(0.18 0.015 260) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="WHY JOIN US" title="Your Fitness, Our Priority" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -3 }}
                className="flex gap-5 p-6 rounded-xl border border-gray-800/60 bg-black/30 hover:border-red-500/40 hover:bg-black/50 transition-all duration-300 group"
                data-ocid={`features.card.${i + 1}`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <Icon className="text-red-500" size={22} />
                </div>
                <div>
                  <h3
                    className="text-base font-bold text-white mb-2"
                    style={{
                      fontFamily:
                        "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Membership Section ─────────────────────────────────────────────────────── */
const plans = [
  {
    id: MembershipPlan.monthly,
    name: "Monthly",
    price: "₹899",
    period: "/month",
    perMonth: null,
    popular: false,
    features: [
      "Full gym access",
      "All equipment use",
      "Locker access",
      "Trainer guidance",
      "Free Wi-Fi",
    ],
  },
  {
    id: MembershipPlan.quarterly,
    name: "Quarterly",
    price: "₹2,300",
    period: "/3 months",
    perMonth: "₹767/mo",
    popular: false,
    features: [
      "Full gym access",
      "All equipment use",
      "Locker access",
      "Group classes",
      "Trainer guidance",
      "Free Wi-Fi",
    ],
  },
  {
    id: MembershipPlan.halfYearly,
    name: "Half-Yearly",
    price: "₹4,200",
    period: "/6 months",
    perMonth: "₹700/mo",
    popular: true,
    features: [
      "Full gym access",
      "All equipment use",
      "Locker access",
      "Group classes",
      "1 PT session/month",
      "Nutrition consultation",
      "Free Wi-Fi",
    ],
  },
  {
    id: MembershipPlan.yearly,
    name: "Yearly",
    price: "₹7,000",
    period: "/year",
    perMonth: "₹583/mo",
    popular: false,
    features: [
      "Full gym access",
      "All equipment use",
      "Locker access",
      "Group classes",
      "2 PT sessions/month",
      "Priority booking",
      "Nutrition consultation",
      "Supplements discount",
      "Free Wi-Fi",
    ],
  },
];

function MembershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const { mutateAsync: submitInquiry, isPending: isSubmitting } =
    useSubmitMembershipInquiry();

  const handleGetStarted = (planId: MembershipPlan) => {
    setSelectedPlan(planId);
    setSubmitSuccess(false);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    try {
      await submitInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredPlan: selectedPlan,
      });
      setSubmitSuccess(true);
      toast.success("Membership inquiry submitted! We'll contact you soon.");
      setForm({ name: "", email: "", phone: "" });
      setTimeout(() => setIsDialogOpen(false), 2000);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="membership"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/gym-interior-blur.dim_1920x1080.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 overlay-membership" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="MEMBERSHIP" title="Choose Your Plan" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-end"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              variants={fadeInUp}
              whileHover={plan.popular ? {} : { y: -6 }}
              className={`relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                plan.popular
                  ? "popular-card-glow border-2 border-red-500 scale-105 z-10"
                  : "border border-white/10 hover:border-red-500/40"
              }`}
              style={
                plan.popular
                  ? {}
                  : {
                      background:
                        "linear-gradient(145deg, oklch(0.17 0.012 260 / 0.85) 0%, oklch(0.12 0.008 260 / 0.9) 100%)",
                      backdropFilter: "blur(16px)",
                      boxShadow:
                        "0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 32px rgba(0,0,0,0.4)",
                    }
              }
              data-ocid={`membership.card.${i + 1}`}
            >
              {plan.popular && (
                <div className="flex items-center justify-center gap-2 py-2 bg-red-600 text-white text-xs font-bold tracking-[0.2em] uppercase">
                  <Star size={10} className="fill-white" />
                  Most Popular
                  <Star size={10} className="fill-white" />
                </div>
              )}
              <div
                className={`p-7 flex flex-col gap-5 flex-1 ${
                  plan.popular
                    ? "bg-gradient-to-b from-black/75 to-black/60"
                    : ""
                }`}
              >
                {/* Plan header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="text-base font-black text-white uppercase tracking-[0.1em]"
                      style={{
                        fontFamily:
                          "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                      }}
                    >
                      {plan.name}
                    </h3>
                    {plan.perMonth && (
                      <p className="text-red-400 text-xs mt-0.5 font-semibold">
                        {plan.perMonth}
                      </p>
                    )}
                  </div>
                  {plan.popular && (
                    <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-medium">
                      Best
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 py-3 border-y border-white/10">
                  <span
                    className={`font-black leading-none ${plan.popular ? "text-white" : "text-gray-100"}`}
                    style={{
                      fontFamily:
                        "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                      letterSpacing: "-0.03em",
                      fontSize: "clamp(32px, 4vw, 40px)",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-xs">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-gray-300"
                    >
                      <div className="w-4 h-4 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="text-red-500" size={10} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={() => handleGetStarted(plan.id)}
                  className={`w-full font-bold py-3 h-auto transition-all tracking-wider text-sm uppercase rounded-none ${
                    plan.popular
                      ? "bg-red-600 hover:bg-red-500 text-white btn-glow"
                      : "bg-transparent hover:bg-red-600 text-gray-300 hover:text-white border border-white/20 hover:border-red-500"
                  }`}
                  data-ocid={`membership.card.open_modal_button.${i + 1}`}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Membership Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="bg-gray-900 border-gray-700 text-white max-w-md"
          data-ocid="membership.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">
              {submitSuccess
                ? "Inquiry Submitted!"
                : `Join — ${plans.find((p) => p.id === selectedPlan)?.name} Plan`}
            </DialogTitle>
          </DialogHeader>

          {submitSuccess ? (
            <div
              className="flex flex-col items-center gap-4 py-8"
              data-ocid="membership.dialog.success_state"
            >
              <CheckCircle2 className="text-red-500" size={48} />
              <p className="text-gray-300 text-center">
                We'll contact you within 24 hours to complete your membership
                setup.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label
                  htmlFor="m-name"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Full Name *
                </Label>
                <Input
                  id="m-name"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="m-email"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Email *
                </Label>
                <Input
                  id="m-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="m-phone"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Phone *
                </Label>
                <Input
                  id="m-phone"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => setIsDialogOpen(false)}
                  data-ocid="membership.dialog.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold"
                  data-ocid="membership.dialog.submit_button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ─── Gallery Section ────────────────────────────────────────────────────────── */
const galleryImages = [
  {
    src: "/assets/generated/gallery-workout-1.dim_600x800.jpg",
    alt: "Gym Workout",
    tall: true,
  },
  {
    src: "/assets/generated/gallery-workout-2.dim_600x600.jpg",
    alt: "Training Session",
    tall: false,
  },
  {
    src: "/assets/generated/gallery-equipment-1.dim_600x500.jpg",
    alt: "Gym Equipment",
    tall: false,
  },
  {
    src: "/assets/generated/gallery-transformation-1.dim_600x700.jpg",
    alt: "Body Transformation",
    tall: true,
  },
  {
    src: "/assets/generated/gallery-equipment-2.dim_600x800.jpg",
    alt: "Weight Equipment",
    tall: true,
  },
  {
    src: "/assets/generated/gallery-group-class.dim_600x500.jpg",
    alt: "Group Class",
    tall: false,
  },
];

function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="gallery"
      className="relative py-20 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.09 0.012 260) 0%, oklch(0.11 0.008 260) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="GALLERY" title="Transformation Journey" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="columns-2 md:columns-3 gap-4 space-y-4"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              variants={fadeInUp}
              className="relative gallery-img-container break-inside-avoid mb-4 group cursor-pointer"
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/15 rounded-xl transition-all duration-300" />
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-500/60 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "I love the community at Roy Fitness Gym. Everyone is so supportive, and the group classes are fun and challenging. Best decision I made!",
    name: "Priya S.",
    role: "Member since 2023",
    rating: 5,
  },
  {
    quote:
      "The personal trainers are top-notch. They helped me create a personalized plan that actually works. I've seen amazing results in just a few months.",
    name: "Rahul M.",
    role: "Member since 2022",
    rating: 5,
  },
  {
    quote:
      "I joined 3 months ago and it's been a game-changer. The variety of classes, friendly staff and clean facilities make this gym absolutely fantastic.",
    name: "Anita K.",
    role: "Member since 2024",
    rating: 5,
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative py-20 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.015 260) 0%, oklch(0.16 0.02 280) 50%, oklch(0.12 0.01 260) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="TESTIMONIALS" title="What Our Members Say" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              className="service-card rounded-2xl p-8 flex flex-col gap-5"
              data-ocid={`testimonials.card.${i + 1}`}
            >
              <Quote className="text-red-500 opacity-60" size={32} />
              <p className="text-gray-300 text-sm leading-relaxed flex-1 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={`star-${t.name}-${j}`}
                    className="text-red-500 fill-red-500"
                    size={14}
                  />
                ))}
              </div>
              <div className="border-t border-gray-700/50 pt-4">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Locations Section ──────────────────────────────────────────────────────── */
const locations = [
  {
    name: "Roy Fitness 1.0",
    address:
      "62 Kunal Towar Satellite Junction, opp. Vinayak Tower, Indus Satellite Greens, Indore 453771",
  },
  {
    name: "Roy Fitness 2.0",
    address:
      "Super City, Sai Balaji Square, Gol Chouraha, A-W 17, Singapore Township, Indore 453771",
  },
  {
    name: "Roy Fitness 3.0",
    address:
      "208, Clerk Colony Rd, opp. ITI Ground, Clerk Colony, Indore 452003",
  },
];

function LocationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="locations"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/gym-texture-bg.dim_1920x1080.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 overlay-locations" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="LOCATIONS" title="Find Us Near You" />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              variants={fadeInUp}
              className="service-card rounded-2xl p-8 flex flex-col gap-5 group"
              data-ocid={`locations.card.${i + 1}`}
            >
              {/* Location number */}
              <div className="flex items-center justify-between">
                <span
                  className="text-5xl font-black text-white/5 leading-none select-none"
                  style={{
                    fontFamily:
                      "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                  }}
                >
                  0{i + 1}
                </span>
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center group-hover:bg-red-500/25 transition-colors">
                  <MapPin className="text-red-500" size={18} />
                </div>
              </div>

              <div>
                <h3
                  className="text-lg font-black text-white mb-2.5 leading-tight"
                  style={{
                    fontFamily:
                      "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {loc.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {loc.address}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-white/8">
                <a
                  href="tel:7389957488"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-none bg-transparent hover:bg-red-600 text-red-400 hover:text-white font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300 border border-red-500/30 hover:border-red-500"
                  data-ocid={`locations.card.button.${i + 1}`}
                >
                  <Phone size={14} />
                  Call Us
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Contact Section ────────────────────────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { mutateAsync: submitContact, isPending: isSubmitting } =
    useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });
      setSubmitStatus("success");
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSubmitStatus("error");
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/section-texture-bg.dim_1920x1080.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 overlay-contact" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="CONTACT US" title="Get In Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <ScrollReveal variants={fadeInLeft} className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <a
                href="tel:7389957488"
                className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-red-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center group-hover:bg-red-500/25">
                  <Phone className="text-red-500" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-white font-medium">73899 57488</p>
                  <p className="text-gray-400 text-sm">83195 84829</p>
                </div>
              </a>

              <a
                href="mailto:aashishroy26@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-red-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center group-hover:bg-red-500/25">
                  <Mail className="text-red-500" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-white font-medium">
                    aashishroy26@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/917389957488"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-green-900/30 border border-green-700/50 hover:bg-green-800/40 hover:border-green-500/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30">
                  <MessageCircle className="text-green-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    WhatsApp
                  </p>
                  <p className="text-green-400 font-medium">
                    Chat with us on WhatsApp
                  </p>
                </div>
              </a>
            </div>

            {/* Hours */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-red-500" size={20} />
                <h3 className="font-bold text-white">Opening Hours</h3>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { day: "Monday – Saturday", hours: "5:00 AM – 11:00 PM" },
                  { day: "Sunday", hours: "5:00 PM – 10:00 PM" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-gray-400">{h.day}</span>
                    <span className="text-white font-medium">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact Form */}
          <ScrollReveal variants={fadeInRight}>
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 flex flex-col gap-5"
            >
              <h3
                className="text-xl font-black text-white mb-2"
                style={{
                  fontFamily:
                    "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                }}
              >
                Send Us a Message
              </h3>

              <div>
                <Label
                  htmlFor="c-name"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Full Name *
                </Label>
                <Input
                  id="c-name"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-gray-800/80 border-gray-600 text-white placeholder-gray-500 focus:border-red-500"
                  data-ocid="contact.input"
                />
              </div>

              <div>
                <Label
                  htmlFor="c-email"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Email *
                </Label>
                <Input
                  id="c-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-gray-800/80 border-gray-600 text-white placeholder-gray-500 focus:border-red-500"
                  data-ocid="contact.input"
                />
              </div>

              <div>
                <Label
                  htmlFor="c-phone"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Phone
                </Label>
                <Input
                  id="c-phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-gray-800/80 border-gray-600 text-white placeholder-gray-500 focus:border-red-500"
                  data-ocid="contact.input"
                />
              </div>

              <div>
                <Label
                  htmlFor="c-message"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Message *
                </Label>
                <Textarea
                  id="c-message"
                  required
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={4}
                  className="bg-gray-800/80 border-gray-600 text-white placeholder-gray-500 focus:border-red-500 resize-none"
                  data-ocid="contact.textarea"
                />
              </div>

              {submitStatus === "success" && (
                <div
                  className="flex items-center gap-2 text-green-400 text-sm bg-green-900/30 border border-green-700/50 rounded-lg p-3"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle2 size={16} />
                  Message sent successfully!
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-900/30 border border-red-700/50 rounded-lg p-3"
                  data-ocid="contact.error_state"
                >
                  Failed to send. Please try again.
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 h-auto btn-glow transition-all"
                data-ocid="contact.submit_button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Booking Modal ──────────────────────────────────────────────────────────── */
function BookingModal({
  isOpen,
  onClose,
}: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "" as ServiceType | "",
    timeSlot: "" as TimeSlot | "",
    date: "",
    message: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { mutateAsync: submitBooking, isPending: isSubmitting } =
    useSubmitClassBooking();

  const handleClose = () => {
    setSubmitSuccess(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      timeSlot: "",
      date: "",
      message: "",
    });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.serviceType || !form.timeSlot) return;
    try {
      await submitBooking({
        name: form.name,
        email: form.email,
        phone: form.phone,
        serviceType: form.serviceType as ServiceType,
        preferredTimeSlot: form.timeSlot as TimeSlot,
        date: form.date,
        message: form.message,
      });
      setSubmitSuccess(true);
      toast.success("Class booked successfully! We'll confirm shortly.");
    } catch {
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-gray-900 border-gray-700 text-white max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="booking.modal"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            {submitSuccess ? "Booking Confirmed!" : "Book a Class or Session"}
          </DialogTitle>
        </DialogHeader>

        {submitSuccess ? (
          <div
            className="flex flex-col items-center gap-4 py-8"
            data-ocid="booking.success_state"
          >
            <CheckCircle2 className="text-red-500" size={56} />
            <p className="text-gray-300 text-center text-lg">
              Your booking request has been received!
            </p>
            <p className="text-gray-500 text-center text-sm">
              Our team will confirm your session within 24 hours.
            </p>
            <Button
              onClick={handleClose}
              className="bg-red-600 hover:bg-red-500 text-white font-bold mt-2"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="b-name"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Full Name *
                </Label>
                <Input
                  id="b-name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                  data-ocid="booking.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="b-phone"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Phone *
                </Label>
                <Input
                  id="b-phone"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                  data-ocid="booking.input"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="b-email"
                className="text-gray-300 text-sm mb-1 block"
              >
                Email *
              </Label>
              <Input
                id="b-email"
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                data-ocid="booking.input"
              />
            </div>

            <div>
              <Label className="text-gray-300 text-sm mb-1 block">
                Service Type *
              </Label>
              <Select
                value={form.serviceType}
                onValueChange={(v) =>
                  setForm({ ...form, serviceType: v as ServiceType })
                }
              >
                <SelectTrigger
                  className="bg-gray-800 border-gray-600 text-white"
                  data-ocid="booking.select"
                >
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value={ServiceType.cardio}>
                    Cardio Training
                  </SelectItem>
                  <SelectItem value={ServiceType.weightTraining}>
                    Weight Training
                  </SelectItem>
                  <SelectItem value={ServiceType.zumba}>
                    Zumba / Group Classes
                  </SelectItem>
                  <SelectItem value={ServiceType.personalTraining}>
                    Personal Training
                  </SelectItem>
                  <SelectItem value={ServiceType.nutrition}>
                    Nutrition Guidance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 text-sm mb-1 block">
                  Preferred Time *
                </Label>
                <Select
                  value={form.timeSlot}
                  onValueChange={(v) =>
                    setForm({ ...form, timeSlot: v as TimeSlot })
                  }
                >
                  <SelectTrigger
                    className="bg-gray-800 border-gray-600 text-white"
                    data-ocid="booking.select"
                  >
                    <SelectValue placeholder="Time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value={TimeSlot.morning}>
                      Morning (5AM - 12PM)
                    </SelectItem>
                    <SelectItem value={TimeSlot.afternoon}>
                      Afternoon (12PM - 5PM)
                    </SelectItem>
                    <SelectItem value={TimeSlot.evening}>
                      Evening (5PM - 11PM)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="b-date"
                  className="text-gray-300 text-sm mb-1 block"
                >
                  Preferred Date *
                </Label>
                <Input
                  id="b-date"
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  data-ocid="booking.input"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="b-message"
                className="text-gray-300 text-sm mb-1 block"
              >
                Additional Notes
              </Label>
              <Textarea
                id="b-message"
                placeholder="Any special requirements or questions..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-500 resize-none"
                data-ocid="booking.input"
              />
            </div>

            <div className="flex gap-3 mt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={handleClose}
                data-ocid="booking.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !form.serviceType || !form.timeSlot}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold"
                data-ocid="booking.submit_button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────────── */
function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Membership", href: "#membership" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      className="relative pt-16 pb-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.08 0.01 260) 0%, oklch(0.04 0.005 260) 100%)",
      }}
    >
      {/* Top red line */}
      <div className="shimmer-line h-0.5 w-full mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <a href="#home">
              <h2
                className="text-2xl font-black tracking-tight"
                style={{
                  fontFamily:
                    "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
                  fontWeight: 900,
                }}
              >
                ROY <span className="text-red-500">FITNESS</span>
              </h2>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform Your Body. Build Strength. Stay Consistent. Your premier
              fitness destination in Indore.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.instagram.com/mr_cool_roy5821"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://m.youtube.com/watch?v=84PCgeo10Co"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all text-gray-400 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://www.facebook.com/royfitnessgym/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5 text-red-500">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                    data-ocid={`footer.link.${i + 1}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-red-500">
              Opening Hours
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { day: "Monday – Friday", hours: "5:00 AM – 11:00 PM" },
                { day: "Saturday", hours: "5:00 AM – 11:00 PM" },
                { day: "Sunday", hours: "5:00 PM – 10:00 PM" },
              ].map((h) => (
                <li key={h.day} className="text-sm">
                  <span className="text-white font-medium block">{h.day}</span>
                  <span className="text-gray-500">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-red-500">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:7389957488"
                  className="flex items-start gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Phone
                    className="text-red-500 mt-0.5 flex-shrink-0"
                    size={15}
                  />
                  <span>
                    73899 57488
                    <br />
                    83195 84829
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:aashishroy26@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="text-red-500 flex-shrink-0" size={15} />
                  aashishroy26@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917389957488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  <MessageCircle
                    className="text-green-500 flex-shrink-0"
                    size={15}
                  />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-600">
          <p>© {currentYear} Roy Fitness Gym. All rights reserved.</p>
          <p>
            Built with <span className="text-red-500">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Newsletter Banner ──────────────────────────────────────────────────────── */
function NewsletterBanner() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: signup, isPending: isLoading } =
    useSubmitNewsletterSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({ name: form.name, email: form.email });
      setSubmitted(true);
      toast.success("Subscribed! Get ready for fitness updates.");
    } catch {
      toast.error("Subscription failed. Please try again.");
    }
  };

  return (
    <section
      className="relative py-14 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.72 0.13 25) 0%, oklch(0.82 0.09 20) 50%, oklch(0.78 0.11 15) 100%)",
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h2
            className="text-3xl md:text-4xl font-black text-white uppercase mb-3"
            style={{
              fontFamily: "'Helvetica Neue', 'Arial Black', Arial, sans-serif",
              fontWeight: 900,
            }}
          >
            Stay in the Loop
          </h2>
          <p className="text-red-100 mb-8">
            Subscribe for fitness tips, class schedules, and exclusive offers.
          </p>
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-white font-bold text-lg">
              <CheckCircle2 size={24} />
              You're subscribed!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <Input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-white/20 border-white/30 text-white placeholder-red-100 focus:border-white flex-1"
              />
              <Input
                type="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/20 border-white/30 text-white placeholder-red-100 focus:border-white flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-black hover:bg-gray-900 text-white font-bold px-6 whitespace-nowrap border border-black/20"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleJoinNow = () => {
    document
      .getElementById("membership")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewPlans = () => {
    document
      .getElementById("membership")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Toaster position="top-right" richColors />

      <Navbar onBookNow={() => setIsBookingOpen(true)} />

      <main>
        <HeroSection onJoinNow={handleJoinNow} onViewPlans={handleViewPlans} />
        <AboutSection />
        <ServicesSection />
        <WhyJoinSection />
        <MembershipSection />
        <GallerySection />
        <TestimonialsSection />
        <LocationsSection />
        <ContactSection />
        <NewsletterBanner />
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
