import { useState, useEffect } from 'react'
import FallingItem from './FallingItem'

interface GameLogicProps {
  score: number;
  setScore: (score: number) => void;
  basketPosition: number;
}

const itemTypes = ['apple', 'banana', 'orange', 'pear', 'carrot', 'broccoli', 'tomato', 'cucumber']

const GameLogic = ({ score, setScore, basketPosition }: GameLogicProps) => {
  const [items, setItems] = useState<Array<{ id: number; type: string; x: number }>>([])
  const [gameSpeed, setGameSpeed] = useState(2000)

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const newItem = {
        id: Date.now(),
        type: itemTypes[Math.floor(Math.random() * itemTypes.length)],
        x: Math.random() * (window.innerWidth - 40)
      }
      setItems(prev => [...prev, newItem])
    }, gameSpeed)

    return () => clearInterval(spawnInterval)
  }, [gameSpeed])

  const handleItemComplete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const handleCatch = (id: number) => {
    const caughtItem = items.find(item => item.id === id)
    if (caughtItem) {
      // Show educational popup
      const itemName = caughtItem.type.charAt(0).toUpperCase() + caughtItem.type.slice(1)
      const message = document.createElement('div')
      message.style.position = 'absolute'
      message.style.left = `${caughtItem.x}px`
      message.style.top = '50%'
      message.style.background = 'rgba(255, 255, 255, 0.9)'
      message.style.padding = '10px'
      message.style.borderRadius = '5px'
      message.style.animation = 'fadeOut 2s forwards'
      message.innerHTML = `Great job! That's a ${itemName}! 🌟`
      document.body.appendChild(message)
      setTimeout(() => message.remove(), 2000)
      
      // Update score and remove item
      setScore(prev => prev + 1)
      setItems(prev => prev.filter(item => item.id !== id))
      
      // Increase game speed as score increases
      if (score > 0 && score % 5 === 0) {
        setGameSpeed(prev => Math.max(prev * 0.9, 800))
      }
    }
  }

  return (
    <>
      {items.map(item => (
        <FallingItem
          key={item.id}
          type={item.type}
          x={item.x}
          onComplete={() => handleItemComplete(item.id)}
          onCatch={() => {
            // Check if item is caught in basket
            if (Math.abs(item.x - basketPosition) < 50) {
              handleCatch(item.id)
            }
          }}
        />
      ))}
    </>
  )
}

export default GameLogic