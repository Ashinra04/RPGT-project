window.TiposSalas16 = [
  'batalha', 'batalha', 'batalha', 'batalha', 'batalha', 'batalha', 'batalha',
  'encontro', 'encontro', 'miniBoss', 'Tesouro', 'Tesouro', 'safeRoom'
];

window.TiposSalas20 = [
  'batalha', 'batalha', 'batalha', 'batalha', 'batalha', 'batalha', 'batalha', 'batalha', 'batalha', 'batalha',
  'encontro', 'encontro', 'encontro', 'miniBoss', 'miniBoss', 'Tesouro', 'Tesouro', 'Tesouro', 'safeRoom', 'safeRoom'
];

const EmojisSalas = {
  'base': '🛏️',
  'batalha': '💀',
  'miniBoss': '☠️',
  'safeRoom': '⛺',
  'encontro': '❓',
  'Tesouro': '🗝️',
  'boss': '👿',
  'Subida': '🪜'
};

window.posicaoPlayer = 1;

window.Layout1 = {
  1: { proximasSalas: [2] },
  2: { proximasSalas: [3] },
  3: { proximasSalas: [4, 9] },
  4: { proximasSalas: [11, 5] },
  5: { proximasSalas: [6] },
  6: { proximasSalas: [15] },
  7: { proximasSalas: [8] },
  8: { proximasSalas: [15] },
  9: { proximasSalas: [10] },
  10: { proximasSalas: [3] },
  11: { proximasSalas: [12] },
  12: { proximasSalas: [13] },
  13: { proximasSalas: [14] },
  14: { proximasSalas: [7] },
  15: { proximasSalas: [16] },
  16: { proximasSalas: [] }
};

window.Layout2 = {
  1: { proximasSalas: [2] },
  2: { proximasSalas: [3] },
  3: { proximasSalas: [4] },
  4: { proximasSalas: [5] },
  5: { proximasSalas: [13, 6] },
  6: { proximasSalas: [7] },
  7: { proximasSalas: [8] },
  8: { proximasSalas: [9] },
  9: { proximasSalas: [10] },
  10: { proximasSalas: [11] },
  11: { proximasSalas: [12] },
  12: { proximasSalas: [15] },
  13: { proximasSalas: [14] },
  14: { proximasSalas: [5] },
  15: { proximasSalas: [16] },
  16: { proximasSalas: [] }
};

window.Layout3 = {
  1: { proximasSalas: [2] },
  2: { proximasSalas: [3] },
  3: { proximasSalas: [7, 4, 13] },
  4: { proximasSalas: [5] },
  5: { proximasSalas: [6] },
  6: { proximasSalas: [15] },
  7: { proximasSalas: [8] },
  8: { proximasSalas: [9] },
  9: { proximasSalas: [10] },
  10: { proximasSalas: [11] },
  11: { proximasSalas: [12] },
  12: { proximasSalas: [6] },
  13: { proximasSalas: [14] },
  14: { proximasSalas: [17] },
  15: { proximasSalas: [16] },
  16: { proximasSalas: [] },
  17: { proximasSalas: [18] },
  18: { proximasSalas: [19] },
  19: { proximasSalas: [20] },
  20: { proximasSalas: [6] }
};

window.Layout4 = {
  1: { proximasSalas: [2] },
  2: { proximasSalas: [20, 3] },
  3: { proximasSalas: [4] },
  4: { proximasSalas: [5] },
  5: { proximasSalas: [6] },
  6: { proximasSalas: [7] },
  7: { proximasSalas: [8] },
  8: { proximasSalas: [9] },
  9: { proximasSalas: [10] },
  10: { proximasSalas: [11] },
  11: { proximasSalas: [12] },
  12: { proximasSalas: [15] },
  13: { proximasSalas: [15] },
  14: { proximasSalas: [13] },
  15: { proximasSalas: [16] },
  16: { proximasSalas: [] },
  17: { proximasSalas: [14] },
  18: { proximasSalas: [17] },
  19: { proximasSalas: [18] },
  20: { proximasSalas: [19] }
};

window.Layout5 = {
  1: { proximasSalas: [2] },
  2: { proximasSalas: [3] },
  3: { proximasSalas: [4] },
  4: { proximasSalas: [5] },
  5: { proximasSalas: [6] },
  6: { proximasSalas: [7] },
  7: { proximasSalas: [8] },
  8: { proximasSalas: [9] },
  9: { proximasSalas: [10] },
  10: { proximasSalas: [11] },
  11: { proximasSalas: [12] },
  12: { proximasSalas: [13] },
  13: { proximasSalas: [14] },
  14: { proximasSalas: [17] },
  15: { proximasSalas: [16] },
  16: { proximasSalas: [] },
  17: { proximasSalas: [18] },
  18: { proximasSalas: [19] },
  19: { proximasSalas: [20] },
  20: { proximasSalas: [15] }
};

// ========================================================
// 1. FUNÇÃO DE GERAR MAPA
// ========================================================
window.GerarMapaCompleto = function() {
  
  let salaLayout = Math.floor(Math.random() * 5) + 1;
  let limiteDeSalas = (salaLayout === 1 || salaLayout === 2) ? 16 : 20;

  document.getElementById('MapaTitle').innerText = 'LAYOUT: ' + salaLayout + ' (' + limiteDeSalas + ' Salas)';

  // PASSO 2: Cria o mapa vazio (Coloca a Base, Boss e Subida no lugar certo)
  window.SalasDoAndar = {}; 
  for (let i = 1; i <= limiteDeSalas; i++) {
    if (i === 1) window.SalasDoAndar[i] = 'base';
    else if (i === 15) window.SalasDoAndar[i] = 'boss'; 
    else if (i === 16) window.SalasDoAndar[i] = 'Subida'; 
    else window.SalasDoAndar[i] = 'nd';
  }

  // PASSO 3: Sorteia as Salas usando a regra do Baralho (sem repetir excessivamente)
  let deck = limiteDeSalas === 16 ? [...window.TiposSalas16] : [...window.TiposSalas20];

  Object.keys(window.SalasDoAndar).forEach(chave => {
    if (window.SalasDoAndar[chave] === 'nd') {
      const indiceSorteado = Math.floor(Math.random() * deck.length);
      window.SalasDoAndar[chave] = deck[indiceSorteado];
      deck.splice(indiceSorteado, 1);
    }
  });

// PASSO 4: Cria as divs do zero no HTML
  let mapaConteudo = document.getElementById('mapa-conteudo');
  mapaConteudo.innerHTML = '';

  for (let i = 1; i <= limiteDeSalas; i++) {

    let salaElemento = document.createElement('div');
    salaElemento.id = `Sala${salaLayout}_${i}`;

    if (i === 1) {
      salaElemento.className = 'salaSlot salaDoPlayer';
    } else {
      salaElemento.className = 'salaSlot salaSemPlayer';
    }

    let tipoDaSala = window.SalasDoAndar[i];
    salaElemento.innerText = EmojisSalas[tipoDaSala] + i;
    mapaConteudo.appendChild(salaElemento);
  }
  
  criarPortas(salaLayout);
  console.log("Mapa Gerado com Sucesso!", window.SalasDoAndar);
};

// ========================================================
// 2. FUNÇÃO DE GERAR AS PORTAS E COLOCAR OS EMOJIS
// ========================================================
window.criarPortas = function(Nlayout) {
  let PortasBox = document.getElementById('parteDeCima');
  PortasBox.innerHTML = "";

  let layoutAlvo = window["Layout" + Nlayout];
  let Portas = layoutAlvo[window.posicaoPlayer].proximasSalas;
  
  if (Portas.length === 0) {
    console.log('Beco sem saída ou Fim do Andar!');
    PortasBox.innerHTML = "<div style='color: white;'>FIM DO ANDAR</div>";
  } else {
    Portas.forEach((idDaSala, index) => {
      let porta = document.createElement('div');
      porta.className = 'Portas';
      porta.id = idDaSala;
      
      let tipoDaSala = window.SalasDoAndar[idDaSala];
      let emojiDaSala = EmojisSalas[tipoDaSala];
      
      porta.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; line-height: 1.2;">
          <span style="font-size: 40px;">${emojiDaSala}</span>
          <span style="font-size: 16px; color: #ddd; font-weight: bold;">Sala ${idDaSala}</span>
        </div>
      `;
      
      // porta.innerText = emojiDaSala;

      porta.onclick = function() {
        console.log("O jogador entrou na sala " + idDaSala);
        window.posicaoPlayer = idDaSala;
        
        let salaAntiga = document.querySelector('.salaDoPlayer');
        if (salaAntiga) {
          salaAntiga.classList.remove('salaDoPlayer');
          salaAntiga.classList.add('salaSemPlayer');
        }

        let idHtmlDaNovaSala = `Sala${Nlayout}_${idDaSala}`;
        let salaNova = document.getElementById(idHtmlDaNovaSala);
        
        if (salaNova) {
          salaNova.classList.remove('salaSemPlayer');
          salaNova.classList.add('salaDoPlayer');
        }
        
        window.criarPortas(Nlayout);

        if (['boss', 'batalha', 'miniboss'].includes(tipoDaSala)) {
          mudarTela('combate-tela');
          
        } else {
          window.PegarTipoDaSala(tipoDaSala);
        }
      };
      
      PortasBox.appendChild(porta);
    });
  }
};

// ========================================================
// 3. FUNÇÃO GERAIS
// ========================================================
window.voltarParaSalas = function() {
  let Mapa = document.getElementById('mapa-tela');
  let Salas = document.getElementById('salas-tela');
  Mapa.classList.add('oculto');
  Salas.classList.remove('oculto');
}

window.PegarTipoDaSala = function(tipoDaSalaAlvo){
  if(tipoDaSalaAlvo) {
    let todasAsTelas = document.querySelectorAll('.Salas'); 
    
    todasAsTelas.forEach(tela => {
      tela.classList.add('oculto');
    });

    let nomeDoId = tipoDaSalaAlvo + '-tela';
    document.getElementById(nomeDoId).classList.remove('oculto');
    
    console.log("Abrindo a tela: " + nomeDoId);
  }
}

 window.MudarParaSala = function() {
   
 }
 window.avancarProxSala = function() {
  console.log("O jogador está voltando para o corredor...");

  let telaCombate = document.getElementById('combate-tela');
  if (telaCombate) {
    telaCombate.classList.add('oculto');
  }

  let todasAsTelas = document.querySelectorAll('.Salas'); 
  todasAsTelas.forEach(tela => {
    tela.classList.add('oculto');
  });

  let telaDeSalas = document.getElementById('salas-tela');
  if (telaDeSalas) {
    telaDeSalas.classList.remove('oculto');
  }
};