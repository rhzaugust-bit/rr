// FloatingDock simples e estável
console.log('Iniciando dock estável...');

function criarDockEstavel() {
    // Remover dock anterior se existir
    const dockAnterior = document.getElementById('dock-estavel');
    if (dockAnterior) {
        dockAnterior.remove();
    }

    // Criar container do dock
    const dock = document.createElement('div');
    dock.id = 'dock-estavel';
    dock.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        gap: 8px;
        padding: 12px 20px;
        background: rgba(10, 10, 15, 0.85);
        backdrop-filter: blur(15px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        animation: entrarDock 0.6s ease-out;
    `;

    // Itens do dock
    const itens = [
        { nome: 'Início', icone: 'fa-home', link: '#home' },
        { nome: 'Sobre', icone: 'fa-user', link: '#about' },
        { nome: 'Habilidades', icone: 'fa-code', link: '#skills' },
        { nome: 'Projetos', icone: 'fa-rocket', link: '#projects' },
        { nome: 'Contato', icone: 'fa-envelope', link: '#contact' },
        { nome: 'GitHub', icone: 'fab fa-github', link: 'https://github.com/rhzaugust-bit', novo: true },
        { nome: 'WhatsApp', icone: 'fab fa-whatsapp', link: 'https://wa.me/5531999162893?text=Ol%C3%A1%20Rhian%20Reis!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.%20', novo: true }
    ];

    // Criar cada item
    itens.forEach((item, index) => {
        const botao = document.createElement('a');
        botao.href = item.link;
        if (item.novo) botao.target = '_blank';
        botao.title = item.nome; // Tooltip simples
        
        botao.style.cssText = `
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            text-decoration: none;
            transition: all 0.25s ease;
            position: relative;
            color: #999;
            font-size: 16px;
            cursor: pointer;
        `;

        // Efeito hover simples e estável
        botao.addEventListener('mouseenter', () => {
            botao.style.background = 'rgba(0, 255, 136, 0.12)';
            botao.style.borderColor = '#00ff88';
            botao.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
            botao.style.color = '#00ff88';
            botao.style.transform = 'scale(1.15) translateY(-3px)';
        });

        botao.addEventListener('mouseleave', () => {
            botao.style.background = 'rgba(255, 255, 255, 0.08)';
            botao.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            botao.style.boxShadow = 'none';
            botao.style.color = '#999';
            botao.style.transform = 'scale(1) translateY(0)';
        });

        // Efeito click
        botao.addEventListener('click', function(e) {
            if (item.link.startsWith('#')) {
                e.preventDefault();
                const alvo = document.querySelector(item.link);
                if (alvo) {
                    alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        // Ícone
        const icone = document.createElement('i');
        icone.className = item.icone;
        botao.appendChild(icone);

        dock.appendChild(botao);
    });

    // Adicionar CSS da animação
    const estilo = document.createElement('style');
    estilo.textContent = `
        @keyframes entrarDock {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        #dock-estavel a:hover {
            z-index: 10;
        }
    `;
    document.head.appendChild(estilo);

    // Adicionar dock à página
    document.body.appendChild(dock);
    console.log('Dock estável criado com sucesso!');
}

// Criar dock quando página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', criarDockEstavel);
} else {
    criarDockEstavel();
}

// Tentar novamente após 1 segundo
setTimeout(criarDockEstavel, 1000);
