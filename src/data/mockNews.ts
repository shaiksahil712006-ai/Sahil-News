import { NewsArticle } from '../types/news';

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'art-1',
    title: 'India Unveils Next-Gen Space Station Blueprint and Deep Orbit Module',
    description: 'ISRO and national aerospace labs reveal the finalized architecture for the Bharatiya Antariksha Station, scheduling early module deployments.',
    content: `The Indian Space Research Organisation (ISRO) has formally unveiled the finalized orbital module schematics and docking architecture for the Bharatiya Antariksha Station (BAS). Under the phased roadmap, the inaugural 10-tonne module will be deployed into low-Earth orbit aboard the next-generation launch vehicle (NGLV).

Senior officials emphasized that the station will serve as a premier microgravity research platform for biotechnology, materials science, and deep-space life support systems. The initiative integrates indigenous avionics, automated life-support recycling, and advanced docking mechanisms developed in collaboration with Indian academic institutes and aerospace consortiums.

Scientists confirmed that the space station will also facilitate crucial docking simulations ahead of planned lunar surface missions. International research partners have already initiated discussions on joint scientific payloads.`,
    url: 'https://isro.gov.in',
    urlToImage: '/src/assets/images/india_space_tech_1793885209475.jpg',
    publishedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
    source: { id: 'the-hindu', name: 'The Hindu' },
    author: 'Aarav Deshmukh',
    category: 'India',
    readTime: '4 min read',
    isBreaking: true,
    isTrending: true,
    viewsCount: 14200,
  },
  {
    id: 'art-2',
    title: 'Global Newsroom Leaders Convene for AI Transparency and Verification Accord',
    description: 'International journalistic bodies agree upon a landmark ethical protocol for algorithmic source verification and watermarked provenance.',
    content: `Over eighty chief editors and investigative journalists from five continents signed a historic digital compact today, establishing universal standards for synthetic media verification and provenance in international newsrooms.

The accord mandates transparent labeling for algorithmic translations, cryptographic signatures on original photojournalism, and community-verified fact-checking networks. Representatives from Reuters, AFP, BBC, and prominent South Asian media organizations highlighted the urgency of maintaining public trust amidst deepfake saturation.

"Our commitment remains anchored to empirical truth, verifiable documentation, and human journalistic responsibility," said conference director Elena Rossi during the opening plenary in Geneva.`,
    url: 'https://reuters.com',
    urlToImage: '/src/assets/images/hero_breaking_news_1793885196210.jpg',
    publishedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(), // 55 mins ago
    source: { id: 'reuters', name: 'Reuters Global' },
    author: 'Elena Rossi & Shaik Sahil',
    category: 'World',
    readTime: '3 min read',
    isBreaking: true,
    isTrending: true,
    viewsCount: 9800,
  },
  {
    id: 'art-3',
    title: 'Next-Generation Silicon Architecture Slashes Neural Model Energy Use by 60%',
    description: 'Semiconductor researchers achieve breakthrough efficiency using photonic interconnects and neuromorphic memory stacks.',
    content: `A consortium of semiconductor labs has demonstrated a working prototype of a 2-nanometer photonic neural processor capable of executing multi-billion-parameter language models with a 60% reduction in thermal and electrical dissipation.

Unlike conventional copper interconnects, the new architecture routes data using on-chip laser waveguides, eliminating the electrical latency and resistive heat bottlenecks that have hampered high-performance datacenter clusters.

Early commercial test runs in Bangalore and Santa Clara revealed stable inference throughput at fractionally lower operating costs, opening the door for edge-computing smart devices that run real-time reasoning models locally without cloud tethering.`,
    url: 'https://techcrunch.com',
    urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hrs ago
    source: { id: 'techcrunch', name: 'TechCrunch' },
    author: 'Priya Narang',
    category: 'Technology',
    readTime: '5 min read',
    isTrending: true,
    viewsCount: 22100,
  },
  {
    id: 'art-4',
    title: 'Historic Cricket Thriller: Last-Ball Boundary Seals T20 Championship Victory',
    description: 'A breathtaking 48-run partnership in the death overs sends the capacity crowd into a frenzy as India clinches the series in Mumbai.',
    content: `In one of the most exhilarating finishes in modern cricket history, a towering six over deep mid-wicket off the final delivery propelled India to a memorable three-wicket victory at the Wankhede Stadium.

Chasing a formidable target of 214, the middle order weathered early swing bowling before the vice-captain unleashed a flurry of lofted drives, striking 74 off just 32 balls. With eight runs needed from the final two balls under intense pressure, a crisp pull shot and a majestic lofted cover drive sealed the title.

The stadium reverberated with triumphant chants as teammates rushed the turf, concluding an unforgettable bilateral tournament that showcased extraordinary athletic resilience.`,
    url: 'https://espncricinfo.com',
    urlToImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hrs ago
    source: { id: 'espncricinfo', name: 'ESPN Cricinfo' },
    author: 'Karan Mehra',
    category: 'Sports',
    readTime: '3 min read',
    isTrending: true,
    viewsCount: 45000,
  },
  {
    id: 'art-5',
    title: 'Reserve Bank Expands Cross-Border UPI Corridor Across Six New Economies',
    description: 'Instant bilateral rupee settlements now enabled for trade and remittances across Southeast Asia and the Middle East.',
    content: `The Reserve Bank of India (RBI) and partnering central banks have activated direct cross-border retail payments using the Unified Payments Interface (UPI) network across six additional member countries.

Under the new operational framework, tourists, overseas students, and expatriate workers can transfer funds instantly using QR-code scanning or bank proxy IDs at near-zero currency conversion markup compared to traditional wire channels.

Financial analysts noted that monthly diaspora remittance costs will decline by up to 75%, providing a direct stimulus to international MSME trade corridors and reinforcing the Indian Rupee as an efficient regional settlement currency.`,
    url: 'https://livemint.com',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hrs ago
    source: { id: 'mint', name: 'Mint Financial' },
    author: 'Rohan Singhal',
    category: 'Business',
    readTime: '4 min read',
    viewsCount: 16500,
  },
  {
    id: 'art-6',
    title: 'Indian Cinema Landmark: Folk-Fantasy Epic Breaks Global Box Office Records',
    description: 'Directed with sweeping orchestral scores and visual authenticity, the film captivates international critics and theaters worldwide.',
    content: `The newly released cinematic masterpiece blending rural folklore with grand visual scale has collected over ₹450 crore worldwide in its inaugural week, securing top ten placement across North American and European box office charts.

Critics praised the director's seamless marriage of practical miniature effects and traditional musical instruments with state-of-the-art computer generation. The story, exploring ecological balance and ancestral legends, resonated across multiple dubbed languages.

Film historians point to this milestone as clear evidence of Indian storytelling transcending regional boundaries to capture prime global audiences on theatrical and streaming screens alike.`,
    url: 'https://variety.com',
    urlToImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hrs ago
    source: { id: 'variety', name: 'Variety' },
    author: 'Simran Khurana',
    category: 'Entertainment',
    readTime: '3 min read',
    viewsCount: 18900,
  },
  {
    id: 'art-7',
    title: 'National Education Council Rolls Out Multilingual STEM Curricula in 22 Languages',
    description: 'Interactive AI-powered learning modules empower rural schools and university students with mother-tongue scientific textbooks.',
    content: `In a landmark pedagogical milestone under the National Education Policy, the Ministry of Education has formally launched digitized interactive STEM curricula translated and validated in 22 scheduled Indian languages.

The initiative ensures that students from secondary schools through engineering colleges can grasp advanced calculus, semiconductor physics, and organic chemistry without linguistic barriers. The platform features tactile simulations, interactive diagrams, and regional audio glossaries developed by premier IIT and NIT faculty.

Initial pilot rollouts across 12,000 rural government schools indicated a 34% increase in student engagement and concept retention in STEM assessments.`,
    url: 'https://thehindu.com/education',
    urlToImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hrs ago
    source: { id: 'the-hindu', name: 'The Hindu Education' },
    author: 'Dr. Neha Verma',
    category: 'Education',
    readTime: '4 min read',
    viewsCount: 11400,
  },
  {
    id: 'art-8',
    title: 'High-Speed Rail Corridor Reaches 70% Completion: Trial Runs Slated for Early Next Year',
    description: 'Advanced undersea tunnels and viaduct girder installations mark key engineering milestones on the Mumbai-Ahmedabad bullet train project.',
    content: `The National High Speed Rail Corporation (NHSRCL) announced that over 70% of structural civil works on the Mumbai-Ahmedabad bullet train route have been successfully completed.

Engineers have finished the breakthrough of key undersea tunnel segments along Thane Creek, while automated girder launchers continue erecting elevated viaduct tracks at an unprecedented pace of 15 kilometers per month.

Equipped with Shinkansen E5 technology adapted for tropical conditions, the trains will operate at speeds up to 320 km/h, slashing journey duration between the two financial hubs from six hours to under two hours.`,
    url: 'https://timesofindia.indiatimes.com',
    urlToImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // 7 hrs ago
    source: { id: 'times-of-india', name: 'Times of India' },
    author: 'Vikram Joshi',
    category: 'India',
    readTime: '4 min read',
    viewsCount: 13200,
  },
  {
    id: 'art-9',
    title: 'Renewable Power Record: Solar and Wind Generate 45% of Nation’s Peak Electricity',
    description: 'Massive hybrid wind-solar parks in Gujarat and Rajasthan set a clean energy benchmark during peak industrial hours.',
    content: `Grid operators recorded an all-time high green energy contribution this afternoon, with solar radiation and coastal wind feeding over 45% of peak electrical demand without thermal plant strain.

The integration of ultra-capacity grid-scale battery storage units cushioned sudden cloud cover fluctuations, demonstrating the viability of zero-emission industrial power delivery.

The national green grid coordinator noted that renewable tariffs continue to stabilize below conventional coal energy, accelerating the planned phase-out of legacy carbon infrastructure.`,
    url: 'https://reuters.com/business/energy',
    urlToImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(), // 8 hrs ago
    source: { id: 'reuters', name: 'Reuters Energy' },
    author: 'Sunita Patel',
    category: 'Business',
    readTime: '3 min read',
    viewsCount: 8700,
  },
  {
    id: 'art-10',
    title: 'Global Quantum Encryption Satellite Establishes Secure Intercontinental Key Exchange',
    description: 'Physicists celebrate the first unhackable quantum communication channel between research observatories 8,000 kilometers apart.',
    content: `An international team of quantum physicists has successfully completed an entanglement-based quantum key distribution (QKD) transmission via low-Earth orbit satellites, bridging scientific stations in Europe and Asia.

The system uses entangled photons to generate encryption keys that are fundamentally immune to eavesdropping under the laws of quantum mechanics. Any intercept attempt instantly collapses the quantum state, alerting security controllers immediately.

Commercial banks, defense communications, and critical infrastructure networks are already evaluating pilot integration to shield data against future quantum decryption breakthroughs.`,
    url: 'https://theverge.com',
    urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 540).toISOString(), // 9 hrs ago
    source: { id: 'the-verge', name: 'The Verge' },
    author: 'Marcus Vance',
    category: 'Technology',
    readTime: '5 min read',
    viewsCount: 15300,
  },
  {
    id: 'art-11',
    title: 'University Grants Commission Approves Dual Degree Programs with Top 50 Global Universities',
    description: 'Indian university undergraduates can now earn dual credentials with partner institutions across the UK, USA, and Australia.',
    content: `Under an ambitious internationalization directive announced today, students enrolled in accredited Indian universities will be eligible for structured dual-degree programs with the world's leading academic institutions.

The curriculum allows students to complete their initial two academic years on domestic campuses before finishing senior coursework and industrial capstone projects abroad, with credit transfers fully recognized by both awarding universities.

Education minister highlighted that credit equivalence and hybrid scholarship funds will open premier global research laboratories to aspiring Indian students from diverse socioeconomic backgrounds.`,
    url: 'https://indianexpress.com/education',
    urlToImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hrs ago
    source: { id: 'indian-express', name: 'Indian Express' },
    author: 'Anjali Sharma',
    category: 'Education',
    readTime: '4 min read',
    viewsCount: 9400,
  },
  {
    id: 'art-12',
    title: 'Grand Slam Final Preview: Young Challenger Takes on World Number One on Clay',
    description: 'Tactical analysis, court condition breakdown, and head-to-head statistics ahead of the historic Sunday championship clash in Paris.',
    content: `Tennis enthusiasts are gearing up for a mouthwatering men's singles final as the reigning champion meets the 21-year-old sensation whose relentless heavy topspin forehand has dismantled top seeds throughout the fortnight.

Court analysts point to return-of-serve percentages as the defining metric: the challenger has won an astounding 42% of first-serve return points on the slow Parisian red clay.

"Playing on this legendary center court with millions watching is the dream of a lifetime. I am prepared to leave everything on the court," the challenger noted during his pre-match press briefing.`,
    url: 'https://bbc.com/sport',
    urlToImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80',
    publishedAt: new Date(Date.now() - 1000 * 60 * 700).toISOString(),
    source: { id: 'bbc-sport', name: 'BBC Sport' },
    author: 'Liam Henderson',
    category: 'Sports',
    readTime: '3 min read',
    viewsCount: 17800,
  }
];

export const CATEGORIES_CONFIG = [
  {
    name: 'India',
    description: 'National politics, defense, science, and regional governance',
    icon: 'Flag',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    name: 'World',
    description: 'International diplomacy, geopolitics, and global summits',
    icon: 'Globe2',
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Technology',
    description: 'Artificial intelligence, semiconductors, gadgets, and software',
    icon: 'Cpu',
    color: 'from-cyan-500 to-teal-600',
    badgeColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    name: 'Sports',
    description: 'Cricket, Football, Tennis, Olympics, and tournament highlights',
    icon: 'Trophy',
    color: 'from-emerald-500 to-green-600',
    badgeColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    name: 'Business',
    description: 'Markets, RBI interest rates, fintech, crypto, and startups',
    icon: 'TrendingUp',
    color: 'from-violet-500 to-purple-600',
    badgeColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    name: 'Entertainment',
    description: 'Cinema, OTT streaming, film festivals, music, and pop culture',
    icon: 'Film',
    color: 'from-rose-500 to-pink-600',
    badgeColor: 'text-rose-600 dark:text-rose-400',
  },
  {
    name: 'Education',
    description: 'Universities, entrance exams, STEM, scholarships, and NEP',
    icon: 'GraduationCap',
    color: 'from-indigo-500 to-blue-700',
    badgeColor: 'text-indigo-600 dark:text-indigo-400',
  },
] as const;
