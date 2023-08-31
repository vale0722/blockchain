class Transaction {
    constructor(id, issuer, receiver, amount) {
        this.id = id;
        this.issuer = issuer;
        this.receiver = receiver;
        this.amount = amount;
        this.createdAt = Date.now();
    }

    getId() {
        return this.id;
    }

    getAmount() {
        return this.amount;
    }

    getIssuer() {
        return this.issuer;
    }

    getReceiver() {
        return this.receiver;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    all() {
        return {
            id: this.getId(),
            issuer: this.getIssuer(),
            receiver: this.getReceiver(),
            amount: this.getAmount(),
            createdAt: this.getCreatedAt()
        };
    }
}

module.exports = Transaction;