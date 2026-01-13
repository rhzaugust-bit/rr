// FloatingDock com animação de expansão igual ao macOS
console.log('Iniciando dock expansivo...');

function criarDockExpansivo() {
    // Verificar se dock já existe
    if (document.getElementById('dock-expansivo')) {
        console.log('Dock já existe!');
        return;
    }

    // Criar container do dock
    const dock = document.createElement('div');
    dock.id = 'dock-expansivo';
    dock.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        align-items: flex-end;
        gap: 5px;
        padding: 10px 20px;
        background: rgba(10, 10, 15, 0.8);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        animation: subirDock 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        height: 60px;
    `;

    // Itens do dock com ícones das páginas
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
        
        botao.style.cssText = `
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            color: #888;
            font-size: 18px;
            cursor: pointer;
            transform-origin: center bottom;
        `;

        // Variáveis para animação
        let isHovered = false;
        let mouseX = 0;

        // Efeito de expansão ao passar o mouse
        botao.addEventListener('mouseenter', (e) => {
            isHovered = true;
            botao.style.background = 'rgba(0, 255, 136, 0.15)';
            botao.style.borderColor = '#00ff88';
            botao.style.boxShadow = '0 0 25px rgba(0, 255, 136, 0.6)';
            botao.style.color = '#00ff88';
            botao.style.transform = 'scale(1.5) translateY(-10px)';
            botao.style.width = '60px';
            botao.style.height = '60px';
            botao.style.fontSize = '22px';
            
            // Efeito nos vizinhos
            const todosBotoes = dock.querySelectorAll('a');
            todosBotoes.forEach((outroBotao, outroIndex) => {
                const distancia = Math.abs(index - outroIndex);
                if (distancia === 1) {
                    outroBotao.style.transform = 'scale(1.2) translateY(-5px)';
                    outroBotao.style.width = '55px';
                    outroBotao.style.height = '55px';
                } else if (distancia === 2) {
                    outroBotao.style.transform = 'scale(1.1) translateY(-2px)';
                }
            });
        });

        botao.addEventListener('mouseleave', () => {
            isHovered = false;
            botao.style.background = 'rgba(255, 255, 255, 0.05)';
            botao.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            botao.style.boxShadow = 'none';
            botao.style.color = '#888';
            botao.style.transform = 'scale(1) translateY(0)';
            botao.style.width = '50px';
            botao.style.height = '50px';
            botao.style.fontSize = '18px';
            
            // Resetar vizinhos
            const todosBotoes = dock.querySelectorAll('a');
            todosBotoes.forEach((outroBotao) => {
                outroBotao.style.transform = 'scale(1) translateY(0)';
                outroBotao.style.width = '50px';
                outroBotao.style.height = '50px';
            });
        });

        // Efeito de movimento do mouse (magnético)
        dock.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            
            const rect = botao.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(e.clientX - centerX, 2) + 
                Math.pow(e.clientY - centerY, 2)
            );
            
            if (distance < 100) {
                const scale = 1 + (100 - distance) / 100;
                botao.style.transform = `scale(${scale * 1.5}) translateY(-10px)`;
            }
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
            bottom: 70px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(10, 10, 15, 0.95);
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid #00ff88;
            box-shadow: 0 5px 20px rgba(0, 255, 136, 0.3);
        `;

        botao.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.bottom = '75px';
            tooltip.style.transform = 'translateX(-50%) scale(1.1)';
        });

        botao.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.bottom = '70px';
            tooltip.style.transform = 'translateX(-50%) scale(1)';
        });

        botao.appendChild(tooltip);
        dock.appendChild(botao);
    });

    // Adicionar CSS das animações
    const estilo = document.createElement('style');
    estilo.textContent = `
        @keyframes subirDock {
            0% {
                opacity: 0;
                transform: translateX(-50%) translateY(100px) scale(0.8);
            }
            50% {
                transform: translateX(-50%) translateY(-10px) scale(1.05);
            }
            100% {
                opacity: 1;
                transform: translateX(-50%) translateY(0) scale(1);
            }
        }
        
        @keyframes brilhoVerde {
            0%, 100% {
                box-shadow: 0 0 20px rgba(0, 255, 136, 0.8);
            }
            50% {
                box-shadow: 0 0 40px rgba(0, 255, 136, 1);
            }
        }
    `;
    document.head.appendChild(estilo);

    // Adicionar dock à página
    document.body.appendChild(dock);
    console.log('Dock expansivo criado com sucesso!');

    // Efeito de brilho contínuo
    setInterval(() => {
        const botoes = dock.querySelectorAll('a');
        botoes.forEach(botao => {
            if (botao.matches(':hover')) {
                botao.style.animation = 'brilhoVerde 2s infinite';
            } else {
                botao.style.animation = 'none';
            }
        });
    }, 100);
}

// Criar dock quando página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', criarDockExpansivo);
} else {
    criarDockExpansivo();
}

// Tentar novamente após 2 segundos
setTimeout(criarDockExpansivo, 2000);
