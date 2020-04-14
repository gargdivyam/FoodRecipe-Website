import React,{useState, useEffect} from 'react';
import Recipe from "./Recipe";
import "./App.css";


const App = () =>{
   const APP_ID = "90352494";
    const APP_KEY = "f95c0d353469bc577382b9680935ea0c";


    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("cake");


useEffect(()=>{
   getRecipes();

},[query]);

const getRecipes = async () =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);



    //  fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`)
    //  .then(Response => Response.json())
    //  .then(json => console.log(json));


};
const updateSearch = e =>{
    setSearch(e.target.value);
}

const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
  return(
    <div className="App">
       <form onSubmit={getSearch} className="searc-from">
         <input className="search-bar" type="text" value={search} onChange={updateSearch} />
         <button className="search-button" 
         type="submit">
           Search
           </button>
       </form>
         <div className="recipes">
         {recipes.map(recipe =>(
         <Recipe 
         key={recipe.recipe.label}
         title={recipe.recipe.label}
         calories={recipe.recipe.calories}
         image={recipe.recipe.image}
         ingredients={recipe.recipe.ingredients}
         />
       ))}
         </div>
    </div>
  );
}
  

export default App;
