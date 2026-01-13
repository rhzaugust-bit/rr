// FloatingDock com animação descendo e ícones personalizados
console.log('Iniciando dock com ícones...');

function criarDockComIcones() {
    // Remover dock anterior se existir
    const dockAnterior = document.getElementById('dock-com-icones');
    if (dockAnterior) {
        dockAnterior.remove();
    }

    // Criar container do dock (inicia fora da tela)
    const dock = document.createElement('div');
    dock.id = 'dock-com-icones';
    dock.style.cssText = `
        position: fixed;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        gap: 10px;
        padding: 15px 25px;
        background: rgba(10, 10, 15, 0.9);
        backdrop-filter: blur(20px);
        border-radius: 25px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    // Itens do dock com mesmas cores do Sobre
    const itens = [
        { 
            nome: 'Início', 
            tipo: 'icone', 
            icone: 'fa-home', 
            link: '#home',
            cor: '#00ff88'
        },
        { 
            nome: 'Sobre', 
            tipo: 'icone', 
            icone: 'fa-user', 
            link: '#about',
            cor: '#00ffff'
        },
        { 
            nome: 'Habilidades', 
            tipo: 'icone', 
            icone: 'fa-code', 
            link: '#skills',
            cor: '#ff00ff'
        },
        { 
            nome: 'Projetos', 
            tipo: 'icone', 
            icone: 'fa-rocket', 
            link: '#projects',
            cor: '#ffaa00'
        },
        { 
            nome: 'Contato', 
            tipo: 'icone', 
            icone: 'fa-envelope', 
            link: '#contact',
            cor: '#ff0066'
        },
        { 
            nome: 'GitHub', 
            tipo: 'icone', 
            icone: 'fab fa-github', 
            link: 'https://github.com/rhzaugust-bit', 
            novo: true,
            cor: '#ffffff'
        },
        { 
            nome: 'WhatsApp', 
            tipo: 'icone', 
            icone: 'fab fa-whatsapp', 
            link: 'https://wa.me/5531999162893?text=Ol%C3%A1%20Rhian%20Reis!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.%20', 
            novo: true,
            cor: '#25d366'
        },
        { 
            nome: 'Gmail', 
            tipo: 'icone', 
            icone: 'fab fa-google', 
            link: 'javascript:void(0)', 
            click: 'copiarEmail()',
            cor: '#ea4335'
        }
    ];

    // Criar cada item
    itens.forEach((item, index) => {
        const botao = document.createElement('a');
        botao.href = item.link;
        if (item.novo) botao.target = '_blank';
        if (item.click) botao.setAttribute('onclick', item.click);
        botao.title = item.nome;
        
        botao.style.cssText = `
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.08);
            border: 2px solid rgba(255, 255, 255, 0.15);
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transform: scale(1) translateY(0);
        `;

        // Adicionar conteúdo (só ícones)
        const icone = document.createElement('i');
        icone.className = item.icone;
        icone.style.cssText = `
            font-size: 20px;
            color: ${item.cor};
            transition: all 0.3s ease;
            filter: drop-shadow(0 0 10px ${item.cor}40);
        `;
        botao.appendChild(icone);

        // Efeito hover expansivo
        botao.addEventListener('mouseenter', () => {
            botao.style.background = `${item.cor}20`;
            botao.style.borderColor = item.cor;
            botao.style.boxShadow = `0 0 25px ${item.cor}60, 0 0 50px ${item.cor}30`;
            botao.style.transform = 'scale(1.3) translateY(-8px)';
            botao.style.width = '60px';
            botao.style.height = '60px';
            
            // Efeito nos vizinhos
            const todosBotoes = dock.querySelectorAll('a');
            todosBotoes.forEach((outroBotao, outroIndex) => {
                const distancia = Math.abs(index - outroIndex);
                if (distancia === 1) {
                    outroBotao.style.transform = 'scale(1.15) translateY(-4px)';
                    outroBotao.style.width = '55px';
                    outroBotao.style.height = '55px';
                } else if (distancia === 2) {
                    outroBotao.style.transform = 'scale(1.08) translateY(-2px)';
                }
            });

            // Brilho no ícone
            const icone = botao.querySelector('i');
            if (icone) {
                icone.style.filter = `drop-shadow(0 0 20px ${item.cor})`;
                icone.style.transform = 'scale(1.2)';
            }
        });

        botao.addEventListener('mouseleave', () => {
            botao.style.background = 'rgba(255, 255, 255, 0.08)';
            botao.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            botao.style.boxShadow = 'none';
            botao.style.transform = 'scale(1) translateY(0)';
            botao.style.width = '50px';
            botao.style.height = '50px';
            
            // Resetar vizinhos
            const todosBotoes = dock.querySelectorAll('a');
            todosBotoes.forEach((outroBotao) => {
                outroBotao.style.transform = 'scale(1) translateY(0)';
                outroBotao.style.width = '50px';
                outroBotao.style.height = '50px';
            });

            // Resetar ícone
            const icone = botao.querySelector('i');
            if (icone) {
                icone.style.filter = `drop-shadow(0 0 10px ${item.cor}40)`;
                icone.style.transform = 'scale(1)';
            }
        });

        // Efeito click
        botao.addEventListener('click', function(e) {
            if (item.link.startsWith('#')) {
                e.preventDefault();
                const alvo = document.querySelector(item.link);
                if (alvo) {
                    // Animação de descida ao clicar
                    dock.style.bottom = '-100px';
                    dock.style.opacity = '0';
                    
                    setTimeout(() => {
                        alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        
                        // Fazer dock subir novamente após scroll
                        setTimeout(() => {
                            dock.style.bottom = '30px';
                            dock.style.opacity = '1';
                        }, 800);
                    }, 300);
                }
            }
        });

        dock.appendChild(botao);
    });

    // Adicionar CSS das animações
    const estilo = document.createElement('style');
    estilo.textContent = `
        @keyframes descerDock {
            0% {
                bottom: -100px;
                opacity: 0;
                transform: translateX(-50%) scale(0.8);
            }
            60% {
                bottom: 40px;
                opacity: 1;
                transform: translateX(-50%) scale(1.05);
            }
            100% {
                bottom: 30px;
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }
        }
        
        #dock-com-icones {
            animation: descerDock 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards;
        }
        
        #dock-com-icones a {
            z-index: 1;
        }
        
        #dock-com-icones a:hover {
            z-index: 10;
        }
    `;
    document.head.appendChild(estilo);

    // Adicionar dock à página
    document.body.appendChild(dock);
    console.log('Dock com ícones criado com sucesso!');

    // Animação de entrada após carregar
    setTimeout(() => {
        dock.style.bottom = '30px';
        dock.style.opacity = '1';
    }, 500);
}

// Criar dock quando página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', criarDockComIcones);
} else {
    criarDockComIcones();
}

// Tentar novamente após 1 segundo
setTimeout(criarDockComIcones, 1000);
