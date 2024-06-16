import type { RequestHandler } from './$types';
import mongo from '@/../routes/api/mongo.server';
import { error, json } from '@sveltejs/kit';

// Get all documents from an arbitrary collection

export const GET: RequestHandler = async ({ params }) => {
	const collectionName = params.collection_name;

	const res = await mongo.run(async function () {
		const collection = mongo.db.collection(collectionName);
		const cursor = collection.find({});
		return await mongo.readCursor(cursor);
	});

	return json(res);
};

// Create arbitrary document

export const PUT: RequestHandler = async ({ params, request }) => {
	const collectionName = params.collection_name;
	const body = await request.json();

	const res = await mongo.run(async function () {
		const collection = mongo.db.collection(collectionName);
		const res = await collection.insertOne(body);
		return res.insertedId;
	});

	return res;
};
