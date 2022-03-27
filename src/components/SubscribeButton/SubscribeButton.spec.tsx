import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')
jest.mock('next/router')

describe('SubscribeButton Component', () => {

    it('renderizando corretamente', () => {
        const useSessionMocked = mocked(useSession)
        
        useSessionMocked.mockReturnValueOnce([null, false])
        
        render(<SubscribeButton />)

        // getByText passa o texto que eu espero encontrar
        const btn = screen.getByText('Assine já 🤓')

        expect(btn).toBeInTheDocument()
    })

    it('redireciona usuário não autenticado para SignIn', () => {        
        const signInMocked = mocked(signIn)
        const useSessionMocked = mocked(useSession)
        
        useSessionMocked.mockReturnValueOnce([null, false])        

        render(<SubscribeButton />)

        // getByText passa o texto que eu espero encontrar
        const btn = screen.getByText('Assine já 🤓')

        fireEvent.click(btn)        

        expect(signInMocked).toHaveBeenCalled()
    })

    it('redireciona usuário autenticado para Posts', () => {
        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)
        const pushMocked = jest.fn()

        useSessionMocked.mockReturnValueOnce([
            { user: { name: 'John Doe', email: 'john.doe@gmail.com'},
            activeSubscription: 'fake',
            expires: 'fake'}, false
        ])

        useRouterMocked.mockReturnValueOnce({
            push: pushMocked
        } as any)

        render(<SubscribeButton />)

        // getByText passa o texto que eu espero encontrar
        const btn = screen.getByText('Assine já 🤓')

        fireEvent.click(btn)        

        expect(pushMocked).toHaveBeenCalledWith('/posts')
    })
})
