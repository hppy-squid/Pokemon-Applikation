// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
    
//     <h1>Hello Vite!</h1>
    
     
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

fetch("https://pokeapi.co/api/v2/pokemon/ditto")
.then(response => console.log(response))
.catch(error => console.log(error));
