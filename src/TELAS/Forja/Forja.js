

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
    "WBook": "/imagens/Forja/WBook.png"
  },
  armor: {
    "Iron_armor": "/imagens/Forja/Iron_helmet.png",
    "Iron_helmet": "/imagens/Forja/Iron_armor.png",
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
      
      divSlot.appendChild(img);
      container.appendChild(divSlot);
    }
    
  } else {
    console.log("Essa categoria ainda não existe no objeto inventarioForja!");
  }
};

window.DesenharForjaBuy = function() {
  
}