import { GetServerSideProps, GetStaticProps } from 'next'
import Head from 'next/head'

import styles from './home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'


type HomeProps = {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, bem-vindo</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Tenha acesso a todas as publicações <br />
            <span>por {props.product.amount} mensal</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {

  const price = await stripe.prices
    .retrieve('price_1KhziVCbAhCKmDS26eLMfS6d'
    )

  const product = { 
    priceId: price.id, 
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return  {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,  // 24 horas
  }
}
