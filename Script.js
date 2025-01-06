const SHEET_ID = "14T-ddsNQGLZoWcBoh5_P7F5j1PdAxVxOxfjxqjtpjqo"; // Your Google Sheet ID
const API_KEY = "AIzaSyBRo1I7a8f0c05ym2XHMWlxvBKvedNnbkI"; // Your API Key
const SHEET_NAMES = ["Live Scores", "Upcoming Matches", "News"]; // Names of your sheets
const POLL_INTERVAL = 10000; // Fetch data every 10 seconds

// Fetch data from Google Sheet
async function fetchData() {
  try {
    const responses = await Promise.all(
      SHEET_NAMES.map((sheetName) =>
        fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`
        ).then((response) => response.json())
      )
    );

    const data = {
      liveScores: responses[0].values.slice(1), // Remove header row
      upcomingMatches: responses[1].values.slice(1), // Remove header row
      news: responses[2].values.slice(1), // Remove header row
    };

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display live scores
function displayLiveScores(liveScores) {
  const liveScoreContainer = document.getElementById("live-score-container");
  liveScoreContainer.innerHTML = liveScores
    .map(
      (score) => `
      <div class="score-card">
        <h3>${score[0]}</h3>
        <p>${score[1]}</p>
        <p><strong>Status:</strong> ${score[2]}</p>
      </div>
    `
    )
    .join("");
}

// Function to display upcoming matches
function displayUpcomingMatches(upcomingMatches) {
  const upcomingMatchesContainer = document.getElementById("upcoming-matches-container");
  upcomingMatchesContainer.innerHTML = upcomingMatches
    .map(
      (match) => `
      <div class="match-card">
        <h3>${match[0]}</h3>
        <p><strong>Date:</strong> ${match[1]}</p>
        <p><strong>Venue:</strong> ${match[2]}</p>
      </div>
    `
    )
    .join("");
}

// Function to display news
function displayNews(news) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = news
    .map(
      (item) => `
      <div class="news-card">
        <h3>${item[0]}</h3>
        <p>${item[1]}</p>
      </div>
    `
    )
    .join("");
}

// Initialize the app
async function init() {
  const data = await fetchData();
  if (data) {
    displayLiveScores(data.liveScores);
    displayUpcomingMatches(data.upcomingMatches);
    displayNews(data.news);
  }
}

// Poll data at regular intervals
setInterval(init, POLL_INTERVAL);

// Run the app on page load
init();
