window.ClassesStatus = {
  knight: { HP: 60, HPMAX: 60, mana: 4, manaMAX: 4, ATK: 8, DEF: 10, FOR: 5, INT: 1, END: 2, DEX: 1, },
  archer: { HP: 40, HPMAX: 40, mana: 7, manaMAX: 7, ATK: 6, DEF: 6, FOR: 1, INT: 3, END: 8, DEX: 7,  },
  wizard: { HP: 30, HPMAX: 30, mana: 10, manaMAX: 10, ATK: 4, DEF: 4, FOR: 1, INT: 10, END: 3, DEX: 4, }
}
window.StatusPlayer = {
  Player: { HP: '', HPMAX: '', mana: '', manaMAX: '', ATK: '', DEF: '', FOR: '', END: '', DEX: '', }
}

const Slots = [
  'weapon',
  'secondmao',
  'helmet',
  'armor',
  'pants',
  'boots',
  'ring',
  'amulet'
];

window.GerarPerfilE = function() {
  const PlayerPerfilIcon = document.getElementById('perfilPlayer');
  const PlayerAliado1Icon = document.getElementById('perfilAliado1');
  const PlayerAliado2Icon = document.getElementById('perfilAliado2');
  PlayerAliado1Icon.style.backgroundImage = "url('/imagens/Sprites/wizard_retrato.png')";
  PlayerAliado2Icon.style.backgroundImage = "url('/imagens/Sprites/wizard_retrato.png')";
  
  PlayerPerfilIcon.style.backgroundImage = `url('${PersonagensIcons[personagemIndex].icon}')`;
}

window.EquiparGears = function() {
  Slots.forEach(function(slotName) {
    let idElemento = slotName + 'GEAR';
    let slotElement = document.getElementById(idElemento);
    
    if (slotElement) {
      let imagem = window.GearsEquipados[slotName];
      if (imagem) {
        slotElement.style.backgroundImage = `url('/imagens/Forja/${imagem}.png')`;
      } else {
        slotElement.style.backgroundImage = '';
      }
    }
  });
}

window.MudarStatus = function() {
  const HPFILL = document.getElementById('HpFillDiv');
  const manaFILL = document.getElementById('ManaFillDiv');
  HPFILL.innerText = window.StatusPlayer.Player.HP + '/' + window.StatusPlayer.Player.HPMAX;
  manaFILL.innerText = window.StatusPlayer.Player.mana + '/' + window.StatusPlayer.Player.manaMAX;
  
  const status = [ 'ATK', 'DEF', 'END', 'FOR', 'INT', 'DEX', ]
  
  status.forEach(function(statusName) {
    let idElemento = statusName + 'status';
    let statusElement = document.getElementById(idElemento);
    if(statusElement) {
      statusElement.innerText = '';
      statusElement.innerText = `${statusName}: ${window.StatusPlayer.Player[statusName]}`;
    }
  });
}

window.confirmarSatusPlayer = function() {
  let classePlayer = window.personagemIndex;
  if(classePlayer) {
    Object.assign(window.StatusPlayer.Player, window.ClassesStatus[classePlayer]);
  }
}

window.FuncoesPerfil = function() {
  MudarStatus();
  EquiparGears();
  GerarPerfilE();
}

window.botoesPerfil = function(SalaPerfil) {
  if(SalaPerfil === 'HOME') {
    document.getElementById('sairHome').classList.remove('oculto')
    document.getElementById('sairSalas').classList.add('oculto')
  }
  else  {
    document.getElementById('sairSalas').classList.remove('oculto')
    document.getElementById('sairHome').classList.add('oculto')
  }
}