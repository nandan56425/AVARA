import type { Trail } from "@/types";

export const mockTrails: Trail[] = [
  {
    slug: "kumara-parvatha-trek",
    name: "Kumara Parvatha",
    tagline: "One of Karnataka's most rewarding summit treks",
    description:
      "A challenging multi-day trek through dense forest to one of the highest peaks in Coorg. The trail rewards with panoramic views of the Western Ghats.",
    heroImage: "/images/trails/kumara-parvatha.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 210,
    trailLengthKm: 22, // Approximate; confirm route and round-trip distance
    duration: "2 days",
    difficulty: "Challenging",
    budgetRange: "₹1,000–₹2,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Treks", "Mountains", "Forests"],
    elevationGain: "Approx. 1,400 m — unverified",
    highlights: [
      "Summit views of the Western Ghats",
      "Dense shola forests",
      "Camping under stars at Bhattara Mane",
      "Pushpagiri Wildlife Sanctuary",
    ],
    thingsToCarry: [
      "Trekking shoes with good ankle support",
      "2-3 litres of water",
      "Energy bars and trail food",
      "Headlamp/torch",
      "First aid kit",
      "Rain poncho",
    ],
    safetyNotes: [
      "Do not trek solo; arrange experienced guidance and plan for the route's physical demands",
      "Avoid trekking during heavy monsoon conditions",
      "Leeches are common during wet conditions; carry suitable leech protection",
      "Check current forest-department access rules, mandatory registration requirements, and daily visitor capacity limits before travelling",
      "Verify current overnight-stay and camping permissions at Bhattara Mane or forest checkpoints with authorities in advance",
      "Camping is not allowed on the summit. Camping at designated points requires forest-department permission",
      "Planning advisory: Trail regulations, permit requirements, and access rules can change. Verify current guidelines and safety information with official forest authorities before travelling",
    ],
    recommendation:
      "This is a proper trek, not a casual walk. Come prepared, start early, and carry more water than you think you'll need.",
    itinerary: [
      {
        day: 1,
        title: "Trailhead to permitted overnight stop",
        stops: [
          {
            time: "04:00",
            title: "Leave Mysuru",
            description: "Drive to Kukke Subramanya / trailhead.",
            duration: "4h",
            type: "travel",
          },
          {
            time: "08:30",
            title: "Register and start trek",
            description: "Confirm current forest registration, permitted start times, and access requirements before beginning the trek.",
            duration: "30 min",
            type: "activity",
          },
          {
            time: "09:00",
            title: "Trek to Bhattara Mane",
            description: "Steady climb through forest. Pace yourself.",
            duration: "5-6h",
            type: "highlight",
            tip: "Take breaks every 45 minutes. Don't rush the first half.",
          },
          {
            time: "15:00",
            title: "Reach permitted overnight stop",
            description: "Rest only at an authorised overnight location. Confirm current accommodation and camping permissions in advance.",
            duration: "Evening",
            type: "rest",
          },
        ],
      },
      {
        day: 2,
        title: "Summit push and descent",
        stops: [
          {
            time: "04:30",
            title: "Start summit push",
            description: "Attempt the summit only if current access rules, weather, daylight, and your group's condition allow it. Follow official start-time restrictions.",
            duration: "2-3h",
            type: "highlight",
            tip: "The last section is steep and exposed. Take it slow.",
          },
          {
            time: "07:00",
            title: "Summit",
            description: "Panoramic views of the Western Ghats on a clear morning.",
            duration: "30 min",
            type: "highlight",
          },
          {
            time: "07:30",
            title: "Begin descent",
            description: "Descend back to the base. Knees will feel it.",
            duration: "4-5h",
            type: "activity",
          },
          {
            time: "13:00",
            title: "Reach base and drive back",
            description: "Rest, eat, and begin the drive home.",
            duration: "4h",
            type: "travel",
          },
        ],
      },
    ],
    featured: true,
    sourceUrls: [
      "https://karnatakatourism.org/en/attractions/kumara-parvatha",
      "https://karnatakatourism.org/en/experiences/trekking-to-kumara-parvatha",
    ],
    verificationStatus: "partially-verified",
  },
  {
    slug: "skandagiri-night-trek",
    name: "Skandagiri Night Trek",
    tagline: "Moonlit trail to a sunrise summit",
    description:
      "A popular night trek from Bengaluru that starts in darkness and ends with sunrise above the clouds. The trail is moderate and well-marked.",
    heroImage: "/images/trails/skandagiri.jpg",
    images: [],
    startingCity: "Bengaluru",
    distanceKm: 70,
    trailLengthKm: 8,
    duration: "Half day",
    difficulty: "Moderate",
    budgetRange: "Under ₹1,000",
    bestSeason: "Winter",
    experienceTags: ["Treks", "Sunrise", "Photography"],
    elevationGain: "~600m",
    highlights: [
      "Night trek under stars",
      "Sunrise above the cloud line",
      "Ruins of an old fort at the top",
      "Cool pre-dawn air",
    ],
    thingsToCarry: [
      "Headlamp or torch (essential)",
      "Warm layers for the summit wait",
      "1-2 litres of water",
      "Light snacks",
      "Comfortable trekking shoes",
    ],
    safetyNotes: [
      "Check the official booking portal and secure a valid booking before attempting entry",
      "Verify current forest-entry regulations, registration requirements, permitted trek timings, and checkpoint guidelines before travelling",
      "Do not assume that night entry or a particular start time is permitted; follow the timings specified in your valid booking and current official instructions",
      "Do not venture off the marked trail in the dark",
      "Stay with your group",
      "Be careful on loose gravel sections near the top",
      "Planning advisory: Entry rules, slot availability, and safety guidelines must be verified through the official booking portal and authorities before planning your trip",
    ],
    recommendation:
      "The magic is in the timing. Start trekking around 2-3 AM to reach the summit before dawn. A full moon night makes the trail magical.",
    itinerary: [
      {
        day: 1,
        title: "Night trek to sunrise",
        stops: [
          {
            time: "01:00",
            title: "Leave Bengaluru",
            description: "Travel to the base, allowing for traffic and enough time to meet the reporting window stated in your valid booking.",
            duration: "1.5h",
            type: "travel",
          },
          {
            time: "04:00",
            title: "Start the trek",
            description: "Begin only at the time authorised by your booking and the forest checkpoint. Use a headlamp and follow official instructions.",
            duration: "2.5h",
            type: "activity",
          },
          {
            time: "06:30",
            title: "Reach the summit",
            description: "Enjoy the summit views if access and conditions permit. Arrival time depends on the authorised start, pace, weather and trail conditions.",
            duration: "30 min",
            type: "rest",
          },
          {
            time: "Around Sunrise",
            title: "Sunrise",
            description: "Watch the sunrise if weather and visibility allow. Sunrise time varies by date, so check the local forecast and sunrise time before travelling.",
            duration: "30 min",
            type: "highlight",
          },
          {
            time: "07:00",
            title: "Explore ruins and descend",
            description: "Explore accessible areas only where permitted, then descend carefully along the designated trail, following current instructions.",
            duration: "2h",
            type: "activity",
          },
          {
            time: "09:00",
            title: "Breakfast and drive back",
            description: "Have breakfast if suitable options are available, then return to Bengaluru, allowing for traffic and rest stops.",
            duration: "2h",
            type: "travel",
          },
        ],
      },
    ],
    featured: true,
    sourceUrls: [],
    verificationStatus: "unverified",
  },
  {
    slug: "tadiandamol-peak",
    name: "Tadiandamol Peak",
    tagline: "The highest peak in Coorg",
    description:
      "A moderately challenging trek to the highest point in Kodagu district. Rolling grasslands, wildflowers in season, and sweeping views from the summit.",
    heroImage: "/images/trails/tadiandamol.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 150,
    trailLengthKm: 12,
    duration: "1 day",
    difficulty: "Moderate",
    budgetRange: "₹1,000–₹2,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Treks", "Mountains", "Photography"],
    elevationGain: "~700m",
    highlights: [
      "Grassland ridge walk",
      "360-degree summit views",
      "Wildflowers in October-November",
      "Nalkunadu Palace en route",
    ],
    thingsToCarry: [
      "Trekking shoes",
      "Sunscreen and hat — exposed grassland sections",
      "2 litres of water",
      "Packed lunch",
    ],
    safetyNotes: [
      "Trail can be slippery in wet conditions",
      "No shade on the upper grasslands — start early",
      "Check current forest-department access rules, registration requirements, and daily capacity limits before travelling",
      "Verify current overnight-stay and camping permissions with forest authorities in advance",
      "Confirm whether an authorised guide is required under the current forest-department rules, and arrange one if required.",
      "Do not camp or stay overnight on the trail unless the relevant authorities explicitly permit it.",
      "Planning advisory: Access permissions, entry rules, and safety information must be verified with official forest authorities before your trip",
    ],
    recommendation:
      "Best combined with a Coorg weekend. Start the trek by 7 AM to avoid midday sun on the exposed upper trail.",
    itinerary: [
      {
        day: 1,
        title: "Trek day",
        stops: [
          {
            time: "04:00",
            title: "Leave Mysuru",
            description: "Early drive to the trailhead near Kakkabe.",
            duration: "3.5h",
            type: "travel",
          },
          {
            time: "07:30",
            title: "Start trek",
            description: "Begin the ascent through forest and open grasslands only after completing the required registration and receiving permission to enter.",
            duration: "3-4h",
            type: "highlight",
          },
          {
            time: "11:30",
            title: "Summit",
            description: "Enjoy the Western Ghats views if weather and visibility allow. Arrival time depends on your pace and current trail conditions.",
            duration: "45 min",
            type: "highlight",
          },
          {
            time: "12:15",
            title: "Lunch at summit",
            description: "Eat your packed lunch with a view.",
            duration: "30 min",
            type: "food",
          },
          {
            time: "12:30",
            title: "Descend",
            description: "Head back down — descent is easier but watch your knees.",
            duration: "2.5h",
            type: "activity",
          },
          {
            time: "15:30",
            title: "Drive back to Mysuru",
            description: "Return drive, perhaps with a tea stop.",
            duration: "3.5h",
            type: "travel",
          },
        ],
      },
    ],
    featured: true,
    sourceUrls: [
      "https://karnatakatourism.org/en/attractions/tadiandamol/",
      "https://karnatakatourism.org/en/experiences/tadiandamol-trek-experience",
      "https://kodagu.nic.in/en/tourism/adventures/",
    ],
    verificationStatus: "partially-verified",
  },
  {
    slug: "savandurga-day-trek",
    name: "Savandurga",
    tagline: "Asia's largest monolith, close to Bengaluru",
    description:
      "A short but steep trek up one of the largest monolith hills in Asia. Close enough to Bengaluru for a morning trek.",
    heroImage: "/images/trails/savandurga.jpg",
    images: [],
    startingCity: "Bengaluru",
    distanceKm: 50,
    trailLengthKm: 5,
    duration: "Half day",
    difficulty: "Challenging",
    budgetRange: "Under ₹1,000",
    bestSeason: "Winter",
    experienceTags: ["Treks", "Sunrise"],
    elevationGain: "~350m",
    highlights: [
      "Massive monolith rock face",
      "Views of Manchanabele reservoir",
      "Quick escape from the city",
    ],
    thingsToCarry: [
      "Good grip shoes — rocky trail",
      "Water",
      "Sunscreen",
    ],
    safetyNotes: [
      "Steep rocky sections on the monolith can be slippery — avoid trekking during or immediately after rain",
      "Wear footwear with reliable grip for traction on the exposed rock face",
      "Start early to avoid heat and direct sun exposure on the bare rock",
      "Do not attempt exposed or slippery sections when weather or trail conditions are unsafe",
      "Verify current trail access rules, registration requirements, and any applicable permissions before travelling",
      "Planning advisory: Check current local weather forecasts and trail access conditions before visiting",
    ],
    recommendation:
      "Suitable for trekkers with reasonable fitness wanting a quick morning climb without a long drive. Combine with breakfast at Manchanabele.",
    itinerary: [
      {
        day: 1,
        title: "Morning trek",
        stops: [
          {
            time: "05:00",
            title: "Leave Bengaluru",
            description: "Short drive to the trailhead.",
            duration: "1h",
            type: "travel",
          },
          {
            time: "06:30",
            title: "Start trek",
            description: "Begin the ascent only if current trail access and weather conditions are suitable. Follow the designated route and allow for your group's pace.",
            duration: "1.5h",
            type: "activity",
          },
          {
            time: "08:30",
            title: "Summit views",
            description: "Enjoy the reservoir and surrounding plains views if visibility allows. Summit arrival depends on your pace and trail conditions.",
            duration: "30 min",
            type: "highlight",
          },
          {
            time: "09:00",
            title: "Descend and breakfast",
            description: "Descend carefully along the designated route, then have breakfast if suitable options are available nearby.",
            duration: "2h",
            type: "activity",
          },
          {
            time: "10:00",
            title: "Drive back",
            description: "Back to the city before it gets hot.",
            duration: "1h",
            type: "travel",
          },
        ],
      },
    ],
    sourceUrls: [],
    verificationStatus: "unverified",
  },

  {
    slug: "makalidurga-day-trek",
    name: "Makalidurga Trek",
    tagline: "A rocky hilltop adventure near Bengaluru",
    description:
      "A hill trek through rocky terrain leading toward a hilltop with scenic views. Check current trail access, railway-area restrictions, and any booking requirements before travelling.",
    heroImage: "/images/trails/makalidurga.jpg",
    images: [],
    startingCity: "Bengaluru",
    distanceKm: 60,
    trailLengthKm: 8,
    duration: "Half day",
    difficulty: "Moderate",
    budgetRange: "Under ₹1,000",
    bestSeason: "Winter",
    experienceTags: ["Treks", "Sunrise", "Photography"],
    elevationGain: "Confirm current route details before the trek",
    highlights: [
      "Rocky hillside trail",
      "Views of the surrounding landscape",
      "A rewarding outdoor challenge",
    ],
    thingsToCarry: [
      "Water",
      "Comfortable trekking shoes",
      "Snacks",
      "Sun protection",
      "Fully charged phone",
    ],
    safetyNotes: [
      "Confirm current access rules and booking requirements with official sources.",
      "Avoid stepping onto railway tracks or restricted railway property.",
      "Start only with sufficient daylight and suitable weather.",
      "Wear shoes with good grip on rocky sections.",
    ],
    recommendation:
      "A good option for trekkers seeking a half-day outdoor adventure from Bengaluru, subject to current access rules.",

    itinerary: [
      {
        day: 1,
        title: "Rocky Ascent to Makalidurga Fort",
        stops: [
          {
            time: "4:30 AM",
            title: "Depart Bengaluru",
            description:
              "Leave early for Makalidurga near Doddaballapura. Check your booked trek slot, route and expected reporting time before starting the journey.",
            duration: "Approximately 1.5–2 hours by road, depending on traffic",
            type: "travel",
            tip: "If travelling by train, check the current timetable and confirm how you will reach the designated reporting point."
          },
          {
            time: "6:00 AM",
            title: "Report at the designated trek base",
            description:
              "Reach the reporting location specified in your booking, allow time for verification and follow the forest staff's instructions before starting.",
            duration: "15–30 minutes",
            type: "activity",
            tip: "Book through the official Aranya Vihaara portal and carry the required original photo ID. Follow the reporting time and entry slot on your confirmation."
          },
          {
            time: "6:30 AM",
            title: "Begin the Makalidurga trail",
            description:
              "Start the uphill walk through rocky terrain and open hillside sections. Set a steady pace, watch your footing and take short breaks when needed.",
            duration: "2–3 hours to the summit, depending on pace and conditions",
            type: "activity",
            tip: "The trail is moderately difficult. Wear grippy trekking shoes, carry sufficient drinking water and remain with your group."
          },
          {
            time: "7:15 AM",
            title: "Rocky trail and viewpoint pauses",
            description:
              "As the path climbs, pause at safe designated spots to catch your breath and observe the surrounding hills, railway line and landscape around Gundamagere Lake.",
            duration: "15–20 minutes in total, as needed",
            type: "highlight",
            tip: "The terrain can be slippery after rain. Avoid climbing unmarked rocks or approaching exposed edges for photographs."
          },
          {
            time: "8:00 AM",
            title: "Reach the summit and explore the fort",
            description:
              "At the top, explore the remains of Makalidurga Fort and take in the broad views across the surrounding countryside. Notice the contrast between the rocky summit, nearby lake and railway line below.",
            duration: "30–45 minutes",
            type: "highlight",
            tip: "Explore only accessible areas and respect any restricted sections or instructions from your trek guide."
          },
          {
            time: "8:30 AM",
            title: "Visit the hilltop Shiva temple",
            description:
              "If access is permitted, spend a quiet moment near the small Shiva temple at the summit. Appreciate the site's religious and historical significance without disturbing other visitors.",
            duration: "10–15 minutes",
            type: "activity",
            tip: "Treat this as part of your summit visit rather than a separate destination. Follow local customs and any access restrictions."
          },
          {
            time: "9:00 AM",
            title: "Begin the descent",
            description:
              "Return along the authorised route, taking extra care on steep and loose rocky sections. Keep a comfortable distance between trekkers and avoid rushing downhill.",
            duration: "1.5–2.5 hours, depending on conditions",
            type: "activity",
            tip: "Descending can be harder on the knees and requires careful footing. Follow the guide's instructions and do not leave the marked route."
          },
          {
            time: "11:00 AM",
            title: "Complete the trek and rest",
            description:
              "Once back at the designated base, rest, hydrate and check that everyone in your group has finished safely.",
            duration: "20–30 minutes",
            type: "rest",
            tip: "Carry all your wrappers and waste back with you. Follow the site's plastic and litter restrictions."
          },
          {
            time: "11:30 AM",
            title: "Early lunch near Doddaballapura",
            description:
              "Stop at a suitable restaurant for a filling meal after the trek. Keep the break relaxed and replenish fluids before travelling back.",
            duration: "45–60 minutes",
            type: "food",
            tip: "Food and water may not be available along the trail, so bring your own supplies for the climb."
          },
          {
            time: "12:30 PM",
            title: "Return journey to Bengaluru",
            description:
              "Begin the drive back after lunch. If time and energy permit, take a short break on the way, but avoid adding a distant attraction that makes the return tiring.",
            duration: "Approximately 1.5–2 hours, depending on traffic",
            type: "travel",
            tip: "These are illustrative timings. Your actual schedule depends on the authorised slot, weather, trail conditions and the pace of your group."
          },
          {
            time: "2:30 PM",
            title: "Weekend trek complete",
            description:
              "Return to Bengaluru with time to rest after a morning of rocky climbing, hilltop views and local heritage.",
            duration: "Arrival time varies",
            type: "rest",
            tip: "If the trek is closed or slots are unavailable, reschedule rather than attempting an unauthorised ascent."
          }
        ]
      }
    ],
    sourceUrls: ["https://karnatakatourism.org/"],
    verificationStatus: "unverified",
    imageCredit: "Photo: Firos AK / Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    slug: "kunti-betta-trek",
    name: "Kunti Betta Trek",
    tagline: "Rocky hills and open views near Pandavapura",
    description:
      "A rocky hill trek near Pandavapura that offers an outdoor escape and elevated views of the surrounding countryside. Confirm current access and local conditions before departure.",
    heroImage: "/images/trails/kunti-betta.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 35,
    trailLengthKm: 5,
    duration: "Half day",
    difficulty: "Moderate",
    budgetRange: "Under ₹1,000",
    bestSeason: "Winter",
    experienceTags: ["Treks", "Sunrise", "Photography"],
    elevationGain: "Confirm current route details before the trek",
    highlights: [
      "Rocky hill terrain",
      "Open countryside views",
      "A short outdoor escape from Mysuru",
    ],
    thingsToCarry: [
      "Water",
      "Trekking shoes",
      "Light snacks",
      "Torch for an early start",
      "Sun protection",
    ],
    safetyNotes: [
      "Confirm local access rules before travelling.",
      "Rocky sections can be slippery after rain.",
      "Carry enough water and avoid exposed edges.",
      "For a sunrise trek, plan transport and timing in advance.",
    ],
    recommendation:
      "Suitable for a short trekking outing from Mysuru, provided conditions and access are suitable.",

    itinerary: [
      {
        day: 1,
        title: "Sunrise at Kunti Betta",
        stops: [
          {
            time: "2:30 AM",
            title: "Depart for Pandavapura",
            description:
              "Leave Mysuru or your starting point early enough to reach the Kunti Betta trailhead before dawn. If travelling from Bengaluru, allow considerably more time for the drive or consider a confirmed organised trip.",
            duration: "Travel time depends on your starting city",
            type: "travel",
            tip: "Check the weather, route conditions and current access status before leaving. Avoid driving when tired."
          },
          {
            time: "4:00 AM",
            title: "Arrive at the trailhead",
            description:
              "Park only in a suitable designated area, gather your group and prepare for the climb. The route begins near the Sri Mallikarjuna Swamy Temple at the foot of the hill.",
            duration: "15–20 minutes",
            type: "activity",
            tip: "Carry a charged phone, a headlamp or torch, a government-issued photo ID and sufficient water. Do not assume night access is permitted without checking locally."
          },
          {
            time: "4:20 AM",
            title: "Walk towards the main trail",
            description:
              "Pass the temple approach and follow the established path towards the hill. Pay attention at trail junctions and make sure you are following the correct route rather than climbing a neighbouring hill by mistake.",
            duration: "15–25 minutes",
            type: "activity",
            tip: "If you are unfamiliar with the route, use a reliable local guide or an authorised organised trek. Keep your group together in the dark."
          },
          {
            time: "4:45 AM",
            title: "Begin the rocky ascent",
            description:
              "Start climbing the granite hillside at a steady pace. The route includes uneven rock, steeper sections and places where careful foot placement is important.",
            duration: "45–75 minutes, depending on pace and conditions",
            type: "activity",
            tip: "Use your headlamp to illuminate the next foothold. Avoid scrambling up unmarked rock faces or attempting difficult sections just to save time."
          },
          {
            time: "5:30 AM",
            title: "Reach the summit area",
            description:
              "Find a safe place to rest near the summit and allow your eyes to adjust as the sky begins to brighten. On a clear morning, the surrounding hills, agricultural landscape and lake create a striking sunrise setting.",
            duration: "30–45 minutes",
            type: "highlight",
            tip: "Sunrise timing varies by season and weather. Clouds may obscure the view, so enjoy the landscape without expecting a guaranteed cloud-bed or sunrise spectacle."
          },
          {
            time: "6:00 AM",
            title: "Enjoy the summit views",
            description:
              "Take landscape photographs, observe the rocky twin-hill terrain and enjoy the cooler early-morning air. Rest and have a small snack before starting down.",
            duration: "20–30 minutes",
            type: "activity",
            tip: "Stay well back from exposed edges, avoid standing on unstable boulders for photographs and pack out all waste."
          },
          {
            time: "6:30 AM",
            title: "Start the descent",
            description:
              "Retrace the established route carefully. Descending the rocky sections may require more attention than climbing, particularly if the rocks are damp.",
            duration: "45–75 minutes, depending on conditions",
            type: "activity",
            tip: "Do not run downhill or take shortcuts. If the rocks are slippery, slow down and follow the safest route advised by your guide."
          },
          {
            time: "7:45 AM",
            title: "Return to the trailhead",
            description:
              "Finish the climb near the temple and take a short recovery break. Rehydrate, stretch gently and check that everyone in your group has returned.",
            duration: "15–20 minutes",
            type: "rest",
            tip: "The schedule is indicative. Group pace, weather and the actual route may change the completion time."
          },
          {
            time: "8:00 AM",
            title: "Breakfast in Pandavapura",
            description:
              "Find a local restaurant for a South Indian breakfast and a hot drink. Enjoy a relaxed meal after the early start.",
            duration: "45–60 minutes",
            type: "food",
            tip: "Food stalls may not be open early, so carry a small snack and enough water in case you need to wait."
          },
          {
            time: "9:00 AM",
            title: "Optional stop near Hirode Kere",
            description:
              "If access is permitted and the group still has time, enjoy a short view of Hirode Kere near the base. Keep the stop peaceful and avoid entering private land or unsafe water edges.",
            duration: "20–30 minutes",
            type: "highlight",
            tip: "This is optional. Skip it if the area is restricted, the weather is poor or you need to begin your return journey."
          },
          {
            time: "9:45 AM",
            title: "Begin the return journey",
            description:
              "Start back towards Mysuru or Bengaluru, depending on your original route. Take a break if you feel sleepy after the early-morning trek.",
            duration: "Travel time depends on your destination and traffic",
            type: "travel",
            tip: "Do not drive while exhausted. Arrange a rested driver or alternative transport if needed."
          },
          {
            time: "11:30 AM",
            title: "Trek complete",
            description:
              "Wrap up your half-day outdoor adventure with a sunrise, a rocky hill climb and views across the Mandya countryside.",
            duration: "Arrival time varies",
            type: "rest",
            tip: "This is a sample schedule, not a guaranteed access slot. Confirm current route permissions and any applicable booking requirements before departure."
          }
        ]
      }
    ],
    sourceUrls: ["https://mandya.nic.in/"],
    verificationStatus: "unverified",
    imageCredit: "Photo: Prashanth Shivanna / Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    slug: "mullayanagiri-summit-trek",
    name: "Mullayanagiri Trek",
    tagline: "A mountain adventure in the Chikkamagaluru hills",
    description:
      "Explore a mountain landscape around Mullayanagiri near Chikkamagaluru. Route difficulty, access arrangements, and the amount of walking required depend on the chosen starting point and current conditions.",
    heroImage: "/images/trails/mullayanagiri.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 180,
    trailLengthKm: 5,
    duration: "1 day",
    difficulty: "Moderate",
    budgetRange: "₹1,000–₹2,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Treks", "Mountains", "Photography", "Scenic drives"],
    elevationGain: "Route-dependent; verify before departure",
    highlights: [
      "Mountain scenery",
      "Views across the surrounding hills",
      "A combination of scenic driving and walking",
    ],
    thingsToCarry: [
      "Water",
      "Trekking shoes",
      "Light rain protection",
      "Warm layer",
      "Snacks",
    ],
    safetyNotes: [
      "Check weather, road conditions, and current access guidance.",
      "Mountain weather can change quickly; avoid exposed areas during storms.",
      "Confirm whether any route-specific booking or permission is needed.",
      "Allow enough time for the return journey to Mysuru.",
    ],
    recommendation:
      "A scenic mountain outing for travellers who want to combine a drive with a trek. Confirm the route and current conditions before setting out.",

    itinerary: [
      {
        day: 1,
        title: "Climbing Karnataka's Highest Peak",
        stops: [
          {
            time: "5:30 AM",
            title: "Depart Chikkamagaluru town",
            description:
              "Start early for the Mullayanagiri area. Arrange transport to the authorised trailhead at Sarpadari and confirm the return pickup plan before beginning the trek.",
            duration: "Approximately 30–60 minutes, depending on the start point and road conditions",
            type: "travel",
            tip: "If travelling from Mysuru or Bengaluru, consider reaching Chikkamagaluru the previous evening rather than attempting a long drive and the trek on the same morning."
          },
          {
            time: "6:15 AM",
            title: "Prepare at Sarpadari trailhead",
            description:
              "Check your footwear, water, snacks, weather and route. Take a few minutes to warm up before beginning the uphill climb.",
            duration: "15–20 minutes",
            type: "activity",
            tip: "Carry enough water for the full hike; do not rely on finding refill points along the trail. Confirm current trail access and any local restrictions before starting."
          },
          {
            time: "6:35 AM",
            title: "Begin the ascent through rocky terrain",
            description:
              "Follow the established route uphill towards Mullayanagiri. The initial section can be steep, so keep a steady pace and use stable footholds rather than rushing.",
            duration: "1.5–2.5 hours, depending on fitness and trail conditions",
            type: "activity",
            tip: "Wear sturdy shoes with good grip. Avoid the steepest sections during heavy rain or when the rocks are slippery."
          },
          {
            time: "7:15 AM",
            title: "Pause at safe viewpoints",
            description:
              "Take short breaks at safe places along the ascent to catch your breath and look across the Western Ghats. The changing perspective reveals ridgelines, valleys and the surrounding hills.",
            duration: "10–15 minutes in total, as needed",
            type: "highlight",
            tip: "Views depend on the weather. Keep away from exposed edges and never leave the established path to find a better photograph."
          },
          {
            time: "8:15 AM",
            title: "Continue towards the summit",
            description:
              "Complete the remaining uphill sections at a comfortable pace. Stay with your group and leave enough energy for the return journey.",
            duration: "30–60 minutes, depending on the starting point and conditions",
            type: "activity",
            tip: "If fatigue, poor visibility or unsafe conditions develop, turn back rather than forcing the summit."
          },
          {
            time: "9:00 AM",
            title: "Explore Mullayanagiri summit",
            description:
              "Reach the summit area of Karnataka's highest peak and enjoy the wide views over the surrounding mountain landscape. Take time to rest and appreciate the scale of the Western Ghats.",
            duration: "20–30 minutes",
            type: "highlight",
            tip: "Strong winds, clouds and low visibility can arrive quickly. Keep a warm layer handy and remain within safe viewing areas."
          },
          {
            time: "9:30 AM",
            title: "Visit Mullappa Swamy Temple",
            description:
              "Visit the small temple at the summit if it is open. Take a quiet moment to appreciate the site's spiritual significance and respect worshippers.",
            duration: "15–20 minutes",
            type: "activity",
            tip: "Temple access depends on its operating hours and local arrangements. Follow posted rules and avoid entering restricted areas."
          },
          {
            time: "10:00 AM",
            title: "Rest and have a trail snack",
            description:
              "Take a short break before descending. Drink water, eat a light snack and check that everyone is ready for the return route.",
            duration: "15–20 minutes",
            type: "rest",
            tip: "Pack out all wrappers and waste. Avoid leaving food scraps on the hillside."
          },
          {
            time: "10:20 AM",
            title: "Descend carefully",
            description:
              "Retrace the established route towards Sarpadari, taking particular care on steep or loose sections. Keep a controlled pace and allow space between trekkers.",
            duration: "1.5–2.5 hours, depending on conditions",
            type: "activity",
            tip: "Descending can put additional strain on your knees. Use secure footholds, and do not attempt shortcuts or unmarked cliff-side routes."
          },
          {
            time: "12:30 PM",
            title: "Finish the hike and recover",
            description:
              "Return to the trailhead, rest and rehydrate. Check that everyone has completed the trek before leaving the area.",
            duration: "20–30 minutes",
            type: "rest",
            tip: "Completion time is an estimate. The actual duration depends on fitness, weather, route access and the pace of your group."
          },
          {
            time: "1:00 PM",
            title: "Lunch in Chikkamagaluru",
            description:
              "Travel back towards town for a filling meal. A relaxed lunch is a good way to recover after the climb.",
            duration: "45–60 minutes",
            type: "food",
            tip: "Arrange your pickup in advance; transport from the trailhead may not be readily available whenever you finish."
          },
          {
            time: "2:15 PM",
            title: "Optional scenic stop at Hirekolale Lake",
            description:
              "If access is open and you still have time and energy, make a short stop at Hirekolale Lake to enjoy the mountain backdrop and peaceful surroundings.",
            duration: "30–45 minutes",
            type: "highlight",
            tip: "This is an optional add-on, not part of the trek. Respect any local restrictions and do not enter the water."
          },
          {
            time: "3:15 PM",
            title: "Return or continue your Chikkamagaluru stay",
            description:
              "End the trek-focused day with a return to your accommodation or begin your onward journey if you have arranged safe transport and adequate rest.",
            duration: "Depends on your destination",
            type: "travel",
            tip: "For a return to Mysuru or Bengaluru, allow several hours and avoid driving while exhausted after the hike."
          }
        ]
      }
    ],
    sourceUrls: ["https://chikkamagaluru.nic.in/"],
    verificationStatus: "unverified",
    imageCredit: "Photo: RakeshRaju M / Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    slug: "kudremukh-national-park-trek",
    name: "Kudremukh Trek",
    tagline: "A forested mountain trail through the Western Ghats",
    description:
      "A mountain trek in the Kudremukh region, known for its Western Ghats landscape. Access, permitted routes, guide arrangements, and booking requirements must be confirmed with the relevant authorities before travel.",
    heroImage: "/images/trails/kudremukh.jpg",
    images: [],
    startingCity: "Mysuru",
    distanceKm: 250,
    trailLengthKm: 20,
    duration: "1 day",
    difficulty: "Challenging",
    budgetRange: "₹1,000–₹2,000",
    bestSeason: "Post-monsoon",
    experienceTags: ["Treks", "Mountains", "Forests", "Photography"],
    elevationGain: "Route-specific; verify official trail details",
    highlights: [
      "Western Ghats mountain scenery",
      "Forested landscapes and grass-covered slopes",
      "A demanding full-day trekking experience",
    ],
    thingsToCarry: [
      "Sufficient water",
      "Trekking shoes with good grip",
      "Packed food",
      "Rain protection",
      "First-aid essentials",
      "Fully charged phone",
    ],
    safetyNotes: [
      "Verify official permits, booking procedures, guide requirements, and route access before travelling.",
      "Do not begin the trek without confirmed authorization where required.",
      "Weather can change quickly; avoid unsafe conditions.",
      "Plan transport and return timing carefully for a demanding trek.",
      "Carry out all rubbish and follow local conservation rules.",
    ],
    recommendation:
      "Best suited to prepared trekkers who can manage a demanding day and have confirmed the official access arrangements.",

    itinerary: [
      {
        day: 1,
        title: "The Kudremukh Peak Expedition",
        stops: [
          {
            time: "3:30 AM",
            title: "Arrive at the designated base point",
            description:
              "Reach the reporting point specified in your confirmed trek booking, usually in the Balgal or authorised Mullodi access area. Keep your identification and permit details ready for verification.",
            duration: "Allow time according to your confirmed reporting instructions",
            type: "travel",
            tip: "If travelling from Mysuru or Bengaluru, consider arriving the previous evening and staying at a permitted local homestay. Camping inside the national park is not allowed."
          },
          {
            time: "4:00 AM",
            title: "Complete entry checks and prepare",
            description:
              "Follow the forest staff's check-in process, confirm the route and listen to any instructions about weather, wildlife, trail restrictions and the day's expected return time.",
            duration: "30 minutes, depending on entry procedures",
            type: "activity",
            tip: "A valid forest permit is essential. Book through the official [Aranya Vihaara portal](https://aranyavihaara.karnataka.gov.in/) and carry the required photo ID. Daily slots are limited."
          },
          {
            time: "4:30 AM",
            title: "Transfer towards Mullodi village",
            description:
              "Use the authorised local transfer arranged for your route to reach the trek starting point. The approach may involve a rough road and a local jeep transfer.",
            duration: "Variable, depending on road conditions and arrangements",
            type: "travel",
            tip: "Confirm the pickup point and transfer arrangements with the authorised operator or forest staff in advance. Do not assume private vehicles can reach the trailhead."
          },
          {
            time: "5:30 AM",
            title: "Breakfast and final equipment check",
            description:
              "Have breakfast at your authorised base or arranged homestay, fill your water bottles and prepare the food you will carry for the long hike.",
            duration: "30–45 minutes",
            type: "food",
            tip: "Carry enough water, a packed lunch, energy-rich snacks, a rain jacket, a windproof layer, a first-aid kit and any personal medication you need."
          },
          {
            time: "6:15 AM",
            title: "Mandatory trek briefing",
            description:
              "Meet your authorised guide and group for a briefing on the route, pace, checkpoints, weather and emergency procedures. Check that everyone understands the return deadline.",
            duration: "15–20 minutes",
            type: "activity",
            tip: "Follow current forest-department requirements for guides and group registration. Do not attempt the trek alone or leave the authorised group."
          },
          {
            time: "6:35 AM",
            title: "Enter the forest trail",
            description:
              "Begin the hike through the forested foothills. The early stretch takes you through dense vegetation, shaded paths and stream-side sections before the landscape begins to open up.",
            duration: "1–1.5 hours, depending on pace and conditions",
            type: "activity",
            tip: "Watch for slippery roots, uneven ground and leeches in damp conditions. Stay on the marked trail and avoid disturbing wildlife."
          },
          {
            time: "8:00 AM",
            title: "Walk through shola forest and streams",
            description:
              "Continue through the forest and along natural watercourses. Listen for birds and notice how the vegetation changes as the trail gains elevation.",
            duration: "1–1.5 hours, including short breaks",
            type: "highlight",
            tip: "Cross streams only where the authorised route permits. Never attempt a crossing if the water is fast, high or unsafe."
          },
          {
            time: "9:30 AM",
            title: "Reach the rolling grasslands",
            description:
              "As the trail opens beyond the forest, take in the wide green slopes and layered ridgelines that make Kudremukh famous. The exposed landscape offers a striking contrast to the shaded forest below.",
            duration: "20–30 minutes, including a short rest",
            type: "highlight",
            tip: "The weather can change quickly. Keep your rain protection accessible and avoid approaching steep slopes or exposed edges for photographs."
          },
          {
            time: "10:00 AM",
            title: "Continue across the mountain ridges",
            description:
              "Follow the designated route over successive grassy slopes and undulating terrain towards Kudremukh Peak. Maintain a sustainable pace and take short breaks when needed.",
            duration: "1.5–2 hours, depending on fitness and conditions",
            type: "activity",
            tip: "The full hike is approximately 20 km round-trip. Save enough energy for the return journey rather than treating the summit as the finish."
          },
          {
            time: "12:00 PM",
            title: "Reach the summit area",
            description:
              "If conditions and the group's pace allow, reach the permitted summit area and enjoy the sweeping views of the Western Ghats. The distinctive horse-face-shaped mountain landscape is the defining feature of this trek.",
            duration: "20–30 minutes",
            type: "highlight",
            tip: "Summit arrival is not guaranteed at a particular time. Follow your guide's decisions and the forest department's turnaround instructions if weather, fatigue or access restrictions make continuing unsafe."
          },
          {
            time: "12:30 PM",
            title: "Packed lunch and recovery break",
            description:
              "Eat your packed lunch at a permitted resting area, drink water and take time to recover before beginning the return leg.",
            duration: "20–30 minutes",
            type: "food",
            tip: "Carry all food wrappers and waste back with you. Do not leave litter, feed wildlife or make unnecessary noise in the protected area."
          },
          {
            time: "1:00 PM",
            title: "Begin the return hike",
            description:
              "Retrace the authorised trail across the grasslands and back towards the forest. The descent is lengthy, so maintain a controlled pace and keep the group together.",
            duration: "2–3 hours or more, depending on conditions",
            type: "activity",
            tip: "Do not take shortcuts down steep slopes. If the group is behind schedule, follow the guide's safety instructions rather than rushing."
          },
          {
            time: "3:30 PM",
            title: "Return through the forest",
            description:
              "Continue through the shaded forest sections and stream crossings towards the designated exit point. Check your footing carefully, especially if rain has made the path slippery.",
            duration: "1–1.5 hours or more, depending on the group's pace",
            type: "activity",
            tip: "This is an indicative schedule only. Follow the official return deadline and your guide's instructions even if that means turning back before the summit."
          },
          {
            time: "5:00 PM",
            title: "Complete the trek and check out",
            description:
              "Return to the designated base, complete any required exit formalities and confirm that every member of the group is accounted for.",
            duration: "20–30 minutes, depending on procedures",
            type: "rest",
            tip: "The trek can take longer than expected. Do not assume the group will finish by this time; follow the authorised schedule and do not continue into prohibited after-hours access."
          },
          {
            time: "5:30 PM",
            title: "Refresh and have an early meal",
            description:
              "Recover at your pre-arranged stay or permitted local stop. Eat a proper meal, rehydrate and allow your legs to rest after the long hike.",
            duration: "45–60 minutes",
            type: "food",
            tip: "Arrange accommodation and transport in advance. Do not plan to camp inside the national park."
          },
          {
            time: "6:30 PM",
            title: "Rest after the expedition",
            description:
              "End the day at your independently arranged accommodation or begin your onward journey only if transport is confirmed and the driver is rested.",
            duration: "Evening",
            type: "rest",
            tip: "Avoid adding another distant attraction after this demanding trek. Prioritise recovery, safe transport and the official access rules."
          }
        ]
      }
    ],
    sourceUrls: ["https://karnatakatourism.org/"],
    verificationStatus: "unverified",
    permitRequired: true,
    imageCredit: "Photo: Vikas.rumale / Wikimedia Commons, CC BY-SA 4.0",
  },
];
