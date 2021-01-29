import React from 'react'
import { PickupPlaceDetailType } from 'utils/types'
const isEmpty = require('ramda').isEmpty

type Props = {
  place: PickupPlaceDetailType
  select: () => void
}
const PickupPlaceDetail = ({ place, select }: Props) => {
  const opening = !isEmpty(place) && JSON.parse(place.opening) //compactShort, compactLong, tableLong, regular, exceptions
  console.log('opening', opening)
  return (
    <>
      {isEmpty(place) ? (
        <div className="pickupPlace--detail">Vyberte pobočku</div>
      ) : (
        <div className="pickupPlace--detail">
          <div className="pickupPlace--detailBody">
            <div className="pickupPlace--leftHalf">
              <h2 className="pickupPlace--name">{place.name}</h2>
              <p>
                <b>Adresa: </b>
                {place.city}, {place.zip}, {place.street}{' '}
                <a
                  href={`http://maps.google.com/maps?q=${place.lat},${place.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  mapa
                </a>
              </p>
              <div>
                <b>Jak místo najdete:</b>
                {place.special !== '' && <div>{place.special}</div>}
                {place.directions !== '' && (
                  //consider use of https://bundlephobia.com/result?p=dompurify@2.2.6
                  <div dangerouslySetInnerHTML={{ __html: place.directions }} />
                )}
              </div>
              <p>
                <b>Profil provozovny: </b>
                <a href={place.url} target="_blank" rel="noopener noreferrer">
                  {place.url}
                </a>
              </p>
            </div>
            <div className="pickupPlace--rightHalf">
              <b>Oteviraci doba</b>
              <div dangerouslySetInnerHTML={{ __html: opening.tableLong }} />

              {opening.exceptions.exception && (
                //opening.exceptions.exception?.date && (
                // ||btoa(opening.exceptions[0]) !== 'CgkJ') && (
                <div>
                  <b>Zavřeno ve dnech:</b>{' '}
                  {Array.isArray(opening.exceptions.exception) ? (
                    opening.exceptions.exception.map(
                      (exc: any, index: number) => (
                        <span key={index}>{exc.date}, </span>
                      )
                    )
                  ) : (
                    <span>{opening.exceptions.exception.date}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <button className="formSubmit formSubmit--ready" onClick={select}>
            Vyber
          </button>
        </div>
      )}
    </>
  )
}

export default PickupPlaceDetail
