// =============================
// DARK / LIGHT MODE
// =============================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';

    } else {

        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';

    }

});


// =============================
// MOBILE MENU
// =============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


// =============================
// CONTACT FORM
// =============================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Thank you for contacting me! 😊");

    contactForm.reset();

});
/* ==========================================
   ADDITIONAL HACKER EFFECTS
   Add this at the END of script.js
   ========================================== */

(() => {
    "use strict";

    // Respect reduced-motion accessibility settings
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. MATRIX RAIN BACKGROUND
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    let columns = [];
    let fontSize = 15;
    let matrixWidth = 0;
    let matrixHeight = 0;
    let matrixFrame;

    function resizeMatrix() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        matrixWidth = window.innerWidth;
        matrixHeight = window.innerHeight;

        canvas.width = matrixWidth * dpr;
        canvas.height = matrixHeight * dpr;
        canvas.style.width = matrixWidth + "px";
        canvas.style.height = matrixHeight + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        columns = Array.from(
            { length: Math.ceil(matrixWidth / fontSize) },
            () => Math.random() * (matrixHeight / fontSize)
        );
    }

    function drawMatrix() {
        ctx.clearRect(0, 0, matrixWidth, matrixHeight);

        ctx.fillStyle = "#00ff88";
        ctx.font = fontSize + "px monospace";

        const characters = "01アイウエオ{}[]<>/\\#$%";

        columns.forEach((y, index) => {
            const character = characters[
                Math.floor(Math.random() * characters.length)
            ];

            ctx.fillText(
                character,
                index * fontSize,
                y * fontSize
            );

            if (
                y * fontSize > matrixHeight &&
                Math.random() > 0.975
            ) {
                columns[index] = 0;
            } else {
                columns[index] += 0.35;
            }
        });

        matrixFrame = requestAnimationFrame(drawMatrix);
    }

    resizeMatrix();

    if (!reduceMotion) {
        drawMatrix();
    }

    window.addEventListener("resize", resizeMatrix);

    // 2. MOUSE-FOLLOWING GREEN GLOW
    let mouseFrame;

    document.addEventListener("mousemove", (event) => {
        if (reduceMotion) return;

        cancelAnimationFrame(mouseFrame);

        mouseFrame = requestAnimationFrame(() => {
            document.body.style.setProperty(
                "--mouse-x",
                event.clientX + "px"
            );

            document.body.style.setProperty(
                "--mouse-y",
                event.clientY + "px"
            );
        });
    });

    // 3. TERMINAL INTRODUCTION
    const heroContent = document.querySelector(".hero-content");
    const smallTitle = heroContent?.querySelector(".small-title");

    if (
        heroContent &&
        smallTitle &&
        !heroContent.querySelector(".hacker-terminal")
    ) {
        const terminal = document.createElement("div");
        terminal.className = "hacker-terminal";

        terminal.innerHTML = `
            <div class="terminal-top">
                <span class="terminal-dot"></span>
                <span class="terminal-dot"></span>
                <span class="terminal-dot"></span>
                <span class="terminal-label">THANU | DEVELOPER</span>
            </div>
            <div>
                <span class="terminal-prompt">thanu@portfolio:~$</span>
                <span class="terminal-command"></span>
                <span class="terminal-cursor"></span>
            </div>
        `;

        smallTitle.insertAdjacentElement("afterend", terminal);

        const command = terminal.querySelector(".terminal-command");
        const messages = [
        " welcome to Thanu's digital space...",
        " building creative web projects...",
        " learning. coding. innovating..."
    ];
        if (reduceMotion) {
            command.textContent = " welcome to my portfolio";
        } else {
            let messageIndex = 0;
            let characterIndex = 0;
            let deleting = false;

            function typeCommand() {
                const message = messages[messageIndex];

                if (!deleting) {
                    characterIndex++;

                    command.textContent =
                        message.substring(0, characterIndex);

                    if (characterIndex >= message.length) {
                        deleting = true;
                        setTimeout(typeCommand, 1500);
                        return;
                    }

                    setTimeout(typeCommand, 65);
                } else {
                    characterIndex--;

                    command.textContent =
                        message.substring(0, characterIndex);

                    if (characterIndex <= 0) {
                        deleting = false;
                        messageIndex =
                            (messageIndex + 1) % messages.length;

                        setTimeout(typeCommand, 350);
                        return;
                    }

                    setTimeout(typeCommand, 25);
                }
            }

            typeCommand();
        }
    }

    // 4. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll(
        ".section-title, .about-container, .skill-card, " +
        ".project-card, .education-card, .contact-container"
    );

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    } else {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element, index) => {
            element.classList.add("reveal-on-scroll");

            if (element.classList.contains("skill-card") ||
                element.classList.contains("project-card")) {
                element.style.transitionDelay =
                    (index % 4) * 70 + "ms";
            }

            observer.observe(element);
        });
    }

})();