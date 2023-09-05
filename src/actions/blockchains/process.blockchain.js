const { BlockchainQuery, TransactionQuery, WalletQuery } = require("../../data-access");
const crypto = require("crypto");
const {Statuses} = require("../../constants");

module.exports = async function (request) {
  const block = await BlockchainQuery.create({});
  const afterBlock = await BlockchainQuery.getLast();

  const transactions = request.body.transactions;

  for (const transaction of transactions) {
    let issuer = await WalletQuery.findByName(transaction.issuer);
    let receiver = await WalletQuery.findByName(transaction.receiver);
    let status = null;

      if(issuer.amount >= transaction.amount) {
        status = Statuses.APPROVED;

        issuer = await WalletQuery.update(issuer, {
          name: issuer.name,
          amount: issuer.amount - transaction.amount,
        });
        receiver = await WalletQuery.update(receiver, {
          name: receiver.name,
          amount: receiver.amount + transaction.amount,
        });
      }

      transaction.status = status ?? Statuses.REJECTED;
      await TransactionQuery.create({
        block_id: block.id,
        issuer_id: issuer.id,
        receiver_id: receiver.id,
        amount: transaction.amount,
        status: transaction.status,
      });
      console.log('Transacción creada')
    }

    const coinbase = {
      status: Statuses.APPROVED,
      issuer: 'coinbase',
      receiver: '',
      amount: 1
    };

    console.log('Coinbase')
    transactions.push(coinbase);

    const blockData = {
      header: {
        id: block.id,
        created_at: block.created_at,
        after_hash: afterBlock ? afterBlock.hash : findNonce({
          header: {
            id: 0,
            created_at: Date.now(),
            after_hash: crypto.createHash('sha256').update('0').digest('hex'),
            hash: merkelTree([coinbase]),
            nonce: 0
          },
          body: {transactions}
        }).hash,
        hash: merkelTree(transactions),
        nonce: 0
      },
      body: {transactions}
    }

    console.log('construye data')
    block.after_hash = blockData.header.after_hash

    let blockDict = findNonce(blockData);

    blockData.header.hash = blockDict.hash
    block.nonce = blockDict.block.header.nonce
    block.hash = blockData.header.hash

  await BlockchainQuery.update(block, {
      after_hash: block.after_hash,
      hash: block.hash,
      nonce: block.nonce,
    });

    return {
      block: blockData,
      hash: block.hash,
    };
};

function findNonce(block) {
  while (crypto.createHash('sha256').update(JSON.stringify(block)).digest('hex').substr(0, 4) !== '0000') {
    block.header.nonce++;
    console.log(block.header.nonce, crypto.createHash('sha256').update(JSON.stringify(block)).digest('hex'));
  }
  return {
    hash: crypto.createHash('sha256').update(JSON.stringify(block)).digest('hex'),
    block: block
  };
}


function merkelTree(transactions) {
  if (transactions.length === 0) return null;

  const result = transactions.length === 1
      ? crypto.createHash('sha256').update(
          this.merkelTree(transactions.slice(0, transactions.length / 2))
          + this.merkelTree(transactions.slice(transactions.length / 2))
      ).digest('hex')
      : crypto.createHash('sha256').update(JSON.stringify(transactions[0])).digest('hex');

  console.log('merkelTree', transactions, result)
  return result;
}