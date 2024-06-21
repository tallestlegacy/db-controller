import mongo from '$db/mongo';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

// Get all documents from an arbitrary collection

export const GET: RequestHandler = async ({ params }) => {
	const collectionName = params.collection_name;

	const collection = mongo.db.collection(collectionName);
	const cursor = collection.find({});
	const res = await mongo.readCursor(cursor);

	return json(res);
};

// Create arbitrary document

export const POST: RequestHandler = async ({ params, request }) => {
	const collectionName = params.collection_name;
	const body = await request.json();

	const date = new Date();

	const collection = mongo.db.collection(collectionName);
	const res = await collection.insertOne({
		...body,
		_createdAt: date,
		_updatedAt: date,
	});

	return json(res.insertedId);
};
