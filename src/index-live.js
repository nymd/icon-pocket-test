import { IconWallet } from 'icon-sdk-js';

// Import PocketJS and declare the following variables
const Pocketjs = require('@pokt-network/pocket-js');
const pocket = Pocketjs.Pocket
const Configuration = Pocketjs.Configuration;
const PocketAAT = Pocketjs.PocketAAT;
const HttpRpcProvider = Pocketjs.HttpRpcProvider;
const Node = Pocketjs.Node;
const BondStatus = Pocketjs.BondStatus;

const node = new Node(
    "765715602C85830EC95CE789B4F6E5B81DF7ED16", //nodeAddress,
    "29f4e19c2e06d9e6f87ef13f91b49ee70c9d4425aa524592e46a517b365946ad", //publicKey,
    false, //jailedStatus,
    BondStatus.bonded, //BondStatus,
    "1000000000", //stakedTokens,
    "http://node1.testnet.pokt.network:8081", //serviceURL,
    ["8cf7f8799c5b30d36c86d18f0f4ca041cf1803e0414ed9e9fd3a19ba2f0938ff"] //chains
);

const config = new Configuration([node])
const provider = new HttpRpcProvider(new URL(node.serviceURL))
const pocketInstance = new pocket(config, provider)

/*
const getPocketNodeQuery = pocketInstance.rpc.query.getNodes()
getPocketNodeQuery.then( function(result) {
    console.log(result)
})
*/

const myPK = Buffer.from("7fcec12584794bdccb449e380400a3865c732d49d0ae0a3e43b8720239a29c022af509331e5ff3bb710162e895063c0f5e8689380023f34635a81a8243eac1af","hex")
const importQuery = pocketInstance.keybase.importAccount(myPK, "pocket");

importQuery.then( function(importResult) {
    console.log(importResult);

    const unlockQuery = pocketInstance.keybase.unlockAccount(importResult.addressHex, "pocket", 0);
    unlockQuery.then( function(unlockResult) {
        console.log(unlockResult);

        const acctPubk = "ab4ef282930bc21904076cbbbe3a463a4917dc1906d9d28b5c37d0d34ef5668f"

        const acctPriv = "412844aefbeee579b82395ac40d131f417f701cb0aa1928220b990b738ac929aab4ef282930bc21904076cbbbe3a463a4917dc1906d9d28b5c37d0d34ef5668f"

        const pocketAAT = PocketAAT.from(
            "0.0.1",
            importResult.publicKey.toString("hex"),
            acctPubk,
            acctPriv
        );

        var payload = {
            "jsonrpc": "2.0",
            "method": "eth_getBalance",
            "params": ["0xf892400Dc3C5a5eeBc96070ccd575D6A720F0F9f", "latest"],
            "id": (new Date()).getTime()
        }

        const relayQuery = pocketInstance.sendRelay(JSON.stringify(payload), "8cf7f8799c5b30d36c86d18f0f4ca041cf1803e0414ed9e9fd3a19ba2f0938ff", pocketAAT);

        relayQuery.then( function(relayResult) {
            console.log(relayResult);
        });
    });
});
