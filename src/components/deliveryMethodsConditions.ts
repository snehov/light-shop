import { CartItemType, DeliveryMethodType } from 'utils/types'
import {
  allowOnlinePayWithTickets,
  onlyTicketsPresent,
} from './payMethodsConditions'

export const filterDeliveryMethods = (
  cartItems: Array<CartItemType>,
  deliveryMethods: Array<DeliveryMethodType>
): Array<DeliveryMethodType> => {
  if (!Array.isArray(deliveryMethods)) {
    return deliveryMethods
  }

  let filteredDeliveryMethods: Array<DeliveryMethodType> = []
  deliveryMethods.forEach(delivery => {
    if (
      onlyTicketsPresent(cartItems) &&
      (delivery.require_address || !delivery.is_online)
    ) {
      //pro pouze ticketovy kosik vyradit veskerou fyzickou delivery
      //=>void
    } else if (delivery.personal_pickup && delivery.product_type === 'ticket') {
      // predani ticketu na miste predstaveni po zaplaceni
      if (
        onlyTicketsPresent(cartItems) &&
        !allowOnlinePayWithTickets(cartItems)
      ) {
        filteredDeliveryMethods.push(delivery)
      }
    } else if (delivery.is_online && delivery.product_type === 'ticket') {
      // online doručení (mailem) při online platbách
      if (
        onlyTicketsPresent(cartItems) &&
        allowOnlinePayWithTickets(cartItems)
      ) {
        filteredDeliveryMethods.push(delivery)
      }
    } else {
      filteredDeliveryMethods.push(delivery)
    }
  })
  return filteredDeliveryMethods
}
