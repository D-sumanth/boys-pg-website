// Edit this file to update the hostel details across the website.

const hostelImage = (fileName: string) => `/images/hostel/${fileName}`

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
  pricingTeaser: "Rooms starting from ₹8,500/month",
  pricingNote:
    "Final pricing depends on room category, AC/non-AC preference and current availability.",
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
      name: "Premium 4-Sharing Rooms",
      shortName: "Premium 4-Sharing",
      badge: "Premium Option",
      roomCount: 10,
      setup: "4 Sharing",
      image: hostelImage("extra-space-with-chairs.png"),
      description:
        "Spacious 4-sharing rooms with extra usable space for seating, study or daily comfort.",
      features: [
        "4-sharing setup",
        "Extra usable entrance space",
        "Individual bed for each resident",
        "Personal locker for each bed",
        "4-door almirah storage",
        "Attached washroom",
      ],
    },
    {
      name: "Standard 4-Sharing Rooms",
      shortName: "Standard 4-Sharing",
      badge: "Popular Choice",
      roomCount: 12,
      setup: "4 Sharing",
      image: hostelImage("4-bed-standard-1.png"),
      description:
        "Comfortable 4-sharing rooms with individual beds, personal storage and attached washroom.",
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
      image: hostelImage("2-bed-partition.png"),
      description:
        "A limited partitioned room option for residents who prefer extra privacy and a quieter setup.",
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
      "Prince Deluxe PG for Boys is a clean boys PG hostel in Shamshabad, Hyderabad. Rooms starting from ₹8,500/month with food, Wi-Fi, attached washrooms, CCTV, lift access, water filters and essential facilities.",
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
    { label: "Homely food", image: hostelImage("dining-3.png") },
    { label: "Breakfast, lunch and dinner", image: hostelImage("dining-1.png") },
    { label: "Veg and non-veg food", image: hostelImage("dining-2.png") },
    { label: "Clean dining/common area", image: hostelImage("dining-3.png") },
    { label: "Attached washrooms", image: hostelImage("bathroom-white-1.png") },
    { label: "Hot water / geyser", image: hostelImage("bathroom-gray-1.png") },
    { label: "High-speed Wi-Fi" },
    { label: "CCTV camera security", image: hostelImage("cc-camera-1.png") },
    { label: "Fire extinguisher" },
    { label: "Lift access", image: hostelImage("lift-1.png") },
    { label: "24-hour water facility" },
    { label: "Water filters", image: hostelImage("water-filter.png") },
    { label: "Common washing machine" },
    { label: "Personal locker" },
    { label: "4-door almirah storage" },
    { label: "Housekeeping / cleaning support" },
    { label: "No brokerage" },
    { label: "Family-managed environment" },
    { label: "Disciplined and clean premises" },
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
