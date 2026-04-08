
let andarAtual = 1;

window.atualizarTorre = function() {
    const container = document.getElementById('BATTLE-TOWER');
    container.innerHTML = ''; 
    
    for (let i = andarAtual + 3; i >= andarAtual; i--) {
        
        const divAndar = document.createElement('div');
        divAndar.className = 'Floors';
        divAndar.innerHTML = `<div class="BattlesTitles">FLOOR ${i}</div><div class="buttonSlot"></div>`;
        
        if (i === andarAtual) {
            const slot = divAndar.querySelector('.buttonSlot');
            const btn = document.createElement('button');
            btn.textContent = "Batalhar";
            btn.className = 'btnPBattle';
            
            btn.onclick = function() {
                mudarTela('combate-tela');
                console.log("Iniciando luta no andar " + andarAtual);
            };
            slot.appendChild(btn);
        }

        container.appendChild(divAndar);

        if (i > andarAtual) {
            const sep = document.createElement('div');
            sep.className = 'Separador';
            container.appendChild(sep);
        }
    }
}

window.vencerBatalha = function() {
    andarAtual++; // Sobe para o próximo nível
    atualizarTorre(); // Redesenha a torre com o novo andar no fundo
    mudarTela('battle-tela'); // Volta para a tela da torre
    
    if (andarAtual > 100) {
        alert("PARABÉNS! VOCÊ ZEROU A TORRE!");
        andarAtual = 1; // Reset ou fim de jogo
    }
}