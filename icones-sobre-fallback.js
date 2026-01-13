// Sistema de fallback para ícones da seção Sobre
console.log('Iniciando sistema de fallback para ícones do Sobre...');

function verificarIconesSobre() {
    const iconFloats = document.querySelectorAll('.icon-float');
    
    iconFloats.forEach((iconFloat, index) => {
        const iconeFA = iconFloat.querySelector('i');
        const emoji = iconFloat.querySelector('span');
        
        // Verificar se FontAwesome carregou após um tempo
        setTimeout(() => {
            if (iconeFA) {
                const computedStyle = window.getComputedStyle(iconeFA);
                const fontFamily = computedStyle.fontFamily;
                
                // Se FontAwesome não carregou, mostrar emoji
                if (!fontFamily.includes('Font Awesome') && !fontFamily.includes('fa')) {
                    iconeFA.style.display = 'none';
                    emoji.style.display = 'block';
                    console.log('FontAwesome não carregou no Sobre, usando emoji para ícone', index + 1);
                } else {
                    emoji.style.display = 'none';
                    iconeFA.style.display = 'block';
                    console.log('FontAwesome carregou no Sobre para ícone', index + 1);
                }
            }
        }, 200);
    });
}

// Iniciar quando página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verificarIconesSobre);
} else {
    verificarIconesSobre();
}

// Verificar novamente após 1 segundo
setTimeout(verificarIconesSobre, 1000);
