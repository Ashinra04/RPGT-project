window.Salas = {
  1: { tipo: "BASE", proximasSalas: [2] },
  2: { tipo: "NADA", proximasSalas: [2] },
  3: { tipo: "NADA", proximasSalas: [2] },
  4: { tipo: "NADA", proximasSalas: [2] },
  5: { tipo: "NADA", proximasSalas: [2] },
  6: { tipo: "NADA", proximasSalas: [2] },
  7: { tipo: "NADA", proximasSalas: [2] },
  8: { tipo: "BOSS", proximasSalas: [2] },
  9: { tipo: "NADA", proximasSalas: [2] },
  10: { tipo: "NADA", proximasSalas: [2] },
  11: { tipo: "NADA", proximasSalas: [2] },
  12: { tipo: "NADA", proximasSalas: [2] },
  13: { tipo: "NADA", proximasSalas: [2] },
  14: { tipo: "NADA", proximasSalas: [2] },
  15: { tipo: "NADA", proximasSalas: [2] },
  16: { tipo: "NADA", proximasSalas: [2] }
}

window.MapaLayouts = function() {
  let salaLayout = Math.floor(Math.random() * 3) + 1;
  let limiteDeSalas = 0;

  if (salaLayout === 1) {
    limiteDeSalas = 16;
  } 
  else if (salaLayout === 2) {
    limiteDeSalas = 12;
  } 
  else if (salaLayout === 3) {
    limiteDeSalas = 20;
  }

  let salas = document.querySelectorAll('.salaSlot');

  salas.forEach((salaAtual, index) => {
    
    if (index < limiteDeSalas) {
      salaAtual.id = `Sala${salaLayout}_${index + 1}`;
      salaAtual.classList.remove('oculto'); 
    } 
    else {
      
      salaAtual.id = ""; 
      salaAtual.classList.add('oculto'); 
    }
  });
}