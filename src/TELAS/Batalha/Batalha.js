// ========================================================
// 1. VARIÁVEIS GLOBAIS E BANCOS DE DADOS
// ========================================================

window.andarAtual = 1;
window.turnoPersonagem = "player";

window.PersonagensEmCampo = {
  Enemy1: { name: "Goblin", classe: "Guerreiro", level: 3, HP: 17, HPMAX: 24, mana: 0, manaMAX: 0 },
  Enemy2: { name: "Goblin2", classe: "Guerreiro", level: 3, HP: 16, HPMAX: 24, mana: 0, manaMAX: 0 },
  Enemy3: { name: "Goblin3", classe: "Guerreiro", level: 3, HP: 15, HPMAX: 24, mana: 0, manaMAX: 0 },
  Player: { name: "Herói", classe: "Cavaleiro", level: 5, HP: 120, HPMAX: 120, mana: 30, manaMAX: 100 },
  aliado1: { name: "Aliado1", classe: "Mago", level: 4, HP: 30, HPMAX: 80, mana: 20, manaMAX: 80 },
  aliado2: { name: "Aliado2", classe: "Clérigo", level: 4, HP: 20, HPMAX: 70, mana: 10, manaMAX: 50 } 
};

window.SpritesMonstros = {
  "Slime": { nome: "Slime", classe: "Geleia", level: 1, vida: 18, dano: 5, XP: 4, ouro: 5, sprite: '/imagens/monstros/slime.png' },
  "Aranha": { nome: "Aranha", classe: "Fera", level: 2, vida: 30, dano: 8, XP: 12, ouro: 10, sprite: '/imagens/monstros/spider.png' },
  "Goblin": { nome: "Goblin", classe: "Guerreiro", level: 3, vida: 24, dano: 4, XP: 20, ouro: 15, sprite: '/imagens/monstros/goblinE.png' }
  // Adicione os monstros dos andares 11+ aqui futuramente
};

window.TabelaDeEncontros = {
    andares_1_ao_9: ["Slime", "Aranha", "Goblin"],
    // andares_11_ao_19: ["Orc", "Esqueleto", "Zumbi"] // Exemplo pro futuro
};


// =========================================================
// 2. SISTEMA DA TORRE
// =========================================================

window.atualizarTorre = function() {
    const container = document.getElementById('BATTLE-TOWER');
    container.innerHTML = ''; 
    
    for (let i = window.andarAtual + 3; i >= window.andarAtual; i--) {
        const divAndar = document.createElement('div');
        divAndar.className = 'Floors';
        divAndar.innerHTML = `<div class="BattlesTitles">FLOOR ${i}</div><div class="buttonSlot"></div>`;
        
        if (i === window.andarAtual) {
            const slot = divAndar.querySelector('.buttonSlot');
            const btn = document.createElement('button');
            btn.textContent = "Batalhar";
            btn.className = 'btnPBattle';
            
            btn.onclick = function() {
                mudarTela('combate-tela'); // Supondo que você tem essa função em outro lugar
                window.GerarMonstros(); // Sorteia os monstros
                window.NomearMobs();    // Escreve os nomes deles
                console.log("Iniciando luta no andar " + window.andarAtual);
            };
            slot.appendChild(btn);
        }

        container.appendChild(divAndar);

        if (i > window.andarAtual) {
            const sep = document.createElement('div');
            sep.className = 'Separador';
            container.appendChild(sep);
        }
    }
};

window.vencerBatalha = function() {
    window.andarAtual++; // Sobe para o próximo nível
    window.atualizarTorre(); // Redesenha a torre com o novo andar no fundo
    mudarTela('battle-tela'); // Volta para a tela da torre
    
    if (window.andarAtual > 100) {
        alert("PARABÉNS! VOCÊ ZEROU A TORRE!");
        window.andarAtual = 1; // Reset ou fim de jogo
    }
};


// =========================================================
// 3. SISTEMA DE SPAWN E MONSTROS
// ========================================================

window.GerarMonstros = function() {
    let monstrosPossiveis = [];
    
    // Define os inimigos dependendo do andar
    if (window.andarAtual >= 1 && window.andarAtual <= 9) {
        monstrosPossiveis = window.TabelaDeEncontros.andares_1_ao_9;
    } 

    const slotsInimigos = ['Enemy1', 'Enemy2', 'Enemy3'];

    slotsInimigos.forEach((nomeDoSlot, index) => {
        // Sorteia o monstro
        const randomIndex = Math.floor(Math.random() * monstrosPossiveis.length);
        const nomeMonstroSorteado = monstrosPossiveis[randomIndex]; 
        const dadosDoMonstro = window.SpritesMonstros[nomeMonstroSorteado];

        // Atualiza a Imagem e o Nome no HTML
        const idDaImagem = 'SpriteEnemy' + (index + 1); 
        const idDoNome = 'nameEnemy' + (index + 1);
        
        document.getElementById(idDaImagem).style.backgroundImage = `url('${dadosDoMonstro.sprite}')`;
        document.getElementById(idDoNome).innerText = dadosDoMonstro.nome;

        // Padronizado para usar HP e HPMAX como no resto do seu código
        window.PersonagensEmCampo[nomeDoSlot] = {
            name: dadosDoMonstro.nome,
            classe: dadosDoMonstro.classe,
            level: dadosDoMonstro.level,
            HPMAX: dadosDoMonstro.vida,
            HP: dadosDoMonstro.vida, 
            mana: 0,
            manaMAX: 0,
            xp: dadosDoMonstro.XP,
            ouro: dadosDoMonstro.ouro
        };
    });
};

window.NomearMobs = function() {
  document.getElementById('nameEnemy1').innerText = window.PersonagensEmCampo.Enemy1.name;
  document.getElementById('nameEnemy2').innerText = window.PersonagensEmCampo.Enemy2.name;
  document.getElementById('nameEnemy3').innerText = window.PersonagensEmCampo.Enemy3.name;
};


// =========================================================
// 4. INTERFACE E INFORMAÇÕES DA BATALHA
// =========================================================

window.InformacoesDoAlvo = function(Alvo) {
  const dados = window.PersonagensEmCampo[Alvo];
  
  if (dados) {
    document.getElementById('RowNome').innerText = dados.name;
    document.getElementById('NvlAlvo').innerText = "NVL: " + (dados.level || 0);
    document.getElementById('ClasseAlvo').innerText = "CLASSE: " + (dados.classe || "???");
    document.getElementById('HPBar').innerText = "HP: " + (dados.HP || 0) + " / " + dados.HPMAX; 
    document.getElementById('ManaBar').innerText = "MANA: " + (dados.mana || 0) + " / " + dados.manaMAX;
  } else {
    console.error("Personagem não encontrado: " + Alvo);
  }
};

window.InformacoesDoAlvo2 = function(Alvo) {
  const dados = window.PersonagensEmCampo[Alvo];
  
  if (dados) {
    document.getElementById('nomeP').innerText = dados.name;
    document.getElementById('HPText').innerText = "HP: " + (dados.HP || 0) + " / " + dados.HPMAX; 
    document.getElementById('manaText').innerText = "MANA: " + (dados.mana || 0) + " / " + dados.manaMAX;
  } else {
    console.error("Personagem não encontrado: " + Alvo);
  }
};

window.BoxAtacarFechar = function(acao) {
  document.getElementById('BARName1').innerText = window.PersonagensEmCampo.Enemy1.name;
  document.getElementById('BARName2').innerText = window.PersonagensEmCampo.Enemy2.name;
  document.getElementById('BARName3').innerText = window.PersonagensEmCampo.Enemy3.name;
  
  document.getElementById('BARlife1').innerText = "HP: " + window.PersonagensEmCampo.Enemy1.HP + " / " + window.PersonagensEmCampo.Enemy1.HPMAX;
  document.getElementById('BARlife2').innerText = "HP: " + window.PersonagensEmCampo.Enemy2.HP + " / " + window.PersonagensEmCampo.Enemy2.HPMAX;
  document.getElementById('BARlife3').innerText = "HP: " + window.PersonagensEmCampo.Enemy3.HP + " / " + window.PersonagensEmCampo.Enemy3.HPMAX;
  
  if(acao === "atk") {
    document.getElementById('BoxATACAR').classList.remove('oculto');
    document.getElementById('BoxAcoesInfos').classList.add('oculto');
  }
  else if(acao === "fechar") {
    document.getElementById('BoxAcoesInfos').classList.remove('oculto');
    document.getElementById('BoxATACAR').classList.add('oculto');
  }
};

window.FecharInfo = function(abrirOrFechar) {
  if (abrirOrFechar === "fechar") {
    document.getElementById('PersonagensInfosPopUp').classList.add('oculto');
  }
  else if (abrirOrFechar === "abrir") {
    document.getElementById('PersonagensInfosPopUp').classList.remove('oculto');
  }
};