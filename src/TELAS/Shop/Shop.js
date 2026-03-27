// A lista de itens com os atributos deles
const ItemsLoja = {
    "Potion": { nome: "Potion", hp: 30 },
    "Potionx2": { nome: "Potionx2", hp: 50 },
    "Energy": { nome: "Energy", mp: 30 },
    "Energyx2": { nome: "Energyx2", mp: 50 },
    "Elixir": { nome: "Elixir", hp: "max", mp: "max" },
    "Full heal": { nome: "Full heal", hp: "max" },
    "Poisonp": { nome: "Poisonp", poison: 30 },
    "FreezeP": { nome: "FreezeP", freeze: 50 },
    "FireP": { nome: "FireP", fire: 30 },
    "ElectricP": { nome: "ElectricP", electric: 50 },
    "Antidote": { nome: "Antidote" },
    "Revive": { nome: "Revive" },
    "Torch": { nome: "Torch" },
    "DeathP": { nome:"Death potion" }
};

// Se isso era o inventário do jogador, mude o nome da variável para não repetir
let InventarioJogador = {
    "Potion": 0,
    "Potionx2": 0,
    "Energy": 0,
    "Energyx2": 0,
    "Elixir": 0,
    "Full heal": 0, // Aspas adicionadas aqui
    "Poisonp": 0,
    "FreezeP": 0,
    "FireP": 0,
    "ElectricP": 0,
    "Antidote": 0,
    "Revive": 0,
    "Torch": 0,
    "DeathP": 0
};

// Correção dos parênteses na função
window.comprarItem = function () {
    console.log("Comprando item...");
};

window.mudarItem = function (Item) {
    console.log('Item mudado:', Item);
};