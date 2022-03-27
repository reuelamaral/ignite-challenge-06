import { render, screen } from '@testing-library/react'
import { Header } from '.'

// mock é imitação. No caso, está forçando a rota "/"
jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

jest.mock('next-auth/client', () => {
    return {
        useSession() {
            return [null, false]
        }
    }
})

describe('Header Component', () => {

    test('está renderizando corretamente', () => {
        render(
            <Header />
        )

        // getByText passa o texto que eu espero encontrar
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Posts')).toBeInTheDocument()
    })
})
