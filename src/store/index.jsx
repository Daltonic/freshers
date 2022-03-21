import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState } = createGlobalState({
  isLoggedIn: false,
  alert: { show: false, msg: '', color: '' },
  cart: [],
  contract: null,
  connectedAccount: '',
  ethToUsd: 0,
})

const setAlert = (msg, color = 'amber') => {
  setGlobalState('alert', { show: true, msg, color })
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: '', color })
  }, 5000)
}

const latestPrice = async () => {
  await fetch(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
  )
    .then((data) => data.json())
    .then((res) => setGlobalState('ethToUsd', res.USD))
}

export { useGlobalState, setGlobalState, setAlert, latestPrice }
