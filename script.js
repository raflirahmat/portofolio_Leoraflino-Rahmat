// ==========================================================================
// INTERACTIVE LOGIC - TEAL TECH MINIMALIST PORTFOLIO
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Scroll Active Link Highlighter untuk Navbar
  const sections = document.querySelectorAll("section, header");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 90) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-teal", "fw-bold");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("text-teal", "fw-bold");
      }
    });
  });

  // 2. Handler Peringatan Interaktif Modul Desktop Python
  const alertAIBtn = document.getElementById("alertAI");
  if (alertAIBtn) {
    alertAIBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(
        'Proyek "Hand Gesture Detection" merupakan aplikasi berbasis Desktop Environment Python lokal yang memanfaatkan modul MediaPipe & OpenCV, saat ini dokumentasi kode disimpan dalam repositori backend offline.',
      );
    });
  }
});
function bukaPortofolio() {
  // 1. Sembunyikan halaman splash screen
  const splash = document.getElementById("splash-screen");
  splash.style.transition = "opacity 0.5s ease";
  splash.style.opacity = 0;
  setTimeout(() => splash.remove(), 500);

  // 2. Jalankan fungsi suara Google Wanita
  if ("speechSynthesis" in window) {
    let ucapan = new SpeechSynthesisUtterance(
      "hy selamat datang di portofolio rafli rahmat",
    );

    // Mengambil semua daftar suara yang tersedia di browser
    let daftarSuara = window.speechSynthesis.getVoices();

    // Mencari suara wanita Indonesia (id-ID)
    // Browser biasanya menyediakan Google Bahasa Indonesia (id-ID) yang berkarakter wanita
    let suaraWanitaIndo = daftarSuara.find(
      (suara) => suara.lang === "id-ID" || suara.lang.includes("id"),
    );

    if (suaraWanitaIndo) {
      ucapan.voice = suaraWanitaIndo;
    }

    ucapan.lang = "id-ID";
    ucapan.rate = 1.0; // Kecepatan normal
    ucapan.pitch = 1.1; // Nada sedikit dinaikkan agar karakter wanitanya lebih jelas

    // Eksekusi suara wanita
    window.speechSynthesis.speak(ucapan);
  }
}

// Memicu browser untuk memuat daftar suara terlebih dahulu agar tidak kosong saat tombol diklik
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = function () {
    window.speechSynthesis.getVoices();
  };
}
// ==========================================================================
// TRIGGER ANIMASI MARQUEE TARGET SPESIFIK SAAT NAVBAR DIKLIK BY RAFLI
// ==========================================================================

document.querySelectorAll(".nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.startsWith("#")) {
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Cari elemen konten spesifik di dalam section tersebut
        const elemenKonten = targetSection.querySelector(".konten-marquee");

        if (elemenKonten) {
          // Reset animasi lama jika ada
          elemenKonten.classList.remove("jalan-marquee");

          // Tunggu scroll selesai (600ms), lalu jalankan aliran marquee-nya
          setTimeout(() => {
            elemenKonten.classList.add("jalan-marquee");
          }, 600);
        }
      }
    }
  });
});
// ==========================================================================
// DETEKSI SCROLL & NAVBAR UNTUK ANIMASI MARQUEE BY RAFLI
// ==========================================================================

// 1. FUNGSI UNTUK MEDETEKSI SAAT DI-SCROLL / BARU DIBUKA
const pemicuScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Jika section sudah mulai kelihatan di layar sebesar 15%
      if (entry.isIntersecting) {
        const elemenKonten = entry.target.querySelector(".konten-marquee");
        if (elemenKonten) {
          elemenKonten.classList.add("jalan-marquee");
        }
      }
    });
  },
  {
    threshold: 0.15, // Konten jalan saat 15% bagian section sudah muncul di layar
  },
);

// Daftarkan semua section ke dalam sistem pendeteksi scroll
document.querySelectorAll("section").forEach((section) => {
  pemicuScroll.observe(section);
});

// 2. FUNGSI UNTUK DETEKSI JIKA NAVBAR DI-KLIK
document.querySelectorAll(".nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.startsWith("#")) {
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const elemenKonten = targetSection.querySelector(".konten-marquee");

        if (elemenKonten) {
          // Reset sebentar biar ada efek mengalir ulang yang segar saat diklik
          elemenKonten.classList.remove("jalan-marquee");

          // Tunggu scroll selesai, lalu jalankan animasinya
          setTimeout(() => {
            elemenKonten.classList.add("jalan-marquee");
          }, 600);
        }
      }
    }
  });
});
