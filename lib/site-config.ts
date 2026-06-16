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
    "https://www.google.com/maps/search/?api=1&query=H.No.%2021-19%2F5%2FA%2F1%2CH%2C%20Brindavan%20Colony%2C%20Ranga%20Reddy%20Nagar%2C%20Shamshabad%2C%20Hyderabad%2C%20Telangana%20501218",
  address: {
    line1: "H.No. 21-19/5/A/1,H",
    line2: "Brindavan Colony, Ranga Reddy Nagar",
    line3: "Shamshabad, Hyderabad, Telangana 501218",
    landmark: "",
  },
  images: {
    buildingNight: "/images/building-night.png",
    buildingDay: "/images/building-day.png",
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
      "Safe, clean and homely boys PG in Shamshabad for GMR Aviation College students and nearby working professionals. 4-sharing rooms, homely food, Wi-Fi, CCTV and essential facilities.",
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
    "Veg and non-veg food",
    "Attached washrooms",
    "CCTV camera security",
    "High-speed Wi-Fi",
    "Mineral water",
    "24-hour water facility",
    "Hot water",
    "Suitable for students and working professionals",
    "Safe and disciplined environment",
    "No brokerage",
  ],
  gallery: [
    {
      src: "/images/building-night.png",
      title: "Building Exterior at Night",
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
