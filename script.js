let lastScrollPosition = 0;
const toggleHeaderButton = document.getElementById('toggle-header');
const header = document.querySelector('header');

toggleHeaderButton.addEventListener('click', () => {
    header.classList.toggle('hidden'); // Toggle the 'hidden' class on the header
    toggleHeaderButton.textContent = header.classList.contains('hidden') ? '▼' : '▲'; // Change arrow direction
});