if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  dialect: process.env.DB_CONNECTION || 'sqlite',
  storage:  process.env.DB_DATABASE || '/Users/valeriagranada/blockchain-js/src/config/blockchain.sqlite',
  options: {
    dialect: process.env.DB_CONNECTION || "sqlite",
    storage:  process.env.DB_DATABASE || '/Users/valeriagranada/blockchain-js/src/config/blockchain.sqlite',
    define: {
      underscored: true,
      timestamps: true,
      created_at: "created_at",
      updated_at: "updated_at",
    },
  },
};
