// Toggle between dark and light mode
const themeToggle = document.getElementById('themeToggle');
const stylesheet = document.getElementById('stylesheet');
const lightModeIconSrc = 'images/greenSun.svg';
const darkModeIconSrc = 'images/greenmoon.svg';

themeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
      // Light mode
      stylesheet.href = 'styles.css'; // Link back to default stylesheet
      document.body.classList.remove('dark-mode'); // Remove dark-mode class from body
      themeToggle.src = lightModeIconSrc; // Set image source to light mode icon
      themeToggle.alt = 'Light Mode'; // Update alt text
    } else {
      // Dark mode
      stylesheet.href = 'dark-theme.css'; // Link to dark mode stylesheet
      document.body.classList.add('dark-mode'); // Add dark-mode class to body
      themeToggle.src = darkModeIconSrc; // Set image source to dark mode icon
      themeToggle.alt = 'Dark Mode'; // Update alt text
    }
  });
// Function to populate the scrollable word list with the list of estates dynamically
function populateEstateList(estates) {
    const estateList = document.getElementById("estateList");
    estateList.innerHTML = ""; // Clear previous list

    estates.forEach(estate => {
        const listItem = document.createElement("li");
        listItem.textContent = estate.name; // Use 'name' property of each estate object
        listItem.addEventListener("click", function() {
            document.getElementById("estateSearchInput").value = estate.name;
            filterHousesByEstate(estate.name);
            document.getElementById("estateListContainer").style.display = "none"; // Hide the word list
        });
        estateList.appendChild(listItem);
    });
}

// Function to handle when the search bar is clicked
document.getElementById("estateSearchInput").addEventListener("click", function() {
    const inputValue = this.value.trim().toLowerCase();
    if (inputValue === '') {
        // Only populate the list if the search bar is empty
        fetchEstates();
        document.getElementById("estateListContainer").style.display = "block"; // Show the word list

    } else {
      document.getElementById("estateListContainer").style.display = "block"; // Show the word list
    }
  });


// Function to handle when the user clicks outside the search bar
document.addEventListener("click", function(event) {
    const searchInput = document.getElementById("estateSearchInput");
    const estateListContainer = document.getElementById("estateListContainer");
    if (event.target !== searchInput && !estateListContainer.contains(event.target)) {
        estateListContainer.style.display = "none"; // Hide the word list
    }
});

// Function to handle estate search form submission
document.getElementById("estateSearchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const inputValue = document.getElementById("estateSearchInput").value.trim();
    filterHousesByEstate(inputValue);
});

// Function to filter estate list based on user input
document.getElementById("estateSearchInput").addEventListener("input", function() {
    const inputValue = this.value.trim().toLowerCase();
    const estateListItems = document.querySelectorAll("#estateList li");

    estateListItems.forEach(item => {
        const estateName = item.textContent.toLowerCase();
        if (estateName.startsWith(inputValue)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    document.getElementById("estateListContainer").style.display = "block"; // Show the word list
});

// Function to handle search button click
document.getElementById("searchButton").addEventListener("click", function(event) {
    const firstVisibleItem = document.querySelector("#estateList li[style='display: block;']");
    if (firstVisibleItem) {
        document.getElementById("estateSearchInput").value = firstVisibleItem.textContent;
        filterHousesByEstate(firstVisibleItem.textContent);
    }
});


// Function to fetch estates with authentication
function fetchEstates() {
    const token = localStorage.getItem('authToken');
    fetch("https://findkeja-server.onrender.com/estates", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(estates => populateEstateList(estates))
    .catch(error => console.error('Error fetching estates:', error));
}

// Function to display house listings for the selected estate
function filterHousesByEstate(estate) {
    const token = localStorage.getItem('authToken');
    fetch(`https://findkeja-server.onrender.com/houses?estate=${estate}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    

    .then(response => response.json())
    .then(houses => {
        const houseList = document.getElementById("houseList");
        houseList.innerHTML = ""; // Clear previous listings

        if (houses.length > 0) {
            houses.forEach(house => {
                // Create and append house listing elements
                const houseElement = document.createElement("div");
                houseElement.classList.add("house");
                houseElement.innerHTML = `
                    <!-- House details -->
                    <h3>${house.estate}</h3>
                    <div class="house-details">
                    <div class="left-column">
                        <p><strong>House Name:</strong> ${house.house_name}</p>
                        <p><strong>Type:</strong> ${house.type}</p>
                        <p><strong>Water Source:</strong> ${house.water_source}</p>
                        <p><strong>Management:</strong> ${house.management}</p>
                    </div>
                    <div class="right-column">
                        <p><strong>Rent:</strong> ${house.rent}</p>
                        <p><strong>Deposit:</strong> ${house.deposit}</p>
                        <p><strong>Video:</strong> <a href="${house.video}" target="_blank">Watch video</a></p>
                        <p><strong>Location:</strong> <a href="${house.view_maps}" target="_blank">View on Google Maps</a></p>
                    </div>
                    </div>
                    <img src="${house.image}" alt="${house.house_name}">
                    <div class="button-container">
                        <button class="action-button">Book Now</button>
                        <button class="action-button">Contact Management</button>
                    </div>
                `;
                houseList.appendChild(houseElement);
            });
        } else {
            houseList.innerHTML = "<p>No houses found for this estate.</p>";
        }
    })
    .catch(error => {
        console.error('Error fetching houses by estate:', error);
        document.getElementById("houseList").innerHTML = "<p>An error occurred. Please try again later.</p>";
    });
}

// slideshow featured products
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel img');
const totalSlides = slides.length;
const slidesToShow = 1; // Number of slides to show at a time

function showSlide(index) {
    slides.forEach(slide => slide.style.display = 'none');
    for (let i = index; i < index + slidesToShow; i++) {
        if (slides[i]) {
            slides[i].style.display = 'block';
        }
    }
}

function moveSlide(direction) {
    if (direction === 'prev') {
        currentIndex = (currentIndex === 0) ? totalSlides - slidesToShow : currentIndex - 1;
    } else if (direction === 'next') {
        currentIndex = (currentIndex === totalSlides - slidesToShow) ? 0 : currentIndex + 1;
    }
    showSlide(currentIndex);
}

// Automatically move to the next slide every 4 seconds
setInterval(() => moveSlide('next'), 4000);

// Show the initial slide
showSlide(currentIndex);

