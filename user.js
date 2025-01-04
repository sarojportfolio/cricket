let userName = "";
let userMessages = {}; // Object to store user messages

// Step 1: Set the user's name
document.getElementById("setNameBtn").addEventListener("click", function () {
  const nameInput = document.getElementById("userName");
  
  if (nameInput.value.trim() !== "") {
    userName = nameInput.value.trim();
    userMessages[userName] = []; // Initialize user messages in the object

    // Hide name input section and show the chat area
    nameInput.style.display = "none";
    document.getElementById("setNameBtn").style.display = "none";
    document.getElementById("messages").style.display = "block";
    document.querySelector(".chat-input").style.display = "flex";

    const messages = document.getElementById("messages");
    const welcomeMessage = document.createElement("li");
    welcomeMessage.classList.add('welcome-message');
    welcomeMessage.textContent = `Welcome, ${userName}! Start chatting now.`;
    messages.appendChild(welcomeMessage);
  }
});

// Step 2: Send messages to the chat
document.getElementById("sendBtn").addEventListener("click", function () {
  const messageInput = document.getElementById("messageInput");
  const messages = document.getElementById("messages");

  if (messageInput.value.trim() !== "") {
    const userMessage = messageInput.value.trim();

    // Store the message for the user
    if (!userMessages[userName]) {
      userMessages[userName] = [];
    }
    userMessages[userName].push({ sender: userName, message: userMessage });

    // Update the localStorage (simulating server-side communication)
    localStorage.setItem('userMessages', JSON.stringify(userMessages));

    // Display the user's message in the chat
    const userMessageElement = document.createElement("li");
    userMessageElement.classList.add("user-message");
    userMessageElement.textContent = `${userName}: ${userMessage}`;
    messages.appendChild(userMessageElement);

    messageInput.value = ''; // Clear input field
    messages.scrollTop = messages.scrollHeight;
  }
});
