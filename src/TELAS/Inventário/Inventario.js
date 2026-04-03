window.Inventario = {
  weapons: {
    "sword": "/imagens/Icons/sword.png",
    "shield": "/imagens/Icons/sword.png",
    "staff": "/imagens/Icons/sword.png",
    "hammer": "/imagens/Icons/sword.png",
    "lance": "/imagens/Icons/sword.png"
  },
  armors: {
    "helmet": "/imagens/Icons/sword.png",
    "boots": "/imagens/Icons/sword.png",
    "gloves": "/imagens/Icons/sword.png",
    "pants": "/imagens/Icons/sword.png"
  }
};

window.criarInventario = function() {
  const container = document.getElementById('ItemsSlots');
  if (!container) return; // Segurança caso o ID não exista
  
  container.innerHTML = ''; 
  
  for (let categoria in window.Inventario) {

    const itens = Object.values(window.Inventario[categoria]);
    
    itens.forEach(caminhoImagem => {
      const slotItem = document.createElement('div');
      slotItem.className = 'SlotInven';
      
      const img = document.createElement('img');
      img.src = caminhoImagem;
      img.style.width = '100%';
      
      slotItem.appendChild(img);
      
      slotItem.onclick = function() {
        if (typeof abrirModal === "function") {
          abrirModal();
        } else {
          console.log("Função abrirModal não definida.");
        }
      };
      
      container.appendChild(slotItem);
    });
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

window.abrirModal = function() {
  document.getElementById('fundo-overlay').classList.remove('oculto');
}

window.fecharModal = function(event) {

  if (event.target.id === 'fundo-overlay') {
    document.getElementById('fundo-overlay').classList.add('oculto');
  }
}