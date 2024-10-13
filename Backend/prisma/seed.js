// seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const cards = [
    {
      id: 1,
      image: `https://source.unsplash.com/random/300x200?Betta Fish`,
      title: 'Betta Fish',
      description: 'Vibrant colors and flowing fins, perfect for small tanks.',
      price: 19.99,
      link: 'https://lqrs.com/betta-fish',
    },
    {
      id: 2,
      image: `https://source.unsplash.com/random/300x200?Goldfish`,
      title: 'Goldfish',
      description: 'A classic choice for any aquarium, easy to care for.',
      price: 5.49,
      link: 'https://lqrs.com/goldfish',
    },
    {
      id: 3,
      image: `https://source.unsplash.com/random/300x200?Guppy`,
      title: 'Guppy',
      description: 'Colorful and active, great for community tanks.',
      price: 2.99,
      link: 'https://lqrs.com/guppy',
    },
    {
      id: 4,
      image: `https://source.unsplash.com/random/300x200?Neon Tetra`,
      title: 'Neon Tetra',
      description: 'Small and schooling fish with stunning blue and red colors.',
      price: 1.99,
      link: 'https://lqrs.com/neon-tetra',
    },
    {
      id: 5,
      image: `https://source.unsplash.com/random/300x200?Angelfish`,
      title: 'Angelfish',
      description: 'Elegant and graceful, perfect for larger aquariums.',
      price: 12.49,
      link: 'https://lqrs.com/angelfish',
    },
    {
      id: 6,
      image: `https://source.unsplash.com/random/300x200?Corydoras`,
      title: 'Corydoras Catfish',
      description: 'Peaceful bottom dwellers that help keep your tank clean.',
      price: 7.99,
      link: 'https://lqrs.com/corydoras',
    },
    {
      id: 7,
      image: `https://source.unsplash.com/random/300x200?Discus`,
      title: 'Discus Fish',
      description: 'Known for their beautiful shapes and colors, require special care.',
      price: 49.99,
      link: 'https://lqrs.com/discus',
    },
  ];

async function main() {
  for (const card of cards) {
    await prisma.fishDetails.create({
      data: card,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
