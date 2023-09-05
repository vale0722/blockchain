const { wallet } = require("../models/persistence");


const create = async function (data) {
  try {
    return await wallet.create({
      name: data.name,
      amount: data.amount,
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

const index = async function () {
  try {
    return await wallet.findAll();
  } catch (e) {
    console.log("Error: ", e);
  }
};

const show = async function (id) {
  try {
    return await wallet.findOne({
      where: { id },
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};


const update = async function (model, data) {
  try {
    return await model.update({
      name: data.name,
      amount: data.amount,
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

const findByName = async function (name) {
  try {
    return await wallet.findOne({
      where: {
        name: name,
      },
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

module.exports = {
  create,
  index,
  update,
  show,
  findByName,
};
