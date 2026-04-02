// CSS DAS TELAS

import './style.css'
import './TELAS/Shop/Shop.css';
import './TELAS/Forja/Forja.css';
import './TELAS/Taverna/Taverna.css';
import './TELAS/Guilda/Guilda.css';
import './TELAS/Batalha/Batalha.css';
import './TELAS/Inventário/Inventario.css';

// JS DAS TELAS
import './TELAS/Shop/Shop.js';
import './TELAS/Forja/Forja.js';
import './TELAS/Taverna/Taverna.js';
import './TELAS/Guilda/Guilda.js';
import './TELAS/Batalha/Batalha.js';
import './TELAS/Inventário/Inventario.js';

// HTML DAS TELAS
import shopHtml from './TELAS/Shop/Shop.html?raw';
import guildHtml from './TELAS/Guilda/Guilda.html?raw';
import tavernHtml from './TELAS/Taverna/Taverna.html?raw';
import forjaHtml from './TELAS/Forja/Forja.html?raw';
import batalhaHtml from './TELAS/Batalha/Batalha.html?raw';
import inventarioHtml from './TELAS/Inventário/Inventario.html?raw';
const corpoDoSite = document.body;
corpoDoSite.insertAdjacentHTML('beforeend', shopHtml);
corpoDoSite.insertAdjacentHTML('beforeend', guildHtml);
corpoDoSite.insertAdjacentHTML('beforeend', tavernHtml);
corpoDoSite.insertAdjacentHTML('beforeend', forjaHtml);
corpoDoSite.insertAdjacentHTML('beforeend', batalhaHtml);
corpoDoSite.insertAdjacentHTML('beforeend', inventarioHtml);

window.mudarTela = function (idParaMostrar) {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => tela.classList.add('oculto'));

    const proximaTela = document.getElementById(idParaMostrar);
    if (proximaTela) {
        proximaTela.classList.remove('oculto');
    } else {
        console.error("A tela " + idParaMostrar + " não foi encontrada!");
    }
}