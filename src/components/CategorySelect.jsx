import React, { useState, useRef, useEffect } from 'react'
import './components.css'

const CategorySelect = ({ categories, selectedCategory, onChange }) => {
    const [listOpen, setListOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        document.addEventListener('click', handleClick)
    }, [])

    const selectCategory = category => {
       onChange && onChange(category)
       setListOpen(false)
    }

    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
          setListOpen(false)
        }
      }
    
    const clickDropDown = () => {
      listOpen 
        ? selectCategory('')
        : setListOpen(true)
    }

  return (
    <div className='categoryContainer'  ref={ref}>
        <div className='category' onClick={() => setListOpen(true)}> {selectedCategory || 'All'} </div>
        { listOpen 
        ? <div className='categoryList'>
            { selectedCategory && <div className='category' onClick={clickDropDown}>All</div>}
            {categories && categories.length && categories.map(category =>
                <div className='category' onClick={() => selectCategory(category)}>{category}</div>)}
        </div>
        : null}
    </div>
  );
}

export { CategorySelect }