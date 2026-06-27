// Shared Header and Footer Loader

async function loadComponent(elementId, filePath) {
  const element = document.getElementById(elementId);

  if (!element) return;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error("Failed to load: " + filePath);
    }

    const html = await response.text();
    element.innerHTML = html;

  } catch (error) {
    console.error("Component load error:", error);
  }
}

async function loadLayout() {
  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");

  // Tell auth.js that header has loaded
  document.dispatchEvent(new Event("layoutLoaded"));
}

loadLayout();
