/**
 * ============================================================
 * CENTRALIZED EVENT CONFIGURATION
 * ============================================================
 * Update ALL event-specific information here.
 * Components read from this file — no need to edit individual
 * components when event details change.
 * ============================================================
 */

const eventConfig = {
  // ── Event basics ──────────────────────────────────────────
  title: 'International Workshop 2026',
  subtitle: 'Organized by IEEE RAS AND IAS Society',
  institution: 'MITS Gwalior',
  tagline: 'Learn. Innovate. Connect. Build the Future.',
  description:
    'An International Workshop organized by the IEEE Robotics and Automation Society (RAS) and Industry Applications Society (IAS) at Madhav Institute of Technology & Science (MITS), Gwalior.',

  // ── Date & time ───────────────────────────────────────────
  // ISO format for countdown calculation
  eventDate: '2026-12-15',
  eventStartTime: '09:00 AM',
  eventEndTime: '05:00 PM',
  displayDate: 'December 15, 2026',

  // ── Venue ─────────────────────────────────────────────────
  venue: 'MITS (Madhav Institute of Technology & Science), Gwalior',
  venueShort: 'MITS Gwalior',
  venueAddress: 'Gola Ka Mandir, Gwalior, Madhya Pradesh 474005, India',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.123456!2d78.1234!3d26.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMITS+Gwalior!5e0!3m2!1sen!2sin!4v1234567890',
  mapDirectionsUrl: 'https://www.google.com/maps/dir//MITS+Gwalior',

  // ── Registration ──────────────────────────────────────────
  registrationFee: 299,
  currency: '₹',
  registrationOpen: true,
  maxParticipants: 500,

  // ── Organizers ────────────────────────────────────────────
  organizers: [
    {
      name: 'IEEE Robotics and Automation Society (RAS) & Industry Applications Society (IAS)',
      shortName: 'IEEE RAS & IAS',
      logo: '/organizer-logo.jpg',
      color: '#00629B',
    },
  ],

  // ── Highlights ────────────────────────────────────────────
  highlights: [
    {
      icon: '🎓',
      title: 'Expert Sessions',
      description:
        'Learn from leading researchers, academicians, and industry professionals in their respective fields.',
    },
    {
      icon: '🎤',
      title: 'Technical Talks',
      description:
        'Gain insights into cutting-edge developments through in-depth technical presentations.',
    },
    {
      icon: '🛠️',
      title: 'Hands-on Learning',
      description:
        'Participate in practical sessions that bridge the gap between theory and real-world applications.',
    },
    {
      icon: '🚀',
      title: 'Emerging Technologies',
      description:
        'Explore the latest trends in robotics, automation, AI, and industrial applications.',
    },
    {
      icon: '🤝',
      title: 'Networking',
      description:
        'Connect with students, faculty, researchers, and professionals from institutions across the globe.',
    },
    {
      icon: '💬',
      title: 'Interactive Discussions',
      description:
        'Engage in thought-provoking discussions and Q&A sessions with experts and peers.',
    },
    {
      icon: '🏭',
      title: 'Industry Insights',
      description:
        'Understand real-world industry challenges and the role of technology in solving them.',
    },
    {
      icon: '📜',
      title: 'Certificates',
      description:
        'Receive a certificate of participation upon successful completion of the workshop.',
    },
  ],

  // ── Schedule (placeholder — update with confirmed timings) ─
  schedule: [
    { time: '09:00 AM', title: 'Registration & Welcome', type: 'registration', description: 'Check-in, kit distribution, and networking' },
    { time: '10:00 AM', title: 'Inauguration Ceremony', type: 'ceremony', description: 'Opening remarks by dignitaries and organizers' },
    { time: '10:30 AM', title: 'Technical Session I', type: 'session', description: 'In-depth technical presentation' },
    { time: '12:00 PM', title: 'Expert Talk', type: 'talk', description: 'Keynote by an invited expert' },
    { time: '01:00 PM', title: 'Lunch Break', type: 'break', description: 'Networking lunch' },
    { time: '02:00 PM', title: 'Workshop / Hands-on Session', type: 'workshop', description: 'Practical, hands-on learning activity' },
    { time: '04:00 PM', title: 'Interactive Discussion Panel', type: 'interactive', description: 'Q&A and open discussion with speakers' },
    { time: '05:00 PM', title: 'Closing & Certificate Distribution', type: 'closing', description: 'Valedictory ceremony and certificates' },
  ],

  // ── Speakers (placeholder — replace with actual data) ─────
  speakers: [
    {
      name: 'Elon Musk',
      designation: 'CEO',
      organization: 'Tesla, SpaceX',
      expertise: 'Innovation, Robotics, Aerospace',
      bio: 'Elon Musk is an entrepreneur, investor, and business magnate. He is the founder, CEO, and Chief Engineer at SpaceX; angel investor, CEO, and Product Architect of Tesla, Inc.',
      image: '/elon.jpg',
      topic: 'The Future of Autonomous Systems',
    },
    {
      name: 'Sundar Pichai',
      designation: 'CEO',
      organization: 'Alphabet Inc., Google',
      expertise: 'Artificial Intelligence, Software Engineering',
      bio: 'Sundar Pichai is the chief executive officer (CEO) of Alphabet Inc. and its subsidiary Google. He leads Google’s AI-first product strategy and innovation.',
      image: '/sundar.jpg',
      topic: 'AI and Industry Transformation',
    },
    {
      name: 'Steve Jobs',
      designation: 'Co-founder, Former CEO',
      organization: 'Apple Inc.',
      expertise: 'Design, Innovation, Entrepreneurship',
      bio: 'Steve Jobs was a visionary entrepreneur and business magnate. He was the co-founder, chairman, and CEO of Apple, revolutionizing personal computing and mobile devices.',
      image: '/steve.jpg',
      topic: 'Innovation and Design Thinking',
    },
  ],

  // ── Target audience ───────────────────────────────────────
  audience: [
    'Engineering Students',
    'Diploma Students',
    'Undergraduate Students',
    'Postgraduate Students',
    'Researchers',
    'Faculty Members',
    'Robotics Enthusiasts',
    'Automation Enthusiasts',
    'Technology Enthusiasts',
    'Students from Colleges across India and Abroad',
  ],

  // ── FAQ ───────────────────────────────────────────────────
  faqs: [
    {
      question: 'Who can participate?',
      answer:
        'The workshop is open to engineering students, diploma students, undergraduate and postgraduate students, researchers, faculty members, and technology enthusiasts from all colleges and universities.',
    },
    {
      question: 'What is the registration fee?',
      answer: 'The registration fee is ₹299 per participant.',
    },
    {
      question: 'Can students from other colleges participate?',
      answer:
        'Yes, students from different colleges and universities across India and abroad are welcome to register and attend.',
    },
    {
      question: 'Where will the workshop take place?',
      answer:
        'The workshop will be held at MITS (Madhav Institute of Technology & Science), Gwalior, Madhya Pradesh, India.',
    },
    {
      question: 'How will I receive my registration confirmation?',
      answer:
        'After successful payment of ₹299, you will receive a unique Registration ID and a QR-code-based digital pass on screen. A confirmation email will also be sent to your registered email address.',
    },
    {
      question: 'Will I receive a certificate?',
      answer:
        'Registered participants who attend the full workshop may receive a certificate of participation, subject to the organizers\' final policy.',
    },
    {
      question: 'Can I cancel my registration?',
      answer:
        'Please refer to the cancellation and refund policy on our website or contact the event coordinators for assistance. Refund policies will be updated by the organizers.',
    },
    {
      question: 'What should I bring to the workshop?',
      answer:
        'Please bring a valid college ID, your registration confirmation (Registration ID or QR code), and any materials recommended by the organizers.',
    },
  ],

  // ── Certificate info ──────────────────────────────────────
  certificateInfo:
    'All registered participants who attend the complete workshop may receive a Certificate of Participation. The final certificate policy and distribution method will be confirmed by the organizing committee.',

  // ── Contact ───────────────────────────────────────────────
  contact: {
    coordinatorName: 'Vanshika Choubey',
    email: 'vanshiika333@gmail.com',
    phone: '+91-9406821733',
    rasIasContact: 'IEEE RAS AND IAS Society — MITS Gwalior',
    mitsContact: 'MITS Gwalior Administration',
  },

  // ── Social links ──────────────────────────────────────────
  social: {
    website: '#',
    twitter: '#',
    linkedin: '#',
    instagramIAS: 'https://www.instagram.com/ieee_ias_mits?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
    instagramRAS: 'https://www.instagram.com/ieee_ras_mits?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
    facebook: '#',
  },

  // ── Legal ─────────────────────────────────────────────────
  legal: {
    privacyPolicy: '#',
    termsConditions: '#',
    refundPolicy: '#',
  },

  // ── API base URL ──────────────────────────────────────────
  apiBaseUrl: '/api',
};

export default eventConfig;
