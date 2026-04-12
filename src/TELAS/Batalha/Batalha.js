// ========================================================
// 1. VARIÁVEIS GLOBAIS E BANCOS DE DADOS
// ========================================================

window.andarAtual = 1;

window.PersonagensEmCampo = {
  Enemy1: { name: "Goblin", classe: "Guerreiro", level: 3, HP: 17, HPMAX: 24, mana: 0, manaMAX: 0, inciativa: 6, sprite: '/imagens/monstros/slime.png' },
  Enemy2: { name: "Goblin2", classe: "Guerreiro", level: 3, HP: 16, HPMAX: 24, mana: 0, manaMAX: 0, inciativa: 10, sprite: '/imagens/monstros/slime.png' },
  Enemy3: { name: "Goblin3", classe: "Guerreiro", level: 3, HP: 15, HPMAX: 24, mana: 0, manaMAX: 0, inciativa: 1, sprite: '/imagens/monstros/slime.png' },
  Player: { name: "Herói", classe: "Cavaleiro", level: 5, HP: 60, HPMAX: 60, mana: 30, manaMAX: 100, inciativa: 3, sprite: '/imagens/Sprites/archer_retrato.png' },
  Aliado1: { name: "Aliado1", classe: "Mago", level: 4, HP: 30, HPMAX: 30, mana: 20, manaMAX: 80, inciativa: 4, sprite: '/imagens/Sprites/cavaleiro_retrato.png' },
  Aliado2: { name: "Aliado2", classe: "Clérigo", level: 4, HP: 20, HPMAX: 20, mana: 10, manaMAX: 50, inciativa: 11, sprite: '/imagens/Sprites/wizard_retrato.png' } 
};

/* window.PersonagensEmCampo.Player.sprite = BancoDeClasses.Arqueiro.sprite; */

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
                mudarTela('combate-tela');
                window.GerarMonstros(); 
                window.NomearMobs();
                window.InformacoesDoAlvo('Player');
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
            ouro: dadosDoMonstro.ouro,
            sprite: dadosDoMonstro.sprite
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
    document.getElementById('IconAlvo').style.backgroundImage = `url('${dados.sprite}')`;
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
    document.getElementById('ImgP').style.backgroundImage = `url('${dados.sprite}')`;
  } else {
    console.error("Personagem não encontrado: " + Alvo);
  }
};

window.BoxAtacarFechar = function(acao) {
  document.getElementById('BARName1').innerText = window.PersonagensEmCampo.Enemy1.name;
  document.getElementById('BARName2').innerText = window.PersonagensEmCampo.Enemy2.name;
  document.getElementById('BARName3').innerText = window.PersonagensEmCampo.Enemy3.name;
  
  document.getElementById('iconInimigo1').style.backgroundImage = `url('${window.PersonagensEmCampo.Enemy1.sprite}')`;
  document.getElementById('iconInimigo2').style.backgroundImage = `url('${window.PersonagensEmCampo.Enemy2.sprite}')`;
  document.getElementById('iconInimigo3').style.backgroundImage = `url('${window.PersonagensEmCampo.Enemy3.sprite}')`;
  
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

// =========================================================
// 3. SISTEMA DE COMBATE (ATACAR, DEFENDER, ITEM, TURNOS)
// ========================================================
window.QuemEaVez = "Player";

window.TurnoAtual = function() {
  
  document.querySelectorAll('.Aliados, .Enemies').forEach(personagem => {
    personagem.classList.remove('AlvoTurno');
  });
  
  if (QuemEaVez === "Player") { QuemEaVez = "Aliado1"; }
  else if (QuemEaVez === "Aliado1") { QuemEaVez = "Aliado2"; }
  else if (QuemEaVez === "Aliado2") { QuemEaVez = "Enemy1"; }
  else if (QuemEaVez === "Enemy1") { QuemEaVez = "Enemy2"; }
  else if (QuemEaVez === "Enemy2") { QuemEaVez = "Enemy3"; }
  else if (QuemEaVez === "Enemy3") { QuemEaVez = "Player"; }

  InformacoesDoAlvo(QuemEaVez); 
  document.getElementById(QuemEaVez).classList.add('AlvoTurno');
}

window.atacarVisual = function(idAtacante) {
  
  idAtacante = QuemEaVez;

  const personagem = document.getElementById(idAtacante);

  personagem.classList.remove('AlvoTurno');

  let deslocamentoX = 40; 
  
  if (idAtacante.includes("Enemy")) {
    deslocamentoX = -80;
  }

  personagem.style.transition = "0.3s ease-in-out"; 
  personagem.style.transform = `translate(${deslocamentoX}px, 0px)`;

  setTimeout(function() {
    personagem.style.transform = "translate(0, 0)";
    
    TurnoAtual();
  }, 300);
}

window.EfeitoAtacar = function(alvoDoEfeito) {
  const efeitoDiv = document.getElementById('EfeitoDeAtacar');
  
  efeitoDiv.classList.remove('atacarInimigo1', 'atacarInimigo2', 'atacarInimigo3');
  
  efeitoDiv.classList.remove('oculto');
  
  if(alvoDoEfeito === "Enemy1") {
    efeitoDiv.classList.add('atacarInimigo1');
  }
  else if(alvoDoEfeito === "Enemy2") {
    efeitoDiv.classList.add('atacarInimigo2');
  }
  else if(alvoDoEfeito === "Enemy3") {
    efeitoDiv.classList.add('atacarInimigo3');
  }
  
  setTimeout(() => {
    efeitoDiv.classList.add('oculto');
  }, 400); // <-- Ajuste esse número para ser igual ao tempo do seu @keyframes no CSS!
}

window.ExecutarAtaqueDoPlayer = function(idAlvoEscolhido) {

  window.BoxAtacarFechar('fechar');

  window.atacarVisual('Player');

  setTimeout(() => {
    window.EfeitoAtacar(idAlvoEscolhido);
    
    // (Futuramente, o cálculo de tirar vida vai aqui também!)
    
  }, 150);
}
    
/* window.atacarInimigo = function(idAtacante, idAlvo) {
  const atacante = document.getElementById(idAtacante);
  const alvo = document.getElementById(idAlvo);

  // 1. Calcula a distância (O "Jeito Ninja")
  const posAtacante = atacante.getBoundingClientRect();
  const posAlvo = alvo.getBoundingClientRect();
  
  // Ajuste de -60px para ele parar NA FRENTE do alvo e não em cima
  const distX = (posAlvo.left - posAtacante.left) - 60;
  const distY = posAlvo.top - posAtacante.top;

  // 2. Executa o Avanço
  atacante.style.zIndex = "100";
  atacante.style.transition = "all 0.3s ease-in";
  atacante.style.transform = `translate(${distX}px, ${distY}px)`;

  // 3. O Momento do Impacto (Meio da animação)
  setTimeout(() => {
     console.log("POW! Dano causado!");
     // Aqui você chamaria sua função de tirar vida:
     // window.causarDano(idAlvo, 10); 
  }, 300);

  // 4. A Volta
  setTimeout(() => {
    atacante.style.transition = "all 0.5s ease-out"; // Volta um pouco mais devagar
    atacante.style.transform = "translate(0, 0)";
    
    // Reset do Z-index após a volta
    setTimeout(() => { atacante.style.zIndex = ""; }, 500);
  }, 450);
}
*/