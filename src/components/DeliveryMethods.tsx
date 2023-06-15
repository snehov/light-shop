import React, { useDispatch, useState, useEffect, useGlobal } from 'reactn'
import { useTranslation } from 'react-i18next'
import { DeliveryMethodType, DeliverySpecs } from 'utils/types'
import { formatPriceOutput } from '../utils/priceOperations'
import ModalZasilkovna from './modals/ModalZasilkovna'
import { filterDeliveryMethods } from './deliveryMethodsConditions'
const isEmpty = require('ramda').isEmpty
const isNil = require('ramda').isNil

const DeliveryMethods = () => {
  const [deliveryMethods] = useGlobal('deliveryMethods')
  const [deliveryFiltered, setDeliveryFiltered] = useState(deliveryMethods)
  const [cartItems] = useGlobal('cartItems')
  const [orderInfo] = useGlobal('orderInfo')
  const [onlyOnlineItems] = useGlobal('onlyOnlineItems')
  const [deliveryMethod, setDeliveryMethod] = useState(0)
  const [zasilkovnaVisible, setZasilkovnaVisible] = useState(false)
  const changeDeliveryMethod = useDispatch('changeDeliveryMethod')
  const [deliverySpecification, setDeliverySpecification] = useState<
    DeliverySpecs | undefined
  >()
  const [selectedZasilkovnaPlace] = useGlobal('selectedZasilkovnaPlace')

  useEffect(() => {
    setDeliveryFiltered(filterDeliveryMethods(cartItems, deliveryMethods))
  }, [cartItems, deliveryMethods])
  //# used generally for initial render (prefilled value from server), then for every change as well
  useEffect(() => {
    if (!isNil(selectedZasilkovnaPlace)) {
      const label = `${selectedZasilkovnaPlace.city}, ${selectedZasilkovnaPlace.place}` // note: should be equal with confirmModal() at ModalZasilkovna.tsx
      const placeId = String(selectedZasilkovnaPlace.id)
      setDeliverySpecification({ label, data: placeId })
    }
  }, [selectedZasilkovnaPlace])

  const { t } = useTranslation()
  useEffect(() => {
    orderInfo?.deliveryMethod && setDeliveryMethod(orderInfo.deliveryMethod)
  }, [orderInfo])

  //# dispatch change to API
  useEffect(() => {
    deliverySpecification
      ? changeDeliveryMethod(deliveryMethod, deliverySpecification.data)
      : changeDeliveryMethod(deliveryMethod)
  }, [deliveryMethod, deliverySpecification]) // eslint-disable-line

  //# autochange selected delivery when list of allowed changes and is selected currently unsupported choice
  useEffect(() => {
    const allowedDelivery = getAllowedDelivery()
    if (allowedDelivery) {
      if (!allowedDelivery.includes(deliveryMethod)) {
        if (deliveryFiltered.length === 1 && deliveryMethod == 0) {
          setDeliveryMethod(deliveryFiltered[0].delivery_id)
        } else {
          setDeliveryMethod(0)
        }
      }
    }
  }, [deliveryMethod, deliveryFiltered, onlyOnlineItems]) // eslint-disable-line

  const changeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = Number(e.target.value)
    const methodDetail = deliveryFiltered.filter(
      m => m.delivery_id === selectedValue
    )[0]
    if (methodDetail.specification_type) {
      if (methodDetail.specification_type === 'zasilkovna') {
        setZasilkovnaVisible(true)
      }
      // potential another extra delivery option/providers
    } else {
      setDeliverySpecification(undefined) // need to reset delivery specification
      changeMethodConfirm(selectedValue)
    }
  }

  const changeMethodConfirm = (selectedValue: number) => {
    selectedValue !== 0 && setDeliveryMethod(selectedValue)
  }

  const confirmZasilkovnaChoice = (specs: DeliverySpecs) => {
    const zasilkovnaDeliveryId = !isEmpty(deliveryFiltered)
      ? deliveryFiltered.filter(d => d.specification_type === 'zasilkovna')[0]
          .delivery_id
      : 0

    setDeliverySpecification(specs)
    changeMethodConfirm(zasilkovnaDeliveryId)
  }

  const getAllowedDelivery = () => {
    if (isEmpty(deliveryFiltered)) {
      return false
    }
    const allowedDeliveries = onlyOnlineItems
      ? deliveryFiltered.filter(d => d.is_online)
      : deliveryFiltered.filter(d => !d.is_online)
    return allowedDeliveries.reduce((acc: Array<number>, cur) => {
      return [...acc, cur.delivery_id]
    }, [])
  }

  return (
    <div className="deliveryChoice">
      {zasilkovnaVisible && (
        <ModalZasilkovna
          selected={deliverySpecification && deliverySpecification.data}
          close={() => setZasilkovnaVisible(!zasilkovnaVisible)}
          confirm={confirmZasilkovnaChoice}
        />
      )}
      <h2>
        {
          t('deliveryMethods') // eslint-disable-line
        }
      </h2>
      {!isEmpty(deliveryFiltered) &&
        deliveryFiltered.map((method: DeliveryMethodType) => {
          const allowedDelivery = getAllowedDelivery()
          const disabled = !method.enabled
            ? true
            : allowedDelivery && !allowedDelivery.includes(method.delivery_id)
          return (
            <div key={method.delivery_id}>
              <label
                htmlFor={`delivery_${method.delivery_id}`}
                className={`inputCont ${disabled ? 'inputCont--disabled' : ''}`}
              >
                {method.name} {/* zasilkovna */}
                {method.delivery_id == deliveryMethod &&
                  deliverySpecification && (
                    <span
                      onClick={() => setZasilkovnaVisible(true)}
                      className="pickupPlace--change"
                      title="změnit pobočku zásilkovny"
                    >
                      {deliverySpecification.label}
                    </span>
                  )}
                {/* -end zasilkovna- */}
                {method.price > 0 ? (
                  <b> {formatPriceOutput(method.price)}</b>
                ) : null}
                {/* (id:{method.delivery_id}) */}
                <input
                  type="radio"
                  name="delivery"
                  id={`delivery_${method.delivery_id}`}
                  onChange={changeMethod}
                  value={method.delivery_id}
                  checked={method.delivery_id == deliveryMethod ? true : false} // eslint-disable-line eqeqeq
                  disabled={disabled}
                />
                <span className="radiobtn"></span>
              </label>
            </div>
          )
        })}
    </div>
  )
}
export default DeliveryMethods
