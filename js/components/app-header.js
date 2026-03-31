class AppHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="top-header">
                <div class="search-bar">
                    <span class="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </span>
                    <input type="text" placeholder="Search... (Try 'Monitors')" oninput="this.nextElementSibling.style.display = this.value ? 'flex' : 'none'">
                    <span class="clear-btn" onclick="this.previousElementSibling.value=''; this.style.display='none'; this.previousElementSibling.focus()">✕</span>
                </div>
                <div class="header-actions">
                    <button class="btn-danger" style="background:transparent; color:#b91c1c; border:1px solid #b91c1c; padding:0.4rem 0.8rem; font-size:0.75rem" onclick="Store.logout(); window.location.href='login.html'">Logout</button>
                    <button class="icon-btn" title="Notifications">🔔</button>
                    <button class="icon-btn" title="Settings">⚙️</button>
                </div>
            </header>
        `;
    }
}
customElements.define('app-header', AppHeader);
