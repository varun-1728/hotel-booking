import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The key change is here: flex-col and items-center */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 text-gray-500 text-2xl">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="hover:text-blue-600 transition duration-200" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="hover:text-pink-600 transition duration-200" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="hover:text-blue-600 transition duration-200" />
            </a>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            © 2025 Airbnb Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
}
