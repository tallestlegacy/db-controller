import type { RequestHandler } from './$types';

import mongo from '@/../routes/api/mongo.server';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

// Find an arbitrary document
export const GET: RequestHandler = async ({ params }) => {
	const collectionName = params.collection_name;
	const _id = new ObjectId(params.document_id);

	const res = await mongo.run(async function () {
		const collection = mongo.db.collection(collectionName);
		const cursor = collection.find({ _id });
		return await mongo.readCursor(cursor);
	});

	return json(res);
};

// Update an arbitrary document
export const PUT: RequestHandler = async ({ params, request }) => {
	const collectionName = params.collection_name;
	const _id = new ObjectId(params.document_id);
	const body = await request.json();
	delete body._id;

	const res = await mongo.run(async function () {
		const collection = mongo.db.collection(collectionName);
		const res = await collection.updateOne({ _id }, { $set: body });
		return res.modifiedCount;
	});

	return res;
};

// Find an arbitrary document
export const DELETE: RequestHandler = async ({ params }) => {
	const collectionName = params.collection_name;
	const _id = new ObjectId(params.document_id);

	const res = await mongo.run(async function () {
		const collection = mongo.db.collection(collectionName);
		return await collection.deleteOne({ _id });
	});

	return json(res);
};
