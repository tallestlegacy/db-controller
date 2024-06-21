import mongo from '$db/mongo';
import { SCHEMA_COLLECTION_NAME } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	let res = await mongo.db.command({
		listCollections: 1,
		nameOnly: true,
	});

	res = res?.cursor?.firstBatch
		?.map((e: any) => e.name)
		.filter((e: string) => e !== SCHEMA_COLLECTION_NAME);

	return json(res);
};

// Create a collection
export const POST: RequestHandler = async ({ request, params }) => {
	const collectionName = (await request.json())?.collectionName;
	if (!collectionName) return error(400, { message: 'Needs the <collectionName> field' });

	const res = await mongo.db.createCollection(collectionName);

	return json(res.namespace);
};
