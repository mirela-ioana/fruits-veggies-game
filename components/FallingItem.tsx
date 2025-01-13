import { motion } from 'framer-motion'
import styled from 'styled-components'

interface FallingItemProps {
  type: string;
  x: number;
  onComplete: () => void;
  onCatch: () => void;
}

const ItemWrapper = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`

const items = {
  apple: '🍎',
  banana: '🍌',
  orange: '🍊',
  pear: '🍐',
  carrot: '🥕',
  broccoli: '🥦',
  tomato: '🍅',
  cucumber: '🥒'
}

export const FallingItem = ({ type, x, onComplete, onCatch }: FallingItemProps) => {
  return (
    <ItemWrapper
      initial={{ y: -50, x }}
      animate={{ y: window.innerHeight }}
      transition={{ 
        duration: 4,
        type: "tween",
        ease: "linear"
      }}
      onAnimationComplete={onComplete}
      style={{ originY: 0 }}
    >
      {items[type as keyof typeof items]}
    </ItemWrapper>
  )
}

export default FallingItem