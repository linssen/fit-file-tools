/**
 * Mapping of product names to their numeric IDs, organized by manufacturer
 * Based on the Garmin FIT SDK Profile
 *
 * Note: Product IDs are manufacturer-specific. The same numeric ID can represent
 * different products from different manufacturers.
 */

export interface Product {
    id: number;
    name: string;
    manufacturerId: number;
}

// Garmin Products (manufacturer ID: 1)
const GARMIN_PRODUCTS: Product[] = [
    { id: 1, name: "HRM1", manufacturerId: 1 },
    { id: 2, name: "AXH01", manufacturerId: 1 },
    { id: 3, name: "AXB01", manufacturerId: 1 },
    { id: 4, name: "AXB02", manufacturerId: 1 },
    { id: 5, name: "HRM2SS", manufacturerId: 1 },
    { id: 6, name: "DSI_ALF02", manufacturerId: 1 },
    { id: 7, name: "HRM3SS", manufacturerId: 1 },
    { id: 8, name: "HRM_Run_Single", manufacturerId: 1 },
    { id: 9, name: "BSM", manufacturerId: 1 },
    { id: 10, name: "BCM", manufacturerId: 1 },
    { id: 11, name: "AXS01", manufacturerId: 1 },
    { id: 12, name: "HRM_Tri_Single", manufacturerId: 1 },
    { id: 13, name: "HRM_Dual", manufacturerId: 1 },
    { id: 14, name: "HRM4_Run", manufacturerId: 1 },
    { id: 473, name: "Forerunner 205", manufacturerId: 1 },
    { id: 474, name: "Forerunner 305", manufacturerId: 1 },
    { id: 475, name: "Forerunner 50", manufacturerId: 1 },
    { id: 494, name: "Forerunner 405", manufacturerId: 1 },
    { id: 717, name: "Forerunner 310XT", manufacturerId: 1 },
    { id: 782, name: "Edge 500", manufacturerId: 1 },
    { id: 987, name: "Forerunner 110", manufacturerId: 1 },
    { id: 988, name: "Edge 800", manufacturerId: 1 },
    { id: 1018, name: "Forerunner 610", manufacturerId: 1 },
    { id: 1036, name: "Forerunner 210", manufacturerId: 1 },
    { id: 1124, name: "Forerunner 910XT", manufacturerId: 1 },
    { id: 1169, name: "ALF04", manufacturerId: 1 },
    { id: 1199, name: "Forerunner 620", manufacturerId: 1 },
    { id: 1213, name: "Forerunner 220", manufacturerId: 1 },
    { id: 1234, name: "Approach S6", manufacturerId: 1 },
    { id: 1333, name: "Forerunner 630", manufacturerId: 1 },
    { id: 1334, name: "Forerunner 230", manufacturerId: 1 },
    { id: 1386, name: "Forerunner 735XT", manufacturerId: 1 },
    { id: 1387, name: "Forerunner 235", manufacturerId: 1 },
    { id: 1405, name: "Fenix 3", manufacturerId: 1 },
    { id: 1410, name: "Edge 820", manufacturerId: 1 },
    { id: 1422, name: "Edge Explore 1000", manufacturerId: 1 },
    { id: 1432, name: "Forerunner 35", manufacturerId: 1 },
    { id: 1446, name: "Fenix 3 HR", manufacturerId: 1 },
    { id: 1461, name: "Vivoactive HR", manufacturerId: 1 },
    { id: 1472, name: "Vivofit 3", manufacturerId: 1 },
    { id: 1497, name: "Fenix 5S", manufacturerId: 1 },
    { id: 1499, name: "Fenix 5X", manufacturerId: 1 },
    { id: 1551, name: "Edge 1030", manufacturerId: 1 },
    { id: 1561, name: "Forerunner 645", manufacturerId: 1 },
    { id: 1562, name: "Forerunner 645 Music", manufacturerId: 1 },
    { id: 1567, name: "Fenix 5S Plus", manufacturerId: 1 },
    { id: 1623, name: "Edge 130", manufacturerId: 1 },
    { id: 1619, name: "Vivoactive 3 Music", manufacturerId: 1 },
    { id: 1735, name: "Edge 1030", manufacturerId: 1 },
    { id: 1765, name: "Fenix 5 Plus", manufacturerId: 1 },
    { id: 1837, name: "Edge 520 Plus", manufacturerId: 1 },
    { id: 1903, name: "Forerunner 45", manufacturerId: 1 },
    { id: 1907, name: "Forerunner 245", manufacturerId: 1 },
    { id: 1908, name: "Forerunner 245 Music", manufacturerId: 1 },
    { id: 1913, name: "Vivoactive 4", manufacturerId: 1 },
    { id: 1918, name: "Vivoactive 4S", manufacturerId: 1 },
    { id: 1988, name: "Fenix 6S", manufacturerId: 1 },
    { id: 1989, name: "Fenix 6", manufacturerId: 1 },
    { id: 1990, name: "Fenix 6X", manufacturerId: 1 },
    { id: 2050, name: "HRM-Dual", manufacturerId: 1 },
    { id: 2052, name: "HRM-Pro", manufacturerId: 1 },
    { id: 2092, name: "Vivoactive 4S", manufacturerId: 1 },
    { id: 2145, name: "Fenix 6S Pro", manufacturerId: 1 },
    { id: 2147, name: "Fenix 6 Pro", manufacturerId: 1 },
    { id: 2148, name: "Fenix 6X Pro", manufacturerId: 1 },
    { id: 2188, name: "Forerunner 745", manufacturerId: 1 },
    { id: 2204, name: "Vivofit Jr. 3", manufacturerId: 1 },
    { id: 2238, name: "Venu 2", manufacturerId: 1 },
    { id: 2239, name: "Venu 2S", manufacturerId: 1 },
    { id: 2262, name: "Edge 1040", manufacturerId: 1 },
    { id: 2274, name: "Enduro", manufacturerId: 1 },
    { id: 2327, name: "Approach S62", manufacturerId: 1 },
    { id: 2347, name: "Vivoactive 4", manufacturerId: 1 },
    { id: 2368, name: "Forerunner 55", manufacturerId: 1 },
    { id: 2406, name: "Instinct 2", manufacturerId: 1 },
    { id: 2431, name: "Fenix 7S", manufacturerId: 1 },
    { id: 2432, name: "Fenix 7", manufacturerId: 1 },
    { id: 2433, name: "Fenix 7X", manufacturerId: 1 },
    { id: 2441, name: "Descent Mk2S", manufacturerId: 1 },
    { id: 2473, name: "Epix (Gen 2)", manufacturerId: 1 },
    { id: 2496, name: "Forerunner 255", manufacturerId: 1 },
    { id: 2497, name: "Forerunner 255 Music", manufacturerId: 1 },
    { id: 2530, name: "Venu 2 Plus", manufacturerId: 1 },
    { id: 2547, name: "Forerunner 955", manufacturerId: 1 },
    { id: 2567, name: "Edge 530", manufacturerId: 1 },
    { id: 2568, name: "Edge 830", manufacturerId: 1 },
    { id: 2691, name: "Forerunner 965", manufacturerId: 1 },
    { id: 2697, name: "Fenix 7 Pro", manufacturerId: 1 },
    { id: 2837, name: "Vivoactive 5", manufacturerId: 1 },
    { id: 2859, name: "Edge 540", manufacturerId: 1 },
    { id: 2860, name: "Edge 840", manufacturerId: 1 },
    { id: 3111, name: "Forerunner 165", manufacturerId: 1 },
    { id: 3112, name: "Forerunner 165 Music", manufacturerId: 1 },
    { id: 3122, name: "Fenix 7X Pro", manufacturerId: 1 },
    { id: 3192, name: "Fenix 8", manufacturerId: 1 },
    { id: 3287, name: "Forerunner 265", manufacturerId: 1 },
    { id: 3288, name: "Forerunner 265S", manufacturerId: 1 },
    { id: 3349, name: "Enduro 2", manufacturerId: 1 },
];

// Wahoo Fitness Products (manufacturer ID: 32)
const WAHOO_PRODUCTS: Product[] = [
    { id: 1, name: "Kickr", manufacturerId: 32 },
    { id: 2, name: "ELEMNT", manufacturerId: 32 },
    { id: 3, name: "ELEMNT BOLT", manufacturerId: 32 },
    { id: 4, name: "ELEMNT ROAM", manufacturerId: 32 },
    { id: 5, name: "Tickr", manufacturerId: 32 },
    { id: 6, name: "Kickr Core", manufacturerId: 32 },
    { id: 7, name: "Kickr Bike", manufacturerId: 32 },
    { id: 8, name: "ELEMNT BOLT v2", manufacturerId: 32 },
    { id: 9, name: "ELEMNT ROAM v2", manufacturerId: 32 },
    { id: 10, name: "Kickr Move", manufacturerId: 32 },
];

// Polar Products (manufacturer ID: 5)
const POLAR_PRODUCTS: Product[] = [
    { id: 1, name: "V650", manufacturerId: 5 },
    { id: 2, name: "M450", manufacturerId: 5 },
    { id: 3, name: "M460", manufacturerId: 5 },
    { id: 4, name: "V800", manufacturerId: 5 },
    { id: 5, name: "Vantage V", manufacturerId: 5 },
    { id: 6, name: "Vantage M", manufacturerId: 5 },
    { id: 7, name: "Grit X", manufacturerId: 5 },
    { id: 8, name: "Vantage V2", manufacturerId: 5 },
    { id: 9, name: "Pacer", manufacturerId: 5 },
    { id: 10, name: "Pacer Pro", manufacturerId: 5 },
];

// Suunto Products (manufacturer ID: 23)
const SUUNTO_PRODUCTS: Product[] = [
    { id: 1, name: "Ambit", manufacturerId: 23 },
    { id: 2, name: "Ambit2", manufacturerId: 23 },
    { id: 3, name: "Ambit3", manufacturerId: 23 },
    { id: 4, name: "Traverse", manufacturerId: 23 },
    { id: 5, name: "Spartan", manufacturerId: 23 },
    { id: 6, name: "9 Baro", manufacturerId: 23 },
    { id: 7, name: "7", manufacturerId: 23 },
    { id: 8, name: "5", manufacturerId: 23 },
    { id: 9, name: "3", manufacturerId: 23 },
    { id: 10, name: "9 Peak", manufacturerId: 23 },
];

// Coros Products (manufacturer ID: 294)
const COROS_PRODUCTS: Product[] = [
    { id: 1, name: "Apex", manufacturerId: 294 },
    { id: 2, name: "Apex Pro", manufacturerId: 294 },
    { id: 3, name: "Pace 2", manufacturerId: 294 },
    { id: 4, name: "Vertix", manufacturerId: 294 },
    { id: 5, name: "Vertix 2", manufacturerId: 294 },
    { id: 6, name: "Apex 2", manufacturerId: 294 },
    { id: 7, name: "Apex 2 Pro", manufacturerId: 294 },
    { id: 8, name: "Pace 3", manufacturerId: 294 },
];

// Combine all products
export const ALL_PRODUCTS: Product[] = [
    ...GARMIN_PRODUCTS,
    ...WAHOO_PRODUCTS,
    ...POLAR_PRODUCTS,
    ...SUUNTO_PRODUCTS,
    ...COROS_PRODUCTS,
];

/**
 * Get product name by ID and manufacturer ID
 */
export function getProductName(
    productId: number,
    manufacturerId: number
): string {
    const product = ALL_PRODUCTS.find(
        (p) => p.id === productId && p.manufacturerId === manufacturerId
    );
    return product ? product.name : `Unknown Product (${productId})`;
}

/**
 * Get product ID by name and manufacturer ID
 */
export function getProductId(
    name: string,
    manufacturerId: number
): number | undefined {
    const product = ALL_PRODUCTS.find(
        (p) => p.name === name && p.manufacturerId === manufacturerId
    );
    return product?.id;
}

/**
 * Get all products for a specific manufacturer
 */
export function getProductsForManufacturer(manufacturerId: number): Product[] {
    return ALL_PRODUCTS.filter((p) => p.manufacturerId === manufacturerId);
}
