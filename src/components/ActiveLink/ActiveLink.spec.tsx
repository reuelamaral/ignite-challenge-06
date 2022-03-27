import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'


jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})



describe('ActiveLink Component', () => {

    test('está renderizando corretamente', () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
        

        screen.debug() 
        

        expect(screen.getByText('Home')).toBeInTheDocument()
    })

    test('link ativo está recebendo a classe active', () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
        
        expect(screen.getByText('Home')).toHaveClass('active')
    })
})