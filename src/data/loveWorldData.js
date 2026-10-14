/**
 * ═══════════════════════════════════════════════════════════════
 * SAMITHRA'S LOVE UNIVERSE — Central Data File
 * ═══════════════════════════════════════════════════════════════
 *
 * Edit this file to personalize all content in the website.
 * All messages, names, photos, and captions are customizable here.
 *
 * INSTRUCTIONS:
 * 1. Replace placeholder photos in public/images/memories/ with your own.
 * 2. Update captions and messages below with your personal words.
 * 3. Add or remove entries from any array as needed.
 */

// ─── PERSONAL DETAILS ───────────────────────────────────────────
export const personalDetails = {
  creator: 'Sachin',
  specialPerson: 'Samithra',
  siteTitle: "SAMITHRA'S LOVE UNIVERSE",
  siteSubtitle: 'A little universe, created with all my love — Sachin.',
  pageTitle: 'For My Samithra — A Little Universe Made of Love',
};

// ─── NICKNAMES ──────────────────────────────────────────────────
export const nicknames = [
  {
    name: 'Samithra',
    emoji: '👑',
    color: '#CDBBFF',
    message:
      'The name that changed everything. The moment I heard it, something shifted in my world. Samithra — it sounds like a melody, like a secret the universe whispered just to me.',
    decoration: 'crown',
  },
  {
    name: 'Chellakutty',
    emoji: '🌸',
    color: '#FF83B8',
    message:
      'My little darling. The one who makes even the smallest moments feel precious. When I call you Chellakutty, it\'s because you bring out a tenderness in me I never knew I had.',
    decoration: 'flower',
  },
  {
    name: 'Thangoo',
    emoji: '✨',
    color: '#FFE0A0',
    message:
      'My golden treasure. More precious than anything the world could offer. You are worth more than all the gold in every kingdom, and I mean every word.',
    decoration: 'sparkle',
  },
  {
    name: 'Ammu',
    emoji: '💖',
    color: '#FFD6E7',
    message:
      'The sweetest name for the sweetest person. Ammu — short, soft, and full of love. Just like the way you make my heart feel every single day.',
    decoration: 'heart',
  },
  {
    name: 'Pattukutty',
    emoji: '🦋',
    color: '#B8E6FF',
    message:
      'My silk butterfly. Gentle, graceful, and endlessly beautiful. You move through life with a softness that amazes me, and I\'m lucky to watch you fly.',
    decoration: 'butterfly',
  },
  {
    name: 'Pondati',
    emoji: '💍',
    color: '#E8D5FF',
    message:
      'The one word that holds all my dreams. My partner, my home, my forever person. When I say Pondati, I\'m saying — you are my future, and I choose you.',
    decoration: 'ring',
  },
  {
    name: 'Pasakari',
    emoji: '🌙',
    color: '#C9B8FF',
    message:
      'My favourite conversationalist. The one I never get tired of talking to. Every conversation with you feels like home — warm, safe, and endlessly comfortable.',
    decoration: 'moon',
  },
];

// ─── CHAPTER TITLES ──────────────────────────────────────────────
export const chapters = [
  { id: 'gate', title: 'The Secret Gate', number: 1 },
  { id: 'beautiful-world', title: 'A Beautiful World', number: 2 },
  { id: 'birthday', title: 'Happy Birthday, Samithra', number: 3 },
  { id: 'museum', title: 'Our Dream Museum', number: 4 },
  { id: 'moments', title: 'Little Moments, Big Feelings', number: 5 },
  { id: 'nicknames', title: 'Seven Names, One Favourite Person', number: 6 },
  { id: 'garden', title: 'The Garden of Feelings', number: 7 },
  { id: 'vault', title: 'The Secret Love Vault', number: 8 },
  { id: 'fantasy', title: 'If I Could Give You the World', number: 9 },
  { id: 'universe', title: 'Our Forever Universe', number: 10 },
  { id: 'letter', title: 'A Letter from Sachin', number: 11 },
  { id: 'finale', title: 'The Grand Final Surprise', number: 12 },
];

// ─── CHAPTER 02 — BEAUTIFUL WORLD ───────────────────────────────
export const beautifulWorldContent = {
  heading: 'The World Becomes Beautiful Because of You',
  paragraphs: [
    'Before you, the world was just a place. The sky was just blue, the stars were just lights, and the days were just days.',
    'Then you walked in — and everything changed.',
    'The ordinary became extraordinary. The silence became music. The simple moments became the ones I hold closest to my heart.',
  ],
  highlight: "You didn't just enter my world, Samithra. You became it.",
  signature: '— Your Sachin ❤️',
};

// ─── CHAPTER 03 — BIRTHDAY CELEBRATION ──────────────────────────
export const birthdayContent = {
  heading: 'Happy Birthday, My Samithra!',
  subheading: 'Today, the universe has one extra reason to shine.',
  candleCount: 5,
  wishMessage:
    'May your birthday be filled with everything that makes your heart happy — laughter, love, beautiful surprises, and the warmth of people who adore you.',
  makeWishPrompt: 'Close your eyes, make a wish, and believe in the magic...',
};

// ─── CHAPTER 04 — OUR LOVE PORTRAITS & CHERISHED MOMENTS ─────────
export const memories = [
  {
    id: 1,
    src: '/images/memories/dream-01.jpg',
    cardBadge: 'Moment 01',
    category: 'college',
    categoryLabel: 'Campus Memories',
    title: 'Side by Side at Vivekanandha',
    dreamLocation: 'Vivekanandha Campus • Under the Palm Trees',
    date: 'Sitting Close to You',
    quote: 'Sitting side by side on that sunny day, my arm holding you close — I wished time would just freeze right there.',
    message: 'Looking at you in that radiant pink saree and seeing your sweet smile beside me... every corner of that campus became unforgettable because of you.',
    accentColor: '#FF83B8',
    icon: '🌸',
    artGradient: 'linear-gradient(135deg, #1b0a2a 0%, #3e1b5b 50%, #6d2d7d 100%)',
    featured: true,
  },
  {
    id: 2,
    src: '/images/memories/dream-02.jpg',
    cardBadge: 'Moment 02',
    category: 'golden',
    categoryLabel: 'Golden Hours',
    title: 'Golden Sunset by the Water',
    dreamLocation: 'Waterfront Horizon • Sunset Haven',
    date: 'Golden Hour With My Girl',
    quote: 'The sun was setting across the lake, but honestly, all the light in the universe was reflecting from your smile.',
    message: 'Standing by the water with flowers all around us and you in my arms. No sunset in the world could ever compete with your beauty.',
    accentColor: '#FF9E7D',
    icon: '🌅',
    artGradient: 'linear-gradient(135deg, #22081f 0%, #48143e 50%, #7e2468 100%)',
    featured: true,
  },
  {
    id: 3,
    src: '/images/memories/dream-04.jpg',
    cardBadge: 'Moment 03',
    category: 'whispers',
    categoryLabel: 'Matching Vibes',
    title: 'Twin Souls in Black & Green',
    dreamLocation: 'Green Gardens • Twin Souls',
    date: 'Our Classic Style',
    quote: 'When we stand together, everything just matches naturally. You look like pure grace in black.',
    message: 'A simple day made extraordinary just because we were standing together. Your hair, your smile, and the way you lean into me.',
    accentColor: '#B8E6FF',
    icon: '✨',
    artGradient: 'linear-gradient(135deg, #091a1e 0%, #12333b 50%, #1c525f 100%)',
    featured: false,
  },
  {
    id: 4,
    src: '/images/memories/sunset-saree-couple.jpg',
    cardBadge: 'Moment 04',
    category: 'embrace',
    categoryLabel: 'Sweet Embraces',
    title: 'Golden Sunset in Your Warmth',
    dreamLocation: 'Sunset Lakeside Horizon • Pure Romance',
    date: 'Golden Hour by the Hills',
    quote: 'Sitting beside you as the golden sun sets behind us, your hand close to mine — every sunset is beautiful, but you are my only world.',
    message: 'Looking at you in that breathtaking floral saree, leaning into me while the evening sky turns golden... that sweet smile of yours is the greatest blessing in my life, Samithra.',
    accentColor: '#FFAE73',
    icon: '🌅',
    artGradient: 'linear-gradient(135deg, #240a18 0%, #4a1532 50%, #7d2454 100%)',
    featured: true,
  },
  {
    id: 5,
    src: '/images/memories/dream-05.jpg',
    cardBadge: 'Moment 05',
    category: 'forever',
    categoryLabel: 'Forever Destiny',
    title: 'My Queen in Royal Purple',
    dreamLocation: 'Every Season With You • Endless Grace',
    date: 'My Forever Person',
    quote: 'In royal purple, looking at me with those eyes that stole my heart completely from day one.',
    message: 'You carry yourself with such dignity, beauty, and warmth. Samithra, you are not just my love — you are my queen and my forever.',
    accentColor: '#CDBBFF',
    icon: '👑',
    artGradient: 'linear-gradient(135deg, #1c0e35 0%, #3a1a6b 50%, #5d299f 100%)',
    featured: true,
  },
];

// ─── CHAPTER 05 — MOMENTS JOURNEY ───────────────────────────────
export const moments = [
  {
    id: 1,
    image: '/images/memories/memory-01.jpg',
    caption: 'Side by Side at Vivekanandha',
    date: 'College Days',
    note: 'Sitting close together on the campus curb in your pink saree — wishing the hours would never pass.',
  },
  {
    id: 2,
    image: '/images/memories/memory-02.jpg',
    caption: 'Golden Sunset by the Lake',
    date: 'Golden Hour',
    note: 'Watching the sun dip into the horizon with blooming flowers, holding you tight in my arms.',
  },
  {
    id: 3,
    image: '/images/memories/memory-04.jpg',
    caption: 'Twin Souls in Black & Green',
    date: 'Classic Style',
    note: 'Walking together in matching style, smiling like the whole world belongs to just the two of us.',
  },
  {
    id: 4,
    image: '/images/memories/memory-03.jpg',
    caption: 'Your Hand on My Heart',
    date: 'Pure Tenderness',
    note: 'The peaceful feeling of your hand resting gently over my chest — where you belong.',
  },
  {
    id: 5,
    image: '/images/memories/memory-05.jpg',
    caption: 'My Queen in Royal Purple',
    date: 'Forever & Always',
    note: 'Looking at the most beautiful girl in the universe in royal purple, my forever Samithra.',
  },
];

// ─── CHAPTER 07 — GARDEN OF FEELINGS (LOVE NOTES) ────────────────
export const loveNotes = [
  'I love the way you laugh when something really surprises you.',
  'Your voice is the first thing I want to hear every morning.',
  'You make ordinary days feel like celebrations.',
  'I love how you care about everyone around you.',
  'Your smile could light up the darkest room.',
  'I feel at home whenever I talk to you.',
  'You make me want to be a better person every single day.',
  'I love the way your eyes sparkle when you are excited.',
  'You are the most beautiful thought in my mind.',
  'Every moment with you is a moment I treasure.',
  'I love how brave and strong you are.',
  'You have the kindest heart I have ever known.',
  'I am grateful for every second I get to know you.',
  'Your happiness is my happiness — always.',
  'I love the little things about you that nobody else notices.',
  'You are my favourite hello and my hardest goodbye.',
  'I love how you make even silence feel comfortable.',
  'You are proof that beautiful things still exist in this world.',
  'I love the way you believe in people, even when they doubt themselves.',
  'You make me feel like the luckiest person alive.',
  'I love your courage, your warmth, and your beautiful spirit.',
  'Every love song makes more sense because of you.',
  'You are the reason I believe in magic.',
  'I love how you turn little moments into beautiful memories.',
  'You deserve every beautiful thing in this universe.',
  'I love the way you see the world — with kindness and wonder.',
  'Being with you feels like coming home after a long journey.',
  'I love your strength, even when you don\'t see it yourself.',
  'You are my today, my tomorrow, and my forever.',
  'I love you — simply, honestly, and endlessly.',
];

// ─── CHAPTER 08 — SECRET LOVE VAULT ─────────────────────────────
export const vaultSecrets = [
  {
    id: 'envelope',
    type: 'envelope',
    label: 'Secret Envelope',
    icon: '💌',
    title: 'A Letter Just for You',
    message:
      'My dearest Samithra, if you are reading this, you have found one of my hidden letters. I want you to know that every word I write for you comes straight from my heart. You are the most special person in my world, and I hope you never forget that. Love always, Sachin.',
  },
  {
    id: 'gift',
    type: 'gift',
    label: 'Birthday Gift Box',
    icon: '🎁',
    title: 'A Birthday Promise',
    message:
      'Happy Birthday, my love! Here is my promise to you — I will always be here to make you smile, to hold your hand through every storm, and to celebrate every beautiful moment with you. You deserve the world, and I will spend every day trying to give it to you.',
  },
  {
    id: 'heart',
    type: 'heart',
    label: 'Glowing Heart',
    icon: '💖',
    title: 'The Sweetest Truth',
    message:
      'Here is a secret I want the whole universe to know — you are the most beautiful soul I have ever encountered. Your kindness, your laughter, your warmth — they make everything brighter. I am so grateful that you exist, Samithra.',
  },
  {
    id: 'star',
    type: 'star',
    label: 'Mystery Star',
    icon: '⭐',
    title: 'A Compliment from the Stars',
    message:
      'The stars told me to tell you — you are more radiant than all of them combined. Your light touches everyone around you. Never dim your shine, Chellakutty. The universe is brighter because of you.',
  },
];

// ─── CHAPTER 09 — FANTASY WORLD LOCATIONS ────────────────────────
export const fantasyLocations = [
  {
    id: 'castle',
    name: 'Castle Above the Clouds',
    icon: '🏰',
    color: '#CDBBFF',
    bgGradient: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 50%, #4a2c8a 100%)',
    message:
      'If I could build you a castle above the clouds, it would have windows that show only sunsets, rooms filled with your favourite music, and balconies where we could watch the stars together. You deserve a kingdom, my queen.',
    illustration: 'castle',
  },
  {
    id: 'garden',
    name: 'Moonlit Rose Garden',
    icon: '🌹',
    color: '#FF83B8',
    bgGradient: 'linear-gradient(135deg, #1a0a20 0%, #2d1030 50%, #451040 100%)',
    message:
      'In this moonlit garden, every rose blooms just for you. Each petal carries a whisper of how much you mean to me. Walk through these paths and know that every flower here was planted by my love for you.',
    illustration: 'garden',
  },
  {
    id: 'bridge',
    name: 'Glowing Bridge Between Islands',
    icon: '🌉',
    color: '#FFE0A0',
    bgGradient: 'linear-gradient(135deg, #0a1628 0%, #152040 50%, #1a3060 100%)',
    message:
      'This bridge connects two floating islands — one is your world, and one is mine. No matter how far apart we might be, this bridge of love will always keep us connected. Walk across it, and you will find me waiting.',
    illustration: 'bridge',
  },
  {
    id: 'waterfall',
    name: 'Galaxy Waterfall',
    icon: '🌌',
    color: '#B8E6FF',
    bgGradient: 'linear-gradient(135deg, #050520 0%, #0a1040 50%, #101860 100%)',
    message:
      'A waterfall made of stardust falls into an ocean of dreams. Every drop carries a wish I have made for your happiness. Stand here and feel the universe wrapping you in light and love.',
    illustration: 'waterfall',
  },
  {
    id: 'field',
    name: 'Field of Luminous Flowers',
    icon: '🌸',
    color: '#FFD6E7',
    bgGradient: 'linear-gradient(135deg, #1a0a18 0%, #2d1028 50%, #401838 100%)',
    message:
      'An infinite field of glowing flowers, each one representing a reason I love you. You could walk through them forever and never reach the end, because my reasons to love you are endless.',
    illustration: 'field',
  },
  {
    id: 'observatory',
    name: 'Secret Star Observatory',
    icon: '🔭',
    color: '#C9B8FF',
    bgGradient: 'linear-gradient(135deg, #0a0a20 0%, #141430 50%, #1e1e50 100%)',
    message:
      'In this secret observatory, every star in the sky is named after a moment we shared. Look through the telescope, and you will see galaxies made of our laughter, constellations shaped by our conversations, and a universe built on our love.',
    illustration: 'observatory',
  },
];

// ─── CHAPTER 10 — FOREVER UNIVERSE ──────────────────────────────
export const foreverUniverse = {
  heading: 'Different Stars, One Beautiful Universe',
  sachinMessage:
    'I am a small star in the vast universe, but loving you gives me all the brightness I need. You make me feel like I can light up galaxies. I will keep shining for you — always.',
  samithraMessage:
    'You are the brightest star in my sky. Every night, I look up and think of you. No distance, no darkness, no storm can ever dim the light you bring into my life. You are my forever star, Samithra.',
};

// ─── CHAPTER 11 — SACHIN'S LETTER ───────────────────────────────
export const sachinLetter = {
  greeting: 'My dearest Samithra,',
  paragraphs: [
    'Happy Birthday, my Chellakutty.',
    'Today, I wanted to create something a little different for you — a tiny world filled with beautiful colours, little surprises, and words from my heart.',
    'I hope this birthday brings you moments that make you smile, memories you treasure, and all the happiness you deserve.',
    'Thank you for being the wonderful person you are. I hope this little universe reminds you how special you are to me.',
    'Whenever you explore these little stars, flowers, letters, and surprises, remember that every detail was created to make your day feel a little more magical.',
    'Happy Birthday, Ammu. Keep smiling and keep shining.',
  ],
  closing: 'With all my love,',
  signature: 'Your Sachin ❤️',
};

// ─── CHAPTER 12 — GRAND FINALE ──────────────────────────────────
export const grandFinale = {
  preReveal: "Samithra… there's one last little surprise for you.",
  mainTitle: 'Happy Birthday, My Samithra ❤️',
  message:
    "Out of all the beautiful things in this world, I'm grateful for the chance to make something special just for you.",
  signature: 'Forever made with love,\nSachin ❤️',
  finalPhoto: '/images/memories/memory-01.jpg',
};

// ─── AUDIO CONFIG ────────────────────────────────────────────────
export const audioConfig = {
  // Place your audio file in public/audio/ and update the path if different
  soundtrack: '/audio/background-music.mp3',
  enabled: true, // Enabled: ready for your mp3 file in public/audio/!
};
