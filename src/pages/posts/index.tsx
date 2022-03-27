import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'
import Link from 'next/link'

type Post = {
  slug: string;
  title: string;
  preview: string;
  updatedAt: string;
}

type PostsProps = {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          { posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={ post.slug }>
              <a>
                <time>{ post.updatedAt }</time>
                <strong>{ post.title }</strong>
                <p>{ post.preview }</p>
              </a>
            </Link>
          )) }
          
        </div>
      </main>

    </>
  )
}

// GetServerSideProps: faz a chamada à API via SSR, para que seja visível aos
// motores de busca. Essa função é executada na camada do Next, e não no browser.
//
// GetStaticProps: faz chamada à API via SSG (Static Side Generation), ou seja,
// o Next renderiza uma única vez a página e armazena o HTML estático.
// Da próxima vez que o cliente acessar a página, o Next busca o html armazenado.
// O único diferencial é a propriedade revalidate: quanto tempo em segundos
// esta página voltará a ser reconstruída.
// Só use quando o conteúdo for o mesmo para todos os clientes e não mudar 
// com frequência.

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

    // buscar todos os documentos do tipo 'post', que eu defini no projeto ignews
    const response = await prismic.query([
      Prismic.predicates.at('document.type', 'post')
      ], 
      {
        fetch: ['post.title', 'post.content'],
        pageSize: 50, //limite de posts
      }
    )
  
  const posts = response.results.map(post => {        
    const vdata = new Date(post.last_publication_date)
      .toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })

    const container = post.data.container || []
    const paragrafo = container.find(texto => texto.type === 'paragraph')?.text
    //console.log('Post:', JSON.stringify(container, null, 2))
    
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      preview: paragrafo || '',
      updatedAt: vdata
    }
  })

  return {
    props: { posts },
    revalidate: 60 * 30, // recarrega a cada 30 minutos
    //redirect: 60 * 30 
  }
}
