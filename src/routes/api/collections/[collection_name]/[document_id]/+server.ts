import mongo from '@/../routes/api/mongo.server';
import { error, json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

import type { RequestHandler } from './$types';

// Find an arbitrary documents
export const GET: RequestHandler = async ({ params }) => {
	const collectionName = params.collection_name;
	const _id = new ObjectId(params.document_id);

	const res = await mongo.run(async function () {
		const collection = mongo.db.collection(collectionName);
		return collection.findOne({ _id });
	});

	return json(res);
};

// Update an arbitrary document
export const PUT: RequestHandler = async ({ params, request }) => {
	const collectionName = params.collection_name;
	const _id = new ObjectId(params.document_id);
	const body = await request.json();
	delete body._id;

	try {
		const res = await mongo.run(async function () {
			const collection = mongo.db.collection(collectionName);
			const res = await collection.updateOne(
				{ _id },
				{
					$set: {
						...body,
						_updatedAt: new Date()
					}
				}
			);
			return res.modifiedCount;
		});

		return json(res);
	} catch (e) {
		return error(500, Error(JSON.stringify(e)));
	}
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
