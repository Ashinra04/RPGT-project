window.mudarConteudo = function (idParaIr) {
    const conteudos = document.querySelectorAll('.conteudo');
    conteudos.forEach(conteudo => conteudo.classList.add('oculto'));

    const proximaConteudo = document.getElementById(idParaIr);
    if (proximaConteudo) {
        proximaConteudo.classList.remove('oculto');
    } else {
        console.error("A tela " + idParaIr + " não foi encontrada!");
    }
}

window.MonstrosBestiario = {
  Goblin: { habitat: '1 a 9 andar', },
  Goblin_Mago: { habitat: '1 a 9 andar', },
  Goblin_Rastreador : { habitat: '1 a 9 andar', },
  Slime: { habitat: '1 a 9 andar', },
  Slime_Flamejante: { habitat: '1 a 9 andar', },
  Spider: { habitat: '1 a 9 andar', },
  Kobold: { habitat: '11 a 19 andar', },
  Kobold_Lanceiro: { habitat: '11 a 19 andar', },
  Rat: { habitat: '11 a 19 andar', },
  Rat_Toxico: { habitat: '11 a 19 andar', },
  Bat: { habitat: '11 a 19 andar', },
  Orc: { habitat: '11 a 19 andar', },
  Orc_Berseker: { habitat: '11 a 19 andar', }
}

window.criarBestiario = function() {
  let containerBestiario = document.getElementById('BestiarioBody');
  containerBestiario.innerHTML = '';
  
  Object.keys(window.MonstrosBestiario).forEach(function(nomeDoMonstro) {
    let card = document.createElement('div');
    card.className = 'Cards';
    card.id = nomeDoMonstro;
    // card.style.background = `url('${window.SpritesMonstros[nomeDoMonstro].sprite}')`;
    card.onclick = function() {
      alert(nomeDoMonstro);
    }
    
    containerBestiario.appendChild(card);
  });
}