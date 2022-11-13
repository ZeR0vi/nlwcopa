interface HomeProps {
  contagem: number;
}

export default function Home(props: HomeProps) {
  return (
    <h1>Contagem: {props.contagem}</h1>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost/3333/boloes/contagem')
  const data = await response.json()

  return {
    props: {
      contagem: data.contagem,
    }
  }
}
