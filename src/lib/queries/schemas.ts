import type { Collection } from '@/../types/cms';
import { useQuery } from '@sveltestack/svelte-query';

// returns the inserted id, possibly for redirection
export async function createSchema(form: Collection) {
	return await (
		await fetch('/api/schemas', {
			method: 'POST',
			body: JSON.stringify(form),
		})
	).json();
}

export async function getSchemas() {
	return await (await fetch('/api/schemas')).json();
}

export function useGetAllSchemas() {
	return useQuery('all-schemas', getSchemas);
}

export async function getSchema(name: string) {
	return (await (await fetch(`/api/schemas/${name}`)).json()) as Collection;
}

export function useGetSchema(name: string) {
	return useQuery(['schema', name], async () => await getSchema(name));
}

export async function updateSchema(_id: string, form: Collection) {
	return await (
		await fetch(`/api/schemas/${_id}`, {
			method: 'PUT',
			body: JSON.stringify(form),
		})
	).json();
}
