window.ClassesStatus = {
  knight: { HP: 60, HPMAX: 60, mana: 4, manaMAX: 4, ATK: 8, DEF: 10, FOR: 5, INT: 1, AGI: 2, FAI: 0, },
  archer: { HP: 40, HPMAX: 40, mana: 7, manaMAX: 7, ATK: 6, DEF: 6, FOR: 1, INT: 3, AGI: 8, FAI: 0, },
  wizard: { HP: 30, HPMAX: 30, mana: 10, manaMAX: 10, ATK: 4, DEF: 4, FOR: 1, INT: 10, AGI: 3, FAI: 0, }
}
window.StatusPlayer = {
  Player: { HP: '', mana: '', ATK: '', DEF: '', FOR: '', INT: '', AGI: '', FAI: '', }
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

const status = [
  'ATK',
  'DEF',
  'FOR',
  'INT',
  'AGI',
  'FAI',
]

window.EquiparGears = function() {
  Slots.forEach(function(slotName) {
    let idElemento = slotName + 'GEAR';
    let slotElement = document.getElementById(idElemento);
    
    if (slotElement) {
      let imagem = window.GearsEquipados[slotName];
      if (imagem) {
        slotElement.style.backgroundImage = `url('/imagens/Forja/${imagem}')`;
      } else {
        slotElement.style.backgroundImage = '';
      }
    }
  });
}

window.MudarStatus = function() {
  const HPFILL = document.getElementById('HpFillDiv');
  const manaFILL = document.getElementById('ManaFillDiv');
  
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
    
  }
}