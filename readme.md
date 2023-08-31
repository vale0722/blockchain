# Simple Blockchain CLI

## Description:
This is a basic blockchain implementation project with functionality to handle wallets and transactions through a command line interface (CLI).

## Main Features:
- **Create and delete wallets.**
- **Carrying out transactions between wallets.**
- **Generation of blocks containing transactions.**
- **List of existing wallets with their balances.**

##Previous requirements:
Make sure you have Node.js installed on your system.

## Setting:
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the necessary dependencies.

## How to run:
Run the `node app.js` command at the root of the project directory.

Once executed, a menu will be displayed with the following options:
1. **Crear Wallet**
2. **Listar Wallets**
3. **Eliminar Wallet**
4. **Realizar Transacción**
5. **Generar Bloque**
6. **Salir**

Follow the on-screen prompts to perform actions like create a wallet, make a transaction, etc.

## Recommendations:
- To be able to carry out actions such as carrying out a transaction, you must create at least two wallets.
- In order to perform actions such as generating a block, you must create at least one transaction.


## Implementation details:
The program is built around three main modules:
- `Wallet`: Manages the creation and manipulation of wallets.
- `Transaction`: Manages the creation and validation of transactions.
- `Blockchain`: Represents the blockchain and is responsible for the creation of new blocks.

Transactions are temporarily stored in a `previousTransactions` array until a new block is generated, at which time they are added to the blockchain.

## License:
This project is licensed under the MIT license.