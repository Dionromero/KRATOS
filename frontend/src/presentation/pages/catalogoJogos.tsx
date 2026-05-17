import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Jogo {
  id: string
  titulo: string
  descricao: string
  categoria: string
  idadeMin?: number
  idadeMax?: number
  icone: string
}

const JOGOS_DEMO: Jogo[] = [
  {
    id: 'robo-pizzaiolo',
    titulo: 'Robô Pizzaiolo',
    descricao: 'Programe um robô para fazer pizzas! Aprenda lógica de programação.',
    categoria: 'lógica',
    idadeMin: 8,
    idadeMax: 14,
    icone: '🍕',
  },
]

export default function CatalogoJogos() {
  const navigate = useNavigate()

  const [isLoggedIn] = useState(() => !!localStorage.getItem('token'))

  const handleJogar = (jogoId: string) => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    const currentChild = localStorage.getItem('currentChildId')

    if (!currentChild) {
      navigate('/escolha_perfil')
      return
    }

    if (jogoId === 'robo-pizzaiolo') {
      window.open(`http://localhost:5174/jogo?childId=${currentChild}`, '_blank')
    }
  }

  return (
    <div className="bg-sky-gradient min-h-screen relative flex flex-col items-center overflow-hidden">

      {/* Nuvens e montanha */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {[...Array(3)].map((_, i) => (
          <img key={i} src="/imagem/Nuvens.svg" className="animate-float" alt="" />
        ))}
        <img
          src="/imagem/Montanha.svg"
          className="absolute bottom-0 w-[200%] md:w-full max-w-none left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 h-auto translate-y-[15%] md:translate-y-[40%] object-cover"
          alt=""
        />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 pt-8 flex justify-between items-center">
        <h1 className="text-lg md:text-4xl font-extrabold text-green-300 drop-shadow-lg">
          kidQuest
        </h1>

        <div className="flex gap-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="bg-white/40 text-brand-text-dark rounded-full px-6 py-2 font-bold text-lg shadow-sm hover:bg-white/70 transition-all border-2 border-white/50"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate('/cadastro')}
                className="bg-brand-btn-bg text-[#E3F4B9] rounded-full px-6 py-2 font-bold text-lg shadow-sm hover:bg-[#7da02b] transition-all border-2 border-white/40"
              >
                Cadastrar
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/escolha_perfil')}
              className="bg-brand-btn-bg text-[#E3F4B9] rounded-full px-6 py-2 font-bold text-lg shadow-sm hover:bg-[#7da02b] transition-all border-2 border-white/40"
            >
              Jogar
            </button>
          )}
        </div>
      </header>

      {/* Conteúdo */}
      <main className="relative z-10 w-full max-w-[1200px] mx-auto mt-8 flex-1 px-4 md:px-10 pb-10">
        <p className="text-2xl text-white font-bold text-center mb-6 drop-shadow-md">
          Explore nossa coleção de jogos educativos!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOGOS_DEMO.map((jogo) => (
            <div
              key={jogo.id}
              className="bg-brand-card-bg rounded-[40px] p-6 shadow-xl border-[3px] border-[#D6E2C6]/50 flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <span className="text-5xl mb-3">{jogo.icone}</span>
              <h3 className="text-2xl font-bold text-brand-text-dark mb-2">
                {jogo.titulo}
              </h3>
              <p className="text-brand-text-dark opacity-80 mb-3 text-sm">
                {jogo.descricao}
              </p>
              <div className="flex gap-2 mb-4">
                {jogo.idadeMin && jogo.idadeMax && (
                  <span className="bg-white/50 px-3 py-1 rounded-full text-sm font-bold text-brand-text-dark">
                    {jogo.idadeMin}–{jogo.idadeMax} anos
                  </span>
                )}
                <span className="bg-brand-btn-bg/20 text-brand-btn-bg px-3 py-1 rounded-full text-sm font-bold capitalize">
                  {jogo.categoria}
                </span>
              </div>
              <button
                onClick={() => handleJogar(jogo.id)}
                className="w-full bg-brand-btn-bg text-[#E3F4B9] rounded-full py-3 font-bold text-lg shadow-[0px_4px_0px_rgba(93,125,14,0.3)] hover:bg-[#7da02b] active:shadow-none active:translate-y-1 transition-all"
              >
                {isLoggedIn ? 'Jogar' : 'Entrar para jogar'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}