import React from 'react'
import './components.css'

const Game = ({ game }) => {
    const { gameName, gameThumbnail, slug } = game

  return (
    <div className='gameList'>
        <img alt={slug} src={gameThumbnail} className='image'/>
        {gameName}
    </div>
  );
}

export { Game }
