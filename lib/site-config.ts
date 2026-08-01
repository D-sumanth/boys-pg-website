// Edit this file to update the hostel details across the website.

const hostelImage = (fileName: string) => `/images/hostel/${fileName}`

export const siteConfig = {
  name: "Prince Deluxe PG for Boys",
  shortName: "Prince Deluxe PG",
  businessType: "Boys PG hostel / paying guest accommodation",
  city: "Shamshabad, Hyderabad",
  location: "Shamshabad",
  positioning:
    "Hotel-style comfort with practical PG living for students, airport staff and working professionals in Shamshabad.",
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
  address: {
    line1: "Plot No. 80M, SY No. 748, 749",
    line2: "Rangareddy Nagar, Brindavan Colony",
    line3: "Shamshabad, Hyderabad, Telangana 501218",
    landmark: "Near Commissioner of Police, Shamshabad Zone",
  },
  pricingTeaser: "Student rooms starting from ₹7,500/month",
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
    rooms: 23,
    capacity: 90,
    brokerage: "No brokerage",
  },
  roomCategories: [
    {
      name: "Standard 4-Sharing Room",
      shortName: "Standard 4-Sharing",
      badge: "Popular Choice",
      setup: "4 Sharing",
      image: hostelImage("4-bed-standard-1.png"),
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
      name: "Room with Extra Space",
      shortName: "Room with Extra Space",
      badge: "Extra Comfort",
      setup: "4 Sharing",
      image: hostelImage("extra-space-with-chairs.png"),
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
      name: "Optional 3-Sharing Arrangement",
      shortName: "3-Sharing (Subject to Availability)",
      badge: "Limited Availability",
      setup: "3 Sharing",
      image: hostelImage("4-bed-standard-2.png"),
      description:
        "A 3-sharing arrangement may be provided when required, subject to availability and management confirmation.",
      features: [
        "3-sharing arrangement",
        "Subject to availability",
        "Management confirmation required",
        "Personal storage",
        "Attached washroom",
      ],
    },
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
      title: "3-Sharing Option",
      badge: "Subject to Availability",
      description: "Available only after management confirmation.",
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
    title: "Prince Deluxe PG for Boys | Boys PG in Shamshabad",
    description:
      "Hotel-style boys PG in Shamshabad with 23 rooms, capacity for 90 residents, student rooms from ₹7,500/month, food, Wi-Fi, attached washrooms, CCTV and transport support.",
    keywords: [
      "Boys PG in Shamshabad",
      "Boys hostel in Shamshabad",
      "PG hostel in Shamshabad",
      "PG near Shamshabad Airport",
      "Boys accommodation in Shamshabad",
      "Student hostel in Shamshabad",
      "PG for working professionals in Shamshabad",
      "4 sharing PG in Shamshabad",
      "Prince Deluxe PG for Boys",
      "PG with food in Shamshabad",
      "hostel near GMR School of Aviation",
      "hostel near Vardhaman College of Engineering",
      "hostel near Amity University Shamshabad",
      "PG for airport staff in Shamshabad",
      "luxury boys PG in Shamshabad",
      "hotel style boys hostel in Shamshabad",
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
} as const

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
