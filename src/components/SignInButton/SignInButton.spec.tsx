import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import { SignInButton } from '.'

jest.mock('next-auth/client')

describe('SignInButton Component', () => {

    test('renderizando com usuário não autenticado', () => {
        const useSessionMocked = mocked(useSession)
        
        // força o retorno de useSession para [null, false]
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SignInButton />)

        //screen.debug()

        // getByText passa o texto que eu espero encontrar
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    test('renderizando com usuário autenticado', () => {
        const useSessionMocked = mocked(useSession)

        // força o retorno de useSession para [null, false]
        useSessionMocked.mockReturnValueOnce([
            { user: { name: 'John Doe', email: 'john.doe@gmail.com'},
            expires: 'fake'}, false
        ])

        render(<SignInButton />)

        //screen.debug()

        // getByText passa o texto que eu espero encontrar
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
})
