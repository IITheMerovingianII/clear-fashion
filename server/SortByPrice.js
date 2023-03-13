const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://nessivictor:I7t8PsrDMXTjsYg9@cluster0.obntq7b.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

async function findProductsLessThan() {
const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
const db = client.db(MONGODB_DB_NAME);

const collection = db.collection('products');

const products = await collection.find().sort({ price: 1 }).toArray();

console.log('Products sorted by price');
console.log(products);
process.exit(0);

return products;
}
findProductsLessThan()