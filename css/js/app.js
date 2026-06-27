

const SUPABASE_URL = "https://jtymtovpzqrfkdhbcrxg.supabase.co";
const SUPABASE_KEY = "sb_publishable_8ekcWHQ_-jc4wHc7jO9POQ_kPI5TEF9";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadData() {

  const container = document.getElementById("cards");
  if (!container) return; // Important for multi-page

  const { data, error } = await client
    .from("training_portal")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  container.innerHTML = data.map(item => `
    <div class="card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p><strong>${item.tech}</strong></p>
      <a href="${item.link}" target="_blank">View</a>
    </div>
  `).join("");
}

loadData();
