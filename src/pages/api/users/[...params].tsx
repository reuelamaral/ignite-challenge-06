import { NextApiRequest, NextApiResponse } from 'next'

// Passagem de qualquer parâmetro através de request.query
// http://localhost:3000/api/users/1/luiz/47 (por exemplo)
// retorna: [ '1', 'Luiz', '47' ]

export default (request:  NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Luiz' },
    { id: 2, name: 'Diego' },
    { id: 3, name: 'Lucas'},
  ]

  console.log(request.query)
  return response.json(users)
}
