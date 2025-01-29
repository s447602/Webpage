function showTracklist(id) {
    const tracklist = document.getElementById(id);
    const allTracklists = document.querySelectorAll(".tracklist");

    if (tracklist.classList.contains("visible")) {
        tracklist.classList.remove("visible");
        setTimeout(() => tracklist.style.display = "none", 300);
    } else {
        allTracklists.forEach(t => {
            if (t.classList.contains("visible")) {
                t.classList.add("fade-out"); // Sanftes Ausblenden
                setTimeout(() => {
                    t.classList.remove("visible", "fade-out");
                    t.style.display = "none";
                }, 300);
            }
        });

        setTimeout(() => {
            tracklist.style.display = "block";
            setTimeout(() => tracklist.classList.add("visible"), 10);
        }, 300); // Kurze Verzögerung für nahtlosen Übergang
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
// Funktion zum Filtern der Alben
document.querySelectorAll(".tour-filter button").forEach(button => {
    button.addEventListener("click", function () {
        const year = this.getAttribute("data-year");
        document.querySelectorAll(".tour-card").forEach(card => {
            if (year === "all" || card.querySelector(".tour-year").textContent === year) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const tourCards = document.querySelectorAll(".tour-card");

    tourCards.forEach(card => {
        card.addEventListener("click", function () {
            this.classList.toggle("expanded");
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Initialisiere die Karte
    var map = L.map('map').setView([51.1657, 10.4515], 6);

    // OpenStreetMap als Kartenquelle laden
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Tour-Daten mit Städten, Koordinaten und Jahren
    var tourDates = [
        { city: "München", date: "5. Oktober 2010", year: "2010", coords: [48.1351, 11.5820] },
        { city: "Köln", date: "12. Oktober 2010", year: "2010", coords: [50.9375, 6.9603] },
        { city: "Frankfurt", date: "15. März 2015", year: "2015", coords: [50.1109, 8.6821] },
        { city: "Stuttgart", date: "20. März 2015", year: "2015", coords: [48.7758, 9.1829] },
        { city: "Leonberg", date: "10. Dezember 2022", year: "2022", coords: [48.7990, 9.0130] }
    ];

    var markers = [];

    // Funktion zum Anzeigen von Markern basierend auf dem Jahr
    function updateMarkers(selectedYear) {
        // Entferne alle bestehenden Marker
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        // Neue Marker hinzufügen, die dem gewählten Jahr entsprechen
        tourDates.forEach(tour => {
            if (selectedYear === "all" || tour.year === selectedYear) {
                let marker = L.marker(tour.coords)
                    .addTo(map)
                    .bindPopup(`<b>${tour.city}</b><br>${tour.date}`);
                markers.push(marker);
            }
        });
    }

    // Initial: Alle Marker anzeigen
    updateMarkers("all");

    // Event-Listener für die Filter-Buttons
    document.querySelectorAll(".tour-filter button").forEach(button => {
        button.addEventListener("click", function () {
            let selectedYear = this.getAttribute("data-year");
            updateMarkers(selectedYear);
        });
    });
});