Wallet = require('./wallet');
Transaction = require('./transaction');
Blockchain = require('./blockchain');

const crypto = require('crypto');
const readline = require('readline');

let wallets = {};
let transactions = {};
let previousTransactions = [];
let blocks = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    console.log("\n-------------------------------");
    console.log("\nMenu Principal:");
    console.log("\n1. Crear Wallet");
    console.log("\n2. Listar Wallets");
    console.log("\n3. Eliminar Wallet");
    console.log("\n4. Realizar Transacción");
    console.log("\n5. Generar Bloque");
    console.log("\n6. Salir");
    console.log("\n-------------------------------\n");

    let options = {
        '1': () => createWallet(),
        '2': () => listWallets(),
        '3': () => deleteWallet(),
        '4': () => makeTransaction(),
        '5': () => generateBlock(),
        '6': () => process.exit(),
    }

    rl.question("Elige una opción: ", function (option) {
        if(options[option] ?? false) {
            options[option]()
        } else {
            console.log("Opción no válida. Inténtalo de nuevo. \n");
            mainMenu();
        }
    });
}

function createWallet() {
    let name = '';
    let amount = 0;
    rl.question("Ingresa el nombre de la Wallet: ", function (inputName) {
        name = inputName

        rl.question("\nIngresa el monto de la Wallet: ", function (inputAmount) {
            amount = parseFloat(inputAmount)

            wallets[name] = new Wallet(name, amount);
            console.log(`\nWallet ${name} creada con éxito.`);
            mainMenu();
        });
    });
}

function listWallets() {
    console.log("\nWallets existentes:");
    Object.values(wallets).forEach(function (wallet) {
        console.log(`- Identificador: ${wallet.getIdentifier()} - Monto: ${wallet.getAmount()}`);
    })
    mainMenu();
}

function deleteWallet() {
    rl.question("Ingresa el nombre de la Wallet a eliminar: ", function (name) {
        if (wallets[name]) {
            delete wallets[name];
            console.log(`\nWallet ${name} eliminada con éxito.`);
        } else {
            console.log("\nWallet no encontrada.");
        }
        mainMenu();
    });
}

function makeTransaction() {
    rl.question("Nombre de la Wallet de origen: ", function (issuerWalletName) {
        const issuerWallet = wallets[issuerWalletName];
        if (!issuerWallet) {
            console.log("\nWallet no encontrada.");
            mainMenu();
            return;
        }
        rl.question("Nombre de la Wallet destinataria: ", function (receiverWalletName) {
            const receiverWallet = wallets[receiverWalletName];
            if (!receiverWallet) {
                console.log("\nWallet no encontrada.");
                mainMenu();
                return;
            }
            rl.question("Cantidad a transferir: ", function (amountStr) {
                const amount = parseInt(amountStr, 10);
                if (isNaN(amount)) {
                    console.log("\nCantidad inválida.");
                    mainMenu();
                    return;
                }

                const transaction = issuerWallet.discount(amount, receiverWallet.getIdentifier(), 1);
                if(transaction) {
                    receiverWallet.increase(transaction);
                    previousTransactions.push(transaction);
                    console.log(`\nTransacción exitosa: ${amount} transferidos de ${issuerWalletName} a ${receiverWalletName}.`);

                }

                mainMenu();
            });
        });
    });
}

function coinbase() {
    if(Object.keys(transactions).length) {
        return transactions[Object.keys(transactions).length -1];
    }

    transactions[0] = new Transaction(0, 'coinbase', '', 0.0);
    return transactions[0];
}


function addBlock(previousTransactions) {
    let block;

    if(blocks.length === 0 && !previousTransactions.length) {
        console.log('Error: No existen transacciones');
        return;
    }

    block = blocks.length === 0
        ? new Blockchain(0, [coinbase().all()], crypto.createHash('sha256').update('0').digest('hex'))
        : new Blockchain(
        blocks.length,
        [coinbase().all()].concat(previousTransactions),
        blocks[blocks.length - 1].hash
    );

    let blockDict = block.findNonce();

    console.log('------- BLOCK INFO: -------');
    console.log('block nonce: ' + blockDict.block.header.nonce);
    console.log('hash: ' + blockDict.hash );
    console.log('--------------');

    blocks.push(blockDict);
}

function generateBlock() {
    addBlock(previousTransactions);
    previousTransactions = [];
    console.log("Bloque generado con éxito.");
    mainMenu();
}

mainMenu();
