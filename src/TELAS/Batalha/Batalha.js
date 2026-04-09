let PersonagensEmCampo = {
  Enemy1: { name: "Goblin", classe: null, level: null, HP: 17, HPMAX: 100, mana: null, manaMAX: 64 },
  Enemy2: { name: "Goblin2", classe: null, level: null, HP: 16, HPMAX: 100, mana: null, manaMAX: 45 },
  Enemy3: { name: "Goblin3", classe: null, level: null, HP: 15, HPMAX: 100, mana: null, manaMAX: 12 },
  Player: { name: "Herói", classe: "Cavaleiro", level: 5, HP: 120, HPMAX: 100, mana: 30, manaMAX: 100 },
  aliado1: { name: "Aliado1", classe: null, level: null, HP: 30, HPMAX: 100,  mana: null, manaMAX: 80 },
  aliado2: { name: "Aliado2", classe: null, level: null, HP: 20, HPMAX: 100, mana: null, manaMAX: 50 } 
};

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
                NomearMobs();
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

window.NomearMobs = function() {
  document.getElementById('nameEnemy1').innerText = PersonagensEmCampo.Enemy1.name;
  document.getElementById('nameEnemy2').innerText = PersonagensEmCampo.Enemy2.name;
  document.getElementById('nameEnemy3').innerText = PersonagensEmCampo.Enemy3.name;
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

window.InformacoesDoAlvo = function(Alvo) {
  const dados = PersonagensEmCampo[Alvo];
  
  if (dados) {
    document.getElementById('RowNome').innerText = dados.name;
    document.getElementById('NvlAlvo').innerText = "NVL: " + (dados.level || 0);
    document.getElementById('ClasseAlvo').innerText = "CLASSE: " + (dados.classe || "???");
    document.getElementById('HPBar').innerText = "HP: " + (dados.HP || 0) + " / " + dados.HPMAX; 
    document.getElementById('ManaBar').innerText = "MANA: " + (dados.mana || 0) + " / " + dados.manaMAX;
  } else {
    console.error("Personagem não encontrado: " + Alvo);
  }
}

window.BoxAtacarFechar = function(acao) {
  document.getElementById('BARName1').innerText = PersonagensEmCampo.Enemy1.name;
  document.getElementById('BARName2').innerText = PersonagensEmCampo.Enemy2.name;
  document.getElementById('BARName3').innerText = PersonagensEmCampo.Enemy3.name;
  
  document.getElementById('BARlife1').innerText = "HP: " + PersonagensEmCampo.Enemy1.HP + "/" + PersonagensEmCampo.Enemy1.HPMAX;
  document.getElementById('BARlife2').innerText = "HP: " + PersonagensEmCampo.Enemy2.HP + "/" + PersonagensEmCampo.Enemy2.HPMAX;
  document.getElementById('BARlife3').innerText = "HP: " + PersonagensEmCampo.Enemy3.HP + "/" + PersonagensEmCampo.Enemy3.HPMAX;
  
  if(acao === "atk") {
    document.getElementById('BoxATACAR').classList.remove('oculto');
    document.getElementById('BoxAcoesInfos').classList.add('oculto');
  }
  else if(acao === "fechar") {
    document.getElementById('BoxAcoesInfos').classList.remove('oculto');
    document.getElementById('BoxATACAR').classList.add('oculto');
  }
}