import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AVATARES } from '../components/avatares'

interface Jogador {
  id: string
  name: string
  age: number
  avatar: string | null
  totalPoints: number
  currentLevel: number
}

interface ApiResponse {
  success: boolean
  data: Jogador[]
}

export default function Relatorio() {
  const navigate = useNavigate()
  const [jogadores, setJogadores] = useState<Jogador[]>([])
  const [carregando, setCarregando] = useState(true)

  // ✅ Fetch inline com .then() — sem setState indireto no effect
  useEffect(() => {
    const controller = new AbortController()
    const token = localStorage.getItem('token')

    fetch('http://localhost:3001/children', {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then((res) => res.json() as Promise<ApiResponse>)
      .then((data) => {
        if (data.success) {
          setJogadores(data.data)
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('Erro ao carregar relatório:', error)
      })
      .finally(() => {
        setCarregando(false)
      })

    return () => controller.abort()
  }, [])

  const handleSair = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const ranking = [...jogadores].sort((a, b) => {
    if (b.currentLevel !== a.currentLevel) return b.currentLevel - a.currentLevel
    return b.totalPoints - a.totalPoints
  })

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
        <button
          onClick={() => navigate('/escolha_perfil')}
          className="bg-white/50 text-brand-text-dark rounded-full px-8 py-3 font-bold text-lg shadow-sm hover:bg-white/80 transition-all border-2 border-white/50"
        >
          ← Voltar
        </button>
        <button
          onClick={handleSair}
          className="bg-white/40 text-brand-text-dark rounded-full px-8 py-3 font-bold text-lg shadow-sm hover:bg-white/70 transition-all border-2 border-white/50"
        >
          Sair
        </button>
      </header>

      {/* Conteúdo */}
      <main className="relative z-10 w-full max-w-[800px] mx-auto mt-6 flex-1 flex flex-col mb-10 px-4">
        <div className="bg-brand-card-bg rounded-[40px] px-6 md:px-12 py-8 shadow-xl border-[3px] border-[#D6E2C6]/50">

          <h2 className="text-3xl md:text-4xl text-brand-btn-bg font-bold text-center mb-6 drop-shadow-sm">
            Relatório dos Jogadores
          </h2>

          {carregando ? (
            <p className="text-center text-xl text-brand-text-dark mt-10">Carregando...</p>
          ) : jogadores.length === 0 ? (
            <p className="text-center text-xl text-brand-text-dark mt-10">
              Nenhum jogador cadastrado ainda.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-brand-text-dark text-lg">
                <thead>
                  <tr className="border-b-2 border-brand-input-border">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Jogador</th>
                    <th className="py-3 px-4">Idade</th>
                    <th className="py-3 px-4">Nível</th>
                    <th className="py-3 px-4">Pontos</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((jogador, index) => (
                    <tr key={jogador.id} className="border-b border-brand-input-border/50 hover:bg-white/30">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4 flex items-center gap-3">
                        {jogador.avatar ? (
                          <img
                            src={jogador.avatar}
                            alt={jogador.name}
                            className="w-10 h-10 object-cover rounded-full border-2 border-brand-btn-border"
                          />
                        ) : (
                          <img
                            src={AVATARES[index % AVATARES.length].src}
                            alt={AVATARES[index % AVATARES.length].alt}
                            className="w-10 h-10 object-cover rounded-full border-2 border-brand-btn-border"
                          />
                        )}
                        {jogador.name}
                      </td>
                      <td className="py-3 px-4">{jogador.age} anos</td>
                      <td className="py-3 px-4">{jogador.currentLevel}</td>
                      <td className="py-3 px-4 font-bold">{jogador.totalPoints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}