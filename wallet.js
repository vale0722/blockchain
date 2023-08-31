Transaction = require('./transaction');

class Wallet {
    constructor(identifier, amount = 0.0) {
        this.identifier = identifier;
        this.amount = amount;
        this.transactions = [];
    }

    getAmount() {
        return this.amount;
    }

    getIdentifier() {
        return this.identifier;
    }

    increase(transaction) {
        this.amount += parseFloat(transaction.getAmount());
        this.transactions.push(transaction.getId());
        console.log(`Se depositó ${transaction.getAmount()}. Nuevo valor: ${this.getAmount()}`);
    }

    discount(amount, receiver, id) {
        if (amount <= this.getAmount()) {
            this.amount -= amount;
            this.transactions.push(id);
            console.log(`Se descontó ${amount}. Nuevo valor: ${this.getAmount()}`);
            return new Transaction(id, this.getIdentifier(), receiver, amount);
        }

        console.log(`No hay suficiente monto para descontar ${amount}.`);
        return null;
    }

    all() {
        return {
            identifier: this.getIdentifier(),
            amount: this.getAmount(),
            transactions: this.transactions
        };
    }
}

module.exports = Wallet;