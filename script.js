/* Create the decorative mandala */
(() => {
  let h =
    '<circle r="96"/>' +
    '<circle r="90" stroke-dasharray="1.5 3.5"/>' +
    '<circle r="26"/>' +
    '<circle r="70" stroke-dasharray="1 3"/>';

  for (let i = 0; i < 12; i++) {
    h += `<ellipse cy="-58" rx="11" ry="24" transform="rotate(${i * 30})"/>`;
    h += `<path d="M0-34L6-26 0-18-6-26Z" transform="rotate(${i * 30 + 15})"/>`;
  }

  for (let i = 0; i < 24; i++) {
    h += `<circle cy="-81" r="1.5" fill="currentColor" transform="rotate(${i * 15})"/>`;
  }

  document.getElementById("mand").innerHTML = h;
})();

/* Photo gallery: images/couple-1.jpg to couple-6.jpg */
const grid = document.getElementById("grid");
const lightbox = document.getElementById("lb");
const totalPhotos = 6;

for (let i = 1; i <= totalPhotos; i++) {
  const frame = document.createElement("div");
  const photoContainer = document.createElement("div");
  const img = new Image();

  frame.className = "g";
  img.src = `images/couple-${i}.jpg`;
  img.alt = "Couple photo " + i;

  img.onerror = () => {
    photoContainer.textContent = `Add images/couple-${i}.jpg`;
    frame.style.cursor = "default";
  };

  photoContainer.appendChild(img);
  frame.appendChild(photoContainer);

  frame.onclick = () => {
    if (img.naturalWidth) {
      lightbox.firstElementChild.src = img.src;
      lightbox.style.display = "flex";
    }
  };

  grid.appendChild(frame);
}

/* Close the photo lightbox */
lightbox.onclick = () => {
  lightbox.style.display = "none";
};

/* WhatsApp sharing
   Set SITE_URL after publishing the website online.
*/
const SITE_URL = "";
const invitationLink = (SITE_URL || location.href).split("#")[0];

const invitationText =
  "🙏 శ్రీహర్ష weds స్వాతి\n" +
  "You are warmly invited to our wedding on 29 October 2026, Amalapuram.";

const whatsappButton = document.getElementById("wa");

whatsappButton.href =
  "https://wa.me/?text=" +
  encodeURIComponent(invitationText + "\n" + invitationLink);

whatsappButton.onclick = event => {
  if (navigator.share) {
    event.preventDefault();

    navigator.share({
      title: "Sri Harsha weds Swathi",
      text: invitationText,
      url: invitationLink
    }).catch(() => {});
  }
};

/* Phone numbers: open the device dialler */
document.querySelectorAll("a.tel").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    window.location.href = link.getAttribute("href");
  });
});

/* Background music controls */
const bgm = document.getElementById("bgm");
const musicButton = document.getElementById("music");

async function music(on) {
  if (!bgm) {
    alert("Audio element not found!");
    return;
  }

  if (on) {
    try {
      bgm.volume = 1;
      await bgm.play();
      musicButton?.classList.add("on");
      console.log("Music started successfully");
    } catch (error) {
      console.error("Music playback error:", error);
      alert("Music error: " + error.message);
    }
  } else {
    bgm.pause();
    musicButton?.classList.remove("on");
  }
}

if (musicButton) {
  musicButton.addEventListener("click", () => {
    music(bgm.paused);
  });
}

bgm?.addEventListener("error", () => {
  console.error("Audio file failed to load:", bgm.error);
  alert("Audio file failed to load. Check the MP3 path.");
});

/* Open invitation doors and release falling petals */
document.getElementById("open").onclick = () => {
  document.getElementById("gate").classList.add("open");

  bgm.volume = 0.7;
  music(true);

  for (let i = 0; i < 20; i++) {
    const petal = document.createElement("span");
    const size = 8 + Math.random() * 8;

    petal.className = "petal";

    petal.style.cssText = `
      left: ${Math.random() * 100}vw;
      width: ${size}px;
      height: ${size * 1.3}px;
      --t: ${9 + Math.random() * 9}s;
      --dl: ${Math.random() * 8}s;
      --x: ${(Math.random() - 0.5) * 160}px;
    `;

    document.body.appendChild(petal);
  }
};

/* Countdown to wedding muhurtham: Indian Standard Time */
const weddingDate = new Date("2026-10-29T19:31:00+05:30");
const countdown = document.getElementById("count");

function updateCountdown() {
  let seconds = Math.max(
    0,
    Math.floor((weddingDate - Date.now()) / 1000)
  );

  countdown.innerHTML = [
    ["Days", 86400],
    ["Hours", 3600],
    ["Mins", 60],
    ["Secs", 1]
  ].map(([label, unit]) => {
    const value = Math.floor(seconds / unit);
    seconds %= unit;

    return `
      <div>
        <b>${value}</b>
        <span>${label}</span>
      </div>
    `;
  }).join("");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* Reveal sections when they enter the screen */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(section => {
  observer.observe(section);
});