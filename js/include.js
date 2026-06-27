async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error("File not found: " + file);

    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");
