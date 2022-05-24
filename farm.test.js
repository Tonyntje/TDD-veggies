
const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueFromCrops, getProfitForCrop, getTotalProfit } = require("./farm");

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
        // Get cost which is number of crops * 1
        // 5 for Corn
        expect(getCostsForCrop(crops[0])).toBe(5);
        // Now this is correct. 
        // I extend the current crops with a sale price to calculate the revenue without the cost deducted
        // Should be 15.5 combined
        expect(getRevenueFromCrops(crops)).toBe(15.5)
        // As described in the assignment we have to deduct the cost from the revenue
        // So back to singular crop
        // For Corn: 7.5 (reveneu) - 5 (cost) 
        expect(getProfitForCrop(crops[0])).toBe(8.5)
        // Let's get the total profit from all crops within one function with the help of the other functions
        // expect(getTotalProfit(crops)).toBe(8.5)
    });
});


describe("Estimate profits with weather conditions", () => {
    test("Calculate Profits by the factors", () => {
        // Now we got more data about the crops and which factor will influence the profit
        const corn = {
            name: "corn",
            yield: 3,
            salesprice: 2.5,
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
            salesprice: 2,
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
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        // Test and refactor code to get right calculations
        // Yielf per palnt should be changed including factor as an extra parameter
        // Corn has yield of 3, minus 50% the yield should be 1.5
        //expect(getYieldForPlant(corn, environmentFactors.sun)).toBe(1.5)
        // Just in case with pumpkins. Yield of 4, minus 40% the yield should be 2.4
        //expect(getYieldForPlant(pumpkin, environmentFactors.sun)).toBe(2.4)
        // More test to test if wind is going to work as intended
        // With just the wind it should be 3, minus 15% which is 2.55
        //expect(getYieldForPlant(corn, undefined, environmentFactors.wind)).toBe(2.55)
        // Don't forget the pumpkins. 4 minus 20% which is 3.2
        //expect(getYieldForPlant(pumpkin, undefined, environmentFactors.wind)).toBe(3.20)
        // Now let's try it all
        // Corn: 3 minus 50% = 1.50 minus 15% = 1.275
        // Pump: 4 minus 40% = 2.40 minus 20% = 1.92
        //expect(getYieldForPlant(corn, environmentFactors.sun, environmentFactors.wind)).toBe(1.275)
        //expect(getYieldForPlant(pumpkin, environmentFactors.sun, environmentFactors.wind)).toBe(1.92)

        // Let's go full with the factor and multiply this with the number of crops
        // For Corn this would be   1.275 * 5 = 6.375
        // For Pumpkin this would be 1.92 * 2 = 3.84
        // Acumulating to 10.215
        // expect(
        //     getTotalYield({crops}, environmentFactors.sun, environmentFactors.wind)
        // ).toBe(10.215)  
        // With succesfull refactor and test we need to get the factored revenue
        // Ill test this with kOrn
        // Yield with Factors would be: 1.275
        // 1.275 * 2.5 = 3.1875 would be the revenue
        // expect(
        //     getRevenueFromCrops(corn, environmentFactors.sun, environmentFactors.wind)
        // ).toBe(3.1875)
        // Yield with Factors would be: 1.92
        // 1.92 * 2.0 = 3.84 would be the revenue
        // expect(
        //     getRevenueFromCrops(pumpkin, environmentFactors.sun, environmentFactors.wind)
        // ).toBe(3.84)
        // Now to include the profit factors
        // Revenue from the Corn with the current factors is 3.1875
        // The cost is 1 per crop so it should easily be 2.1875
        // Revenue from the Pumkin with the current factors is 3.84
        // The cost is 1 per crop so it should easily be 2.84
        // Acumulated this would a profit 2.1875 + 2.84 = 
        // expect(
        //     getProfitForCrop({corn}, environmentFactors.sun, environmentFactors.wind)
        // ).toBe(5.0275)
    });
});