// Edit this file to update the hostel details across the website.

export const siteConfig = {
  name: "Prince Deluxe PG for Boys",
  shortName: "Prince Deluxe PG",
  businessType: "Boys PG / hostel accommodation",
  city: "Shamshabad, Hyderabad",
  location: "Shamshabad",
  openingDate: "1st July",
  positioning:
    "Safe, clean and homely boys PG near GMR Aviation College, Shamshabad.",
  audience:
    "GMR Aviation College students and nearby working employees",
  ownerName: "D Kiran Kumar",
  phoneDisplay: "+91 7093945019",
  phoneNumber: "+917093945019",
  phoneLink: "tel:+917093945019",
  whatsappLink: "https://wa.me/917093945019",
  email: "princedeluxepg@gmail.com",
  emailLink: "mailto:princedeluxepg@gmail.com",
  googleMapsLink:
    "https://www.google.com/maps/search/?api=1&query=Plot%20No.%2080M%2C%20SY%20No.%20748%2C%20749%2C%20Rangareddy%20Nagar%2C%20Brindavan%20Colony%2C%20Shamshabad%2C%20501218",
  address: {
    line1: "Plot No. 80M, SY No. 748, 749",
    line2: "Rangareddy Nagar, Brindavan Colony",
    line3: "Shamshabad, 501218",
    landmark: "Near Commissioner of Police, Shamshabad Zone",
  },
  roomPlan: {
    name: "4 Sharing Room",
    badge: "Most Popular",
    description: "Comfortable shared room with attached washroom",
    price: "₹8,000",
    pricePeriod: "/ month",
    priceNote: "per person, food and essential facilities included",
    rooms: 24,
    sharing: 4,
    capacity: 96,
    brokerage: "₹0",
  },
  seo: {
    title: "Prince Deluxe PG for Boys | Boys PG in Shamshabad",
    description:
      "Safe, clean and homely boys PG in Shamshabad for GMR Aviation College students and nearby working professionals. 4-sharing rooms, food, Wi-Fi, CCTV, housekeeping and essential facilities.",
    keywords: [
      "boys PG in Shamshabad",
      "hostel near GMR Aviation College",
      "boys hostel in Shamshabad",
      "PG near Shamshabad Airport",
      "student hostel in Shamshabad",
      "PG for working professionals in Shamshabad",
    ],
  },
  facilities: [
    "Homely food",
    "Breakfast, lunch and dinner",
    "South Indian and North Indian food",
    "Veg and non-veg food",
    "Clean dining area",
    "Attached washrooms",
    "CCTV camera security",
    "High-speed Wi-Fi",
    "Mineral water",
    "24-hour water facility",
    "Hot water",
    "Housekeeping",
    "Washing machine",
    "Refrigerator",
    "Suitable for students and working professionals",
    "Family-managed hostel",
    "Safe and disciplined environment",
    "No brokerage",
  ],
  gallery: [
    {
      src: "/images/hostel-exterior.png",
      title: "Building Exterior",
      span: "lg:col-span-2 lg:row-span-2",
    },
    { src: "/images/room.png", title: "4-Sharing Rooms", span: "" },
    { src: "/images/dining.png", title: "Clean Dining Area", span: "" },
    { src: "/images/washroom.png", title: "Attached Washrooms", span: "" },
    { src: "/images/facilities.png", title: "Daily Facilities", span: "" },
    {
      src: "/images/ambience.png",
      title: "Safe Hostel Ambience",
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
