import type { RequestHandler } from './$types';

import mongo from '@/../routes/api/mongo.server';
import { SCHEMA_COLLECTION_NAME } from '$env/static/private';
import { json } from '@sveltejs/kit';

// Get all schemas
export const GET: RequestHandler = async () => {
	const res = await mongo.run(async function () {
		const collection = mongo.db.collection(SCHEMA_COLLECTION_NAME);
		const cursor = collection.find({}, { projection: { fields: 0 } });
		return await mongo.readCursor(cursor);
	});
	console.log(res);

	return json(res);
};

// Create a schema
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	delete body._id;

	const res = await mongo.run(async function () {
		const collection = mongo.db.collection(SCHEMA_COLLECTION_NAME);
		const res = await collection.insertOne(body);
		return res.insertedId;
	});

	return json(res);
};
