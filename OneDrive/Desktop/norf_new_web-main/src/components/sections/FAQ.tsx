'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What's included in each LUT pack?",
    answer: "Each LUT pack includes a collection of carefully crafted 3D LUTs (.cube files) designed for different lighting conditions and styles. You'll also receive installation guides and recommended settings for best results."
  },
  {
    question: "Which cameras are supported?",
    answer: "Our LUTs work with any camera that shoots in Log or Rec.709 color profiles. They're particularly effective with cameras from Sony, Blackmagic, Canon, Panasonic, and RED. For best results, we recommend shooting in a flat or log profile."
  },
  {
    question: "How do I install the LUTs?",
    answer: "Installation is simple. For DaVinci Resolve, go to the Color tab, right-click in the LUTs panel, and select 'Import LUTs'. For Premiere Pro, copy the .cube files to the 'Lumetri/LUTs/Creative' folder in your Adobe directory. Detailed installation guides are included with each purchase."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee if you're not completely satisfied with your purchase. Simply contact our support team with your order details and reason for the refund request."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes! We provide email support for all our products. Whether you need help with installation or have questions about getting the best results, our team is here to help. Response time is typically within 24 hours on business days."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-gray-800/50 last:border-b-0">
      <button 
        className="w-full py-6 text-left flex justify-between items-center group"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-left group-hover:text-orange-400 transition-colors pr-4">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4 text-gray-400 group-hover:text-white transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-400">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about our LUTs and services
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-gray-900/50 rounded-xl border border-gray-800/50 overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleAccordion(index)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">Still have questions?</p>
          <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
