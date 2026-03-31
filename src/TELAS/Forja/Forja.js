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
