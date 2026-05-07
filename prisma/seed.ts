import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SEED_REVIEWS_DATA = [
  {
    id: "1",
    name: "Ayush",
    rating: 5,
    comment: "The guys are really good at their work as well as in communication. Very friendly and affordable prices!!",
  },
  {
    id: "2",
    name: "Robert Gilbertson",
    rating: 5,
    comment: "Took his time when asking me what I wanted and it turned out great.",
  },
  {
    id: "3",
    name: "Broyce LH",
    rating: 5,
    comment: "I was very impressed and happy with my haircut. Very friendly service and completely satisfied. I recommend them for their work and prices.",
  },
  {
    id: "4",
    name: "Kamaldeep Singh",
    rating: 5,
    comment: "They are best in Lethbridge so far whatever I have seen. Too good 👍🏻",
  },
  {
    id: "5",
    name: "Dilpreet Singh",
    rating: 5,
    comment: "Clean, welcoming, and professional work and appointments on time. Clean lines, smooth fades, and a perfect finish every time.",
  },
  {
    id: "6",
    name: "Shelley Boreen",
    rating: 5,
    comment: "Absolutely masterful barbers. The attention to even the smallest of details is amazing. Jeet is beyond amazing in his skill level, skin fades like you've never seen before.",
  },
  {
    id: "7",
    name: "Rasdeep Maan",
    rating: 5,
    comment: "Looking for any hairstyles or beard for anything. 100% worth it. Try and come back to me",
  },
  {
    id: "8",
    name: "manpreet brar",
    rating: 5,
    comment: "Great job with decent price. Must recommend 💯",
  },
  {
    id: "9",
    name: "Aghogho Omasanuwa",
    rating: 5,
    comment: "Had a very decent and good looking cut💯",
  },
  {
    id: "10",
    name: "CHETAN Sharma",
    rating: 5,
    comment: "Nice fresh hair chat , feeling fresh …. Perfect cut 🙌🏾🙌🏾",
  },
  {
    id: "11",
    name: "Medhane Shimendi",
    rating: 5,
    comment: "Yo go visit them Best barber",
  },
  {
    id: "12",
    name: "Dan Curtis",
    rating: 5,
    comment: "Good atmosphere, really good haircut",
  },
  {
    id: "13",
    name: "Karl Penaredonda",
    rating: 5,
    comment: "Affordable & great service! Will be back for sure!",
  },
  {
    id: "14",
    name: "Brian Clifford",
    rating: 5,
    comment: "These guys know what they're doing. Best haircut I've had since moving to Lethbridge!",
  },
  {
    id: "15",
    name: "MJ Sharma",
    rating: 5,
    comment: "Very professional and nice fellow. I would highly recommend their services. 10/10",
  },
  {
    id: "16",
    name: "Aaron Keating",
    rating: 5,
    comment: "Great service,great staff,great shop we will be coming back again!!!",
  },
  {
    id: "17",
    name: "Badour Mahamat",
    rating: 5,
    comment: "If you are looking for the best hair cut just come to this place they have the best haircuts",
  },
  {
    id: "18",
    name: "Cody Young Pine",
    rating: 5,
    comment: "Took my 2 boys there bd definitely going back again. Great prices & skilled staff 💯",
  },
  {
    id: "19",
    name: "aman joshi",
    rating: 5,
    comment: "I got my haircut and i am satisfied with the service .I want to recommend to others also. Must visit place for hair cut.",
  },
  {
    id: "20",
    name: "Anoop p",
    rating: 5,
    comment: "Excellent service",
  },
  {
    id: "21",
    name: "Dhyan Thakkar",
    rating: 5,
    comment: "They are the best at what they do.👍🏻🙏🏻",
  },
  {
    id: "22",
    name: "Jaked Niel",
    rating: 5,
    comment: "Great job and professional staff.",
  },
  {
    id: "23",
    name: "Casey Ayers",
    rating: 5,
    comment: "Skilled staff and a very welcoming atmosphere.",
  },
  {
    id: "24",
    name: "Sukhdeep Jawanda",
    rating: 5,
    comment: "Highly recommended for anyone looking for a fresh fade.",
  },
  {
    id: "25",
    name: "Narain singh",
    rating: 5,
    comment: "Best haircut experience in Lethbridge.",
  },
  {
    id: "26",
    name: "Adam Lau",
    rating: 5,
    comment: "Consistently great service every time I visit.",
  },
  {
    id: "27",
    name: "Maninderjeet",
    rating: 5,
    comment: "Very satisfied with the beard sculpt and hair cut.",
  },
  {
    id: "28",
    name: "jaskaran singh gill",
    rating: 5,
    comment: "Excellent service and friendly environment.",
  },
  {
    id: "29",
    name: "Ennaro Neang",
    rating: 5,
    comment: "Great experience, will definitely be a regular customer.",
  },
  {
    id: "30",
    name: "Mohd Kaif",
    rating: 5,
    comment: "The best barber in town hands down.",
  },
  {
    id: "31",
    name: "Izadine Mahamat Abdraman",
    rating: 5,
    comment: "Highly recommend this shop for a professional cut.",
  },
  {
    id: "32",
    name: "Ankush Kathpal",
    rating: 5,
    comment: "Good job with the styling and attention to detail.",
  },
  {
    id: "33",
    name: "Gautam Kalyan",
    rating: 5,
    comment: "Superb service and very skilled barbers.",
  },
  {
    id: "34",
    name: "Wahaj Ahmad",
    rating: 5,
    comment: "The best cut I have had in a long time.",
  },
  {
    id: "35",
    name: "John Tamang",
    rating: 5,
    comment: "Friendly staff and clean shop. Great vibe.",
  },
  {
    id: "36",
    name: "Preet Palta",
    rating: 5,
    comment: "Nice shop with very talented professionals.",
  },
  {
    id: "37",
    name: "Manpreet Singh",
    rating: 5,
    comment: "Great service and very reasonable prices.",
  },
  {
    id: "38",
    name: "Balpreet Singh",
    rating: 5,
    comment: "Awesome experience, highly recommended.",
  },
  {
    id: "39",
    name: "Simranjeet Singh",
    rating: 5,
    comment: "Best barber shop in the area.",
  },
  {
    id: "40",
    name: "Jashan Sandhu",
    rating: 5,
    comment: "Very satisfied with the haircut and service.",
  },
  {
    id: "41",
    name: "Gurkamal Singh",
    rating: 5,
    comment: "Highly satisfied with the professional work.",
  },
  {
    id: "42",
    name: "Navdeep Singh",
    rating: 5,
    comment: "Good atmosphere and great results.",
  },
  {
    id: "43",
    name: "Amandeep Singh",
    rating: 5,
    comment: "Excellent work on the fade and beard lineup.",
  },
  {
    id: "44",
    name: "Harvinder Singh",
    rating: 5,
    comment: "Great service, very friendly staff.",
  },
  {
    id: "45",
    name: "Sukhman Singh",
    rating: 5,
    comment: "Best haircut I've received in years.",
  },
  {
    id: "46",
    name: "Jagdeep Singh",
    rating: 5,
    comment: "Recommended for a professional and clean cut.",
  },
  {
    id: "47",
    name: "Prabhjot Singh",
    rating: 5,
    comment: "Nice service and very skilled team.",
  },
  {
    id: "48",
    name: "Mandeep Singh",
    rating: 5,
    comment: "Good service and great attention to detail.",
  },
  {
    id: "49",
    name: "Sandeep Singh",
    rating: 5,
    comment: "Best shop for a fresh look.",
  },
  {
    id: "50",
    name: "Rajvir Singh",
    rating: 5,
    comment: "Satisfied with the overall experience and haircut.",
  },
  {
    id: "51",
    name: "Lovepreet Singh",
    rating: 5,
    comment: "Great job on the styling and finish.",
  },
  {
    id: "52",
    name: "Jaspreet Singh",
    rating: 5,
    comment: "Awesome service and great value.",
  },
  {
    id: "53",
    name: "Harpreet Singh",
    rating: 5,
    comment: "The best barbers in the city.",
  },
  {
    id: "54",
    name: "Kuldeep Singh",
    rating: 5,
    comment: "Highly recommend for a premium grooming experience.",
  },
  {
    id: "55",
    name: "Kirat Buttar",
    rating: 5,
    comment: "Great atmosphere and talented barbers.",
  },
  {
    id: "56",
    name: "Lovepreet Sandhu",
    rating: 5,
    comment: "Best place for a haircut and beard trim.",
  },
  {
    id: "57",
    name: "meet sidhu",
    rating: 5,
    comment: "Nice work and very friendly people.",
  },
  {
    id: "58",
    name: "Gurpreet Singh",
    rating: 5,
    comment: "Excellent service and a great haircut.",
  },
  {
    id: "59",
    name: "Satnam Singh",
    rating: 5,
    comment: "Good people and even better haircuts.",
  },
  {
    id: "60",
    name: "Bikramjeet Singh",
    rating: 5,
    comment: "Great experience every time I visit.",
  },
  {
    id: "61",
    name: "Arshdeep Singh",
    rating: 5,
    comment: "Best fade I have ever gotten.",
  },
  {
    id: "62",
    name: "Gagan Singh",
    rating: 5,
    comment: "Highly recommend for anyone wanting a professional look.",
  },
  {
    id: "63",
    name: "Raman Singh",
    rating: 5,
    comment: "Great service and very accommodating staff.",
  },
  {
    id: "64",
    name: "Pardeep Singh",
    rating: 5,
    comment: "Best haircut and grooming services.",
  },
  {
    id: "65",
    name: "Sandeep Kaur",
    rating: 5,
    comment: "Nice environment and very skilled staff.",
  },
  {
    id: "66",
    name: "Amritpal Singh",
    rating: 5,
    comment: "Good service and very professional results.",
  },
  {
    id: "67",
    name: "Jaswinder Singh",
    rating: 5,
    comment: "Great place for a fresh cut.",
  },
  {
    id: "68",
    name: "Balkar Singh",
    rating: 5,
    comment: "Best service and very friendly staff.",
  },
  {
    id: "69",
    name: "Hardeep Singh",
    rating: 5,
    comment: "Highly satisfied with my new hairstyle.",
  },
  {
    id: "70",
    name: "Manjinder Singh",
    rating: 5,
    comment: "Excellent work and very clean shop.",
  },
  {
    id: "71",
    name: "Rajinder Singh",
    rating: 5,
    comment: "Great job on the beard trim and fade.",
  },
  {
    id: "72",
    name: "Sukhwinder Singh",
    rating: 5,
    comment: "Awesome atmosphere and great service.",
  },
  {
    id: "73",
    name: "Baljit Singh",
    rating: 5,
    comment: "The best barbers in town by far.",
  },
  {
    id: "74",
    name: "Gurinder Singh",
    rating: 5,
    comment: "Highly recommend for a top-notch haircut.",
  },
  {
    id: "75",
    name: "Tarun Kumar",
    rating: 5,
    comment: "Great service and very professional barbers.",
  },
  {
    id: "76",
    name: "Sahil Sharma",
    rating: 5,
    comment: "Best cut I've had in Lethbridge.",
  },
];



async function main() {
  const adminEmail = "ijbbarbershop@gmail.com";
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      name: "JB Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log({ admin });

  // Create default settings
  const settings = await prisma.settings.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      businessName: "JB Barbershop",
      phone: "+1 403 929 7321",
      email: "ijbbarbershop@gmail.com",
      address: "410 13 Street North, Lethbridge, Alberta T1H 2S2",
      hours: {
        mon: { open: "09:00", close: "20:00" },
        tue: { open: "09:00", close: "20:00" },
        wed: { open: "09:00", close: "20:00" },
        thu: { open: "09:00", close: "20:00" },
        fri: { open: "09:00", close: "20:00" },
        sat: { open: "09:00", close: "20:00" },
        sun: { open: "09:00", close: "19:00" },
      }
    },
  });

  console.log({ settings });

  // Seed Reviews
  console.log("Seeding reviews...");
  for (const review of SEED_REVIEWS_DATA) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        status: "APPROVED",
      },
      create: {
        id: review.id,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        status: "APPROVED",
      },
    });
  }
  console.log(`Seeded ${SEED_REVIEWS_DATA.length} reviews.`);

  // Seed Barbers
  console.log("Seeding barbers...");
  const barbers = [
    {
      name: "Jas Grewal",
      title: "Barber",
      bio: "Experienced barber skilled in modern cuts, fades, and beard styling.",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2070&auto=format&fit=crop",
      specialties: ["Modern Cuts", "Fades", "Beard Styling"],
    },
    {
      name: "Karan",
      title: "Hair Stylist",
      bio: "Specialist in trendy hairstyles and precision grooming.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop",
      specialties: ["Trendy Hairstyles", "Precision Grooming"],
    },
    {
      name: "Jeet Dhaliwal",
      title: "Beard Specialist",
      bio: "Expert in beard shaping and classic barber techniques.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop",
      specialties: ["Beard Shaping", "Classic Barbering"],
    },
  ];

  for (const b of barbers) {
    await prisma.barber.upsert({
      where: { id: b.name.toLowerCase().replace(/\s+/g, "-") },
      update: b,
      create: {
        id: b.name.toLowerCase().replace(/\s+/g, "-"),
        ...b,
      },
    });
  }
  console.log("Seeded barbers.");

  // Seed Services
  console.log("Seeding services...");
  const servicesData = [
    { id: "skin-fade-beard", name: "Skin Fade + Beard Sculpt", price: 45, duration: 45, category: "haircut", description: "Our signature precision skin fade, seamlessly blended down to the skin, paired with a detailed beard trim and razor line-up.", image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600&auto=format&fit=crop" },
    { id: "skin-fade", name: "Classic Skin Fade", price: 30, duration: 30, category: "haircut", description: "Expertly crafted fade tailored to your head shape, finishing clean to the skin for a sharp, long-lasting look.", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop" },
    { id: "regular-cut", name: "Standard Gentlemen's Cut", price: 25, duration: 30, category: "haircut", description: "A traditional haircut with scissors and clippers. Includes a clean neckline and professional styling.", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop" },
    { id: "regular-cut-beard", name: "Standard Cut + Beard Sculpt", price: 40, duration: 45, category: "haircut", description: "A traditional haircut combo with a precise beard trim, shaping, and straight razor edge-up.", image: null },
    { id: "seniors-cut", name: "Senior's Cut (65+)", price: 20, duration: 25, category: "haircut", description: "Classic styling and clipper work tailored exclusively for our distinguished senior clients.", image: null },
    { id: "kids-skin-fade", name: "Kids Skin Fade (12 & Under)", price: 25, duration: 30, category: "kids", description: "Sharp and stylish skin fades tailored specifically for the younger gentlemen.", image: null },
    { id: "kids-regular", name: "Kids Regular Cut (12 & Under)", price: 20, duration: 20, category: "kids", description: "A simple, clean haircut to keep the little guys looking smart and well-groomed.", image: null },
    { id: "hot-towel-shave", name: "Luxury Hot Towel Shave", price: 25, duration: 15, category: "shave", description: "A relaxing straight razor face shave featuring hot towels, warm lather, and soothing aftershave balms.", image: null },
    { id: "beard-trim", name: "Executive Beard Trim", price: 20, duration: 25, category: "beard", description: "Full shaping, debulking, and conditioning of the beard, finished with sharp razor lines.", image: null },
    { id: "beard-line-up", name: "Quick Beard Line Up", price: 15, duration: 15, category: "beard", description: "A fast touch-up to re-establish clean lines on your cheeks and neck using trimmers and a straight razor.", image: null },
    { id: "facials", name: "Revitalizing Facial", price: 50, duration: 30, category: "grooming", description: "A deeply cleansing and moisturizing facial treatment to refresh the skin and clear clogged pores.", image: null },
    { id: "ear-nose-wax", name: "Ear & Nose Wax", price: 5, duration: 15, category: "grooming", description: "A quick, virtually painless hard wax treatment to remove unwanted ear and nose hair.", image: null },
  ];
  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: { name: s.name, price: s.price, duration: s.duration, category: s.category, description: s.description, image: s.image },
      create: s,
    });
  }
  console.log(`Seeded ${servicesData.length} services.`);
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
