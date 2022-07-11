import React, { useEffect, useState } from 'react'
import { Game } from './components/Game'
import { CategorySelect } from './components/CategorySelect'
import axios from 'axios'
import './App.css'

function App() {
  const [games, setGames] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCatergory] = useState('')

  useEffect( () => {
    getGames()
  }, [])

  const getGames = async () => {
    const results = await axios(
      'https://run.mocky.io/v3/0f89d26e-25e6-4fdd-ac35-a847ad4352c6',
    )

    setGames(results.data);
    mapCategories(results.data)
  } 

  const mapCategories = results => {
    const categoryList = results && results.length && results.map(game => {
      const newCategories = []
      game.categories.forEach(category => {
          newCategories.push(category)
      })
      return newCategories
    }
     )
     const flattenCategories = () => [...new Set(categoryList.flat())];
    setCategories(flattenCategories())
  }
  
  const categorizedGames = games.filter(game => selectedCategory ? game?.categories?.includes(selectedCategory) : game)
  const filteredGames = categorizedGames.filter(game =>  game?.gameName?.toLowerCase().includes(searchTerm))

  return (
    <div className="App">
      <input
        className='search'
        placeholder='Search...'
        onChange={e => setSearchTerm(e.target.value.toLowerCase())}/>
      <CategorySelect 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onChange={(cat) => setSelectedCatergory(cat)}/>
      <div className='gameContainer'>
        {filteredGames && filteredGames.length && filteredGames.map((game, index) =>
          <Game key={index} game={game} />)}
      </div>
    </div>
  );
}

export default App;
