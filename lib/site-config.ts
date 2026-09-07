// Edit this file to update public hostel details across the website.

const hostelImage = (fileName: string) => `/images/hostel/${fileName}`
const foodImage = (fileName: string) => `/images/food/${fileName}`

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  return new URL(withProtocol).origin
}

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (process.env.VERCEL_ENV === "production" && !configuredUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is required for production deployments.")
  }

  if (configuredUrl) {
    return normalizeSiteUrl(configuredUrl)
  }

  if (process.env.VERCEL_URL) {
    return normalizeSiteUrl(process.env.VERCEL_URL)
  }

  return "http://localhost:3000"
}

export type AnalyticsEventName =
  | "click_call"
  | "click_whatsapp"
  | "click_google_maps"
  | "submit_enquiry"

export type RoomInventoryItem = {
  name: string
  shortName: string
  badge: string
  setup: string
  image: string
  count: number
  bedsPerRoom: number
  description: string
  features: readonly string[]
  pricingLabel?: string
}

type PricingPlan = {
  title: string
  badge: string
  description: string
  featured: boolean
  options: readonly { room: string; price: string }[]
}

type SiteConfig = {
  siteUrl: string
  name: string
  shortName: string
  businessType: string
  city: string
  location: string
  positioning: string
  premiumPositioning: string
  tagline: string
  audience: string
  ownerName: string
  phoneDisplay: string
  phoneNumber: string
  phoneLink: string
  whatsappLink: string
  email: string
  emailLink: string
  googleMapsLink: string
  enquiryHours: string
  address: {
    line1: string
    line2: string
    line3: string
    country: string
    countryCode: string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    landmark: string
  }
  pricingTeaser: string
  startingPriceShort: string
  pricingNote: string
  transportNote: string
  images: Record<string, string>
  roomPlan: { rooms: number; capacity: number; brokerage: string }
  roomCategories: readonly RoomInventoryItem[]
  roomEnquiryOptions: readonly string[]
  pricingPlans: readonly PricingPlan[]
  pricingNotes: readonly string[]
  nearbyLocations: readonly {
    name: string
    distance: string
    type: "College" | "Airport" | "Work Location"
  }[]
  seo: { title: string; description: string; keywords: readonly string[] }
  facilities: readonly { label: string }[]
  faqs: readonly { question: string; answer: string }[]
  foodGallery: readonly { src: string; title: string }[]
  gallery: readonly { src: string; title: string }[]
}

const roomCategories: readonly RoomInventoryItem[] = [
  {
    name: "Premium 4-Sharing Room",
    shortName: "Premium 4-Sharing",
    badge: "Extra Comfort",
    setup: "4 Sharing",
    image: hostelImage("extra-space-with-chairs.png"),
    count: 10,
    bedsPerRoom: 4,
    description:
      "A spacious 4-sharing room with extra usable space for seating, study or everyday comfort.",
    features: [
      "4-sharing setup",
      "Extra usable space",
      "Individual bed for each resident",
      "Personal locker for each bed",
      "4-door almirah storage",
      "Attached washroom",
    ],
  },
  {
    name: "Standard 4-Sharing Room",
    shortName: "Standard 4-Sharing",
    badge: "Popular Choice",
    setup: "4 Sharing",
    image: hostelImage("4-bed-standard-1.png"),
    count: 12,
    bedsPerRoom: 4,
    description:
      "A comfortable shared room with an individual bed, personal storage and an attached washroom.",
    features: [
      "4-sharing setup",
      "Individual bed for each resident",
      "Personal locker for each bed",
      "4-door almirah storage",
      "Attached washroom",
      "Lights and fan",
    ],
  },
  {
    name: "Special Partitioned 2-Bed Room",
    shortName: "Special Partitioned 2-Bed",
    badge: "One Available",
    setup: "2 Beds",
    image: hostelImage("2-bed-partition.png"),
    count: 1,
    bedsPerRoom: 2,
    description:
      "A special partitioned room with two beds, personal storage and an attached washroom.",
    features: [
      "Partitioned 2-bed setup",
      "Individual bed for each resident",
      "Personal storage",
      "Attached washroom",
    ],
    pricingLabel: "Contact for current pricing and availability",
  },
]

const inventoryTotals = roomCategories.reduce(
  (totals, room) => ({
    rooms: totals.rooms + room.count,
    capacity: totals.capacity + room.count * room.bedsPerRoom,
  }),
  { rooms: 0, capacity: 0 },
)

if (inventoryTotals.rooms !== 23 || inventoryTotals.capacity !== 90) {
  throw new Error("Public room inventory must total 23 rooms and 90 nominal beds.")
}

export const siteConfig = {
  siteUrl: resolveSiteUrl(),
  name: "Prince Deluxe PG For Boys",
  shortName: "Prince Deluxe PG",
  businessType: "Boys and men's PG hostel / paying guest accommodation",
  city: "Shamshabad, Hyderabad",
  location: "Shamshabad",
  positioning:
    "Hotel-style boys and men's PG accommodation for students, airport staff and working professionals in Shamshabad.",
  premiumPositioning:
    "A hotel-style property adapted for comfortable, secure and homely PG living.",
  tagline: "Safe • Clean • Comfortable • Like Home",
  audience: "students, airport staff and working professionals",
  ownerName: "D Kiran Kumar",
  phoneDisplay: "+91 7093945019",
  phoneNumber: "+917093945019",
  phoneLink: "tel:+917093945019",
  whatsappLink: "https://wa.me/917093945019",
  email: "princedeluxepg@gmail.com",
  emailLink: "mailto:princedeluxepg@gmail.com",
  googleMapsLink: "https://maps.app.goo.gl/ECLgK4Q983rYKFPT9",
  enquiryHours: "6:00 AM–11:00 PM every day",
  address: {
    line1: "H.No. 21-49/5/A/1",
    line2: "Ranga Reddy Nagar, Brindavan Colony",
    line3: "Shamshabad, Hyderabad, Telangana 501218",
    country: "India",
    countryCode: "IN",
    streetAddress: "H.No. 21-49/5/A/1, Ranga Reddy Nagar, Brindavan Colony",
    addressLocality: "Shamshabad, Hyderabad",
    addressRegion: "Telangana",
    postalCode: "501218",
    landmark: "",
  },
  pricingTeaser: "Student rooms starting from ₹7,500/month",
  startingPriceShort: "₹7,500+",
  pricingNote: "Fees are per person per month. Please enquire for current availability.",
  transportNote: "Transport facility available at reasonable prices.",
  images: {
    hero: hostelImage("entrance-night-2.png"),
    entranceNightAlt: hostelImage("entrance-night-1.png"),
    buildingDay: hostelImage("hostel-board-day-1.png"),
    dining: hostelImage("dining-3.png"),
    diningAlt: hostelImage("dining-1.png"),
    premiumRoom: hostelImage("extra-space-with-chairs.png"),
    standardRoom: hostelImage("4-bed-standard-1.png"),
    standardRoomAlt: hostelImage("4-bed-standard-2.png"),
    partitionedRoom: hostelImage("2-bed-partition.png"),
    bathroomWhite: hostelImage("bathroom-white-1.png"),
    bathroomGray: hostelImage("bathroom-gray-1.png"),
    lift: hostelImage("lift-1.png"),
    waterFilter: hostelImage("water-filter.png"),
    cctv: hostelImage("cc-camera-1.png"),
  },
  roomPlan: {
    rooms: inventoryTotals.rooms,
    capacity: inventoryTotals.capacity,
    brokerage: "No brokerage",
  },
  roomCategories,
  roomEnquiryOptions: [
    ...roomCategories.map((room) => room.shortName),
    "3-Sharing (Subject to Availability)",
  ],
  pricingPlans: [
    {
      title: "Student Pricing",
      badge: "Student Offer",
      description: "Special monthly fees for eligible students.",
      featured: true,
      options: [
        { room: "Standard 4-Sharing", price: "₹7,500" },
        { room: "Room with Extra Space", price: "₹8,000" },
      ],
    },
    {
      title: "Working Professionals / Others",
      badge: "Regular Pricing",
      description: "For employees, airport staff and other residents.",
      featured: false,
      options: [
        { room: "Standard 4-Sharing", price: "₹8,000" },
        { room: "Room with Extra Space", price: "₹8,500" },
      ],
    },
    {
      title: "Optional 3-Sharing Arrangement",
      badge: "Subject to Availability",
      description: "A flexible arrangement, not a fixed physical room category.",
      featured: false,
      options: [{ room: "3-Sharing Arrangement", price: "₹9,500" }],
    },
  ],
  pricingNotes: [
    "Fees are per person per month.",
    "Student pricing is available for eligible students.",
    "3-sharing is subject to availability and management confirmation.",
    "Transport can be arranged at reasonable prices.",
    "Call or WhatsApp to check current room availability.",
  ],
  nearbyLocations: [
    { name: "GMR School of Aviation", distance: "8.9 km", type: "College" },
    { name: "Vardhaman College of Engineering", distance: "9 km", type: "College" },
    { name: "Amity University", distance: "8.6 km", type: "College" },
    { name: "Airport Terminal - Arrival / Departure", distance: "7.2 km", type: "Airport" },
    { name: "Financial District", distance: "20 km", type: "Work Location" },
  ],
  seo: {
    title: "Boys Hostel & Men's PG in Shamshabad | Prince Deluxe PG",
    description:
      "Boys hostel and men's PG in Shamshabad with food, Wi-Fi and attached washrooms. Student rooms from ₹7,500/month at Prince Deluxe PG. Call +91 7093945019.",
    keywords: [
      "Boys PG in Shamshabad",
      "Mens PG in Shamshabad",
      "Men's PG in Shamshabad",
      "Boys hostel in Shamshabad",
      "PG hostel in Shamshabad",
      "PG near Shamshabad Airport",
      "Accommodation near Hyderabad Airport",
      "Boys accommodation in Shamshabad",
      "Student hostel in Shamshabad",
      "PG for working professionals in Shamshabad",
      "4 sharing PG in Shamshabad",
      "Prince Deluxe PG For Boys",
      "PG with food in Shamshabad",
      "hostel near GMR School of Aviation",
      "PG for airport staff in Shamshabad",
    ],
  },
  facilities: [
    { label: "Homely food" },
    { label: "Breakfast, lunch and dinner" },
    { label: "Veg and non-veg food" },
    { label: "Attached washrooms" },
    { label: "Hot water / geyser support" },
    { label: "High-speed Wi-Fi" },
    { label: "CCTV security" },
    { label: "Fire extinguisher" },
    { label: "Lift access" },
    { label: "24-hour water availability" },
    { label: "Water filters" },
    { label: "Common washing machine" },
    { label: "Personal locker for each bed" },
    { label: "4-door almirah storage" },
    { label: "Housekeeping / cleaning support" },
    { label: "Transport at reasonable prices" },
    { label: "No brokerage" },
    { label: "Disciplined and clean premises" },
  ],
  faqs: [
    {
      question: "What is the starting fee?",
      answer: "Student rooms start from ₹7,500 per person per month.",
    },
    {
      question: "Is food included?",
      answer: "Yes. Homely food is included with breakfast, lunch and dinner.",
    },
    {
      question: "Is transport available?",
      answer:
        "Yes. Transport can be arranged at reasonable prices, subject to route and availability.",
    },
    {
      question: "Is the hostel suitable for students?",
      answer:
        "Yes. It is suitable for students from nearby colleges including GMR School of Aviation, Vardhaman College of Engineering and Amity University.",
    },
    {
      question: "Is it suitable for working professionals?",
      answer:
        "Yes. The hostel is suitable for airport staff and working professionals in and around Shamshabad.",
    },
    {
      question: "Are rooms available for 3-sharing?",
      answer:
        "A 3-sharing arrangement may be available at ₹9,500 per person, subject to availability and management confirmation.",
    },
    {
      question: "How can I check availability?",
      answer: "Please call or WhatsApp the hostel directly to check current room availability.",
    },
  ],
  foodGallery: [
    { src: foodImage("breakfast-idli.jpeg"), title: "Soft idlis" },
    { src: foodImage("fresh-bonda.jpeg"), title: "Fresh bondas" },
    { src: foodImage("vegetable-upma.jpeg"), title: "Vegetable upma" },
    { src: foodImage("breakfast-dosa.jpeg"), title: "Breakfast dosa" },
    { src: foodImage("homely-curry.jpeg"), title: "Homely curry" },
    { src: foodImage("fresh-poori.jpeg"), title: "Fresh pooris" },
  ],
  gallery: [
    { src: hostelImage("entrance-night-2.png"), title: "Entrance & Signage" },
    { src: hostelImage("hostel-board-day-1.png"), title: "Daytime Hostel Board" },
    { src: hostelImage("dining-3.png"), title: "Dining/Common Area" },
    { src: hostelImage("dining-1.png"), title: "Dining Area View" },
    { src: hostelImage("extra-space-with-chairs.png"), title: "Premium Room with Extra Space" },
    { src: hostelImage("4-bed-standard-1.png"), title: "Standard 4-Sharing Room" },
    { src: hostelImage("4-bed-standard-2.png"), title: "Standard Room View" },
    { src: hostelImage("2-bed-partition.png"), title: "Special Partitioned Room" },
    { src: hostelImage("bathroom-white-1.png"), title: "Attached Washroom with Geyser" },
    { src: hostelImage("bathroom-gray-1.png"), title: "Modern Washroom" },
    { src: hostelImage("lift-1.png"), title: "Lift Access" },
    { src: hostelImage("water-filter.png"), title: "Water Filter" },
    { src: hostelImage("cc-camera-1.png"), title: "CCTV Security" },
  ],
} as const satisfies SiteConfig

export function absoluteSiteUrl(path = "/") {
  return new URL(path, `${siteConfig.siteUrl}/`).toString()
}

export const OWNER_NAME = siteConfig.ownerName
export const PHONE_DISPLAY = siteConfig.phoneDisplay
export const PHONE_TEL = siteConfig.phoneNumber
export const PHONE_LINK = siteConfig.phoneLink
export const EMAIL = siteConfig.email
export const EMAIL_LINK = siteConfig.emailLink
export const WHATSAPP_LINK = siteConfig.whatsappLink
export const GOOGLE_MAPS_LINK = siteConfig.googleMapsLink
export const ADDRESS_LINE_1 = siteConfig.address.line1
export const ADDRESS_LINE_2 = siteConfig.address.line2
export const ADDRESS_LINE_3 = siteConfig.address.line3
export const ADDRESS_LANDMARK = siteConfig.address.landmark
