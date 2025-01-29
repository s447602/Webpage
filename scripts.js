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
