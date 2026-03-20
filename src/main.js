import './style.css'

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