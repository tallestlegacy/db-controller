import { MONGODB_DATABASE, MONGODB_URL } from '$env/static/private';
import { FindCursor, MongoClient } from 'mongodb';

const client = new MongoClient(MONGODB_URL);

export function start_mongo() {
	return client.connect();
}

async function findDocuments(cursor: FindCursor) {
	const docs = [];

	for await (const doc of cursor) {
		docs.push(doc);
	}

	return docs;
}

export default {
	db: client.db(MONGODB_DATABASE),
	client,
	readCursor: findDocuments,
};
