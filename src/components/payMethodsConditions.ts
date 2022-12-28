import { CartItemType, PaymentMethodType } from 'utils/types'

export const filterPayMethods = (
  cartItems: Array<CartItemType>,
  paymentsMethods: Array<PaymentMethodType>,
  selectedDelivery: number
): Array<PaymentMethodType> => {
  if (!Array.isArray(paymentsMethods)) {
    return paymentsMethods
  }
  let filteredPayMethods: Array<PaymentMethodType> = []
  paymentsMethods.forEach(pay => {
    if (pay.only_free_of_charge) {
      // platbu "zdarma" pridam jen u listku, pokud nekdo dispnuje poukazem
      if (isFreePaymentApplicable(cartItems)) {
        filteredPayMethods.push(pay)
      }
    } else if (pay.pay_individual && pay.product_type === 'ticket') {
      // platbu "individual" pridam jen u listku, pokud nekdo nemůže platit online
      if (
        onlyTicketsPresent(cartItems) &&
        allowOnlinePayWithTickets(cartItems)
      ) {
        filteredPayMethods.push(pay)
      }
    } else if (pay.money_transfer) {
      // platbu "převodem" pridam jen u fyzickeho zbozi
      if (!onlyTicketsPresent(cartItems)) {
        filteredPayMethods.push(pay)
      }
    } else if (pay.pay_at_takeover && pay.product_type !== 'ticket') {
      // platbu "dobirka" pridam jen u fyzickeho (resp. ne-ticketoveho) zbozi
      if (!onlyTicketsPresent(cartItems)) {
        filteredPayMethods.push(pay)
      }
    } else if (pay.pay_at_takeover && pay.product_type === 'ticket') {
      // platba ticketu na miste predstaveni
      if (
        onlyTicketsPresent(cartItems) &&
        !allowOnlinePayWithTickets(cartItems)
      ) {
        filteredPayMethods.push(pay)
      }
    } else if (pay.online) {
      //online platba
      if (onlyTicketsPresent(cartItems)) {
        //tickety platim online jen, kdyz mam vic listku nez online_pay_from
        const lowestOnlinePayFrom = getLowestOnlinePayFrom(cartItems)
        if (lowestOnlinePayFrom !== false) {
          const cartTicketsAmount = countCartTickets(cartItems)
          if (cartTicketsAmount >= lowestOnlinePayFrom) {
            filteredPayMethods.push(pay)
          }
        }
      } else {
        filteredPayMethods.push(pay)
      }
    } else {
      filteredPayMethods.push(pay)
    }
  })
  return filteredPayMethods
}

export function isFreePaymentApplicable(
  cartItems: Array<CartItemType>
): boolean {
  let sumPrice = 0
  let allTickets = true
  cartItems.forEach(item => {
    sumPrice += Number(item.amount) * Number(item.price)
    if (item.product_type !== 'ticket') {
      allTickets = false
    }
  })
  return allTickets && sumPrice === 0
}

export function onlyTicketsPresent(cartItems: Array<CartItemType>): boolean {
  let allTickets = true
  cartItems.forEach(item => {
    if (item.product_type !== 'ticket') {
      allTickets = false
    }
  })
  return allTickets
}

export function isTicketPresent(cartItems: Array<CartItemType>): boolean {
  let isTicketPresent = false
  cartItems.forEach(item => {
    if (item.product_type === 'ticket') {
      isTicketPresent = true
    }
  })
  return isTicketPresent
}

export function getLowestOnlinePayFrom(
  cartItems: Array<CartItemType>
): false | number {
  let lowestOnlinePayFrom: false | number = false
  cartItems.forEach(item => {
    if (item.online_pay_from) {
      if (lowestOnlinePayFrom === false) {
        lowestOnlinePayFrom = Number(item.online_pay_from)
      } else {
        if (item.online_pay_from < lowestOnlinePayFrom) {
          lowestOnlinePayFrom = item.online_pay_from
        }
      }
    }
  })
  return lowestOnlinePayFrom
}

export function countCartTickets(cartItems: Array<CartItemType>): number {
  let count = 0
  cartItems.forEach(item => {
    if (item.product_type === 'ticket') {
      count += Number(item.amount)
    }
  })
  return count
}

export function allowOnlinePayWithTickets(
  cartItems: Array<CartItemType>
): boolean {
  const lowestOnlinePayFrom = getLowestOnlinePayFrom(cartItems)
  if (lowestOnlinePayFrom !== false) {
    const cartTicketsAmount = countCartTickets(cartItems)
    if (cartTicketsAmount >= lowestOnlinePayFrom) {
      return true
    }
  }
  return false
}
