
// Write code to fit the tests
// Get Yield from object to pass
const getYieldForPlant = plant => plant.yield
// Get numcrops and multiply with yield via function
const getYieldForCrop = crop => crop.numCrops * getYieldForPlant(crop.crop)
// Map crops into a crop and reduce them to combine them for a total yield
const getTotalYield = crops => crops.crops.map(crop => getYieldForCrop(crop)).reduce((a, b) => a + b)
// Get the costs of a crop
// According to the assignment:
// We need to get the total costs by multiplying 1 by the number of crops
const getCostsForCrop = crop => crop.numCrops * 1
// Get the revenue by multiplying the salesprice with the number of crops
const getRevenueFromCrops = crop => crop.yield * crop.salesprice
// Get profit by deducting the cost from the revenue
const getProfitForCrop = crop => {
    const costs = getCostsForCrop(crop)
    const revenue = getRevenueFromCrops(crop.crop)
    return revenue - costs;
}
const getTotalProfit = crops => crops
            .map(e => getProfitForCrop(e))
            .reduce((a, b) => a + b)

module.exports = {
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield, 
    getCostsForCrop,
    getRevenueFromCrops,
    getProfitForCrop,
    getTotalProfit
};