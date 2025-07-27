import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { FaWhatsapp } from "react-icons/fa";
import { Building2, ShieldCheck, Star, KeyRound } from "lucide-react";
import Footer from "../components/Footer";
import Map from "../components/Map";
import MobileGalleryCarousel from "../components/MobileGalleryCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Chat from "../components/Chat";
import { FaTimes } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import { Viewer, Worker} from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';



pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
const Projects = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  const navigate = useNavigate();
  const [showPdf, setShowPdf] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);
  // const zoomPluginInstance = zoomPlugin();
  // const { ZoomIn, ZoomOut } = zoomPluginInstance;
  const zoomPluginInstanceBrochure = zoomPlugin();
  const { ZoomIn: ZoomInBrochure, ZoomOut: ZoomOutBrochure } = zoomPluginInstanceBrochure;

  const zoomPluginInstanceLegal = zoomPlugin();
  const { ZoomIn: ZoomInLegal, ZoomOut: ZoomOutLegal } = zoomPluginInstanceLegal;

useEffect(() => {
  if (!project) {
    navigate("/", { replace: true });
  }
}, [project, navigate]);

// if (!project) {
//   return null; // or a small loader if you want
// }
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
      <header className="fixed w-full py-4 px-4 bg-black/70 z-30 backdrop-blur">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    {/* Back button on the extreme left */}
    <a
      href="/"
      className="flex items-center gap-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition"
    >
      <ChevronLeft />
    </a>

    {/* Logo */}
    <div className="flex items-center space-x-4 w-full">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 ml-2">
              <div className="w-32 h-16 flex items-center justify-center rounded-lg">
                <img src="/logo4.png" alt="logo" className="h-15 w-28" />
              </div>
              
            </div>
          </div>

    {/* Desktop Nav */}
    <nav className="hidden md:flex gap-6 text-sm font-medium text-white/90">
      <a href="/" className="hover:text-orange-400 font-julius">Home</a>
      <a href="#about-project" className="hover:text-orange-400 font-julius">About</a>
      <a href="#gallery" className="hover:text-orange-400 font-julius">Gallery</a>
      <a href="#features" className="hover:text-orange-400 font-julius">Features</a>
      <a href="#contact" className="hover:text-orange-400 font-julius">Contact</a>
    </nav>

    {/* Mobile Menu Icon */}
    <button
      onClick={() => setMenuOpen(true)}
      className="md:hidden text-white z-40"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>
  </div>
</header>

{/* ────────────── MOBILE OVERLAY (copied from Landing) ────────────── */}
<div
  className={`
    fixed inset-0 z-40 md:hidden
    bg-black/40 backdrop-blur-md
    transition-transform duration-300
    ${menuOpen ? "translate-x-0" : "translate-x-full"}
  `}
>
  <div className="absolute right-0 top-0 h-full w-4/5 bg-black/70 p-6 flex flex-col">
    {/* Close icon */}
    <button
      onClick={() => setMenuOpen(false)}
      className="self-end text-white mb-8"
    >
      <FaTimes className="h-8 w-8" />
    </button>

    {/* Mobile nav menu */}
    <nav className="flex flex-col gap-8 text-lg text-white">
      {[
        ["Home", "/"],
        ["About", "#about-project"],
        ["Gallery", "#gallery"],
        ["Features", "#features"],
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
      {/* Hero Title */}
      <section className="text-center pt-28 md:pt-32 pb-10 mb-20 z-10">
  <h2 className="text-5xl md:text-6xl font-extrabold font-julius">
    {project.title}
  </h2>

  {/* Buttons */}
  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
    <button
      onClick={() =>
        alert(
          'Please fill the form, we will contact you on whatsapp and email shortly!'
        )
      }
    >
      <a
        href="#contact"
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-medium"
      >
        <FaWhatsapp className="text-lg mr-2" /> Book Now
      </a>
    </button>

    <button
      onClick={() => setShowBrochure((prev) => !prev)}
      className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-lg font-medium transition"
    >
      {showBrochure ? 'Hide Brochure' : 'View Brochure'}
    </button>
  </div>

  {/* Brochure Viewer */}
  {showBrochure && (
  <div className="mt-10 flex flex-col items-center justify-center gap-4 px-6">
    <div className="w-full max-w-[90vw] md:max-w-[1000px] h-[80vh] bg-white rounded-xl shadow-xl overflow-auto custom-scrollbar ring-1 ring-white/20">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={project.BrochureUrl || '/sample_brochure.pdf'}
          plugins={[zoomPluginInstanceBrochure]}
        />
      </Worker>
    </div>
    <div className="flex gap-4">
      <ZoomOutBrochure>
        {(props) => (
          <button
            onClick={props.onClick}
            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
          >
            Zoom Out
          </button>
        )}
      </ZoomOutBrochure>
      <ZoomInBrochure>
        {(props) => (
          <button
            onClick={props.onClick}
            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
          >
            Zoom In
          </button>
        )}
      </ZoomInBrochure>
    </div>
  </div>
)}

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
            className="text-4xl font-bold mb-8 text-center font-julius"
          >
            About Project
          </motion.h3>

          <p className="text-xl text-gray-300 max-w-7xl mb-12 mx-auto text-center">
            {project.description}
          </p>

          {/* grid now centers its children */}
          <div className="grid md:grid-cols-3 gap-6 place-items-center ">
            {project.Advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 rounded-2xl text-white text-center shadow-md w-full h-[210px]"
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
                <h4 className="text-xl font-bold mb-2 ">
                  {adv.title || "Feature"}
                </h4>
                <p className="text-sm text-gray-300 ">
                  {adv.description || adv}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Gallery */}
      <section id="gallery" className="w-full px-4 md:px-8 pb-16 relative z-10">
        <h3 className="text-4xl font-semibold mb-10 text-center text-white font-julius">
          Project Gallery
        </h3>

        {/* ---------- MOBILE CAROUSEL (hidden on md+) ---------- */}
        <MobileGalleryCarousel covers={project.galleryCovers} />

        {/* ---------- DESKTOP GRID (hidden on mobile) ---------- */}
        <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4">
          {Object.entries(project.galleryCovers || {}).map(([cat, src]) => (
            <div
              key={cat}
              className="rounded-2xl overflow-hidden md:h-[45vh] transition-transform duration-300 hover:scale-105"
            >
              <img src={src} alt={cat} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
      {/* Features */}

      <section id="features" className="bg-black py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h3 className="text-4xl font-bold text-center mb-12 text-white font-julius">
      Property Features
    </h3>

    {/* Manual scroll belt (mobile) | grid (desktop) */}
    <div className="relative overflow-x-auto overflow-y-hidden custom-scrollbar -mx-6 px-6 md:overflow-x-hidden">
      <div
        className="
          flex gap-4 w-max whitespace-nowrap
          md:grid md:grid-cols-3 md:gap-6 md:w-full
          md:whitespace-normal
        "
      >
        {project.features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: idx * 0.1,
            }}
            viewport={{ once: true }}
            className="
              shrink-0 w-[240px] h-[150px]
              md:w-full md:h-[150px]
              bg-white/5 p-4 rounded-2xl shadow-md text-center text-white
              whitespace-normal break-words space-y-2
              transition-transform duration-300 hover:scale-105
            "
          >
            <div className="text-blue-400">
              <ShieldCheck className="mx-auto w-8 h-8" />
            </div>

            <h4 className="text-xl font-semibold">
              {feature.description || feature}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>



<section className="py-24 px-6 bg-black text-center">
  {/* Toggle Button */}
  <button
    onClick={() => setOpen((p) => !p)}
    className="inline-block px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
  >
    {open ? 'Hide Legal Docs' : 'View Legal Docs'}
  </button>

  {open && (
  <div className="flex flex-col items-center justify-center mt-10 gap-4">
    <div className="w-full max-w-[90vw] md:max-w-[1000px] h-[80vh] bg-white rounded-xl shadow-xl overflow-auto custom-scrollbar ring-1 ring-white/20">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={project.legal || '/sample_legal.pdf'}
          plugins={[zoomPluginInstanceLegal]}
        />
      </Worker>
    </div>

    <div className="flex gap-4">
      <ZoomOutLegal>
        {(props) => (
          <button
            onClick={props.onClick}
            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
          >
            Zoom Out
          </button>
        )}
      </ZoomOutLegal>
      <ZoomInLegal>
        {(props) => (
          <button
            onClick={props.onClick}
            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
          >
            Zoom In
          </button>
        )}
      </ZoomInLegal>
    </div>
  </div>
)}

</section>


      {/* Contact */}
      <section id="boom" className="bg-black px-6 py-16">
        {/* heading */}
        <h2 className="text-4xl font-bold text-center text-white mb-12 font-julius">
          Project Location
        </h2>

        {/* map + form container */}
        <div className="max-w-7xl mx-auto flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-8">
          {/* Map -------------------------------------------------------------- */}
          <div className="h-[300px] md:h-full flex flex-col items-center md:justify-start justify-between gap-4">
          <a
    href={project.googleMapURL || "#"} // optional: set project.googleMapsUrl in your data
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 inline-block px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition"
  >
    View on Google Maps
  </a>
  <Map
    projectTitle={project.title}
    latitude={project.lat}
    longitude={project.lng}
  />
  
  {/* Button Below the Map */}
  
</div>

          {/* Form ------------------------------------------------------------- */}
          <div id="contact" className="w-full md:h-full">
            <h3 className="text-3xl font-bold mb-6 text-center font-julius">
              Get In Touch
            </h3>

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
                  required
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
      <Chat />
    </div>
  );
};

export default Projects;
