module.exports = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [process.env.ENTITY_PATH],
  synchronize: true,
  extra: {
    ssl: process.env.DB_SSL || false,
  },
};
