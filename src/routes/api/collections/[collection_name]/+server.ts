import mongo from '@/../routes/api/mongo.server';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

// Get all documents from an arbitrary collection

export const GET: RequestHandler = async ({ params }) => {
	const collectionName = params.collection_name;

	try {
		const res = await mongo.run(async function () {
			const collection = mongo.db.collection(collectionName);
			const cursor = collection.find({});
			return await mongo.readCursor(cursor);
		});

		return json(res);
	} catch (e) {
		return error(500, Error(JSON.stringify(e)));
	}
};

// Create arbitrary document

export const POST: RequestHandler = async ({ params, request }) => {
	const collectionName = params.collection_name;
	const body = await request.json();

	const date = new Date();

	try {
		const res = await mongo.run(async function () {
			const collection = mongo.db.collection(collectionName);
			const res = await collection.insertOne({
				...body,
				_createdAt: date,
				_updatedAt: date
			});
			return res.insertedId;
		});

		return json(res);
	} catch (e) {
		return error(500, Error(JSON.stringify(e)));
	}
};
