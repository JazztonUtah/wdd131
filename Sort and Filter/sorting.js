// sorting.js

const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Easy", "Yellowstone", "Waterfall"],
    description:
      "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Easy", "Tetons"],
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "7 miles",
    tags: ["Moderate", "Yellowstone", "Waterfall"],
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "2.2 miles",
    tags: ["Easy"],
    description:
      "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions:
      "Take Highway 20 north to Island Park. Continue almost to Mack's in. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Moderate", "View"],
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions:
      "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, the right onto Twin Butte road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];

const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];

// ===============================================
// ACTIVITY 1: Sorting a list of strings
// ===============================================

console.log("=== ACTIVITY 1: Sorting Strings ===");

// Simple sort - demonstrates case sensitivity
const simpleSort = simpleList.sort();
console.log("Simple sort:", simpleSort);
// Note: 'Bananas' comes first because uppercase B comes before lowercase letters

// Sort with compare function (ascending)
function compareFn(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

// Reset the list first (since sort modifies in place)
const list1 = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];
const anotherSort = list1.sort(compareFn);
console.log("Sort with compareFn (ascending):", anotherSort);

// Sort descending (reverse the return values)
function compareFnDescending(a, b) {
  if (a < b) {
    return 1;  // Changed: was -1, now 1
  } else if (a > b) {
    return -1; // Changed: was 1, now -1
  }
  return 0;
}

const list2 = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];
const descendingSort = list2.sort(compareFnDescending);
console.log("Sort descending:", descendingSort);

// ===============================================
// ACTIVITY 2: Filtering a list of strings
// ===============================================

console.log("\n=== ACTIVITY 2: Filtering Strings ===");

function searchList(list, query) {
  function searchCallback(item) {
    // Convert both to lowercase to make search case-insensitive
    return item.toLowerCase().includes(query.toLowerCase());
  }
  
  return list.filter(searchCallback);
}

// Test the search function
const list3 = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];
const searchResults = searchList(list3, "b");
console.log("Search for 'b':", searchResults);

const searchResults2 = searchList(list3, "an");
console.log("Search for 'an':", searchResults2);

// ===============================================
// ACTIVITY 3: Sorting and Filtering objects
// ===============================================

console.log("\n=== ACTIVITY 3: Sorting and Filtering Objects ===");

function searchHikesList(list, query) {
  function searchCallback(hike) {
    const queryLower = query.toLowerCase();
    
    // Search in name
    const nameMatch = hike.name.toLowerCase().includes(queryLower);
    
    // Search in description
    const descriptionMatch = hike.description.toLowerCase().includes(queryLower);
    
    // Search in tags
    const tagMatch = hike.tags.find(tag => tag.toLowerCase().includes(queryLower));
    
    // Return true if found in name OR description OR tags
    return nameMatch || descriptionMatch || tagMatch !== undefined;
  }
  
  return list.filter(searchCallback);
}

// Sort by distance (extract number from distance string)
function sortByDistance(a, b) {
  const distanceA = parseFloat(a.distance);
  const distanceB = parseFloat(b.distance);
  return distanceA - distanceB;
}

// Test search and sort
const searchQuery = "al";
const filteredHikes = searchHikesList(hikes, searchQuery);
console.log(`\nSearch results for "${searchQuery}" (before sorting):`, filteredHikes.map(h => h.name));

// Sort the filtered results
const sortedFilteredHikes = filteredHikes.sort(sortByDistance);
console.log(`\nSearch results for "${searchQuery}" (sorted by distance):`, 
  sortedFilteredHikes.map(h => `${h.name} (${h.distance})`));

// Additional test with different query
console.log("\n--- Additional Tests ---");
const waterfallSearch = searchHikesList(hikes, "waterfall");
console.log('Search for "waterfall":', waterfallSearch.map(h => h.name));

const easySearch = searchHikesList(hikes, "easy");
console.log('Search for "easy":', easySearch.map(h => h.name));

const yellowstoneSearch = searchHikesList(hikes, "yellowstone");
console.log('Search for "yellowstone":', yellowstoneSearch.map(h => h.name));

