const firebaseConfig = {
  apiKey: "AIzaSyDourbydggTKB2T9DtWuda0HaOM0F7exm0",
  authDomain: "devfirebasegit.firebaseapp.com",
  projectId: "devfirebasegit",
  storageBucket: "devfirebasegit.appspot.com",
  messagingSenderId: "121439772482",
  appId: "1:121439772482:web:732787bbb283cfcf1bf2db"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
