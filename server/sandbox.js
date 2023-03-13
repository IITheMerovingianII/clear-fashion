/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const CircleSportswearbrand = require('./eshops/CircleSportswearbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const fs = require('fs');
const links = [
  'https://www.montlimart.com/15-accessoires',
  'https://www.montlimart.com/99-vetements',
  'https://www.dedicatedbrand.com/en/men/news#page=5',
  'https://www.dedicatedbrand.com/en/women/news#page=7',
  'https://shop.circlesportswear.com/collections/all',
  'https://www.montlimart.com/14-chaussures'
];
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://paul:C1s3cr3t01!@cluster0.j2obhyu.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

async function sandbox (eshop = links) {
  var products = [];
  try {
    for (const link of links) {
		console.log(`🕵️‍♀️  browsing ${link} eshop`);

		const dedicatedproducts = await dedicatedbrand.scrape(link);	
		const CircleSportswearproducts = await CircleSportswearbrand.scrape(link);	
		const montlimartproducts = await montlimartbrand.scrape(link);
		products = dedicatedproducts.concat(dedicatedproducts,CircleSportswearproducts, montlimartproducts,products);
	}
	
	//products = [...new Set(products)]
	products =[...new Set(products.map(JSON.stringify))].map(JSON.parse);
	products = products.filter(product => product.name !== 'E-CARTE CADEAU');
	const productsJson = JSON.stringify(products);
	console.log(products);
	console.log('done');
	
	const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
	const db = client.db(MONGODB_DB_NAME);

	const collection = db.collection('products');
	const result = await collection.insertMany(products);

	console.log(`Inserted ${result.insertedCount} document(s)`);
	try {
		fs.writeFileSync('products.json', productsJson);
		console.log('Products saved to products.json');
	} catch (err) {
		console.error(err);
	}
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
	process.exit(0);
}

sandbox();