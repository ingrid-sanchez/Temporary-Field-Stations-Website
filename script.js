document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("regionModal");

  const popupImage = document.getElementById("popupImage");
  const detailImage = document.getElementById("detailImage");

  const iconStrip = document.getElementById("iconStrip");
  const iconMap = document.getElementById("iconMap");

  let currentRegionPrefix = null;

  /* field station namings --------------------------------------------------------- */
  const popupMap = {
    "mcdonald-observatory": "mcdonald",
    "white-ranch": "white-ranch",
    "brackenridge": "brackenridge",
    "wildflower-center": "wildflower-center",
    "stengl-lost-pines": "stengl",
    "marine-science": "marine-science"
  };

  const detailMap = {
    "mcdonald": {
      "plants": "mcdonald-plants",
      "birds": "mcdonald-birds",
      "mammals": "mcdonald-mammals",
      "herps": "mcdonald-herps",
      "fish": "mcdonald-fish"
    }
  };

  /* ecoregion info boxes pop ups ------------------------------------------------ */

  const ecoBox = document.getElementById("ecoBox");
  const ecoHeader = document.getElementById("ecoHeader");
  const ecoImage = document.getElementById("ecoImage");
  const ecoDescription = document.getElementById("ecoDescription");
  const ecoGraphic = document.getElementById("ecoGraphic");
  const ecoClose = document.getElementById("ecoClose");

  /* eecoregion data ------------------------------------------------------------ */
const ecoData = {
  "trans-pecos": {
    header: "Trans-Pecos",
    image: "Images/Ecoregions/trans-pecos-image.png",
    description: "Home to the Chihuahuan Desert, this ecoregion gets its name from the Pecos River that runs through this otherwise vast, dry area. Perhaps the most biodiverse ecoregion in the state of Texas, it consists of low desert, dry grasslands, rocky buttes and mesas, sand dunes, and high elevation montane habitats dominated by pines, junipers, and oaks.",
    graphic: "trans-pecos-graphic.png",
    colorClass: "region-trans-pecos",
    caption: "Carol M. Highsmith, Public domain, via Wikimedia Commons",
    stripColor: "#fcb458"
  },
  "edwards-plateau": {
    header: "Edwards Plateau",
    image: "Images/Ecoregions/edwards-plateau-image.jpg",
    description: "Known to most Texans as the “Hill Country”, this is the rocky hill and canyonland region of central Texas. Grasslands and juniper-oak woodlands intermingle to form unique savannahs throughout the area. Many major river systems cut through the region and the eastern region is characterized with porous limestone, caves, and sinkholes that create the Edwards Aquifer, a vital habitat for many unique species and source of water for many Texans.",
    graphic: "edwards-plateau-graphic.png",
    colorClass: "region-edwards-plateau",
    caption: "William L. Farr, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons",
    stripColor: "#fbf2ed"
  },
  "high-plains": {
    header: "High Plains",
    image: "Images/Ecoregions/high-plains-image.png",
    description: "This is the famed Llano Estacado consisting of one of the largest tablelands (also known as a mesa) in the U.S. This ecoregion derives its name for this high elevation mesa that once consisted of some of the largest tracts of native grasslands in Texas. Due to grazing by cattle and the development of extensive agriculture fields, much of the area now consists of mixed native and invasive grasses, scattered with Ashe juniper and mesquite.",
    graphic: "high-plains-graphic.png",
    colorClass: "region-high-plains",
    caption: "Leaflet (talk) 01:24, 12 September 2008 (UTC), CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons",
    stripColor: "#ffd55f"
  },
  "rolling-plains": {
    header: "Rolling Plains",
    image: "Images/Ecoregions/rolling-plains-image.jpg",
    description: "This ecoregion consists of rolling grasslands carved out by numerous river systems. These rivers are lined with a number of hardwood tree species. Much like the High Plains Ecoregion, the native grasses of this region have been replaced with a number of invasive grasses and mesquite has invaded many areas creating more of a mesquite savannah than a classic grassland.",
    graphic: "rolling-plains-graphic.png",
    colorClass: "region-rolling-plains",
    caption: "Leaflet, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons",
    stripColor: "#f88d00"
  },
  "south-texas-plains": {
    header: "South Texas Plains",
    image: "Images/Ecoregions/south-texas-plains-image.JPG",
    description: "Often referred to as the Texas Thornscrub, this ecoregion is characterized by a relatively flat plain of brushland filled with thorny shrubs and cacti, interspersed with grasslands. This area use to harbor more diverse grasslands and hardwood bottomlands, but intense cattle grazing and changes to fire frequency has led to the extensive brushlands dominated by mesquite and acacia trees.",
    graphic: "south-texas-plains-graphic.png",
    colorClass: "region-south-texas-plains",
    caption: "Billy Hathorn, CC BY 3.0 <https://creativecommons.org/licenses/by/3.0>, via Wikimedia Commons",
    stripColor: "#fecab3"
  },
  "cross-timbers": {
    header: "Cross Timbers & Prairies",
    image: "Images/Ecoregions/cross-timbers-image.jpg",
    description: "Sometimes referred to as the Osage Plains, this ecoregion is a mixture of grasslands and timbered areas, consisting of a variety of hardwood species and juniper. Historically, much of the woodlands were restricted to river and creek bottomlands and slopes, whereas the grasslands existed in the intervening areas. Human suppression of fire in this region has significantly impacted the size and location of the current grasslands and the woodlands.",
    graphic: "cross-timbers-graphic.png",
    colorClass: "region-cross-timbers",
    caption: "Mark Quadling, Henley Quadling, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons",
    stripColor: "#e69372"
  },
  "blackland-prairies": {
    header: "Blackland Prairies",
    image: "Images/Ecoregions/blackland-prairies-image.jpg",
    description: "This ecoregion derives its name from the classic black marl or clay soils that historically supported diverse grassland systems. Due to the richness of the soils in this region, much of the area has been turned into agricultural fields and most of the native grasslands have been replaced by invasive grass species.",
    graphic: "blackland-prairies-graphic.png",
    colorClass: "region-blackland-prairies",
    caption: "William L. Farr, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons",
    stripColor: "#9d4b2b"
  },
  "post-oak-savannah": {
    header: "Post Oak Savannah",
    image: "Images/Ecoregions/post-oak-savannah-image.jpg",
    description: "In a classic example of a savannah, this ecoregion consists of gently rolling hills of grasslands with scattered belts of hardwoods (predominantly Post Oaks) and pines. This region represents a transition between the great forests of the eastern U.S. and the plains of the central U.S.",
    graphic: "post-oak-savannah-graphic.png",
    colorClass: "region-post-oak-savannah",
    caption: "Larry D. Moore, CC BY 4.0 <https://creativecommons.org/licenses/by/4.0>, via Wikimedia Commons",
    stripColor: "#ffdfb4"
  },
  "piney-woods": {
    header: "Pineywoods",
    image: "Images/Ecoregions/pineywoods-image.jpg",
    description: "This ecoregion is characterized by rolling hills of heavy forests consisting of pines and oaks, with bottomlands dominated by a variety of hardwood tree species. This region was intensely logged in the late 1800s and early 1900s, devastating large swaths of the region. As a result of overharvesting in this ecoregion and others around the country, President Roosevelt created the National Forestry Service in 1905 to better manage forest resources.",
    graphic: "pineywoods-graphic.png",
    colorClass: "region-piney-woods",
    caption: "William L. Farr, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons",
    stripColor: "#9d6c2a"
  },
  "gulf-prairies": {
    header: "Gulf Prairies & Marshes",
    image: "Images/Ecoregions/gulf-image.jpg",
    description: "This ecoregion is dominated by prairies, marshes, and wetlands, with many of Texas’s river systems reaching the Gulf of Mexico here. Many barrier islands exist in this ecoregion, providing ideal conditions for migrating birds to stopover on their long journeys. Due to human activities, many tree species (e.g. mesquite) are more common in this region than they were in the past.",
    graphic: "gulf-graphic.png",
    colorClass: "region-gulf-prairies",
    caption: "William L. Farr, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons",
    stripColor: "#eab56d"
  }
};

const stationData = {
  "mcdonald-observatory": {
    header: "McDonald Observatory",
    description: "The Observatory is available for the study of the land and the celestial universe. Located on 650 acres in the Davis Mountains of West Texas, this mostly undisturbed land in the Chihuahuan Desert is a valuable natural resource, accessible for research and learning.",
    image: "Images/mcdonald-image.jpg",
    qr: "Graphics/mcdonald-qr.png",
    location: "Fort Davis",
  },
  "white-ranch": {
    header: "White Ranch",
    description: "This 266-acre living classroom in Hays County and the Texas Hill Country provides channels, floodplains and hill slopes that cover a range of steepness and soil occurrences. The topographic, lithologic and hydrologic variability provides an ability to design and implement long-term hydrological and ecological monitoring and data collection for use in research and teaching.",
    image: "Images/white-ranch-image.jpg",
    qr: "Graphics/white-ranch-qr.png",
    location: "Dripping Springs",
  },
  "brackenridge-field-laboratory": {
    header: "Brackenridge Field Laboratory",
    description: "This 82-acre area includes prairies, pecan bottoms and juniper woods. Adjacent to the Colorado River and located in an urban environment that formerly housed a quarry, BFL is on a tract of land first donated to the university in 1910 and located within a few miles of the main UT campus.",
    image: "Images/brackenridge-image.jpg",
    qr: "Graphics/bfl-qr.png",
    location: "Austin",
  },
    "marine-science-institute": {
    header: "Marine Science Institute",
    description: "A prime location for research on the Texas Coast adjacent to the Gulf of Mexico and local bay systems, the Marine Science Institute also manages the Mission-Aransas National Estuarine Research Reserve, a federal-state partnership that connects research, education and stewardship to communities.",
    image: "Images/marine-science-image.jpg",
    qr: "Graphics/msi-qr.png",
    location: "Port Aransas"
  },
    "lady-bird-johnson-wildflower-center": {
    header: "Lady Bird Johnson Wildflower Center",
    description: "In addition to cultivated native gardens, the 284-acre Wildflower Center features natural, undeveloped landscapes reflecting Edwards Plateau and Texas Blackland Prairie ecosystems. It sits on a mixed oak-juniper savanna along the Balcones Escarpment and has intermittent drainages and a cave and karst features.",
    image: "Images/wildflower-center-image.jpg",
    qr: "Graphics/lbjwc-qr.png",
    location: "Austin"
  },
    "stengl-lost-pines-biological-station": {
    header: "Stengl Lost Pines Biological Station",
    description: "Nearly 600 acres of woodlands and savanna are located 40 miles east of Austin in Bastrop County and available for research and educational programs. Meadows and open areas interface with pine forest at this rural field station.",
    image: "Images/stengl-image.jpg",
    qr: "Graphics/stengl-qr.png",
    location: "Smithville"
  },
};


/* ecoregion stats for icon strip popups ------------------------------------------------------------------------------------ */
const ecoStats = {
  "trans-pecos": {
    soils: "Highly variable, ranging from alkaline sands through sedimentary and igneous rocks and gravels.",
    topography: "Ranging from low desert valleys to high elevation plateaus and mountains, including the highest point in Texas (Guadelupe Peak in the Guadelupe Mountains).",
    precipitation: "Less than 12 inches; mostly in mid-summer.",
    temperature: "Highly variable based on elevation, but generally very hot summers and cold winters.",
    industry: "Livestock ranching, oil extraction, and tourism.",
    species: "Guadalupe Fescue, Big Bend Mud Turtle, Mexican Black Bear."
  },

  "high-plains": {
    soils: "Predominantly clay in the north and sand in the south with caliche underlying both.",
    topography: "Relatively level high plateau, separated from the Rolling Plains by the Caprock Escarpment.",
    precipitation: "15–22 inches; mostly during early spring and fall.",
    temperature: "Dry, hot summers and dry, cool winters.",
    industry: "Mostly agriculture and cattle ranching.",
    species: "Green-flowered Pitaya Cactus, Lesser Prairie-chicken, Palo Duro Mouse"
  },

  "rolling-plains": {
    soils: "Clay and shale in the hills and coarse sands along bottomland canyons.",
    topography: "Gently rolling hills interspersed with flats and deep cut canyons.",
    precipitation: "20–28 inches; predominantly in May and September.",
    temperature: "Dry, hot summers and cold winters.",
    industry: "Mostly agriculture and livestock ranching.",
    species: "Texas Poppy Mallow, Texas Horned Lizard, Texas Kangaroo Rat"
  },

  "gulf-prairies": {
    soils: " Sands, sandy loams, and clays and silts in river bottoms.",
    topography: "Very flat with coastal marshes.",
    precipitation: "30–50 inches; spread consistently throughout year.",
    temperature: "High humidity; warm summers and mild winters.",
    industry: "Agriculture, some ranching, oil extraction.",
    species: "Black-spotted Newt, Northern Cat-eyed Snake, Whooping Crane"
  },

  "cross-timbers": {
    soils: "Sandy to loamy with gravels in bottomlands.",
    topography: "Gently sloping plains with prairies and woodlands.",
    precipitation: "25–45 inches, but erratic and variable from year-to-year; mostly in late spring/early summer.",
    temperature: "Generally hot summers and cool winters with occasionally freezing conditions.",
    industry: "Agriculture, ranching, and oil extraction.",
    species: "Texas Pimpleback, Smalleye Shiner, Brazos Water Snake"
  },

  "edwards-plateau": {
    soils: "Loamy and clay soils with extensive limestone gravel and rock.",
    topography: "Karst region with limestone mesas and buttes and steep canyons dotted with numerous springs and extensive limestone cave systems.",
    precipitation: "15–34 inches; mostly in late spring/early summer and early fall.",
    temperature: "Hot summers and mild-to-cool winters.",
    industry: "Primarily ranching, hunting, and tourism.",
    species: "Tobusch Fishhook Cactus, Texas Blind Salamander, Golden-cheeked Warbler"
  },

  "south-texas-plains": {
    soils: "Alkaline clays and clay loams.",
    topography: "Gently sloping plain carved with a number of washes and river systems.",
    precipitation: "20–32 inches; mostly in spring.",
    temperature: "Hot, humid summers with mild winters.",
    industry: "Primarily agriculture, livestock ranching, and hunting",
    species: "Mexican Burrowing Toad, Texas Tortoise, Ocelot"
  },

  "blackland-prairies": {
    soils: "Fertile black, alkaline clays, with some sandy loams.",
    topography: "Gently rolling to flat.",
    precipitation: "28–40 inches falling fairly consistently throughout the year.",
    temperature: "Generally hot summers and cool winters with occasionally freezing conditions.",
    industry: "Primarily agriculture and cattle ranching.",
    species: "Bracted Jewelflower, Fountain Darter, Black-capped Vireo"
  },

  "post-oak-savannah": {
    soils: "Highly variable ranging from sands to loams to clays interspersed with gravel.",
    topography: "Hilly to gently rolling plains.",
    precipitation: "28–40 inches; late spring/early summer.",
    temperature: "Hot humid summers and mild winters with occasional freezing temperatures.",
    industry: "Primarily cattle ranching.",
    species: "Navasota Ladies’-tresses, Large-fruited Sand-verbena, Houston Toad"
  },

  "piney-woods": {
    soils: "Sands and sandy loams.",
    topography: "Rolling hills with extensive bottomlands.",
    precipitation: "36–50 inches.",
    temperature: "Warm, humid summers and mild winters.",
    industry: "Primarily timber harvesting.",
    species: "Louisiana Pine Snake, Red-cockaded Woodpecker, Rafinesque’s Big-eared Bat."
  }

};

/* icon strip click events + wiggle animation -------------------------------------------------------------------------------------------- */
document.querySelectorAll(".icon-item").forEach(icon => {
  icon.addEventListener("click", () => {
    if (!currentRegionPrefix) return;

    const category = icon.dataset.category;

    // Hide old eco description
    ecoDescription.classList.add("hidden");

    // Sets header
    iconPageHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    // Sets description
    iconPageDescription.textContent = ecoStats[currentRegionPrefix][category];

    // Sets video source
    iconPageVideo.src = `Graphics/Videos/${category}-video.mp4`;
    // Wait for icon click to show section
    iconPageSection.classList.remove("hidden");

    // Highlights active icon
    document.querySelectorAll(".icon-item").forEach(i => i.classList.remove("active"));
    icon.classList.add("active");
  });
});


/* wiggle animation */
const icons = document.querySelectorAll(".icon-item");
let wiggleIndex = 0;
let wiggleTimer = null;

function startWiggleCycle() {
  // Always start with soils (index 0)
  wiggleIndex = 0;

  function wiggleNext() {
    // Remove wiggle from all icons
    icons.forEach(icon => icon.classList.remove("wiggle"));

    // Add wiggle to the current icon
    icons[wiggleIndex].classList.add("wiggle");

    // Move to next icon
    wiggleIndex = (wiggleIndex + 1) % icons.length;

    // Schedule next wiggle
    wiggleTimer = setTimeout(wiggleNext, 4000);
  }

  wiggleNext();
}

function stopWiggleCycle() {
  clearTimeout(wiggleTimer);
  wiggleTimer = null;

  // Remove wiggle class from all icons
  icons.forEach(icon => icon.classList.remove("wiggle"));
}


/* main map ------------------------------------------------------------------------------------------------------------- */
document.querySelectorAll("area").forEach(area => {
  area.addEventListener("click", (e) => {
    e.preventDefault();

    // Normalize region name
    const region = area.alt.toLowerCase().trim().replace(/\s+/g, "-");

    const eco = ecoData[region];

    /* ecoregion overlays ------------------------------------------------ */
    if (eco) {

      /* Reset caption box and more info button */
      ecoCaptionBox.textContent = eco.caption;
      ecoCaptionBox.style.display = "none"; // reset each time
      captionVisible = false;
      ecoMoreInfo.style.display = "block";  // show the button


      // Show icon strip for ecoregions
      currentRegionPrefix = region;
      iconStrip.style.display = "flex"; //show the icon strip
      iconStrip.style.backgroundColor = eco.stripColor; //sets color from ecoregion

      
      // Show ecoregion box, hide station box
      ecoBox.style.display = "block";
      stationBox.style.display = "none";

      // Fill ecoregion content
      ecoBox.className = "eco-box " + eco.colorClass;
      ecoHeader.textContent = eco.header;
      ecoImage.src = eco.image;
      ecoDescription.textContent = eco.description;
      ecoGraphic.src = `Graphics/${eco.graphic}`;

      // Graphic positioning class
      ecoGraphic.className = "eco-graphic";
      ecoGraphic.classList.add(`graphic-${region}`);

      // Show modal
      modal.style.display = "flex";
      startWiggleCycle();
      return;
    }

    /* field station overlays --------------------------------------------------- */
    const station = stationData[region];

    if (station) {

      /* Reset caption box and more info button */
      ecoMoreInfo.style.display = "none";
      ecoCaptionBox.style.display = "none";
      captionVisible = false;

      currentRegionPrefix = null;
      iconStrip.style.display = "none"; // hide the icon strip for stations

      // Show station box, hide eco box
      ecoBox.style.display = "none";
      stationBox.style.display = "flex";

      // Fill station content
      stationHeader.textContent = station.header;
      stationDescription.textContent = station.description;
      stationImage.src = station.image;
      stationQR.src = station.qr;

      // Show modal
      modal.style.display = "flex";
      startWiggleCycle();
      return;
    }
  });
});

/* icon strip overlay --------------------------- */
iconMap.querySelectorAll("area").forEach(iconArea => {
  iconArea.addEventListener("click", (e) => {
    e.preventDefault();

    const category = iconArea.alt.toLowerCase();
    if (!currentRegionPrefix) return;

    const detailPNG = detailMap[currentRegionPrefix]?.[category];
    if (!detailPNG) return;

    detailImage.classList.remove("show");
    detailImage.src = `Popups/${detailPNG}.png`;

    setTimeout(() => detailImage.classList.add("show"), 50);
  });
});

/* more info caption ------------------------------------------------------------------------------------------------------------- */

const ecoMoreInfo = document.getElementById("ecoMoreInfo");
const ecoCaptionBox = document.getElementById("ecoCaptionBox");

let captionVisible = false;

// Toggle caption box when clicking the button
ecoMoreInfo.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent modal click from closing it

  captionVisible = !captionVisible;

  if (captionVisible) {
    ecoCaptionBox.style.display = "block";
  } else {
    ecoCaptionBox.style.display = "none";
  }
});

// Close caption box when clicking anywhere else
document.addEventListener("click", () => {
  if (captionVisible) {
    captionVisible = false;
    ecoCaptionBox.style.display = "none";
  }
});


  /* close modal -----------------------------------------------------------------------------------------------------------------*/
  ecoClose.onclick = () => {
    modal.style.display = "none";
    iconStrip.classList.remove("show");
    detailImage.classList.remove("show");
    detailImage.src = "";
    stationBox.style.display = "none";
    ecoBox.style.display = "none";

    ecoDescription.classList.remove("hidden");
    iconPageSection.classList.add("hidden");
    iconPageHeader.textContent = "";
    iconPageDescription.textContent = "";
    iconPageVideo.src = "";

    document.querySelectorAll(".icon-item").forEach(i => i.classList.remove("active"));
    stopWiggleCycle();
  };


  stationClose.onclick = () => {

    stationBox.style.display = "none";
    modal.style.display = "none";

    // CLEAR ICON PAGE CONTENT
    ecoDescription.classList.remove("hidden");
    iconPageSection.classList.add("hidden");
    iconPageHeader.textContent = "";
    iconPageDescription.textContent = "";
    iconPageVideo.src = "";
    

    // CLEAR ACTIVE ICON
    document.querySelectorAll(".icon-item").forEach(i => {
      i.classList.remove("active");
    });

    stopWiggleCycle();
  };

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      iconStrip.classList.remove("show");
      detailImage.classList.remove("show");
      detailImage.src = "";
      stationBox.style.display = "none";
      ecoBox.style.display = "none";

      /* Reset icon page content */
      ecoDescription.classList.remove("hidden");
      iconPageSection.classList.add("hidden");
      iconPageHeader.textContent = "";
      iconPageDescription.textContent = "";
      iconPageVideo.src = "";


      // Remove active class from all icons
      document.querySelectorAll(".icon-item").forEach(i => {
      i.classList.remove("active");
    });

      stopWiggleCycle();
    }
  });

  /* idle overlay ------------------------------------------------------------- */
  const IDLE_TIMEOUT = 120000; // 2 minutes in milliseconds idle timer
  let idleTimer;

  const idleOverlay = document.getElementById("idle-overlay");
  const idleBox = document.getElementById("idle-box");

  const messages = [
    "Click anywhere to begin!",
    "Click on an ecoregion to learn more.",
    "I'll be in the top right corner if you forget what to do...",
    "Click anywhere to start exploring!"
  ];

  let currentMessage = 0;

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(showIdleOverlay, IDLE_TIMEOUT);
  }

  function showIdleOverlay() {
    // Close any open popups
    modal.style.display = "none";
    iconStrip.style.display = "none";
    ecoDescription.classList.remove("hidden");
    iconPageSection.classList.add("hidden");
    iconPageHeader.textContent = "";
    iconPageDescription.textContent = "";
    iconPageVideo.src = "";

    stopWiggleCycle();


    idleOverlay.classList.remove("hidden");
    currentMessage = 0;
    showMessage(currentMessage);
  }

  function showMessage(index) {
    idleBox.textContent = messages[index];
    idleBox.classList.remove("fade-out");
    idleBox.classList.add("show");
  }

  function fadeOutMessage(callback) {
    idleBox.classList.add("fade-out");
    idleBox.classList.remove("show");
    setTimeout(callback, 400);
  }

  idleOverlay.addEventListener("click", () => {
    if (currentMessage < messages.length - 1) {
      fadeOutMessage(() => {
        currentMessage++;
        showMessage(currentMessage);
      });
      return;
    }

    idleOverlay.classList.add("fade-out");
    setTimeout(() => {
      idleOverlay.classList.add("hidden");
      idleOverlay.classList.remove("fade-out");
    }, 800);

    resetIdleTimer();
  });

  ["mousemove", "mousedown", "keydown", "touchstart"].forEach(evt => {
    document.addEventListener(evt, resetIdleTimer);
  });

  showIdleOverlay();

  const sticker = document.getElementById("idle-sticker");

  sticker.addEventListener("click", () => {
    currentMessage = 0;
    idleOverlay.classList.remove("hidden");
    idleOverlay.classList.remove("fade-out");
    showMessage(currentMessage);
    resetIdleTimer();
  });

  setInterval(() => {
    const modalOpen = modal.style.display === "flex";
    const overlayOpen = !idleOverlay.classList.contains("hidden");

    if (!modalOpen && !overlayOpen) {
      sticker.classList.add("shake");
      setTimeout(() => sticker.classList.remove("shake"), 700);
    }
  }, 10000);

  document.addEventListener("dblclick", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

});