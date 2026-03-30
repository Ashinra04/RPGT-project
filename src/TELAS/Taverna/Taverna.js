let Player = {
  nome: "jogador",
  nvl: 1,
  HP: 90,
  HPMAX: 100,
  mana: 29,
  manaMAX: 40,
  Ataque: 10,
  def: 3,
}

const NOMEMercenarios = {
  Feminino: {
    nome1: "Elara", nome2: "Isolde", nome3: "Maeve", nome4: "Rowena", nome5: "Lyra",
    nome6: "Vanya", nome7: "Astrid", nome8: "Thalia", nome9: "Morgana", nome10: "Seraphina"
  },
  
  Masculino:  {
    nome1: "Aldric", nome2: "Kael", nome3: "Varen", nome4: "Balthazar", nome5: "Gareth",
    nome6: "Rurik", nome7: "Darian", nome8: "Thorne", nome9: "Eamon", nome10: "Silas"
  }
}

let Mercenarios = {
  mercenario1: {
    nome: 'masc1', classe: "random", nvl: "random",
    HP: "random", HPMAX: "random", Ataque: "random",
    mana: "random", manaMAX: "random", def: "random"
  },
  mercenario2: {
    nome: "random", classe: "random", nvl: "random",
    HP: "random", HPMAX: "random", Ataque: "random",
    mana: "random", manaMAX: "random", def: "random"
  },
  mercenario3: {
    nome: "random", classe: "random", nvl: "random",
    HP: "random", HPMAX: "random", Ataque: "random",
    mana: "random", manaMAX: "random", def: "random"
  },
  mercenario4: {
    nome: "random", classe: "random", nvl: "random",
    HP: "random", HPMAX: "random", Ataque: "random",
    mana: "random", manaMAX: "random", def: "random"
  }
}

window.NomeMercenario = function() {
  const listaFeminina = Object.values(NOMEMercenarios.Feminino);
  const listaMasculina = Object.values(NOMEMercenarios.Masculino);

  const femEmbaralhadas = listaFeminina.sort(() => 0.5 - Math.random());
  const mascEmbaralhados = listaMasculina.sort(() => 0.5 - Math.random());

  Mercenarios.mercenario1.nome = femEmbaralhadas[0];
  Mercenarios.mercenario2.nome = femEmbaralhadas[1];
  Mercenarios.mercenario3.nome = mascEmbaralhados[0];
  Mercenarios.mercenario4.nome = mascEmbaralhados[1];

  for (let i = 1; i <= 4; i++) {
    let id = "mercenario" + i;
    Mercenarios[id].nvl = Math.floor(Math.random() * 10) + 1;
    Mercenarios[id].HP = Math.floor(Math.random() * 50) + 50;
    Mercenarios[id].mana = Math.floor(Math.random() * 30) + 10;
    Mercenarios[id].Ataque = Math.floor(Math.random() * 15) + 5;
  }
  
  perfilmercenario('mercenario1');
};

window.perfilmercenario = function(MercenarioId) {
  
  let mercEscolhido = Mercenarios[MercenarioId];
  document.getElementById('NOMEMercenario').innerText = "NOME: " + mercEscolhido.nome;
  document.getElementById('CLASSEMercenario').innerText = "NIVEL: " + mercEscolhido.nvl;
  document.getElementById('HPMercenario').innerText = "HP: " + mercEscolhido.HP;
  document.getElementById('MANAMercenario').innerText = "MANA: " + mercEscolhido.mana;
  document.getElementById('DANOMercenario').innerText = "DANO: " + mercEscolhido.Ataque;
};

window.mostrarStatusTaverna = function() {
  
  document.getElementById('playerN').innerText = Player.nome;
  document.getElementById('playerNVL').innerText = "Level: " + Player.nvl;
  document.getElementById('playerHP').innerText = "HP: " +  Player.HP + "/" + Player.HPMAX;
  document.getElementById('playerMANA').innerText = "MANA: " + Player.mana + "/" + Player.manaMAX;
};

window.Descansar = function() {
  Player.HP = Player.HPMAX;
  Player.mana = Player.manaMAX;
  document.getElementById('playerHP').innerText = "HP: " +  Player.HP + "/" + Player.HPMAX;
  document.getElementById('playerMANA').innerText = "MANA: " + Player.mana + "/" + Player.manaMAX;
}