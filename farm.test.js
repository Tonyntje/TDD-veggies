
const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("Get costs, estimate revenue & profits", () => {
    test("Calulate costs per crop", () => {
        // In my opinion i would look at the structure of data to make tests,
        // Now i must make a function that basically returns the same value as the input
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5, salesprice: 2.5 },
            { crop: pumpkin, numCrops: 2, salesprice: 2 },
        ];
        // Corn 5 x 3 = 15 * 2.5 = 37.5 (costs 5)
        // Corn 2 x 4 = 8  * 2   = 16   (costs 2)
        // Get cost which is number of crops * 1
        // 5 for Corn
        expect(getCostsForCrop(crops[0])).toBe(5);
        // Now this is correct. 
        // I extend the current crops with a sale price to calculate the revenue without the cost deducted
        // Should be 37.5 for corn
        expect(getRevenueForCrop(crops[0])).toBe(37.5)
        // As described in the assignment we have to deduct the cost from the revenue
        // So back to singular crop
        // For Corn: 37.5 (revenue) - 5 (cost) = 32.5 (profit)
        // For Corn: 16.0 (revenue) - 2 (cost) = 14.0 (profit)
        expect(getProfitForCrop(crops[0])).toBe(32.5)
        expect(getProfitForCrop(crops[1])).toBe(14)
        // Let's get the total profit from all crops within one function with the help of the other functions
        // Total Profit should be: 14.0 + 32.5 = 46.5
        expect(getTotalProfit(crops)).toBe(46.5)
    });
});


describe("Estimate profits with weather conditions", () => {
    // Now we got more data about the crops and which factor will influence the profit
    const corn = {
        name: "corn",
        yield: 3,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -15,
                high: -35, 
            }
        },
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factor: {
            sun: {
                low: -40,
                medium: 0,
                high: 20,
            },
            wind: {
                low: 0,
                medium: -20,
                high: -40, 
            }
        },
    };
    const environmentFactors = {
        sun: "low",
        wind: "medium"
    };
    const crops = [
        { crop: corn, numCrops: 5, salesprice: 2.5 },
        { crop: pumpkin, numCrops: 2, salesprice: 2 },
    ];
    // To shorten the code a bit
    const sun = environmentFactors.sun
    const wind = environmentFactors.wind
    
    test("Get Yield with Weather conditions", () => {
        // Test and refactor code to get right calculations
        // Yielf per palnt should be changed including factor as an extra parameter
        // Corn has yield of 3, minus 50% the yield should be 1.5
        expect(getYieldForPlant(corn, sun)).toBe(1.5)
        // Just in case with pumpkins. Yield of 4, minus 40% the yield should be 2.4
        expect(getYieldForPlant(pumpkin, sun)).toBe(2.4)
        // More test to test if wind is going to work as intended
        // With just the wind it should be 3, minus 15% which is 2.55
        expect(getYieldForPlant(corn, undefined, wind)).toBe(2.55)
        // Don't forget the pumpkins. 4 minus 20% which is 3.2
        expect(getYieldForPlant(pumpkin, undefined, wind)).toBe(3.20)
        // Now let's try it all
        // Corn: 3 minus 50% = 1.50 minus 15% = 1.275
        // Pump: 4 minus 40% = 2.40 minus 20% = 1.92
        expect(getYieldForPlant(corn, sun, wind)).toBe(1.275)
        expect(getYieldForPlant(pumpkin, sun, wind)).toBe(1.92)
        // Let's go full with the factor and multiply this with the number of crops
        // For Corn this would be   1.275 * 5 = 6.375
        // For Pumpkin this would be 1.92 * 2 = 3.84
        // Acumulating to 10.215
        expect(
             getTotalYield({crops}, sun, wind)
        ).toBe(10.215)  
    });
    test("Revenue with Weather factors", () => {
        // With succesfull refactor and test we need to get the factored revenue
        // Ill test this with kOrn
        // Total yield: 6.375 * 2.5 (price) = 15.9375
        expect(
            getRevenueForCrop(crops[0], sun, wind)
        ).toBe(15.9375)
        // Total yield: 3.84 * 2.00 (price) = 7.68
        expect(
            getRevenueForCrop(crops[1], sun, wind)
        ).toBe(7.68)
    });
    test("Profits with the new factors", () => {
        // Now to include the profit factors
        // Revenue from the Corn with the current factors is 15.9375
        // The cost is 1 per crop so it should easily be 10.9375
        expect(
            getProfitForCrop(crops[0], sun, wind)
        ).toBe(10.9375)
        // Revenue from the Pumkin with the current factors is 7.68
        // The cost is 1 per crop so it should easily be 5.68
        expect(
            getProfitForCrop(crops[1], sun, wind)
        ).toBe(5.68)
        // Acumulated this would a profit 10.9375 + 5.68 = 16.6175
        expect(
            getTotalProfit(crops, sun, wind)
        ).toBe(16.6175)
    });
});

// Extra Note:
// I refactored the code 3x because i had the naming convention written down wrong.
// Before i calculated the revenue crops plurar instead of singular. 
// This gave me a lot of complications
