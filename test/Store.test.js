const Store = artifacts.require('Store')

require('chai').use(require('chai-as-promised')).should()

const toWei = (num) => web3.utils.toWei(num.toString())
const fromWei = (num) => web3.utils.fromWei(num.toString())

contract('Store', ([storeOwner, buyer, seller]) => {
  const feePercent = 10
  const storeName = 'Freshers'

  let store

  beforeEach(async () => {
    store = await Store.new(storeName, storeOwner, feePercent)
  })

  describe('deployment', () => {
    it('confirms store name', async () => {
      const result = await store.storeName()
      result.should.equal(storeName)
    })

    it('confirms store owner', async () => {
      const result = await store.storeOwner()
      result.should.equal(storeOwner)
    })

    it('confirms sales fee', async () => {
      const result = await store.feePercent()
      result.toString().should.equal(feePercent.toString())
    })
  })

  describe('Sales process', () => {
    const amount = fromWei(toWei(4))
    const purpose = 'Sales on dippers'

    it('confirms increase in sales of store and seller', async () => {
      // Sales of seller before purchase
      let result = await store.salesOf(seller)
      result.toString().should.equal('0')

      // Sales of store before purchase
      result = await store.storeSales()
      result.toString().should.equal('0')

      // Perform sales
      await store.payNow(seller, purpose, { from: buyer, value: amount })

      // Sales of after after purchase
      result = await store.salesOf(seller)
      result.toString().should.equal('1')

      // Sales of store after purchase
      result = await store.storeSales()
      result.toString().should.equal('1')
    })
  })
})
