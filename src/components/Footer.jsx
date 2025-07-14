import { Building2, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-14">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          {/* Left: Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-julius">Contact Us</h3>
            <ul className="text-base space-y-1 text-gray-300">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <a
                  href="tel:+919971659153"
                  className="text-blue-400 hover:underline"
                >
                  +91 9971659153
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span className="text-blue-400">info@whrealtors.in</span>
              </li>

              {/* Noida HQ */}
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <span className="font-semibold text-white">Head Office:</span>
                  <div className="text-gray-300">
                    516, 5th floor Supertech Astralis,<br />
                    Sector 94B, Noida, 201313
                  </div>
                </div>
              </li>

              {/* Gurgaon Branch */}
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <span className="font-semibold text-white">Gurgaon Branch:</span>
                  <div className="text-gray-300">
                    Unit no 111, Opp. Omaxe Celebration Mall,<br />
                    Subhash Chowk, Sector 47, Gurugram 122001
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: Social + Copyright */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex space-x-5">
              <a
                href="https://www.instagram.com/whrealtors.in?igsh=eGJqcndxN3Q2MXY4&utm_source=qr"
                aria-label="Instagram"
                className="bg-gray-800 hover:bg-white hover:text-black text-white p-3 rounded-full transition"
              >
                <FaInstagram size={20} />
              </a>
              {/* <a href="#" aria-label="LinkedIn" className="bg-gray-800 hover:bg-white hover:text-black text-white p-3 rounded-full transition">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="bg-gray-800 hover:bg-white hover:text-black text-white p-3 rounded-full transition">
                <FaYoutube size={20} />
              </a> */}
            </div>
            <p className="text-base text-gray-400">
              © Copyright 2025. All Rights Reserved by WH Realtors
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
