// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
require("dotenv").config();
const knex = require("knex");
const { valid } = require("./accountValidation");
const knexDB = knex({
  client: "pg",
  connection: {
    host: process.env.DB_URL,
    database: "wedding",
    user: "liam",
  },
});

exports.handler = async (req, context, callback) => {
  const body = JSON.parse(req.body);
  const {
    firstName,
    lastName,
    attending,
    email,
    others,
    selection,
    diet,
  } = body.form;
  console.log(body.form);
  formErrors = valid(body.form);

  let failed = false;
  let res, status;
  for (var msg in formErrors) {
    if (formErrors[msg] !== null) {
      failed = true;
    }
  }

  if (failed) {
    status = 400;
    res = JSON.stringify(formErrors);
  } else {
    await knexDB("guest_list")
      .insert({
        firstName,
        lastName,
        attending,
        email,
        others,
        selection,
        diet,
      })
      .returning("id")
      .then(async (id) => {
        if (body.others.length > 0) {
          console.log("has");
          const insrt = body.others.map((i) => ({
            id: id[0],
            name: i,
          }));
          console.log(insrt);
          await knexDB("others")
            .insert(insrt)
            .then(() => {
              return (status = 200);
            })
            .catch((err) => console.log("insert error", err));
        } else {
          return (status = 200);
        }
        console.log("after");
      })
      .catch((err) => console.log(err));
  }
  await knexDB.destroy().then(() => {
    console.log("destroyed");

    callback(null, {
      statusCode: status,
      body: res,
    });
  });
};
