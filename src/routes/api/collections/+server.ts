import type { RequestHandler } from './$types';
import mongo from '@/../routes/api/mongo.server';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const res = await mongo.run(async () => {
		const res = await mongo.db.command({
			listCollections: 1,
			nameOnly: true
		});
		return res?.cursor?.firstBatch?.map((e: any) => e.name);
	});

	return json(res);
};

// Create a collection
export const POST: RequestHandler = async ({ request, params }) => {
	const collectionName = (await request.json())?.collectionName;
	if (!collectionName) return error(400, { message: 'Needs the <collectionName> field' });

	const res = await mongo.run(async () => {
		const res = await mongo.db.createCollection(collectionName);
		return res?.namespace;
	});

	return json(res);
};
