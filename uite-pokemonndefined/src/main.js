
const pokeForm = document.querySelector(".pokeForm");
const nameInput = document.querySelector(".nameInput");
const card = document.querySelector(".card");

console.log("Form:", document.querySelector(".pokeForm"));
console.log("Name Input:", document.querySelector(".nameInput"));
console.log("Card:", document.querySelector(".card"));

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

function displayPokemonData(data){
    
   const {name: pokemonName} = data;
    console.log(data);

    card.textContent = "";
    card.style.display = "flex";

    const nameDisplay = document.createElement("h1");
    nameDisplay.textContent = pokemonName;
    card.appendChild(nameDisplay);

    
    const imgElement = document.createElement("img");
    imgElement.src = data.sprites.front_default; // Hämta bildens URL
    imgElement.alt = `${data.pokemonName} sprite`;
    imgElement.style.display = "block"; // Visa bilden

    // Lägg till bilden i kortet
    card.appendChild(imgElement);

    const catchBtn = document.createElement("button");
    catchBtn.textContent = "Lägg till i Pokedex";
    catchBtn.classList.add("catchBtn"); // Lägg till klass
    catchBtn.style.display = "block"; // Se till att den syns
   card.appendChild(catchBtn);
    }

  function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.style.color = "red";

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
  }

// const logo = document.createElement('img')
