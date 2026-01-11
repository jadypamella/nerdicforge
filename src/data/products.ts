// Product data - local storage instead of Shopify API
// This replaces the need for external product management

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;        // Price in SEK
    currency: string;     // "SEK"
    image: string;        // Primary image URL
    images: string[];     // All product images
    category: string;     // Product category for filtering
    franchise: string;    // Character franchise
    inStock: boolean;     // Availability
    tags: string[];       // Search/filter tags
}

// Sample products - in production, this could come from a database
export const products: Product[] = [
    {
        id: "prod_001",
        name: "Omni-Man Statue",
        description: "Premium hand-painted statue of Omni-Man from Invincible. This museum-quality collectible features incredible detail and dynamic pose. Made with high-quality resin and hand-painted by skilled artisans.",
        price: 2499,
        currency: "SEK",
        image: "/products/ominiman.jpeg",
        images: ["/products/ominiman.jpeg"],
        category: "Statues",
        franchise: "Invincible",
        inStock: true,
        tags: ["invincible", "superhero", "villain", "amazon"]
    },
    {
        id: "prod_002",
        name: "Griffith - Band of the Hawk",
        description: "Stunning statue of Griffith from Berserk in his iconic Band of the Hawk armor. Every detail of the armor is meticulously crafted. A must-have for any Berserk collector.",
        price: 3299,
        currency: "SEK",
        image: "/products/griffith.jpeg",
        images: ["/products/griffith.jpeg"],
        category: "Statues",
        franchise: "Berserk",
        inStock: true,
        tags: ["berserk", "anime", "manga", "griffith"]
    },
    {
        id: "prod_003",
        name: "Conan the Barbarian",
        description: "Epic statue of Conan the Barbarian in a dynamic battle pose. Features incredible muscle definition and weathered battle damage. Premium resin construction.",
        price: 2799,
        currency: "SEK",
        image: "/products/conan.jpeg",
        images: ["/products/conan.jpeg"],
        category: "Statues",
        franchise: "Conan",
        inStock: true,
        tags: ["conan", "barbarian", "classic", "warrior"]
    },
    {
        id: "prod_004",
        name: "Guts - Black Swordsman",
        description: "Guts in his iconic Black Swordsman armor wielding the Dragon Slayer. This massive statue captures the raw power and determination of the legendary manga character.",
        price: 3999,
        currency: "SEK",
        image: "/products/griffith.jpeg",
        images: ["/products/griffith.jpeg"],
        category: "Statues",
        franchise: "Berserk",
        inStock: true,
        tags: ["berserk", "anime", "manga", "guts"]
    },
    {
        id: "prod_005",
        name: "Invincible - Mark Grayson",
        description: "Mark Grayson as Invincible in his classic blue and yellow costume. Dynamic flying pose with incredible detail. Perfect companion to the Omni-Man statue.",
        price: 2299,
        currency: "SEK",
        image: "/products/ominiman.jpeg",
        images: ["/products/ominiman.jpeg"],
        category: "Statues",
        franchise: "Invincible",
        inStock: true,
        tags: ["invincible", "superhero", "amazon", "mark"]
    },
    {
        id: "prod_006",
        name: "Red Sonja",
        description: "The She-Devil with a Sword in all her glory. Red Sonja statue featuring her iconic chainmail bikini armor and battle-ready stance.",
        price: 2599,
        currency: "SEK",
        image: "/products/conan.jpeg",
        images: ["/products/conan.jpeg"],
        category: "Statues",
        franchise: "Red Sonja",
        inStock: true,
        tags: ["red sonja", "warrior", "classic", "conan universe"]
    },
    {
        id: "prod_007",
        name: "Skull Knight",
        description: "The mysterious Skull Knight from Berserk on his ethereal steed. This premium statue captures the otherworldly presence of this fan-favorite character.",
        price: 4499,
        currency: "SEK",
        image: "/products/griffith.jpeg",
        images: ["/products/griffith.jpeg"],
        category: "Statues",
        franchise: "Berserk",
        inStock: false,
        tags: ["berserk", "anime", "manga", "skull knight"]
    },
    {
        id: "prod_008",
        name: "Battle Beast",
        description: "The fearsome Battle Beast from Invincible in combat stance. Features incredibly detailed fur texture and battle-scarred armor.",
        price: 2899,
        currency: "SEK",
        image: "/products/ominiman.jpeg",
        images: ["/products/ominiman.jpeg"],
        category: "Statues",
        franchise: "Invincible",
        inStock: true,
        tags: ["invincible", "villain", "amazon", "battle beast"]
    }
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        p.franchise.toLowerCase().includes(lowerQuery)
    );
}

// Helper function to filter by category
export function getProductsByCategory(category: string): Product[] {
    return products.filter(p => p.category === category);
}

// Helper function to get unique categories
export function getCategories(): string[] {
    return [...new Set(products.map(p => p.category))];
}

// Helper function to get unique franchises
export function getFranchises(): string[] {
    return [...new Set(products.map(p => p.franchise))];
}

// Format price for display
export function formatPrice(amount: number, currency: string = "SEK"): string {
    return new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}
