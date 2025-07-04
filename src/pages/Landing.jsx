import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import { FaBars, FaTimes } from "react-icons/fa";
import VoiceChat from "../components/Voice";

const team = [
  { name: "Jasmain Singh", role: "Partner", image: "/Profile/JS.jpg" },
  { name: "Ramakant Vij", role: "Partner", image: "/Profile/RV.jpg" },
  { name: "Sidharth Mittal", role: "Partner", image: "/Profile/SM.jpg" },
  {
    name: "Manisha",
    role: "VP Sales",
    image: "/Profile/MH.jpg",
  },
  { name: "G D Sharma", role: "Working partner", image: "/Profile/GD.jpg" },

  { name: "Suniil Verma", role: "Working partner", image: "/Profile/SKV.jpg" },
  { name: "Pankaj Bhati", role: "Partner", image: "/Profile/PB.jpg" },

  {
    name: "Aishwarya",

    image: "/Profile/AV.jpg",
  },
  { name: "Jyotika", image: "/Profile/Jyotika.jpg" },
  { name: "Keshav", image: "/Profile/KS.jpg" },
  { name: "Chinki", image: "/Profile/CR.jpg" },
];

const Landing = () => {
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 300], [0, -100]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const API_BASE = process.env.REACT_APP_API_BASE;
  const SERVICES = [
    {
      icon:"/icon1.jpg",
      iconColor: "bg-blue-500",
      label: "AI-Powered Property Sales",
      desc: "We bring third-party real estate projects to market using our proprietary AI sales platform — featuring voice and chat automation, transparent pricing, and data-rich insights.",
    },
    {
      icon:"/icon2.jpg",
      iconColor: "bg-green-500",
      label: "Boutique Project Execution",
      desc: "We develop select boutique projects ranging from plots to villas. Every project is delivered with speed, cost control, and process transparency.",
    },
    {
      icon:"/icon3.jpg",
      iconColor: "bg-purple-500",
      label: "Integrated Development",
      desc: "Over time we’ll launch our own full-scale developments — from residential to mixed-use — all delivered using our proprietary tech stack.",
    },
  ];
  const [index, setIndex] = useState(0);
  const total = SERVICES.length;

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, project_id: projectId }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Error:", data.error);
        return;
      }
      alert(
        " Thanks for reaching out we will contact you on whatsapp and email shortly!"
      );

      // clear form
      setName("");
      setEmail("");
      setPhone("");
      setProjectId(projects[0]?.id || "");
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ────────── HERO ────────── */}
      <div className="relative h-[100vh] overflow-hidden">
        {/* Background video */}
        <motion.div
          style={{ y: videoY }}
          className="h-[100vh] absolute top-0 left-0 w-full z-10 overflow-hidden"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Header */}
        <header className="fixed top-0 w-full h-24 py-6 bg-black/70 z-30 backdrop-blur">
          <div className="container mx-auto px-6 flex items-center justify-between h-full">
            {/* Logo + brand */}
            <div className="flex items-center space-x-4">
              <img src="/logo4.png" alt="logo" className="h-15 w-28" />
              {/* <h1 className="text-2xl font-karma text-center">WH&nbsp;Realtors</h1> */}
            </div>

            {/* Desktop nav (unchanged) */}
            <nav className="hidden md:flex space-x-8 text-lg">
              <a href="#about" className="hover:text-orange-400 font-julius">
                About
              </a>
              <a href="#gallery" className="hover:text-orange-400 font-julius">
                Our Projects
              </a>
              <a href="#services" className="hover:text-orange-400 font-julius">
                Services
              </a>
              <a href="#contact" className="hover:text-orange-400 font-julius">
                Contact
              </a>
            </nav>

            {/* Mobile menu toggler */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white focus:outline-none z-40"
            >
              <FaBars className="h-8 w-8" />
            </button>
          </div>
        </header>

        {/* ────────────── MOBILE OVERLAY ────────────── */}
        <div
          className={`
          fixed inset-0 z-40 md:hidden
          bg-black/40 backdrop-blur-md
          transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          {/* slide-in panel (80 % width) */}
          <div className="absolute right-0 top-0 h-full w-4/5 bg-black/70 p-6 flex flex-col">
            {/* close icon */}
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-white mb-8"
            >
              <FaTimes className="h-8 w-8" />
            </button>

            {/* mobile nav */}
            <nav className="flex flex-col gap-8 text-lg text-white">
              {[
                ["About", "#about"],
                ["Services", "#services"],
                ["Our Projects", "#gallery"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-orange-400 font-julius"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex items-center justify-center h-[calc(100vh-96px)] px-6">
          <div className="text-center max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-7xl text-bold mb-4 font-julius"
            >
              Elevate&nbsp;Your&nbsp;Living
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-xl md:text-2xl text-gray-300 font-julius"
            >
              Discover the most exclusive properties with{" "}
              <p className="karma">WH&nbsp;Realtors</p>.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ────────── DESCRIPTION ────────── */}
      <section id="about" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-5xl">
          <div
            className="
        bg-black rounded-2xl flex flex-col items-center
        gap-8 p-8 md:px-20 md:py-16
      "
          >
            {/* ─── Logo ─── */}
            <img
              src="/logo.png"
              alt="WH Realtors Logo"
              className="w-24 sm:w-28 md:w-40 lg:w-48 h-auto object-contain"
            />

            {/* ─── Brand name ─── */}
            <h1 className="text-3xl md:text-5xl font-extrabold font-karma text-white">
              WH Realtors
            </h1>

            {/* Divider */}
            <div className="w-64 h-px bg-gray-600" />

            {/* ─── Tagline ─── */}
            <h2 className="text-xl md:text-2xl font-medium font-julius text-gray-300 text-center">
              We are the Developers of Tomorrow.
            </h2>

            {/* ─── Copy ─── */}
            <div className="space-y-6 max-w-3xl">
              {[
                "At Wild Habitat, we’re re-imagining what it means to build.",
                "We’re not just real-estate developers — we’re engineers, technologists, and designers on a mission to transform how real estate is created, sold, and experienced.",
              ].map((line) => (
                <p
                  key={line}
                  className="text-lg md:text-xl text-gray-400 font-julius leading-relaxed text-center"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────── GALLERY ────────── */}
      <section id="gallery" className="py-20 px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white font-julius">
            Our Projects
          </h2>
          <p className="text-gray-300 mb-10 text-lg text-center font-julius">
      VIEW OUR EXCLUSIVE OFFERINGS
    </p>
          {/* stack on mobile | grid on md+ */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {projects.map((p) => (
              <div key={p.id} className="w-full">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-white font-julius">
            We Offer
          </h2>

          {/* -------- DESKTOP GRID -------- */}
          <div className="hidden md:grid grid-cols-3 gap-8 mx-auto max-w-[90%]">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-3xl p-8 shadow-lg text-left
                        flex flex-col justify-between min-h-[420px]"
              >
                <div>
                  <div
                    className={`w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6`}
                  >
                    <img src={s.icon} alt={s.label} className="w-8 h-8 object-contain" />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 tracking-wide font-julius">
                    {s.label}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm font-julius">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* -------- MOBILE CAROUSEL -------- */}
          <div className="relative md:hidden mt-8">
            {/* slide container */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {SERVICES.map((s) => (
                <div key={s.label} className="min-w-full px-4">
                  <div className="bg-white/5 rounded-3xl p-6 shadow-lg text-left">
                    <div
                      className={`w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6`}
                    >
                      <img src={s.icon} alt={s.label} className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{s.label}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed ">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* arrows */}
            <button
              onClick={prev}
              className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* dots */}
            <div className="flex justify-center gap-2 mt-6">
              {SERVICES.map((_, i) => (
                <span
                  key={i}
                  className={`block w-2 h-2 rounded-full ${
                    i === index ? "bg-white" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────── ABOUT US ────────── */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white text-center font-julius">
            Meet Our team
          </h2>

          {/* Manual scroll belt */}
          <div className="relative overflow-x-auto overflow-y-hidden custom-scrollbar -mx-6 px-6">
            <div className="flex gap-6 w-max whitespace-nowrap">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-64 bg-black rounded-2xl p-4 text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-xl w-full h-72 object-cover mb-4"
                  />
                  <h4 className="text-lg font-semibold text-white font-julius">
                    {member.name}
                  </h4>
                  {member.role && (
                    <p className="text-gray-400 text-sm">{member.role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────── CONTACT ────────── */}
      <section id="contact" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-white font-julius">
            Get In Touch
          </h2>
          <p className="text-gray-300 mb-10 text-lg text-center font-julius">
            SHARE YOUR DETAILS TO KNOW MORE
          </p>

          {/* -------------- FORM -------------- */}
          <form className="space-y-6 text-left" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-gray-700 text-white focus:outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-gray-700 text-white focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-gray-700 text-white focus:outline-none"
                required
              />
            </div>

            {/* Project ⬇ dropdown */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Project
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-gray-700 text-white focus:outline-none"
              >
                {projects.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    className="bg-gray-800 text-white"
                  >
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-white/5 hover:bg-gray-700 text-white py-3 rounded-md font-semibold transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <Footer />
      <Chat />
      <VoiceChat />
    </div>
  );
};

export default Landing;
