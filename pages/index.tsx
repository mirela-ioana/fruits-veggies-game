import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import GameLogic from '../components/GameLogic'

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #87CEEB, #E0F7FA);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  text-align: center;
  padding: 20px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 1;
`

const Score = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`

const Basket = styled(motion.div)`
  width: 100px;
  height: 60px;
  background: #8B4513;
  position: absolute;
  bottom: 20px;
  border-radius: 0 0 50px 50px;
  cursor: pointer;
  &::before {
    content: '🧺';
    position: absolute;
    font-size: 40px;
    top: -10px;
    left: 30px;
  }
`

const Tutorial = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: ${props => props.show ? 'block' : 'none'};
`

const NameInput = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: ${props => props.show ? 'block' : 'none'};
  input {
    margin: 10px;
    padding: 5px;
    font-size: 16px;
  }
  button {
    margin: 10px;
    padding: 5px 15px;
    font-size: 16px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: #45a049;
    }
  }
`

const HomePage = () => {
  const [score, setScore] = useState(0)
  const [position, setPosition] = useState(0)
  const [showTutorial, setShowTutorial] = useState(true)
  const [playerName, setPlayerName] = useState('')
  const [gameStarted, setGameStarted] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const newPosition = e.clientX - 50 // Center the basket under the cursor
    setPosition(Math.min(Math.max(0, newPosition), window.innerWidth - 100))
  }

  const startGame = () => {
    if (playerName.trim()) {
      setGameStarted(true)
      setShowTutorial(false)
    }
  }

  return (
    <GameContainer onMouseMove={handleMouseMove}>
      <Header>
        <h1>Fruit and Veggie Catcher</h1>
        {gameStarted && <h2>Go {playerName}! 🌟</h2>}
      </Header>
      
      <Score>Score: {score}</Score>
      
      <NameInput show={!gameStarted}>
        <h2>Welcome to the Fruit and Veggie Game! 🍎</h2>
        <p>What's your name?</p>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={startGame}>Start Playing!</button>
      </NameInput>

      <Tutorial show={showTutorial && gameStarted}>
        <h2>How to Play</h2>
        <p>1. Move your mouse to control the basket 🧺</p>
        <p>2. Catch healthy fruits and vegetables 🍎🥕</p>
        <p>3. Learn their names as you catch them! 📚</p>
        <button onClick={() => setShowTutorial(false)}>Got it!</button>
      </Tutorial>

      {gameStarted && (
        <>
          <GameLogic score={score} setScore={setScore} basketPosition={position} />
          <Basket 
            animate={{ x: position }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </>
      )}
    </GameContainer>
  )
}

export default HomePage