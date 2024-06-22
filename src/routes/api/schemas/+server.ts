import mongo from '$db/mongo';
import { SCHEMA_COLLECTION_NAME } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

// Get all schemas
export const GET: RequestHandler = async () => {
	const collection = mongo.db.collection(SCHEMA_COLLECTION_NAME);
	const cursor = collection.find({}, { projection: { fields: 0 } });
	return json(await mongo.readCursor(cursor));
};

// Create a schema
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	delete body._id;

	const collection = mongo.db.collection(SCHEMA_COLLECTION_NAME);
	const res = await collection.insertOne(body);
	mongo.db.createCollection(body.name);

	return json(res.insertedId);
};
