const { MongoClient, ObjectId } = require('mongodb')


const initData = async config => {
  // 创建客户端
  const client = new MongoClient(
    config.client.url,
    config.client.options
  )
  let ret
  // 创建连接
  ret = await client.connect()
  const db = client.db('kkbhub')
  const articles = db.collection('articles')
  ret = await articles.deleteMany({})

  ret = await articles.insertMany(require('./articles.js'))
  const users = db.collection('users')
  ret = await users.deleteMany({})
  ret = await users.insertMany(require('./users.js'))
  await client.close()

}
module.exports = initData
// 测试功能
// initData({
//     client: {
//         url: 'mongodb://127.0.0.1:27017/kkbhub'
//     }

// })
