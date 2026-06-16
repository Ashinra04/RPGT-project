/*--------------------------------------------------------
    OBJETOS DO INVENTARIO E ITEMS
--------------------------------------------------------*/
window.goldPlayer = 120;

window.GearsEquipados = {
  weapon: 'Sword',      
  secondmao: 'Shield',  
  helmet: 'Iron_helmet',
  armor: null,
  pants: null,
  boots: null,
  ring: null,
  amulet: null
};

window.InventarioJogador = {
  weapon: [],
  armor: [] 
};
window.InventarioConsumables = {
  consumables: { 
    "Potion": 0,
    "Potionx2": 0,
    "Energy": 0,
    "Energyx2": 0,
    "Elixir": 0,
    "Full_heal": 0,
    "PoisonP": 0,
    "FreezeP": 0,
    "FireP": 0,
    "ElectricP": 0,
    "Antidote": 0,
    "Revive": 0,
    "Torch": 0,
    "DeathP": 0
  }
};

window.BancoDeimgDosItems = {
  weapon: { 
    "Sword": "/imagens/Forja/Sword.png",   
    "Lance": "/imagens/Forja/Lance.png",   
    "Shield": "/imagens/Forja/Shield.png", 
    "Dagger": "/imagens/Forja/Dagger.png",
    "bow": "/imagens/Forja/Bow.png",       
    "Staff": "/imagens/Forja/Staff.png",   
    "Wand": "/imagens/Forja/Wand.png",     // CORRIGIDO: Chave alterada de "WWand" para "Wand"
    "Book": "/imagens/Forja/Book.png"      
  },
  armor: { 
    "Iron_helmet": "/imagens/Forja/Iron_helmet.png",
    "Iron_armor": "/imagens/Forja/Iron_armor.png",
    "Iron_pants": "/imagens/Forja/Iron_pants.png",
    "Iron_gloves": "/imagens/Forja/Iron_gloves.png",
    "Iron_boots": "/imagens/Forja/Iron_boots.png",
    "Leather_helmet": "/imagens/Forja/Leather_helmet.png",
    "Leather_armor": "/imagens/Forja/Leather_armor.png",
    "Leather_pants": "/imagens/Forja/Leather_pants.png",
    "Leather_boots": "/imagens/Forja/Leather_boots.png"
  },
  consumables: { 
    "Potion": "/imagens/Items/Potion.png",
    "Potionx2": "/imagens/Items/Potionx2.png",
    "Energy": "/imagens/Items/Energy.png",
    "Energyx2": "/imagens/Items/Energyx2.png",
    "Elixir": "/imagens/Items/Elixir.png",
    "Full_heal": "/imagens/Items/Full heal.png",
    "PoisonP": "/imagens/Items/PoisonP.png",
    "FreezeP": "/imagens/Items/FreezeP.png",
    "FireP": "/imagens/Items/FireP.png",
    "ElectricP": "/imagens/Items/ElectricP.png",
    "Antidote": "/imagens/Items/Antidote.png",
    "Revive": "/imagens/Items/Revive.png",
    "Torch": "/imagens/Items/Torch.png",
    "DeathP": "/imagens/Items/Death potion.png"
  }
};
window.BancoDeRequerimentos = {
  'Sword': {FOR: 7, END: 8, INT: 1, DEX: 2},
  'Lance': {FOR: 7, END: 8, INT: 1, DEX: 2},
  'Shield': {FOR: 5, END: 10, INT: 0, DEX: 0}, 
  'Iron_helmet': {FOR: 8, END: 12, INT: 0, DEX: 0},
  'Generico': {FOR: 1, END: 1, INT: 1, DEX: 1},
};
window.BancoStatusGears = {
  'Sword': { DANO: 6, CritChance: '20%', DanoCrit: '100%', Velocidade: 1.2, Penetração: 8 },
  'Lance': { DANO: 6, CritChance: '20%', DanoCrit: '100%', Velocidade: 1.2, Penetração: 8 },
  'Shield': { Vida: 50, Armadura: 15, Esquiva: 1, ResistenciaF: 5, ResistenciaM: 5 }, 
  'Iron_helmet': { Vida: 100, Armadura: 20, Esquiva: 3, ResistenciaF: 10, ResistenciaM: 5 },
  'Potion': { ManaMax: 20, ManaRegen: 5, 'Efeito1': "Cura", 'Efeito2': "Boost", 'Duração': "Instant" },
  'Generico': { DANO: 1, CritChance: '1', DanoCrit: '1%', Velocidade: 1, Penetração: 1 },
};
/*--------------------------------------------------------*/


/*--------------------------------------------------------
    FUNÇÃO PARA COLOCAR OS GEARS NOS SLOTS CERTOS
--------------------------------------------------------*/
// Mapeamento dos slots de GearsEquipados para as categorias no BancoDeimgDosItems
const slotToCategoryMap = {
    weapon: 'weapon',
    secondmao: 'weapon',
    helmet: 'armor',
    armor: 'armor',
    pants: 'armor',
    boots: 'armor',
    ring: 'consumables',
    amulet: 'consumables' 
};

window.MotrarGears = function() {
  const visualSlots = ['Weapon', 'Shield', 'Helmet', 'Armor', 'Pants', 'Boots', 'Ring', 'Amulet'];

  visualSlots.forEach(function(slotNameUpper) {
    let idElementoVisual = 'S' + slotNameUpper;
    let slotElement = document.getElementById(idElementoVisual);
    
    let gearSlotKey;
    if (slotNameUpper === 'Shield') { 
      gearSlotKey = 'secondmao'; 
    } else {
      gearSlotKey = slotNameUpper.toLowerCase(); 
    }

    if (slotElement) {
      let itemNameInGears = window.GearsEquipados[gearSlotKey]; 

      if (itemNameInGears) {
        const categoriaDoItem = slotToCategoryMap[gearSlotKey]; 

        if (categoriaDoItem && window.BancoDeimgDosItems[categoriaDoItem] && window.BancoDeimgDosItems[categoriaDoItem][itemNameInGears]) {
            const caminhoDaImagem = window.BancoDeimgDosItems[categoriaDoItem][itemNameInGears];
            slotElement.style.backgroundImage = `url('${caminhoDaImagem}')`;
        } else {
            slotElement.style.backgroundImage = ''; 
        }
      } else {
        slotElement.style.backgroundImage = ''; 
      }
    }
  });
};
/*--------------------------------------------------------*/


/*--------------------------------------------------------
    FUNCOES PARA CRIAR E GERENCIAR O INVENTARIO
--------------------------------------------------------*/
window.criarInventario = function() {
  try {
    const container = document.getElementById('ItemsSlots');
    if (!container) return;
    
    if (!window.BancoDeimgDosItems) {
      alert("ERRO: O JavaScript não encontrou o 'window.BancoDeimgDosItems'! Verifique o nome da variável no topo do arquivo.");
      return; 
    }
    
    container.innerHTML = ''; 
    
    // === 1. CRIAR SLOTS DE ARMAS E ARMADURAS ===
    for (let categoria in window.InventarioJogador) {
      let arrayDeItens = window.InventarioJogador[categoria];
      
      for (let nomeItem of arrayDeItens) {
        const slotItem = document.createElement('div');
        slotItem.className = 'SlotInven';
        
        slotItem.id = nomeItem;
          
        const img = document.createElement('img');
        
        const caminhoDaImagem = window.BancoDeimgDosItems[categoria][nomeItem];
        img.src = caminhoDaImagem;
        img.style.width = '100%';
          
        slotItem.appendChild(img);
          
        slotItem.onclick = function() {
          if (typeof window.abrirModal === "function") {
              window.abrirModal(nomeItem, categoria); 
          }
        };
          
        container.appendChild(slotItem);
      }
    }

    // === 2. CRIAR SLOTS DE CONSUMÍVEIS ===
    let consumiveis = window.InventarioConsumables.consumables;
    
    for (let nomePocao in consumiveis) {
      let quantidade = consumiveis[nomePocao];
      
      if (quantidade > 0) {
        const slotItem = document.createElement('div');
        slotItem.className = 'SlotInven';
          
        const img = document.createElement('img');
        img.src = window.BancoDeimgDosItems.consumables[nomePocao];
        img.style.width = '100%';
          
        slotItem.appendChild(img);
        
        const quantidadeSpan = document.createElement('span');
        quantidadeSpan.className = 'item-quantity'; 
        quantidadeSpan.innerText = quantidade;
        slotItem.appendChild(quantidadeSpan);

        slotItem.onclick = function() {
          if (typeof window.abrirModal === "function") {
              window.abrirModal(nomePocao, 'consumables'); 
          }
        };
          
        container.appendChild(slotItem);
      }
    }
    
  } catch (erro) {
    alert("CRASH NO INVENTÁRIO: " + erro.message);
    console.error("Erro em criarInventario:", erro);
  }
};

window.categoriaWeapon = function() {
  const container = document.getElementById('ItemsSlots');
  container.innerHTML = ''; 
    
  let arrayDeArmas = window.InventarioJogador.weapon;
  
  if (arrayDeArmas) {
    for (let nomeItem of arrayDeArmas) {
      const slotItem = document.createElement('div');
      slotItem.className = 'SlotInven';
      
      slotItem.id = nomeItem;
          
      const img = document.createElement('img');
        
      img.src = window.BancoDeimgDosItems['weapon'][nomeItem];
      img.style.width = '100%';
          
      slotItem.appendChild(img);
          
      slotItem.onclick = function() {
        if (typeof window.abrirModal === "function") {
            window.abrirModal(nomeItem, 'weapon'); 
        }
      };
          
      container.appendChild(slotItem);
    }
  }
};

window.categoriaArmors = function() {
  const container = document.getElementById('ItemsSlots');
  container.innerHTML = ''; 
    
  let arrayDeArmors = window.InventarioJogador.armor;
  
  if (arrayDeArmors) {
    for (let nomeItem of arrayDeArmors) {
      const slotItem = document.createElement('div');
      slotItem.className = 'SlotInven';
          
      const img = document.createElement('img');
        
      img.src = window.BancoDeimgDosItems['armor'][nomeItem];
      img.style.width = '100%';
          
      slotItem.appendChild(img);
          
      slotItem.onclick = function() {
        if (typeof window.abrirModal === "function") {
            window.abrirModal(nomeItem, 'armor');
        }
      };
          
      container.appendChild(slotItem);
    }
  }
}

window.categoriaAcessorios = function() {
  const container = document.getElementById('ItemsSlots');
  container.innerHTML = ''; 
}

window.categoriaPotions = function() {
  const container = document.getElementById('ItemsSlots');
  container.innerHTML = ''; 
  
  let consumiveis = window.InventarioConsumables.consumables;
    
  for (let nomePocao in consumiveis) {
    let quantidade = consumiveis[nomePocao];
      
    if (quantidade > 0) {
      const slotItem = document.createElement('div');
      slotItem.className = 'SlotInven';
          
      const img = document.createElement('img');
      img.src = window.BancoDeimgDosItems.consumables[nomePocao];
      img.style.width = '100%';
          
      slotItem.appendChild(img);

      const quantidadeSpan = document.createElement('span');
      quantidadeSpan.className = 'item-quantity';
      quantidadeSpan.innerText = quantidade;
      slotItem.appendChild(quantidadeSpan);
      
      slotItem.onclick = function() {
        if (typeof window.abrirModal === "function") {
            window.abrirModal(nomePocao, 'consumables'); 
        }
      };
          
      container.appendChild(slotItem);
    }
  }
};
/*--------------------------------------------------------*/


/*--------------------------------------------------------
    FUNCOES DE INTERACAO COM O INVENTARIO
--------------------------------------------------------*/
window.abrirModalGearsEquipados = function(gearSlotKey) { 
  let imgElement = document.getElementById('ItemImagemIcon');
  let titleItemNameElement = document.getElementById('ItemTitleName');
  let itemName = window.GearsEquipados[gearSlotKey];

  document.getElementById('btnEQUIPAR').classList.add('oculto');
  document.getElementById('btnDESEQUIPAR').classList.remove('oculto');
  
  const btnDesequipar = document.getElementById('btnDESEQUIPAR');
  btnDesequipar.onclick = function() {
    window.deseguiparGear(gearSlotKey); 
  };
  
  if (!itemName) { // Se o slot estiver vazio (null)
    imgElement.style.backgroundImage = '';
    titleItemNameElement.innerText = '';
    document.getElementById('fundo-overlay').classList.add('oculto');
    return;
  }
  
  let categoriaDoItem = null;
  for (const cat in window.BancoDeimgDosItems) {
    if (window.BancoDeimgDosItems.hasOwnProperty(cat) && window.BancoDeimgDosItems[cat].hasOwnProperty(itemName)) {
      categoriaDoItem = cat;
      break;
    }
  }

  if (!categoriaDoItem) {
      console.error(`[abrirModalGearsEquipados] Categoria para o item '${itemName}' não encontrada no BancoDeimgDosItems.`);
      return; 
  }

  const caminhoDaImagem = window.BancoDeimgDosItems[categoriaDoItem][itemName];
  imgElement.style.backgroundImage = `url('${caminhoDaImagem}')`;
  
  titleItemNameElement.innerText = itemName;
  
  document.getElementById('fundo-overlay').classList.remove('oculto');
  
  window.requerimentosEStatusItems(itemName);
};

window.abrirModal = function(nomeDoItemClicado, categoriaDoItem) {
  document.getElementById('fundo-overlay').classList.remove('oculto');
  document.getElementById('btnDESEQUIPAR').classList.add('oculto');
  document.getElementById('btnEQUIPAR').classList.remove('oculto');

  let imgElement = document.getElementById('ItemImagemIcon');
  let titleItemNameElement = document.getElementById('ItemTitleName');
  
  titleItemNameElement.innerText = nomeDoItemClicado;
  
  const caminhoDaImagem = window.BancoDeimgDosItems[categoriaDoItem][nomeDoItemClicado];
  imgElement.style.backgroundImage = `url('${caminhoDaImagem}')`;
  
  const botaoEquipar = document.getElementById('btnEQUIPAR');
  botaoEquipar.onclick = function() {
    window.equiparGear(nomeDoItemClicado, categoriaDoItem);
  };
  
  window.requerimentosEStatusItems(nomeDoItemClicado);
}

window.fecharModal = function(event) {
  if (event.target.id === 'fundo-overlay') {
    document.getElementById('fundo-overlay').classList.add('oculto');
  }
}

window.categoriaSelecionada =  function(IdCategoria) {
  const todasAsAbas = document.querySelectorAll('.SlotCategory, .CategorySelect');
  
  todasAsAbas.forEach(tela => tela.classList.remove('CategorySelect'));
  todasAsAbas.forEach(tela => tela.classList.add('SlotCategory'));
  
  const CategoriaCor = document.getElementById(IdCategoria);
    if (CategoriaCor) {
        CategoriaCor.classList.remove('SlotCategory');
        CategoriaCor.classList.add('CategorySelect');
        
    } else {
        console.error("A tela " + IdCategoria + " não foi encontrada!");
    }
};

/*--------------------------------------------------------
    FUNCOES DE EQUIPAR E DESAQUIPAR GEARS
------------------------------------------------------*/
// window.registarSlotGear foi removida.

window.equiparGear = function(nomeDoItemClicado, categoriaDoItem) {
  let idSlotHTML;
  let gearSlotKeyForGearsEquipados;

  // CORRIGIDO: Agora usa 'Wand' se essa for a chave e nome do arquivo.
  const itensMaoSecundaria = ['Shield', 'Book', 'Wand']; // Ajustado para 'Wand'
  
  if (categoriaDoItem === 'armor') {
    let partes = nomeDoItemClicado.split(/[-_]/);
    gearSlotKeyForGearsEquipados = partes[1]; 
    idSlotHTML = "S" + gearSlotKeyForGearsEquipados.charAt(0).toUpperCase() + gearSlotKeyForGearsEquipados.slice(1);
  } 
  else if (categoriaDoItem === 'weapon') {
    const ehMaoSecundaria = itensMaoSecundaria.includes(nomeDoItemClicado); 

    if (ehMaoSecundaria) {
      gearSlotKeyForGearsEquipados = 'secondmao';
      idSlotHTML = 'SShield';
    } else {
      gearSlotKeyForGearsEquipados = 'weapon';
      idSlotHTML = 'SWeapon';
    }
  } else {
      console.warn(`[equiparGear] Lógica de slot não definida para categoria: ${categoriaDoItem}`);
      return; 
  }

  let slotVisualElement = document.getElementById(idSlotHTML);
  
  if (window.GearsEquipados[gearSlotKeyForGearsEquipados] === null) {
    if (slotVisualElement) {
      window.GearsEquipados[gearSlotKeyForGearsEquipados] = nomeDoItemClicado; 
      
      const caminhoDaImagem = window.BancoDeimgDosItems[categoriaDoItem][nomeDoItemClicado];
      slotVisualElement.style.backgroundImage = `url('${caminhoDaImagem}')`;

      let index = window.InventarioJogador[categoriaDoItem].indexOf(nomeDoItemClicado);
      if (index > -1) {
        window.InventarioJogador[categoriaDoItem].splice(index, 1);
      }

      window.criarInventario();
      document.getElementById('fundo-overlay').classList.add('oculto');
    } else {
        console.error(`[equiparGear] Elemento visual '${idSlotHTML}' não encontrado para equipar o item '${nomeDoItemClicado}'.`);
    }
  } else {
    alert("Slot ocupado! Desequipe primeiro.");
  }
};

window.deseguiparGear = function(gearSlotKey) { 
  let idElementoVisual;
  if (gearSlotKey === 'secondmao') {
      idElementoVisual = 'SShield';
  } else {
      idElementoVisual = 'S' + gearSlotKey.charAt(0).toUpperCase() + gearSlotKey.slice(1);
  }

  let slotGearElement = document.getElementById(idElementoVisual);
  
  if (!slotGearElement) {
      console.error(`[deseguiparGear] Elemento HTML com ID '${idElementoVisual}' não encontrado para desequipar.`);
      return;
  }

  let itemProInventario = window.GearsEquipados[gearSlotKey]; 
  
  if (!itemProInventario) {
    return; 
  }

  slotGearElement.style.backgroundImage = ''; 
  
  let categoriaParaInventario = null;
  for (const cat in window.BancoDeimgDosItems) {
    if (window.BancoDeimgDosItems.hasOwnProperty(cat) && window.BancoDeimgDosItems[cat].hasOwnProperty(itemProInventario)) {
      categoriaParaInventario = cat;
      break;
    }
  }

  if (categoriaParaInventario && window.InventarioJogador.hasOwnProperty(categoriaParaInventario)) {
    window.InventarioJogador[categoriaParaInventario].push(itemProInventario);
    window.GearsEquipados[gearSlotKey] = null; 
  } else {
    console.error(`[deseguiparGear] Não foi possível determinar a categoria do item '${itemProInventario}' para adicionar de volta ao inventário ou categoria de inventário inválida.`);
  }
  
  window.criarInventario();
  document.getElementById('fundo-overlay').classList.add('oculto');
};

/*--------------------------------------------------------
    FUNCOES DE STATUS DO ITEM
--------------------------------------------------------*/
const SímbolosDeAtributo = {
  'DANO': '⚔️', 'CritChance': '🎯', 'DanoCrit': '💥', 'Velocidade': '⚡', 'Penetração': '🔱',
  'Vida': '❤️', 'Armadura': '🛡️', 'Esquiva': '💨', 'ResistenciaF': '🔥', 'ResistenciaM': '💧',
  'ManaMax': '✨', 'ManaRegen': '💧', 'Quantidade': '📦', 'Efeito1': '🧪', 'Efeito2': '🌟', 'Duração': '⏳',
};

const MapeamentoDeAtributosPorCategoria = {
  weapon: ['DANO', 'CritChance', 'DanoCrit', 'Velocidade', 'Penetração'],
  armor: ['Vida', 'Armadura', 'Esquiva', 'ResistenciaF', 'ResistenciaM'],
  consumables: ['ManaMax', 'ManaRegen', 'Efeito1', 'Efeito2', 'Duração'],
};

window.requerimentosEStatusItems = function(item) {
  const linhaStatusDiv = document.getElementById('LinhaStatus');
  if (!linhaStatusDiv) {
    console.error("Erro: Div 'LinhaStatus' não encontrada. Verifique seu HTML.");
    return; 
  }

  const dadosReq = window.BancoDeRequerimentos[item] || window.BancoDeRequerimentos['Generico'];
  const dadosStatus = window.BancoStatusGears[item] || window.BancoStatusGears['Generico'];

  // 1. Preencher Requerimentos (FOR, END, INT, DEX)
  const TipoDestatus = ['FOR', 'END', 'INT', 'DEX'];
  TipoDestatus.forEach(Status => {
    let elemento = document.getElementById('status' + Status); 
    if (elemento) {
      let valor = dadosReq[Status];
      elemento.innerText = `${Status}: ${valor || 0}`; 
    }
  });
  
  let categoriaEncontrada = null;
  for (const categoria in window.BancoDeimgDosItems) {
    if (window.BancoDeimgDosItems.hasOwnProperty(categoria)) {
      const itensNaCategoria = window.BancoDeimgDosItems[categoria];
      if (itensNaCategoria.hasOwnProperty(item)) {
        categoriaEncontrada = categoria;
        break;
      }
    }
  }
  
  let atributosParaExibir = [];
  if (categoriaEncontrada && MapeamentoDeAtributosPorCategoria[categoriaEncontrada]) {
    atributosParaExibir = MapeamentoDeAtributosPorCategoria[categoriaEncontrada];
  } else {
    console.warn(`Categoria '${categoriaEncontrada}' não mapeada para atributos de exibição ou item '${item}' não encontrado.`);

    for (let i = 1; i <= 5; i++) {
      const elementoLinha = document.getElementById(`LiNha${i}`);
      if (elementoLinha) {
        elementoLinha.innerText = '';
      }
    }
    return; 
  }

  for (let i = 1; i <= 5; i++) {
    const elementoLinha = document.getElementById(`LiNha${i}`);
    if (elementoLinha) {
      elementoLinha.innerText = ''; 
    }
  }

  atributosParaExibir.forEach((atributoNome, index) => {
    const elementoLinha = document.getElementById(`LiNha${index + 1}`);
    if (elementoLinha) {
      const simbolo = SímbolosDeAtributo[atributoNome] || ''; 
      const valor = dadosStatus[atributoNome];
      
      if (typeof valor !== 'undefined') {
        elementoLinha.innerText = `${simbolo} ${atributoNome}: ${valor}`;
      } else {
        elementoLinha.innerText = `${simbolo} ${atributoNome}: N/A`;
      }
    }
  });
};
/*--------------------------------------------------------*/