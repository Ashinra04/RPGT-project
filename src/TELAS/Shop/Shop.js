
let ItemSelecionado = null;

const ItemsLoja = {
    "Potion": { nome: "Potion", hp: 30, Preco: 10, descricao: "Uma poçao usada para regenerar o hp, cura 30 de HP." },
    "Potionx2": { nome: "Potionx2", hp: 50, Preco: 40, descricao: "Uma poçao melhorada, usada para regenerar o hp, cura 50 de HP." },
    "Energy": { nome: "Energy", mp: 30, Preco: 10, descricao: "Uma bebida usada para regenerar a mana, regenera 30 de mana." },
    "Energyx2": { nome: "Energyx2", mp: 50, Preco: 10, descricao: "Energy melhorada, usada para regenerar a mana, regenera 50 de mana." },
    "Elixir": { nome: "Elixir", hp: "max", mp: "max", Preco: 10, descricao: "Um Elixir que cura toda a vida e mana." },
    "Full_heal": { nome: "Full heal", hp: "max",  Preco: 10, descricao: "Uma poção usada para regenerar todo o hp, cura todo o HP." },
    "PoisonP": { nome: "Poisonp", poison: 30, Preco: 10, descricao: "Usar esse item adiciona dano elemental de veneno no turno." },
    "FreezeP": { nome: "FreezeP", freeze: 50, Preco: 10, descricao: "Usar esse item adiciona dano elemental de gelo no turno." },
    "FireP": { nome: "FireP", fire: 30, Preco: 10, descricao: "Usar esse item adiciona dano elemental de fogo no turno." },
    "ElectricP": { nome: "ElectricP", electric: 50, Preco: 10, descricao: "Usar esse item adiciona dano elemental eletrico no turno." },
    "Antidote": { nome: "Antidote", Preco: 10, descricao: "Uma poção usada para limpar o status de envenenado." },
    "Revive": { nome: "Revive", Preco: 10, descricao: "Um item capaz de reviver aliados mortos fora e dentro de combate." },
    "Torch": { nome: "Torch", Preco: 5, descricao: "Uma ferramenta capaz de afastar a escuridão." },
    "DeathP": { nome:"Death potion", Preco: 0, descricao: "Uma poçáo que contem a essencia da morte, usar esse item te mata." }
};

window.mudarItem = function (idItem) {
  
  if (!window.InventarioConsumables) window.InventarioConsumables = { consumables: {} };
  
  if (typeof window.goldPlayer === 'undefined') window.goldPlayer = 0;

  const imagemDoItem = document.querySelector('#ITEM-Icon img');
  const itemEscolhido = ItemsLoja[idItem];
  
  if (itemEscolhido) {
    imagemDoItem.src = window.BancoDeimgDosItems.consumables[idItem];
    document.getElementById('NOMEdoITEM').innerText = itemEscolhido.nome;
    document.getElementById('ITEMDescricao').innerText = itemEscolhido.descricao;
    
    const quantidadeAtual = window.InventarioConsumables.consumables[idItem] || 0;
    document.getElementById('QUANTIDADEPlayer').innerText = "Você tem: " + quantidadeAtual;
    
    document.getElementById('coinPlayer').innerText = "🪙 " + window.goldPlayer;
    document.getElementById('PrecoItem').innerText = "Preço:  " + itemEscolhido.Preco;
  } else {
    console.error("Erro: O item " + idItem + " não existe no objeto ItemsLoja.");
  }
  
  ItemSelecionado = idItem;
};

window.comprarPotion = function () {
  if (!window.InventarioConsumables) window.InventarioConsumables = { consumables: {} };
  if (typeof window.goldPlayer === 'undefined') window.goldPlayer = 0;
  
  if (ItemSelecionado === null) {
    alert("Selecione um item primeiro!");
    return;
  }
  
  const ItemPreco = ItemsLoja[ItemSelecionado].Preco;
  
  if(window.goldPlayer >= ItemPreco) {

    window.goldPlayer -= ItemPreco;
    
    window.InventarioConsumables.consumables[ItemSelecionado] = (window.InventarioConsumables.consumables[ItemSelecionado] || 0) + 1;

  
    document.getElementById('coinPlayer').innerText = "🪙 " + window.goldPlayer;
    document.getElementById('QUANTIDADEPlayer').innerText = "Você tem: " + window.InventarioConsumables.consumables[ItemSelecionado];
    
  } else {
    alert("Ouro insuficiente para comprar " + ItemSelecionado + "!");
  }
};