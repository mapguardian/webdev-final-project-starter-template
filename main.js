const url = "http://localhost:4000";

let currentView = "signup-or-login";
let errorMessage = "";
let token = "";

let chatView = () => {
  let container = document.createElement("div");
  container.setAttribute("class", "chat h100 column");

  let messageSection = document.createElement("div");
  messageSection.setAttribute("id", "messages");
  messageSection.setAttribute("class", "chat-msg-section");

  let refreshButton = document.createElement("button");
  refreshButton.setAttribute("class", "refresh");
  refreshButton.innerText = "Refresh";
  refreshButton.addEventListener("click", async () => {
    displayMessages();
  });

  let messageBar = document.createElement("div");
  messageBar.setAttribute("class", "chat-msg-bar row");
  let messageInput = document.createElement("input");
  let sendMessageButton = document.createElement("button");
  sendMessageButton.addEventListener("click", async () => {
    let msg = messageInput.value || "";
    if (msg === "") {
      alert("you must enter a message");
      return;
    }
    let bodyToBeSent = JSON.stringify({ token, contents: msg });
    // fetch is covered in depth in the slides
    // You will need to replace PASTE_THE_URL_FROM_GLITCH with your glitch server url
    await fetch(`${url}/message`, {
      method: "POST",
      body: bodyToBeSent,
    })
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        let parsed = JSON.parse(body);
        if (!parsed.success) {
          alert("ouupsss somethign went wrong");
          return;
        } else {
          displayMessages();
        }
      });
  });
  sendMessageButton.innerText = "Send Message";
  messageBar.appendChild(messageInput);
  messageBar.appendChild(sendMessageButton);

  container.appendChild(refreshButton);
  container.appendChild(messageSection);
  container.appendChild(messageBar);

  return container;
};

let displayMessages = async () => {
  let msgList = document.getElementById("messages");
  msgList.innerHTML = "";
  await fetch(`${url}/messages`, {
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((body) => {
      let parsed = JSON.parse(body);
      if (!parsed.success) {
        alert("ouupsss somethign went wrong");
        return;
      } else {
        parsed.messages.forEach((m) => {
          let p = document.createElement("p");
          p.innerText = `${m.from}: ${m.contents}`;
          msgList.appendChild(p);
        });
      }
    });
};

let errorView = () => {
  let container = document.createElement("div");
  container.setAttribute("class", "container h100 column");
  let message = document.createElement("h1");
  message.innerText = errorMessage;

  let homeButton = document.createElement("button");
  homeButton.setAttribute("class", "btn");
  homeButton.innerText = "Back to home";
  homeButton.addEventListener("click", () => {
    currentView = "signup-or-login";
    render();
  });

  container.appendChild(message);
  container.appendChild(homeButton);

  return container;
};

let loginView = () => {
  let container = document.createElement("div");
  container.setAttribute("class", "container column");

  let header = document.createElement("h1");
  header.innerText = "Login";

  let inputbox = document.createElement("div");
  inputbox.setAttribute("class", "inputbox");

  let usernameLabel = document.createElement("label");
  usernameLabel.setAttribute("for", "username");
  usernameLabel.innerText = "Username";

  let usernameInput = document.createElement("input");
  usernameInput.setAttribute("id", "username");

  let passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.innerText = "Password";

  let passwordInput = document.createElement("input");
  passwordInput.setAttribute("id", "password");

  inputbox.appendChild(usernameLabel);
  inputbox.appendChild(usernameInput);
  inputbox.appendChild(passwordLabel);
  inputbox.appendChild(passwordInput);

  let submitButton = document.createElement("button");
  submitButton.setAttribute("class", "btn");
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", async () => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    // JSON.stringify converts a JavaScript value to a string
    let bodyToBeSent = JSON.stringify({ username, password });
    // fetch is covered in depth in the slides
    // You will need to replace PASTE_THE_URL_FROM_GLITCH with your glitch server url
    await fetch(`${url}/login`, {
      method: "POST",
      body: bodyToBeSent,
    })
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        let parsed = JSON.parse(body);
        if (!parsed.success) {
          errorMessage = "Login failed. Reason: " + parsed.reason;
          currentView = "error";
          render();
        } else {
          alert("login successful");
          token = parsed.token;
          currentView = "chat";
          render();
        }
      });
  });

  let cancelButton = document.createElement("button");
  cancelButton.setAttribute("class", "btn");
  cancelButton.innerText = "Cancel";
  cancelButton.addEventListener("click", () => {
    currentView = "signup-or-login";
    render();
  });

  let buttons = document.createElement("div");

  buttons.appendChild(cancelButton);
  buttons.appendChild(submitButton);

  container.appendChild(header);
  container.appendChild(inputbox);
  container.appendChild(buttons);
  return container;
};

let signupOrLoginView = () => {
  //  You will need to modify this function
  let container = document.createElement("div");
  container.setAttribute("class", "container h100 r-row");
  let loginButton = document.createElement("button");
  loginButton.setAttribute("class", "btn");
  loginButton.innerText = "Login";
  loginButton.addEventListener("click", () => {
    currentView = "login";
    render();
  });

  let signupButton = document.createElement("button");
  signupButton.setAttribute("class", "btn");
  signupButton.innerText = "Signup";
  signupButton.addEventListener("click", () => {
    currentView = "signup";
    render();
  });

  container.appendChild(loginButton);
  container.appendChild(signupButton);

  return container;
};

let signupView = () => {
  let container = document.createElement("div");
  container.setAttribute("class", "container column");

  let header = document.createElement("h1");
  header.innerText = "Sign up";

  let inputbox = document.createElement("div");
  inputbox.setAttribute("class", "inputbox");

  let usernameLabel = document.createElement("label");
  usernameLabel.setAttribute("for", "username");
  usernameLabel.innerText = "Username";

  let usernameInput = document.createElement("input");
  usernameInput.setAttribute("id", "username");

  let passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.innerText = "Password";

  let passwordInput = document.createElement("input");
  passwordInput.setAttribute("id", "password");

  inputbox.appendChild(usernameLabel);
  inputbox.appendChild(usernameInput);
  inputbox.appendChild(passwordLabel);
  inputbox.appendChild(passwordInput);

  let submitButton = document.createElement("button");
  submitButton.setAttribute("class", "btn");
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", async () => {
    let username = usernameInput.value;
    let password = passwordInput.value;

    let bodyToBeSent = JSON.stringify({ username, password });

    await fetch(`${url}/signup`, {
      method: "POST",
      body: bodyToBeSent,
    })
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        // putting a debugger statement here might be useful
        console.log("received from /login  " + body);
        // JSON.parse converts a string to a JavaScript value
        // For this particular server, you always need to call it.
        let parsed = JSON.parse(body);
        if (!parsed.success) {
          errorMessage = "Sing up failed. Reason: " + parsed.reason;
          currentView = "error";
          render();
        } else {
          alert("signup successful");
          currentView = "login";
          render();
        }
      });
  });

  let cancelButton = document.createElement("button");
  cancelButton.setAttribute("class", "btn");
  cancelButton.innerText = "Cancel";
  cancelButton.addEventListener("click", () => {
    currentView = "signup-or-login";
    render();
  });

  let buttons = document.createElement("div");
  buttons.appendChild(submitButton);
  buttons.appendChild(cancelButton);

  container.appendChild(header);
  container.appendChild(inputbox);
  container.appendChild(buttons);
  return container;
};

// Rerenders the page
let render = () => {
  // Will contain a reference
  let toRender = undefined;
  // For debugging purposes
  console.log("rendering view", currentView);
  if (currentView === "signup-or-login") {
    toRender = signupOrLoginView();
  } else if (currentView === "signup") {
    toRender = signupView();
  } else if (currentView === "chat") {
    toRender = chatView();
  } else if (currentView === "login") {
    toRender = loginView();
  } else if (currentView === "error") {
    toRender = errorView();
  } else {
    // woops
    alert("unhandled currentView " + currentView);
  }

  // Removes all children from the body
  document.body.innerHTML = "";
  document.body.appendChild(toRender);
};

// Initial render
render();
