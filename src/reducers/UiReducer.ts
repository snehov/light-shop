import { setGlobal, addReducer } from 'reactn'

setGlobal({ showOrderCompletedScreen: false })
setGlobal({ orderCompletedScreenType: false })

addReducer('showCompletedScreen', (global, dispatch, screenType) => {
  return {
    orderCompletedScreenType: screenType,
    showOrderCompletedScreen: true,
  }
})
