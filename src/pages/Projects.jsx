import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { FaWhatsapp } from "react-icons/fa";
import { Building2, ShieldCheck, Star, KeyRound } from "lucide-react";
import Footer from "../components/Footer";
import Map from "../components/Map";

const Projects = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imageRef = useRef(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 300], [0, -100]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
          <Link to="/" className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, project_id: projectId }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error submitting form:", data.error);
        return;
      }
      alert(
        " Thanks for reaching out we will contact you on whatsapp and email shortly!"
      );

      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error("Failed to submit form:", err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b border-white/10 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Back button on the extreme left */}
          <div className="flex items-center space-x-4 w-full">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition"
            >
              ← Back
            </button>

            {/* Logo and Title */}
            <div className="flex items-center space-x-3 ml-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                <img src="/logo.png" alt="logo" className="h-10 w-10" />
              </div>
              <h1 className="text-2xl font-bold">WH Realtors</h1>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-white/90">
            <a href="#about-project" className="hover:text-orange-400">
              About
            </a>
            <a href="#gallery" className="hover:text-orange-400">
              Gallery
            </a>
            <a href="#features" className="hover:text-orange-400">
              Features
            </a>
            <a href="#contact" className="hover:text-orange-400">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white z-40 ml-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden px-6 mt-2 space-y-2 bg-black/90 pb-4 absolute top-full left-0 w-full z-40">
            <a
              href="#about-project"
              className="block text-white hover:text-orange-400"
            >
              About
            </a>
            <a
              href="#gallery"
              className="block text-white hover:text-orange-400"
            >
              Gallery
            </a>
            <a
              href="#features"
              className="block text-white hover:text-orange-400"
            >
              Features
            </a>
            <a
              href="#contact"
              className="block text-white hover:text-orange-400"
            >
              Contact
            </a>
          </div>
        )}
      </header>
      {/* Hero Title */}
      <section className="text-center pt-10 pb-10 relative z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold">{project.title}</h2>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${project.whatsapp || "910000000000"}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-medium"
          >
            <FaWhatsapp className="text-lg mr-2" /> Book Now
          </a>
          <a
            href={project.brochure || "/sample_brochure.pdf"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-lg font-medium"
          >
            Download Brochure
          </a>
        </div>
      </section>
      {/* Hero Image */}
      <motion.div
        ref={imageRef}
        style={{ y: imageY, zIndex: 20 }}
        className="relative z-20 overflow-hidden rounded-t-3xl w-screen max-w-7xl mx-auto"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full object-cover rounded-t-3xl"
        />
      </motion.div>
      {/* About Project */}
      <section
        id="about-project"
        className="bg-black py-16 px-6 max-w-7xl mx-auto" /* ← mx-auto added */
      >
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 text-center"
          >
            About Project
          </motion.h3>

          <p className="text-xl text-gray-300 max-w-7xl mb-12 mx-auto text-center">
            {project.description}
          </p>

          {/* grid now centers its children */}
          <div className="grid md:grid-cols-3 gap-6 place-items-center">
            {project.Advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 rounded-2xl text-white text-center shadow-md w-full"
              >
                <div className="text-blue-500 mb-4">
                  {i % 3 === 0 ? (
                    <ShieldCheck className="mx-auto w-8 h-8" />
                  ) : i % 3 === 1 ? (
                    <Star className="mx-auto w-8 h-8" />
                  ) : (
                    <KeyRound className="mx-auto w-8 h-8" />
                  )}
                </div>
                <h4 className="text-xl font-bold mb-2">
                  {adv.title || "Feature"}
                </h4>
                <p className="text-sm text-gray-300">
                  {adv.description || adv}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Gallery */}
      <section id="gallery" className="w-full px-4 md:px-8 pb-16 relative z-10">
        <h3 className="text-4xl font-semibold mb-10 text-center text-white">
          Project Gallery
        </h3>

        <div className="relative overflow-hidden scrollbar-hide group">
          <div
            style={{ "--scrollEnd": "50%" }} /* optional, for clarity */
            className="
        flex gap-4 w-max whitespace-nowrap             /* ← w-max instead of 200% */
        animate-scroll-x
        [animation-play-state:running] group-hover:[animation-play-state:paused]

        md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4 md:w-full
        md:whitespace-normal md:animate-none
      "
          >
            {[
              ...Object.entries(project.galleryCovers || {}), // original 4
              ...Object.entries(project.galleryCovers || {}),
            ] // duplicate 4
              .map(([cat, src], i, arr) => (
                <div
                  key={cat + i}
                  className={`
            min-w-[300px] max-w-[300px]            /* belt card width   */
            md:min-w-0 md:max-w-none md:w-full
            md:h-[45vh]
            rounded-2xl overflow-hidden
            transition-transform duration-300 hover:scale-105
            ${i >= arr.length / 2 ? "md:hidden" : ""}  /* hide dupes desktop */
          `}
                >
                  <img
                    src={src}
                    alt={cat}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* Features */}

      <section id="features" className="bg-black py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 text-white">
            Property Features
          </h3>

          <div className="relative overflow-x-hidden overflow-y-hidden scrollbar-hide group">
            <div
              /* slide 50 % of the belt for a seamless loop */
              style={{ "--scrollEnd": "50%" }}
              className="
          flex gap-4 w-max whitespace-nowrap
          animate-[scroll_32s_linear_infinite]         /* ⬅️ slower belt */
          [animation-play-state:running] group-hover:[animation-play-state:paused]

          md:grid md:grid-cols-3 md:gap-6 md:w-full
          md:whitespace-normal md:animate-none
        "
            >
              {[...project.features, ...project.features].map(
                (feature, idx, arr) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: (idx % project.features.length) * 0.1,
                    }}
                    viewport={{ once: true }}
                    className={`
              shrink-0 w-[240px] h-[200px]        /* ⬅️ new uniform size */
              md:w-full md:h-[200px]
              bg-white/5 p-4 rounded-2xl shadow-md text-center text-white
              whitespace-normal break-words space-y-2
              transition-transform duration-300 hover:scale-105
              ${idx >= arr.length / 2 ? "md:hidden" : ""}
            `}
                  >
                    <div className="text-blue-400">
                      <ShieldCheck className="mx-auto w-8 h-8" />
                    </div>

                    <h4 className="text-xl font-semibold">
                      {feature.title || feature}
                    </h4>

                    <p className="text-sm text-gray-300">
                      {feature.desc ||
                        "24×7 security of your property residence and the society with surveillance of world standards."}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Contact */}
      <section id="contact" className="bg-black px-6 py-16">
        <div
          className="
      max-w-7xl mx-auto flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-8
    "
        >
          {/* Map */}
          <div className="h-[300px] md:h-full">
            {/* fills the parent’s height in desktop view */}
            <Map
              projectTitle={project.title}
              latitude={project.lat}
              longitude={project.lng}
            />
          </div>

          {/* Form */}
          <div className="w-full">
            <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <label className="block text-sm">
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-4 py-2 rounded bg-gray-800 text-white"
                  placeholder="Jane Smith"
                  required
                />
              </label>

              {/* Phone */}
              <label className="block text-sm">
                Phone
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full px-4 py-2 rounded bg-gray-800 text-white"
                  placeholder="+91 00000 00000"
                />
              </label>

              {/* Email */}
              <label className="block text-sm">
                Email
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-2 rounded bg-gray-800 text-white"
                  placeholder="jane@framer.com"
                  required
                />
              </label>

              <button
                type="submit"
                className="w-full px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Projects;
