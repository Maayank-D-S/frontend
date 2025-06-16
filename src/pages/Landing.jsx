import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2 } from "lucide-react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import { FaBars, FaTimes } from "react-icons/fa";

const team = [
  { name: "Aishwarya Verma",role:"Vice President Marketing", image: "/Profile/AV.jpg" },
  { name: "Manisha Handa",role:"Vice President Sales", image: "/Profile/MH.jpg" },
  
  { name: "Jai Kumar",role:"Partner", image: "/Profile/JC.jpg" },
  { name: "Jasmain Singh",role:"Partner", image: "/Profile/JS.jpg" },
  { name: "Rajesh Panwar",role:"Partner", image: "/Profile/RP.jpg" },
  { name: "Sidharth Mittal",role:"Partner", image: "/Profile/SM.jpg" },
  { name: "Ramakant Vij",role:"Partner", image: "/Profile/RV.jpg" },
  { name: "Chinki Rathi",role:"Sales Associate", image: "/Profile/CR.jpg" },
  { name: "Jyotika",role:"Sales Associate", image: "/Profile/Jyotika.jpg" },
  { name: "Keshav Sharma",role:"Sales Associate", image: "/Profile/KS.jpg" },
  { name: "G D Sharma",role:"Channel Partner", image: "/Profile/GD.jpg" },
  { name: "SK Verma",role:"Channel Partner", image: "/Profile/SKV.jpg" },
];

const Landing = () => {
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 300], [0, -100]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const API_BASE= process.env.REACT_APP_API_BASE

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
      alert(" Thanks for reaching out we will contact you on whatsapp and email shortly!");

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
        <header className="relative w-full h-24 py-6 bg-black/70 z-30">
        <div className="container mx-auto px-6 flex items-center justify-between h-full">
          {/* Logo + brand */}
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold">WH&nbsp;Realtors</h1>
          </div>

          {/* Desktop nav (unchanged) */}
          <nav className="hidden md:flex space-x-8 text-lg">
            <a href="#about" className="hover:text-orange-400">
              About
            </a>
            <a href="#gallery" className="hover:text-orange-400">
              Our Projects
            </a>
            <a href="#services" className="hover:text-orange-400">
              Services
            </a>
            <a href="#contact" className="hover:text-orange-400">
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
                className="hover:text-orange-400"
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
              className="text-5xl md:text-7xl font-extrabold mb-4"
            >
              Elevate&nbsp;Your&nbsp;Living
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-xl md:text-2xl text-gray-300"
            >
              Discover the most exclusive properties with WH&nbsp;Realtors.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ────────── DESCRIPTION ────────── */}
      <section id="about" className="py-20 px-6 bg-black">
  <div className="container mx-auto">
    {/* desktop: wide, tall card | mobile: same nice stack */}
    <div
      className="
        bg-[#111] rounded-2xl flex flex-col md:flex-row items-center md:items-start
        justify-between gap-6
        p-8 md:px-20 md:py-16           /* ⬅️ more breathing room on desktop  */
        w-full md:max-w-none            /* ⬅️ let it span the viewport width */
      "
    >
      {/* ─── Text ─── */}
      <div className="flex-1">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6">
          We are <span className="text-white">WH Realtors</span>
        </h1>

        <h2 className="text-lg md:text-2xl text-gray-300 mb-4 font-medium">
          We are the Developers of Tomorrow.
        </h2>

        <p className="text-xl md:text-2xl text-gray-400 mb-6 leading-relaxed">
          At Wild Habitat, we’re re-imagining what it means to build. We’re not
          just real-estate developers — we’re engineers, technologists and
          designers on a mission to transform how real estate is created, sold
          and experienced. Our model is rooted in deep technology, clean
          execution and absolute transparency. From how our projects are
          designed and built to how they’re marketed and sold — everything is
          powered by in-house AI and automation systems.
        </p>
      </div>

      {/* ─── Logo ─── */}
      <div className="w-24 sm:w-28 md:w-48 lg:w-56 flex-shrink-0 self-center md:self-start">
        <img
          src="/logo.png"
          alt="WH Realtors Logo"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  </div>
</section>

      {/* ────────── GALLERY ────────── */}
      <section id="gallery" className="py-20 px-6 bg-black">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-center mb-12 text-white">
      Featured Properties
    </h2>

    {/* belt (< md) | grid (≥ md) */}
    <div className="relative overflow-x-hidden overflow-y-hidden scrollbar-hide group/scroll">
      <div
        style={{ '--scrollEnd': '50%' }} /* seamless loop */
        className="
          flex gap-6 w-max whitespace-nowrap animate-scroll-x
          [animation-play-state:running] group-hover/scroll:[animation-play-state:paused]

          md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:w-full
          md:whitespace-normal md:animate-none
        "
      >
        {/* duplicate array for mobile loop */}
        {[...projects, ...projects].map((p, idx, arr) => (
          <div
            key={`${p.id}-${idx}`}
            className={`
              shrink-0 w-[320px] md:w-auto
              ${idx >= arr.length / 2 ? 'md:hidden' : ''}  /* hide clones on desktop */
            `}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      <section id="services" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-6">Our Services</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            At WH&nbsp;Realtors, we create exceptional residential and
            commercial properties that elevate lifestyles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                iconColor: "bg-blue-500",
                label: "AI-Powered Property Sales",
                desc: "We bring third-party real estate projects to market using our proprietary AI sales platform — featuring voice and chat automation, transparent pricing, and data-rich insights.",
              },
              {
                iconColor: "bg-green-500",
                label: "Boutique Project Execution",
                desc: "We develop select boutique projects ranging from plots to villas. Every project is delivered with speed, cost control, and process transparency.",
              },
              {
                iconColor: "bg-purple-500",
                label: "Integrated Development",
                desc: "Over time, we’ll launch our own full-scale developments — from residential to mixed-use — all delivered using our proprietary tech stack.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-xl p-6 shadow-lg text-center"
              >
                <div
                  className={`w-12 h-12 ${f.iconColor} rounded-lg flex items-center justify-center mb-4 mx-auto`}
                >
                  <Building2 className="w-5 h-5 text-white " />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.label}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── ABOUT US ────────── */}
      <section className="py-20 px-6 bg-black">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold mb-6 text-white text-center">Meet Our team</h2>
    <p className="text-gray-300 mb-10 text-2xl text-center">
      We are WH Realtors, passionate about shaping premium living experiences…
    </p>

    {/* Auto-scroll belt — same for mobile & desktop */}
    <div className="relative overflow-x-hidden scrollbar-hide group">

      {/* slide half the belt (-50 %) for endless 1-2-3-4-1-2-… loop */}
      <div
        style={{ '--scrollEnd': '50%' }}
        className="
          flex gap-6 w-max whitespace-nowrap
          animate-[scroll_60s_linear_infinite]
          [animation-play-state:running] group-hover:[animation-play-state:paused]
        "
      >
        {/* duplicate array → seamless loop */}
        {[...team, ...team].map((member, idx) => (
          <div
            key={`${member.name}-${idx}`}
            className="shrink-0 w-64 bg-white/5 rounded-2xl p-4 text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="rounded-xl w-full h-72 object-cover mb-4"
            />
            <h4 className="text-lg font-semibold text-white">
              {member.name}
            </h4>
            <p>{member.role}</p>
          
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ────────── CONTACT ────────── */}
      <section id="contact" className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">Get In Touch</h2>

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
            <label className="block mb-1 text-sm text-gray-300">Project</label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white/5 border border-gray-700 text-white focus:outline-none"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-gray-800 text-white">
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
    </div>
  );
};

export default Landing;
