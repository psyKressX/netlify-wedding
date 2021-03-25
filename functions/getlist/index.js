require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.SECRET,
});

exports.handler = async (req, context) => {
  try {
    const res = await client.query(q.Paginate(q.Match(q.Index("guests"))));
    console.log(res);
    return {
      statusCode: 200,
      body: res,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: "err",
    };
  }
};
