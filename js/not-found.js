// ============ 404 PAGE ============
// Shows the bad path in the "terminal", types the lines in, Enter goes home,
// the glow follows the pointer and the theme toggle works.
(function () {
  document.getElementById("pathTarget").textContent = '"' + location.pathname + '"';

  const lines = document.querySelectorAll("#terminal [data-line]");
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  lines.forEach((l, i) => (calm ? l.classList.add("shown") : setTimeout(() => l.classList.add("shown"), 260 + i * 320)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.activeElement === document.body) window.location.href = document.querySelector(".nf-brand").href;
  });

  const glow = document.getElementById("glow");
  window.addEventListener("pointermove", (e) => {
    glow.style.setProperty("--gx", e.clientX + "px");
    glow.style.setProperty("--gy", e.clientY + "px");
  }, { passive: true });

  const root = document.documentElement;
  document.getElementById("themeToggle").addEventListener("click", () => {
    const light = root.getAttribute("data-theme") === "light";
    if (light) root.removeAttribute("data-theme"); else root.setAttribute("data-theme", "light");
    try { localStorage.setItem("sr-theme", light ? "dark" : "light"); } catch (e) {}
  });
})();
