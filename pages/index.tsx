import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import GameLogic from '../components/GameLogic'

// Types
interface PopupProps {
  show: boolean;
}

interface StyledComponentProps {
  show?: boolean;
}

// Styled Components
const StyledPopup = styled.div<PopupProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: ${props => props.show ? 'block' : 'none'};
`

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

const StyledOverlay = styled.div<StyledComponentProps>`
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

const Tutorial = styled(StyledOverlay)``

const NameInput = styled(StyledOverlay)`
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

// Component
interface GameState {
  score: number;
  position: number;
  showTutorial: boolean;
  playerName: string;
  gameStarted: boolean;
}

const HomePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    position: 0,
    showTutorial: true,
    playerName: '',
    gameStarted: false
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    const newPosition = Math.min(
      Math.max(0, e.clientX - 50),
      window.innerWidth - 100
    )
    setGameState(prev => ({ ...prev, position: newPosition }))
  }

  const startGame = () => {
    if (gameState.playerName.trim()) {
      setGameState(prev => ({
        ...prev,
        gameStarted: true,
        showTutorial: false
      }))
    }
  }

  // Replace the updateScore function with this:
  const updateScore: React.Dispatch<React.SetStateAction<number>> = (value) => {
    setGameState(prev => ({
      ...prev,
      score: typeof value === 'function' 
        ? value(prev.score)
        : value
    }))
  }


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameState(prev => ({ ...prev, playerName: e.target.value }))
  }

  const closeTutorial = () => {
    setGameState(prev => ({ ...prev, showTutorial: false }))
  }

  return (
    <StyledPopup show={true}>
      <GameContainer onMouseMove={handleMouseMove}>
        <Header>
          <h1>Fruit and Veggie Catcher</h1>
          {gameState.gameStarted && <h2>Go {gameState.playerName}! 🌟</h2>}
        </Header>
        
        <Score>Score: {gameState.score}</Score>
        
        <NameInput show={!gameState.gameStarted}>
          <h2>Welcome to the Fruit and Veggie Game! 🍎</h2>
          <p>What's your name?</p>
          <input
            type="text"
            value={gameState.playerName}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
          <button onClick={startGame}>Start Playing!</button>
        </NameInput>

        <Tutorial show={gameState.showTutorial && gameState.gameStarted}>
          <h2>How to Play</h2>
          <p>1. Move your mouse to control the basket 🧺</p>
          <p>2. Catch healthy fruits and vegetables 🍎🥕</p>
          <p>3. Learn their names as you catch them! 📚</p>
          <button onClick={closeTutorial}>Got it!</button>
        </Tutorial>

        {gameState.gameStarted && (
          <>
            <GameLogic 
              score={gameState.score} 
              setScore={updateScore} 
              basketPosition={gameState.position} 
            />
            <Basket 
              animate={{ x: gameState.position }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </>
        )}
      </GameContainer>
    </StyledPopup>
  )
}

export default HomePage
