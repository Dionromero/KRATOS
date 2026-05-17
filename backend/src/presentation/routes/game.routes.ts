import { Elysia, t } from 'elysia'
import { MongoGameRepository } from '../../infrastructure/repositories/mongo-game.repository'
import { MongoChildRepository } from '../../infrastructure/repositories/mongo-child.repository'
import { SaveProgressUseCase } from '../../application/use-cases/game/save-progress.use-case'
import { DomainError } from '../../application/errors/domain.errors'
import * as jwt from 'jsonwebtoken'

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key-change-this'

const gameRepository = new MongoGameRepository()
const childRepository = new MongoChildRepository()
const saveProgressUseCase = new SaveProgressUseCase(gameRepository, childRepository)

const verifyToken = (authHeader: string | undefined) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new DomainError('No token provided', 'UNAUTHORIZED', 401)
  }
  return jwt.verify(authHeader.substring(7), JWT_SECRET) as { userId: string; role: string }
}

export const gameRoutes = new Elysia({ prefix: '/games' })

  // POST /games/progress
  .post('/progress', async ({ body, headers, set }) => {
    try {
      verifyToken(headers.authorization)

      const result = await saveProgressUseCase.execute(body)

      set.status = 201
      return { success: true, data: result }
    } catch (error: unknown) {
      if (error instanceof DomainError) {
        set.status = error.statusCode
        return { success: false, error: { code: error.code, message: error.message } }
      }
      set.status = 500
      return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }
    }
  }, {
    body: t.Object({
      childId: t.String(),
      gameId: t.String(),
      score: t.Number(),
      timeSpentSeconds: t.Number(),
    }),
  })

  // GET /games/progress/:childId — para o relatório
  .get('/progress/:childId', async ({ params, headers, set }) => {
    try {
      verifyToken(headers.authorization)

      const sessions = await gameRepository.findSessionsByChild(params.childId)
      return { success: true, data: sessions.map((s) => s.toJSON()) }
    } catch (error: unknown) {
      if (error instanceof DomainError) {
        set.status = error.statusCode
        return { success: false, error: { code: error.code, message: error.message } }
      }
      set.status = 500
      return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }
    }
  })