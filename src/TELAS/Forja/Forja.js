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

let inventarioForja = {
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
  }
};

let ItemsPerfil = {
  weapon: {
    "Sword":  { dano: 12, Vitalidade: 0, forca: 10, des: 6, int: 0 },  // 28
    "Lance":  { dano: 10, Vitalidade: 0, forca: 14, des: 4, int: 0 },  // 28
    "Shield": { def: 10,  Vitalidade: 0, forca: 12, des: 6, int: 0 }, // 28
    "Dagger": { dano: 7,  Vitalidade: 0, forca: 5,  des: 16, int: 0 }, // 28
    "bow":    { dano: 8,  Vitalidade: 0, forca: 8,  des: 12, int: 0 }, // 28
    "Staff":  { dano: 8, Vitalidade: 0, forca: 4,  des: 6,  int: 10 }, // 28
    "Wand":   { dano: 4,  Vitalidade: 0, forca: 0,  des: 10, int: 14 }, // 28
    "Book":   { dano: 2,  Vitalidade: 0, forca: 0,  des: 8,  int: 18 }  // 28
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

window.categoriaId = function(idCategoria) {
  let container = document.getElementById('ForjaItemsContainer');
  container.innerHTML = ''; 
  
  let listaItems = inventarioForja[idCategoria];

  if (listaItems) {
    for (let item in listaItems) {
      const divSlot = document.createElement('div');
      divSlot.classList.add('fslot');
      divSlot.id = item;
      
      const caminhoImagem = listaItems[item];
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

// Adicionamos 'categoria' nos parâmetros
window.MostrarInfoContainer = function(nomeItem, urlImagem, categoria) {
  const infoContainer = document.getElementById('ForjaPopUp');
  infoContainer.classList.remove('oculto');

  const divImagemDestino = document.getElementById('ImgF');
  divImagemDestino.innerHTML = ''; 
  const imgGrande = document.createElement('img');
  imgGrande.src = urlImagem;
  divImagemDestino.appendChild(imgGrande);
  
  document.getElementById('FItemsNome').innerText = nomeItem;
  
  const dados = ItemsPerfil[categoria][nomeItem];

  if (dados) {
    const danoDefElem = document.getElementById('DANO-DEF');
  
    if (categoria === 'weapon') {
      if (nomeItem === "Shield") {
        danoDefElem.innerText = "Defesa: " + (dados.def || 0);
      } else {
        danoDefElem.innerText = "Dano: " + (dados.dano || 0);
      }
    } 
    else if (categoria === 'armor') {
      danoDefElem.innerText = "Defesa: " + (dados.Armadura || 0);
    }
  
    document.getElementById('VIT').innerText = "VITALIDADE: " + (dados.Vitalidade || 0);
    document.getElementById('FOR').innerText = "FORÇA: " + (dados.forca || 0);
    document.getElementById('INT').innerText = "INTELIGENCIA: " + (dados.int || 0);
    document.getElementById('DES').innerText = "DESTREZA: " + (dados.des || 0);
  }
}

window.OcultarInfoContainer = function() {
  if (event.target.id === 'ForjaPopUp') {
    document.getElementById('ForjaPopUp').classList.add('oculto');
  }
}

