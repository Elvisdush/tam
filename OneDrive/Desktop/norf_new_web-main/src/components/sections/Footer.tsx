'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const footerLinks = [
  {
    title: 'Products',
    links: [
      { name: 'All LUT Packs', href: '/shop' },
      { name: 'Best Sellers', href: '/best-sellers' },
      { name: 'Bundles', href: '/bundles' },
      { name: 'Free LUTs', href: '/free' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/support' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'License', href: '/license' },
      { name: 'Refund Policy', href: '/refund-policy' },
    ],
  },
];

const socialLinks = [
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: '#' },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#' },
  { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: '#' },
  { name: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:hello@novaluts.com' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-gray-800/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold mb-6">NOVA LUTs</h3>
            <p className="text-gray-400 mb-6">
              Professional color grading tools for filmmakers and content creators. Elevate your footage with our cinematic LUTs.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((column, index) => (
            <motion.div
              key={index}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.h4 
                className="text-sm font-semibold uppercase tracking-wider text-gray-300"
                variants={item}
              >
                {column.title}
              </motion.h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li key={linkIndex} variants={item}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-gray-500 text-sm mb-4 md:mb-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            © {new Date().getFullYear()} NOVA LUTs. All rights reserved.
          </motion.p>
          
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-500 hover:text-white transition-colors">
              Cookies
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
