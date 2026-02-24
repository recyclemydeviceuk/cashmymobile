import { ShieldCheck, ArrowRight, Lock, BadgeCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sections = [
  {
    num: '1',
    title: 'Information We Collect',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p>We collect information that you provide directly to us when using our services:</p>
        <ul className="space-y-2 mt-3">
          {[
            { label: 'Personal details', desc: 'Name, email address, phone number, postal address' },
            { label: 'Bank account details', desc: 'Account name, sort code, account number (for payments)' },
            { label: 'Device information', desc: 'Model, condition, and specifications of devices you sell' },
            { label: 'Communication records', desc: 'Emails and messages exchanged with our team' },
          ].map(({ label, desc }) => (
            <li key={label} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <span><span className="font-semibold text-gray-700">{label}:</span> {desc}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    num: '2',
    title: 'How We Use Your Information',
    content: (
      <div className="space-y-2 text-gray-500 text-sm leading-relaxed">
        <p>We use the information we collect to:</p>
        <ul className="space-y-2 mt-3">
          {[
            'Process your device sale and provide our services',
            'Send payment for your device',
            'Send shipping labels and instructions',
            'Communicate with you about your order',
            'Improve our services and customer experience',
            'Comply with legal obligations',
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
    num: '3',
    title: 'Information Sharing',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
        <ul className="space-y-2 mt-3">
          {[
            'Payment processors to facilitate bank transfers',
            'Shipping carriers to deliver labels and packages',
            'Service providers who assist in operating our business',
            'Law enforcement when required by law',
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
    title: 'Data Security',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
      </p>
    ),
  },
  {
    num: '5',
    title: 'Device Data Wiping',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        All devices received are subject to secure data wiping procedures. However, you are responsible for backing up and removing your personal data before sending your device to us. We are not responsible for any data remaining on devices sent to us.
      </p>
    ),
  },
  {
    num: '6',
    title: 'Data Retention',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Transaction records are typically retained for 7 years for tax and accounting purposes.
      </p>
    ),
  },
  {
    num: '7',
    title: 'Your Rights',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p>Under UK GDPR, you have the right to:</p>
        <ul className="space-y-2 mt-3">
          {[
            'Access your personal data',
            'Correct inaccurate personal data',
            'Request erasure of your personal data',
            'Object to processing of your personal data',
            'Request restriction of processing',
            'Data portability',
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
    num: '8',
    title: 'Third-Party Links',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
      </p>
    ),
  },
  {
    num: '9',
    title: 'Changes to Privacy Policy',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.
      </p>
    ),
  },
  {
    num: '10',
    title: 'Contact Us',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us through the contact form on our website or email us at{' '}
        <a href="mailto:hello@cashmymobile.co.uk" className="text-red-600 hover:underline font-medium">hello@cashmymobile.co.uk</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Header />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            Last updated: 21/02/2026
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-4">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-5 flex flex-wrap justify-center gap-8">
          {[
            { icon: Lock, text: 'Data Encrypted' },
            { icon: ShieldCheck, text: 'GDPR Compliant' },
            { icon: BadgeCheck, text: 'UK Registered' },
            { icon: Clock, text: '7-Year Retention Max' },
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
            <ShieldCheck className="w-7 h-7 text-red-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Ready to sell your phone?</h3>
            <p className="text-gray-500 text-sm">Your data is safe with us. Get a free instant quote in under 60 seconds.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/sell">
              <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-200 hover:-translate-y-0.5 whitespace-nowrap">
                Get My Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link to="/terms">
              <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-red-200 text-gray-700 font-semibold px-7 py-3 rounded-xl transition-all whitespace-nowrap">
                Terms & Conditions
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
