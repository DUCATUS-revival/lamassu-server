const axios = require('axios')
const BN = require('../../../bn')

function ticker (account, fiatCode, cryptoCode) {
  return axios.get('https://www.ducatuscoins.com/api/v1/rates/')
    .then(r => {
      const ducUsdcPrice = r.data.DUC.USDC
      const geckoFiatCode = fiatCode.toLowerCase()
      const usdcId = 'usd-coin'

      return axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + usdcId + '&vs_currencies=' + geckoFiatCode)
        .then(res => {
          const fiatUsdcRate = res.data[usdcId][geckoFiatCode]
          const ducFiatRate = ducUsdcPrice * fiatUsdcRate
          return Promise.resolve({
            rates: {
              ask: BN(ducFiatRate),
              bid: BN(ducFiatRate)
            }
          })
        })
    })
  
}

module.exports = {
  ticker,
  name: 'Ducatus'
}
