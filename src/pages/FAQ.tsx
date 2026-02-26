import { useState } from 'react';
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Lock,
  Star,
  MessageCircle,
  Smartphone,
  CreditCard,
  Package,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = [
  {
    label: 'Getting a Quote',
    icon: Smartphone,
    color: 'text-red-600',
    bg: 'bg-red-50',
    faqs: [
      {
        q: 'How do I get a quote for my phone?',
        a: "Simply select your phone model and condition on our 'Sell Phone' page. You'll receive an instant quote based on your selections. The process takes less than 60 seconds.",
      },
      {
        q: 'Which phone models do you accept?',
        a: 'We accept Apple iPhones from iPhone 11 to iPhone 16 series, and Samsung Galaxy phones from S21 to S25 series, in any condition.',
      },
      {
        q: 'How long is my quote valid?',
        a: 'Your quote is valid for 14 days from the date of issue. After this period, you\'ll need to get a new quote as prices may have changed.',
      },
      {
        q: 'How do you determine the final price?',
        a: 'Our technicians inspect the device to verify: model, storage capacity, functional status, physical condition, and whether it matches your description. The price is adjusted if there are discrepancies.',
      },
      {
        q: 'Do you buy phones with cracked screens?',
        a: "Yes, we buy phones with cracked screens under the 'Broken' condition category. The quote reflects the damaged state of the device.",
      },
    ],
  },
  {
    label: 'Process & Shipping',
    icon: Package,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    faqs: [
      {
        q: 'How long does the whole process take?',
        a: 'From getting your quote to receiving payment typically takes 2–5 days. Once we receive your device, payment is processed promptly via bank transfer.',
      },
      {
        q: 'What condition categories do you accept?',
        a: 'We accept phones in three conditions: Good (fully functional with minimal wear), Poor (functional with visible wear or minor issues), and Broken (not functioning or has major damage).',
      },
      {
        q: 'Do I need to pay for postage?',
        a: 'No, postage is completely free. You can either print our prepaid shipping label at home or request a free packaging kit to be sent to your address.',
      },
      {
        q: 'How do I know my device is insured during shipping?',
        a: "All devices are fully insured during transit when sent using our prepaid shipping labels. If anything happens during shipping, you're completely covered.",
      },
      {
        q: 'Can I track my device after sending it?',
        a: "Yes, the shipping label includes tracking. You'll be able to monitor your package's journey and we'll confirm once we receive it.",
      },
    ],
  },
  {
    label: 'Payment',
    icon: CreditCard,
    color: 'text-green-600',
    bg: 'bg-green-50',
    faqs: [
      {
        q: 'How will I receive payment?',
        a: "Payment is made via UK bank transfer directly to your account promptly after receiving and inspecting your device. You'll need to provide your account name, sort code, and account number.",
      },
      {
        q: 'What payment methods do you use?',
        a: 'We only pay via UK bank transfer (faster payments). We do not offer PayPal, cheques, or gift cards.',
      },
      {
        q: 'Can I sell multiple phones at once?',
        a: 'Yes, you can sell multiple devices. Simply complete a separate order form for each device or contact us for bulk sales.',
      },
    ],
  },
  {
    label: 'Data & Security',
    icon: ShieldCheck,
    color: 'text-red-600',
    bg: 'bg-red-50',
    faqs: [
      {
        q: 'Do I need to remove my data before sending the phone?',
        a: 'Yes, you must back up your data, disable Find My iPhone/Google Account, remove your SIM card, and perform a factory reset before sending your device. While we perform data wiping, you are responsible for removing your personal data.',
      },
      {
        q: 'What happens if my phone is lost or stolen?',
        a: 'We cannot accept phones that are reported lost or stolen. You must be the legal owner of the device and it must not be locked to any accounts or reported as lost/stolen.',
      },
    ],
  },
  {
    label: 'Orders & Cancellations',
    icon: AlertCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    faqs: [
      {
        q: "What if my device doesn't match the condition I selected?",
        a: "If the device condition doesn't match what you described, we'll contact you with a revised quote. You can choose to accept the new offer or have your device returned to you at no cost.",
      },
      {
        q: 'Can I cancel my order?',
        a: "Yes, you can cancel your order at any time before sending your device. Once your device is in transit, you cannot cancel, but you can decline our offer and have your device returned.",
      },
      {
        q: 'What if I change my mind after sending my device?',
        a: "If we haven't processed your device yet, we can return it to you. Once inspection has started, you must either accept our offer (original or revised) or have the device returned.",
      },
    ],
  },
];

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-red-200 shadow-md shadow-red-50' : 'border-gray-100 hover:border-red-100'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left bg-white hover:bg-red-50/30 transition-colors"
      >
        <span className={`font-semibold text-xs sm:text-sm md:text-base leading-snug ${isOpen ? 'text-red-700' : 'text-gray-800'}`}>{q}</span>
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-red-600 rotate-180' : 'bg-gray-100'}`}>
          <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isOpen ? 'text-white' : 'text-gray-500'}`} />
        </div>
      </button>
      {isOpen && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 bg-white border-t border-red-50">
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed pt-3 sm:pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const toggle = (key: string) => setOpenItem(openItem === key ? null : key);

  const allFaqs = categories.flatMap((cat) =>
    cat.faqs.map((faq) => ({ ...faq, category: cat.label }))
  );

  const displayedCategories = activeCategory === 'All' ? categories : categories.filter((c) => c.label === activeCategory);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Header />

      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-red-100 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-red-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-12 pt-12 sm:pt-20 pb-10 sm:pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" />
            {allFaqs.length} Questions Answered
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-4 sm:mb-6">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
            Find answers to common questions about selling your phone with Cash My Mobile.
          </p>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center">
          {[
            { value: '50,000+', label: 'Phones Bought' },
            { value: '£12M+', label: 'Paid to Customers' },
            { value: 'Fast', label: 'Bank Transfer' },
            { value: '4.9★', label: 'Trustpilot Rating' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white sm:bg-transparent rounded-xl sm:rounded-none p-2 sm:p-0 border border-gray-100 sm:border-0">
              <div className="text-xl sm:text-2xl font-extrabold text-gray-900">{value}</div>
              <div className="text-gray-400 text-[11px] sm:text-xs font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ CONTENT ── */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-12 justify-center px-2">
            {['All', ...categories.map((c) => c.label)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-md shadow-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ categories */}
          <div className="space-y-8 sm:space-y-12">
            {displayedCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.label}>
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 ${cat.bg} ${cat.color} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-extrabold text-gray-900">{cat.label}</h2>
                      <p className="text-[11px] sm:text-xs text-gray-400">{cat.faqs.length} questions</p>
                    </div>
                    <div className="flex-1 h-px bg-gray-100 ml-2" />
                  </div>

                  {/* Accordion items */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {cat.faqs.map((faq) => {
                      const key = `${cat.label}::${faq.q}`;
                      return (
                        <AccordionItem
                          key={key}
                          q={faq.q}
                          a={faq.a}
                          isOpen={openItem === key}
                          onToggle={() => toggle(key)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS ── */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 md:px-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-red-100 shadow-sm p-6 sm:p-10 flex flex-col md:flex-row items-center gap-5 sm:gap-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-50 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg sm:text-2xl font-extrabold text-gray-900 mb-2">Still Have Questions?</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-lg">
                Can't find the answer you're looking for? Get started with your quote and we'll be here to help every step of the way.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto flex-shrink-0">
              <Link to="/sell" className="w-full sm:w-auto">
                <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-5 sm:px-7 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-200 hover:-translate-y-0.5 whitespace-nowrap w-full justify-center text-sm">
                  Get Your Quote Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-200 text-gray-700 font-semibold px-5 sm:px-7 py-3 rounded-xl transition-all whitespace-nowrap w-full justify-center text-sm">
                  How It Works
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {[
              { icon: ShieldCheck, title: 'Secure & Certified', desc: 'Fully certified UK service', color: 'text-red-600', bg: 'bg-red-50' },
              { icon: Clock, title: 'Fast Payment', desc: 'Direct bank transfer', color: 'text-green-600', bg: 'bg-green-50' },
              { icon: Lock, title: 'Data Wiped', desc: 'Military-grade erasure', color: 'text-red-600', bg: 'bg-red-50' },
              { icon: BadgeCheck, title: 'No Hidden Fees', desc: 'Transparent pricing', color: 'text-blue-600', bg: 'bg-blue-50' },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="flex flex-col items-center text-center p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-100 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 ${bg} ${color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="font-bold text-gray-900 text-xs sm:text-sm">{title}</div>
                <div className="text-[11px] sm:text-xs text-gray-400 mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative bg-white overflow-hidden py-12 sm:py-20 px-4 sm:px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-red-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-red-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Star className="w-3.5 h-3.5 text-red-500" fill="currentColor" /> Trusted by 50,000+ Customers
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-5 leading-tight">
            Ready to Turn Your Phone<br />
            <span className="text-red-600">Into Cash?</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-lg mb-7 sm:mb-10 max-w-xl mx-auto px-2">
            Get your instant quote in less than 60 seconds. No obligation, free postage, fast bank transfer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link to="/sell" className="w-full sm:w-auto">
              <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5 w-full justify-center text-sm sm:text-base">
                Get Your Quote Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/how-it-works" className="w-full sm:w-auto">
              <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-200 text-gray-700 font-semibold px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl transition-all w-full justify-center text-sm sm:text-base">
                How It Works
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-7 sm:mt-10 px-2 sm:px-0">
            {[
              { icon: ShieldCheck, text: 'Free & Secure' },
              { icon: Clock, text: 'Fast Bank Transfer' },
              { icon: Lock, text: 'Data Wiped' },
              { icon: BadgeCheck, text: 'No Hidden Fees' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-xs sm:text-sm">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
