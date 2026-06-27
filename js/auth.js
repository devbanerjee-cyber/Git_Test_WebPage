// Firebase Google Login Logic

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

auth.useDeviceLanguage();

function showLoginError(error) {
  console.error("Login error code:", error.code);
  console.error("Login error message:", error.message);

  alert(
    "Google login failed.\n\n" +
    "Error Code: " + error.code + "\n\n" +
    "Message: " + error.message
  );
}

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

// Handle Login button click
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "loginBtn") {

    // Redirect login is more reliable than popup on GitHub Pages / InPrivate
    auth.signInWithRedirect(provider)
      .catch(function (error) {
        showLoginError(error);
      });
  }
});

// Handle Logout button click
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "logoutBtn") {
    auth.signOut()
      .then(function () {
        console.log("User logged out");
      })
      .catch(function (error) {
        console.error("Logout error:", error);
      });
  }
});

// Handle redirect result
auth.getRedirectResult()
  .then(function (result) {
    if (result && result.user) {
      console.log("Redirect login successful:", result.user);
    }
  })
  .catch(function (error) {
    showLoginError(error);
  });

// Update UI when login state changes
function startAuthListener() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      renderLoggedIn(user);
    } else {
      renderLoggedOut();
    }
  });
}

// If header is already loaded
if (document.getElementById("auth-section")) {
  startAuthListener();
}

// If header loads later from include.js
document.addEventListener("layoutLoaded", function () {
  startAuthListener();
});
