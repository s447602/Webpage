function showTracklist(id) {
    const tracklist = document.getElementById(id);
    const allTracklists = document.querySelectorAll(".tracklist");

    if (tracklist.classList.contains("visible")) {
        tracklist.classList.remove("visible");
        setTimeout(() => tracklist.style.display = "none", 300);
    } else {
        allTracklists.forEach(t => {
            if (t.classList.contains("visible")) {
                t.classList.add("fade-out");
                setTimeout(() => {
                    t.classList.remove("visible", "fade-out");
                    t.style.display = "none";
                }, 300);
            }
        });

        setTimeout(() => {
            tracklist.style.display = "block";
            setTimeout(() => {
                tracklist.classList.add("visible");
                
                // Nur wenn nötig scrollen (sanft und minimal)
                const tracklistRect = tracklist.getBoundingClientRect();
                const isInView = (
                    tracklistRect.top >= 0 &&
                    tracklistRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                );

                if (!isInView) {
                    tracklist.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',    // Minimale Scrollbewegung
                        inline: 'start'
                    });
                }
            }, 10);
        }, 300);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('nav a, .cta-button').forEach((anchor) => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                console.log(`Smooth scrolling to: ${targetId}`);
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                console.warn(`Element mit ID ${targetId} nicht gefunden.`);
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.getElementById("about-section");

    function checkScroll() {
        const sectionPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2; // Wann der Effekt startet

        if (sectionPosition < screenPosition) {
            aboutSection.classList.add("visible");
        }
    }

    // Überprüfe das Scrollen
    window.addEventListener("scroll", checkScroll);
});
// Social-Media-Menü-Toggle
const socialMediaWrapper = document.querySelector('.social-media-wrapper');
const toggleButton = document.querySelector('.social-media-toggle');

// Klick-Event hinzufügen
toggleButton.addEventListener('click', (event) => {
    event.preventDefault(); // Standardaktion verhindern
    event.stopPropagation(); // Verhindert, dass andere Events ausgelöst werden
    socialMediaWrapper.classList.toggle('active'); // Menü ein- oder ausblenden
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".tracklist ul").forEach(tracklist => {
        const songs = tracklist.querySelectorAll("li");

        // Setze die Nummerierung für jeden Song korrekt
        songs.forEach((song, index) => {
            song.innerHTML = `<span class="song-number">${index + 1}.</span> ${song.innerHTML}`;
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".songs-container").forEach(container => {
        container.style.maxHeight = "600px"; // Maximale Höhe für den sichtbaren Bereich
        container.style.overflowY = "auto"; // Scrollbar aktivieren

        // Füge Transparenz-Effekt bei Scrollen hinzu
        container.addEventListener("scroll", function () {
            const cards = container.querySelectorAll(".song-card");
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                // Berechne die Sichtbarkeit des Songs
                const visibleHeight = Math.max(
                    0,
                    Math.min(rect.bottom, containerRect.bottom) -
                    Math.max(rect.top, containerRect.top)
                );
                const opacity = visibleHeight / rect.height;

                // Setze die Transparenz basierend auf der Sichtbarkeit
                card.style.opacity = opacity;
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const singlesArea = document.getElementById("singles-area");
    const guestArea = document.getElementById("guest-area");
    const singlesList = document.getElementById("singles-list");
    const guestList = document.getElementById("guest-list");

    // Funktion, um die Sichtbarkeit zu toggeln
    function toggleList(area, list, otherList) {
        if (list.classList.contains("visible")) {
            // Liste ausblenden
            list.classList.remove("visible");
        } else {
            // Liste einblenden und die andere Liste ausblenden
            list.classList.add("visible");
            otherList.classList.remove("visible");
        }
    }

    // Event-Listener für die linke Hälfte (Singles)
    singlesArea.addEventListener("click", function () {
        toggleList(singlesArea, singlesList, guestList);
    });

    // Event-Listener für die rechte Hälfte (Gastbeiträge)
    guestArea.addEventListener("click", function () {
        toggleList(guestArea, guestList, singlesList);
    });
});

// Funktion für smoothes scrollen
document.querySelectorAll('nav a, .cta-button').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Optionaler Offset für Header
                behavior: 'smooth'
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".song-card").forEach(card => {
        card.addEventListener("click", function () {
            this.classList.toggle("expanded");
        });
    });
});