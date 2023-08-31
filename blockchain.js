let crypto = require("crypto");

class Blockchain {
    constructor(id, transactions, afterHash) {
        this.header = {
            id: id,
            created_at: Date.now(),
            after_hash: afterHash,
            hash: this.merkelTree(transactions),
            nonce: 0
        }

        this.body = {
            transactions: transactions
        }
    }

    merkelTree(transactions) {
        if (transactions.length === 0) return null;
        if (transactions.length === 1) return crypto.createHash('sha256').update(JSON.stringify(transactions[0])).digest('hex');

        let left = this.merkelTree(transactions.slice(0, transactions.length / 2));
        let right = this.merkelTree(transactions.slice(transactions.length / 2));

        return crypto.createHash('sha256').update(left + right).digest('hex');
    }

    findNonce() {
        while (crypto.createHash('sha256').update(JSON.stringify(this.all())).digest('hex').substr(0, 4) !== '0000') {
            this.header.nonce++;
        }
        return {
            hash: crypto.createHash('sha256').update(JSON.stringify(this.all())).digest('hex'),
            block: this.all()
        };
    }

    all() {
        return {
           header: this.header,
           body: this.body
        }
    }
}

module.exports = Blockchain;