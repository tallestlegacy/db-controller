import { useQuery } from '@sveltestack/svelte-query';

export function useGetAllCollections() {
	return useQuery('all-collections', async function () {
		return await (await fetch('/api/collections')).json();
	});
}

export async function createCollection(collectionName: string) {
	return await (
		await fetch('/api/collections', {
			method: 'POST',
			body: JSON.stringify({ collectionName })
		})
	).json();
}

export async function getAllDocuments(collectionName: string) {
	return await (await fetch(`/api/collections/${collectionName}`)).json();
}

export async function useGetAllDocuments(collectionName: string) {
	return useQuery(
		['all-documents', collectionName],
		async () => await getAllDocuments(collectionName)
	);
}

export async function getSingleDocument(collectionName: string, documentId: string) {
	return await (await fetch(`/api/collections/${collectionName}/${documentId}`)).json();
}

export async function useGetSingleDocument(collectionName: string, documentId: string) {
	return useQuery(
		['document', collectionName, documentId],
		async () => await getSingleDocument(collectionName, documentId)
	);
}

export async function createDocument(collectionName: string, form: any) {
	return await (
		await fetch(`/api/collections/${collectionName}`, {
			method: 'POST',
			body: JSON.stringify(form)
		})
	).json();
}

export async function updateDocument(collectionName: string, documentId: string, form: any) {
	delete form._id;
	return await (
		await fetch(`/api/collections/${collectionName}/${documentId}`, {
			method: 'POST',
			body: JSON.stringify(form)
		})
	).json();
}

export async function deleteDocument(collectionName: string, documentId: string) {
	return await (await fetch(`/api/collections/${collectionName}/${documentId}`)).json();
}
