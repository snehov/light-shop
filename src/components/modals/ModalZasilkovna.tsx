import React, {
  useState,
  useDispatch,
  useGlobal,
  useEffect,
  useRef,
} from 'reactn'
import Modal from './Modal'
import { debounce } from 'utils/formsFnc'
import PickupPlaceDetail from '../PickupPlaceDetail'
import { PickupPlaceDetailType, DeliverySpecs } from 'utils/types'

type Props = {
  close: () => void
  selected?: string
  confirm: (specs: DeliverySpecs) => void
}

const debounceFnc = debounce((launchDebounced: any) => {
  launchDebounced()
}, 300)

const ModalZasilkovna = ({ close, confirm, selected }: Props) => {
  const [searchValue, setSeatchValue] = useState('')
  const [searchZasilkovnaRes] = useGlobal('searchZasilkovnaRes')
  const [selectedZasilkovnaPlace] = useGlobal('selectedZasilkovnaPlace')
  const [selectedPlaceDetail, setSelectedPlaceDetail] = useState<
    PickupPlaceDetailType | undefined
  >() // pre-choice before confim
  const searchZasilkovnaPlace = useDispatch('searchZasilkovnaPlace')
  const setZasilkovnaPlace = useDispatch('setZasilkovnaPlace') //confirm selected choice
  const scrollView = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (selectedZasilkovnaPlace) {
      setSelectedPlaceDetail(selectedZasilkovnaPlace)
    }
  }, [selectedZasilkovnaPlace])

  const changeSearchValue = (value: string) => {
    setSeatchValue(value)
    debounceFnc(() => {
      searchZasilkovnaPlace(value)
    })
  }
  const showPlaceDetail = (id: number) => {
    const detailData = searchZasilkovnaRes.filter(s => s.id === id)[0]
    setSelectedPlaceDetail(detailData)
    if (scrollView !== null && scrollView.current !== null) {
      scrollView.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const selectPlace = () => {
    if (selectedPlaceDetail) {
      console.log("dispatch setZasilkovnaPlace", selectedPlaceDetail)
      setZasilkovnaPlace(selectedPlaceDetail, () => confirmModal())
    }
  }
  const confirmModal = () => {
    if (selectedPlaceDetail) {
      const label = `${selectedPlaceDetail.city}, ${selectedPlaceDetail.place}`
      confirm({ label, data: String(selectedPlaceDetail.id) })
      close()
    }
  }

  return (
    <Modal close={close}>
      <div ref={scrollView}>
        <h2 className="pickupPlace--header">Výběr pobočky zásilkovny</h2>
        {selectedPlaceDetail && (
          <PickupPlaceDetail place={selectedPlaceDetail} select={selectPlace} />
        )}
        <div className="pickupPlace--searchInstruction">
          Zadejte PSČ, Město, Ulici či jméno pobočky, kam chcete zásilku doručit
        </div>
        <input
          className="input pickupPlace--search"
          type="text"
          value={searchValue}
          onChange={e => changeSearchValue(e.target.value)}
          ref={input => input && input.focus()}
        />
        {searchZasilkovnaRes.map(s => (
          <div
            key={s.id}
            className="pickupPlace--resItem"
            onClick={() => showPlaceDetail(s.id)}
          >
            {s.city}, {s.zip}, {s.street}, {s.place} (id:{s.id})
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default ModalZasilkovna
