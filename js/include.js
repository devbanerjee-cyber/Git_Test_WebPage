
async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  const response = await fetch(file);
  const html = await response.text();
  element.innerHTML = html;
}

// ✅ Load header + footer
loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");
