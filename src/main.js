// CSS DAS TELAS
import './style.css'
import './TELAS/Shop/Shop.css';
import './TELAS/Forja/Forja.css';
import './TELAS/Taverna/Taverna.css';
import './TELAS/Guilda/Guilda.css';
import './TELAS/Batalha/Batalha.css';
import './TELAS/Salas/Salas.css';
import './TELAS/Inventário/Inventario.css';
import './TELAS/Perfil/Perfil.css';

// JS DAS TELAS
import './TELAS/Shop/Shop.js';
import './TELAS/Forja/Forja.js';
import './TELAS/Taverna/Taverna.js';
import './TELAS/Guilda/Guilda.js';
import './TELAS/Batalha/Batalha.js';
import './TELAS/Salas/Salas.js';
import './TELAS/Inventário/Inventario.js';
import './TELAS/Perfil/Perfil.js';

// HTML DAS TELAS
import shopHtml from './TELAS/Shop/Shop.html?raw';
import guildHtml from './TELAS/Guilda/Guilda.html?raw';
import tavernHtml from './TELAS/Taverna/Taverna.html?raw';
import forjaHtml from './TELAS/Forja/Forja.html?raw';
import batalhaHtml from './TELAS/Batalha/Batalha.html?raw';
import salasHtml from './TELAS/Salas/Salas.html?raw';
import inventarioHtml from './TELAS/Inventário/Inventario.html?raw';
import perfilHtml from './TELAS/Perfil/Perfil.html?raw';

const corpoDoSite = document.body;
corpoDoSite.insertAdjacentHTML('beforeend', shopHtml);
corpoDoSite.insertAdjacentHTML('beforeend', guildHtml);
corpoDoSite.insertAdjacentHTML('beforeend', tavernHtml);
corpoDoSite.insertAdjacentHTML('beforeend', forjaHtml);
corpoDoSite.insertAdjacentHTML('beforeend', batalhaHtml);
corpoDoSite.insertAdjacentHTML('beforeend', salasHtml);
corpoDoSite.insertAdjacentHTML('beforeend', inventarioHtml);
corpoDoSite.insertAdjacentHTML('beforeend', perfilHtml);

window.mudarTela = function (idParaMostrar) {
  const telas = document.querySelectorAll('.tela');
  telas.forEach(tela => tela.classList.add('oculto'));

  const proximaTela = document.getElementById(idParaMostrar);
    if (proximaTela) {
        proximaTela.classList.remove('oculto');
    } else {
      console.error("A tela " + idParaMostrar + " não foi encontrada!");
    }
};

document.addEventListener("DOMContentLoaded", function() {
  window.criarInventario();
  window.categoriaId('weapon');
  window.criarBestiario();
  window.NomeMercenario();
  window.mostrarStatusTaverna();
  window.atualizarTorre();
  window.GerarMapaCompleto();
});

window.personagemIndex = 'knight';

window.PersonagensIcons = {
  "knight": { sprite: '/imagens/Characters/knight_front.png', icon: '/imagens/Sprites/cavaleiro_retrato.png' },
  "archer": { sprite: '/imagens/Characters/archer_front.png', icon: '/imagens/Sprites/archer_retrato.png'},
  "wizard": { sprite: '/imagens/Characters/wizard_front.png', icon: '/imagens/Sprites/wizard_retrato.png' }
};

window.mudarPersonagem = function(classe) {
  const personagem = { ...PersonagensIcons };
  personagemIndex = classe;
  let DivIcon = document.getElementById('CriacaoPersonagens');
  DivIcon.style.backgroundImage = `url('${personagem[classe].sprite}')`;
};

window.confirmarPersonagem = function(classe) {
  window.Player.classe = window.personagemIndex;
  console.log(personagemIndex);
  window.mudarTela('torre-tela');
  let IconPersonagem = document.getElementById('PersIdle');
  IconPersonagem.style.backgroundImage = `url('${PersonagensIcons[window.personagemIndex].sprite}')`
  document.getElementById('PersIdleTitle').innerText = personagemIndex.toUpperCase();
}