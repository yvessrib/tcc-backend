import { db } from "."
import { products } from "./schema"


const coffees = [
  {
    name: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    image: "https://drive.google.com/file/d/1gBb04sIaIzfFaJoYOkB9rOZZ1QdQpJSA/view?usp=drive_link",
    price: 7.90,
    categories: ["tradicional"],
  },
  {
    name: "Expresso Americano",
    description: "Expresso diluído, menos intenso que o tradicional",
    image: "https://drive.google.com/file/d/1_0CGbTRp30XrMfr8d2cBmhf4Fz_I1h9x/view?usp=drive_link",
    price: 8.50,
    categories: ["tradicional"],
  },
  {
    name: "Expresso Cremoso",
    description: "Café expresso tradicional com espuma cremosa",
    image: "https://drive.google.com/file/d/1MzGzlWyyip5w2RGwm4jyXe8m0j2XPOGy/view?usp=drive_link",
    price: 8.90,
    categories: ["tradicional"],
  },
  {
    name: "Expresso Gelado",
    description: "Bebida preparada com café expresso e cubos de gelo",
    image: "https://drive.google.com/file/d/1BEErZTLT3Zb2u-DvzT18abBxNjKwi7Ny/view?usp=drive_link",
    price: 9.50,
    categories: ["tradicional", "gelado"],
  },
  {
    name: "Café com Leite",
    description: "Meio a meio de expresso tradicional com leite vaporizado",
    image: "https://drive.google.com/file/d/1UGdawuqtYimsk5HbNvbCpfDfbkJJmOFY/view?usp=drive_link",
    price: 9.00,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Latte",
    description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
    image: "https://drive.google.com/file/d/1dGlMJ5V9k55ezV5da1-x9pYugmZ7ae1_/view?usp=drive_link",
    price: 9.50,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Capuccino",
    description: "Bebida com canela feita de doses iguais de café, leite e espuma",
    image: "https://drive.google.com/file/d/13XXkRT212cij6JRChXM8GfgKfwAj6zvc/view?usp=drive_link",
    price: 10.00,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Macchiato",
    description: "Café expresso misturado com um pouco de leite quente e espuma",
    image: "https://drive.google.com/file/d/1ip9ZT5PiXWsoRXwsVo66HEJmmLB6V0dq/view?usp=drive_link",
    price: 9.90,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Mocaccino",
    description: "Café expresso com calda de chocolate, pouco leite e espuma",
    image: "https://drive.google.com/file/d/1aludr-RQeC4UfmgNZiDkOPH2buC5oMWj/view?usp=drive_link",
    price: 12.00,
    categories: ["tradicional", "com leite"],
  },
  {
    name: "Chocolate Quente",
    description: "Bebida feita com chocolate dissolvido no leite quente e café",
    image: "https://drive.google.com/file/d/17C908N87WTl64Jh3Hjobgn0OmDCz_xZP/view?usp=drive_link",
    price: 10.90,
    categories: ["especial", "com leite"],
  },
  {
    name: "Cubano",
    description: "Drink gelado de café expresso com rum, creme de leite e hortelã",
    image: "https://drive.google.com/file/d/1jQ-WdMZoBCVqXLsxKqa7-m3Pv5PX483e/view?usp=drive_link",
    price: 12.90,
    categories: ["especial", "alcoólico", "gelado"],
  },
  {
    name: "Havaiano",
    description: "Bebida adocicada preparada com café e leite de coco",
    image: "https://drive.google.com/file/d/1s_rnRfIQ6mlPjZwEaQlA9yzj5JFiPd48/view?usp=drive_link",
    price: 11.50,
    categories: ["especial"],
  },
  {
    name: "Árabe",
    description: "Bebida preparada com grãos de café árabe e especiarias",
    image: "https://drive.google.com/file/d/1_4CAWhHNnoBXDKDmFNMkst47XdrxvzK0/view?usp=drive_link",
    price: 14.00,
    categories: ["especial"],
  },
  {
    name: "Irlandês",
    description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
    image: "https://drive.google.com/file/d/1gIUV-EKMCHQcFUo7Dw3aDvNduEdeBC8l/view?usp=drive_link",
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
