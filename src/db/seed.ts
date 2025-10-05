import { db } from "."
import { products } from "./schema"


const coffees = [
  {
    name: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    image: "https://i.imgur.com/FElDGEC.png",
    price: 7.90,
    categories: ["tradicional"],
  },
  {
    name: "Expresso Americano",   
    description: "Expresso diluído, menos intenso que o tradicional",
    image: "https://i.imgur.com/YHDATtE.png",
    price: 8.50,
    categories: ["tradicional"],
  },
  {
    name: "Expresso Cremoso",
    description: "Café expresso tradicional com espuma cremosa",
    image: "https://i.imgur.com/cSijyWG.png",
    price: 8.90,
    categories: ["tradicional"],
  },
  {
    name: "Expresso Gelado",
    description: "Bebida preparada com café expresso e cubos de gelo",
    image: "https://i.imgur.com/Z0q8LDt.png",
    price: 9.50,
    categories: ["tradicional", "gelado"],
  },
  {
    name: "Café com Leite",
    description: "Meio a meio de expresso tradicional com leite vaporizado",
    image: "https://i.imgur.com/xRXsTfC.png",
    price: 9.00,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Latte",
    description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
    image: "https://i.imgur.com/uJKzIBy.png",
    price: 9.50,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Capuccino",
    description: "Bebida com canela feita de doses iguais de café, leite e espuma",
    image: "https://i.imgur.com/F5ei6Gr.png",
    price: 10.00,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Macchiato",
    description: "Café expresso misturado com um pouco de leite quente e espuma",
    image: "https://i.imgur.com/vtMcoSb.png",
    price: 9.90,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Mocaccino",
    description: "Café expresso com calda de chocolate, pouco leite e espuma",
    image: "https://i.imgur.com/eGUWZSh.png",
    price: 12.00,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Chocolate Quente",
    description: "Bebida feita com chocolate dissolvido no leite quente e café",
    image: "https://i.imgur.com/YDqQlEf.png",
    price: 10.90,
    categories: ["especial", "com leite"],
  },
  {
    name: "Cubano",
    description: "Drink gelado de café expresso com rum, creme de leite e hortelã",
    image: "https://i.imgur.com/4Fnilod.png",
    price: 12.90,
    categories: ["especial", "alcoólico", "gelado"],
  },
  {
    name: "Havaiano",
    description: "Bebida adocicada preparada com café e leite de coco",
    image: "https://i.imgur.com/hrPW3it.png",
    price: 11.50,
    categories: ["especial"],
  },
  {
    name: "Árabe",
    description: "Bebida preparada com grãos de café árabe e especiarias",
    image: "https://i.imgur.com/0Gloqhp.png",
    price: 14.00,
    categories: ["especial"],
  },
  {
    name: "Irlandês",
    description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
    image: "https://i.imgur.com/jraV2MP.png",
    price: 15.90,
    categories: ["especial", "alcoólico"],
  },
]

async function seed() {
  try {
    // limpa os produtos antigos (opcional)
    await db.delete(products)

    // insere os cafés fixos
    await db.insert(products).values(coffees)

    console.log("✅ Seed executado com sucesso!")
  } catch (err) {
    console.error("❌ Erro no seed:", err)
  }
}

seed()
