const Store = artifacts.require("Store");

module.exports = async (callback) => {
  const [storeOwner, seller, buyer] = await web3.eth.getAccounts()
  const amount = web3.utils.toWei('4', 'ether')
  const purpose = 'Sales on dippers'

  const store = await Store.deployed()

  let buyerBal = await web3.eth.getBalance(buyer)
  let sellerBal = await web3.eth.getBalance(seller)
  let storeOwnerBal = await web3.eth.getBalance(storeOwner)

  console.log(`Initial balance of buyer | ${web3.utils.fromWei(buyerBal.toString(), 'ether')}`)
  console.log(`Initial balance of seller   | ${web3.utils.fromWei(sellerBal.toString(), 'ether')}`)
  console.log(`Initial balance of storeOwner   | ${web3.utils.fromWei(storeOwnerBal.toString(), 'ether')}`)

  console.log(`\n ${purpose} for ${web3.utils.fromWei(amount.toString(), 'ether')} ethers... \n`)

  await store.payNow(seller, purpose, {from: buyer, value: amount})

  buyerBal = await web3.eth.getBalance(buyer)
  sellerBal = await web3.eth.getBalance(seller)
  storeOwnerBal = await web3.eth.getBalance(storeOwner)

  console.log(`Balance of buyer after sales | ${web3.utils.fromWei(buyerBal.toString(), 'ether')}`)
  console.log(`Balance of seller after sales | ${web3.utils.fromWei(sellerBal.toString(), 'ether')}`)
  console.log(`Balance of storeOwner after sales | ${web3.utils.fromWei(storeOwnerBal.toString(), 'ether')}`)

  callback()
}