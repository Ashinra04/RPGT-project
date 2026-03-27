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