
const pokeForm = document.querySelector(".pokeForm");
const nameInput = document.querySelector(".nameInput");
const card = document.querySelector(".card");
const pokedexContainer = document.querySelector(".pokedex-container") || document.createElement("div");
  if (!document.querySelector(".pokedex-container")) {
    pokedexContainer.classList.add("pokedex-container");
    document.body.appendChild(pokedexContainer);
  }
 
//sök efter pokemon
pokeForm.addEventListener("submit", async event => {

  event.preventDefault();

  const pokemonName = nameInput.value;

  if (pokemonName) {
    try {
      const pokemonData = await getPokemonData(pokemonName);
      displayPokemonData(pokemonData);
     
      } catch (error) {
        console.error(error);
        displayError(error);
      }
    }else {
      displayError("Felaktig inmatning");
    }
  });

  //Hämta pokemondata
async function getPokemonData(pokemonName) {

  try{

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    console.log(response);

    if(!response.ok){
      throw new Error("Fetching data failed");
    }
    return await response.json();
  }
  catch(error){
    console.error(error);
  }
  
}

//Vad som ska visas på sidan
function displayPokemonData(data){
    
   const {name: pokemonName, sprites: {front_default: imgUrl}} = data;
    console.log(data);

    card.textContent = "";
    card.style.display = "flex";

    //namn element
    const nameDisplay = document.createElement("h1");
    nameDisplay.textContent = pokemonName;
    card.appendChild(nameDisplay);

    //bild element
    const imgElement = document.createElement("img");
    imgElement.src = imgUrl; 
    imgElement.alt = `${data.pokemonName} sprite`;
    imgElement.style.display = "block"; 
    card.appendChild(imgElement);

    //spara pokemon knapp
    const catchBtn = document.createElement("button");
    catchBtn.textContent = "Spara till ditt Pokédex";
    catchBtn.classList.add("catchBtn"); // Lägg till klass
    catchBtn.style.display = "block"; // Se till att den syns
   card.appendChild(catchBtn);

    catchBtn.addEventListener("click", () => {
      addPokemonToPokedex(pokemonName, imgUrl);

      
      card.after(pokedexContainer);
  
    });
   
    }

    document.addEventListener("DOMContentLoaded", getPokedex);

    //spara pokemon till databas 
    async function addPokemonToPokedex(pokemonName, imgUrl) {
      const response = await fetch("http://localhost:8080/api/pokemon", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: pokemonName, imgUrl: imgUrl }),
      });
  
      if (!response.ok) {
          console.error("Fel vid sparning av Pokémon");
      } else {
        console.log("Pokémon sparad");
      
        getPokedex();
    }
  }
  
    //lista ut pokemons
  async function getPokedex() {
    const response = await fetch("http://localhost:8080/api/pokemon");
    const pokemonList = await response.json();

    console.log(pokemonList);

    pokedexContainer.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "Mitt Pokedéx";
    pokedexContainer.appendChild(heading);

    const list = document.createElement("ul");
    list.style.listStyle = "none";
    list.style.padding = "0";
    list.style.display = "flex";
    list.style.flexWrap = "wrap";
    list.style.justifyContent = "center";

    pokemonList.forEach(pokemon => {
      const listItem = document.createElement("li");
      listItem.style.margin = "10px";
      listItem.style.textAlign = "center";

      const img = document.createElement("img");
      img.src = pokemon.imgUrl;
      img.alt = pokemon.name;
      img.style.width = "100px";
      img.style.height = "100px";

      const name = document.createElement("p");
      name.textContent = pokemon.name;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Ta bort";
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.addEventListener("click", () => {
          deletePokemonFromPokedex(pokemon.id);
      });

      listItem.appendChild(img);
      listItem.appendChild(name);
      listItem.appendChild(deleteBtn);
      list.appendChild(listItem);
  });
  pokedexContainer.appendChild(list);

}

  //ta bort pokemon från databas
async function deletePokemonFromPokedex(pokemonId) {
  const response = await fetch(`http://localhost:8080/api/pokemon/${pokemonId}`, {
      method: "DELETE",
  });

  if (!response.ok) {
      console.error("kunde inte radera Pokémon");
  } else {
      console.log("Pokémon borttagen");
      getPokedex(); 
  }
}

  //visa felmeddelande
  function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.style.color = "red";

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
  }

