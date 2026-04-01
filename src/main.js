// CSS DAS TELAS

import './style.css'
import './TELAS/Shop/Shop.css';
import './TELAS/Forja/Forja.css';
import './TELAS/Taverna/Taverna.css';
import './TELAS/Guilda/Guilda.css';
import './TELAS/Batalha/Batalha.css';

// JS DAS TELAS
import './TELAS/Shop/Shop.js';
import './TELAS/Forja/Forja.js';
import './TELAS/Taverna/Taverna.js';
import './TELAS/Guilda/Guilda.js';
import './TELAS/Batalha/Batalha.js';

// HTML DAS TELAS
import shopHtml from './TELAS/Shop/Shop.html?raw';
import guildHtml from './TELAS/Guilda/Guilda.html?raw';
import tavernHtml from './TELAS/Taverna/Taverna.html?raw';
import forjaHtml from './TELAS/Forja/Forja.html?raw';
const corpoDoSite = document.body;
corpoDoSite.insertAdjacentHTML('beforeend', shopHtml);
corpoDoSite.insertAdjacentHTML('beforeend', guildHtml);
corpoDoSite.insertAdjacentHTML('beforeend', tavernHtml);
corpoDoSite.insertAdjacentHTML('beforeend', forjaHtml);

window.mudarTela = function (idParaMostrar) {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => tela.classList.add('oculto'));

    const proximaTela = document.getElementById(idParaMostrar);
    if (proximaTela) {
        proximaTela.classList.remove('oculto');
    } else {
        console.error("A tela " + idParaMostrar + " não foi encontrada!");
    }
}

let andarAtual = 1;

window.atualizarTorre = function() {
    const container = document.getElementById('BATTLE-TOWER');
    container.innerHTML = ''; // Limpa a torre para redesenhar

    // Vamos desenhar o andar atual e mais 3 para cima (total 4 visíveis)
    // Começamos do mais alto para o mais baixo por causa do justify-content: flex-end
    for (let i = andarAtual + 3; i >= andarAtual; i--) {
        
        // Criar a div do Andar
        const divAndar = document.createElement('div');
        divAndar.className = 'Floors';
        divAndar.innerHTML = `<div class="BattlesTitles">FLOOR ${i}</div><div class="buttonSlot"></div>`;
        
        // SE for o andar atual (o de baixo), colocamos o botão
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

        // Adicionar o separador entre os andares (exceto no último debaixo)
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