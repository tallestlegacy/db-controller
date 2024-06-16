// Update schema

import { SCHEMA_COLLECTION_NAME } from '$env/static/private';
import type { RequestHandler } from './$types';

import mongo from '../../mongo.server';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

// Get all schemas
export const GET: RequestHandler = async ({ params }) => {
	const _id = new ObjectId(params.schema_id);

	const res = await mongo.run(async function () {
		const collection = mongo.db.collection(SCHEMA_COLLECTION_NAME);
		return collection.findOne({ _id });
	});

	return json(res);
};

// Update a schema object
export const PUT: RequestHandler = async ({ request, url, params }) => {
	const res = await mongo.run(async function () {
		const _id = new ObjectId(params.schema_id);

		const body = await request.json();
		delete body._id;

		const collection = mongo.db.collection(SCHEMA_COLLECTION_NAME);
		const res = await collection.findOneAndUpdate({ _id }, { $set: body });
		console.log(res);
		return res;
	});

	return json(res);
};
