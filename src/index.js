const IconWallet = require('icon-sdk-js');

// Import PocketJS and declare the following variables
const Pocketjs = require('@pokt-network/pocket-js');
const pocket = Pocketjs.Pocket
const Configuration = Pocketjs.Configuration;
const PocketAAT = Pocketjs.PocketAAT;
const HttpRpcProvider = Pocketjs.HttpRpcProvider;

const dispatcher = new URL("http://0.0.0.0:8081")
const config = new Configuration(5, 10000, 60000)
const provider = new HttpRpcProvider(dispatcher)
const pocketInstance = new pocket([dispatcher], provider, config)

const myPK = Buffer.from("22c6cf663e9932bb691b1432c9d8dae906d2609ff85e08792fceb10b2a0e9feffa457de4393c386ae3c4dde8703bf25080cc9909d98b55fbc7d6f2ca057450a2","hex")
const importQuery = pocketInstance.keybase.importAccount(myPK, "yo");

importQuery.then( function(importResult) {

    const unlockQuery = pocketInstance.keybase.unlockAccount("2d089de210afd5176b46b38b7c5f4b1ce63622bf", "yo", 0);
    unlockQuery.then( function(unlockResult) {

        const pocketAAT = PocketAAT.from(
            "0.0.1",
            "fa457de4393c386ae3c4dde8703bf25080cc9909d98b55fbc7d6f2ca057450a2",
            "fa457de4393c386ae3c4dde8703bf25080cc9909d98b55fbc7d6f2ca057450a2",
            "22c6cf663e9932bb691b1432c9d8dae906d2609ff85e08792fceb10b2a0e9feffa457de4393c386ae3c4dde8703bf25080cc9909d98b55fbc7d6f2ca057450a2"
        );

        var payload = {

        }

        const relayQuery = pocketInstance.sendRelay("", "d9d77bce50d80e70026bd240fb0759f08aab7aee63d0a6d98c545f2b5ae0a0b8", pocketAAT, undefined, undefined, "GET", "/api/v1/avail/peer");

        relayQuery.then( function(relayResult) {
            console.log(relayResult);
        });
    });
});
