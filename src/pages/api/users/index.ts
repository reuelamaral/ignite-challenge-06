import { NextApiRequest, NextApiResponse } from 'next'

// API Routes: back-end do Next
// Serverless API: não precisa de um servidor rodando 24h
// Todos os arquivos dentro da pasta api automaticamente se tornam
// ROTAS no Next. Por exemplo, users.ts vira a rota
// http://localhost:3000/api/users

export default (request:  NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Luiz' },
    { id: 2, name: 'Diego' },
    { id: 3, name: 'Lucas'},
  ]
  
  return response.json(users)
}

/***
  Estratégias de Autenticação:
  1. JWT (LocalStorage): token com data de expiração.
  2. Next Auth: Login social (Google, gitHub etc), sem nos preocuparmos
     em armazenar credenciais de usuário em nosso back-end.
  3. Providers de autenticação externos (Auth0, Cognito etc)

  A estratégia utilizada neste projeto é Next Auth com gitHub.
  Documentação em NextAuth.js
***/