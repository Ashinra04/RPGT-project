// A lista de itens com os atributos deles

window.InventarioJogador = {
    "Potion": 3,
    "Potionx2": 0,
    "Energy": 2,
    "Energyx2": 0,
    "Elixir": 0,
    "Full_heal": 0,
    "PoisonP": 0,
    "FreezeP": 0,
    "FireP": 0,
    "ElectricP": 0,
    "Antidote": 0,
    "Revive": 0,
    "Torch": 0,
    "DeathP": 0
};

let goldPlayer = 120;
let ItemSelecionado = null;

const ItemsLoja = {
    "Potion": { nome: "Potion", hp: 30, icon: '/imagens/Items/Potion.png', Preco: 10, descricao: "Uma poçao usada para regenerar o hp, cura 30 de HP." },
    "Potionx2": { nome: "Potionx2", hp: 50, icon: '/imagens/Items/Potionx2.png', Preco: 40, descricao: "Uma poçao melhorada, usada para regenerar o hp, cura 50 de HP." },
    "Energy": { nome: "Energy", mp: 30, icon: '/imagens/Items/Energy.png', Preco: 10, descricao: "Uma bebida usada para regenerar a mana, regenera 30 de mana." },
    "Energyx2": { nome: "Energyx2", mp: 50, icon: '/imagens/Items/Energyx2.png', Preco: 10, descricao: "Energy melhorada, usada para regenerar a mana, regenera 50 de mana." },
    "Elixir": { nome: "Elixir", hp: "max", mp: "max", icon: '/imagens/Items/Elixir.png', Preco: 10, descricao: "Um Elixir que cura toda a vida e mana." },
    "Full_heal": { nome: "Full heal", hp: "max", icon: '/imagens/Items/Full heal.png', Preco: 10, descricao: "Uma poção usada para regenerar todo o hp, cura todo o HP." },
    "PoisonP": { nome: "Poisonp", poison: 30, icon: '/imagens/Items/PoisonP.png', Preco: 10, descricao: "Usar esse item adiciona dano elemental de veneno no turno." },
    "FreezeP": { nome: "FreezeP", freeze: 50, icon: '/imagens/Items/FreezeP.png', Preco: 10, descricao: "Usar esse item adiciona dano elemental de gelo no turno." },
    "FireP": { nome: "FireP", fire: 30, icon: '/imagens/Items/FireP.png', Preco: 10, descricao: "Usar esse item adiciona dano elemental de fogo no turno." },
    "ElectricP": { nome: "ElectricP", electric: 50, icon: '/imagens/Items/ElectricP.png', Preco: 10, descricao: "Usar esse item adiciona dano elemental eletrico no turno." },
    "Antidote": { nome: "Antidote", icon: '/imagens/Items/Antidote.png', Preco: 10, descricao: "Uma poção usada para limpar o status de envenenado." },
    "Revive": { nome: "Revive", icon: '/imagens/Items/Revive.png', Preco: 10, descricao: "Um item capaz de reviver aliados mortos fora e dentro de combate." },
    "Torch": { nome: "Torch", icon: '/imagens/Items/Torch.png', Preco: 5, descricao: "Uma ferramenta capaz de afastar a escuridão." },
    "DeathP": { nome:"Death potion", icon: '/imagens/Items/Death potion.png', Preco: 0, descricao: "Uma poçáo que contem a essencia da morte, usar esse item te mata." }
};

window.mudarItem = function (idItem) {

  const imagemDoItem = document.querySelector('#ITEM-Icon img');
  const itemEscolhido = ItemsLoja[idItem];
  const quantidadeAtual = InventarioJogador[idItem];
  
  if (itemEscolhido) {
    imagemDoItem.src = itemEscolhido.icon;
    document.getElementById('NOMEdoITEM').innerText = itemEscolhido.nome;
    document.getElementById('ITEMDescricao').innerText = itemEscolhido.descricao;
    document.getElementById('QUANTIDADEPlayer').innerText = "Você tem: " + InventarioJogador[idItem];
    document.getElementById('coinPlayer').innerText = "🪙 " + goldPlayer;
    document.getElementById('PrecoItem').innerText = "Preço:  " + ItemsLoja[idItem].Preco;
  } else {
    console.error("Erro: O item " + idItem + " não existe no objeto ItemsLoja.");
  }
  
  ItemSelecionado = idItem;
};

window.comprarItem = function () {
  
  const ItemComprar = ItemSelecionado;
  const ItemPreco = ItemsLoja[ItemComprar].Preco;
  
  if (ItemSelecionado === null) {
    alert("Selecione um item primeiro!");
    return;
  }
  
  if(goldPlayer >= ItemPreco) {
    goldPlayer -= ItemPreco;
    InventarioJogador[ItemComprar] += 1;
    document.getElementById('coinPlayer').innerText = "🪙 " + goldPlayer;
    document.getElementById('QUANTIDADEPlayer').innerText = "Você tem: " + InventarioJogador[ItemComprar];
  } else {
    alert("Ouro insuficiente para comprar " + ItemComprar + "!");
  }
};