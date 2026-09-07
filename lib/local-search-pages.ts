import { siteConfig } from "@/lib/site-config"

export type LocalSearchPageContent = {
  slug: string
  eyebrow: string
  title: string
  seoTitle: string
  description: string
  intro: string
  heroImage: string
  heroAlt: string
  distanceLabel: string
  showRooms?: boolean
  sectionTitle: string
  sectionParagraphs: readonly string[]
  benefits: readonly { title: string; description: string }[]
  faqs: readonly { question: string; answer: string }[]
}

export const localSearchPages = [
  {
    slug: "boys-pg-shamshabad",
    eyebrow: "PG rooms and fees in Shamshabad",
    title: "Compare PG rooms and monthly fees in Shamshabad",
    seoTitle: "PG Rooms & Monthly Fees in Shamshabad | Prince Deluxe PG",
    description:
      `Compare standard and extra-space boys PG rooms at Prince Deluxe PG, Shamshabad. ${siteConfig.pricingTeaser}, with food included. Check fees and availability.`,
    intro:
      "Choose between standard 4-sharing, extra-space 4-sharing and a special partitioned 2-bed room. Compare the published monthly fees and what is included before arranging a visit to Prince Deluxe PG For Boys in Brindavan Colony.",
    heroImage: siteConfig.images.standardRoom,
    heroAlt: `Standard shared room with individual beds at ${siteConfig.name}, Shamshabad`,
    distanceLabel: "Located in Brindavan Colony, Shamshabad",
    showRooms: true,
    sectionTitle: "What to compare before choosing your room",
    sectionParagraphs: [
      `The hostel has ${siteConfig.roomPlan.rooms} rooms with an approximate capacity of ${siteConfig.roomPlan.capacity} residents. Standard and extra-space 4-sharing rooms include an individual bed, personal storage and an attached washroom.`,
      "Daily homely food, high-speed Wi-Fi, CCTV security, lift access, hot water and water filters cover the essentials residents commonly need from a PG in Shamshabad.",
      "Extra-space rooms add usable space for seating or study. The special partitioned room has two beds; contact management for its current pricing. Optional 3-sharing is an availability-dependent arrangement, not a separate fixed room category.",
      "During your visit, check the room layout, personal storage and washroom, then confirm your move-in date and any transport requirements. Student eligibility, availability and optional arrangements should be confirmed with management before booking.",
    ],
    benefits: [
      {
        title: "Shamshabad location",
        description: "A verified address in Ranga Reddy Nagar, Brindavan Colony with a direct Google Maps link.",
      },
      {
        title: "Food and daily essentials",
        description: "Breakfast, lunch and dinner with Wi-Fi, hot water, water filters and personal storage.",
      },
      {
        title: "For students and employees",
        description: "Suitable for college students, airport staff and working professionals around Shamshabad.",
      },
      {
        title: "Direct owner enquiry",
        description: `Call or WhatsApp ${siteConfig.ownerName} for current availability without brokerage.`,
      },
    ],
    faqs: [
      {
        question: "Where is Prince Deluxe PG For Boys located?",
        answer: `The hostel is at ${siteConfig.address.streetAddress}, ${siteConfig.address.line3}, ${siteConfig.address.country}.`,
      },
      {
        question: "Are the monthly fees per person or for the entire room?",
        answer: `${siteConfig.pricingNote} ${siteConfig.pricingTeaser}. Student eligibility should be confirmed with management.`,
      },
      {
        question: "Are food and Wi-Fi available?",
        answer: "Yes. Homely breakfast, lunch and dinner are provided, along with high-speed Wi-Fi and essential daily facilities.",
      },
      {
        question: "Does the starting fee apply to the partitioned 2-bed room?",
        answer: "No. The starting student fee is for standard 4-sharing accommodation. Contact management for current pricing and availability of the special partitioned 2-bed room.",
      },
      {
        question: "How do I check room availability?",
        answer: `Call ${siteConfig.phoneDisplay} or send a WhatsApp enquiry before visiting.`,
      },
    ],
  },
  {
    slug: "hostel-near-hyderabad-airport",
    eyebrow: "Accommodation near Hyderabad Airport",
    title: "Boys PG near Hyderabad Airport",
    seoTitle: "Boys PG near Hyderabad Airport | Shamshabad Hostel",
    description:
      "Boys PG in Shamshabad about 7.2 km from Hyderabad Airport terminal, with homely food, Wi-Fi, CCTV, lift access and attached washrooms.",
    intro:
      "Stay in Shamshabad with convenient access to the Rajiv Gandhi International Airport area. The hostel suits airport staff, aviation students and other professionals looking for a furnished long-term stay.",
    heroImage: siteConfig.images.hero,
    heroAlt: `${siteConfig.name} illuminated entrance near Hyderabad Airport`,
    distanceLabel: "About 7.2 km from the airport terminal",
    sectionTitle: "Airport-area accommodation with the essentials included",
    sectionParagraphs: [
      "Prince Deluxe PG For Boys is located in Shamshabad, around 7.2 km from the airport terminal. Actual travel time varies by route and traffic, so residents should check directions for their shift or reporting time.",
      "The property offers shared furnished rooms, attached washrooms, homely food, high-speed Wi-Fi, CCTV security, lift access, hot water and personal storage.",
      "Transport support for nearby routes may be arranged at reasonable prices, subject to route and availability. Contact management directly to discuss your work location and schedule.",
    ],
    benefits: [
      {
        title: "Near the airport area",
        description: "The airport terminal is approximately 7.2 km from the hostel's Shamshabad location.",
      },
      {
        title: "Suitable for airport staff",
        description: "A long-term PG option for airport employees, trainees and nearby working professionals.",
      },
      {
        title: "Meals included",
        description: "Homely breakfast, lunch and dinner reduce the need to arrange food around work hours.",
      },
      {
        title: "Transport discussion",
        description: "Ask management about transport support for your route before confirming a room.",
      },
    ],
    faqs: [
      {
        question: "How far is the PG from Hyderabad Airport?",
        answer: "The airport terminal is approximately 7.2 km from the hostel. Travel time depends on traffic and the selected route.",
      },
      {
        question: "Is the hostel suitable for airport employees?",
        answer: "Yes. The hostel welcomes airport staff and nearby working professionals looking for boys accommodation in Shamshabad.",
      },
      {
        question: "Can transport be arranged?",
        answer: "Transport support may be arranged at reasonable prices, subject to route and availability. Confirm your route with management.",
      },
      {
        question: "Can I visit before booking?",
        answer: `Yes. Call or WhatsApp ${siteConfig.phoneDisplay} to confirm availability and arrange a visit.`,
      },
    ],
  },
  {
    slug: "hostel-near-gmr-school-of-aviation",
    eyebrow: "Student hostel near GMR Aviation",
    title: "Hostel near GMR School of Aviation, Shamshabad",
    seoTitle: "Hostel near GMR School of Aviation | Boys PG Shamshabad",
    description:
      "Boys hostel in Shamshabad about 8.9 km from GMR School of Aviation, with food, Wi-Fi, attached washrooms, CCTV, lift access and student room pricing.",
    intro:
      "Prince Deluxe PG For Boys offers student accommodation in Shamshabad for GMR School of Aviation students who want furnished rooms, daily meals and essential facilities in one property.",
    heroImage: siteConfig.images.premiumRoom,
    heroAlt: `Furnished student room at ${siteConfig.name} near GMR School of Aviation`,
    distanceLabel: "About 8.9 km from GMR School of Aviation",
    sectionTitle: "Student accommodation designed for a manageable daily routine",
    sectionParagraphs: [
      "The hostel is approximately 8.9 km from GMR School of Aviation. Students should check the current route and class schedule when planning their daily travel.",
      "Rooms include an individual bed, personal locker or storage, attached washroom, lights and fan. Homely breakfast, lunch and dinner, Wi-Fi, hot water and water filters are also available.",
      "Student pricing is available for eligible students. Transport may be arranged for nearby routes, subject to availability and management confirmation.",
    ],
    benefits: [
      {
        title: "For aviation students",
        description: "A boys hostel option in Shamshabad for GMR School of Aviation students and trainees.",
      },
      {
        title: "Daily meals",
        description: "Breakfast, lunch and dinner are provided, helping students maintain a regular routine.",
      },
      {
        title: "Study-ready essentials",
        description: "High-speed Wi-Fi, personal storage, attached washrooms, lift access and hot water.",
      },
      {
        title: "Student room pricing",
        description: "Eligible students can enquire about current student fees and available room categories.",
      },
    ],
    faqs: [
      {
        question: "How far is the hostel from GMR School of Aviation?",
        answer: "The hostel is approximately 8.9 km from GMR School of Aviation. Route and travel time can vary.",
      },
      {
        question: "Is food included for students?",
        answer: "Yes. Homely breakfast, lunch and dinner are provided for residents.",
      },
      {
        question: "Is transport available for GMR students?",
        answer: "Transport support may be arranged at reasonable prices, subject to route, timing and availability.",
      },
      {
        question: "How can a student reserve a room?",
        answer: `Call or WhatsApp ${siteConfig.phoneDisplay} to confirm student pricing, room availability and a property visit.`,
      },
    ],
  },
] as const satisfies readonly LocalSearchPageContent[]

export function getLocalSearchPage(slug: string) {
  return localSearchPages.find((page) => page.slug === slug)
}
