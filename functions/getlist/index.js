const faunaDB = require('faunadb');
const q = faunaDB.query;
const dbName = new faunaDB.Client({
  secret: process.env.SECRET
})

exports.handler = async () => {
  return dbName.query(faunaDB.query(
      q.Map(
        q.Paginate(Documents(Collection('guest_list'))),
        q.Lambda(x => q.Get(x))
      )
    ).then(indexedData => {
    const data = indexedData.data.map((i) => i.data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate'
      }
    }
  }
}
