const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

auth.useDeviceLanguage();

let authListenerStarted = false;

function renderLoggedOut() {
  const authSection = document.getElementById("auth-section");

  if (!authSection) return;

  authSection.innerHTML = `
    <button id="loginBtn" class="login-btn">Login with Google</button>
  `;
}

function renderLoggedIn(user) {
  const authSection = document.getElementById("auth-section");

  if (!authSection) return;

  authSection.innerHTML = `
    <div class="user-box">
      <img src="${user.photoURL || ''}" alt="User Photo" class="user-photo">
      <span class="user-name">${user.displayName || user.email}</span>
      <button id="logoutBtn" class="logout-btn">Logout</button>
    </div>
  `;
}

function startAuthListener() {
  if (authListenerStarted) return;

  const authSection = document.getElementById("auth-section");

  if (!authSection) {
    setTimeout(startAuthListener, 200);
    return;
  }

  authListenerStarted = true;

  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log("User is logged in:", user.displayName);
      renderLoggedIn(user);
    } else {
      console.log("No user logged in");
      renderLoggedOut();
    }
  });
}

// Login click
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "loginBtn") {
    auth.signInWithPopup(provider)
      .then(function (result) {
        console.log("Login successful:", result.user);
        renderLoggedIn(result.user);
      })
      .catch(function (error) {
        console.error("Login error code:", error.code);
        console.error("Login error message:", error.message);

        alert(
          "Google login failed.\n\n" +
          "Error Code: " + error.code + "\n\n" +
          "Message: " + error.message
        );
      });
  }
});

// Logout click
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "logoutBtn") {
    auth.signOut()
      .then(function () {
        console.log("Logged out");
        renderLoggedOut();
      })
      .catch(function (error) {
        console.error("Logout error:", error);
      });
  }
});

// Start listener after header/footer are loaded
document.addEventListener("layoutLoaded", function () {
  startAuthListener();
});

// Safety fallback
document.addEventListener("DOMContentLoaded", function () {
  startAuthListener();
});
