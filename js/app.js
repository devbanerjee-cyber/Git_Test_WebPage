const SUPABASE_URL = "https://jtymtovpzqrfkdhbcrxg.supabase.co";
const SUPABASE_KEY = "sb_publishable_8ekcWHQ_-jc4wHc7jO9POQ_kPI5TEF9";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadData() {

  const container = document.getElementById("cards");

  // ✅ Show loading message
  container.innerHTML = "<p>Loading trainings...</p>";

  const { data, error } = await client
    .from("training_portal")  // ✅ Make sure table name is correct
    .select("*");

  if (error) {
    console.error("Error:", error);
    container.innerHTML = "<p style='color:red;'>Error loading data</p>";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No training data found</p>";
    return;
  }

  // ✅ Render cards
  container.innerHTML = data.map(item => `
    <div class="card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p><strong>${item.tech}</strong></p>
      <a href="${item.link}" target="_blank">View Training</a>
    </div>
  `).join("");
}

// ✅ Run function
loadData();
