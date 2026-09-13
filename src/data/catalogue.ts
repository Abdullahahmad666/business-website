/**
 * The catalogue itself — every class, every line under it, every product.
 *
 * This used to live inside the two page components that render it, which made
 * it unreachable from anywhere else. The build now derives per-route <title>
 * and link-preview cards from the same records (see src/data/seo.ts), so a
 * product renamed here is renamed in its search result and its shared card
 * without anyone having to remember the second place.
 *
 * Keys are URL segments: SUBCATEGORIES is keyed by /categories/:category and
 * PRODUCTS by /products/:subcategory.
 */

export type Line = {
  id: string;
  name: string;
  count: number;
  image: string;
  link: string;
};

export type CategoryEntry = {
  title: string;
  description: string;
  subcategories: Line[];
};

export const SUBCATEGORIES: Record<string, CategoryEntry> = {
  cars: {
    title: "CARS",
    description: "Browse our selection of quality cars available for import and export.",
    subcategories: [
      {
        id: "used-cars",
        name: "USED CARS",
        count: 15,
        image: "/asuppal/usedcar.jpg",
        link: "/products/used-cars",
      },
      {
        id: "accidental-cars",
        name: "ACCIDENTAL CARS",
        count: 8,
        image: "/asuppal/accidental.jpg",
        link: "/products/accidental-cars",
      },
      {
        id: "construction-trucks",
        name: "Construction Trucks",
        count: 8,
        image: "/asuppal/constructiontrucks.jpg",
        link: "/products/construction-trucks",
      },
    ],
  },
  laptop: {
    title: "LAPTOP",
    description: "Explore our range of laptops and computer equipment.",
    subcategories: [
      {
        id: "used-laptops",
        name: "USED LAPTOPS",
        count: 12,
        image: "/asuppal/usedlap.jpg",
        link: "/products/used-laptops",
      },
      {
        id: "scrap-laptops",
        name: "LAPTOPS SCRAP",
        count: 18,
        image: "/asuppal/laptopscrap.jpg",
        link: "/products/scrap-laptops",
      },
    ],
  },
  nuts: {
    title: "NUTS",
    description: "Premium quality nuts for wholesale and bulk orders.",
    subcategories: [
      {
        id: "almonds",
        name: "ALMONDS",
        count: 5,
        image: "/asuppal/almond.jpg",
        link: "/products/almonds",
      },
      {
        id: "peanuts",
        name: "PEANUTS",
        count: 3,
        image: "/asuppal/peanuts.jpg",
        link: "/products/peanuts",
      },
      {
        id: "pistachios",
        name: "PISTACHIOS",
        count: 4,
        image: "/asuppal/pista.jpg",
        link: "/products/pistachios",
      },
      {
        id: "walnuts",
        name: "WALNUTS",
        count: 2,
        image: "/asuppal/walnut.jpg",
        link: "/products/walnuts",
      },
    ],
  },
  oil: {
    title: "OIL",
    description: "High-quality oils for various industrial and commercial applications.",
    subcategories: [
      {
        id: "cooking-oil",
        name: "COOKING OIL",
        count: 7,
        image: "/asuppal/oilland.jpg",
        link: "/products/cooking-oil",
      },
      
    ],
  },
  scrap: {
    title: "SCRAP",
    description: "Quality scrap materials for recycling and industrial use.",
    subcategories: [
      {
        id: "motor-scrap",
        name: "MOTOR SCRAP",
        count: 12,
        image: "/asuppal/motorscrap.jpg",
        link: "/products/motor-scrap",
      },
      {
        id: "copper-scrap",
        name: "COPPER SCRAP",
        count: 8,
        image: "/asuppal/copperscrap.jpg",
        link: "/products/copper-scrap",
      },
      {
        id: "iron-scrap",
        name: "IRON SCRAP",
        count: 6,
        image: "/asuppal/ironscrap.jpg",
        link: "/products/iron-scrap",
      },
      {
        id: "compressor-scrap",
        name: "Compressor SCRAP",
        count: 6,
        image: "/asuppal/compressor.jpeg",
        link: "/products/compressor-scrap",
      },
      {
        id: "aluminium-scrap",
        name: "Aluminium SCRAP",
        count: 6,
        image: "/asuppal/aluminium.jpeg",
        link: "/products/aluminium-scrap",
      },
    ],
  },
}

export type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
};

export const PRODUCTS: Record<string, Product[]> = {
  "used-cars": [
    {
      id: 1,
      name: "Used Cars",
      price: "Price Varying",
      description:
        "Discover reliable used cars at affordable prices. Each vehicle is thoroughly inspected for performance and safety. Ideal for daily use, family rides, or first-time buyers.",
      specifications: {
        Condition: "Used",
        Year: "2000 - 2024",
        Make: "All Companies",
        Model: "All Models",
        Mileage: "10,000 km - 60,000 km",
        "Fuel Type": "Petrol/Diesel/Hybrid", 
        Transmission: "Automatic/Manual",
        Color: "Different Colors available",
      },
      images: [
        "/asuppal/usedcar.jpg",
        "/asuppal/carsland.jpg",
        
      ],
    },
  ],
  "accidental-cars": [
    {
      id: 1,
      name: "Accidental Cars",
      price: "Price Varying",
      description:
        "Browse our collection of accidental cars – sold as-is. Great for spare parts, restoration projects, or resale. Transparent listings with honest condition reports.",
      specifications: {
        Condition: "Repaired/Accidental",
        Year: "2000 - 2024",
        Make: "All Companies",
        Model: "All Models",
        Mileage: "10,000 km - 60,000 km",
        "Fuel Type": "Petrol/Diesel/Hybrid",
        Transmission: "Automatic/Manual",
        Color: "Different Colors available",
        
      },
      images: [
        "/asuppal/accidentalcar.jpg",
        "/asuppal/accidental.jpg",
       
      ],
    },
  ],
  "construction-trucks": [
    {
      id: 1,
      name: "Construction Trucks",
      price: "Price Varying",
      description:
        "Explore our range of construction trucks, designed for heavy-duty tasks. Ideal for construction sites, transportation of materials, and industrial use. Reliable and durable vehicles to meet your business needs.",
      specifications: {
        Condition: "New/Used",
        Year: "2000 - 2024",
        Make: "All Companies",
        Model: "All Models",
        Mileage: "10,000 km - 60,000 km",
        "Fuel Type": "Petrol/Diesel/Hybrid",
        Transmission: "Automatic/Manual",
        Color: "Different Colors available",
        
      },
      images: [
        "/asuppal/truck.jpg",
        "/asuppal/trucks.jpg",
        "/asuppal/constructiontrucks.jpg",
       
      ],
    },
  ],
  "used-laptops": [
    {
      id: 1,
      name: "Used Laptops",
      price: "Price Varying",
      description:
        "Explore our range of used laptops, perfect for students and professionals. Each laptop is tested for performance and reliability. Ideal for work, study, or casual use.",
      specifications: {
        Condition: "Used",
        Brand: "All Brands",
        Model: "All Models",
        Processor: "Processors Vary",
        RAM: "8GB - 32GB",
        Storage: "128GB - 1TB SSD/HDD",
        Display: '"13.3 - 17.3"',
        Graphics: "Integrated/Dedicated",
        Battery: "Good Condition",
      },
      images: [
        "/asuppal/usedlaptops.jpg",
        "/asuppal/usedlap.jpg",
        
      ],
    },
  ],
  "scrap-laptops": [
    {
      id: 1,
      name: "Scrap Laptops",
      price: "Price Varying",
      description:
        "Discover our collection of scrap laptops, ideal for parts or recycling. Each unit is sold as-is, with no warranty. Perfect for DIY enthusiasts or repair shops.",
      specifications: {
        Condition: "Scrap",
        Brand: "All Brands",
        Model: "All Models",
        Processor: "Processors Vary",
        RAM: "8GB - 32GB",
        Storage: "128GB - 1TB SSD/HDD",
        Display: '"13.3 - 17.3"',
        Graphics: "Integrated/Dedicated",
        Battery: "Condition Vary",
      },
      images: [
        "/asuppal/laptopscrap.jpg",
        "/asuppal/scraplap.jpg",
        
      ],
    },
  ],
  almonds: [
    {
      id: 1,
      name: "Premium Almonds",
      price: "Price Vary",
      description:
        "Our premium California almonds are sourced directly from select farms in the Central Valley. These high-quality almonds are perfect for snacking, baking, or making almond milk. Available in bulk quantities for wholesale customers with competitive pricing for large orders.",
      specifications: {
        Origin: "California, USA",
        Grade: "Premium",
        Type: "Nonpareil",
        Packaging: "25kg bags",
        Certification: "USDA Organic",
        "Minimum Order": "500kg",
        "Shelf Life": "12 months",
        Storage: "Cool, dry place",
      },
      images: [
        "/asuppal/almonds.jpg",
        "/asuppal/almond.jpg",
      ],
    },
  ],
  walnuts: [
    {
      id: 1,
      name: "Premium Walnuts",
      price: "Price Vary",
      description:
        "Our premium California walnuts are sourced directly from select farms in the Central Valley. These high-quality walnuts are perfect for snacking, baking, or making walnut oil. Available in bulk quantities for wholesale customers with competitive pricing for large orders.",
      specifications: {
        Origin: "California, USA",
        Grade: "Premium",
        Type: "English Walnut",
        Packaging: "25kg bags",
        Certification: "USDA Organic",
        "Minimum Order": "500kg",
        "Shelf Life": "12 months",
        Storage: "Cool, dry place",
      },
      images: [
        "/asuppal/walnutsland.jpg",
        "/asuppal/walnut.jpg",
      ],
    },
  ],
  peanuts: [
    {
      id: 1,
      name: "Premium Peanuts",
      price: "Price Vary",
      description:
        "Our premium peanuts are sourced from the best farms in the USA. These high-quality peanuts are perfect for snacking, baking, or making peanut butter. Available in bulk quantities for wholesale customers with competitive pricing for large orders.",
      specifications: {
        Origin: "California, USA",
        Grade: "Premium",
        Type: "Nonpareil",
        Packaging: "25kg bags",
        Certification: "USDA Organic",
        "Minimum Order": "500kg",
        "Shelf Life": "12 months",
        Storage: "Cool, dry place",
      },
      images: [
        "/asuppal/peanuts.jpg",
        "/asuppal/peanut.jpg",
      ],
    },
  ],
  pistachios: [
    {
      id: 1,
      name: "Premium Pistachios",
      price: "Price Vary",
      description:
        "Our premium pistachios are sourced from the best farms in the USA. These high-quality pistachios are perfect for snacking, baking, or making pistachio butter. Available in bulk quantities for wholesale customers with competitive pricing for large orders.",
      specifications: {
        Origin: "California, USA",
        Grade: "Premium",
        Type: "Nonpareil",
        Packaging: "25kg bags",
        Certification: "USDA Organic",
        "Minimum Order": "500kg",
        "Shelf Life": "12 months",
        Storage: "Cool, dry place",
      },
      images: [
        "/asuppal/pistachios.jpg",
        "/asuppal/pista.jpg",
      ],
    },
  ],

  "cooking-oil": [
    {
      id: 1,
      name: "Cooking Oil",
      price: "Depend on Companies",
      description:
        "Our cooking oil is sourced from the finest suppliers, ensuring high quality and purity. Ideal for all types of cooking, frying, and baking. Available in various packaging options to suit your needs.",
      specifications: {
        Origin: "USA",
        Type: "Vegetable Oil/Canola Oil/Olive Oil",
        Grade: "Premium",
        Packaging: "25kg bags",
        Certification: "Organic",
        "Minimum Order": "500kg",
        "Shelf Life": "2 months",
        Storage: "Cool, dry place",
      },
      images: [
        "/asuppal/oilland.jpg",
        "/asuppal/oilcan.jpg",
       
      ],
    },
  ],
  "motor-scrap": [
    {
      id: 1,
      name: "High-Grade Motor Scrap",
      price: "Price Vary",
      description:
        "High-grade Motor scrap material sourced from industrial electrical components. This Motor scrap is 99% pure and ideal for recycling and manufacturing applications. We ensure proper sorting and cleaning of all materials before delivery. Available in large quantities for industrial buyers.",
      specifications: {
        Type: "Motor Scrap",
        Purity: "99%",
        Source: "Industrial Electrical",
        Form: "Wire and Components",
        Packaging: "1-ton bags",
        "Minimum Order": "5 tons",
        "Price Basis": "LME - 10%",
        Delivery: "FOB Port",
      },
      images: [
        "/asuppal/motor.jpg",
        "/asuppal/motorscrap.jpg",
        "/asuppal/mototrland.jpg",
        
      ],
    },
  ],
  "iron-scrap": [
    {
      id: 1,
      name: "High-Grade Iron Scrap",
      price: "Price Vary",
      description:
        "High-grade Iron scrap material sourced from industrial electrical components. This Iron scrap is 99% pure and ideal for recycling and manufacturing applications. We ensure proper sorting and cleaning of all materials before delivery. Available in large quantities for industrial buyers.",
      specifications: {
        Type: "Iron Scrap",
        Purity: "99%",
        Source: "Industrial Electrical",
        Form: "Wire and Components",
        Packaging: "1-ton bags",
        "Minimum Order": "5 tons",
        "Price Basis": "LME - 10%",
        Delivery: "FOB Port",
      },
      images: [
        "/asuppal/iron.jpg",
        "/asuppal/ironscrap.jpg",
      
        
      ],
    },
  ],
  "copper-scrap": [
    {
      id: 1,
      name: "High-Grade Copper Scrap",
      price: "Price Vary",
      description:
        "High-grade Copper scrap material sourced from industrial electrical components. This Copper scrap is 99% pure and ideal for recycling and manufacturing applications. We ensure proper sorting and cleaning of all materials before delivery. Available in large quantities for industrial buyers.",
      specifications: {
        Type: "Copper Scrap",
        Purity: "99%",
        Source: "Industrial Electrical",
        Form: "Wire and Components",
        Packaging: "1-ton bags",
        "Minimum Order": "5 tons",
        "Price Basis": "LME - 10%",
        Delivery: "FOB Port",
      },
      images: [
        "/asuppal/copper.jpg",
        "/asuppal/copperscrap.jpg",
        
      ],
    },
  ],
  "compressor-scrap": [
    {
      id: 1,
      name: "Compressor Scrap",
      price: "Price Vary",
      description:
        "High-grade Compressor scrap material sourced from industrial electrical components. This Compressor scrap is 99% pure and ideal for recycling and manufacturing applications. We ensure proper sorting and cleaning of all materials before delivery. Available in large quantities for industrial buyers.",
      specifications: {
        Type: "Compressor Scrap",
        Purity: "99%",
        Source: "Industrial Electrical",
        Form: "Wire and Components",
        Packaging: "1-ton bags",
        "Minimum Order": "5 tons",
        "Price Basis": "LME - 10%",
        Delivery: "FOB Port",
      },
      images: [
        "/asuppal/compressorscrap.jpg",
        "/asuppal/compressor.jpeg",
      
        
      ],
    },
  ],
  "aluminium-scrap": [
    {
      id: 1,
      name: "Aluminium Scrap",
      price: "Price Vary",
      description:
        "High-grade Aluminium scrap material sourced from industrial electrical components. This Aluminium scrap is 99% pure and ideal for recycling and manufacturing applications. We ensure proper sorting and cleaning of all materials before delivery. Available in large quantities for industrial buyers.",
      specifications: {
        Type: "Aluminium Scrap",
        Purity: "99%",
        Source: "Industrial Electrical",
        Form: "Wire and Components",
        Packaging: "1-ton bags",
        "Minimum Order": "5 tons",
        "Price Basis": "LME - 10%",
        Delivery: "FOB Port",
      },
      images: [
        "/asuppal/aluminum-scrap.jpg",
        "/asuppal/aluminium.jpeg",
      
        
      ],
    },
  ],
}
