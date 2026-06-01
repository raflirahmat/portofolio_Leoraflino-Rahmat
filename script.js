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
// ==========================================================================
// LOGIKA ID CARD INTERAKTIF BISA DITARIK DAN MEMBAL BY RAFLI
// ==========================================================================

const kartuId = document.getElementById("kartu-id");
const taliId = document.getElementById("tali-id");

let sedangDitarik = false;
let posisiYAwal = 0;
let jarakTarikY = 0;
const panjangTaliDefault = 120; // Sesuai CSS awal

if (kartuId && taliId) {
  // 1. Saat kursor atau jari mulai menyentuh/menekan kartu
  kartuId.addEventListener("pointerdown", (e) => {
    sedangDitarik = true;
    posisiYAwal = e.clientY;

    // Matikan transisi membal dulu saat ditarik agar gerakannya responsif langsung mengikuti tangan
    kartuId.classList.remove("efek-membal");
    taliId.classList.remove("tali-membal");
    kartuId.setPointerCapture(e.pointerId);
  });

  // 2. Saat kartu ditarik ke bawah
  kartuId.addEventListener("pointermove", (e) => {
    if (!sedangDitarik) return;

    // Hitung seberapa jauh kursor bergerak ke bawah
    let deltaY = e.clientY - posisiYAwal;

    // Batasi tarikan agar kartu tidak ditarik terlalu jauh (maksimal ke bawah 180px)
    if (deltaY < 0) deltaY = 0; // Tidak bisa ditarik ke atas melewati batas tali
    if (deltaY > 180) deltaY = 180;

    jarakTarikY = deltaY;

    // Gerakkan kartu ke bawah dan buat talinya ikut memanjang secara elastis
    kartuId.style.transform = `translateY(${jarakTarikY}px)`;
    taliId.style.height = `${panjangTaliDefault + jarakTarikY}px`;
  });

  // 3. Saat klik dilepas atau jari diangkat (EFEK MEMBAL / SPRING)
  kartuId.addEventListener("pointerup", (e) => {
    if (!sedangDitarik) return;
    sedangDitarik = false;

    // Nyalakan class efek membal (cubic-bezier spring)
    kartuId.classList.add("efek-membal");
    taliId.classList.add("tali-membal");

    // Kembalikan posisi kartu dan panjang tali ke ukuran semula otomatis
    kartuId.style.transform = "translateY(0px)";
    taliId.style.height = `${panjangTaliDefault}px`;
  });

  kartuId.addEventListener("pointercancel", () => {
    sedangDitarik = false;
    kartuId.classList.add("efek-membal");
    taliId.classList.add("tali-membal");
    kartuId.style.transform = "translateY(0px)";
    taliId.style.height = `${panjangTaliDefault}px`;
  });
}
