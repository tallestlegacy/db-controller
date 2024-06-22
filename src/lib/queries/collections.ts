import { useQuery } from '@sveltestack/svelte-query';
import { toast } from 'svelte-sonner';

export function useGetAllCollections() {
	return useQuery('all-collections', async function () {
		return await (await fetch('/api/collections')).json();
	});
}

export async function createCollection(collectionName: string) {
	return await (
		await fetch('/api/collections', {
			method: 'POST',
			body: JSON.stringify({ collectionName }),
		})
	).json();
}

export async function getAllDocuments(collectionName: string) {
	return await (await fetch(`/api/collections/${collectionName}`)).json();
}

export function useGetAllDocuments(collectionName: string) {
	return useQuery(['all-documents', collectionName], async function () {
		return await getAllDocuments(collectionName);
	});
}

export async function getSingleDocument(collectionName: string, documentId: string) {
	return await (await fetch(`/api/collections/${collectionName}/${documentId}`)).json();
}

export function useGetSingleDocument(collectionName: string, documentId: string) {
	return useQuery(
		['document', collectionName, documentId],
		async () => await getSingleDocument(collectionName, documentId),
	);
}

export async function createDocument(collectionName: string, form: any) {
	const _toast = toast.loading(`Creating new document in "${collectionName}"`);
	try {
		const res = await (
			await fetch(`/api/collections/${collectionName}`, {
				method: 'POST',
				body: JSON.stringify(form),
			})
		).json();
		toast.success('Done');
		return res;
	} catch (e) {
		toast.error('');
	} finally {
		toast.dismiss(_toast);
	}
}

export async function updateDocument(collectionName: string, documentId: string, form: any) {
	delete form._id;
	delete form._createdAt;
	delete form._updatedAt;

	const _toast = toast.loading(`Updating document in "${collectionName}"`);

	try {
		const res = await (
			await fetch(`/api/collections/${collectionName}/${documentId}`, {
				method: 'PUT',
				body: JSON.stringify(form),
			})
		).json();
		toast.success('Done');
		return res;
	} catch (e) {
		toast.error('Something went wrong!');
	} finally {
		toast.dismiss(_toast);
	}
}

export async function deleteDocument(collectionName: string, documentId: string) {
	const res = await (
		await fetch(`/api/collections/${collectionName}/${documentId}`, { method: 'DELETE' })
	).json();

	toast.success(`Deleted "${documentId}"`);

	return res;
}
