
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
            salesprice: 2.5
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            salesprice: 2
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getCostsForCrop(crops[0])).toBe(5);
        // Now this is correct. 
        // I extend the current crops with a sale price to calculate the revenue without the cost deducted
        // Able to loop this, but let's keep it simple
        expect(getRevenueFromCrops(corn)).toBe(7.5)
        expect(getRevenueFromCrops(pumpkin)).toBe(8)
        // As described in the assignment we have to deduct the cost from the revenue
        expect(getProfitForCrop(crops[0])).toBe(2.5)
        expect(getProfitForCrop(crops[1])).toBe(6)
        // Let's get the total profit from all crops within one function with the help of the other functions
        expect(getTotalProfit(crops)).toBe(8.5)
    });
});


// describe("Estimate profits with weather conditions", () => {
//     test("Calculate Profits by the factors", () => {
//         // Now we got more data about the crops and which factor will influence the profit
//         const corn = {
//             name: "corn",
//             yield: 3,
//             salesprice: 2.5,
//             factor: {
//                 sun: {
//                 low: -50,
//                 medium: 0,
//                 high: 50,
//                 },
//             },
//         };
//         const pumpkin = {
//             name: "pumpkin",
//             yield: 4,
//             salesprice: 2,
//             factor: {
//                 sun: {
//                 low: -40,
//                 medium: 0,
//                 high: 20,
//                 },
//             },
//         };
//         const environmentFactors = {
//             sun: "low",
//         };
//         const crops = [
//             { crop: corn, numCrops: 5 },
//             { crop: pumpkin, numCrops: 2 },
//         ];
//         // Test and refactor code to get right calculations
//         // Yielf per palnt should be changed including factor as an extra parameter
//         // Corn has yield of 3, minus 50% the yield should be 1.5
//         expect(getYieldForPlant(corn, environmentFactors.sun)).toBe(1.5)
//     });
// });