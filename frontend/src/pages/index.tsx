import Image from 'next/image'
import celulares from '../assets/celulares.png'
import logo from '../assets/logo.svg'
import icon from '../assets/icon.png'
import avatares from '../assets/avatares.png'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  contagemBoloes: number;
  contagemGuess: number;
  contagemUser: number;
}

export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent){
    event.preventDefault()



    try {
     const response = await api.post('/boloes', {
        title: poolTitle,
      })
      const {code} = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão Criado com Sucesso o código foi copiado para a área de trasnferência.')
    }
    catch(err){
      console.log(err)
      alert('Falha ao criar o Bolão tente novamente')
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logo} alt=""/>
        
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image quality={100} src={avatares} alt=""/>

          <strong className='text-gray-100 text-xl'> <span className='text-ignite-500'>+{props.contagemUser}</span> pessoas já estão usando</strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input className='flex-1 px-6 py-4 text-gray-100 rounded bg-gray-800 border border-gray-600 text-sm'
           type="text" 
           required placeholder='Qual é o nome do bolão?'
            onChange={event => setPoolTitle(event.target.value)}
           />
          <button className='bg-yellow-500 px-6 py-4 rounded   text-gray-900 uppercase font-bold text-sm hover:bg-yellow-700'>Criar meu Bolão</button>
        </form>

        <p className='mt-4 text-gray-300 leading-relaxed text-sm'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 px-10 border-t border-gray-600 items-center text-gray-100 flex justify-between'>
          <div className='flex items-center gap-6'>
            <Image quality={100} src={icon} alt=""/>
              <div className='flex flex-col'>
                <span className='font-bold text-2xl'>+{props.contagemBoloes}</span>
                <span>Bolões Criados</span>
              </div>

          </div>

          <div className='w-px h-14 bg-gray-600'/>

          <div className='flex items-center gap-6'>
          <Image quality={100} src={icon} alt=""/>
               <div className='flex flex-col'>
                <span className='font-bold text-2xl'>+{props.contagemGuess}</span>
                <span>Palpites Enviados</span>
              </div>

          </div>
        </div>
      </main>

      <Image quality={100} src={celulares} alt="dois celulares mostrando a prévia da aplicação"/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const contagemBoloesResponse = await api.get('boloes/contagem')
  const guessCountResponse = await api.get('/guesses/contagem')
  const userCountResponse = await api.get('/user/contagem')

  return {
    props: {
      contagemBoloes: contagemBoloesResponse.data.contagem,
      contagemGuess: guessCountResponse.data.contagem,
      contagemUser: userCountResponse.data.contagem,
    }
  }
}
