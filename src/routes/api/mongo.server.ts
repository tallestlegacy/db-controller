import { MONGODB_DATABASE, MONGODB_URL } from '$env/static/private';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = MONGODB_URL;

const client = new MongoClient(uri);

async function run(func: () => any) {
	let data: any = {};
	try {
		await client.connect();
		data = await func();
	} finally {
		client.close();
		return data;
	}
}

const db = client.db(MONGODB_DATABASE);

export default { client, run, db };
