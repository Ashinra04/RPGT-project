/*--------------------------------------------------------
    OBJETOS DO INVENTARIO E ITEMS
--------------------------------------------------------*/
window.goldPlayer = 120;
let slotGEARS = '';
let GearType = '';

window.GearsEquipados = {
  weapon: 'WSword',
  secondmao: 'WShield',
  helmet: 'Leather_helmet',
  armor: null,
  pants: null,
  boots: null,
  ring: null,
  amulet: null
}
window.InventarioJogador = {
  weapon: ['Sword'],
  armor: [] 
};
window.InventarioConsumables = {
  consumables: { 
    "Potion": 3,
    "Potionx2": 0,
    "Energy": 2,
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
    "Sword": "/imagens/Forja/WSword.png",
    "Lance": "/imagens/Forja/WLance.png",
    "Shield": "/imagens/Forja/WShield.png",
    "Dagger": "/imagens/Forja/WDagger.png",
    "bow": "/imagens/Forja/WBow.png",
    "Staff": "/imagens/Forja/WStaff.png",
    "WWand": "/imagens/Forja/Wand.png",
    "Book": "/imagens/Forja/WBook.png"
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
}
window.BancoStatusGears = {
  'Sword': { DANO: 6, CritChance: '20%', DanoCrit: '100%', Velocidade: 1.2, Penetração: 8 },
  'Lance': { DANO: 6, CritChance: '20%', DanoCrit: '100%', Velocidade: 1.2, Penetração: 8 },
}
/*--------------------------------------------------------*/


/*--------------------------------------------------------
    FUNÇÃO PARA COLOCAR OS GEARS NOS SLOTS CERTOS
--------------------------------------------------------*/
const Slots = [
  'Weapon',
  'Shield',
  'Helmet',
  'Armor',
  'Pants',
  'Boots',
  'Ring',
  'Amulet'
];
window.MotrarGears = function() {
  Slots.forEach(function(slotName) {
    let idElemento = 'S' + slotName;
    let slotElement = document.getElementById(idElemento);
    
    if (slotElement) {
      let slotNameMinuscula = slotName.toLowerCase();
      let imagem = window.GearsEquipados[slotNameMinuscula];
      if (imagem) {
        slotElement.style.backgroundImage = `url('/imagens/Forja/${imagem}.png')`;
      } else {
        slotElement.style.backgroundImage = '';
      }
    }
  });
  let Secondmao = window.GearsEquipados.secondmao;
  let secondaomao = document.getElementById('SShield');
  secondaomao.style.backgroundImage = `url('/imagens/Forja/${Secondmao}.png')`;
}
/*--------------------------------------------------------*/


/*--------------------------------------------------------
    FUNCOES PARA CRIAR E GERENCIAR O INVENTARIO
--------------------------------------------------------*/
window.criarInventario = function() {
  // O "try" tenta rodar o seu código normalmente
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
        
        img.src = window.BancoDeimgDosItems[categoria][nomeItem];
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

    let consumiveis = window.InventarioConsumables.consumables;
    
    for (let nomePoçao in consumiveis) {
      let quantidade = consumiveis[nomePoçao];
      
      if (quantidade > 0) {
        const slotItem = document.createElement('div');
        slotItem.className = 'SlotInven';
          
        const img = document.createElement('img');
        img.src = window.BancoDeimgDosItems.consumables[nomePoçao];
        img.style.width = '100%';
          
        slotItem.appendChild(img);
        
        slotItem.onclick = function() {
          if (typeof window.abrirModal === "function") {
              window.abrirModal(nomePoçao, 'consumables'); 
          }
        };
          
        container.appendChild(slotItem);
      }
    }
    
  } catch (erro) {
    alert("CRASH NO INVENTÁRIO: " + erro.message);
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
    
  for (let nomePoçao in consumiveis) {
    let quantidade = consumiveis[nomePoçao];
      
    if (quantidade > 0) {
      const slotItem = document.createElement('div');
      slotItem.className = 'SlotInven';
          
      const img = document.createElement('img');
      img.src = window.BancoDeimgDosItems.consumables[nomePoçao];
      img.style.width = '100%';
          
      slotItem.appendChild(img);
      
      slotItem.onclick = function() {
        if (typeof window.abrirModal === "function") {
            window.abrirModal(nomePoçao, 'consumables'); // Avisa que é consumível
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
window.abrirModalGearsEquipados = function(categoria) {
  let img = document.getElementById('ItemImagemIcon');
  let TitleItemName = document.getElementById('ItemTitleName');
  let ItemName = GearsEquipados[categoria];
  
  document.getElementById('btnEQUIPAR').classList.add('oculto');
  document.getElementById('btnDESEQUIPAR').classList.remove('oculto');
  
  const btnDesequipar = document.getElementById('btnDESEQUIPAR');
  btnDesequipar.onclick = function() {
    window.deseguiparGear(); 
  };
  
  if (typeof ItemName !== 'string' || ItemName.length === 0) {
    console.log(`Slot '${categoria}' está vazio ou inválido. Nenhuma interação será realizada.`);
    return;
  }
  
  let ItemNameFinal;

  if (ItemName.startsWith('W')) {
    let ItemNameModificado = ItemName.split('');
    ItemNameModificado.splice(0, 1);
    ItemNameFinal = ItemNameModificado.join('');
  } else {
    ItemNameFinal = ItemName;
  }
  
  img.style.backgroundImage = `url('/imagens/Forja/${GearsEquipados[categoria]}.png')`;
  
  if (ItemNameFinal) {
    TitleItemName.innerText = ItemNameFinal;
  } else {
    console.log('Elemento com ID "ItemTitleName" não encontrado.');
  }

  document.getElementById('fundo-overlay').classList.remove('oculto');
  
  window.requerimentosItems(ItemNameFinal);
};

window.abrirModal = function(nomeDoItemClicado, categoriaDoItem) {
  document.getElementById('fundo-overlay').classList.remove('oculto');
  document.getElementById('btnDESEQUIPAR').classList.add('oculto');
  document.getElementById('btnEQUIPAR').classList.remove('oculto');
//-------------------------------------------------------
  let img = document.getElementById('ItemImagemIcon');
  let NomeFinal;
  if (nomeDoItemClicado.startsWith('W')) {
    let NameModificado = nomeDoItemClicado.split('');
    NameModificado.splice(0, 1);
    NomeFinal = ItemNameModificado.join('');
  } 
  
  document.getElementById('ItemTitleName').innerText = nomeDoItemClicado;
  
  const caminhoDaImagem = window.BancoDeimgDosItems[categoriaDoItem][nomeDoItemClicado];
  img.style.backgroundImage = `url('${caminhoDaImagem}')`;
  
  //img.style.backgroundImage = `url('/imagens/Forja/${nomeDoItemClicado}.png')`;
//--------------------------------------------------------
  const botaoEquipar = document.getElementById('btnEQUIPAR');
  botaoEquipar.onclick = function() {
    window.equiparGear(nomeDoItemClicado, categoriaDoItem);
  };
  
  window.requerimentosItems(nomeDoItemClicado);
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
window.registarSlotGear = function(slotSELECIONADO, categoria) {
  slotGEARS = slotSELECIONADO;
  GearType = categoria;
}

window.equiparGear = function(nomeDoItemClicado, categoriaDoItem) {
  let idSlotHTML;
  let tipoSugerido;

  const itensMaoSecundaria = ['Shield', 'Book', 'Flecha', 'Wand'];

  if (categoriaDoItem === 'armor') {
    let partes = nomeDoItemClicado.split(/[-_]/);
    tipoSugerido = partes[1];
    idSlotHTML = "S" + tipoSugerido.charAt(0).toUpperCase() + tipoSugerido.slice(1);
  } 
  else if (categoriaDoItem === 'weapon') {
    const ehMaoSecundaria = itensMaoSecundaria.some(item => nomeDoItemClicado.includes(item));

    if (ehMaoSecundaria) {
      tipoSugerido = 'secondmao';
      idSlotHTML = 'SShield';
    } else {
      tipoSugerido = 'weapon';
      idSlotHTML = 'SWeapon';
    }
  }

  let slotVisual = document.getElementById(idSlotHTML);
  
  if (window.GearsEquipados[tipoSugerido] === null) {
    if (slotVisual) {
      window.GearsEquipados[tipoSugerido] = nomeDoItemClicado;
      
      const caminhoDaImagem = window.BancoDeimgDosItems[categoriaDoItem][nomeDoItemClicado];
      slotVisual.style.backgroundImage = `url('${caminhoDaImagem}')`;

      let index = window.InventarioJogador[categoriaDoItem].indexOf(nomeDoItemClicado);
      if (index > -1) {
        window.InventarioJogador[categoriaDoItem].splice(index, 1);
      }

      window.criarInventario();
      document.getElementById('fundo-overlay').classList.add('oculto');
    }
  } else {
    alert("Slot ocupado! Desequipe primeiro.");
  }
};

window.deseguiparGear = function() {
  let SlotIDHTML = slotGEARS;
  let tipoDeGear = GearType;
  
  //retirar imagem do slot, e trava
  let SlotGear = document.getElementById(SlotIDHTML);
  SlotGear.style.backgroundImage = '';
  
  if (!SlotIDHTML || !tipoDeGear) {
    return; 
  }
  
  let itemProInventario = window.GearsEquipados[tipoDeGear];
  
  if (itemProInventario.startsWith('W')) {
    let ItemModificado = itemProInventario.split('');
    ItemModificado.splice(0, 1);
    itemProInventario = ItemModificado.join('');
  } 

  if (itemProInventario && typeof itemProInventario === 'string' && itemProInventario.length > 0) {
    
    if(tipoDeGear === 'weapon' || tipoDeGear === 'secondmao') {
      window.InventarioJogador.weapon.push(itemProInventario);
    }
    else {
      window.InventarioJogador.armor.push(itemProInventario);
    }
    
    window.GearsEquipados[tipoDeGear] = null;
  } else {
    console.log(`Slot '${categoriaDoItem}' está vazio. Nenhuma adição ao inventário.`);
  }
  
  window.criarInventario();
  document.getElementById('fundo-overlay').classList.add('oculto');
}

window.requerimentosItems = function(item) {
  const TipoDestatus = [ 'FOR', 'END', 'INT', 'DEX', ]
  for(let Status of TipoDestatus) {
    let StatusN = document.getElementById('status' + Status);
    let statusValor = window.BancoDeRequerimentos[item][Status];
    StatusN.innerText = '';
    StatusN.innerText = `${Status}: ${statusValor}`
  }
  
  const TipoDeAtributo = [ 'Penetração', 'Velocidade', 'DanoCrit', 'CritChance', 'DANO', ]
  const SímboloDeAtributo = { 
    'Penetração': ['🔱'],
    'Velocidade': ['⚡'],
    'DanoCrit': ['💥'],
    'CritChance': ['🎯'], 
    'DANO': ['️⚔️'],
  }
    
  for(let Atributo of TipoDeAtributo) {
    let símbolo = SímboloDeAtributo[Atributo];
    
    let AtributoN = document.getElementById('Linha' + Atributo);
    let AtributoValor = window.BancoStatusGears[item][Atributo];
    AtributoN.innerText = '';
    AtributoN.innerText = `${símbolo} ${Atributo}: ${AtributoValor}`
  }
}
/*--------------------------------------------------------*/