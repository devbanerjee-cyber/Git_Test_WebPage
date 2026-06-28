async function loadComponent(elementId, filePath) {
  const element = document.getElementById(elementId);

  if (!element) return;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error("Failed to load component: " + filePath);
    }

    const html = await response.text();
    element.innerHTML = html;

    console.log(filePath + " loaded successfully");

  } catch (error) {
    console.error("Component load error:", error);
  }
}

async function loadLayout() {
  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");

  // Tell auth.js that header/footer are ready
  document.dispatchEvent(new Event("layoutLoaded"));
}

loadLayout();
