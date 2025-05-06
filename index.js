const animatedText = document.getElementById('animated-text');

// Function to handle mouse movement
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Adjust the text's position based on mouse coordinates
    const offsetX = mouseX - animatedText.offsetLeft - animatedText.offsetWidth / 2;
    const offsetY = mouseY - animatedText.offsetTop - animatedText.offsetHeight / 2;

    // Apply translation for the text element
    animatedText.style.transform = `translate(${offsetX / 10}px, ${offsetY / 10}px)`;
});


/*light and dark mode logic*/
const toggleButton = document.getElementById('mode-toggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

