import { BadgeCheck, ArrowRight, ShieldCheck, Clock, Lock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sections = [
  {
    num: '1',
    title: 'Agreement to Terms',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        By accessing and using Cash My Mobile's services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
      </p>
    ),
  },
  {
    num: '2',
    title: 'Service Description',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        Cash My Mobile provides a phone buying service where customers can sell their used mobile devices. We provide instant quotes based on the device model and condition selected by the customer.
      </p>
    ),
  },
  {
    num: '3',
    title: 'Quote Accuracy',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p>All quotes provided are conditional upon the device matching the condition described during the quote process. We reserve the right to revise the quote if the device received does not match the described condition.</p>
        <ul className="space-y-2 mt-3">
          {[
            'Quotes are valid for 14 days from the date of issue',
            'Device must match the model and condition selected',
            'Device must not be reported lost or stolen',
            'Find My iPhone/Google Account must be disabled',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    num: '4',
    title: 'Device Condition Assessment',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p>Upon receiving your device, our technicians will inspect it to verify the condition matches your description:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Good', desc: 'Fully functional with minimal wear', color: 'bg-green-50 border-green-100 text-green-700' },
            { label: 'Poor', desc: 'Functional with visible wear or minor issues', color: 'bg-amber-50 border-amber-100 text-amber-700' },
            { label: 'Broken', desc: 'Not functioning or has major damage', color: 'bg-red-50 border-red-100 text-red-700' },
          ].map(({ label, desc, color }) => (
            <div key={label} className={`rounded-xl border p-4 ${color}`}>
              <div className="font-bold text-sm mb-1">{label}</div>
              <div className="text-xs opacity-80">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: '5',
    title: 'Payment Terms',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        Payment will be processed within 24 hours of receiving and inspecting your device, subject to the device matching the described condition. Payment is made via UK bank transfer to the account details provided.
      </p>
    ),
  },
  {
    num: '6',
    title: 'Data Removal',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        Customers are responsible for backing up and removing all personal data before sending their device. While we perform data wiping on all devices received, we are not liable for any data remaining on devices sent to us.
      </p>
    ),
  },
  {
    num: '7',
    title: 'Shipping',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        We provide free prepaid shipping labels or packaging kits. Devices are insured during transit. Customers are responsible for packaging devices securely and sending them via the provided shipping method.
      </p>
    ),
  },
  {
    num: '8',
    title: 'Cancellation & Returns',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        If we cannot accept your device at the quoted price, we will contact you with a revised offer. You may choose to accept the revised offer or request return of your device at no cost to you.
      </p>
    ),
  },
  {
    num: '9',
    title: 'Liability',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        We are not liable for devices lost or damaged by the courier, though devices are insured during transit. We are not responsible for any data remaining on devices or any consequences of data not being properly removed.
      </p>
    ),
  },
  {
    num: '10',
    title: 'Changes to Terms',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
      </p>
    ),
  },
  {
    num: '11',
    title: 'Governing Law',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
      </p>
    ),
  },
];

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Header />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <FileText className="w-3.5 h-3.5 text-red-500" />
            Last updated: 21/02/2026
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-4">
            Terms & <span className="text-red-600">Conditions</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-5 flex flex-wrap justify-center gap-8">
          {[
            { icon: ShieldCheck, text: 'UK Registered Business' },
            { icon: Clock, text: '24hr Payment Guarantee' },
            { icon: Lock, text: 'Data Wiped Securely' },
            { icon: BadgeCheck, text: 'England & Wales Law' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
              <Icon className="w-4 h-4 text-red-500" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">

          {/* Sidebar TOC */}
          <aside className="md:w-56 flex-shrink-0">
            <div className="sticky top-24 bg-gray-50 rounded-2xl border border-gray-100 p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contents</p>
              <nav className="space-y-1">
                {sections.map(({ num, title }) => (
                  <a
                    key={num}
                    href={`#section-${num}`}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 py-1.5 px-2 rounded-lg hover:bg-red-50 transition-all"
                  >
                    <span className="w-5 h-5 bg-red-100 text-red-600 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0">{num}</span>
                    <span className="leading-tight">{title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <div className="flex-1 space-y-6">
            {sections.map(({ num, title, content }) => (
              <div
                key={num}
                id={`section-${num}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0">
                    {num}
                  </div>
                  <h2 className="text-lg font-extrabold text-gray-900">{title}</h2>
                </div>
                {content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 md:px-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-red-100 shadow-sm p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
            <BadgeCheck className="w-7 h-7 text-red-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Ready to sell your phone?</h3>
            <p className="text-gray-500 text-sm">By proceeding, you agree to our Terms & Conditions. Get a free instant quote in under 60 seconds.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/sell">
              <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-200 hover:-translate-y-0.5 whitespace-nowrap">
                Get My Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link to="/privacy">
              <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-200 text-gray-700 font-semibold px-7 py-3 rounded-xl transition-all whitespace-nowrap">
                Privacy Policy
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
