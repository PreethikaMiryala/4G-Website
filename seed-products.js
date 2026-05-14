const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const products = [
    {
      name: "Majoon-e-Shabab",
      slug: "majoon-e-shabab",
      description: "A premium vitality booster crafted with authentic Unani herbs, saffron, and pure honey to enhance strength and stamina.",
      price: 1499,
      comparePrice: 1999,
      images: ["/products/product-1.png"],
      category: "Vitality",
      stock: 50,
      isFeatured: true,
    },
    {
      name: "Pure Arq-e-Gulab",
      slug: "pure-arq-e-gulab",
      description: "Steam-distilled rose water from premium Damascus roses. Perfect for skin hydration and natural glow.",
      price: 299,
      comparePrice: 450,
      images: ["/products/product-2.png"],
      category: "Skin Care",
      stock: 100,
      isFeatured: true,
    },
    {
      name: "Khamira Gaozaban",
      slug: "khamira-gaozaban",
      description: "A traditional heart and brain tonic that helps reduce anxiety and improves mental clarity.",
      price: 850,
      comparePrice: 1100,
      images: ["/products/product-1.png"],
      category: "Wellness",
      stock: 30,
      isFeatured: true,
    },
    {
      name: "Saffron Infused Honey",
      slug: "saffron-infused-honey",
      description: "Premium Sidr honey infused with A++ grade Kashmiri Saffron. A luxury health supplement for all ages.",
      price: 2499,
      comparePrice: 2999,
      images: ["/products/product-4.png"],
      category: "Supplements",
      stock: 25,
      isFeatured: true,
    },
    {
      name: "Digestive Luxe Churan",
      slug: "digestive-luxe-churan",
      description: "A sophisticated blend of carminative herbs to support digestion after heavy meals.",
      price: 499,
      comparePrice: 650,
      images: ["/products/product-3.png"],
      category: "Digestion",
      stock: 75,
      isFeatured: false,
    },
    {
      name: "Roghan-e-Badam Shirin",
      slug: "roghan-e-badam-shirin",
      description: "100% pure sweet almond oil extracted using cold-press technique for hair and skin nourishment.",
      price: 650,
      comparePrice: 850,
      images: ["/products/product-2.png"],
      category: "Hair Care",
      stock: 60,
      isFeatured: false,
    },
    {
      name: "Immunity Kadha Concentrate",
      slug: "immunity-kadha-concentrate",
      description: "Potent liquid concentrate of Tulsi, Giloy, and Turmeric to boost daily immunity.",
      price: 399,
      comparePrice: 550,
      images: ["/products/product-2.png"],
      category: "Wellness",
      stock: 120,
      isFeatured: false,
    },
    {
      name: "Herbal Relief Balm",
      slug: "herbal-relief-balm",
      description: "Fast-acting pain relief balm made with Menthol, Eucalyptus, and Clove oil.",
      price: 199,
      comparePrice: 250,
      images: ["/products/product-3.png"],
      category: "Pain Relief",
      stock: 200,
      isFeatured: false,
    },
    {
      name: "Zaitoon-e-Shifa",
      slug: "zaitoon-e-shifa",
      description: "Premium extra virgin olive oil infused with black seed for overall healing.",
      price: 1200,
      comparePrice: 1500,
      images: ["/products/product-2.png"],
      category: "Supplements",
      stock: 45,
      isFeatured: false,
    },
    {
      name: "Mukhwas Premium Blend",
      slug: "mukhwas-premium-blend",
      description: "A luxury mouth freshener made with fennel, dates, and rose petals.",
      price: 350,
      comparePrice: 499,
      images: ["/products/product-3.png"],
      category: "Lifestyle",
      stock: 85,
      isFeatured: false,
    },
    {
      name: "Hair Vitality Serum",
      slug: "hair-vitality-serum",
      description: "Ancient herbal formula to reduce hair fall and promote thick, lustrous growth.",
      price: 999,
      comparePrice: 1350,
      images: ["/products/product-2.png"],
      category: "Hair Care",
      stock: 40,
      isFeatured: true,
    },
    {
      name: "Sleep Induction Tea",
      slug: "sleep-induction-tea",
      description: "A calming blend of Lavender, Chamomile, and Ashwagandha for deep, restful sleep.",
      price: 599,
      comparePrice: 799,
      images: ["/products/product-4.png"],
      category: "Wellness",
      stock: 65,
      isFeatured: false,
    },
  ];

  console.log('Seeding products...');
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
