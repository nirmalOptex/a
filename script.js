let clickPositions = [];
let mouseMoves = [];
let scrollPositions = [];
let keyPresses = [];

// Track clicks
document.addEventListener("click", (e) => {
  clickPositions.push({ x: e.clientX, y: e.clientY });
});

// Track mouse movements
document.addEventListener("mousemove", (e) => {
  mouseMoves.push({ x: e.clientX, y: e.clientY });
});

// Track scrolling
window.addEventListener("scroll", () => {
  scrollPositions.push(window.scrollY);
});

// Track key presses
document.addEventListener("keydown", (e) => {
  keyPresses.push(e.key);
});

async function getBatteryInfo() {
  try {
    const battery = await navigator.getBattery();
    return { level: battery.level, charging: battery.charging };
  } catch {
    return null;
  }
}

document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const battery = await getBatteryInfo();
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    {};

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    browser: navigator.userAgent,
    os: navigator.platform,
    language: navigator.language,
    cookiesEnabled: navigator.cookieEnabled,
    cpu: navigator.hardwareConcurrency || "Unknown",
    memory: navigator.deviceMemory || "Unknown",
    touch: "ontouchstart" in window,
    pointer: navigator.maxTouchPoints > 0 ? "Touch" : "Mouse",
    screen: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    online: navigator.onLine,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    connection: {
      type: connection.effectiveType || "Unknown",
      downlink: connection.downlink || "Unknown",
      rtt: connection.rtt || "Unknown",
    },
    battery: battery,
    clicks: clickPositions,
    mouseMoves: mouseMoves,
    scrolls: scrollPositions,
    keyPresses: keyPresses,
  };

  const res = await fetch("/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  document.getElementById("status").innerText = await res.text();
});
