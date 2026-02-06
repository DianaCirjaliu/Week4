export function setupUI() {
  const sideBox = document.getElementById("sideBox") as HTMLElement;
  const popBtn = document.getElementById("popBtn") as HTMLButtonElement;
  const closeBtn = document.getElementById("closeBtn") as HTMLButtonElement;
  const scrollEl = document.getElementById("scrollPos") as HTMLElement;
  const dimensionEl = document.getElementById("innerDim") as HTMLElement;

  popBtn.onclick = () => sideBox.classList.add("active");
  closeBtn.onclick = () => sideBox.classList.remove("active");

  const updateState = () => {
    const scrollX = Math.round(window.scrollX);
    const scrollY = Math.round(window.scrollY);

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (scrollEl) {
      scrollEl.innerText = `X: ${scrollX}, Y:${scrollY}`;
    }

    if (dimensionEl) {
      dimensionEl.innerText = `${width}px x ${height}px`;
    }
  };

  window.addEventListener("scroll", updateState);
  window.addEventListener("resize", updateState);

  updateState();
}
