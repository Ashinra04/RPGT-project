window.mudarTelaForja = function (idDaTelaAlvo) {
    const Forjas = document.querySelectorAll('.Forja');
    
    Forjas.forEach(tela => tela.classList.add('oculto'));

    const proximoForja = document.getElementById(idDaTelaAlvo);
  
    if (proximoForja) {
        proximoForja.classList.remove('oculto');
    } else {
        console.error("A tela " + idDaTelaAlvo + " não foi encontrada!");
    }
}

window.COMPOrDETA = function(idComInfo) {
  if(idComInfo === "PopUp-itemInfo") {
    document.getElementById('PopUp-itemInfo').classList.remove('oculto');
    document.getElementById('PopUp-Comparacao').classList.add('oculto');
  }
  else if(idComInfo === "PopUp-Comparacao") {
    document.getElementById('PopUp-Comparacao').classList.remove('oculto');
    document.getElementById('PopUp-itemInfo').classList.add('oculto');
  }
}

let ItemsPerfil = {
  weapon: {
    "Sword":  { dano: 12, Vitalidade: 0, forca: 10, des: 6, int: 0, preco: 80 },  // 28
    "Lance":  { dano: 10, Vitalidade: 0, forca: 14, des: 4, int: 0, preco: 115 },  // 28
    "Shield": { def: 10,  Vitalidade: 0, forca: 12, des: 6, int: 0, preco: 60 }, // 28
    "Dagger": { dano: 7,  Vitalidade: 0, forca: 5,  des: 16, int: 0, preco: 70 }, // 28
    "bow":    { dano: 8,  Vitalidade: 0, forca: 8,  des: 12, int: 0, preco: 110 }, // 28
    "Staff":  { dano: 8, Vitalidade: 0, forca: 4,  des: 6,  int: 10, preco: 100 }, // 28
    "Wand":   { dano: 4,  Vitalidade: 0, forca: 0,  des: 10, int: 14, preco: 50 }, // 28
    "Book":   { dano: 2,  Vitalidade: 0, forca: 0,  des: 8,  int: 18, preco: 150 }  // 28
},
  armor: {
    "Iron_helmet": { Armadura: 8, Vitalidade: 14, forca: 12, des: 2, int: 0 },
    "Iron_armor": { Armadura: 16, Vitalidade: 12, forca: 8, des: 0, int: 0 },
    "Iron_pants": { Armadura: 13, Vitalidade: 10, forca: 12, des: 1, int: 0 },
    "Iron_gloves": { Armadura: 7, Vitalidade: 12, forca: 15, des: 2, int: 0 },
    "Iron_boots": { Armadura: 5, Vitalidade: 13, forca: 15, des: 3, int: 0 },
    "Leather_helmet": { Armadura: 4, Vitalidade: 6, forca: 0, des: 6, int: 12 },
    "Leather_armor": { Armadura: 8, Vitalidade: 11, forca: 0, des: 5, int: 4 },
    "Leather_pants": { Armadura: 5, Vitalidade: 9, forca: 0, des: 7, int: 7 },
    "Leather_gloves": { Armadura: 3, Vitalidade: 7, forca: 0, des: 9, int: 9 },
    "Leather_boots": { Armadura: 2, Vitalidade: 6, forca: 0, des: 12, int: 8 }
  }
};

let categoriaSelecionada = null;

let itemAComprar = null;
let categoriaDoItem = null;

window.categoriaId = function(idCategoria) {
  let container = document.getElementById('ForjaItemsContainer');
  container.innerHTML = ''; 
  
  // ADAPTAÇÃO: Puxando as imagens direto do banco global!
  let listaImagens = window.BancoDeimgDosItems[idCategoria];

  if (listaImagens) {
    for (let item in listaImagens) { // item vai ser "Sword", "Lance", etc
      const divSlot = document.createElement('div');
      divSlot.classList.add('fslot');
      divSlot.id = item;
      
      // ADAPTAÇÃO: O caminho da imagem agora vem do banco
      const caminhoImagem = listaImagens[item]; 
      const img = document.createElement('img');
      img.src = caminhoImagem;
      img.style.width = "100%";
      
      divSlot.onclick = function() {
        window.MostrarInfoContainer(item, caminhoImagem, idCategoria);
      };
      
      divSlot.appendChild(img);
      container.appendChild(divSlot);
    }
  }
};

window.MostrarInfoContainer = function(nomeItem, urlImagem, categoria) {
  const infoContainer = document.getElementById('ForjaPopUp');
  infoContainer.classList.remove('oculto');
  
  document.getElementById('PopUp-money').innerText = "GOLD: " + window.goldPlayer;

  const divImagemDestino = document.getElementById('ImgF');
  divImagemDestino.innerHTML = ''; 
  const imgGrande = document.createElement('img');
  imgGrande.src = urlImagem;
  divImagemDestino.appendChild(imgGrande);
  
  document.getElementById('PopUp-ItemNome').innerText = nomeItem;
  
  const dados = ItemsPerfil[categoria][nomeItem];
  
  itemAComprar = nomeItem;
  categoriaDoItem = categoria;

  if (dados) {
    const danoDefElem = document.getElementById('DANO-DEF');
  
    if (categoria === 'weapon') {
      if (nomeItem === "Shield") {
        danoDefElem.innerText = "DEFESA: " + (dados.def || 0);
      } else {
        danoDefElem.innerText = "DANO: " + (dados.dano || 0);
      }
    } 
    else if (categoria === 'armor') {
      danoDefElem.innerText = "Defesa: " + (dados.Armadura || 0);
    }
  
    document.getElementById('VIT').innerText = "VITALIDADE: " + (dados.Vitalidade || 0);
    document.getElementById('FOR').innerText = "FORÇA: " + (dados.forca || 0);
    document.getElementById('INT').innerText = "INTELIGENCIA: " + (dados.int || 0);
    document.getElementById('DES').innerText = "DESTREZA: " + (dados.des || 0);
    document.getElementById('PrecosITEMS').innerText = "PREÇO: " + (dados.preco || 0);
  }
}

window.OcultarInfoContainer = function() {
  if (event.target.id === 'ForjaPopUp') {
    document.getElementById('ForjaPopUp').classList.add('oculto');
  }
}

window.comprarItem = function() {

  const dadosItem = ItemsPerfil[categoriaDoItem][itemAComprar];
  const preco = dadosItem.preco || 0;

  if (window.goldPlayer >= preco) {
    
    window.goldPlayer -= preco;

    if (window.InventarioJogador[itemAComprar] !== undefined) {
      window.InventarioJogador[itemAComprar] += 1;
    } else {
      window.InventarioJogador[itemAComprar] = 1;
    }

    // 5. ATUALIZAR A INTERFACE (Mude o ID para o ID onde aparece seu ouro na tela)
    const goldDisplay = document.getElementById('GoldDisplayGeral'); 
    if(goldDisplay) goldDisplay.innerText = window.goldPlayer;

    alert("Você comprou: " + itemAComprar + "!");
    
    document.getElementById('ForjaPopUp').classList.add('oculto');

  } else {
    alert("Ouro insuficiente! Você precisa de " + preco + " Gold.");
  }
}