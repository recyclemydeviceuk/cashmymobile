import { BadgeCheck, ArrowRight, ShieldCheck, Clock, Lock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sections = [
  {
    num: '1',
    title: 'Ordering & Payment',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p className="font-semibold text-gray-700">Conditions for a Valid Order:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>You must provide accurate information.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Your order is only confirmed once you receive a Dispatch Confirmation email.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>You must be a UK customer or shipping to a UK address.</span>
          </li>
        </ul>
        <p className="font-semibold text-gray-700 mt-4">Price & Payment:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>All prices include VAT.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Accepted methods: Major credit/debit cards and PayPal.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>A Price Match against UK competitors is available (see Section 3).</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    num: '2',
    title: 'Shipping & Delivery',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p><strong>Processing:</strong> Orders before 2pm GMT are processed the same day (excluding weekends/bank holidays).</p>
        <p className="font-semibold text-gray-700">Delivery Areas & Times:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Standard (2-4 days):</strong> Free on orders over £50 to UK Mainland.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Express (1-2 days):</strong> £9.99 fee to UK Mainland.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Special (3-5 days):</strong> Available to Highlands/Islands with extra charges.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Excluded:</strong> Northern Ireland, Channel Islands, BFPO addresses.</span>
          </li>
        </ul>
        <p className="font-semibold text-gray-700 mt-4">Delivery Conditions:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>A signature is required upon delivery.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Tracking is provided for all orders.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Failed deliveries are held for 14 days before return.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    num: '3',
    title: 'Price Match Policy',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p className="font-semibold text-gray-700">Conditions for Eligibility:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Must be an identical refurbished model (same specs, condition, warranty).</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>The competitor must be UK-based with the item in stock and publicly priced.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Excluded: Auction sites (eBay), marketplace sellers (Amazon Marketplace), and limited-time flash sales.</span>
          </li>
        </ul>
        <p className="mt-4"><strong>Process:</strong> Email required details. If verified, the matched price is valid for 24 hours.</p>
      </div>
    ),
  },
  {
    num: '4',
    title: 'Returns & Refunds',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p className="font-semibold text-gray-700">Conditions for a Standard Return:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Must be within 30 days of delivery.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Items must be unused with original packaging and all accessories.</span>
          </li>
        </ul>
        <p className="mt-4"><strong>Non-Returnable Items:</strong> Software licenses, opened accessories, custom-configured devices.</p>
        <p className="font-semibold text-gray-700 mt-4">Refund Process:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Customer pays for return shipping (tracked recommended).</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Refunds issued in 3-5 business days (credit card) or 5-7 days (bank transfer).</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Original delivery charge is not refundable.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    num: '5',
    title: 'Trade-In Program - Device Grade Definitions',
    content: (
      <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
        <p>During trade-in inspection, your device will be assessed and graded into one of the following categories based on its physical and functional condition:</p>
        
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="font-bold text-green-700 mb-2">Like New:</p>
          <ul className="space-y-1 ml-4">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Condition:</strong> No visible signs of wear or damage.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Functionality:</strong> 100% functional.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Other:</strong> Must include the original box and accessories.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Battery (for refurbished phones):</strong> Must have a minimum cycle count of 500.</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="font-bold text-blue-700 mb-2">Good:</p>
          <ul className="space-y-1 ml-4">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Condition:</strong> Minor visible wear (light scratches, scuffs) acceptable.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Functionality:</strong> Fully functional, but may require minor repairs (e.g., screen protector, small component replacement).</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Other:</strong> Original box is a plus but may not be required.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Battery (for refurbished phones):</strong> Must have a minimum cycle count of 500.</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="font-bold text-amber-700 mb-2">Poor:</p>
          <ul className="space-y-1 ml-4">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Condition:</strong> Significant visible wear and/or damage (e.g., deep scratches, dents, cracks on non-critical areas).</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Functionality:</strong> Powers on but has significant functional issues (e.g., faulty buttons, poor speaker quality, camera defects).</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Other:</strong> No requirement for original box.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Battery (for refurbished phones):</strong> Must have a minimum cycle count of 500.</span>
            </li>
          </ul>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="font-bold text-red-700 mb-2">Faulty/Broken:</p>
          <ul className="space-y-1 ml-4">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Condition:</strong> Severe physical damage (e.g., shattered screen, bent frame, major casing damage).</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Functionality:</strong> Does not power on, has major hardware failure (e.g., no display, water damage), or is activation locked (iCloud, Google FRP).</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <span><strong>Other:</strong> Considered for parts or repair. Original box irrelevant.</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    num: '6',
    title: 'Trade-In Process & Notes',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p className="font-semibold text-gray-700">Process:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Get an online quote (valid 7 days).</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Ship your device using the free label provided.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Inspection occurs within 1 working day.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Final offer may be adjusted if the actual grade differs from your assessment.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Choose to accept payment or have the device returned and if once accepted via email or whatsapp or call payment will be processed and it takes 24 hours to reflect in your bank cant be amended you will loose rights on your device once you accepted the offer.</span>
          </li>
        </ul>
        <p className="font-semibold text-gray-700 mt-4">Important Notes:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>You must remove all personal data (e.g., iCloud, Google Account) before sending.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>If you reject the final adjusted offer, a £10 return fee applies.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>The free shipping label has a maximum insurance coverage of £150.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>All devices undergo IMEI validation and checks for liquid damage and activation lock status.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    num: '7',
    title: 'Warranties',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p className="font-semibold text-gray-700">Coverage Periods:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Refurbished Devices:</strong> 12-month warranty; 3-month battery warranty.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>New Devices:</strong> 12-month warranty for device and battery.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span><strong>Accessories:</strong> 6-month warranty.</span>
          </li>
        </ul>
        <p className="font-semibold text-gray-700 mt-4">Conditions for a Valid Warranty Claim:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Provide proof of purchase, device IMEI/serial number, and a description with photos of the fault.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>An RMA number must be issued before returning the device.</span>
          </li>
        </ul>
        <p className="mt-4"><strong>Warranty is Void If:</strong> Unauthorized repairs, physical/liquid damage, or software modifications are found.</p>
      </div>
    ),
  },
  {
    num: '8',
    title: 'General Terms',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p><strong>Governing Law:</strong> England & Wales.</p>
        <p><strong>Dispute Resolution:</strong> A 30-day mediation period is required before any legal action.</p>
        <p><strong>Company:</strong> FB Phones Ltd (Reg. No. 15622827), Unit 9, Central Bus Station, Tithebarn Street, Preston PR1 1YT.</p>
        <p><strong>Contact:</strong> Email: contact@cashmymobile.co.uk (Mon-Fri, 10am-5pm).</p>
      </div>
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
            { icon: Clock, text: 'Fast Payment Guarantee' },
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
