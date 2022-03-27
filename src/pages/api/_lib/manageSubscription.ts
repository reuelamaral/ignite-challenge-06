// todos os arquivos que começam com underline (_) 
// o Next entende que não é uma rota.

import { fauna } from "../../../services/fauna"
import { query as q } from 'faunadb'
import { stripe } from "../../../services/stripe"

export async function saveSubscription (
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  if (createAction) {    
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        { data: subscriptionData }
      )
    )
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId,
            )
          )
        ),
        { data: subscriptionData }
      )
    )
  }
}

// Update: registros individuais
// Replace: o registro inteiro

// Para funcionar os Webhooks, precisa habilitar o Stripe-CLI.
// Para isso, abra um terminal cmd e digite o comando:
// stripe listen --forward-to localhost:3000/api/webhooks

// Para testar, ao informar os dados do cartão, informe:
// 4242 4242 4242 4242
// MM/YY = 12/36, CVC = 123
