
// Write code to fit the tests
// Get Yield from object to pass
// // 1.1 Added factor formula tot the calc (which works for previous versions)
// // 1.1.1 Added a wind factor to the equation
const getYieldForPlant = (plant, sunFactor, windFactor) => {
    const sunFactorFormula = (sunFactor) ? (100 + plant.factor.sun[sunFactor]) / 100 : 1
    const windFactorFormula = (windFactor) ? (100 + plant.factor.wind[windFactor]) / 100 : 1
    return plant.yield * sunFactorFormula * windFactorFormula
}
// Get numcrops and multiply with yield via function
const getYieldForCrop = (crop, s, w) => crop.numCrops * getYieldForPlant(crop.crop, s, w)
// Map crops into a crop and reduce them to combine them for a total yield
const getTotalYield = (crops, s, w) => crops.crops.map(e => getYieldForCrop(e, s, w)).reduce((a, b) => a + b)
// Get the costs of a crop
// According to the assignment:
// We need to get the total costs by multiplying 1 by the number of crops
const getCostsForCrop = crop => crop.numCrops * 1
// Get the revenue by multiplying the salesprice with the number of crops
const getRevenueForCrop = (crop, s, w) => {
    return crop.salesprice * getYieldForCrop(crop, s, w)
}

// Get profit by deducting the cost from the revenue of a crop, not all crops
const getProfitForCrop = (crop, s, w) => {
    const costs = getCostsForCrop(crop) 
    const singularRevenue = getRevenueForCrop(crop, s, w) 
    return singularRevenue - costs;
}
// map everything in the crops array with the above functionality
// Eventually combine everything with reduce to get a total
const getTotalProfit = (crops, s, w) => crops
            .map(crop => getProfitForCrop(crop, s, w))
            .reduce((a, b) => a + b)

module.exports = {
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield, 
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};