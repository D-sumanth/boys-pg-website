// Edit this file to update the hostel details across the website.

export const siteConfig = {
  name: "Prince Deluxe PG for Boys",
  shortName: "Prince Deluxe PG",
  businessType: "Boys PG hostel / paying guest accommodation",
  city: "Shamshabad, Hyderabad",
  location: "Shamshabad",
  openingDate: "1st July",
  positioning: "Safe, clean and comfortable boys PG accommodation in Shamshabad.",
  tagline: "Safe • Clean • Comfortable • Like Home",
  audience: "students and working professionals",
  ownerName: "D Kiran Kumar",
  phoneDisplay: "+91 7093945019",
  phoneNumber: "+917093945019",
  phoneLink: "tel:+917093945019",
  whatsappLink: "https://wa.me/917093945019",
  email: "princedeluxepg@gmail.com",
  emailLink: "mailto:princedeluxepg@gmail.com",
  googleMapsLink:
    "https://www.google.com/maps/search/?api=1&query=Plot%20No.%2080M%2C%20SY%20No.%20748%2C%20749%2C%20Rangareddy%20Nagar%2C%20Brindavan%20Colony%2C%20Shamshabad%2C%20Hyderabad%2C%20Telangana%20501218",
  address: {
    line1: "Plot No. 80M, SY No. 748, 749",
    line2: "Rangareddy Nagar, Brindavan Colony",
    line3: "Shamshabad, Hyderabad, Telangana 501218",
    landmark: "Near Commissioner of Police, Shamshabad Zone",
  },
  images: {
    buildingNight: "/images/building-night.png",
    buildingDay: "/images/building-day.png",
  },
  roomPlan: {
    rooms: 23,
    capacity: 90,
    brokerage: "₹0",
  },
  roomCategories: [
    {
      name: "Premium 4-Sharing Room with Extra Space",
      shortName: "Premium 4-Sharing",
      badge: "Premium Option",
      roomCount: 10,
      setup: "4 Sharing",
      nonAcPrice: "₹8,500",
      acPrice: "₹10,500",
      description:
        "Selected rooms include an additional usable entrance area, suitable as a small seating space, study nook or relaxation corner.",
      features: [
        "4-sharing setup",
        "Extra usable entrance space",
        "Individual bed for each resident",
        "Personal locker for each bed",
        "4-door almirah storage",
        "Attached washroom",
        "Lights and fan",
      ],
    },
    {
      name: "Standard 4-Sharing Room",
      shortName: "Standard 4-Sharing",
      badge: "Popular Choice",
      roomCount: 12,
      setup: "4 Sharing",
      nonAcPrice: "₹8,000",
      acPrice: "₹10,000",
      description:
        "Comfortable 4-sharing rooms with individual beds, personal locker, almirah storage and attached washroom.",
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
      shortName: "Partitioned 2-Bed",
      badge: "Limited Room",
      roomCount: 1,
      setup: "2 Beds",
      nonAcPrice: "₹9,000",
      acPrice: "₹11,000",
      description:
        "A special 2-bed partitioned room option for residents who prefer extra privacy and a quieter setup.",
      features: [
        "2-bed partitioned setup",
        "More privacy",
        "Personal storage",
        "Attached washroom",
        "Lights and fan",
      ],
    },
  ],
  seo: {
    title: "Prince Deluxe PG for Boys | Boys PG in Shamshabad",
    description:
      "Prince Deluxe PG for Boys is a clean and well-managed boys PG hostel in Shamshabad, Hyderabad, offering spacious rooms, food, attached washrooms, personal lockers, almirah storage, Wi-Fi, CCTV security, lift access, water filters and common washing machine facilities.",
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
    ],
  },
  facilities: [
    "Food included",
    "High-speed Wi-Fi",
    "CCTV security",
    "Fire extinguisher",
    "Lift access",
    "Hot water / geyser support",
    "Attached washrooms",
    "Water filters on each floor",
    "Common washing machine",
    "Personal locker and almirah storage",
    "Housekeeping / cleaning support",
    "No brokerage",
  ],
  gallery: [
    {
      src: "/images/building-night.png",
      title: "Building Exterior and Signage",
      span: "lg:col-span-2",
    },
    {
      src: "/images/building-day.png",
      title: "Building Exterior in Daylight",
      span: "lg:col-span-2",
    },
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
