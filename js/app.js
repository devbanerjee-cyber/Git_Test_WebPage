const SUPABASE_URL = "https://jtymtovpzqrfkdhbcrxg.supabase.co";
const SUPABASE_KEY = "sb_publishable_8ekcWHQ_-jc4wHc7jO9POQ_kPI5TEF9";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadData() {

  const container = document.getElementById("cards");

  // ✅ Important: prevent errors on other pages
  if (!container) return;

  // ✅ Show loading
  container.innerHTML = "<p>Loading trainings...</p>";

  try {
    // ✅ Try both possible table names (handles your previous issue)
    let response = await client
      .from("training_portal")
      .select("*");

    // 🔁 Fallback if first table fails
    if (response.error) {
      console.warn("training_portal not found, trying trainingdata...");
      response = await client
        .from("trainingdata")
        .select("*");
    }

    const { data, error } = response;

    if (error) {
      console.error("Error fetching data:", error);
      container.innerHTML = "<p style='color:red;'>Error loading data</p>";
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No training data found</p>";
      return;
    }

    // ✅ Render cards safely
    container.innerHTML = data.map(item => `
      <div class="card">
        <h3>${item.title || "No title"}</h3>
        <p>${item.description || item.desc || "No description"}</p>
        <p><strong>${item.tech || "General"}</strong></p>
        <a href="${item.link || '#'}" target="_blank">View Training</a>
      </div>
    `).join("");

  } catch (err) {
    console.error("Unexpected error:", err);
    container.innerHTML = "<p style='color:red;'>Something went wrong</p>";
  }
}

// ✅ Run function
loadData();
