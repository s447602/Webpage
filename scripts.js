function showTracklist(id) {
    const tracklist = document.getElementById(id);
    if (tracklist.style.display === 'block') {
        tracklist.style.display = 'none';
    } else {
        const allTracklists = document.querySelectorAll('.tracklist');
        allTracklists.forEach(t => t.style.display = 'none');
        tracklist.style.display = 'block';
    }
}
// Funktion zum Ein- und Ausklappen
document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target'); // Ziel-Liste abrufen
        const list = document.getElementById(targetId); // Liste mit der ID finden

        if (list) { // Sicherstellen, dass die Liste existiert
            if (list.classList.contains('hidden')) {
                list.classList.remove('hidden'); // Liste anzeigen
                this.textContent = `Liste ausblenden`; // Button-Text ändern
            } else {
                list.classList.add('hidden'); // Liste ausblenden
                this.textContent = `Liste anzeigen`; // Button-Text ändern
            }
        }
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