import mongo from '$db/mongo';
import { error, json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

import type { RequestHandler } from './$types';

// Find an arbitrary documents
export const GET: RequestHandler = async ({ params }) => {
	const collectionName = params.collection_name;
	const _id = new ObjectId(params.document_id);

	const collection = mongo.db.collection(collectionName);
	const res = await collection.findOne({ _id });

	return json(res);
};

// Update an arbitrary document
export const PUT: RequestHandler = async ({ params, request }) => {
	const collectionName = params.collection_name;
	const _id = new ObjectId(params.document_id);
	const body = await request.json();
	delete body._id;

	const collection = mongo.db.collection(collectionName);
	const res = await collection.updateOne(
		{ _id },
		{
			$set: {
				...body,
				_updatedAt: new Date(),
			},
		},
	);

	return json(res);
};

// Find an arbitrary document
export const DELETE: RequestHandler = async ({ params }) => {
	const collectionName = params.collection_name;
	const _id = new ObjectId(params.document_id);

	const collection = mongo.db.collection(collectionName);
	const res = await collection.deleteOne({ _id });

	return json(res);
};
