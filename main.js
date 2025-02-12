/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

  if (toggle && nav) {
      toggle.addEventListener('click', () => {
          nav.classList.toggle('show');
          toggle.classList.toggle('active');

          // Toggle icon
          if (toggle.classList.contains('active')) {
              toggle.innerHTML = "<i class='bx bx-x'></i>"; // Change to 'X'
          } else {
              toggle.innerHTML = "<i class='bx bx-menu'></i>"; // Change back to menu
          }

          // Add shake animation
          toggle.classList.add('shake');

          // Remove shake animation after it completes
          setTimeout(() => {
              toggle.classList.remove('shake');
          }, 600);
      });
  }
};

showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input, .wrapper-no4',{interval: 200}); 
sr.reveal('.faq__container, .faq__answer-container', { delay: 300 });

/*===== COUNTING ANIMATION IN SKILLS =====*/
const skillElements = document.querySelectorAll('.skills__data'); // Each skill row
const observerOptions = {
    root: null, // Observe within the viewport
    threshold: 0.6, // At least 60% of the element must be visible
};

function startCounting(entry) {
    const skillElement = entry.target; // Current skill being observed
    const percentageElement = skillElement.querySelector('.skills__percentage');
    const skillBar = skillElement.querySelector('.skills__bar');
    const target = parseInt(percentageElement.textContent.replace('%', ''));
    let count = 0;
    const increment = Math.ceil(target / 180); // Adjust speed here
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        percentageElement.textContent = `${count}%`;
        skillBar.style.width = `${count}%`;
    }, 60); // Adjust interval here
}

// Create an Intersection Observer
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startCounting(entry); // Start counting only when the skill is in view
            skillObserver.unobserve(entry.target); // Stop observing once counted
        }
    });
}, observerOptions);

// Observe each skill row
skillElements.forEach((skill) => skillObserver.observe(skill));

// Rotating role in home section with typewriter effect
// Rotating role in home section with typewriter effect
const roles = ["Developer", "Designer", "Editor"];
let currentRoleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // Speed of typing in ms
const deletingSpeed = 50; // Speed of deleting in ms
const delayBetweenRoles = 2000; // Delay before starting to type next role in ms
const roleChangeInterval = 5000; // Total time before switching roles

function typeWriterEffect() {
    const roleElement = document.querySelector(".home__role");
    if (!roleElement) return;

    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex--);
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex++);
    }

    // Determine the delay based on typing or deleting
    const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        // Wait before starting to delete
        setTimeout(() => (isDeleting = true), delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
        // Move to the next role after deleting
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    }

    // Call this function again after the appropriate delay
    setTimeout(typeWriterEffect, currentSpeed);
}

// Initialize the typewriter effect
setTimeout(typeWriterEffect, typingSpeed);

// Adding hover and validation effects to the contact form inputs

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const sendButton = document.querySelector(".button-bird");

  function showErrorMessage(input, message) {
    let errorMessage = input.parentElement.querySelector(".validation-message");

    if (!errorMessage) {
      errorMessage = document.createElement("span");
      errorMessage.classList.add("validation-message");
      errorMessage.style.color = "red";
      errorMessage.style.fontSize = "0.9rem";
      errorMessage.style.position = "absolute";
      errorMessage.style.left = "200";
      errorMessage.style.display = "none"; // Initially hidden

      // Check input type for correct margin-top positioning
      if (input.id === "message") {
        errorMessage.style.marginTop = "180px";
      } else {
        errorMessage.style.marginTop = "53px";
      }

      input.parentElement.appendChild(errorMessage);
    }

    errorMessage.textContent = message;
    errorMessage.style.display = "block"; // Show error message
  }

  function removeErrorMessage(input) {
    const errorMessage = input.parentElement.querySelector(".validation-message");
    if (errorMessage) {
      errorMessage.style.display = "none"; // Hide instead of removing
    }
  }

  function validateInput(input, minLength, message) {
    const value = input.value.trim();

    if (value.length >= minLength) {
      input.style.borderColor = "green";
      input.style.borderWidth = "2px";
      removeErrorMessage(input);
    } else {
      input.style.borderColor = "blue"; // Reset to default
      input.style.borderWidth = "2px";
      removeErrorMessage(input);
    }
  }

  function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput.value.trim())) {
      emailInput.style.borderColor = "green";
      input.style.borderWidth = "2px";
      removeErrorMessage(emailInput);
    } else {
      emailInput.style.borderColor = "blue"; // Reset to default
      removeErrorMessage(emailInput);
    }
  }

  function handleFocus(input) {
    if (input.style.borderColor !== "green") {
        input.style.borderColor = "blue"; // Turn blue only if not validated
        input.style.borderWidth = "2px";
    }
}

  function handleBlur(input, minLength, message) {
    if (input.value.trim().length < minLength) {
      input.style.borderColor = "red"; // Red if invalid
      input.style.borderWidth = "2px";
      showErrorMessage(input, message);
    } else {
      input.style.borderColor = "green"; // Green if valid
      input.style.borderWidth = "2px";
    }
  }

  function handleEmailBlur() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.style.borderColor = "red"; // Red if invalid
      showErrorMessage(emailInput, "Give a proper email");
    } else {
      emailInput.style.borderColor = "green"; // Green if valid
    }
  }

  // ✅ New function: Highlights invalid fields on hover
  function highlightInvalidInputs() {
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input.style.borderColor !== "green") { // If input is not valid
        input.style.borderColor = "red";

        let errorMessage = input.parentElement.querySelector(".validation-message");
        if (!errorMessage) {
          showErrorMessage(input, 
            input.id === "name" ? "At least 2 characters needed" :
            input.id === "email" ? "Enter a valid email address" :
            "At least 5 words required"
          );
        }

        errorMessage = input.parentElement.querySelector(".validation-message");
        if (errorMessage) {
          errorMessage.style.display = "block"; // Show existing error message
        }
      }
    });
  }

  

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener("focus", () => {
        if (input.style.borderColor === "red") {
            input.style.borderColor = "blue"; // Reset to blue on focus
        }
        let errorMessage = input.parentElement.querySelector(".validation-message");
        if (errorMessage) {
            errorMessage.style.display = "none"; // Hide error when clicked
        }
    });
});


  // Event Listeners for Name Field
  nameInput.addEventListener("focus", () => handleFocus(nameInput));
  nameInput.addEventListener("input", () => validateInput(nameInput, 2, "At least 2 characters needed"));
  nameInput.addEventListener("blur", () => handleBlur(nameInput, 2, "At least 2 characters needed"));

  // Event Listeners for Email Field
  emailInput.addEventListener("focus", () => handleFocus(emailInput));
  emailInput.addEventListener("input", validateEmail);
  emailInput.addEventListener("blur", handleEmailBlur);

  // Event Listeners for Message Field
  messageInput.addEventListener("focus", () => handleFocus(messageInput));
  messageInput.addEventListener("input", () => validateInput(messageInput, 5, "At least 5 words required"));
  messageInput.addEventListener("blur", () => handleBlur(messageInput, 5, "At least 5 words required"));

  // Attach hover effects to the send button
  sendButton.addEventListener("mouseenter", highlightInvalidInputs);
 
});



  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".button-bird");
  
    button.addEventListener("click", () => {
      button.classList.toggle("no-before");
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".button-bird");

    button.addEventListener("click", function () {
        button.classList.toggle("disable-after");
    });
});







document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.querySelector(".button-bird");
  const inputs = document.querySelectorAll(".contact__input");
  const contactForm = document.getElementById("contactForm");

  let resetTimer;

  function resetButton() {
    sendButton.classList.remove("active", "enabled", "no-before", "disable-after");
    sendButton.querySelector(".button-bird__text").innerHTML = "SEND";
    sendButton.disabled = true; // Disable the button after reset
    validateInputs(); // Revalidate inputs to determine if button can be enabled
  }

  function validateInputs() {
    const allGreen = Array.from(inputs).every(input => input.style.borderColor === "green");
    if (allGreen) {
      sendButton.classList.add("enabled");
      sendButton.disabled = false;
    } else {
      sendButton.classList.remove("enabled");
      sendButton.disabled = true;
    }
  }

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (sendButton.classList.contains("enabled")) {
      sendButton.classList.add("active");
      sendButton.disabled = true; // Disable the button to prevent multiple clicks

      try {
        const response = await fetch("https://v-back.vercel.app/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
          inputs.forEach(input => {
            input.value = ""; // Clear input fields
            input.style.borderColor = "var(--second-color)"; // Reset border color
            input.style.borderWidth = "1.5px";
            input.dataset.valid = "false";
            input.classList.remove("valid", "invalid", "typing");
          });
          clearTimeout(resetTimer);
          resetTimer = setTimeout(resetButton, 5000); // Reset button after 5 seconds
        } else {
          alert("Failed to send message. Try again.");
          resetButton(); // Reset the button if the request fails
        }
      } catch (error) {
        alert("An error occurred. Please check your connection.");
        resetButton(); // Reset the button if an error occurs
      }
    }
  });

  // Highlight invalid fields on hover
  sendButton.addEventListener("mouseenter", () => {
    if (sendButton.disabled) {
      inputs.forEach(input => {
        if (input.style.borderColor !== "green") {
          input.style.borderColor = "red";
          input.style.borderWidth = "2px";
        }
      });
    }
  });

  inputs.forEach(input => {
    input.addEventListener("input", validateInputs);
    input.addEventListener("blur", validateInputs);
  });

  validateInputs(); // Initial check on load
});


document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".button-bird");
  const text = document.querySelector(".button-bird__text");

  button.addEventListener("click", function () {
      button.classList.toggle("active");

      if (button.classList.contains("active")) {
          text.innerHTML = 'DONE';

          // Add checkmark image
          const checkmark = document.createElement("img");
          checkmark.src = "assets/img/checkmark.webp"; // Update with the correct path to your checkmark image
          checkmark.alt = "Checkmark";
          checkmark.style.width = "30px";
          checkmark.style.height = "30px";
          checkmark.style.marginLeft = "5px"; // Add spacing between text and image
          checkmark.style.marginTop = "5px";
          checkmark.classList.add("checkmark-icon");

          // Remove existing checkmark if it exists to avoid duplicates
          const existingCheckmark = document.querySelector(".checkmark-icon");
          if (existingCheckmark) existingCheckmark.remove();

          text.appendChild(checkmark);
      } else {
          text.innerHTML = 'SEND';
      }
  });
});

const downloadBtn = document.getElementById("download-btn");
const tickAnimation = document.getElementById("tick-animation");

downloadBtn.addEventListener("click", () => {
  // Trigger file download
  const filePath = "assets/m2e.pdf"; // Replace with your actual file path
  const anchor = document.createElement("a");
  anchor.href = filePath;
  anchor.download = "myfile.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Make the button invisible while keeping its space
  downloadBtn.classList.add("hidden");

  // Show the Lottie animation
  tickAnimation.style.display = "block";

  // Trigger Lottie animation
  lottie.loadAnimation({
    container: tickAnimation, // Element to render the animation
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "tick.json", // Replace with your animation JSON file path
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const BACKEND_URL = "https://railway-1-production-34d8.up.railway.app";

  // Check if the user already has a unique ID
  let userId = localStorage.getItem("userId");

  if (!userId) {
      // Generate a unique ID for the user
      userId = `user-${Date.now()}-${Math.random().toString(36).substring(2)}`;
      localStorage.setItem("userId", userId);
  }

  // Track the visitor on the backend
  fetch(`${BACKEND_URL}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
  })
      .then((response) => {
          if (response.ok) {
              console.log("Visitor tracked successfully");
          } else {
              console.error("Failed to track visitor");
          }
      })
      .catch((error) => {
          console.error("Error tracking visitor:", error);
      });

  // WebSocket connection for real-time updates
  const visitorCountElement = document.getElementById("visitor-count");
  const socket = new WebSocket(BACKEND_URL.replace("https", "wss"));

  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (visitorCountElement) {
        visitorCountElement.textContent = data.visitors;
    }
});
});


document.getElementById("faq-ask-button").addEventListener("click", async () => {
  const questionInput = document.getElementById("faq-question");
  const answerBox = document.getElementById("faq-answer-box");
  const questionDisplay = document.getElementById("faq-question-display");

  const question = questionInput.value.trim();
  if (!question) return;

  // Show user question
  questionDisplay.textContent = `Q: ${question}`;
  answerBox.textContent = "Fetching answer..."; // Temporary loading text
  questionInput.value = ""; // Clear input field

  try {
      const response = await fetch("https://gemini-peach-six.vercel.app/ask", { // Change to your real backend URL
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
      });

      const data = await response.json();
      answerBox.textContent = `A: ${data.answer}`;
  } catch (error) {
      console.error(error);
      answerBox.textContent = "Error fetching response.";
  }
});

