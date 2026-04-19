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
  "Andar 1/9": { 
    Goblin: { habitat: '1 a 9 andar', sprite: '/imagens/monstros/goblin.png' },
    Goblin_Mago: { habitat: '1 a 9 andar', sprite: '/imagens/monstros/vazio.png' },
    Goblin_Rastreador : { habitat: '1 a 9 andar', sprite: '/imagens/monstros/vazio.png' },
    Slime: { habitat: '1 a 9 andar', sprite: '/imagens/monstros/slime.png' },
    Slime_Flamejante: { habitat: '1 a 9 andar', sprite: '/imagens/monstros/vazio.png' },
    Spider: { habitat: '1 a 9 andar', sprite: '/imagens/monstros/spider.png' },
  },
  
  "Andar 11/19": { 
    Kobold: { habitat: '11 a 19 andar', sprite: '/imagens/monstros/vazio.png' },
    Kobold_Lanceiro: { habitat: '11 a 19 andar', sprite: '/imagens/monstros/vazio.png' },
    Rat: { habitat: '11 a 19 andar', sprite: '/imagens/monstros/vazio.png' },
    Rat_Toxico: { habitat: '11 a 19 andar', sprite: '/imagens/monstros/vazio.png' },
  },
  
  "Andar 21/29": { 
    Bat: { habitat: '21 a 29 andar', sprite: '/imagens/monstros/vazio.png' },
    Orc: { habitat: '21 a 29 andar', sprite: '/imagens/monstros/vazio.png' },
    Orc_Berseker: { habitat: '21 a 29 andar', sprite: '/imagens/monstros/vazio.png' }
  },
  
  "Andar 31/39": { 
    Bat1: { habitat: '31 a 39 andar', sprite: '/imagens/monstros/vazio.png' },
  },
  
  "Andar 41/49": { 
    Bat2: { habitat: '31 a 39 andar', sprite: '/imagens/monstros/vazio.png' },
  },
  
  "Andar 51/59": { 
    Bat3: { habitat: '31 a 39 andar', sprite: '/imagens/monstros/vazio.png' },
  },
  
  "Andar 61/69": { 
    Bat4: { habitat: '31 a 39 andar', sprite: '/imagens/monstros/vazio.png' },
  },
  
  "Andar 71/79": { 
    Bat5: { habitat: '31 a 39 andar', sprite: '/imagens/monstros/vazio.png' },
  },
  
  "Andar 81/89": { 
    Bat6: { habitat: '31 a 39 andar', sprite: '/imagens/monstros/vazio.png' },
  },
  
  "Andar 91/99": { 
    Bat6: { habitat: '31 a 39 andar', sprite: '/imagens/monstros/vazio.png' },
  }
}

window.PopBestiario = function(OcultarAparecer) {
  if (OcultarAparecer === 'ocultar') {
    document.getElementById('BestiarioPopUp').classList.add('oculto');
  }
  else if (OcultarAparecer === 'aparecer') {
    document.getElementById('BestiarioPopUp').classList.remove('oculto');
  }
}

window.criarBestiario = function() {
  let containerBestiario = document.getElementById('BestiarioBody');
  containerBestiario.innerHTML = '';
  
  Object.keys(window.MonstrosBestiario).forEach(function(nomeDoAndar) {
    
    // Cria a div da linha (Andar)
    let BestAndar = document.createElement('div');
    BestAndar.className = 'BestiarioRows';
    containerBestiario.appendChild(BestAndar);
    
    // Cria o título
    let AndarTitle = document.createElement('div');
    AndarTitle.className = 'BesTitles';
    AndarTitle.innerText = nomeDoAndar;
    BestAndar.appendChild(AndarTitle);
    
    // Cria o corpo
    let AndarBody = document.createElement('div');
    AndarBody.className = 'BestBody';
    BestAndar.appendChild(AndarBody);
    
    // Cria os cards dos monstros
    let monstrosDesteAndar = window.MonstrosBestiario[nomeDoAndar];
    
    Object.keys(monstrosDesteAndar).forEach(function(nomeDoMonstro) {
      let cardMonster = document.createElement('div');
      cardMonster.id = nomeDoMonstro;
      cardMonster.classList.add('MonstroCard', 'imgContain');
      
      cardMonster.style.backgroundImage = `url('${monstrosDesteAndar[nomeDoMonstro].sprite}')`
      
      AndarBody.appendChild(cardMonster);
      
      cardMonster.onclick = function() {
        
        let spriteMonstro = monstrosDesteAndar[nomeDoMonstro].sprite;
        window.InforPopUpBestiario(spriteMonstro, nomeDoMonstro)
      }
    });
  });
}

window.InforPopUpBestiario = function(imagemRecebida, nomeRecebido) {
  let imgIconB = document.getElementById('BpopupMonster');
  imgIconB.style.backgroundImage = `url('${imagemRecebida}')`;
  
  document.getElementById('BNomedoMonstro').innerText = nomeRecebido;
  
  let tipoMBest = document.getElementById('BMonstroTitulo');
  
  window.PopBestiario('aparecer');
}