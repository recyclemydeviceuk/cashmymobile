import { ShieldCheck, ArrowRight, Lock, BadgeCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sections = [
  {
    num: 'Intro',
    title: 'Introduction',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p>When we refer to "we," "our," or "us" in this policy, we are referring to Cash My Mobile the company which processes your order. Cash My Mobile will be the data processor and the data controller of any such Personal Data.</p>
        <p>This Privacy Policy describes how Cash My Mobile collects, uses and discloses your personal information and data ("Personal Data").</p>
        <p><strong>1.1</strong> By using the Website, registering as a user of any services provided by Cash My Mobile, you consent to the collection and use of your Personal Data in the manner and for the purposes described in this Privacy Policy.</p>
        <p><strong>1.2</strong> If you have any questions about the collection or use of your Personal Data through the Website or if you would like Cash My Mobile to remove your Personal Data from Cash My Mobile's database or if you no longer wish to receive information about products and services, you should contact Cash My Mobile by email to contact@cashmymobile.co.uk. Cash My Mobile will deal with your query within 48 hours.</p>
        <p><strong>1.3</strong> Cash My Mobile may collect and process the following Personal Data about you:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>information that you provide by filling in the forms/boxes on the Website. This includes information provided at the time of registering to use the Website, subscribing to Cash My Mobile's service, posting material or requesting further services. Cash My Mobile may also ask you for information when you enter a competition or promotion and when you report a problem with the Website;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>if you contact us, Cash My Mobile may keep a record of that correspondence;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Cash My Mobile may also ask you to complete surveys that Cash My Mobile uses for research purposes, although you do not have to respond to them; and</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>details of your visits to the Website including, but not limited to, traffic data, location data, weblogs and other communication data, whether this is required for Cash My Mobile's own billing purposes or otherwise and the resources that you access</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    num: '2',
    title: 'Use and Storage of Personal Data',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p><strong>2.1</strong> All Personal Data will be treated as strictly confidential, stored in a secure fashion and used by Cash My Mobile solely for purposes related to the use of Cash My Mobile or otherwise in accordance with this Privacy Policy. More specifically, Cash My Mobile need to use your Personal Data to process your order, your Personal Data will be used in the following ways:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to register you with the Website and to administer the Website services;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to carry out Cash My Mobile's obligations arising from any contracts entered into between you and Cash My Mobile;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to help improve the Cash My Mobile;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to help improve the content of the Website and the service Cash My Mobile offers to users of the Website;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to ensure that content from the Website is presented in the most effective manner for you and for your computer;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>for internal audit purposes.</span>
          </li>
        </ul>
        <p><strong>2.2</strong> If you have opted in to receive marketing information, Cash My Mobile may use your Personal Data in the following ways:</p>
        <p>to keep you informed of the latest Cash My Mobile products and services by Email. If you wish to receive information of such products and services, please tick the opt-in box provided when registering on this website;</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to administer any prize draws or competitions you may enter;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to provide users with information regarding updates or additional services available through the Website;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to improve Cash My Mobile's profile of you so that Cash My Mobile can provide you with a better and more personal service;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to carry out Cash My Mobile's own demographic research analysis. For this purpose, Cash My Mobile may combine your information in aggregated form (i.e. anonymous) with information about other users; and</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Your email address, used for marketing purposes, may be transferred outside of the EEA as Cash My Mobile use a US company to send out our marketing information, we have verified that they have signed up to the EU-US Privacy Shield Agreement</span>
          </li>
        </ul>
        <p><strong>2.3</strong> Unfortunately, the transmission of information via the internet is not completely secure. Although Cash My Mobile will do its best to protect your Personal Data, Cash My Mobile cannot guarantee the security of your data transmitted to the Website and any transmission is at your own risk. Once Cash My Mobile has received your Personal Data, Cash My Mobile will use strict procedures and security features to try to prevent unauthorized access</p>
        <p><strong>2.4</strong> Cash My Mobile will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses or other technologically harmful material that may infect your computer equipment, computer programs, data or other proprietary material due to your use of the Website.</p>
      </div>
    ),
  },
  {
    num: '3',
    title: "Children's information",
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        Our services are not directed to children under 16. If you learn that a child under 16 has provided us with personal information without consent, please contact us.
      </p>
    ),
  },
  {
    num: '4',
    title: 'Disclosure of Personal Data',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p><strong>4.1</strong> Cash My Mobile may give Personal Data about you to employees and agents of Cash My Mobile to administer any accounts, products and services provided to you by Cash My Mobile now or in the future, who may use it for purposes related to the use of the Website.</p>
        <p><strong>4.2</strong> Cash My Mobile may disclose your Personal Data to any member of Cash My Mobile's group of companies, partners or affiliates, which includes Cash My Mobile's subsidiaries, Cash My Mobile's ultimate holding company and its subsidiaries, as defined in the Companies Act 2006, and any other companies associated or connected with Cash My Mobile.</p>
        <p><strong>4.3</strong> During changes to our business structure. If we engage in a merger, acquisition, bankruptcy, dissolution, reorganization, sale of some or all of Cash My Mobile's assets, financing, acquisition of all or a portion of our business.</p>
        <p><strong>4.4</strong> Cash My Mobile may disclose your Personal Data to third parties:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to protect the rights, property, or personal safety of Cash My Mobile personnel, other users and the public;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to any company or other entity acquiring all or part of the business of Cash My Mobile but on strict condition that your information will continue to be used only in accordance with the terms of this Privacy Policy;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to enforce terms and conditions;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>where Cash My Mobile is under a duty to disclose or share your Personal Data to comply with any legal obligation;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>for the purposes of fraud protection and crime reduction (including by providing information to the police about any stolen, blocked, counterfeit or fake devices); and</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>to carry out Cash My Mobile's marketing and promotional communications, research and analysis (in an aggregated form only).</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>we may engage third party companies or individuals as service providers or business partners to process Other Information and support our business. These third parties may, for example, provide virtual computing and storage services.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    num: '5',
    title: 'IP Addresses and Cookies',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p><strong>5.1</strong> Cash My Mobile may collect information about your computer, including where available your IP address, operating system and browser type, for system administration and to report aggregate information. This is statistical data about users' browsing actions and patterns, and does not identify any individual.</p>
        <p><strong>5.2</strong> For the same reason, Cash My Mobile may obtain information about your general internet usage by using a cookie. Cookies are small data files sent by a web server to a web browser to enable the server to collect information back from the browser. They contain information that is transferred to your computer's hard drive. Cash My Mobile uses cookies to track usage of the Website, to identify returning users and to enable Cash My Mobile to customise parts of the Website according to users' previous browsing habits at the site. Consequently, they help Cash My Mobile to improve the Website and to deliver a better and more personalised service.</p>
        <p><strong>5.3</strong> You can delete cookies from your hard drive at any time. You may also be able to set your browser to disable cookies. However, you should be aware that, if you disable cookies, this may limit your ability to enjoy the full functionality of the Website. Unless you have adjusted your browser setting so that it will refuse cookies, Cash My Mobile's system will issue cookies when you log on to the Website.</p>
      </div>
    ),
  },
  {
    num: '6',
    title: 'Security',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        Cash My Mobile takes security seriously. We take various steps to protect information you provide to us from loss, misuse, and unauthorized access or disclosure. These steps take into account the sensitivity of the information we collect, process and store, and the current state of technology.
      </p>
    ),
  },
  {
    num: '7',
    title: 'Third Party Links',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        <strong>7.1</strong> The Website may, from time to time, contain links to and from websites of Cash My Mobile's partner networks, advertisers and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and Cash My Mobile does not accept any responsibility or liability for these policies. Please check these policies before you submit any Personal Data to these websites.
      </p>
    ),
  },
  {
    num: '8',
    title: 'Data Retention',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p><strong>8.1</strong> Data collected by Cash My Mobile may be retained depending on the following ways;</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>If you were to opt in to receive marketing data, your name and email address will be retained for five years after your last transaction;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>If you didn't opt in, your personal data mentioned in section 3 of this policy, for three years after your last transaction;</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <span>Your order information will be kept for seven years due to financial regulations;</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    num: '9',
    title: 'Access to Information',
    content: (
      <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
        <p><strong>9.1</strong> The Act gives you the right to access and rectification or erasure of personal data or restriction of processing information held about you. Your right of access can be exercised in accordance with the Act.</p>
        <p><strong>9.2</strong> If you feel like Cash My Mobile are not fulfilling their duties when protecting your data, you can lodge a complaint with the Information Commissioners Offices at the following link – https://ico.org.uk/concerns/</p>
      </div>
    ),
  },
  {
    num: '10',
    title: 'Changes to this Privacy Policy',
    content: (
      <p className="text-gray-500 text-sm leading-relaxed">
        <strong>10.1</strong> We may change this policy from time to time, and if we do we will post any changes on this page. If you continue to use the services after those changes are in effect, you agree to the revised policy.
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
