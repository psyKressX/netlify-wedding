require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async (req, context) => {
  const client = new faunadb.Client({
    secret: process.env.SECRET,
  });
  try {
    const res = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("guests"))),
        q.Lambda((x) => q.Get(x))
      )
    );
    const data = res.data.map((i) => i.data);
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
    };
  }
};
