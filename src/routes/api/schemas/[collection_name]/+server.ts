// Update schema
import mongo from '$db/mongo';
import { SCHEMA_COLLECTION_NAME } from '$env/static/private';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

// Get all schemas
export const GET: RequestHandler = async ({ params }) => {
	// const _id = new ObjectId(params.schema_id);
	const name = params.collection_name;

	const collection = mongo.db.collection(SCHEMA_COLLECTION_NAME);
	return json(await collection.findOne({ name }));
};

// Update a schema object
export const PUT: RequestHandler = async ({ request, url, params }) => {
	// const _id = new ObjectId(params.schema_id);
	const name = params.collection_name;

	const body = await request.json();
	delete body._id;
	delete body.name;

	const collection = mongo.db.collection(SCHEMA_COLLECTION_NAME);
	const res = await collection.findOneAndUpdate({ name }, { $set: body });

	return json(res);
};
