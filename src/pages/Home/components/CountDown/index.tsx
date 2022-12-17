import { useEffect } from 'react'
import { useCycleContext } from '../../../../context/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export function CountDown() {
  const { activeCycle, amountSecondsPassed, totalSeconds } = useCycleContext()

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    document.title = `Pomodoro ${minutes}:${seconds}`
  }, [minutes, seconds])
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
