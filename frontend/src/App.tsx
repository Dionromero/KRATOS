import { Routes, Route } from 'react-router-dom'
import Login from './presentation/pages/login'
import Cadastro from './presentation/pages/criarconta'
import Index from './presentation/pages/index'
import EscolhaPerfil from './presentation/pages/escolha_perfil'
import CriarJogador from './presentation/pages/criar_jogador'
import Relatorio from './presentation/pages/relatorio'
import Responsavel from './presentation/pages/responsavel'
import CatalogoJogos from './presentation/pages/catalogoJogos'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/catalogo" element={<CatalogoJogos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/escolha_perfil" element={<EscolhaPerfil />} />
      <Route path="/criar_jogador" element={<CriarJogador />} />
      <Route path="/relatorio" element={<Relatorio />} />
      <Route path="/responsavel" element={<Responsavel />} />
      <Route path="*" element={<CatalogoJogos />} />
    </Routes>
  )
}