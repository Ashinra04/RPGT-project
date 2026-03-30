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

const CLASSEMercenarios = {
  Masculino: {
    druid: '/imagens/Mercenários/druid.png',
    wizard:'/imagens/Mercenários/wizard.png',
    warrior:'/imagens/Mercenários/swordsman.png'
  },
  Feminino: {
    mage: '/imagens/Mercenários/magician.png',
    assasin: '/imagens/Mercenários/assasin.png',
    samurai:'/imagens/Mercenários/samurai.png'
  }
}

let Mercenarios = {
  mercenario1: { nome: "random", classe: "random", foto: "", nvl: 1, HP: 1, mana: 1, Ataque: 1 },
  mercenario2: { nome: "random", classe: "random", foto: "", nvl: 1, HP: 1, mana: 1, Ataque: 1 },
  mercenario3: { nome: "random", classe: "random", foto: "", nvl: 1, HP: 1, mana: 1, Ataque: 1 },
  mercenario4: { nome: "random", classe: "random", foto: "", nvl: 1, HP: 1, mana: 1, Ataque: 1 }
}

let MeuGrupo = {
  slot1: null,
  slot2: null
};

let mercenarioSelecionadoId = null;

window.NomeMercenario = function() {

  const listaFeminina = Object.values(NOMEMercenarios.Feminino).sort(() => 0.5 - Math.random());
  const listaMasculina = Object.values(NOMEMercenarios.Masculino).sort(() => 0.5 - Math.random());

  const classesFem = Object.keys(CLASSEMercenarios.Feminino).sort(() => 0.5 - Math.random());
  const classesMasc = Object.keys(CLASSEMercenarios.Masculino).sort(() => 0.5 - Math.random());

  // Salva os Nomes
  Mercenarios.mercenario1.nome = listaFeminina[0];
  Mercenarios.mercenario2.nome = listaFeminina[1];
  Mercenarios.mercenario3.nome = listaMasculina[0];
  Mercenarios.mercenario4.nome = listaMasculina[1];

  // Salva as Classes e as Fotos correspondentes no objeto JS
  Mercenarios.mercenario1.classe = classesFem[0];
  Mercenarios.mercenario1.foto = CLASSEMercenarios.Feminino[classesFem[0]];

  Mercenarios.mercenario2.classe = classesFem[1];
  Mercenarios.mercenario2.foto = CLASSEMercenarios.Feminino[classesFem[1]];

  Mercenarios.mercenario3.classe = classesMasc[0];
  Mercenarios.mercenario3.foto = CLASSEMercenarios.Masculino[classesMasc[0]];

  Mercenarios.mercenario4.classe = classesMasc[1];
  Mercenarios.mercenario4.foto = CLASSEMercenarios.Masculino[classesMasc[1]];

  // SISTEMA DE STATUS E ATUALIZAÇÃO DOS SLOTS DO HTML!
  for (let i = 1; i <= 4; i++) {
    let idDados = "mercenario" + i; // ID usado no objeto JS (minúsculo)
    let merc = Mercenarios[idDados];
    
    // 1. Roleta o Nível
    merc.nvl = Math.floor(Math.random() * 10) + 1;

    // 2. Define os Status baseados na classe sorteada
    if (merc.classe === "samurai" || merc.classe === "warrior") {
      merc.HP = Math.floor(Math.random() * 40) + 80;   
      merc.mana = Math.floor(Math.random() * 20) + 10; 
      merc.Ataque = Math.floor(Math.random() * 10) + 10; 
    } 
    else if (merc.classe === "mage" || merc.classe === "wizard") {
      merc.HP = Math.floor(Math.random() * 30) + 40;   
      merc.mana = Math.floor(Math.random() * 40) + 80; 
      merc.Ataque = Math.floor(Math.random() * 10) + 10; 
    } 
    else if (merc.classe === "assasin" || merc.classe === "druid") {
      merc.HP = Math.floor(Math.random() * 30) + 60;   
      merc.mana = Math.floor(Math.random() * 30) + 40; 
      merc.Ataque = Math.floor(Math.random() * 15) + 20; 
    }

    // --- NOVO: TACA A FOTO NO SLOT DO HTML ---
    // No HTML, as IDs são 'Mercenario1', 'Mercenario2', etc. (com M maiúsculo).
    // Usamos o i do loop para pegar a ID certa.
    let idHTML = "Mercenario" + i; 
    
    // Pega a div e muda o estilo backgroundImage dela!
    document.getElementById(idHTML).style.backgroundImage = `url('${merc.foto}')`;
  }
  
  // Atualiza o perfil visualmente com o primeiro mercenário
  perfilmercenario('mercenario1');
};

window.perfilmercenario = function(MercenarioId) {
  
  mercenarioSelecionadoId = MercenarioId;
  
  let mercEscolhido = Mercenarios[MercenarioId];
  let classeBonita = mercEscolhido.classe.charAt(0).toUpperCase() + mercEscolhido.classe.slice(1);
  
  document.getElementById('NOMEMercenario').innerText = "NOME: " + mercEscolhido.nome;
  document.getElementById('CLASSEMercenario').innerText = "CLASSE: " + classeBonita + " | NVL: " + mercEscolhido.nvl;
  document.getElementById('HPMercenario').innerText = "HP: " + mercEscolhido.HP;
  document.getElementById('MANAMercenario').innerText = "MANA: " + mercEscolhido.mana;
  document.getElementById('DANOMercenario').innerText = "DANO: " + mercEscolhido.Ataque;

  document.getElementById('IconMercenario').style.backgroundImage = `url('${mercEscolhido.foto}')`;
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

window.mudarMBody = function (idDaTelaAlvo) {
    const Mbodys = document.querySelectorAll('.Mbody');
    
    Mbodys.forEach(tela => tela.classList.add('oculto'));

    const proximoMbody = document.getElementById(idDaTelaAlvo);
  
    if (proximoMbody) {
        proximoMbody.classList.remove('oculto');
    } else {
        console.error("A tela " + idDaTelaAlvo + " não foi encontrada!");
    }
}

window.contratarMercenario = function() {
  
  if (mercenarioSelecionadoId === null) {
    alert("Clique em um mercenário na lista primeiro!");
    return;
  }

  let mercEscolhido = Mercenarios[mercenarioSelecionadoId];
  let precoContrato = 100; // <--- O PREÇO DO MERCENÁRIO

  // 1. O LEÃO DA RECEITA FEDERAL: Verifica se o jogador tem a grana!
  if (Player.ouro < precoContrato) {
    alert("Você não tem Ouro suficiente! Um contrato custa " + precoContrato + " moedas.");
    return; // Barra a contratação aqui se for pobre
  }

  if ((MeuGrupo.slot1 && MeuGrupo.slot1.nome === mercEscolhido.nome) || 
      (MeuGrupo.slot2 && MeuGrupo.slot2.nome === mercEscolhido.nome)) {
    alert("Você já contratou " + mercEscolhido.nome + "!");
    return;
  }

  if (MeuGrupo.slot1 === null) {
    MeuGrupo.slot1 = { ...mercEscolhido }; 
    Player.ouro -= precoContrato; // <--- DESCONTA O OURO
    alert(mercEscolhido.nome + " contratado (Vaga 1)! -" + precoContrato + " Ouro. (Saldo: " + Player.ouro + ")");
  } 

  else if (MeuGrupo.slot2 === null) {
    MeuGrupo.slot2 = { ...mercEscolhido }; 
    Player.ouro -= precoContrato; // <--- DESCONTA O OURO
    alert(mercEscolhido.nome + " contratado (Vaga 2)! -" + precoContrato + " Ouro. (Saldo: " + Player.ouro + ")");
  } 
  
  else {
    alert("Seu grupo já está cheio! Você precisa expulsar alguém primeiro.");
    return; 
  }

  mercenarioSelecionadoId = null;
  atualizarTelaGrupo(); 
  
  mostrarStatusTaverna();
};

window.atualizarTelaGrupo = function() {
  
  // VERIFICA O SLOT 1
  if (MeuGrupo.slot1 !== null) {
    let m1 = MeuGrupo.slot1;
    let classeBonita = m1.classe.charAt(0).toUpperCase() + m1.classe.slice(1);

    document.getElementById('M1-Nome').innerText = "Nome: " + m1.nome;
    document.getElementById('M1-Classe').innerText = "Classe: " + classeBonita;
    document.getElementById('M1-Nivel').innerText = "Nível: " + m1.nvl;
    document.getElementById('M1-HP').innerText = "HP: " + m1.HP;
    document.getElementById('M1-Mana').innerText = "Mana: " + m1.mana;
    document.getElementById('M1-Ataque').innerText = "Ataque: " + m1.Ataque;
    document.getElementById('M1-Def').innerText = "Defesa: 3"; 
    document.getElementById('IconM1').style.backgroundImage = `url('${m1.foto}')`;
  }

  // VERIFICA O SLOT 2
  if (MeuGrupo.slot2 !== null) {
    let m2 = MeuGrupo.slot2;
    let classeBonita = m2.classe.charAt(0).toUpperCase() + m2.classe.slice(1);

    document.getElementById('M2-Nome').innerText = "Nome: " + m2.nome;
    document.getElementById('M2-Classe').innerText = "Classe: " + classeBonita;
    document.getElementById('M2-Nivel').innerText = "Nível: " + m2.nvl;
    document.getElementById('M2-HP').innerText = "HP: " + m2.HP;
    document.getElementById('M2-Mana').innerText = "Mana: " + m2.mana;
    document.getElementById('M2-Ataque').innerText = "Ataque: " + m2.Ataque;
    
    document.getElementById('M2-Def').innerText = "Defesa: 3"; 
    document.getElementById('IconM2').style.backgroundImage = `url('${m2.foto}')`;
  }
}

window.expulsarMercenario = function(numeroDoSlot) {
  
  // SE O JOGADOR APERTOU PARA EXPULSAR O MERCENÁRIO 1
  if (numeroDoSlot === 1) {
    // Verifica se tem alguém lá antes de expulsar
    if (MeuGrupo.slot1 === null) {
      alert("Já está vazio!");
      return;
    }
    
    let nomeExpulso = MeuGrupo.slot1.nome;
    MeuGrupo.slot1 = null; 

    // Limpa a tela (apaga os status e tira a foto)
    document.getElementById('M1-Nome').innerText = "Nome: ";
    document.getElementById('M1-Classe').innerText = "Classe: ";
    document.getElementById('M1-Nivel').innerText = "Nível: ";
    document.getElementById('M1-HP').innerText = "HP: ";
    document.getElementById('M1-Mana').innerText = "Mana: ";
    document.getElementById('M1-Ataque').innerText = "Ataque: ";
    document.getElementById('M1-Def').innerText = "Defesa: ";
    document.getElementById('IconM1').style.backgroundImage = "none"; // Remove a foto
    
    alert(nomeExpulso + " foi expulso do grupo!");
  } 
  
  // SE O JOGADOR APERTOU PARA EXPULSAR O MERCENÁRIO 2
  else if (numeroDoSlot === 2) {
    // Verifica se tem alguém lá
    if (MeuGrupo.slot2 === null) {
      alert("Já está vazio!");
      return;
    }
    
    let nomeExpulso = MeuGrupo.slot2.nome;
    MeuGrupo.slot2 = null; 

    document.getElementById('M2-Nome').innerText = "Nome: ";
    document.getElementById('M2-Classe').innerText = "Classe: ";
    document.getElementById('M2-Nivel').innerText = "Nível: ";
    document.getElementById('M2-HP').innerText = "HP: ";
    document.getElementById('M2-Mana').innerText = "Mana: ";
    document.getElementById('M2-Ataque').innerText = "Ataque: ";
    document.getElementById('M2-Def').innerText = "Defesa: ";
    document.getElementById('IconM2').style.backgroundImage = "none"; 
    
    alert(nomeExpulso + " foi expulso do grupo!");
  }
};