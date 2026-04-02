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
  // O event.target descobre exatamente em qual div seu dedo tocou.
  // Se o dedo tocou no 'fundo-overlay' (a parte escura), a tela fecha.
  if (event.target.id === 'fundo-overlay') {
    document.getElementById('fundo-overlay').classList.add('oculto');
  }
}