// assets/main.js (FTD)

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // 1) NAV active-state (FTD .nav)
  // -----------------------------
  const nav = document.querySelector(".nav");
  if (nav) {
    const links = Array.from(nav.querySelectorAll("a"));
    const path = window.location.pathname.replace(/\/+$/, "");
    const current = (path.split("/").pop() || "index.html").toLowerCase();

    links.forEach((a) => {
      const hrefRaw = a.getAttribute("href") || "";
      const href = hrefRaw.split("#")[0].split("?")[0].toLowerCase();
      const hrefFile = (href.split("/").pop() || "").toLowerCase();
      const isHome = current === "" || current === "index.html";

      const matches =
        hrefFile === current ||
        (isHome && (hrefFile === "index.html" || href === "./" || href === "/" || href === ""));

      a.classList.toggle("active", matches);
    });
  }

  // -----------------------------------------
  // 2) One-audio-at-a-time (site-wide, safe)
  // -----------------------------------------
  const audios = Array.from(document.querySelectorAll("audio"));
  if (audios.length > 1) {
    audios.forEach((audio) => {
      audio.addEventListener("play", () => {
        audios.forEach((other) => {
          if (other !== audio && !other.paused) other.pause();
        });
      });
    });
  }

  // -----------------------------------------
  // 3) Back-to-top button (site-wide, safe)
  // -----------------------------------------
  if (!document.getElementById("backToTop")) {
    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.type = "button";
    btn.className = "btn back-to-top";
    btn.textContent = "Top";
    btn.setAttribute("aria-label", "Back to top");
    document.body.appendChild(btn);

    const onScroll = () => {
      btn.classList.toggle("show", window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // -----------------------------------------
  // 4) Archive accordion controls (archive only)
  // -----------------------------------------
  const archiveGroups = Array.from(document.querySelectorAll("details.archive-group"));
  if (archiveGroups.length) {
    // Build toolbar above first group
    const toolbar = document.createElement("div");
    toolbar.className = "archive-toolbar";
    toolbar.innerHTML = `
      <button class="btn subtle" type="button" id="archiveExpand">Expand all</button>
      <button class="btn subtle" type="button" id="archiveCollapse">Collapse all</button>
    `;

    archiveGroups[0].parentElement.insertBefore(toolbar, archiveGroups[0]);

    const expandBtn = document.getElementById("archiveExpand");
    const collapseBtn = document.getElementById("archiveCollapse");

    expandBtn.addEventListener("click", () => {
      archiveGroups.forEach((d) => (d.open = true));
    });

    collapseBtn.addEventListener("click", () => {
      archiveGroups.forEach((d) => (d.open = false));
      // keep first open so the page doesn't feel empty
      archiveGroups[0].open = true;
    });
  }
});