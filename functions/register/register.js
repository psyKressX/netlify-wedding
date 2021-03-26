// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
require("dotenv").config();
const { valid } = require("./accountValidation");
require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (req, context) => {
  const client = new faunadb.Client({
    secret: process.env.SECRET,
  });
  try {
    const body = JSON.parse(req.body);
    formErrors = valid(body.form);
    let failed = false;
    for (var msg in formErrors) {
      if (formErrors[msg] !== null) {
        failed = true;
      }
    }
    console.log(formErrors);
    if (failed) return { statusCode: 400, body: JSON.stringify(formErrors) };
    body.form.others = body.others;
    console.log(body.form);
    const res = await client.query(
      q.Create(q.Collection("guest_list"), { data: body.form })
    );
    console.log(res);
    return { statusCode: 200 };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
    };
  }
};
