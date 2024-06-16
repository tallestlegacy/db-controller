import { MONGODB_DATABASE, MONGODB_URL } from '$env/static/private';
import { FindCursor, MongoClient, ServerApiVersion, type Filter, type FindOptions } from 'mongodb';

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

async function findDocuments(cursor: FindCursor) {
	const docs = [];

	for await (const doc of cursor) {
		docs.push(doc);
	}

	return docs;
}

export default { client, run, db, readCursor: findDocuments };
