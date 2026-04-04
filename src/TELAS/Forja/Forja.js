

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
  Armas: [
    "Iron_sword",
    "Iron_lance",
    "Iron_Shield",
    "Iron_dagger",
    "bow",
    "pistol",
    "rifle",
    "axe",
    "mace",
    "mangual"
  ],
  Armors: {
    "Leather_helmet": "/imagens/Forja/Leather_helmet.png",
    "Leather_armor": "/imagens/Forja/Leather_armor.png",
    "Leather_pants": "/imagens/Forja/Leather_pants.png",
    "Leather_gloves": "/imagens/Forja/Leather_gloves.png",
    "Leather_boots": "/imagens/Forja/Leather_boots.png"
  },
  acessorio: [
    "ring",
    "amulet",
    "cinto"
    ]
};

/* "Iron_armor",
    "Iron_helmet",
    "Iron_pants",
    "Iron_gloves",
    "Iron_boots", */

window.categoriaId = function(idCategoria) {

  if(idCategoria === weapon) {
    forEach() {
      document.createElement('div');
      divItem.id = nome;
    }
  }
  
  else if(idCategoria === armors) {
    
  }
  else if(idCategoria === accessories) {
    
  }
  
}

window.DesenharForjaBuy = function() {
  
}