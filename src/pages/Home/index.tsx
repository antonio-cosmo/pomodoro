import { Play, HandPalm } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  InterruptCountdownButton,
} from './styles'
import { CountDown } from './components/CountDown'
import { FormContainerCycle } from './components/FormContainerCycle'
import { useCycleContext } from '../../context/CyclesContext'

const schema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z
    .number()
    .step(5)
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type formData = z.infer<typeof schema>

export function Home() {
  const { createCycle, interruptCycle, activeCycle } = useCycleContext()
  const formCycle = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { watch, handleSubmit, reset } = formCycle
  const taskField = watch('task')
  const minutesAmountFiled = watch('minutesAmount')
  const isSubmitDisable = !taskField || !minutesAmountFiled

  const handleSubmitCreateCycle = (data: formData) => {
    createCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitCreateCycle)}>
        <FormProvider {...formCycle}>
          <FormContainerCycle />
        </FormProvider>
        <CountDown />
        {activeCycle ? (
          <InterruptCountdownButton onClick={interruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </InterruptCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
