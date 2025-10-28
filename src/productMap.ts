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
// Verified product IDs from Garmin FIT SDK
const GARMIN_PRODUCTS: Product[] = [
    // Sensors and Accessories
    { id: 1, name: "HRM1", manufacturerId: 1 },
    { id: 2, name: "AXH01", manufacturerId: 1 },
    { id: 3, name: "AXB01", manufacturerId: 1 },
    { id: 4, name: "AXB02", manufacturerId: 1 },
    { id: 5, name: "HRM2SS", manufacturerId: 1 },
    { id: 6, name: "DSI ALF02", manufacturerId: 1 },
    { id: 7, name: "HRM3SS", manufacturerId: 1 },
    { id: 8, name: "HRM-Run (Single)", manufacturerId: 1 },
    { id: 9, name: "BSM", manufacturerId: 1 },
    { id: 10, name: "BCM", manufacturerId: 1 },
    { id: 11, name: "AXS01", manufacturerId: 1 },
    { id: 12, name: "HRM-Tri (Single)", manufacturerId: 1 },
    { id: 13, name: "HRM4 Run (Single)", manufacturerId: 1 },
    { id: 14, name: "FR225 (Single Byte)", manufacturerId: 1 },
    { id: 15, name: "Gen3 BSM (Single Byte)", manufacturerId: 1 },
    { id: 16, name: "Gen3 BCM (Single Byte)", manufacturerId: 1 },
    { id: 22, name: "HRM-Fit (Single Byte)", manufacturerId: 1 },
    { id: 255, name: "OHR", manufacturerId: 1 },

    // Forerunner Series
    { id: 717, name: "Forerunner 405", manufacturerId: 1 },
    { id: 782, name: "Forerunner 50", manufacturerId: 1 },
    { id: 987, name: "Forerunner 110", manufacturerId: 1 },
    { id: 988, name: "Forerunner 60", manufacturerId: 1 },
    { id: 1018, name: "Forerunner 310XT", manufacturerId: 1 },
    { id: 1124, name: "Forerunner 110 (Japan)", manufacturerId: 1 },
    { id: 1345, name: "Forerunner 610", manufacturerId: 1 },
    { id: 1410, name: "Forerunner 610 (Japan)", manufacturerId: 1 },
    { id: 1436, name: "Forerunner 70", manufacturerId: 1 },
    { id: 1482, name: "Forerunner 10", manufacturerId: 1 },
    { id: 1623, name: "Forerunner 620", manufacturerId: 1 },
    { id: 1632, name: "Forerunner 220", manufacturerId: 1 },
    { id: 1752, name: "HRM-Run", manufacturerId: 1 },
    { id: 1903, name: "Forerunner 15", manufacturerId: 1 },
    { id: 2148, name: "Forerunner 25", manufacturerId: 1 },
    { id: 2153, name: "Forerunner 225", manufacturerId: 1 },
    { id: 2156, name: "Forerunner 630", manufacturerId: 1 },
    { id: 2157, name: "Forerunner 230", manufacturerId: 1 },
    { id: 2158, name: "Forerunner 735XT", manufacturerId: 1 },
    { id: 2327, name: "HRM4 Run", manufacturerId: 1 },
    { id: 2431, name: "Forerunner 235", manufacturerId: 1 },
    { id: 2503, name: "Forerunner 35", manufacturerId: 1 },
    { id: 2886, name: "Forerunner 645", manufacturerId: 1 },
    { id: 2888, name: "Forerunner 645 Music", manufacturerId: 1 },
    { id: 2891, name: "Forerunner 30", manufacturerId: 1 },
    { id: 3076, name: "Forerunner 245", manufacturerId: 1 },
    { id: 3077, name: "Forerunner 245 Music", manufacturerId: 1 },
    { id: 3282, name: "Forerunner 45", manufacturerId: 1 },
    { id: 3589, name: "Forerunner 745", manufacturerId: 1 },
    { id: 3869, name: "Forerunner 55", manufacturerId: 1 },
    { id: 3990, name: "Forerunner 255 Music", manufacturerId: 1 },
    { id: 3991, name: "Forerunner 255S Music", manufacturerId: 1 },
    { id: 3992, name: "Forerunner 255", manufacturerId: 1 },
    { id: 3993, name: "Forerunner 255S", manufacturerId: 1 },
    { id: 4024, name: "Forerunner 955", manufacturerId: 1 },
    { id: 4257, name: "Forerunner 265", manufacturerId: 1 },
    { id: 4258, name: "Forerunner 265S", manufacturerId: 1 },
    { id: 4315, name: "Forerunner 965", manufacturerId: 1 },
    { id: 4432, name: "Forerunner 165", manufacturerId: 1 },
    { id: 4433, name: "Forerunner 165 Music", manufacturerId: 1 },

    // Fenix Series
    { id: 1551, name: "Fenix", manufacturerId: 1 },
    { id: 1967, name: "Fenix 2", manufacturerId: 1 },
    { id: 2050, name: "Fenix 3", manufacturerId: 1 },
    { id: 2413, name: "Fenix 3 HR", manufacturerId: 1 },
    { id: 2432, name: "Fenix 3 Chronos", manufacturerId: 1 },
    { id: 2544, name: "Fenix 5S", manufacturerId: 1 },
    { id: 2604, name: "Fenix 5X", manufacturerId: 1 },
    { id: 2697, name: "Fenix 5", manufacturerId: 1 },
    { id: 2900, name: "Fenix 5S Plus", manufacturerId: 1 },
    { id: 3110, name: "Fenix 5 Plus", manufacturerId: 1 },
    { id: 3111, name: "Fenix 5X Plus", manufacturerId: 1 },
    { id: 3287, name: "Fenix 6S Sport", manufacturerId: 1 },
    { id: 3288, name: "Fenix 6S", manufacturerId: 1 },
    { id: 3289, name: "Fenix 6 Sport", manufacturerId: 1 },
    { id: 3290, name: "Fenix 6", manufacturerId: 1 },
    { id: 3291, name: "Fenix 6X", manufacturerId: 1 },
    { id: 3905, name: "Fenix 7S", manufacturerId: 1 },
    { id: 3906, name: "Fenix 7", manufacturerId: 1 },
    { id: 3907, name: "Fenix 7X", manufacturerId: 1 },
    { id: 4374, name: "Fenix 7S Pro Solar", manufacturerId: 1 },
    { id: 4375, name: "Fenix 7 Pro Solar", manufacturerId: 1 },
    { id: 4376, name: "Fenix 7X Pro Solar", manufacturerId: 1 },
    { id: 4532, name: "Fenix 8 Solar", manufacturerId: 1 },
    { id: 4533, name: "Fenix 8 Solar Large", manufacturerId: 1 },
    { id: 4534, name: "Fenix 8 Small", manufacturerId: 1 },
    { id: 4536, name: "Fenix 8", manufacturerId: 1 },
    { id: 4666, name: "Fenix E", manufacturerId: 1 },

    // Edge Series
    { id: 1036, name: "Edge 500", manufacturerId: 1 },
    { id: 1169, name: "Edge 800", manufacturerId: 1 },
    { id: 1325, name: "Edge 200", manufacturerId: 1 },
    { id: 1561, name: "Edge 510", manufacturerId: 1 },
    { id: 1567, name: "Edge 810", manufacturerId: 1 },
    { id: 1736, name: "Edge Touring", manufacturerId: 1 },
    { id: 1765, name: "Forerunner 920XT", manufacturerId: 1 },
    { id: 1836, name: "Edge 1000", manufacturerId: 1 },
    { id: 2067, name: "Edge 520", manufacturerId: 1 },
    { id: 2147, name: "Edge 25", manufacturerId: 1 },
    { id: 2204, name: "Edge Explore 1000", manufacturerId: 1 },
    { id: 2238, name: "Edge 20", manufacturerId: 1 },
    { id: 2530, name: "Edge 820", manufacturerId: 1 },
    { id: 2531, name: "Edge Explore 820", manufacturerId: 1 },
    { id: 2713, name: "Edge 1030", manufacturerId: 1 },
    { id: 2909, name: "Edge 130", manufacturerId: 1 },
    { id: 3011, name: "Edge Explore", manufacturerId: 1 },
    { id: 3112, name: "Edge 520 Plus", manufacturerId: 1 },
    { id: 3121, name: "Edge 530", manufacturerId: 1 },
    { id: 3122, name: "Edge 830", manufacturerId: 1 },
    { id: 3349, name: "Edge 530 (APAC)", manufacturerId: 1 },
    { id: 3558, name: "Edge 130 Plus", manufacturerId: 1 },
    { id: 3570, name: "Edge 1030 Plus", manufacturerId: 1 },
    { id: 3843, name: "Edge 1040", manufacturerId: 1 },
    { id: 4061, name: "Edge 540", manufacturerId: 1 },
    { id: 4062, name: "Edge 840", manufacturerId: 1 },
    { id: 4169, name: "Edge Explore 2", manufacturerId: 1 },
    { id: 4440, name: "Edge 1050", manufacturerId: 1 },

    // Venu Series
    { id: 3226, name: "Venu", manufacturerId: 1 },
    { id: 3596, name: "Venu SQ Music", manufacturerId: 1 },
    { id: 3600, name: "Venu SQ", manufacturerId: 1 },
    { id: 3703, name: "Venu 2", manufacturerId: 1 },
    { id: 3704, name: "Venu 2S", manufacturerId: 1 },
    { id: 3851, name: "Venu 2 Plus", manufacturerId: 1 },
    { id: 4115, name: "Venu SQ 2", manufacturerId: 1 },
    { id: 4116, name: "Venu SQ 2 Music", manufacturerId: 1 },
    { id: 4260, name: "Venu 3", manufacturerId: 1 },
    { id: 4261, name: "Venu 3S", manufacturerId: 1 },

    // Vivoactive Series
    { id: 1907, name: "Vivoactive", manufacturerId: 1 },
    { id: 2337, name: "Vivoactive HR", manufacturerId: 1 },
    { id: 2700, name: "Vivoactive 3", manufacturerId: 1 },
    { id: 2988, name: "Vivoactive 3 Music (Women)", manufacturerId: 1 },
    { id: 3066, name: "Vivoactive 3 Music (Large)", manufacturerId: 1 },
    { id: 3224, name: "Vivoactive 4S", manufacturerId: 1 },
    { id: 3225, name: "Vivoactive 4", manufacturerId: 1 },
    { id: 4426, name: "Vivoactive 5", manufacturerId: 1 },
    { id: 4625, name: "Vivoactive 6", manufacturerId: 1 },

    // Instinct Series
    { id: 3126, name: "Instinct Esports", manufacturerId: 1 },
    { id: 3466, name: "Instinct Solar", manufacturerId: 1 },
    { id: 3888, name: "Instinct 2", manufacturerId: 1 },
    { id: 3889, name: "Instinct 2S", manufacturerId: 1 },
    { id: 4155, name: "Instinct Crossover", manufacturerId: 1 },
    { id: 4394, name: "Instinct 2X", manufacturerId: 1 },
    { id: 4583, name: "Instinct E (40mm)", manufacturerId: 1 },
    { id: 4584, name: "Instinct E (45mm)", manufacturerId: 1 },
    { id: 4585, name: "Instinct 3 Solar (45mm)", manufacturerId: 1 },
    { id: 4586, name: "Instinct 3 AMOLED (45mm)", manufacturerId: 1 },
    { id: 4587, name: "Instinct 3 AMOLED (50mm)", manufacturerId: 1 },
    { id: 4759, name: "Instinct 3 Solar (50mm)", manufacturerId: 1 },

    // Approach Series (Golf)
    { id: 1405, name: "Approach G10", manufacturerId: 1 },
    { id: 1936, name: "Approach S6", manufacturerId: 1 },
    { id: 2266, name: "Approach S20", manufacturerId: 1 },
    { id: 2656, name: "Approach S60", manufacturerId: 1 },
    { id: 2806, name: "Approach Z80", manufacturerId: 1 },
    { id: 2962, name: "Approach X10", manufacturerId: 1 },
    { id: 3085, name: "Approach G80", manufacturerId: 1 },
    { id: 3314, name: "Approach S40", manufacturerId: 1 },
    { id: 3823, name: "Approach S12", manufacturerId: 1 },
    { id: 3927, name: "Approach G12", manufacturerId: 1 },
    { id: 3934, name: "Approach S42", manufacturerId: 1 },
    { id: 4233, name: "Approach S70", manufacturerId: 1 },
    { id: 4647, name: "Approach S44", manufacturerId: 1 },
    { id: 4656, name: "Approach S50", manufacturerId: 1 },

    // Epix Series
    { id: 1988, name: "Epix", manufacturerId: 1 },
    { id: 3943, name: "Epix (Gen 2)", manufacturerId: 1 },
    { id: 4312, name: "Epix (Gen 2) Pro 42mm", manufacturerId: 1 },
    { id: 4313, name: "Epix (Gen 2) Pro 47mm", manufacturerId: 1 },
    { id: 4314, name: "Epix (Gen 2) Pro 51mm", manufacturerId: 1 },

    // Descent Series (Dive)
    { id: 2859, name: "Descent", manufacturerId: 1 },
    { id: 3143, name: "Descent T1", manufacturerId: 1 },
    { id: 3258, name: "Descent Mk2", manufacturerId: 1 },
    { id: 3542, name: "Descent Mk2S", manufacturerId: 1 },
    { id: 4005, name: "Descent G1", manufacturerId: 1 },
    { id: 4222, name: "Descent Mk3", manufacturerId: 1 },
    { id: 4223, name: "Descent Mk3i", manufacturerId: 1 },
    { id: 4442, name: "Descent T2", manufacturerId: 1 },
    { id: 4588, name: "Descent G2", manufacturerId: 1 },

    // Enduro Series
    { id: 3638, name: "Enduro", manufacturerId: 1 },
    { id: 4341, name: "Enduro 2", manufacturerId: 1 },
    { id: 4575, name: "Enduro 3", manufacturerId: 1 },

    // Tactix Series
    { id: 4135, name: "Tactix 7", manufacturerId: 1 },
    { id: 4775, name: "Tactix 8 AMOLED", manufacturerId: 1 },
    { id: 4776, name: "Tactix 8 Solar", manufacturerId: 1 },

    // MARQ Series
    { id: 3246, name: "MARQ Driver", manufacturerId: 1 },
    { id: 3247, name: "MARQ Aviator", manufacturerId: 1 },
    { id: 3248, name: "MARQ Captain", manufacturerId: 1 },
    { id: 3249, name: "MARQ Commander", manufacturerId: 1 },
    { id: 3250, name: "MARQ Expedition", manufacturerId: 1 },
    { id: 3251, name: "MARQ Athlete", manufacturerId: 1 },
    { id: 3624, name: "MARQ Adventurer", manufacturerId: 1 },
    { id: 3739, name: "MARQ Golfer", manufacturerId: 1 },
    { id: 4105, name: "MARQ (Gen 2)", manufacturerId: 1 },
    { id: 4124, name: "MARQ (Gen 2) Aviator", manufacturerId: 1 },
    { id: 4472, name: "MARQ (Gen 2) Commander", manufacturerId: 1 },

    // D2 Series (Aviation)
    { id: 2187, name: "D2 Air Venu", manufacturerId: 1 },
    { id: 2262, name: "D2 Bravo", manufacturerId: 1 },
    { id: 2547, name: "D2 Bravo Titanium", manufacturerId: 1 },
    { id: 2819, name: "D2 Charlie", manufacturerId: 1 },
    { id: 4125, name: "D2 Air X10", manufacturerId: 1 },
    { id: 4556, name: "D2 Mach 1 Pro", manufacturerId: 1 },

    // Lily Series
    { id: 3615, name: "Lily", manufacturerId: 1 },
    { id: 4380, name: "Lily 2", manufacturerId: 1 },
    { id: 4477, name: "Lily Athlete", manufacturerId: 1 },

    // Vivomove Series
    { id: 2368, name: "Vivomove", manufacturerId: 1 },
    { id: 2772, name: "Vivomove HR", manufacturerId: 1 },
    { id: 3308, name: "Vivomove 3 Premium", manufacturerId: 1 },
    { id: 3378, name: "Vivomove 3", manufacturerId: 1 },
    { id: 3982, name: "Vivomove Sport", manufacturerId: 1 },
    { id: 3983, name: "Vivomove Trend", manufacturerId: 1 },

    // Vivosmart Series
    { id: 1956, name: "Vivosmart", manufacturerId: 1 },
    { id: 2271, name: "Vivosmart 2", manufacturerId: 1 },
    { id: 2347, name: "Vivosmart GPS HR", manufacturerId: 1 },
    { id: 2348, name: "Vivosmart HR", manufacturerId: 1 },
    { id: 2622, name: "Vivosmart 3", manufacturerId: 1 },
    { id: 2927, name: "Vivosmart 4", manufacturerId: 1 },
    { id: 4063, name: "Vivosmart 5", manufacturerId: 1 },

    // Vivofit Series
    { id: 1837, name: "Vivofit", manufacturerId: 1 },
    { id: 2150, name: "Vivofit 2", manufacturerId: 1 },
    { id: 2406, name: "Vivofit 3", manufacturerId: 1 },
    { id: 2606, name: "Vivofit Jr", manufacturerId: 1 },
    { id: 2878, name: "Vivofit 4", manufacturerId: 1 },

    // Swim Series
    { id: 1499, name: "Swim", manufacturerId: 1 },
    { id: 3405, name: "Swim 2", manufacturerId: 1 },

    // Other Fitness Devices
    { id: 1253, name: "Chirp", manufacturerId: 1 },
    { id: 1341, name: "ALF04", manufacturerId: 1 },
    { id: 1743, name: "HRM-Tri", manufacturerId: 1 },
    { id: 1885, name: "Vivoki", manufacturerId: 1 },
    { id: 2175, name: "TruSwing", manufacturerId: 1 },
    { id: 2429, name: "Index Smart Scale", manufacturerId: 1 },
    { id: 2593, name: "Running Dynamics Pod", manufacturerId: 1 },
    { id: 2769, name: "Foretrex 601/701", manufacturerId: 1 },
    { id: 3193, name: "Gen3 BCM", manufacturerId: 1 },
    { id: 3192, name: "Gen3 BSM", manufacturerId: 1 },
    { id: 3299, name: "HRM-Dual", manufacturerId: 1 },
    { id: 3300, name: "HRM-Pro", manufacturerId: 1 },
    { id: 3461, name: "Index Smart Scale 2", manufacturerId: 1 },
    { id: 3578, name: "Rally 200", manufacturerId: 1 },
    { id: 3865, name: "GNSS", manufacturerId: 1 },
    { id: 4130, name: "HRM-Pro Plus", manufacturerId: 1 },
    { id: 4446, name: "HRM-Fit", manufacturerId: 1 },
    { id: 4606, name: "HRM 200", manufacturerId: 1 },

    // GPS Handhelds
    { id: 2140, name: "eTrex Touch", manufacturerId: 1 },
    { id: 2441, name: "Oregon 7xx", manufacturerId: 1 },
    { id: 2444, name: "Rino 7xx", manufacturerId: 1 },
    { id: 3028, name: "GPSMAP 66", manufacturerId: 1 },
    { id: 3284, name: "GPSMAP 66i", manufacturerId: 1 },

    // Varia Series (Bike Accessories)
    { id: 2192, name: "Varia Headlight", manufacturerId: 1 },
    { id: 2193, name: "Varia Taillight (Old)", manufacturerId: 1 },
    { id: 2225, name: "Varia Radar Taillight", manufacturerId: 1 },
    { id: 2226, name: "Varia Radar Display", manufacturerId: 1 },
    { id: 2276, name: "Varia Remote", manufacturerId: 1 },
    { id: 2379, name: "Varia Taillight", manufacturerId: 1 },
    { id: 2398, name: "Varia Vision", manufacturerId: 1 },
    { id: 2567, name: "Varia UT800", manufacturerId: 1 },
    { id: 3808, name: "Varia RCT715", manufacturerId: 1 },

    // Vector Series (Power Meters)
    { id: 1380, name: "Vector SS", manufacturerId: 1 },
    { id: 1381, name: "Vector CP", manufacturerId: 1 },
    { id: 2079, name: "Vector S", manufacturerId: 1 },
    { id: 2161, name: "Vector 2", manufacturerId: 1 },
    { id: 2162, name: "Vector 2S", manufacturerId: 1 },
    { id: 2787, name: "Vector 3", manufacturerId: 1 },

    // VIRB Series (Action Cameras)
    { id: 1735, name: "VIRB Elite", manufacturerId: 1 },
    { id: 1853, name: "VIRB Remote", manufacturerId: 1 },
    { id: 2134, name: "VIRB X", manufacturerId: 1 },
    { id: 2172, name: "VIRB XE", manufacturerId: 1 },
    { id: 2417, name: "VIRB Ultra 30", manufacturerId: 1 },
    { id: 2687, name: "VIRB 360", manufacturerId: 1 },

    // Tacx Trainers (manufacturer ID: 1)
    { id: 4265, name: "Tacx Neo Smart", manufacturerId: 1 },
    { id: 4266, name: "Tacx Neo 2 Smart", manufacturerId: 1 },
    { id: 4267, name: "Tacx Neo 2T Smart", manufacturerId: 1 },
    { id: 4268, name: "Tacx Neo Smart Bike", manufacturerId: 1 },
    { id: 4269, name: "Tacx Satori Smart", manufacturerId: 1 },
    { id: 4270, name: "Tacx Flow Smart", manufacturerId: 1 },
    { id: 4271, name: "Tacx Vortex Smart", manufacturerId: 1 },
    { id: 4272, name: "Tacx Bushido Smart", manufacturerId: 1 },
    { id: 4273, name: "Tacx Genius Smart", manufacturerId: 1 },
    { id: 4274, name: "Tacx Flux/Flux S Smart", manufacturerId: 1 },
    { id: 4275, name: "Tacx Flux 2 Smart", manufacturerId: 1 },
    { id: 4276, name: "Tacx Magnum", manufacturerId: 1 },

    // Marvel/Star Wars Special Editions
    { id: 3498, name: "Legacy Rey", manufacturerId: 1 },
    { id: 3499, name: "Legacy Darth Vader", manufacturerId: 1 },
    { id: 3500, name: "Legacy Captain Marvel", manufacturerId: 1 },
    { id: 3501, name: "Legacy First Avenger", manufacturerId: 1 },

    // Other/Misc
    { id: 2496, name: "Nautix", manufacturerId: 1 },
    { id: 10007, name: "SDM4", manufacturerId: 1 },
    { id: 10014, name: "Edge Remote", manufacturerId: 1 },
    { id: 20119, name: "Training Center", manufacturerId: 1 },
];

// Wahoo Products (manufacturer ID: 32)
const WAHOO_PRODUCTS: Product[] = [
    { id: 10, name: "Kickr", manufacturerId: 32 },
    { id: 11, name: "Kickr Snap", manufacturerId: 32 },
    { id: 12, name: "Kickr Core", manufacturerId: 32 },
    { id: 15, name: "ELEMNT", manufacturerId: 32 },
    { id: 16, name: "ELEMNT BOLT", manufacturerId: 32 },
    { id: 19, name: "ELEMNT ROAM", manufacturerId: 32 },
    { id: 20, name: "Tickr", manufacturerId: 32 },
    { id: 21, name: "Tickr X", manufacturerId: 32 },
    { id: 30, name: "Kickr Bike", manufacturerId: 32 },
    { id: 39, name: "ELEMNT BOLT v2", manufacturerId: 32 },
    { id: 40, name: "Kickr Rollr", manufacturerId: 32 },
    { id: 47, name: "ELEMNT ROAM v2", manufacturerId: 32 },
    { id: 48, name: "Kickr Move", manufacturerId: 32 },
    { id: 49, name: "Kickr Core 2", manufacturerId: 32 },
];

// Polar Products (manufacturer ID: 5)
// Note: Polar product IDs need verification from actual devices
const POLAR_PRODUCTS: Product[] = [
    // Add verified Polar product IDs here
];

// Suunto Products (manufacturer ID: 23)
// Note: Suunto product IDs need verification from actual devices
const SUUNTO_PRODUCTS: Product[] = [
    // Add verified Suunto product IDs here
];

// Coros Products (manufacturer ID: 294)
// Note: Coros product IDs need verification from actual devices
const COROS_PRODUCTS: Product[] = [
    // Add verified Coros product IDs here
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
