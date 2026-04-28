export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  description: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "skin-fade-beard",
    name: "Skin Fade + Beard Sculpt",
    price: 45,
    duration: "45 mins",
    category: "haircut",
    description: "Our signature precision skin fade, seamlessly blended down to the skin, paired with a detailed beard trim and razor line-up.",
  },
  {
    id: "skin-fade",
    name: "Classic Skin Fade",
    price: 30,
    duration: "30 mins",
    category: "haircut",
    description: "Expertly crafted fade tailored to your head shape, finishing clean to the skin for a sharp, long-lasting look.",
  },
  {
    id: "regular-cut",
    name: "Standard Gentlemen's Cut",
    price: 25,
    duration: "30 mins",
    category: "haircut",
    description: "A traditional haircut with scissors and clippers. Includes a clean neckline and professional styling.",
  },
  {
    id: "regular-cut-beard",
    name: "Standard Cut + Beard Sculpt",
    price: 40,
    duration: "45 mins",
    category: "haircut",
    description: "A traditional haircut combo with a precise beard trim, shaping, and straight razor edge-up.",
  },
  {
    id: "seniors-cut",
    name: "Senior's Cut (65+)",
    price: 20,
    duration: "25 mins",
    category: "haircut",
    description: "Classic styling and clipper work tailored exclusively for our distinguished senior clients.",
  },
  {
    id: "kids-skin-fade",
    name: "Kids Skin Fade (12 & Under)",
    price: 25,
    duration: "30 mins",
    category: "kids",
    description: "Sharp and stylish skin fades tailored specifically for the younger gentlemen.",
  },
  {
    id: "kids-regular",
    name: "Kids Regular Cut (12 & Under)",
    price: 20,
    duration: "20 mins",
    category: "kids",
    description: "A simple, clean haircut to keep the little guys looking smart and well-groomed.",
  },
  {
    id: "hot-towel-shave",
    name: "Luxury Hot Towel Shave",
    price: 25,
    duration: "15 mins",
    category: "shave",
    description: "A relaxing straight razor face shave featuring hot towels, warm lather, and soothing aftershave balms.",
  },
  {
    id: "beard-trim",
    name: "Executive Beard Trim",
    price: 20,
    duration: "25 mins",
    category: "beard",
    description: "Full shaping, debulking, and conditioning of the beard, finished with sharp razor lines.",
  },
  {
    id: "beard-line-up",
    name: "Quick Beard Line Up",
    price: 15,
    duration: "15 mins",
    category: "beard",
    description: "A fast touch-up to re-establish clean lines on your cheeks and neck using trimmers and a straight razor.",
  },
  {
    id: "facials",
    name: "Revitalizing Facial",
    price: 50,
    duration: "30 mins",
    category: "grooming",
    description: "A deeply cleansing and moisturizing facial treatment to refresh the skin and clear clogged pores.",
  },
  {
    id: "ear-nose-wax",
    name: "Ear & Nose Wax",
    price: 5,
    duration: "15 mins",
    category: "grooming",
    description: "A quick, virtually painless hard wax treatment to remove unwanted ear and nose hair.",
  },
];

export const CATEGORIES = ["all", "haircut", "beard", "shave", "kids", "grooming"];
