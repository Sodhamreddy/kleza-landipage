import { useState, useEffect, useRef } from 'react';
import './App.css';

const LOGO = 'https://kleza.io/wp-content/uploads/2021/09/logo.png';

/* ─── CLIENTS ─────────────────────────────────────── */
const CLIENTS = [
  { n: 'Right at Home', s: 'https://kleza.io/wp-content/uploads/2024/11/RAH.png' },
  { n: 'Stadium Pharmacy', s: 'https://kleza.io/wp-content/uploads/2024/02/Stadium-Pharmacy.png' },
  { n: 'Home Instead', s: 'https://kleza.io/wp-content/uploads/2025/11/kleza-Website-logos-3.png' },
  { n: 'Interim Healthcare', s: 'https://kleza.io/wp-content/uploads/2025/11/kleza-Website-logos-2.png' },
  { n: 'Assured', s: 'https://kleza.io/wp-content/uploads/2024/02/Assured.png' },
  { n: 'LIAFI', s: 'https://kleza.io/wp-content/uploads/2024/02/LIAFI.png' },
  { n: 'Care Health', s: 'https://kleza.io/wp-content/uploads/2024/02/Care-Health.png' },
  { n: 'Incredibletots', s: 'https://kleza.io/wp-content/uploads/2024/05/incredibletots.png' },
  { n: 'Jiomed', s: 'https://kleza.io/wp-content/uploads/2024/02/Jiomed.png' },
  { n: 'BMR Lawoffices', s: 'https://kleza.io/wp-content/uploads/2024/02/BMR-Lawoffices.png' },
  { n: 'Finoplus', s: 'https://kleza.io/wp-content/uploads/2024/02/Finoplus.png' },
  { n: 'Ankrotech', s: 'https://kleza.io/wp-content/uploads/2024/02/ankrotech.png' },
  { n: 'Tech Total', s: 'https://kleza.io/wp-content/uploads/2024/02/Tech-Total.png' },
  { n: 'Before You', s: 'https://kleza.io/wp-content/uploads/2024/08/Before-You-Solutions.png' },
  { n: 'Alphatek', s: 'https://kleza.io/wp-content/uploads/2024/05/Alphatek.png' },
  { n: 'Techton', s: 'https://kleza.io/wp-content/uploads/2024/06/Techton.png' },
  { n: 'JV Softech', s: 'https://kleza.io/wp-content/uploads/2024/02/JV-Softech.png' },
  { n: 'Rits Sports', s: 'https://kleza.io/wp-content/uploads/2024/02/Rits-sports.png' },
  { n: 'Chanakya Education', s: 'https://kleza.io/wp-content/uploads/2024/02/Chanakya-Education.png' },
  { n: 'Rahul Hospital', s: 'https://kleza.io/wp-content/uploads/2025/01/Rahul-Hospital.png' },
  { n: 'Eesha Hospitals', s: 'https://kleza.io/wp-content/uploads/2024/09/Eesha_Hospitals-Logo.png' },
  { n: 'Profundity', s: 'https://kleza.io/wp-content/uploads/2024/02/Profundity.png' },
  { n: 'Keen', s: 'https://kleza.io/wp-content/uploads/2024/02/Keen.png' },
  { n: 'URVI', s: 'https://kleza.io/wp-content/uploads/2024/02/URVI.png' },
];

const SERVICES = [
  {
    num: '01',
    icon: '🤖',
    label: 'AI-Powered Digital Marketing',
    subtitle: 'GEO / AEO Optimization',
    desc: 'Stay ahead of AI-driven search with Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). We position your brand to appear in AI overviews, featured snippets, and voice search results — capturing future-ready visibility.',
    features: ['Generative Engine Optimization (GEO)', 'Answer Engine Optimization (AEO)', 'AI Visibility Strategy', 'Structured Data & Schema Markup'],
    color: '#0066FF',
    stat1: { val: '↗ 50%', label: 'TRAFFIC' },
    stat2: { val: '↗ 36%', label: 'CLICK-THROUGH RATE' },
    partners: ['Meta Business Partner', 'Google Partner'],
    satisfied: { pct: 97, count: '120+' },
    workflow: ['Strategy & Audit', 'AI Optimisation', 'Track & Scale'],
    liveCount: '43 Active',
    bg: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '02',
    icon: '🔍',
    label: 'SEO Services',
    subtitle: 'Local & Technical SEO',
    desc: 'Dominate search rankings with our comprehensive SEO approach. From deep technical audits to local market dominance, we build sustainable organic traffic that compounds month over month.',
    features: ['Technical SEO Audit & Fixes', 'Local SEO & Google Business Profile', 'Content Strategy & Link Building', 'International & Multi-Location SEO'],
    color: '#10B2E6',
    stat1: { val: '↗ 340%', label: 'ORGANIC TRAFFIC' },
    stat2: { val: '↗ 68%', label: 'SEARCH VISIBILITY' },
    partners: ['Google Partner', 'SEMrush Certified'],
    satisfied: { pct: 98, count: '200+' },
    workflow: ['Site Audit', 'Keyword Strategy', 'Rank & Grow'],
    liveCount: '67 Active',
    bg: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '03',
    icon: '📊',
    label: 'Google Ads Management',
    subtitle: 'PPC & Performance Max',
    desc: 'Maximise every advertising dollar with data-driven Google Ads campaigns. Our certified specialists engineer campaigns that consistently deliver high ROAS across Search, Display, Shopping, and Performance Max.',
    features: ['Search & Shopping Campaigns', 'Performance Max & Display Ads', 'Conversion Rate Optimisation', 'Smart Bidding & Audience Targeting'],
    color: '#0EA5E9',
    stat1: { val: '4.8×', label: 'AVERAGE ROAS' },
    stat2: { val: '↗ 200%', label: 'AD CONVERSIONS' },
    partners: ['Google Premier Partner', 'Meta Business'],
    satisfied: { pct: 96, count: '180+' },
    workflow: ['Campaign Build', 'A/B Testing', 'ROAS Optimise'],
    liveCount: '91 Campaigns',
    bg: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '04',
    icon: '📱',
    label: 'Meta & LinkedIn Ads',
    subtitle: 'Social Paid Advertising',
    desc: 'Reach your ideal customers where they spend their time. We craft compelling Meta and LinkedIn campaigns that build brand awareness, generate qualified leads, and scale your revenue efficiently.',
    features: ['Facebook & Instagram Ads', 'LinkedIn Lead Generation Ads', 'Retargeting & Lookalike Audiences', 'Creative Testing & Optimisation'],
    color: '#0052CC',
    stat1: { val: '↗ 120%', label: 'LEAD VOLUME' },
    stat2: { val: '-42%', label: 'COST PER LEAD' },
    partners: ['Meta Business Partner', 'LinkedIn Marketing'],
    satisfied: { pct: 95, count: '150+' },
    workflow: ['Creative Design', 'Audience Targeting', 'Lead & Convert'],
    liveCount: '58 Ads Live',
    bg: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '05',
    icon: '✨',
    label: 'Social Media Management',
    subtitle: 'SMM & Brand Growth',
    desc: 'Build a brand that your audience loves and trusts. Our social media team creates scroll-stopping content, manages community engagement, and runs campaigns that grow your following into a loyal customer base.',
    features: ['Content Creation & Scheduling', 'Community Management', 'Brand Voice & Strategy', 'Analytics & Monthly Reporting'],
    color: '#0891B2',
    stat1: { val: '↗ 85%', label: 'ENGAGEMENT RATE' },
    stat2: { val: '98%', label: 'CLIENT RETENTION' },
    partners: ['Meta Business Partner', 'Google Partner'],
    satisfied: { pct: 98, count: '300+' },
    workflow: ['Content Plan', 'Publish & Engage', 'Report & Refine'],
    liveCount: '40 Brands',
    bg: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efbc07?auto=format&fit=crop&w=900&q=80',
  },
];

/* ─── METRICS / PROVEN RESULTS ────────────────────── */
const METRICS = [
  { val: '340%', label: 'Avg. Traffic Growth', desc: 'Average organic traffic increase across client campaigns in 6 months', icon: '📈' },
  { val: '4.8×', label: 'Average ROAS', desc: 'Return on ad spend achieved for Google & Meta Ads managed accounts', icon: '💰' },
  { val: '68%', label: 'Organic Visibility Boost', desc: 'Improvement in search visibility for clients in competitive industries', icon: '🔍' },
  { val: '42%', label: 'Cost Per Lead Reduction', desc: 'Average reduction in CPL after campaign optimisation & A/B testing', icon: '⚡' },
  { val: '500+', label: 'Projects Delivered', desc: 'Successful campaigns and websites delivered globally since 2014', icon: '🏆' },
  { val: '98%', label: 'Client Retention Rate', desc: 'Of our clients renew — proof that results speak louder than promises', icon: '🤝' },
];

/* ─── WHY CHOOSE US ───────────────────────────────── */
const WHY = [
  {
    icon: '🎯',
    title: 'Strategy-First Execution',
    desc: 'Every campaign begins with deep market research and a custom game plan — no cookie-cutter templates. We diagnose before we prescribe so your budget works harder from day one.',
  },
  {
    icon: '📋',
    title: 'Full Transparency & Reporting',
    desc: 'Real-time dashboards and monthly reports with clear KPIs. You always know exactly where your money goes and what results it delivers. No jargon, no fluff.',
  },
  {
    icon: '📊',
    title: 'Performance-Focused Delivery',
    desc: 'We tie our success to your success. Every decision is driven by data — CTR, ROAS, CAC, LTV. We continuously optimise until we hit and exceed your growth targets.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered + Human Expertise',
    desc: 'We combine advanced AI tools for research, automation, and predictive analytics with the creativity and strategic thinking of senior marketing experts. The best of both worlds.',
  },
];

/* ─── INDUSTRIES ──────────────────────────────────── */
const INDUSTRIES = [
  { icon: '🏥', label: 'Home Care & Healthcare' },
  { icon: '🏠', label: 'Real Estate' },
  { icon: '🛒', label: 'E-commerce' },
  { icon: '💊', label: 'Pharmacy & Wellness' },
  { icon: '💻', label: 'SaaS & Technology' },
  { icon: '⚖️', label: 'Professional Services' },
  { icon: '🎓', label: 'Education' },
  { icon: '🏦', label: 'Finance & Insurance' },
  { icon: '🏨', label: 'Hospitality' },
  { icon: '🔧', label: 'Franchises' },
  { icon: '🌍', label: 'Non-Profit' },
  { icon: '🚗', label: 'Automotive' },
];

/* ─── CASE STUDIES ────────────────────────────────── */
const CASES = [
  {
    tag: 'Senior Home Care',
    client: 'RAH Fresno',
    logo: 'https://kleza.io/wp-content/uploads/2023/05/RAH.png',
    headline: '3× Lead Volume in 90 Days',
    results: [
      { metric: '3×', label: 'Lead Volume' },
      { metric: '-38%', label: 'Cost Per Lead' },
      { metric: '4.2×', label: 'Google Ads ROAS' },
    ],
    desc: 'RAH Fresno, a senior home care franchise, needed more caregiver and client leads. We rebuilt their Google Ads strategy, optimised landing pages for local search, and implemented monthly reporting dashboards.',
    img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    color: '#6C47FF',
  },
  {
    tag: 'Pharmacy',
    client: 'Stadium Pharmacy',
    logo: 'https://kleza.io/wp-content/uploads/2023/05/Stadium.png',
    headline: '280% Surge in Online Orders',
    results: [
      { metric: '280%', label: 'Online Orders' },
      { metric: '5.1×', label: 'Ad ROAS' },
      { metric: '+190%', label: 'Organic Traffic' },
    ],
    desc: 'After launching a new e-commerce experience and pairing it with targeted Google Shopping and Meta Ads, Stadium Pharmacy saw record-breaking online order volume within just three months.',
    img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    color: '#22C55E',
  },
  {
    tag: 'Healthcare Staffing',
    client: 'Assured Home Nursing',
    logo: 'https://kleza.io/wp-content/uploads/2023/05/Assured.png',
    headline: 'Brand Overhaul + 3× Enquiries',
    results: [
      { metric: '3×', label: 'Patient Enquiries' },
      { metric: '+220%', label: 'Social Followers' },
      { metric: '4.9★', label: 'Google Rating' },
    ],
    desc: 'Complete digital transformation — new website, reputation management, social media growth, and local SEO — positioned Assured as the leading home nursing brand in their Michigan service area.',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    color: '#FF3D71',
  },
  {
    tag: 'IT Staffing',
    client: 'Ankrotech',
    logo: 'https://kleza.io/wp-content/uploads/2023/05/Ankrotech.png',
    headline: '$1.2M Sales Pipeline in 6 Months',
    results: [
      { metric: '$1.2M', label: 'Qualified Pipeline' },
      { metric: '+60%', label: 'Qualified Leads' },
      { metric: '-45%', label: 'Bounce Rate' },
    ],
    desc: 'An integrated B2B lead generation campaign — combining LinkedIn Ads, SEO content, and a redesigned website — generated a $1.2M qualified sales pipeline for Ankrotech within six months.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    color: '#F59E0B',
  },
];

/* ─── TESTIMONIALS ────────────────────────────────── */
const TESTI = [
  {
    name: 'Josiana Prantera',
    role: 'Director — Assured Home Nursing Services, MI, USA',
    init: 'J',
    stars: 5,
    text: 'Kleza Solutions has helped us transition into the 21st Century. They improved our website, gained us many positive client reviews, and boosted our social media presence. Because of their digital marketing, Assured Home Nursing Services has been able to hire excellent caregivers and grow our number of clients significantly.',
    company: 'Assured Home Nursing',
  },
  {
    name: 'Paul Hess',
    role: 'Owner — Stadium Pharmacy, Independence, MO, USA',
    init: 'P',
    stars: 5,
    text: 'We are pleased with the services, professionalism, and talent provided by Kleza. From designing our website to digital marketing campaigns, they have been fantastic. They met our timelines and exceeded all our expectations. We strongly recommend them to anyone looking for an engaged marketing partner!',
    company: 'Stadium Pharmacy',
  },
  {
    name: 'Xong Her',
    role: 'Director of Human Resources — RAH Fresno',
    init: 'X',
    stars: 5,
    text: 'Thank you to the team of Kleza for wonderfully managing our social media platforms and also running Google Ads. I have to say, Kleza understood our needs perfectly and they are the ones who made a huge difference, particularly generating a lot of leads using the Google Ad campaigns. We are much satisfied with their work.',
    company: 'RAH Fresno',
  },
  {
    name: 'Vyas Raj',
    role: 'Founder — Incredibletots',
    init: 'V',
    stars: 5,
    text: 'We are very fortunate to get our work done by Kleza team. They did an awesome job. The quality of work was outstanding, quick turnaround time and they understand requirements very well. I am very happy with the service what we got. Thank you Team!',
    company: 'Incredibletots',
  },
  {
    name: 'Megha',
    role: 'Founder — Jiomedfamilycare',
    init: 'M',
    stars: 5,
    text: 'We had an outstanding experience with this website company! Their guidance in creating our first business website was invaluable. Not only were they prompt and efficient, but their support went above and beyond – they addressed glitches, even during holiday hours. Highly recommend their services.',
    company: 'Jiomedfamilycare',
  },
  {
    name: 'Shravan Kumar',
    role: 'CEO — Tech Total',
    init: 'S',
    stars: 5,
    text: 'My sincere appreciation for the remarkable website Kleza has developed. Your team was very proactive from initiation to the final delivery of the TechTotal-website. I would like to extend our gratitude for designing logo, and optimizing our website to a new standard look through effective Web design techniques.',
    company: 'TechTotal',
  },
];

/* ─── FAQs ────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How does your pricing work?',
    a: 'We offer flexible, retainer-based pricing tailored to your business goals and budget. After a free strategy call, we provide a transparent proposal with clear deliverables — no hidden fees, no long-term lock-in on starter packages. Monthly retainers typically range from $500 to $5,000+ depending on the scope of services.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Paid advertising (Google Ads, Meta Ads) can show measurable results within the first 2–4 weeks. SEO and organic growth typically show significant traction within 3–6 months, with compounding results beyond that. We set realistic milestones upfront and keep you updated with weekly/monthly reports.',
  },
  {
    q: 'Which countries do you serve?',
    a: 'We primarily serve clients in the United States and Canada — including senior-care franchises and healthcare brands — and have an established global presence in Dubai (UAE), the United Kingdom, Singapore, India, Australia, and New Zealand. Our team operates across time zones to provide responsive support wherever you are.',
  },
  {
    q: 'What does your reporting and performance tracking look like?',
    a: 'Every client receives access to a live custom dashboard (Google Looker Studio / SEMrush) showing real-time campaign data. We also deliver detailed monthly performance reports covering traffic, leads, ROAS, keyword rankings, and actionable insights — presented in a 30-minute strategy call to plan the month ahead.',
  },
];

/* ─── App ─────────────────────────────────────────── */
export default function App() {

  const [shadow, setShadow] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [ti, setTi] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', msg: '' });
  const videoRef = useRef(null);

  useEffect(() => {
    const h = () => setShadow(window.scrollY > 8);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTi(x => (x + 1) % TESTI.length), 5500);
    return () => clearInterval(id);
  }, []);

  const close = () => setMOpen(false);
  const ch = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); setDone(true); };
  const prevT = () => setTi(x => (x - 1 + TESTI.length) % TESTI.length);
  const nextT = () => setTi(x => (x + 1) % TESTI.length);
  const toggleFaq = i => setFaqOpen(faqOpen === i ? null : i);

  const all = [...CLIENTS, ...CLIENTS];
  const cur = TESTI[ti];

  return <>

    {/* ═══ NAV ═════════════════════════════════════════ */}
    <nav className={`nav${shadow ? ' shadow' : ''}`}>
      <div className="W nav-r">
        <a href="#home"><img src={LOGO} alt="Kleza Solutions" className="n-logo" /></a>
        <a href="#contact" className="n-btn">Get Free Quote →</a>
      </div>
    </nav>

    {/* ═══ HERO ════════════════════════════════════════ */}
    <section className="hero" id="home">
      <div className="hero-left W">
        <div className="h-kicker"><span className="h-dot" />Trusted Since 2014 · 500+ Clients Globally</div>
        <h1 className="h-title">
          ROI-Driven Digital<br />
          Marketing.{' '}
          <span className="t-typed">AI-Powered Growth</span>
        </h1>
        <p className="h-sub">
          Helping businesses grow with <strong>measurable results</strong>. Trusted by U.S. brands &amp; senior-care franchises — now supporting clients in <strong>Canada, Dubai, and globally</strong> with SEO, Google Ads, Website Development &amp; Social Media Marketing.
        </p>
        <div className="chips">
          <span className="chip">🇺🇸 USA</span>
          <span className="chip">🇨🇦 Canada</span>
          <span className="chip">🇦🇪 Dubai</span>
          <span className="chip">🌏 Global</span>
          <span className="chip">⚡ 24hr Strategy</span>
        </div>
        <div className="h-btns">
          <a href="#contact" className="btn-s btn-solid">Get Free Strategy →</a>
          <a href="#cases" className="btn-s btn-gh">View Our Work</a>
        </div>
        <div className="h-trust">
          <div className="avs">
            {['J', 'M', 'X', 'P'].map((l, k) => <div key={k} className="av">{l}</div>)}
          </div>
          <div className="t-copy">
            <strong>500+ Happy Clients</strong>
            <span style={{ color: '#F59E0B' }}>★★★★★</span>&nbsp;4.9 / 5
          </div>
        </div>
      </div>

      <div className="hero-right" id="contact">
        <div className="f-card">
          <div className="f-badge">🎁 LIMITED TIME — 50% OFF FIRST PROJECT</div>
          {done ? (
            <div className="f-ok">
              <div className="ok">✅</div>
              <h3>You're In!</h3>
              <p>Our expert will reach out within 24 hours. Let's build something great.</p>
            </div>
          ) : (
            <>
              <h3>Free Consultation &<br /><span>Get 50% Discount</span></h3>
              <p className="sub">Tell us about your project — strategy ready in 24 hrs.</p>
              <form onSubmit={submit} noValidate>
                <div className="row2">
                  <div className="fg"><input type="text" name="name" placeholder="Full Name" className="fi" value={form.name} onChange={ch} required /></div>
                  <div className="fg"><input type="email" name="email" placeholder="Work Email" className="fi" value={form.email} onChange={ch} required /></div>
                </div>
                <div className="fg"><input type="tel" name="phone" placeholder="Phone Number" className="fi" value={form.phone} onChange={ch} /></div>
                <div className="fg">
                  <select name="service" className="fi" value={form.service} onChange={ch}>
                    <option value="">Select a Service</option>
                    {SERVICES.map(s => <option key={s.label}>{s.label}</option>)}
                  </select>
                </div>
                <div className="fg"><textarea name="msg" rows={3} placeholder="Brief project description..." className="fi" value={form.msg} onChange={ch} /></div>
                <button type="submit" className="sub-btn">LET'S DISCUSS YOUR PROJECT →</button>
              </form>
              <div className="f-note">🔒 No spam · No commitment · 100% Free</div>
            </>
          )}
        </div>
      </div>
    </section>

    {/* ═══ CLIENTS TICKER ══════════════════════════════ */}
    <section className="clients-bar">
      <div className="c-lbl">Trusted by Brands Across the Globe</div>
      <div className="logo-ticker">
        {all.map((c, k) => (
          <div key={k} className="lt-item">
            <img src={c.s} alt={c.n} className="lt-logo" />
          </div>
        ))}
      </div>
    </section>

    {/* ═══ PROVEN RESULTS (single row) ═════════════════ */}
    <section className="results" id="results">
      <div className="results-bg" />
      <div className="W">
        <div className="metrics-row">
          {METRICS.map((m, k) => (
            <div key={k} className="metric-card">
              <div className="mc-icon">{m.icon}</div>
              <div className="mc-val">{m.val}</div>
              <div className="mc-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ WHY CHOOSE US ═══════════════════════════════ */}
    <section className="why" id="about">
      <div className="why-blob-l" /><div className="why-blob-r" />
      <div className="W">
        <div className="why-grid">
          <div className="why-left">
            <span className="eyebrow">🎯 Our Approach</span>
            <h2>Why Businesses Choose<br /><em>Kleza Solutions</em></h2>
            <p>
              We're not just another digital agency. We're a results-obsessed team combining senior marketing strategists, certified ad specialists, and AI-powered tools — with a singular focus on your growth.
            </p>
            <div className="why-stats">
              <div className="wstat"><strong>10+</strong><span>Years in Digital Marketing</span></div>
              <div className="wstat"><strong>12</strong><span>Countries Served</span></div>
              <div className="wstat"><strong>4.9★</strong><span>Average Client Rating</span></div>
            </div>
            <a href="#contact" className="btn-s btn-solid" style={{ width: 'fit-content', marginTop: '1.5rem' }}>Start Your Growth Journey →</a>
          </div>
          <div className="why-right">
            {WHY.map((w, k) => (
              <div key={k} className="why-card">
                <div className="wc-icon">{w.icon}</div>
                <div className="wc-body">
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ═══ SERVICES ════════════════════════════════════ */}
    <section className="services" id="services">
      <div className="W">
        <div className="sec-head center">
          <span className="eyebrow">🚀 Our Services</span>
          <h2>Full-Stack Digital Marketing<br /><em>Powered by AI & Expertise</em></h2>
          <p>Five core disciplines. One unified strategy. Unstoppable growth.</p>
        </div>
        <div className="svc-numbered-list">
          {SERVICES.map((svc, idx) => (
            <div
              key={idx}
              className={`svc-numbered-item${idx % 2 === 1 ? ' reverse' : ''}`}
              style={{ '--svc-color': svc.color }}
            >
              {/* ── Left: Gradient visual panel ── */}
              <div className="svc-visual-panel">
                <div className="svc-vp-bg" style={{ background: `linear-gradient(135deg, ${svc.color}cc 0%, ${svc.color}88 40%, #0F0D1E 100%)` }} />

                {/* Top row: icon + subtitle pill */}
                <div className="svc-vp-top">
                  <div className="svc-vp-icon">{svc.icon}</div>
                  <div className="svc-vp-subtitle">{svc.subtitle}</div>
                </div>

                {/* Satisfaction badge */}
                <div className="svc-satisfied">
                  <div className="svc-sat-stars">{'★'.repeat(5)}</div>
                  <div className="svc-sat-text">
                    <span className="svc-sat-pct">{svc.satisfied.pct}%</span> Client Satisfaction
                    <span className="svc-sat-count">({svc.satisfied.count} clients)</span>
                  </div>
                </div>

                {/* Centre: stat cards stacked */}
                <div className="svc-vp-center">
                  <div className="svc-stat-card svc-stat-top">
                    <span className="ssc-label">{svc.stat1.label}</span>
                    <span className="ssc-val" style={{ color: svc.color }}>{svc.stat1.val}</span>
                  </div>
                  <div className="svc-stat-card svc-stat-bot">
                    <span className="ssc-label">{svc.stat2.label}</span>
                    <span className="ssc-val" style={{ color: svc.color }}>{svc.stat2.val}</span>
                  </div>
                </div>

                {/* Live pulsing badge */}
                <div className="svc-live-badge">
                  <span className="svc-live-dot" />
                  {svc.liveCount} Campaigns
                </div>

                {/* Bottom: partner trust badges */}
                <div className="svc-vp-partners">
                  {svc.partners.map((p, pi) => (
                    <div key={pi} className="svc-partner-pill">
                      <span className="svc-partner-icon">{pi === 0 ? '∞' : p.includes('Google') || p.includes('SEMrush') ? 'G' : p.includes('LinkedIn') ? 'in' : 'G'}</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: Content panel ── */}
              <div className="svc-ni-content">
                <div className="svc-ni-num-label">{svc.num}</div>
                <h3 className="svc-ni-title">{svc.label}</h3>

                {/* Workflow 3-step strip */}
                <div className="svc-workflow">
                  {svc.workflow.map((step, wi) => (
                    <div key={wi} className="svc-wf-step">
                      <div className="svc-wf-dot" style={{ background: svc.color }}>{wi + 1}</div>
                      <span className="svc-wf-label">{step}</span>
                      {wi < svc.workflow.length - 1 && <div className="svc-wf-line" style={{ background: `${svc.color}40` }} />}
                    </div>
                  ))}
                </div>

                <p className="svc-ni-desc">{svc.desc}</p>
                <ul className="svc-ni-features">
                  {svc.features.map((f, i) => (
                    <li key={i}>
                      <span className="svc-ni-check" style={{ background: svc.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="svc-ni-cta" style={{ background: svc.color }}>Get Started →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ INDUSTRY EXPERTISE ══════════════════════════ */}
    <section className="industries" id="industries">
      <div className="W">
        <div className="sec-head center">
          <span className="eyebrow">🏭 Industry Expertise</span>
          <h2>Verticals We Serve<br /><em>With Proven Results</em></h2>
          <p>Deep domain knowledge across a range of industries means we speak your language — and know what moves the needle in your market.</p>
        </div>
        <div className="ind-grid">
          {INDUSTRIES.map((ind, k) => (
            <div key={k} className="ind-card">
              <span className="ind-icon">{ind.icon}</span>
              <span className="ind-label">{ind.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ CASE STUDIES ════════════════════════════════ */}
    <section className="cases" id="cases">
      <div className="W">
        <div className="cases-hd">
          <div>
            <span className="eyebrow">📂 Case Studies</span>
            <h2>Results That Speak<br /><em>Louder Than Promises</em></h2>
          </div>
          <a href="https://kleza.io" target="_blank" rel="noreferrer" className="view-all-link">View All Case Studies →</a>
        </div>
        <div className="cases-grid">
          {CASES.map((c, k) => (
            <div key={k} className="case-card" style={{ '--case-color': c.color }}>
              <div className="case-img-wrap">
                <img src={c.img} alt={c.client} />
                <div className="case-img-overlay" style={{ background: `linear-gradient(135deg, ${c.color}55 0%, rgba(0,0,0,.55) 100%)` }} />
                <div className="case-logo-wrap">
                  <img src={c.logo} alt={c.client} className="case-logo" />
                </div>
                <span className="case-tag" style={{ background: c.color }}>{c.tag}</span>
              </div>
              <div className="case-body">
                <h3>{c.headline}</h3>
                <div className="case-metrics">
                  {c.results.map((r, i) => (
                    <div key={i} className="cm-item">
                      <span className="cm-val" style={{ color: c.color }}>{r.metric}</span>
                      <span className="cm-lbl">{r.label}</span>
                    </div>
                  ))}
                </div>
                <p>{c.desc}</p>
                <a href="#contact" className="case-cta">Read Full Case Study →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ TESTIMONIALS ════════════════════════════════ */}
    <section className="testimonials" id="testimonials">
      <div className="testi-bg-blobs" />
      <div className="W">
        <div className="sec-head center">
          <span className="eyebrow">★ Client Stories</span>
          <h2>What Our Clients<br /><em>Say About Us</em></h2>
          <p>Real reviews from businesses we've helped grow across the United States, Canada, Dubai, and beyond.</p>
        </div>
        <div className="testi-featured">
          <div className="testi-featured-quote">&ldquo;</div>
          <p className="testi-featured-text">{cur.text}</p>
          <div className="testi-featured-author">
            <div className="testi-av">{cur.init}</div>
            <div>
              <div className="testi-name">{cur.name}</div>
              <div className="testi-role">{cur.role}</div>
            </div>
            <div className="testi-stars">{'★'.repeat(cur.stars)}</div>
          </div>
          <div className="testi-nav">
            <button className="testi-arr" onClick={prevT} aria-label="Prev">←</button>
            <div className="testi-dots">
              {TESTI.map((_, k) => (
                <button key={k} className={`testi-dot${k === ti ? ' on' : ''}`} onClick={() => setTi(k)} aria-label={`Testimonial ${k + 1}`} />
              ))}
            </div>
            <button className="testi-arr" onClick={nextT} aria-label="Next">→</button>
          </div>
        </div>
        <div className="testi-mini-grid">
          {TESTI.filter((_, k) => k !== ti).slice(0, 3).map((t, k) => (
            <div key={k} className="testi-mini-card" onClick={() => setTi(TESTI.indexOf(t))}>
              <div className="testi-mini-stars">{'★'.repeat(t.stars)}</div>
              <p className="testi-mini-text">"{t.text.slice(0, 120)}…"</p>
              <div className="testi-mini-author">
                <div className="testi-mini-av">{t.init}</div>
                <div>
                  <div className="testi-mini-name">{t.name}</div>
                  <div className="testi-mini-role">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ FAQs ════════════════════════════════════════ */}
    <section className="faq" id="faq">
      <div className="W">
        <div className="faq-grid">
          <div className="faq-left">
            <span className="eyebrow">❓ FAQs</span>
            <h2>Your Questions,<br /><em>Answered</em></h2>
            <p>Everything you need to know before getting started. Still have questions? <a href="#contact">Chat with our team →</a></p>
            <div className="faq-cta-card">
              <div className="fcc-icon">💬</div>
              <h4>Not Sure Where to Start?</h4>
              <p>Book a free 30-min strategy call — we'll map out a custom growth plan for your business, at no cost.</p>
              <a href="#contact" className="btn-s btn-solid" style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}>Book Free Call →</a>
            </div>
          </div>
          <div className="faq-right">
            {FAQS.map((f, k) => (
              <div key={k} className={`faq-item${faqOpen === k ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => toggleFaq(k)}>
                  <span>{f.q}</span>
                  <span className="faq-ico">{faqOpen === k ? '−' : '+'}</span>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ═══ CTA STRIPE ══════════════════════════════════ */}
    <section className="cta">
      <div className="cta-glow-l" /><div className="cta-glow-r" />
      <div className="W cta-in">
        <div className="cta-badge">🚀 Limited Spots Available</div>
        <h2>Ready to make your brand<br /><em>impossible to ignore?</em></h2>
        <p>Get a free strategy session — our expert will map out exactly how to grow your business online within 24 hours.</p>
        <div className="cta-btns">
          <a href="#contact" className="cta-btn-primary">Get Free Strategy Session →</a>
          <a href="tel:9138002728" className="cta-btn-outline">📞 Call Us Now</a>
        </div>
        <div className="cta-trust">
          <span>✓ No commitment</span>
          <span>✓ Strategy in 24hrs</span>
          <span>✓ 100% Free</span>
        </div>
      </div>
    </section>

    {/* ═══ FOOTER ══════════════════════════════════════ */}
    <footer className="footer">
      <div className="W footer-inner">
        {/* Left — Logo + tagline */}
        <div className="f-brand">
          <img src={LOGO} alt="Kleza Solutions" />
          <p>AI-Powered Digital Marketing · Trusted Since 2014</p>
        </div>

        {/* Centre — Address */}
        <div className="f-address">
          <div className="f-addr-item">📍 9331 W 87th St, Overland Park, KS 66212, United States</div>
          <div className="f-addr-item">📞 <a href="tel:+19138002728">+1 913-800-2728</a> &nbsp;·&nbsp; <a href="tel:+917396146227">+91 739-614-6227</a></div>
          <div className="f-addr-item">✉️ <a href="mailto:info@kleza.io">info@kleza.io</a></div>
        </div>

        {/* Right — Social */}
        <div className="f-right">
          <div className="f-soc">
            <a href="https://www.facebook.com/Klezasolution" target="_blank" rel="noreferrer" className="sc" aria-label="Facebook">f</a>
            <a href="https://twitter.com/klezasolutions" target="_blank" rel="noreferrer" className="sc" aria-label="X / Twitter">𝕏</a>
            <a href="https://www.linkedin.com/company/kleza-solutions-pvt-ltd/" target="_blank" rel="noreferrer" className="sc" aria-label="LinkedIn">in</a>
            <a href="https://www.instagram.com/klezasolutions/" target="_blank" rel="noreferrer" className="sc" aria-label="Instagram">ig</a>
          </div>
          <p className="f-copy">©2025 Kleza Solutions Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </>;
}
