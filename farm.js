
// Write code to fit the tests
// Get Yield from object to pass
const getYieldForPlant = plant => plant.yield
// Get numcrops and multiply with yield via function
const getYieldForCrop = crop => crop.numCrops * getYieldForPlant(crop.crop)
// Map crops into a crop and reduce them to combine them for a total yield
const getTotalYield = crops => crops.crops.map(crop => getYieldForCrop(crop)).reduce((a, b) => a + b)

module.exports = {getYieldForPlant, getYieldForCrop, getTotalYield};