// ========================================================
// 1. VARIÁVEIS GLOBAIS E BANCOS DE DADOS
// ========================================================

window.andarAtual = 1;

window.PersonagensEmCampo = {
  Enemy1: { name: "Goblin", classe: "Guerreiro", level: 3, HP: 17, HPMAX: 24, mana: 0, manaMAX: 0, dano: 20, inciativa: 6, sprite: '/imagens/monstros/slime.png' },
  Enemy2: { name: "Goblin2", classe: "Guerreiro", level: 3, HP: 16, HPMAX: 24, mana: 0, manaMAX: 0, dano: 15, inciativa: 10, sprite: '/imagens/monstros/slime.png' },
  Enemy3: { name: "Goblin3", classe: "Guerreiro", level: 3, HP: 15, HPMAX: 24, mana: 0, manaMAX: 0, dano: 9, inciativa: 1, sprite: '/imagens/monstros/slime.png' },
  Player: { name: "Herói", classe: "Cavaleiro", level: 5, HP: 60, HPMAX: 60, mana: 30, manaMAX: 30, inciativa: 3, sprite: '/imagens/Sprites/cavaleiro_retrato.png' },
  Aliado1: { name: "Aliado1", classe: "Mago", level: 4, HP: 30, HPMAX: 30, mana: 60, manaMAX: 60, inciativa: 4, sprite: '/imagens/Sprites/wizard_retrato.png' },
  Aliado2: { name: "Aliado2", classe: "Clérigo", level: 4, HP: 20, HPMAX: 20, mana: 40, manaMAX: 40, inciativa: 11, sprite: '/imagens/Sprites/archer_retrato.png' } 
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
                // mudarTela('combate-tela');
                mudarTela('salas-tela');
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
        const randomIndex = Math.floor(Math.random() * monstrosPossiveis.length);
        const nomeMonstroSorteado = monstrosPossiveis[randomIndex]; 
        const dadosDoMonstro = window.SpritesMonstros[nomeMonstroSorteado];

        const idDaImagem = 'SpriteEnemy' + (index + 1); 
        const idDoNome = 'nameEnemy' + (index + 1);
        
        document.getElementById(idDaImagem).style.backgroundImage = `url('${dadosDoMonstro.sprite}')`;
        document.getElementById(idDoNome).innerText = dadosDoMonstro.nome;

        window.PersonagensEmCampo[nomeDoSlot] = {
          name: dadosDoMonstro.nome,
          classe: dadosDoMonstro.classe,
          level: dadosDoMonstro.level,
          HPMAX: dadosDoMonstro.vida,
          HP: dadosDoMonstro.vida, 
          mana: 0,
          manaMAX: 0,
          dano: dadosDoMonstro.dano, 
          inciativa: 5,
          xp: dadosDoMonstro.XP,
          ouro: dadosDoMonstro.ouro,
          sprite: dadosDoMonstro.sprite
        };
    });
    window.InformacoesDoAlvo();
};

window.NomearMobs = function() {
  document.getElementById('nameEnemy1').innerText = window.PersonagensEmCampo.Enemy1.name;
  document.getElementById('nameEnemy2').innerText = window.PersonagensEmCampo.Enemy2.name;
  document.getElementById('nameEnemy3').innerText = window.PersonagensEmCampo.Enemy3.name;
};

window.SincronizarInimigos = function() {
  const todosOsIds = Object.keys(window.PersonagensEmCampo);

  todosOsIds.forEach(id => {
    if (id.includes("Enemy")) {
      const monstro = window.PersonagensEmCampo[id];
      monstro.HP = monstro.HPMAX;
      monstro.mana = monstro.manaMAX;
    }
  });
};

// =========================================================
// 4. INTERFACE E INFORMAÇÕES DA BATALHA
// =========================================================

window.InformacoesDoAlvo = function() {
  const dados = window.PersonagensEmCampo;

  for (let i = 0; i <= 3; i++) {
    
    let chaveInimigo = `Enemy${i}`;
    let infoInimigo = dados[chaveInimigo];
    let idDiv = `IconEnemy${i}`;

    if (infoInimigo) {
      document.getElementById(idDiv).style.backgroundImage = `url('${infoInimigo.sprite}')`;
      document.getElementById(`HPTextEnemy${i}`).innerText = `HP ${infoInimigo.HP}/${infoInimigo.HPMAX}`;
      
      // Barra de preenchimento (calculando a porcentagem)
      let porcentagemHP = (infoInimigo.HP / infoInimigo.HPMAX) * 100;
      document.getElementById(`HPFillEnemy${i}`).style.width = porcentagemHP + "%";
    }
  }

  for (let i = 0; i <= 2; i++) { 
    
    let chaveAliado = `Aliado${i}`;
    let infoAliado = dados[chaveAliado];
    let DivId = `IconAliado${i}`;
    
    if (infoAliado) {
      document.getElementById(DivId).style.backgroundImage = `url('${infoAliado.sprite}')`;
      document.getElementById(`HPTextAliado${i}`).innerText = "HP: " + (infoAliado.HP || 0) + " / " + infoAliado.HPMAX; 
      document.getElementById(`ManaTextAliado${i}`).innerText = "MANA: " + (infoAliado.mana || 0) + " / " + infoAliado.manaMAX;
      
      let porcentagemHP = (infoAliado.HP / infoAliado.HPMAX) * 100;
      document.getElementById(`HPFillAliado${i}`).style.width = porcentagemHP + "%";
      
      if (infoAliado.manaMAX > 0) {
        let porcentagemMana = (infoAliado.mana / infoAliado.manaMAX) * 100;
        document.getElementById(`ManaFillAliado${i}`).style.width = porcentagemMana + "%";
      } else {
        document.getElementById(`ManaFillAliado${i}`).style.width = "0%";
      }
    }
  }

  let infoPlayer = dados["Player"]; 
  
  if (infoPlayer) { 
    document.getElementById('IconPlayer').style.backgroundImage = `url('${infoPlayer.sprite}')`;
    document.getElementById('HPTextPlayer').innerText = "HP: " + (infoPlayer.HP || 0) + " / " + infoPlayer.HPMAX; 
    document.getElementById('ManaTextPlayer').innerText = "MANA: " + (infoPlayer.mana || 0) + " / " + infoPlayer.manaMAX;
    
    let porcentagemHP = (infoPlayer.HP / infoPlayer.HPMAX) * 100;
    document.getElementById('HPFillPlayer').style.width = porcentagemHP + "%";
    
    if (infoPlayer.manaMAX > 0) {
      let porcentagemMana = (infoPlayer.mana / infoPlayer.manaMAX) * 100;
      document.getElementById('ManaFillPlayer').style.width = porcentagemMana + "%";
    } else {
      document.getElementById('ManaFillPlayer').style.width = "0%";
    }
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

  InformacoesDoAlvo(); 
  document.getElementById(QuemEaVez).classList.add('AlvoTurno');

  if (QuemEaVez === "Player" || QuemEaVez.includes("Aliado")) {
    
    document.getElementById('BoxAcoesInfos').classList.remove('oculto');
    
  } else if (QuemEaVez.includes("Enemy")) {
    
    document.getElementById('BoxAcoesInfos').classList.add('oculto');
    document.getElementById('BoxATACAR').classList.add('oculto');
    
    setTimeout(() => {
      TurnoDosMonstros();
    }, 800); 
  }
}

window.ExecutarAtaqueDoPlayer = function(idAlvoEscolhido) {

  // 1. ESCONDER A INTERFACE
  window.BoxAtacarFechar('fechar');
  document.getElementById('BoxAcoesInfos').classList.add('oculto');

  // 2. PREPARAR O ATACANTE (Herói ou Aliado)
  const personagem = document.getElementById(window.QuemEaVez);
  let deslocamentoX = 40; 

  // 3. O AVANÇO (Dash)
  personagem.style.transition = "0.3s ease-in-out"; 
  personagem.style.transform = `translate(${deslocamentoX}px, 0px)`;

  // 4. O MOMENTO DO IMPACTO (Acontece 150ms depois, bem no meio do pulo)
  setTimeout(() => {
    
    // --- A. O Efeito Visual do Corte ---
    const efeitoDiv = document.getElementById('EfeitoDeAtacar');
    efeitoDiv.classList.remove('atacarInimigo1', 'atacarInimigo2', 'atacarInimigo3', 'oculto');
    
    if(idAlvoEscolhido === "Enemy1") efeitoDiv.classList.add('atacarInimigo1');
    else if(idAlvoEscolhido === "Enemy2") efeitoDiv.classList.add('atacarInimigo2');
    else if(idAlvoEscolhido === "Enemy3") efeitoDiv.classList.add('atacarInimigo3');
    
    setTimeout(() => efeitoDiv.classList.add('oculto'), 400); // Some depois de 400ms

    // --- B. O Dano e o Texto Flutuante ---
    let dano = window.PersonagensEmCampo[window.QuemEaVez].dano || 10;
    window.PersonagensEmCampo[idAlvoEscolhido].HP -= dano;
    
    const el = document.createElement('div');
    el.className = 'dmg jump';
    el.innerText = dano; 
    document.getElementById(idAlvoEscolhido).appendChild(el); 
    
    setTimeout(() => el.remove(), 1000); // Lixeira do texto flutuante
    
    // Atualiza a barra de vida vermelha do monstro lá em cima
    window.InformacoesDoAlvo(); 

  }, 150);

  // 5. A VOLTA E PASSAGEM DE TURNO (Acontece 300ms depois, quando o pulo termina)
  setTimeout(function() {
    personagem.style.transform = "translate(0, 0)";
    
    // Espera a animação de voltar terminar para finalmente passar a vez
    setTimeout(() => {
      window.TurnoAtual(); 
    }, 300);
    
  }, 300);
  
}

window.TurnoDosMonstros = function() {
  
  const idMonstro = window.QuemEaVez; 
  const atacante = document.getElementById(idMonstro);

  if (!atacante) return;

  let numAlvo = Math.floor(Math.random() * 3) + 1;
  let idAlvo;

  if (numAlvo === 1) idAlvo = "Aliado1";
  else if (numAlvo === 2) idAlvo = "Player";
  else idAlvo = "Aliado2";

  const alvoElemento = document.getElementById(idAlvo);

  const posAtacante = atacante.getBoundingClientRect();
  const posAlvo = alvoElemento.getBoundingClientRect();

  const distX = (posAlvo.left - posAtacante.left) + 60; 
  const distY = (posAlvo.top - posAtacante.top);

  atacante.classList.remove('AlvoTurno'); 
  atacante.style.zIndex = "100";
  atacante.style.transition = "0.4s ease-in";
  atacante.style.transform = `translate(${distX}px, ${distY}px)`;

  // 4. Momento do Impacto (Dano e Efeito)
  setTimeout(() => {

    let dano = window.PersonagensEmCampo[idMonstro].dano || 5;
    window.PersonagensEmCampo[idAlvo].HP -= dano;
    
    const el = document.createElement('div');
    el.className = 'dmg jump';
    el.innerText = dano; 
    
    alvoElemento.appendChild(el); 
    
    setTimeout(() => el.remove(), 1000);
    
    InformacoesDoAlvo();
  }, 400);

  setTimeout(() => {
    atacante.style.transition = "0.4s ease-out";
    atacante.style.transform = "translate(0, 0)";

    setTimeout(() => {
      atacante.style.zIndex = "";
      window.TurnoAtual();
    
    }, 400);
  }, 600);
}