import './style.css'

import './TELAS/Shop/Shop.css';
import './TELAS/Shop/Shop.js';
import './TELAS/Forja/Forja.css';
import './TELAS/Forja/Forja.js';
import './TELAS/Taverna/Taverna.css';
import './TELAS/Taverna/Taverna.js';
import './TELAS/Guilda/Guilda.css';
import './TELAS/Guilda/Guilda.js';
import './TELAS/Batalha/Batalha.css';
import './TELAS/Batalha/Batalha.js';

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

let Inventario = {
  
}