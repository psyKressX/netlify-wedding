require("dotenv").config();
const knex = require("knex");
const knexDB = knex({
  client: "pg",
  connection: {
    host: process.env.DB_URL,
    database: "wedding",
    user: "liam",
  },
});

exports.handler = async (req, context, callback) => {
  let status, res;
  await knexDB("guest_list")
    .select("*")
    .then(async (data1) => {
      let promises = data1.map((p) => knexDB("others").where({ id: p.id }));
      const data2 = await Promise.all(promises);
      for (let i = 0; i < data1.length; i++) {
        data1[i].others = data2[i];
      }
      res = data1;
      console.log("hello", res);
    })
    .catch((err) => console.log(err));
  await knexDB.destroy().then(() => {
    console.log("destroyed");
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(res),
    });
  });
};
