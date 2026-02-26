import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { contactApi } from '../api';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const subjects = [
  'General Enquiry',
  'Quote Question',
  'Order Status',
  'Payment Issue',
  'Shipping & Postage',
  'Data & Security',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await contactApi.submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      });

      if (response.success) {
        setSubmitted(true);
      } else {
        setError(response.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full bg-gray-50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all';
  const labelClass = 'block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 sm:mb-2';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Header />

      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-red-100 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-red-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-12 pt-12 sm:pt-20 pb-10 sm:pb-14 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            We'd Love to Hear From You
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-4 sm:mb-5">
            Get in <span className="text-red-600">Touch</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed px-2">
            Have a question about selling your phone? Our UK-based team is here to help every step of the way.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid gap-8 sm:gap-10 md:grid-cols-5">

          {/* Left — contact info */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">

            {/* Contact cards */}
            {[
              {
                icon: Mail,
                title: 'Email Us',
                value: 'Support@cashmymobile.co.uk',
                sub: 'We reply within a few hours',
                href: 'mailto:Support@cashmymobile.co.uk',
                bg: 'bg-red-50',
                color: 'text-red-600',
              },
              {
                icon: Phone,
                title: 'Call Us',
                value: '03332244018',
                sub: 'Mon–Fri, 9am–6pm',
                href: 'tel:03332244018',
                bg: 'bg-green-50',
                color: 'text-green-600',
              },
              {
                icon: MapPin,
                title: 'Based In',
                value: 'London, United Kingdom',
                sub: 'UK registered company',
                href: '#',
                bg: 'bg-blue-50',
                color: 'text-blue-600',
              },
              {
                icon: Clock,
                title: 'Working Hours',
                value: 'Mon–Fri: 9am – 6pm',
                sub: 'Sat: 10am – 4pm',
                href: '#',
                bg: 'bg-red-50',
                color: 'text-red-600',
              },
            ].map(({ icon: Icon, title, value, sub, href, bg, color }) => (
              <a key={title} href={href} className="group flex items-start gap-3 sm:gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 p-4 sm:p-5">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 ${bg} ${color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{title}</div>
                  <div className="font-bold text-gray-900 text-xs sm:text-sm">{value}</div>
                  <div className="text-[11px] sm:text-xs text-gray-400 mt-0.5">{sub}</div>
                </div>
              </a>
            ))}

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">Quick Help</p>
              <div className="space-y-2">
                {[
                  { label: 'How It Works', href: '/how-it-works' },
                  { label: 'Frequently Asked Questions', href: '/faq' },
                  { label: 'Get an Instant Quote', href: '/sell' },
                ].map(({ label, href }) => (
                  <Link key={label} to={href} className="flex items-center justify-between text-xs sm:text-sm text-gray-600 hover:text-red-600 py-2 px-3 rounded-xl hover:bg-red-50 transition-all group">
                    <span>{label}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Form header */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 px-5 sm:px-8 py-4 sm:py-6 flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-extrabold text-base sm:text-lg">Send Us a Message</h2>
                  <p className="text-red-200 text-[11px] sm:text-xs">We'll get back to you as soon as possible</p>
                </div>
              </div>

              {submitted ? (
                /* Success state */
                <div className="p-6 sm:p-10 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">Message Sent!</h3>
                  <p className="text-gray-500 text-xs sm:text-sm max-w-sm px-2">
                    Thanks for reaching out, <span className="font-semibold text-gray-700">{form.name}</span>. We'll get back to you at <span className="font-semibold text-red-600">{form.email}</span> within a few hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-2 w-full sm:w-auto">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition-all w-full sm:w-auto"
                    >
                      Send Another
                    </button>
                    <Link to="/sell" className="w-full sm:w-auto">
                      <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-red-200 w-full justify-center">
                        Get My Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-4 sm:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="John Smith" required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="john@example.com" required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="07123 456789"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Subject <span className="text-red-500">*</span></label>
                      <select
                        name="subject" value={form.subject} onChange={handleChange} required
                        className={inputClass}
                      >
                        <option value="">Select a subject...</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Message <span className="text-red-500">*</span></label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Privacy note */}
                  <div className="flex items-start gap-2.5 sm:gap-3 bg-red-50 rounded-xl p-3 sm:p-4">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                      Your information is safe with us. We'll only use it to respond to your enquiry. Read our{' '}
                      <Link to="/privacy" className="text-red-600 hover:underline font-medium">Privacy Policy</Link>.
                    </p>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-red-600 font-medium">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-70 text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 text-xs sm:text-sm hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-3 sm:gap-5">
          {[
            { icon: Clock, title: 'Fast Response', desc: 'Reply within a few hours', color: 'text-green-600', bg: 'bg-green-50' },
            { icon: ShieldCheck, title: 'UK Based Team', desc: 'Local support you can trust', color: 'text-red-600', bg: 'bg-red-50' },
            { icon: MessageCircle, title: 'Friendly Support', desc: 'No bots, real people', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: CheckCircle2, title: 'Always Here', desc: 'Mon–Sat availability', color: 'text-red-600', bg: 'bg-red-50' },
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
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-white overflow-hidden py-12 sm:py-16 px-4 sm:px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            Ready to Sell Your <span className="text-red-600">Phone?</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 px-2">Get a free instant quote in under 60 seconds. No obligation.</p>
          <Link to="/sell" className="w-full sm:w-auto">
            <button className="group bg-red-600 hover:bg-red-700 text-white font-bold px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl flex items-center gap-2 mx-auto transition-all shadow-xl shadow-red-200 hover:-translate-y-0.5 w-full sm:w-auto justify-center text-sm sm:text-base">
              Get Your Free Quote
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
