document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer-container');

    const footerComponent = `
        <footer>
            <div class="container">
                <p>&copy; 2023 空気濾過材 & エアフィルター加工販売</p>
            </div>
        </footer>
    `;

    footerContainer.innerHTML = footerComponent;
});
