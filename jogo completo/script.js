document.addEventListener('DOMContentLoaded', function() {

    // --- PARTE 1: LÓGICA DO MODO ESCURO ---
    const themeToggle = document.getElementById('checkbox');

    // Função para aplicar o tema com base na preferência salva
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggle) themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.checked = false;
        }
    }

    // Verifica se já existe um tema salvo no localStorage ao carregar a página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // Adiciona o 'ouvinte' para o clique no interruptor de tema (se ele existir na página)
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('theme', 'dark');
                applyTheme('dark');
            } else {
                localStorage.setItem('theme', 'light');
                applyTheme('light');
            }
        });
    }

    // --- PARTE 2: LÓGICA DE VIRAR A CARTA ---
    const flipButtons = document.querySelectorAll('.toggle-button');
    flipButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            if (card) {
                card.classList.toggle('is-flipped');
            }
        });
    });
// --- NOVA LÓGICA DO SISTEMA DE DICAS (COM ANIMAÇÃO) ---
const hintButtons = document.querySelectorAll('.hint-button');
hintButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const cardFront = this.closest('.card-front');
        if (!cardFront) return;

        // Encontra a próxima dica que ainda não tem a classe 'visible'
        const nextHint = cardFront.querySelector('.hint:not(.visible)');

        if (nextHint) {
            // Adiciona a classe para torná-la visível com animação CSS
            nextHint.classList.add('visible'); // <--- O jeito novo e melhor!

            let hintsLeft = parseInt(this.dataset.hintsLeft) - 1;
            this.dataset.hintsLeft = hintsLeft;
            this.textContent = `Pedir Dica (${hintsLeft})`;

            if (hintsLeft <= 0) {
                this.disabled = true;
            }
        }
    });
});
});