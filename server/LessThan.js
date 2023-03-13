const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://nessivictor:I7t8PsrDMXTjsYg9@cluster0.obntq7b.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

async function findProductsLessThan(price=0) {
const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
const db = client.db(MONGODB_DB_NAME);

const collection = db.collection('products');

const products = await collection.find({ price: { $lt: Number(price) } }).toArray();

console.log(`Products less than '${price}':`);
console.log(products);
process.exit(0);

return products;
}
const [,, price] = process.argv;
findProductsLessThan(price)