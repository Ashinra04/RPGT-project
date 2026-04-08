window.goldPlayer = 120;

window.GearsEquipados = {
  helmet: null,
  armor: null,
  pants: null,
  boots: null,
  gloves: null,
  weapon: null,
  segunda_mao: null,
  ring1: null,
  ring2: null,
  amulet: null
}

const MapaIdsDosSlots = {
  helmet: 'SHelemt',
  armor: 'SArmor',
  pants: 'SPants',
  boots: 'SBoots',
  gloves: 'SGloves', 
  weapon: 'SWeapon',
  segunda_mao: 'SShield',
  amulet: 'SAmulet',
  ring1: 'SRing1',
  ring2: 'SRing2'
};

window.BancoDeimgDosItems = {
  icons: {
    "swordIcon": "/imagens/Icons/sword.png",
    "shieldIcon": "/imagens/Icons/shield.png",
    "staffIcon": "/imagens/Icons/staff.png",
    "helmetIcon": "/imagens/Icons/helmet.png",
    "ArmorIccon": "/imagens/Icons/armor.png",
    "glovesIcon": "/imagens/Icons/gloves.png",
    "pantsIcon": "/imagens/Icons/pants.png",
    "bootsIcon": "/imagens/Icons/boots.png"
  },
  weapon: { 
    "Sword": "/imagens/Forja/WSword.png",
    "Lance": "/imagens/Forja/WLance.png",
    "Shield": "/imagens/Forja/WShield.png",
    "Dagger": "/imagens/Forja/WDagger.png",
    "bow": "/imagens/Forja/WBow.png",
    "Staff": "/imagens/Forja/WStaff.png",
    "Wand": "/imagens/Forja/Wand.png",
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
    "Leather_gloves": "/imagens/Forja/Leather_gloves.png",
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

window.InventarioJogador = {
  weapon: [
    "Sword",
    "Shield"
  ],
  armor: [ 
    "Leather_helmet",
    "Leather_boots"
  ] 
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
    // O "catch" pega o erro se o jogo travar e mostra na tela!
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

window.mudarBox = function (idBoxAlvo) {
  const boxes = document.querySelectorAll('.GSboxes');
  boxes.forEach(tela => tela.classList.add('oculto'));

  const proximaBox = document.getElementById(idBoxAlvo);
  if (proximaBox) {
    proximaBox.classList.remove('oculto');
  } else {
    console.error("A tela " + idBoxAlvo + " não foi encontrada!");
  }
}

window.abrirModal = function(nomeDoItemClicado, categoriaDoItem) {
  document.getElementById('fundo-overlay').classList.remove('oculto');

  document.getElementById('ItemTitleName').innerText = nomeDoItemClicado;
  
  const botaoEquipar = document.getElementById('btnEQUIPAR');
  
  botaoEquipar.onclick = function() {
  
    window.equiparGear(nomeDoItemClicado, categoriaDoItem);
  };
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


window.equiparGear = function(nomeDoItemClicado, categoriaDoItem) {
  
  const dadosDoItem = ItemsPerfil[categoriaDoItem][nomeDoItemClicado];
  
  if (!dadosDoItem || !dadosDoItem.tipoSlot) {
    console.error("Este item não tem um tipoSlot configurado no ItemsPerfil!");
    return;
  }

  const slotDoItem = dadosDoItem.tipoSlot; 

  window.GearsEquipados[slotDoItem] = nomeDoItemClicado;

  const idDaDivHtml = MapaIdsDosSlots[slotDoItem];
  const slotDiv = document.getElementById(idDaDivHtml);

  if (slotDiv) {
    const caminhoDaImagem = window.BancoDeimgDosItems[categoriaDoItem][nomeDoItemClicado];
    
    slotDiv.innerHTML = `<img src="${caminhoDaImagem}" style="width: 100%; height: 100%; object-fit: contain;">`;
    
    alert("Você equipou: " + nomeDoItemClicado);
  }
};