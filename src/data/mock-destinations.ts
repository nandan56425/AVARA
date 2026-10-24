import type { Destination } from "@/types";

export const mockDestinations: Destination[] = [
  {
    slug: "coorg-weekend-escape",
    name: "Coorg",
    tagline: "Coffee country and misty hills",
    description:
      "A weekend escape into the Western Ghats — rolling coffee estates, quiet mist, and winding roads through one of Karnataka's most beautiful hill regions.",
    heroImage: "/images/destinations/coorg.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 120,
    duration: "2 days",
    budgetRange: "₹2,000–₹4,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Scenic drives", "Photography", "Forests"],
    moodTags: ["Peaceful", "Romantic", "Weekend reset"],
    highlights: [
      "Drive through coffee plantations",
      "Abbey Falls viewpoint",
      "Raja's Seat sunrise",
      "Local Kodava cuisine",
    ],
    thingsToCarry: [
      "Light jacket or shawl",
      "Comfortable walking shoes",
      "Rain poncho during monsoon",
      "Camera",
    ],
    importantNotes: [
      "Roads can be foggy in early morning — drive carefully",
      "Leeches common during monsoon on forest trails",
      "Budget estimate of ₹2,000–₹4,000 has not been verified; confirm transport, accommodation, meals and entry costs before travelling.",
    ],
    recommendation:
      "Best experienced over a full weekend. The drive itself is half the experience — leave early and take the scenic route through Kushalnagar.",
    itinerary: [
      {
        day: 1,
        title: "The journey and first evening",
        stops: [
          {
            time: "05:30",
            title: "Leave Mysuru",
            description: "Depart from Mysuru and allow extra time for traffic, weather and road conditions.",
            duration: "Approximately 3h; verify current route conditions",
            type: "travel",
          },
          {
            time: "08:30",
            title: "Breakfast stop",
            description: "Pause at a roadside restaurant for South Indian breakfast.",
            duration: "30 min",
            type: "food",
          },
          {
            time: "10:00",
            title: "Check in and settle",
            description: "Arrive and take in the surroundings.",
            duration: "1h",
            type: "rest",
          },
          {
            time: "11:30",
            title: "Coffee estate walk",
            description: "Explore a local coffee plantation on foot.",
            duration: "2h",
            type: "activity",
          },
          {
            time: "14:00",
            title: "Lunch",
            description: "Try local Kodava cuisine.",
            duration: "1h",
            type: "food",
          },
          {
            time: "16:00",
            title: "Abbey Falls",
            description: "Visit the waterfall viewpoint if access is open. Check current local conditions before travelling.",
            duration: "1.5h",
            type: "highlight",
            tip: "Visit during or just after monsoon for the best flow.",
          },
          {
            time: "18:30",
            title: "Evening at leisure",
            description: "Relax, walk around, or photograph the sunset.",
            duration: "2h",
            type: "rest",
          },
        ],
      },
      {
        day: 2,
        title: "Sunrise and return",
        stops: [
          {
            time: "05:30",
            title: "Raja's Seat sunrise",
            description: "Enjoy the valley views if the viewpoint is open at your arrival time.",
            duration: "1h",
            type: "highlight",
            tip: "Check current official opening hours before planning an early-morning visit.",
          },
          {
            time: "07:15",
            title: "Breakfast",
            description: "Warm coffee and breakfast before heading back.",
            duration: "45 min",
            type: "food",
          },
          {
            time: "08:00",
            title: "Drive back to Mysuru",
            description: "Take a different route if possible for fresh scenery.",
            duration: "3.5h",
            type: "travel",
          },
        ],
      },
    ],
    featured: true,
    thisWeekend: true,
    avaraPick: true,
    sourceUrls: [
      "https://kodagu.nic.in/en/tourist-place/abbey-falls/",
      "https://kodagu.nic.in/en/tourist-place/rajas-seat/",
      "https://kodagu.nic.in/en/about-district/",
    ],
    verificationStatus: "partially-verified",
  },
  {
    slug: "nandi-hills-sunrise",
    name: "Nandi Hills",
    tagline: "The classic Bengaluru sunrise drive",
    description:
      "An early morning drive from Bengaluru to one of the most popular sunrise points in Karnataka. Best on clear mornings when the fog rolls across the valley below.",
    heroImage: "/images/destinations/nandi-hills.jpg",
    images: [],
    startingCity: "Bengaluru",
    distanceKm: 60,
    duration: "Half day",
    budgetRange: "Under ₹1,000",
    bestSeason: "Winter",
    experienceTags: ["Sunrise", "Photography", "Scenic drives"],
    moodTags: ["Peaceful", "Family-friendly"],
    highlights: [
      "Sunrise over the fog valley",
      "Tipu Sultan's Summer Residence",
      "Paragliding (seasonal)",
      "Cool morning air and chai",
    ],
    thingsToCarry: [
      "Warm layers — it's cold before sunrise",
      "Camera or phone with good low-light capability",
      "Water",
    ],
    importantNotes: [
      "Karnataka Tourism lists entry timings as 6:00 AM–6:00 PM; another official tourism page lists different closing hours. Confirm current timings before visiting.",
      "Weekend crowd levels can vary; allow extra time for parking and access.",
      "Paragliding availability depends on current operator arrangements and weather conditions; verify availability before planning around it.",
      "The budget estimate is unverified; confirm transport, food, parking and entry costs before travelling.",
    ],
    recommendation:
      "Leave Bengaluru by 4:00 AM to reach well before sunrise. The drive is part of the experience.",
    itinerary: [
      {
        day: 1,
        title: "Early morning to Nandi Hills",
        stops: [
          {
            time: "04:00",
            title: "Leave Bengaluru",
            description: "Beat the crowd and enjoy empty roads.",
            duration: "1.5h",
            type: "travel",
          },
          {
            time: "05:30",
            title: "Arrive near Nandi Hills",
            description: "Reach the area before sunrise, but confirm current gate opening and access arrangements before planning your visit.",
            duration: "30 min",
            type: "travel",
          },
          {
            time: "06:00",
            title: "Sunrise viewing",
            description: "Enjoy the sunrise if access is open and conditions allow; otherwise, adjust your visit to the confirmed entry time.",
            duration: "45 min",
            type: "highlight",
          },
          {
            time: "07:00",
            title: "Explore and breakfast",
            description: "Walk around the hilltop, visit the temple, and grab hot breakfast.",
            duration: "1.5h",
            type: "activity",
          },
          {
            time: "08:30",
            title: "Drive back",
            description: "Return to Bengaluru before it gets hot.",
            duration: "1.5h",
            type: "travel",
          },
        ],
      },
    ],
    featured: true,
    avaraPick: true,
    sourceUrls: [
      "https://karnatakatourism.org/en/attractions/nandi-hills/",
      "https://chikkaballapur.nic.in/en/tourist-place/nandi-hills/",
    ],
    verificationStatus: "partially-verified",
    lastVerified: "2026-10-13",
  },
  {
    slug: "br-hills-wildlife",
    name: "BR Hills",
    tagline: "Where the Eastern and Western Ghats meet",
    description:
      "A quieter alternative to more popular hill stations — BR Hills offers dense forests, wildlife sightings, and a spiritual calm at the Biligiri Rangaswamy Temple.",
    heroImage: "/images/destinations/br-hills.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 80,
    duration: "2 days",
    budgetRange: "₹2,000–₹4,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Forests", "Photography"],
    moodTags: ["Offbeat", "Peaceful", "Adventurous"],
    highlights: [
      "Biligiri Rangaswamy Temple",
      "K. Gudi wilderness camp area",
      "Birdwatching",
      "Quiet forest drives",
    ],
    thingsToCarry: [
      "Binoculars for birdwatching",
      "Full-sleeve clothing for forest walks",
      "Insect repellent",
      "Torch/flashlight",
    ],
    importantNotes: [
      "BR Hills is a protected wildlife area. Confirm current access rules and obtain any required permissions before entering forest areas.",
      "Do not assume independent forest walks are permitted; confirm approved trails and guide requirements with the relevant authorities or authorised operators.",
      "Safari availability, schedules and prices can change. Confirm current details with the official operator before planning around a safari.",
      "Phone coverage may be limited in some areas; plan navigation and communication accordingly.",
      "The budget estimate is unverified; confirm transport, accommodation, meals and activity costs before travelling.",
    ],
    recommendation:
      "This is for people who want quiet over convenience. Don't come expecting resort-style amenities — come for the forest.",
    itinerary: [
      {
        day: 1,
        title: "Journey and forest arrival",
        stops: [
          {
            time: "06:00",
            title: "Leave Mysuru",
            description: "Early start for the best forest light.",
            duration: "2.5h",
            type: "travel",
          },
          {
            time: "08:30",
            title: "Arrive and check in",
            description: "Settle into the forest camp or lodge.",
            duration: "1h",
            type: "rest",
          },
          {
            time: "10:00",
            title: "Nature walk",
            description: "Guided walk through the forest edge — confirm approved trails and guide requirements with the relevant authorities or operators before visiting.",
            duration: "2h",
            type: "activity",
          },
          {
            time: "13:00",
            title: "Lunch",
            description: "Simple local food.",
            duration: "1h",
            type: "food",
          },
          {
            time: "15:00",
            title: "Temple visit",
            description: "Visit Biligiri Rangaswamy Temple, subject to current temple opening hours and access arrangements.",
            duration: "1.5h",
            type: "highlight",
          },
          {
            time: "17:30",
            title: "Evening birding",
            description: "Watch for forest birds as the light fades.",
            duration: "1h",
            type: "activity",
          },
        ],
      },
      {
        day: 2,
        title: "Morning in the forest and return",
        stops: [
          {
            time: "05:30",
            title: "Early morning forest walk",
            description: "Enjoy an early-morning nature experience only where access is permitted; confirm current forest entry rules and guide requirements in advance.",
            duration: "1.5h",
            type: "highlight",
          },
          {
            time: "07:30",
            title: "Breakfast and pack up",
            description: "Last meal in the forest.",
            duration: "1h",
            type: "food",
          },
          {
            time: "09:00",
            title: "Drive back to Mysuru",
            description: "Return towards Mysuru, allowing extra time for road conditions and any forest-area access restrictions.",
            duration: "2.5h",
            type: "travel",
          },
        ],
      },
    ],
    featured: true,
    thisWeekend: true,
    sourceUrls: [
      "https://karnatakatourism.org/en/experiences/brt-wildlife-sanctuary",
      "https://karnatakatourism.org/en/experiences/brt-tiger-reserve-and-wildlife-sanctuary/",
      "https://karnatakatourism.org/en/attractions/br-hills",
    ],
    verificationStatus: "partially-verified",
    lastVerified: "2026-10-13",
  },
  {
    slug: "mysuru-to-ooty-scenic",
    name: "Mysuru to Ooty",
    tagline: "The scenic route through the Ghats",
    description:
      "One of the most beautiful drives in South India — climbing from the plains through 36 hairpin bends, past Bandipur forest, into the Nilgiris.",
    heroImage: "/images/destinations/mysuru-ooty1.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 125,
    duration: "2 days",
    budgetRange: "₹2,000–₹4,000",
    bestSeason: "Year-round",
    experienceTags: ["Scenic drives", "Mountains", "Photography"],
    moodTags: ["Scenic drive", "Romantic", "Weekend reset"],
    highlights: [
      "36 hairpin bends on the Ghat road",
      "Bandipur forest crossing",
      "Botanical gardens",
      "Ooty lake morning walk",
    ],
    thingsToCarry: [
      "Warm clothing — Ooty is cool even in summer",
      "Motion sickness tablets if prone",
      "Camera for the Ghat drive",
    ],
    importantNotes: [
      "The Bandipur forest-road corridor has night-traffic restrictions. Confirm current official timings and plan the crossing during permitted hours.",
      "The 36-hairpin-bend section is the steep Masinagudi–Kalhatty approach, not the standard Gudalur route. Check current vehicle restrictions and road conditions before choosing it.",
      "Allow extra time for forest crossings, ghat roads, weather and stops. Do not rely on a fixed travel duration.",
      "The budget estimate is unverified; confirm transport, accommodation, meals and attraction costs before travelling.",
    ],
    recommendation:
      "Plan the drive around current road and forest-access rules. The steep Masinagudi–Kalhatty approach has 36 hairpin bends and is distinct from the Gudalur route; confirm route suitability and restrictions before setting out.",
    itinerary: [
      {
        day: 1,
        title: "The drive up",
        stops: [
          {
            time: "06:00",
            title: "Leave Mysuru",
            description: "Start early to allow a relaxed drive.",
            duration: "4h with stops",
            type: "travel",
          },
          {
            time: "10:00",
            title: "Arrive and explore",
            description: "Walk around the town centre.",
            duration: "3h",
            type: "activity",
          },
          {
            time: "14:00",
            title: "Lunch",
            description: "Try local food.",
            duration: "1h",
            type: "food",
          },
          {
            time: "16:00",
            title: "Botanical gardens",
            description: "Spend the afternoon in the gardens.",
            duration: "2h",
            type: "highlight",
          },
        ],
      },
      {
        day: 2,
        title: "Morning and return",
        stops: [
          {
            time: "06:30",
            title: "Lake morning walk",
            description: "A quiet walk by the lake before the town wakes up.",
            duration: "1h",
            type: "activity",
          },
          {
            time: "08:00",
            title: "Breakfast",
            description: "A meal in Ooty before the drive back.",
            duration: "45 min",
            type: "food",
          },
          {
            time: "08:45",
            title: "Drive back to Mysuru",
            description: "Head back via the same scenic route, allowing extra time for forest crossings and ghat road conditions.",
            duration: "Approx. 4h",
            type: "travel",
          },
        ],
      },
    ],
    avaraPick: true,
    sourceUrls: [
      "https://karnatakatourism.org/en/experiences/bandipur-national-park",
      "https://www.prod.incredibleindia.gov.in/content/incredible-india-v2/en/itineraries/road-trips/road-to-indias-heritage.html",
      "https://mee-tr.wii.gov.in/Home/Geospatial/bandipur-tiger-reserve",
    ],
    verificationStatus: "partially-verified",
    lastVerified: "2026-10-13",
  },
  {
    slug: "shivanasamudra-falls",
    name: "Shivanasamudra Falls",
    tagline: "Karnataka's hidden waterfall on the Kaveri",
    description:
      "A spectacular segmented waterfall on the Kaveri river. Water flow varies with rainfall, so check current conditions and visitor-access advisories before planning your visit.",
    heroImage: "/images/destinations/shivanasamudra.jpg",
    images: [],
    startingCity: "Bengaluru",
    distanceKm: 130,
    duration: "1 day",
    budgetRange: "₹1,000–₹2,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Waterfalls", "Photography"],
    moodTags: ["Adventurous", "Photography", "Family-friendly"],
    highlights: [
      "Gaganachukki Falls viewpoint",
      "Barachukki Falls (closer access)",
      "Ancient hydroelectric station",
      "Riverside picnic areas",
    ],
    thingsToCarry: [
      "Waterproof bag for electronics",
      "Grip sandals or shoes — rocks are wet and slippery",
      "Change of clothes",
    ],
    importantNotes: [
      "Stay within designated visitor areas and obey barriers and local safety instructions.",
      "Water levels, currents and viewpoint access can change with rainfall. Confirm current conditions before travelling.",
      "Do not enter the river or attempt to reach the waterfall base unless access is explicitly permitted by the authorities.",
      "The budget estimate is unverified; confirm transport, food, parking and any entry costs before travelling.",
      "Waterfall flow varies seasonally; stronger flow does not guarantee safe access. Follow current local advisories.",
    ],
    recommendation:
      "Plan your visit around current rainfall, access conditions and safety advisories. Enjoy the designated viewpoints without approaching restricted waterfall or river areas.",
    itinerary: [
      {
        day: 1,
        title: "Day trip to the falls",
        stops: [
          {
            time: "05:30",
            title: "Leave Bengaluru",
            description: "Depart from Bengaluru and allow extra time for traffic, route conditions and stops; verify the current journey time before travelling.",
            duration: "3h",
            type: "travel",
          },
          {
            time: "08:30",
            title: "Gaganachukki viewpoint",
            description: "The bigger, more dramatic falls — viewed from a distance.",
            duration: "1h",
            type: "highlight",
          },
          {
            time: "10:00",
            title: "Barachukki Falls",
            description: "Explore the designated viewpoint or visitor area if open. Confirm current access restrictions before planning a walk towards the falls.",
            duration: "2h",
            type: "highlight",
          },
          {
            time: "12:30",
            title: "Lunch",
            description: "Local restaurant near the falls.",
            duration: "1h",
            type: "food",
          },
          {
            time: "14:00",
            title: "Drive back to Bengaluru",
            description: "Return to Bengaluru, allowing extra time for traffic and road conditions.",
            duration: "3h",
            type: "travel",
          },
        ],
      },
    ],
    thisWeekend: true,
    sourceUrls: [
      "https://en.wikipedia.org/wiki/Shivanasamudra_Falls",
    ],
    verificationStatus: "partially-verified",
    lastVerified: "2026-10-22",
  },
  {
    slug: "sakleshpur-green-route",
    name: "Sakleshpur",
    tagline: "The green route through coffee and spice country",
    description:
      "A lesser-known hill region connected by one of Karnataka's greenest railway routes. Rolling estates, quiet homestays, and scenic trails.",
    heroImage: "/images/destinations/sakleshpur.jpg",
    images: [],
    startingCity: "Bengaluru",
    distanceKm: 220,
    duration: "2 days",
    budgetRange: "₹2,000–₹4,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Scenic drives", "Forests", "Treks"],
    moodTags: ["Offbeat", "Peaceful", "Weekend reset"],
    highlights: [
      "Bisle Ghat viewpoint",
      "Coffee and spice plantations",
      "Manjarabad Fort",
    ],
    thingsToCarry: [
      "Trekking shoes",
      "Leech socks if visiting post-monsoon",
      "Light rain jacket",
    ],
    importantNotes: [
      "Check current road conditions, weather and local access restrictions before setting out.",
      "Do not enter railway tracks, tunnels or railway property for sightseeing or photography; use only permitted public viewpoints and routes.",
      "Monsoon rain can affect visibility, road conditions and access to outdoor attractions. Check current local advisories before travelling.",
      "Confirm opening hours, entry requirements and availability directly with each attraction before visiting.",
      "The budget estimate is unverified; confirm transport, accommodation, meals and attraction costs before travelling.",
    ],
    recommendation:
      "Combine a permitted local viewpoint or walking route with a night at a plantation homestay for the full experience. This is not a place to rush through.",
    itinerary: [
      {
        day: 1,
        title: "Drive and explore",
        stops: [
          {
            time: "05:00",
            title: "Leave Bengaluru",
            description: "Long drive — start before dawn.",
            duration: "4.5h",
            type: "travel",
          },
          {
            time: "09:30",
            title: "Arrive and settle",
            description: "Check into a homestay.",
            duration: "1h",
            type: "rest",
          },
          {
            time: "11:00",
            title: "Manjarabad Fort",
            description: "Star-shaped fort with panoramic views.",
            duration: "1.5h",
            type: "highlight",
          },
          {
            time: "13:00",
            title: "Lunch",
            description: "Malnad-style home food.",
            duration: "1h",
            type: "food",
          },
          {
            time: "15:00",
            title: "Plantation walk",
            description: "Walk through coffee and pepper estates.",
            duration: "2h",
            type: "activity",
          },
        ],
      },
      {
        day: 2,
        title: "Trek and return",
        stops: [
          {
            time: "06:00",
            title: "Bisle Ghat viewpoint",

            description:
              "Visit the Bisle Ghat area for views of the Western Ghats, subject to current access conditions. Confirm permitted routes, entry arrangements and local guidance before setting out. Visibility varies with weather and season.",
            duration: "3h",
            type: "highlight",
            tip: "Mobile coverage is minimal — download an offline map before leaving the homestay.",
          },
          {
            time: "09:30",
            title: "Breakfast",
            description: "Hearty post-trek breakfast.",
            duration: "45 min",
            type: "food",
          },
          {
            time: "10:30",
            title: "Drive back to Bengaluru",
            description: "Return via Hassan or the highway.",
            duration: "4.5h",
            type: "travel",
          },
        ],
      },
    ],
    featured: true,

    sourceUrls: [
      "https://en.wikipedia.org/wiki/Manjarabad_Fort",
    ],

    verificationStatus: "unverified",
  },

  {
    slug: "srirangapatna-heritage",
    name: "Srirangapatna",
    tagline: "History and heritage beside the Kaveri",
    description:
      "A relaxed heritage day trip featuring historic monuments, temple architecture and the legacy of the Mysore kingdom.",
    heroImage: "/images/destinations/srirangapatna.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 20,
    duration: "1 day",
    budgetRange: "Under ₹1,000",
    bestSeason: "Winter",
    experienceTags: ["Photography", "Relaxed nature"],
    moodTags: ["Peaceful", "Family-friendly", "Photography"],
    highlights: [
      "Tipu Sultan's Summer Palace area",
      "Sri Ranganathaswamy Temple",
      "Historic fortifications and monuments",
      "Kaveri river surroundings",
    ],
    thingsToCarry: ["Comfortable walking shoes", "Water", "Sun protection"],
    importantNotes: [
      "Confirm current monument opening hours and access before visiting.",
      "Respect temple customs and photography restrictions.",
      "Budget is indicative and has not been verified.",
    ],
    recommendation:
      "Ideal for a relaxed cultural day trip from Mysuru. Choose a few nearby heritage stops instead of rushing through every monument.",

    itinerary: [
      {
        day: 1,
        title: "Srirangapatna Heritage and River Escape",
        stops: [
          {
            time: "7:00 AM",
            title: "Travel from Mysuru",
            description:
              "Start early and travel toward Srirangapatna. Allow extra time for weekend traffic and parking near the first stop.",
            duration: "30–45 minutes, depending on your starting point",
            type: "travel",
            tip: "Check the temple's current opening hours before leaving.",
          },
          {
            time: "7:30 AM",
            title: "Sri Ranganathaswamy Temple",
            description:
              "Visit the historic temple dedicated to Lord Ranganatha. Allow time for darshan, the temple surroundings, and observing the traditional architecture.",
            duration: "45–60 minutes",
            type: "activity",
            tip: "Dress respectfully and follow temple photography rules.",
          },
          {
            time: "8:45 AM",
            title: "Explore the historic fort area",
            description:
              "Walk through accessible parts of the historic town and learn about its connection to Tipu Sultan and the Anglo-Mysore period. Only enter areas open to visitors.",
            duration: "45–60 minutes",
            type: "highlight",
            tip: "Wear comfortable walking shoes and carry drinking water.",
          },
          {
            time: "10:00 AM",
            title: "Daria Daulat Bagh",
            description:
              "Explore Tipu Sultan's summer palace and its historic artwork and displays, subject to current opening arrangements.",
            duration: "45–60 minutes",
            type: "activity",
            tip: "Check opening hours and photography restrictions before visiting.",
          },
          {
            time: "11:15 AM",
            title: "Gumbaz mausoleum",
            description:
              "Visit the historic mausoleum associated with Hyder Ali, Tipu Sultan, and Tipu Sultan's family. Take time to appreciate the architecture respectfully.",
            duration: "30–45 minutes",
            type: "highlight",
            tip: "Respect the site's religious and cultural significance.",
          },
          {
            time: "12:15 PM",
            title: "Lunch break",
            description:
              "Stop at a local eatery for lunch and take a break before the afternoon's nature visit.",
            duration: "45–60 minutes",
            type: "food",
            tip: "Carry water and check meal options before travelling onward.",
          },
          {
            time: "1:30 PM",
            title: "Travel to Ranganathittu",
            description:
              "Drive toward Ranganathittu Bird Sanctuary. Allow time for the journey, parking, ticketing, and any queues.",
            duration: "Allow 30–45 minutes or more if needed",
            type: "travel",
          },
          {
            time: "2:15 PM",
            title: "Ranganathittu Bird Sanctuary",
            description:
              "Explore the accessible sanctuary areas and look for waterbirds along the Kaveri. Boat rides depend on current operations, weather, and availability.",
            duration: "1–2 hours",
            type: "activity",
            tip: "Bring binoculars if available. Keep your distance from wildlife and follow sanctuary rules.",
          },
          {
            time: "4:15 PM",
            title: "Relax by the river",
            description:
              "If time, weather, and public access permit, finish with a quiet break at an approved riverside location before returning.",
            duration: "20–30 minutes",
            type: "rest",
            tip: "Stay away from strong currents, restricted riverbanks, and unsafe water access points.",
          },
          {
            time: "4:45 PM",
            title: "Return to Mysuru",
            description:
              "Begin the return journey. If a site is closed or running late, skip the optional river stop rather than rushing.",
            duration: "Allow 30–45 minutes or more depending on traffic",
            type: "travel",
          },
        ],
      },
    ],
    sourceUrls: ["https://mandya.nic.in/"],
    verificationStatus: "unverified",
    imageCredit: "Photo: Timothy A. Gonsalves / Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    slug: "melkote-cultural-escape",
    name: "Melkote",
    tagline: "Hilltop views and timeless temple heritage",
    description:
      "A peaceful cultural escape known for its historic temples, traditional townscape and elevated views over the surrounding countryside.",
    heroImage: "/images/destinations/melkote.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 50,
    duration: "1 day",
    budgetRange: "Under ₹1,000",
    bestSeason: "Winter",
    experienceTags: ["Photography", "Scenic drives", "Relaxed nature"],
    moodTags: ["Peaceful", "Photography", "Family-friendly"],
    highlights: [
      "Cheluvanarayana Swamy Temple",
      "Yoga Narasimha Temple area",
      "Historic streets and architecture",
      "Views over the countryside",
    ],
    thingsToCarry: ["Comfortable walking shoes", "Water", "Sun protection"],
    importantNotes: [
      "Check current temple opening hours and access arrangements.",
      "Some routes include steps or slopes; take care in hot or wet weather.",
      "Budget is indicative and has not been verified.",
    ],
    recommendation:
      "A good choice for a slow-paced day of culture, photography and local food.",

    itinerary: [
      {
        day: 1,
        title: "Melkote Temple Town and Hilltop Escape",
        stops: [
          {
            time: "7:00 AM",
            title: "Depart from Mysuru",
            description:
              "Start early for Melkote. Check your route and allow extra time for traffic, parking, and walking between attractions.",
            duration: "Allow approximately 1–1.5 hours, depending on your starting point",
            type: "travel",
            tip: "Check the temple schedules before departure, especially on festival days.",
          },
          {
            time: "8:15 AM",
            title: "Explore the temple town",
            description:
              "Walk through the traditional streets and explore the heritage atmosphere of Melkote before the main sightseeing period.",
            duration: "30–45 minutes",
            type: "activity",
            tip: "Wear comfortable footwear and dress respectfully around places of worship.",
          },
          {
            time: "9:00 AM",
            title: "Cheluvanarayana Swamy Temple",
            description:
              "Visit the historic temple dedicated to Cheluvanarayana Swamy. Allow time for darshan and appreciating the architecture and religious traditions.",
            duration: "45–60 minutes",
            type: "highlight",
            tip: "Darshan timings can change during festivals and special observances. Follow temple photography rules.",
          },
          {
            time: "10:15 AM",
            title: "Kalyani sacred tank",
            description:
              "Spend time around the historic temple tank, observing its stone steps and traditional architecture. Respect worshippers and keep the surroundings clean.",
            duration: "30–45 minutes",
            type: "activity",
            tip: "Avoid entering the water unless explicitly permitted and safe.",
          },
          {
            time: "11:00 AM",
            title: "Climb toward Yoga Narasimha Swamy Temple",
            description:
              "Make your way toward the hilltop temple. The ascent involves steps and can feel strenuous in hot weather, so proceed at a comfortable pace.",
            duration: "Allow 30–60 minutes for the ascent, with additional time for rests",
            type: "activity",
            tip: "Carry water, use sun protection, and check current access arrangements.",
          },
          {
            time: "12:00 PM",
            title: "Hilltop temple and viewpoints",
            description:
              "Explore the accessible temple surroundings and enjoy views of the rocky landscape and countryside. Keep the visit respectful and follow local instructions.",
            duration: "30–45 minutes",
            type: "highlight",
            tip: "Stay on permitted paths and avoid exposed edges while taking photographs.",
          },
          {
            time: "1:00 PM",
            title: "Lunch and rest",
            description:
              "Return to the town for lunch. Consider local dishes such as puliyogare where available, then rest before the afternoon.",
            duration: "45–60 minutes",
            type: "food",
            tip: "Temple-area food outlets and their opening hours can vary. Check availability locally.",
          },
          {
            time: "2:15 PM",
            title: "Heritage walk and local culture",
            description:
              "Explore accessible streets and traditional buildings at a relaxed pace. If the Academy of Sanskrit Research or another heritage institution is open to visitors, check whether a visit is possible.",
            duration: "45–60 minutes",
            type: "activity",
            tip: "Do not assume institutional interiors are open to walk-in visitors; confirm access beforehand.",
          },
          {
            time: "3:30 PM",
            title: "Photography and a quiet break",
            description:
              "Use the remaining afternoon for architecture photography, a local snack, or a relaxed walk through publicly accessible areas.",
            duration: "30–45 minutes",
            type: "rest",
            tip: "Ask permission before photographing people, private property, or restricted temple areas.",
          },
          {
            time: "4:15 PM",
            title: "Return journey to Mysuru",
            description:
              "Begin the drive back after checking traffic and weather. If temple darshan is your priority, adjust the schedule to match the confirmed opening sessions.",
            duration: "Allow approximately 1–1.5 hours, depending on your destination and traffic",
            type: "travel",
          },
        ],
      },
    ],
    sourceUrls: ["https://mandya.nic.in/"],
    verificationStatus: "unverified",
    imageCredit: "Photo: Sangama24 / Wikimedia Commons, CC BY-SA 3.0",
  },
  {
    slug: "chikmagalur-weekend-escape",
    name: "Chikmagalur",
    tagline: "Coffee country and Western Ghats scenery",
    description:
      "A hill-region getaway with coffee-growing landscapes, mountain viewpoints and opportunities for relaxed scenic drives.",
    heroImage: "/images/destinations/chikmagalur.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 180,
    duration: "2 days",
    budgetRange: "₹2,000–₹4,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Mountains", "Scenic drives", "Forests", "Photography"],
    moodTags: ["Adventurous", "Peaceful", "Weekend reset"],
    highlights: [
      "Coffee-growing landscapes",
      "Mountain viewpoints around the region",
      "Local Malnad food",
      "Scenic drives through the hills",
    ],
    thingsToCarry: ["Comfortable walking shoes", "Light rain jacket", "Water", "Warm layer"],
    importantNotes: [
      "Viewpoint access, weather and road conditions can change; check before departure.",
      "Do not enter private plantations without permission.",
      "Budget is indicative and accommodation prices vary.",
    ],
    recommendation:
      "Spend one night in the region and choose a small number of accessible viewpoints rather than trying to cover every attraction.",

    itinerary: [
      {
        day: 1,
        title: "Mountain Roads and Western Ghats Views",
        stops: [
          {
            time: "6:00 AM",
            title: "Depart from Mysuru",
            description:
              "Begin early for Chikkamagaluru. Allow time for breakfast, traffic, and the winding roads approaching the hill region.",
            duration: "Plan several hours for the drive; actual time depends on route and traffic",
            type: "travel",
            tip: "Check road and weather conditions before leaving. Avoid planning the day around an unverified sunrise time.",
          },
          {
            time: "9:30 AM",
            title: "Breakfast and prepare for the hills",
            description:
              "Take a breakfast break, refill drinking water, and confirm the day's route and access conditions before continuing toward the mountain circuit.",
            duration: "30–45 minutes",
            type: "food",
            tip: "Carry snacks and water because food options may be limited at some viewpoints.",
          },
          {
            time: "10:15 AM",
            title: "Drive toward Mullayanagiri",
            description:
              "Follow the approved route into the hills. Enjoy the changing scenery, but keep stops to designated safe places rather than narrow road shoulders.",
            duration: "Allow time for the winding hill road",
            type: "travel",
            tip: "Roads can be narrow with limited passing space. Drive slowly and follow any local traffic restrictions.",
          },
          {
            time: "11:00 AM",
            title: "Mullayanagiri summit area",
            description:
              "Park where permitted and climb the steps toward the summit temple and viewpoint if access and weather allow. Take time to appreciate the surrounding mountain landscape.",
            duration: "60–90 minutes",
            type: "highlight",
            tip: "Mist, wind, and rain can reduce visibility. Stay on established paths and avoid exposed edges.",
          },
          {
            time: "12:30 PM",
            title: "Lunch and rest",
            description:
              "Take a relaxed lunch break at a suitable open eatery along the route or back toward the town. Keep the schedule flexible if the mountain visit takes longer.",
            duration: "45–60 minutes",
            type: "food",
            tip: "Do not rely on every roadside outlet being open; carry a small backup snack.",
          },
          {
            time: "1:30 PM",
            title: "Seethalayyanagiri",
            description:
              "If the approach road is open and conditions are suitable, visit this nearby hill and temple area for another perspective on the mountain range.",
            duration: "30–45 minutes",
            type: "activity",
            tip: "Skip this stop if traffic, weather, or access restrictions make the hill road unsafe.",
          },
          {
            time: "2:30 PM",
            title: "Baba Budangiri and Datta Peeta area",
            description:
              "Continue along the hill circuit to explore the accessible viewpoints and the area's religious and cultural heritage. Follow current local instructions around places of worship.",
            duration: "45–60 minutes",
            type: "highlight",
            tip: "Confirm current access and parking arrangements before setting out. Be respectful of all worshippers and traditions.",
          },
          {
            time: "3:45 PM",
            title: "Manikyadhara Falls",
            description:
              "If access remains open and there is sufficient time, visit the waterfall viewpoint and surrounding landscape. Conditions and water flow vary by season.",
            duration: "30–45 minutes",
            type: "activity",
            tip: "Avoid slippery steps and unsafe edges. Follow posted instructions and do not enter restricted areas.",
          },
          {
            time: "5:00 PM",
            title: "Return toward Chikkamagaluru town",
            description:
              "Begin the return drive before it gets late. If the mountain circuit is delayed, prioritise a safe descent over adding another stop.",
            duration: "Allow time for the winding return road",
            type: "travel",
          },
          {
            time: "6:30 PM",
            title: "Dinner and overnight rest",
            description:
              "Have dinner in town and rest before the second day. Choose accommodation separately according to your budget and transport plans.",
            duration: "Evening",
            type: "rest",
            tip: "This itinerary does not include accommodation bookings or prices.",
          },
        ],
      },
      {
        day: 2,
        title: "Coffee Culture and a Relaxed Countryside Day",
        stops: [
          {
            time: "7:30 AM",
            title: "Breakfast in Chikkamagaluru",
            description:
              "Start with breakfast and review the day's weather, road conditions, and the opening arrangements for your chosen attractions.",
            duration: "45 minutes",
            type: "food",
          },
          {
            time: "8:30 AM",
            title: "Coffee estate experience",
            description:
              "Arrange a visit to a coffee estate that welcomes visitors. Learn about coffee cultivation, harvesting, processing, and the role of coffee in the region.",
            duration: "1–2 hours, depending on the estate",
            type: "activity",
            tip: "Ask the estate about visitor access, guided tours, fees, and photography permission in advance.",
          },
          {
            time: "10:45 AM",
            title: "Coffee Museum or local coffee experience",
            description:
              "If open to visitors, explore the Coffee Museum or choose a local café to learn more about the region's coffee culture.",
            duration: "45–60 minutes",
            type: "activity",
            tip: "Confirm the museum's current opening hours before relying on this stop.",
          },
          {
            time: "12:00 PM",
            title: "Lunch in town",
            description:
              "Take a relaxed lunch break and try regional food where available. Use this time to adjust the afternoon plan if the weather changes.",
            duration: "45–60 minutes",
            type: "food",
          },
          {
            time: "1:15 PM",
            title: "Hirekolale Lake",
            description:
              "If access and conditions permit, visit the lake area for scenic views and photography. Keep to publicly accessible areas and respect any local restrictions.",
            duration: "45–60 minutes",
            type: "highlight",
            tip: "Avoid unsafe banks and entering the water. Check local conditions after heavy rain.",
          },
          {
            time: "2:30 PM",
            title: "Ratnagiri Bore or Mahatma Gandhi Park",
            description:
              "Consider a relaxed visit to the park area if it is open and fits your route. Enjoy the surroundings without rushing between distant attractions.",
            duration: "45–60 minutes",
            type: "activity",
            tip: "Check current entry arrangements and available facilities before visiting.",
          },
          {
            time: "3:45 PM",
            title: "Coffee stop and local shopping",
            description:
              "Pause for coffee and, if desired, buy locally produced coffee or spices from a reputable seller.",
            duration: "30–45 minutes",
            type: "rest",
            tip: "Check product labels and packaging if you plan to carry purchases home.",
          },
          {
            time: "4:30 PM",
            title: "Begin the return journey",
            description:
              "Depart for Mysuru with enough daylight and rest breaks. Adjust departure time to your transport method and the actual distance to your starting point.",
            duration: "Allow several hours for the drive",
            type: "travel",
            tip: "If travelling by public transport, check the actual service schedule rather than relying on this road-trip sequence.",
          },
        ],
      },
    ],
    sourceUrls: ["https://chikkamagaluru.nic.in/"],
    verificationStatus: "unverified",
    imageCredit: "Photo: Anand Osuri / Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    slug: "wayanad-nature-escape",
    name: "Wayanad",
    tagline: "Forest landscapes and a slower weekend",
    description:
      "A longer nature escape in Kerala with forested hills, scenic viewpoints and opportunities to explore permitted attractions at a relaxed pace.",
    heroImage: "/images/destinations/wayanad.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 130,
    duration: "2 days",
    budgetRange: "₹2,000–₹4,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Forests", "Mountains", "Photography", "Scenic drives"],
    moodTags: ["Peaceful", "Adventurous", "Weekend reset"],
    highlights: [
      "Western Ghats landscapes",
      "Forest and hill viewpoints",
      "Local Kerala cuisine",
      "Nature-oriented day trips",
    ],
    thingsToCarry: ["Comfortable walking shoes", "Rain jacket", "Insect repellent", "Water"],
    importantNotes: [
      "This is a broad regional itinerary; choose specific attractions after checking current access and travel distances.",
      "Forest areas may have entry restrictions and require authorised guides or permits.",
      "Check current road conditions, weather and accommodation costs before travelling.",
      "Budget is indicative and has not been verified.",
    ],
    recommendation:
      "Use this as a two-day regional plan and select a small number of nearby attractions once accommodation and current access are confirmed.",

    itinerary: [
      {
        day: 1,
        title: "Ancient Caves and Wayanad's Heritage",
        stops: [
          {
            time: "6:00 AM",
            title: "Depart from Mysuru",
            description:
              "Start early for the drive towards Wayanad. Choose your destination base and route in advance, and allow extra time for the hill roads and any forest-route restrictions.",
            duration: "3–4+ hours, depending on the destination and traffic",
            type: "travel",
            tip: "Check the route before departure. Forest roads can have regulated passage timings, so do not assume every route is open at all hours."
          },
          {
            time: "9:30 AM",
            title: "Breakfast and arrival break",
            description:
              "Stop for breakfast around Sulthan Bathery or another town along your route. Refill water, use the facilities and prepare for a walk with uphill sections.",
            duration: "30–45 minutes",
            type: "food",
            tip: "Carry drinking water and a small snack. Keep some flexibility in the schedule for road delays."
          },
          {
            time: "10:15 AM",
            title: "Explore Edakkal Caves",
            description:
              "Walk up Ambukuthi Hill to visit the famous prehistoric rock shelter. Look for the ancient engravings and pictorial markings that make this site important to the history of early human settlement in the region.",
            duration: "1.5–2.5 hours, including the approach walk",
            type: "highlight",
            tip: "The approach includes uphill walking and steps. Wear shoes with good grip, carry water and confirm entry availability before setting out. The official tourism listing currently notes Monday closures and offline ticketing."
          },
          {
            time: "12:45 PM",
            title: "Lunch near Ambalavayal",
            description:
              "Take a proper lunch break after the climb. Try local Kerala meals or choose a simple restaurant convenient for the next stop.",
            duration: "45–60 minutes",
            type: "food",
            tip: "Keep the afternoon relaxed rather than rushing between attractions."
          },
          {
            time: "1:45 PM",
            title: "Visit Wayanad Heritage Museum",
            description:
              "Explore regional archaeological objects and cultural exhibits that provide context for Wayanad's history and its earlier communities.",
            duration: "45–60 minutes",
            type: "activity",
            tip: "Check the museum's current opening status and entry arrangements before visiting."
          },
          {
            time: "3:00 PM",
            title: "Discover the Sulthan Bathery heritage area",
            description:
              "If time and opening arrangements permit, visit the historic Jain Temple area and appreciate its distinctive architecture and heritage. Keep this stop short if you are tired after Edakkal.",
            duration: "30–45 minutes",
            type: "activity",
            tip: "Respect any worship or access restrictions, and verify current visiting hours locally."
          },
          {
            time: "4:00 PM",
            title: "Scenic drive and photo breaks",
            description:
              "Continue towards your chosen overnight base. Enjoy the green countryside, plantations and changing hill scenery from safe stopping points.",
            duration: "45–90 minutes, depending on your route",
            type: "travel",
            tip: "Only stop where parking is safe and permitted. Avoid stepping into private plantations without permission."
          },
          {
            time: "6:00 PM",
            title: "Dinner and overnight rest",
            description:
              "Check in to your independently arranged stay, freshen up and enjoy dinner. Use the evening to plan the next day's route and check weather and attraction updates.",
            duration: "Evening",
            type: "rest",
            tip: "Accommodation is not included in this itinerary. Choose a base that makes the following day's attractions and your return route practical."
          }
        ]
      },
      {
        day: 2,
        title: "Misty Viewpoints and a Peaceful Lake",
        stops: [
          {
            time: "7:00 AM",
            title: "Breakfast and morning departure",
            description:
              "Have breakfast and set out early. Keep your day flexible depending on the location of your stay and the weather in the hills.",
            duration: "45 minutes",
            type: "food",
            tip: "Carry a light rain jacket, water and a charged phone. Mist can reduce visibility on hill roads."
          },
          {
            time: "8:30 AM",
            title: "Lakkidi Viewpoint",
            description:
              "Pause at this well-known viewpoint near the mountain pass for broad views across the forested valleys. On a clear morning, the layered hills make a beautiful photography stop.",
            duration: "20–40 minutes",
            type: "highlight",
            tip: "Views depend on cloud cover and weather. Park only in designated or safe areas, and stay away from road edges."
          },
          {
            time: "9:15 AM",
            title: "Scenic drive through the Vythiri area",
            description:
              "Enjoy the winding roads and green landscapes around Vythiri. Take your time and use only safe, permitted pull-offs for photographs.",
            duration: "30–45 minutes",
            type: "travel",
            tip: "Drive slowly on wet or foggy roads and avoid stopping in traffic lanes."
          },
          {
            time: "10:00 AM",
            title: "Relax at Pookode Lake",
            description:
              "Spend a peaceful morning beside the freshwater lake, surrounded by forested hills. Walk along the lakeside paths and enjoy the natural setting; boating may be available depending on operating conditions.",
            duration: "1–1.5 hours",
            type: "highlight",
            tip: "Confirm current entry and boating availability before visiting. Follow local instructions and do not assume every activity operates during poor weather."
          },
          {
            time: "11:30 AM",
            title: "Coffee, tea or local snack break",
            description:
              "Take a short break at a suitable local café or food stop. This is a good opportunity to try regional snacks before the drive back.",
            duration: "30–45 minutes",
            type: "food",
            tip: "Choose a stop that fits your return route so you do not add unnecessary driving."
          },
          {
            time: "12:15 PM",
            title: "Optional plantation or local shopping stop",
            description:
              "If time permits, visit a public-facing local shop for coffee, spices or other regional products. A plantation visit should only be included if the owner or operator confirms access.",
            duration: "30–60 minutes",
            type: "activity",
            tip: "Avoid entering private estate roads or fields without permission. Skip this stop if you need to begin the return journey early."
          },
          {
            time: "1:15 PM",
            title: "Lunch before the return drive",
            description:
              "Have lunch and check the estimated driving time, weather and road conditions before leaving Wayanad.",
            duration: "45–60 minutes",
            type: "food",
            tip: "Keep some buffer time for traffic, rain and regulated forest-road passage."
          },
          {
            time: "2:15 PM",
            title: "Begin the return journey to Mysuru",
            description:
              "Start back using a currently permitted route. Plan for breaks as needed, and avoid trying to fit in distant attractions at the last minute.",
            duration: "3–4+ hours, depending on the route and traffic",
            type: "travel",
            tip: "The return time is an estimate, not a guarantee. Check current route restrictions before departure and avoid driving when tired."
          },
          {
            time: "6:30 PM",
            title: "Arrive back in Mysuru",
            description:
              "Finish the weekend with time to unpack, rest and save your favourite photographs from Wayanad.",
            duration: "Arrival time varies",
            type: "rest",
            tip: "If you leave late or encounter delays, prioritise a safe return over completing every optional stop."
          }
        ]
      }
    ],
    sourceUrls: ["https://wayanad.gov.in/"],
    verificationStatus: "unverified",
    imageCredit: "Wikimedia Commons — author and license verification pending",
  },
];
