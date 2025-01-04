let userName = localStorage.getItem('userName'); // Get the user's name from localStorage
let userMessages = JSON.parse(localStorage.getItem('userMessages')) || {}; // Load user messages

// Show the saved messages or prompt for the name if it's not set
if (userName) {
  document.getElementById("nameArea").style.display = "none";
  document.getElementById("messages").style.display = "block";
  displayMessages(userName);
} else {
  document.getElementById("setNameBtn").addEventListener("click", setName);
}

// Function to set the name
function setName() {
  const nameInput = document.getElementById("userName");
  if (nameInput.value.trim() !== "") {
    userName = nameInput.value.trim();
    localStorage.setItem('userName', userName); // Save the name
    document.getElementById("nameArea").style.display = "none";
    document.getElementById("messages").style.display = "block";
    displayMessages(userName);
  }
}

// Function to display messages for the user
function displayMessages(user) {
  const messages = document.getElementById("chatMessages");
  messages.innerHTML = ''; // Clear previous messages

  // Display user's and admin's messages
  if (userMessages[user]) {
    userMessages[user].forEach(msg => {
      const messageElement = document.createElement("li");
      messageElement.textContent = `${msg.sender}: ${msg.message}`;
      messageElement.classList.add(msg.sender === user ? 'user-message' : 'admin-message');
      messages.appendChild(messageElement);
    });
  }

  // Show the close button to end chat
  document.getElementById("closeBtn").style.display = "inline-block";

  // Scroll to the bottom of the chat
  messages.scrollTop = messages.scrollHeight;
}

// Send a new message
document.getElementById("sendBtn").addEventListener("click", function () {
  const messageInput = document.getElementById("messageInput");
  if (messageInput.value.trim() !== "") {
    const message = messageInput.value.trim();

    // Store the user's message
    if (!userMessages[userName]) {
      userMessages[userName] = [];
    }
    userMessages[userName].push({ sender: userName, message: message });

    // Update localStorage
    localStorage.setItem('userMessages', JSON.stringify(userMessages));

    // Display the new message
    displayMessages(userName);

    // Clear input field
    messageInput.value = '';
  }
});

// Close chat functionality
document.getElementById("closeBtn").addEventListener("click", function () {
  // Clear messages and reset for next chat
  document.getElementById("chatMessages").innerHTML = '';
  document.getElementById("closeBtn").style.display = "none";
  localStorage.setItem('userMessages', JSON.stringify({})); // Clear messages from localStorage
});
