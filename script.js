(function () {
  "use strict";

  /* ---------- Sticky nav compact state ---------- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("navBurger");
  var mobile = document.getElementById("navMobile");
  burger.addEventListener("click", function () {
    var open = burger.classList.toggle("open");
    mobile.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mobile.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      burger.classList.remove("open");
      mobile.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  revealEls.forEach(function (el, i) {
    el.style.setProperty("--i", i % 6);
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- Subtle cursor dot (desktop only) ---------- */
  var dot = document.getElementById("cursorDot");
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener("mousemove", function (e) {
      dot.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px) translate(-50%,-50%)";
      dot.classList.add("active");
    });
    window.addEventListener("mouseleave", function () {
      dot.classList.remove("active");
    });
  }

  /* ---------- Contact form (client-side placeholder) ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.textContent =
        "Thanks — this form is a template. Connect it to your email or a form service (e.g. Formspree) to receive messages.";
    });
  }

  /* ---------- Project case study modal ---------- */
  var overlay = document.getElementById("modalOverlay");
  var modalContent = document.getElementById("modalContent");
  var modalClose = document.getElementById("modalClose");

  var PROJECTS = {
    marksheet: {
      cat: "Education Technology",
      title: "Rise School — Online Marksheet System",
      overview:
        "A web-based result management system built for Rise School so staff can publish, manage and update student marksheets digitally instead of relying on manual paper records.",
      problem:
        "Result preparation was handled manually across registers and spreadsheets, which made it slow to compile, easy to make errors in, and difficult for students to access their own results without visiting the school in person.",
      solution:
        "Zohaib designed a Google Sheets-backed system connected to a lightweight web front end. Teachers enter marks into a structured sheet, and Google Apps Script automatically processes, validates and formats results into a clean digital marksheet that students can look up online.",
      features: [
        "Online result lookup by roll number and class",
        "Digitally generated marksheets",
        "Automated result processing from raw marks",
        "Centralized student data management",
        "Admin controls for managing records and access",
      ],
      how: "Marks are entered into a Google Sheet, Apps Script validates and calculates totals and grades, and the results are served through a simple web page where students search their own result securely.",
      tech: ["Google Sheets", "Google Apps Script", "HTML", "CSS", "JavaScript"],
      shots: [
        { label: "Select term & class", img: "marksheet-select-term.jpg" },
        { label: "Digital marksheet view", img: "marksheet-result.jpg" },
        { label: "Enter roll number", img: "marksheet-roll-entry.jpg" },
      ],
      highlights:
        "Focused on making a familiar spreadsheet workflow feel like a proper application, without asking staff to learn new software.",
      impact:
        "Gives the school a faster, more organized way to manage and share results, and gives students a simple way to check their own marksheet online.",
    },
    certificate: {
      cat: "Education Technology",
      title: "Rise Computer Center — Online Certificate System",
      overview:
        "An online system that lets students at Rise Computer Center apply for their course completion certificate, track its status, and download it once it's approved.",
      problem:
        "Certificate requests were handled in person and manually approved, creating delays and making it hard for both staff and students to track where an application stood.",
      solution:
        "Zohaib built an application workflow on Google Sheets and Apps Script: students submit a request online, admins review and approve it from a simple dashboard, and an approved request automatically generates a downloadable certificate.",
      features: [
        "Online certificate application form",
        "Structured student information capture",
        "Admin review and approval workflow",
        "Automated certificate generation",
        "Direct certificate download after approval",
      ],
      how: "Course Completion → Online Application → Admin Review → Approval → Certificate Download. Each stage updates a status field in the connected sheet, which the front end reads to show the student real-time progress.",
      tech: ["Google Sheets", "Google Apps Script", "HTML", "CSS", "JavaScript"],
      shots: [
        { label: "Home — Student Portal", img: "cert-home.jpg" },
        { label: "Certificate status check", img: "cert-status-check.jpg" },
        { label: "Admin login", img: "cert-admin-login.jpg" },
        { label: "Admin dashboard", img: "cert-admin-dashboard.jpg" },
      ],
      highlights:
        "The approval workflow was designed to stay simple for administrators — one dashboard, one clear action per request.",
      impact:
        "Removes back-and-forth in person visits from the certificate process and gives the center a clear digital record of every request.",
    },
    mcq: {
      cat: "Education Technology • Live Competition",
      title: "Online MCQ Competition System",
      overview:
        "An interactive system for running live multiple-choice competitions, with an admin control panel, a big-screen question display, and a real-time leaderboard.",
      problem:
        "Running a live quiz competition manually makes scoring slow and error-prone, and it's hard to keep an audience engaged without a clear, live view of standings.",
      solution:
        "Zohaib built a control panel that lets an admin push questions live, collect participant answers, score them automatically against an answer key in Google Sheets, and update a leaderboard in real time on a shared screen.",
      features: [
        "Admin panel for managing and releasing questions",
        "Live MCQ questions with a timer",
        "Big-screen question display for audiences",
        "Automatic evaluation and scoring",
        "Live leaderboard and ranking",
        "Full competition management and results",
      ],
      how: "The admin releases a question from the panel; participants submit answers, which are automatically checked and scored using Google Apps Script; the leaderboard updates live as scores come in.",
      tech: ["Google Sheets", "Google Apps Script", "HTML", "CSS", "JavaScript"],
      shots: [
        { label: "Admin login", img: "mcq-admin-login.jpg" },
        { label: "Live control panel", img: "mcq-live-control.jpg" },
        { label: "Join competition", img: "mcq-join.jpg" },
      ],
      highlights:
        "Built to feel responsive on a shared screen — questions, timers and leaderboard updates all happen without a manual refresh.",
      impact:
        "Makes running a competitive quiz event simpler and more engaging, with instant, transparent scoring for participants.",
    },
  };

  function renderProject(key) {
    var p = PROJECTS[key];
    if (!p) return;

    var shotsHTML;
    var firstShot = p.shots[0];
    if (firstShot && typeof firstShot === "object" && firstShot.img) {
      // Real individual screenshots, each with its own caption
      shotsHTML = p.shots
        .map(function (s) {
          return (
            '<div class="m-shot-block" style="margin-bottom:18px;">' +
            '<img src="' + s.img + '" alt="' + s.label + '" style="width:100%;height:auto;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,0.18);display:block;margin-bottom:8px;">' +
            '<p style="text-align:center;font-size:0.85em;opacity:0.75;margin:0;">' + s.label + "</p>" +
            "</div>"
          );
        })
        .join("");
    } else {
      // Fallback: single composite screenshot with a caption list underneath
      var captionsHTML = p.shots
        .map(function (label) {
          return "<li>" + label + "</li>";
        })
        .join("");
      shotsHTML =
        '<img src="' + p.image + '" alt="' + p.title + ' screenshot" style="width:100%;height:auto;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,0.18);display:block;margin-bottom:14px;">' +
        '<ul class="m-shots-captions">' + captionsHTML + "</ul>";
    }

    var featuresHTML = p.features
      .map(function (f) {
        return "<li>" + f + "</li>";
      })
      .join("");
    var techHTML = p.tech
      .map(function (t) {
        return "<span>" + t + "</span>";
      })
      .join("");

    modalContent.innerHTML =
      '<p class="m-cat">' + p.cat + "</p>" +
      "<h2>" + p.title + "</h2>" +
      "<h4>Project Overview</h4><p>" + p.overview + "</p>" +
      "<h4>The Problem</h4><p>" + p.problem + "</p>" +
      "<h4>The Solution</h4><p>" + p.solution + "</p>" +
      "<h4>Key Features</h4><ul>" + featuresHTML + "</ul>" +
      "<h4>How It Works</h4><p>" + p.how + "</p>" +
      "<h4>Technology Stack</h4><div class=\"m-tech\">" + techHTML + "</div>" +
      "<h4>Screenshots</h4><div class=\"m-shots\">" + shotsHTML + "</div>" +
      "<h4>Development Highlights</h4><p>" + p.highlights + "</p>" +
      "<h4>Result &amp; Impact</h4><p>" + p.impact + "</p>";
  }

  function openModal(key) {
    renderProject(key);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".case-study-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(btn.getAttribute("data-project"));
    });
  });

  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });
})();
