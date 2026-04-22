window.TiposSalas16 = [
  'batalha', 'batalha', 'batalha', 'batalha', 'batalha', 'batalha', 'batalha',
  'encontro', 'encontro', 'miniBoss', 'miniBoss', 'Tesouro', 'safeRoom'
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
  4: { proximasSalas: [5, 11] },
  5: { proximasSalas: [7] },
  6: { proximasSalas: [15] },
  7: { proximasSalas: [8] },
  8: { proximasSalas: [15] },
  9: { proximasSalas: [10] },
  10: { proximasSalas: [] },
  11: { proximasSalas: [12] },
  12: { proximasSalas: [13] },
  13: { proximasSalas: [14] },
  14: { proximasSalas: [7] },
  15: { proximasSalas: [16] },
  16: { proximasSalas: [] }
};

// ========================================================
// 2. FUNÇÃO DE GERAR AS PORTAS
// ========================================================

window.criarPortas = function() {
  let PortasBox = document.getElementById('parteDeCima');
  PortasBox.innerHTML = "";
  let Portas = window.Layout1[posicaoPlayer].proximasSalas;
  
  if(Portas.length === 1) {
    let Sala1 = Portas[0];
    let porta1 = document.createElement('div');
    porta1.className = 'Portas';
    porta1.id = Sala1;
    PortasBox.appendChild(porta1)
  }
  else if(Portas.length === 2) {
    let Sala1 = Portas[0];
    let Sala2 = Portas[1];
    for(let i = 0; i < 2; i++) {
      
    }
    let porta1 = document.createElement('div');
    porta1.className = 'Portas';
    porta1.id = Sala1;
    PortasBox.appendChild(porta1)
  }
  else if(Portas.length === 3) {
    let Sala1 = Portas[0];
    let Sala2 = Portas[1];
    let Sala3 = Portas[2];
    alert(Sala1);
    alert(Sala2);
    alert(Sala3);
  } else {
    console.log('beco sem saida');
  }
}

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
    // salaElemento.innerText = EmojisSalas[tipoDaSala];
    salaElemento.innerText = i;
    mapaConteudo.appendChild(salaElemento);
  }

  console.log("Mapa Gerado com Sucesso!", window.SalasDoAndar);
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
