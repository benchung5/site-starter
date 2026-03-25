
import xhr from '../xhr';
import appStateStore from '../storage/appStateStore';
import { getUrlParams } from '../lib/utils';
import plantFilterStore from '../storage/plantFilterStore';
import plantTablesStore from '../storage/plantTablesStore';
import plantListStore from '../storage/plantListStore';
import { formatSearchString } from '../lib/stringUtils';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

export function getSingle(data, callback) {
	xhr.send(`${SERVER_URL}/trees/single/${data}`, 
	{
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
	}, (apiData) => {
		callback(apiData);
	});
}

export function getPlant(slug, callback) {
    xhr.send(`${SERVER_URL}/trees/single/${slug}`, 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        //if no response data, return a formatted object
        let data = {};
        if (!apiData ) {
            data = {
                category: [],
                themes: [],
                // make images null so we know it's an intentional clear
                // an empty array makes it show the placeholder image
                images: null
            }
        } else {
            data = apiData;
        }
        callback(data);
    });
}

export function searchTrees(searchObj, callback) {
    // console.log(searchObj); 
    appStateStore.setData({ isLoading: true });
	
    let query = buildQuery(searchObj);

    xhr.send(`${SERVER_URL}/trees/search/`, 
    { 
    	method: 'GET',
    	headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
		callback(apiData);
        appStateStore.setData({ isLoading: false });
	}, query);

    function buildQuery(inObj) {
    	const query = {};

        // just include search, offset, mode and limit as is
        //convert search into comma string
        if (inObj.search) {
            query.search = formatSearchString(inObj.search);
        }
        query.offset = inObj.offset;
        query.limit = inObj.limit;
        if (inObj.mode) {
            query.mode = inObj.mode;
        }
        
    	//format trees_category_id
    	if (inObj.trees_category_id && (inObj.trees_category_id.length !== 0)) {
    		let catArray = inObj.trees_category_id.reduce(function(result, item) {
    		  if (item) result.push(item.id);
    		  return result;
    		}, []);
    		query.trees_category_id = catArray;
    	}

    	//format light
    	if (inObj.light && (inObj.light.length !== 0)) {
    		let lightArray = inObj.light.reduce(function(result, item) {
    		  if (item) result.push(item.id);
    		  return result;
    		}, []);
    		query.light = lightArray;
    	}

    	//format soil
    	if (inObj.soil && (inObj.soil.length !== 0)) {
    		let soilArray = inObj.soil.reduce(function(result, item) {
    		  if (item) result.push(item.id);
    		  return result;
    		}, []);
    		query.soil = soilArray;
    	}

    	//format native_to
    	if (inObj.native_to && (inObj.native_to.length !== 0)) {
    		let nativeToArray = inObj.native_to.reduce(function(result, item) {
    		  if (item) result.push(item.id);
    		  return result;
    		}, []);
    		query.native_to = nativeToArray;
    	}

    	//format natural_habitat
    	if (inObj.natural_habitat && (inObj.natural_habitat.length !== 0)) {
    		let naturalHabitatArray = inObj.natural_habitat.reduce(function(result, item) {
    		  if (item) result.push(item.id);
    		  return result;
    		}, []);
    		query.natural_habitat = naturalHabitatArray;
    	}

    	//format common_uses (Garden uses)
    	if (inObj.common_uses && (inObj.common_uses.length !== 0)) {
    		let commonUsesArray = inObj.common_uses.reduce(function(result, item) {
    		  if (item) result.push(item.id);
    		  return result;
    		}, []);
    		query.common_uses = commonUsesArray;
    	}

    	//format unique_attractions
    	if (inObj.unique_attractions && (inObj.unique_attractions.length !== 0)) {
    		let uniqueAttractionsArray = inObj.unique_attractions.reduce(function(result, item) {
    		  if (item) result.push(item.id);
    		  return result;
    		}, []);
    		query.unique_attractions = uniqueAttractionsArray;
    	}

    	//format eco_benefits
    	if (inObj.eco_benefits && (inObj.eco_benefits.length !== 0)) {
    		let ecoBenefitsArray = inObj.eco_benefits.reduce(function(result, item) {
    		  if (item) result.push(item.id);
    		  return result;
    		}, []);
    		query.eco_benefits = ecoBenefitsArray;
    	}

    	// format usage fields (Traditional use)
    	['tastes', 'organ_systems', 'thermal_nature', 'moisture', 'parts_used', 'preparations', 'organs_and_tissue'].forEach(function(key) {
    		if (inObj[key] && (inObj[key].length !== 0)) {
    			query[key] = inObj[key].reduce(function(result, item) {
    				if (item) result.push(item.id);
    				return result;
    			}, []);
    		}
    	});

    	return query;
    }
}

export function fetchPlantTables(callback) {
    xhr.send(`${SERVER_URL}/tree_tables/all`, 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        callback(apiData);
    });
}

export function updatePlant(formData, callback) {
    xhr.send(`${SERVER_URL}/trees/update`,
    {
        method: 'POST',
        body: formData
    }, (apiData) => {
        callback(apiData);
    });
}

export function addPlant(formData, callback) {
    xhr.send(`${SERVER_URL}/trees/create`,
    {
        method: 'POST',
        body: formData,
    }, (apiData) => {
        callback(apiData);
    });
}

export function deletePlant(tree, callback) {
    xhr.send(`${SERVER_URL}/trees/delete`, 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tree)
    }, (apiData) => {
        callback(apiData);
    });
}

function filterBySlugs(tableData, selectedSlugs) {
    if (!selectedSlugs || selectedSlugs.length === 0) return [];
    return tableData.filter((item) => selectedSlugs.indexOf(item.slug) > -1);
}

export function updateFilterFromUrl(callback) {
    const selectedCategories = getUrlParams('trees_category_id');
    const selectedLight = getUrlParams('light');
    const selectedSoil = getUrlParams('soil');
    const selectedNativeTo = getUrlParams('native_to');
    const selectedNaturalHabitat = getUrlParams('natural_habitat');
    const selectedCommonUses = getUrlParams('common_uses');
    const selectedUniqueAttractions = getUrlParams('unique_attractions');
    const selectedEcoBenefits = getUrlParams('eco_benefits');
    const selectedTastes = getUrlParams('tastes');
    const selectedOrganSystems = getUrlParams('organ_systems');
    const selectedThermalNature = getUrlParams('thermal_nature');
    const selectedMoisture = getUrlParams('moisture');
    const selectedPartsUsed = getUrlParams('parts_used');
    const selectedPreparations = getUrlParams('preparations');
    const selectedOrgansAndTissue = getUrlParams('organs_and_tissue');
    const search = getUrlParams('search');
    const offset = getUrlParams('offset');
    const modeParam = getUrlParams('mode');

    fetchPlantTables((apiData) => {
        plantTablesStore.setData(apiData);
        const tables = plantTablesStore.storageData;

        var filterPatch = {
            trees_category_id: filterBySlugs(tables.trees_category_id, selectedCategories),
            light: filterBySlugs(tables.light, selectedLight),
            soil: filterBySlugs(tables.soil, selectedSoil),
            native_to: filterBySlugs(tables.native_to, selectedNativeTo),
            natural_habitat: filterBySlugs(tables.natural_habitat, selectedNaturalHabitat),
            common_uses: filterBySlugs(tables.common_uses, selectedCommonUses),
            unique_attractions: filterBySlugs(tables.unique_attractions, selectedUniqueAttractions),
            eco_benefits: filterBySlugs(tables.eco_benefits, selectedEcoBenefits),
            tastes: filterBySlugs(tables.tastes, selectedTastes),
            organ_systems: filterBySlugs(tables.organ_systems, selectedOrganSystems),
            thermal_nature: filterBySlugs(tables.thermal_nature, selectedThermalNature),
            moisture: filterBySlugs(tables.moisture, selectedMoisture),
            parts_used: filterBySlugs(tables.parts_used, selectedPartsUsed),
            preparations: filterBySlugs(tables.preparations, selectedPreparations),
            organs_and_tissue: filterBySlugs(tables.organs_and_tissue, selectedOrgansAndTissue),
            search: search[0] || '',
            offset: parseInt(offset[0] || 0)
        };
        if (modeParam.length && modeParam[0] && /^\d+$/.test(modeParam[0])) {
            filterPatch.mode = parseInt(modeParam[0], 10);
        }

        plantFilterStore.setData(filterPatch);

        searchTrees(plantFilterStore.storageData, (apiData) => {
            plantListStore.setData(apiData);
            callback();
        });
    });
}

export function resetFilter(callback) {
    plantFilterStore.setData({ 
        trees_category_id: [],
        light: [],
        soil: [],
        native_to: [],
        natural_habitat: [],
        common_uses: [],
        unique_attractions: [],
        eco_benefits: [],
        tastes: [],
        organ_systems: [],
        thermal_nature: [],
        moisture: [],
        parts_used: [],
        preparations: [],
        organs_and_tissue: [],
        search: '',
        offset: 0,
        mode: null
    });

    //search trees
    searchTrees(plantFilterStore.storageData, (apiData) => {
        plantListStore.setData(apiData);

        callback();
    });
}



