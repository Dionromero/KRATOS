# KRATOS 🎮

> Plataforma MicroSaaS educacional que conecta responsáveis e crianças a jogos de programação — com gestão de perfis, relatórios de progresso e integração com o jogo **[Pizzaria Code (Zeus)](https://github.com/Dionromero/zeus)**.

[![Status](https://img.shields.io/badge/status-MVP%20funcional-green)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![Stack](https://img.shields.io/badge/stack-Bun%20%7C%20Elysia%20%7C%20React%20%7C%20MongoDB-blue)]()
[![Jogo integrado](https://img.shields.io/badge/jogo-Pizzaria%20Code-orange)]()

---

## 🎯 Sobre

O KRATOS é o backend e frontend da plataforma **kidQuest** — um MicroSaaS voltado para o aprendizado de programação por crianças de 8 a 14 anos.

O responsável cria uma conta, cadastra seus filhos como jogadores e acompanha o progresso deles através de relatórios. As crianças jogam o **Pizzaria Code (Zeus)**, um jogo onde programam um robô em Portugol para fazer pizzas, e o progresso é salvo automaticamente na plataforma.

**Integração completa com Zeus:**
- O KRATOS autentica o responsável e seleciona o perfil da criança
- O Zeus recebe o `childId` via URL e, ao vencer um nível, envia o score para o KRATOS
- O KRATOS atualiza os pontos da criança e exibe no relatório

---

## ✨ O que funciona hoje

**Autenticação**
- ✅ Cadastro e login de responsáveis com JWT
- ✅ Token persistido no localStorage com interceptor automático
- ✅ Logout com limpeza de sessão e redirect para login

**Gestão de jogadores**
- ✅ Cadastro de filhos com nome, idade e avatar
- ✅ Seleção de perfil antes de jogar
- ✅ Edição de perfil do responsável

**Integração com o Zeus**
- ✅ Seleção do jogador salva `currentChildId` no localStorage
- ✅ Catálogo abre o Zeus em nova aba com `?childId=xxx` na URL
- ✅ Zeus envia score via `POST /games/progress` ao KRATOS ao vencer
- ✅ KRATOS atualiza pontos e nível da criança automaticamente

**Relatório**
- ✅ Listagem de jogadores ordenada por nível e pontos
- ✅ Exibe total de pontos, nível atual e idade

**Frontend**
- ✅ Tela de splash com redirect automático
- ✅ Catálogo de jogos com card do Robô Pizzaiolo
- ✅ Interface responsiva com Tailwind CSS v4
- ✅ Animações (nuvens flutuantes, botões com sombra 3D)

---

## 🗺️ Roadmap

- [ ] Painel de sessões por jogador (histórico de partidas)
- [ ] Dashboard do responsável com gráficos de evolução
- [ ] Suporte a múltiplos jogos além do Zeus
- [ ] Sistema de conquistas e medalhas
- [ ] Notificações por e-mail para o responsável
- [ ] Modo offline com sincronização posterior

---

## 🚀 Começando

### Pré-requisitos

- [Bun](https://bun.sh) >= 1.0
- [MongoDB](https://www.mongodb.com) rodando localmente na porta 27017
- [Zeus (Pizzaria Code)](https://github.com/Dionromero/zeus) clonado e rodando na porta 5174

### Instalação

```bash
git clone <url-deste-repo> KRATOS
cd KRATOS
```

**Backend:**
```bash
cd backend
bun install
```

Crie o arquivo `.env` na pasta `backend/`:
```env
MONGODB_URI=mongodb://localhost:27017/kratos
JWT_SECRET=sua-chave-secreta-aqui
PORT=3001
```

**Frontend:**
```bash
cd frontend
bun install
```

### Rodar em modo dev

Abra **3 terminais**:

```bash
# Terminal 1 — Backend KRATOS (porta 3001)
cd backend && bun dev

# Terminal 2 — Frontend KRATOS (porta 5173)
cd frontend && bun dev

# Terminal 3 — Zeus / Pizzaria Code (porta 5174)
cd ../zeus && bun dev
```

Acesse `http://localhost:5173` e crie uma conta de responsável.

### Build de produção

```bash
# Backend
cd backend && bun build

# Frontend
cd frontend && bun run build
```

---

## 🏗️ Stack técnico

| Camada | Tecnologia | Por quê |
|---|---|---|
| Runtime | Bun 1.x | Mais rápido que Node, suporte nativo a TypeScript |
| Backend framework | Elysia | API type-safe, validação integrada, compatível com Bun |
| Banco de dados | MongoDB + Mongoose | Flexibilidade de schema, fácil de evoluir |
| Validação | Zod | Schemas compartilháveis entre DTOs e rotas |
| Autenticação | JWT + bcrypt | Stateless, sem sessões no servidor |
| Frontend | React 19 + Vite 8 | Ecossistema maduro, HMR rápido |
| Estilização | Tailwind CSS v4 | Utility-first, tokens no CSS com `@theme` |
| Roteamento | React Router v6 | Padrão do ecossistema React |
| HTTP client | Axios | Interceptors para token e 401 automático |

---

## 📁 Estrutura

```
KRATOS/
├── backend/
│   └── src/
│       ├── domain/
│       │   ├── entities/          # User, Child, Game, GameSession
│       │   └── repositories/      # Interfaces dos repositórios
│       │
│       ├── application/
│       │   ├── use-cases/         # Casos de uso (login, register, save-progress…)
│       │   ├── dtos/              # Schemas Zod de entrada/saída
│       │   └── errors/            # DomainError tipado
│       │
│       ├── infrastructure/
│       │   ├── database/
│       │   │   ├── connection.ts  # Conexão MongoDB
│       │   │   └── models/        # Modelos Mongoose
│       │   └── repositories/      # Implementações MongoDB dos repositórios
│       │
│       ├── presentation/
│       │   └── routes/            # auth.routes, child.routes, game.routes
│       │
│       └── index.ts               # Entry point Elysia
│
├── frontend/
│   └── src/
│       ├── presentation/
│       │   ├── pages/             # index, login, criarconta, escolha_perfil…
│       │   ├── components/        # avatares, icones_dialog
│       │   └── styles/            # styles.css (Tailwind v4 + @theme)
│       │
│       ├── services/
│       │   └── api.ts             # Axios com interceptors de auth
│       │
│       ├── App.tsx                # Roteamento React Router
│       └── main.tsx               # Entry point React
│
└── README.md
```

---

## 🔌 API — Endpoints principais

### Auth
| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/register` | Cadastro de responsável |
| `POST` | `/auth/login` | Login, retorna JWT |
| `GET` | `/auth/me` | Perfil do usuário autenticado |
| `PUT` | `/auth/me` | Atualiza nome/avatar |

### Jogadores (filhos)
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/children` | Lista filhos do responsável |
| `POST` | `/children` | Cadastra novo jogador |
| `PUT` | `/children/:id` | Atualiza jogador |
| `DELETE` | `/children/:id` | Remove jogador |

### Jogos
| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/games/progress` | Salva progresso de uma sessão (chamado pelo Zeus) |
| `GET` | `/games/progress/:childId` | Histórico de sessões de um jogador |

---

## 🔌 Integração com o Zeus

O fluxo completo de integração entre KRATOS e Zeus:

```
1. Responsável faz login no KRATOS (localhost:5173)
2. Seleciona o perfil do filho em /escolha_perfil
   → salva currentChildId no localStorage
   → navega para /catalogo
3. Clica em "Jogar" no card do Robô Pizzaiolo
   → window.open('http://localhost:5174?childId=xxx')
4. Zeus abre na porta 5174
   → lê childId da URL (?childId=xxx)
   → ao vencer: POST http://localhost:3001/games/progress
5. KRATOS recebe o score
   → salva a sessão no MongoDB
   → atualiza totalPoints do jogador
6. Relatório em /relatorio exibe o progresso atualizado
```

Para adicionar novos jogos, basta incluí-los em `save-progress.use-case.ts`:

```typescript
const STATIC_GAMES = {
  'robo-pizzaiolo': { pointsReward: 500, minAge: 8, maxAge: 14 },
  'novo-jogo':      { pointsReward: 300, minAge: 6, maxAge: 12 }, // ← adicione aqui
}
```

---

## 🤝 Contribuindo

Projeto acadêmico em fase MVP. Feedback bem-vindo, especialmente:

- Bugs na integração Zeus ↔ KRATOS
- Sugestões de novos relatórios para o responsável
- Melhorias na experiência da criança ao selecionar o perfil

---

## 📄 Licença

A definir.

---

## 🙏 Agradecimentos

- **[Pizzaria Code (Zeus)](https://github.com/Dionromero/zeus)** — jogo educativo integrado à plataforma
- **[The Farmer Was Replaced](https://store.steampowered.com/app/2060160/The_Farmer_Was_Replaced/)** — inspiração do modelo de gameplay do Zeus
- **[Elysia](https://elysiajs.com)** — framework que tornou o backend Bun simples e type-safe