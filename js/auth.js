
// Firebase Authentication Logic

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

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
      <img src="${user.photoURL}" alt="User photo" class="user-photo">
      <span class="user-name">${user.displayName}</span>
      <button id="logoutBtn" class="logout-btn">Logout</button>
    </div>
  `;
}

// Login button click
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "loginBtn") {
    auth.signInWithPopup(provider)
      .then(function (result) {
        console.log("Login successful:", result.user);
      })
      .catch(function (error) {
        console.error("Login error:", error);
        alert("Google login failed. Please check Firebase settings and authorized domain.");
      });
  }
});

// Logout button click
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "logoutBtn") {
    auth.signOut()
      .then(function () {
        console.log("Logged out");
      })
      .catch(function (error) {
        console.error("Logout error:", error);
      });
  }
});

// Wait until shared header is loaded
document.addEventListener("layoutLoaded", function () {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      renderLoggedIn(user);
    } else {
      renderLoggedOut();
    }
  });
});
