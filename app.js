// const { ApiPromise, WsProvider } = require('@polkadot/api');

// async function main() {
//     let api = null
//       let polkadot_api = "wss://rpc.polkadot.io"
//       let provider = new WsProvider(polkadot_api)
//       api = await ApiPromise.create({ provider })

//     if (api === null) {
//       throw "Select proper network"
//     }
  
//     let header = await api.rpc.chain.getBlock()
//     console.log(`Block Info \n ${header}`)
//   }
  
//   main().catch((e) => {
//     console.log("Error", e)
//   })


const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {

  let polkadot_api = "wss://rpc.polkadot.io"
  let provider = new WsProvider(polkadot_api)
  const api = await ApiPromise.create({ provider });

  // We only display a couple, then unsubscribe
  let count = 0;

  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
    console.log(`The latest block on Polkadot Chain is: #${header.number}`);

    if (++count === 256) {
      unsubscribe();
      process.exit(0);
    }
  });
}

main().catch(console.error);