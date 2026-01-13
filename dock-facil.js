// Versão super simples do FloatingDock
console.log('Iniciando dock simples...');

// Criar dock direto no HTML
function criarDockSimples() {
    // Verificar se dock já existe
    if (document.getElementById('dock-simples')) {
        console.log('Dock já existe!');
        return;
    }

    // Criar container do dock
    const dock = document.createElement('div');
    dock.id = 'dock-simples';
    dock.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        gap: 15px;
        padding: 15px 20px;
        background: rgba(10, 10, 15, 0.9);
        backdrop-filter: blur(20px);
        border-radius: 25px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        animation: subir 0.5s ease;
    `;

    // Itens do dock
    const itens = [
        { nome: 'Início', icone: 'fa-home', link: '#home' },
        { nome: 'Sobre', icone: 'fa-user', link: '#about' },
        { nome: 'Habilidades', icone: 'fa-code', link: '#skills' },
        { nome: 'Projetos', icone: 'fa-rocket', link: '#projects' },
        { nome: 'GitHub', icone: 'fab fa-github', link: 'https://github.com/rhzaugust-bit', novo: true },
        { nome: 'WhatsApp', icone: 'fab fa-whatsapp', link: 'https://wa.me/5531999162893?text=Ol%C3%A1%20Rhian%20Reis!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.%20', novo: true },
        { nome: 'Email', icone: 'fa-envelope', link: 'javascript:void(0)', click: 'copiarEmail()' }
    ];

    // Criar cada item
    itens.forEach(item => {
        const botao = document.createElement('a');
        botao.href = item.link;
        if (item.novo) botao.target = '_blank';
        if (item.click) botao.setAttribute('onclick', item.click);
        
        botao.style.cssText = `
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-decoration: none;
            transition: all 0.3s ease;
            position: relative;
            color: #888;
            font-size: 20px;
        `;

        // Efeito hover
        botao.addEventListener('mouseenter', () => {
            botao.style.background = 'rgba(0, 255, 136, 0.1)';
            botao.style.borderColor = '#00ff88';
            botao.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.8)';
            botao.style.color = '#00ff88';
            botao.style.transform = 'scale(1.1)';
        });

        botao.addEventListener('mouseleave', () => {
            botao.style.background = 'rgba(255, 255, 255, 0.05)';
            botao.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            botao.style.boxShadow = 'none';
            botao.style.color = '#888';
            botao.style.transform = 'scale(1)';
        });

        // Ícone
        const icone = document.createElement('i');
        icone.className = item.icone;
        botao.appendChild(icone);

        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = item.nome;
        tooltip.style.cssText = `
            position: absolute;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(10, 10, 15, 0.95);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            border: 1px solid #00ff88;
        `;

        botao.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.bottom = '65px';
        });

        botao.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.bottom = '60px';
        });

        botao.appendChild(tooltip);
        dock.appendChild(botao);
    });

    // Adicionar CSS da animação
    const estilo = document.createElement('style');
    estilo.textContent = `
        @keyframes subir {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(100px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(estilo);

    // Adicionar dock à página
    document.body.appendChild(dock);
    console.log('Dock criado com sucesso!');
}

// Criar dock quando página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', criarDockSimples);
} else {
    criarDockSimples();
}

// Tentar novamente após 2 segundos
setTimeout(criarDockSimples, 2000);
