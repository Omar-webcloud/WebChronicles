export type Mood = {
  positivity: number; // -1 (negative) to 1 (positive)
  chaos: number; // 0 (calm) to 1 (chaotic)
  intensity: number; // 0 (dull) to 1 (intense)
};

export type ChronicleData = {
  date: string;
  formattedDate: string;
  mood: Mood;
  signals: string[];
  headlines: string[];
  description: string;
  highlightedNews: {
    title: string;
    url: string;
    source: string;
  };
};

const MOCK_DATA: Record<string, ChronicleData> = {
  "2020-03-01": {
    date: "2020-03-01",
    formattedDate: "March 2020",
    mood: { positivity: -0.8, chaos: 0.9, intensity: 0.9 },
    signals: ["lockdown", "virus", "stockpile", "zoom", "panic"],
    headlines: [
      "Global markets crash",
      "Stay at home orders issued",
      "Toilet paper shortages reported",
      "New virus spreads rapidly",
      "The world stands still",
    ],
    description:
      "The beginning of the great pause. Fear, uncertainty, and a sudden shift in global reality.",
    highlightedNews: {
      title: "WHO Declares COVID-19 a Pandemic",
      url: "https://www.who.int/director-general/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020",
      source: "WHO"
    }
  },
  "2016-11-08": {
    date: "2016-11-08",
    formattedDate: "November 2016",
    mood: { positivity: -0.5, chaos: 1.0, intensity: 1.0 },
    signals: ["election", "shock", "polls", "twitter", "memes"],
    headlines: [
      "Election night shocker",
      "Social media on fire",
      "Divided nation",
      "Breaking news every second",
      "Unprecedented turnout",
    ],
    description:
      "A night of immense tension and digital explosion. The internet was shouting.",
    highlightedNews: {
      title: "Trump Triumphs: Shocking Upset",
      url: "https://www.nytimes.com/2016/11/09/us/politics/hillary-clinton-donald-trump-president.html",
      source: "New York Times"
    }
  },
  "2016-07-06": {
    date: "2016-07-06",
    formattedDate: "July 2016",
    mood: { positivity: 0.9, chaos: 0.2, intensity: 0.6 },
    signals: ["pokemon go", "outside", "parks", "unity", "running"],
    headlines: [
      "Everyone is going outside",
      "Gotta catch 'em all",
      "Central Park stampede for rare spawn",
      "World peace achieved largely through mobile game",
      "Battery packs sold out",
    ],
    description:
      "A rare moment of collective joy and outdoor adventure. The world felt united by play.",
    highlightedNews: {
      title: "Pokémon GO Launches, Takes Over World",
      url: "https://techcrunch.com/2016/07/06/pokemon-go-launches-in-us-on-ios-and-android/",
      source: "TechCrunch"
    }
  },
  "2009-01-03": {
    date: "2009-01-03",
    formattedDate: "January 2009",
    mood: { positivity: 0.1, chaos: 0.4, intensity: 0.5 },
    signals: ["bitcoin", "bailout", "chancellor", "block 0", "crisis"],
    headlines: [
      "Chancellor on brink of second bailout",
      "Genesis block mined",
      "Financial system wobbles",
      "A new peer-to-peer cash system",
      "Banks under pressure",
    ],
    description:
      "The silent birth of a new financial era amidst the ashes of the old one.",
    highlightedNews: {
      title: "Bitcoin Genesis Block Mined (Chancellor on brink...)",
      url: "https://en.wikipedia.org/wiki/History_of_Bitcoin",
      source: "History of Bitcoin"
    }
  },
  "2022-11-30": {
    date: "2022-11-30",
    formattedDate: "November 2022",
    mood: { positivity: 0.6, chaos: 0.7, intensity: 0.8 },
    signals: ["chatgpt", "ai", "future", "magic", "homework"],
    headlines: [
      "Is this the end of Google?",
      "AI writes poetry",
      "Students cheating with bots",
      "The singularity gets closer",
      "Tech world buzzing",
    ],
    description:
      "The moment the future arrived. A mixture of awe, excitement, and existential dread.",
    highlightedNews: {
      title: "OpenAI Introduces ChatGPT",
      url: "https://openai.com/blog/chatgpt",
      source: "OpenAI Blog"
    }
  },
  "today": {
    date: "today",
    formattedDate: "Today",
    mood: { positivity: 0.2, chaos: 0.5, intensity: 0.4 },
    signals: ["coding", "webchronicles", "demo", "future", "react"],
    headlines: [
      "Building the future",
      "What is time anyway?",
      "Frontend development evolves",
      "AI agents take the wheel",
      "Sliding through history",
    ],
    description:
      "The present moment. A canvas waiting to be painted by the next click.",
    highlightedNews: {
      title: "The Present: You are Here",
      url: "https://time.is/",
      source: "Time.is"
    }
  },
  "2026-06-01": {
    date: "2026-06-01",
    formattedDate: "June 2026",
    mood: { positivity: 0.8, chaos: 0.6, intensity: 0.9 },
    signals: ["agents", "fusion", "mars", "neuro", "abundance"],
    headlines: [
      "First fusion plant goes online",
      "AI Agents solve traffic permanently",
      "Mars colony breaks ground",
      "Neurolink mass adoption",
      "Universal digital income piloted",
    ],
    description:
      "A glimpse into a hopeful horizon. Technology and humanity finally dancing in rhythm.",
    highlightedNews: {
      title: "First Commercial Fusion Reactor Goes Online",
      url: "https://www.iter.org/",
      source: "Future Daily"
    }
  },
  "2005-04-23": {
    date: "2005-04-23",
    formattedDate: "April 2005",
    mood: { positivity: 0.6, chaos: 0.3, intensity: 0.4 },
    signals: ["broadcast yourself", "viral", "web 2.0", "video", "zoo"],
    headlines: [
      "Me at the zoo uploaded",
      "The beginning of user generated content",
      "Broadband adoption soars",
      "Digital camcorders everywhere",
      "A platform for everyone",
    ],
    description:
      "The dawn of the video internet. The moment we switched from consumers to creators.",
    highlightedNews: {
      title: "First YouTube Video Uploaded: Me at the zoo",
      url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      source: "YouTube"
    }
  },
};

export const AVAILABLE_DATES = Object.keys(MOCK_DATA).filter(
  (d) => d !== "today"
);

export async function getChronicleData(
  dateOrId: string
): Promise<ChronicleData> {
  // Simulate network delay for "streaming" feel
  await new Promise((resolve) => setTimeout(resolve, 800));
  return MOCK_DATA[dateOrId] || MOCK_DATA["today"];
}

export function getAllDates() {
  return AVAILABLE_DATES.map((date) => ({
    date,
    formatted: MOCK_DATA[date].formattedDate,
  }));
}
