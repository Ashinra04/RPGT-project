// A lista de itens com os atributos deles

let InventarioJogador = {
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

let goldPlayer = 150;
let ItemSelecinado = null;

const ItemsLoja = {
    "Potion": { nome: "Potion", hp: 30, icon: '/imagens/Items/Potion.png', Preco: 10, descricao: "Uma poçao usada para regenerar o hp, cura 30 de HP" },
    "Potionx2": { nome: "Potionx2", hp: 50, icon: '/imagens/Items/Potionx2.png', Preco: 40, descricao: "Uma poçao evoluida da poção base, usada para regenerar o hp, cura 50 de HP" },
    "Energy": { nome: "Energy", mp: 30, icon: '/imagens/Items/Energy.png', Preco: 10, descricao: "Uma bebida usada para regenerar a mana, regenera 30 de mana" },
    "Energyx2": { nome: "Energyx2", mp: 50, icon: '/imagens/Items/Energyx2.png', Preco: 10, descricao: "Uma poçao evoluida da energy base, usada para regenerar a mana, regenera 50 de mana" },
    "Elixir": { nome: "Elixir", hp: "max", mp: "max", icon: '/imagens/Items/Elixir.png', Preco: 10, descricao: "Um Elixir conhecida regera ate membros decepados, cura toda a vida e mana" },
    "Full_heal": { nome: "Full heal", hp: "max", icon: '/imagens/Items/Full heal.png', Preco: 10, descricao: "O conceito de perfeição, uma poção usada para regenerar todo o hp, cura todo o HP" },
    "PoisonP": { nome: "Poisonp", poison: 30, icon: '/imagens/Items/PoisonP.png', Preco: 10, descricao: "Uma poção que contem essencia de veneno, usar esse item adiciona dano elemental de veneno no turno" },
    "FreezeP": { nome: "FreezeP", freeze: 50, icon: '/imagens/Items/FreezeP.png', Preco: 10, descricao: "Uma poção que contem essencia de gelo, usar esse item adiciona dano elemental de gelo no turno" },
    "FireP": { nome: "FireP", fire: 30, icon: '/imagens/Items/FireP.png', Preco: 10, descricao: "Uma poção que contem essencia de fogo, usar esse item adiciona dano elemental de fogo no turno" },
    "ElectricP": { nome: "ElectricP", electric: 50, icon: '/imagens/Items/ElectricP.png', Preco: 10, descricao: "Uma poção que contem essencia de trovão, usar esse item adiciona dano elemental eletrico no turno" },
    "Antidote": { nome: "Antidote", icon: '/imagens/Items/Antidote.png', Preco: 10, descricao: "Uma poção usada para limpar o veneno do corpo, usar esse item tira o status de envenenado" },
    "Revive": { nome: "Revive", icon: '/imagens/Items/Revive.png', Preco: 10, descricao: "Use esse item para reviver um aliado em batalha, pode ser usada fora de combate tambem" },
    "Torch": { nome: "Torch", icon: '/imagens/Items/Torch.png', Preco: 5, descricao: "Para vencer os espiritos da escuridao, usa-se fogo, uma ferramenta usada para afastar a escuridão" },
    "DeathP": { nome:"Death potion", icon: '/imagens/Items/Death potion.png', Preco: 0, descricao: "Uma poçáo que contem a essencia da morte, usar esse item te mata, use quando a situaçao for dificil" }
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
  } else {
    console.error("Erro: O item " + idItem + " não existe no objeto ItemsLoja.");
  }
  
  itemSelecionado = idItem;
};

window.comprarItem = function () {
  if (itemSelecionado === null) {
    alert("Selecione um item primeiro!");
    return;
  }

  const item = ItemsLoja[itemSelecionado];


  if (goldPlayer >= item.preco) {
    
    goldPlayer -= item.preco;
    InventarioJogador[itemSelecionado] += 1;
    
    document.getElementById('quantidadePlayer').innerText = "Você tem: " + InventarioJogador[itemSelecionado];
    
    console.log(`Você comprou ${item.nome}. Ouro restante: ${ouroJogador}`);
    
  } else {
    
    alert("Ouro insuficiente para comprar " + item.nome + "!");
  }
  alert('ta fufando')
};