import { Routes, Route } from 'react-router-dom'
import Login from './presentation/pages/login'
import Cadastro from './presentation/pages/criarconta'
import EscolhaPerfil from './presentation/pages/escolha_perfil'
import CriarJogador from './presentation/pages/criar_jogador'
import Relatorio from './presentation/pages/relatorio'
import CatalogoJogos from './presentation/pages/catalogoJogos' 
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CatalogoJogos />} />    {/* Homepage agora é o catálogo */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/escolha_perfil" element={<EscolhaPerfil />} />
      <Route path="/criar_jogador" element={<CriarJogador />} />
      <Route path="/relatorio" element={<Relatorio />} />
      <Route path="*" element={<CatalogoJogos />} />    {/* qualquer erro volta pra home */}
    </Routes>
  )
}