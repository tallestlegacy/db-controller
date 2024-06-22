import type { Collection } from '@/../types/cms';
import { useQuery } from '@sveltestack/svelte-query';
import { toast } from 'svelte-sonner';

// returns the inserted id, possibly for redirection
export async function createSchema(form: Collection) {
	const _toast = toast.loading(`Creating schema for "${form.name}"`);
	try {
		return await (
			await fetch('/api/schemas', {
				method: 'POST',
				body: JSON.stringify(form),
			})
		).json();
	} catch (e) {
		toast.error('Something went wrong!');
	} finally {
		toast.dismiss(_toast);
	}
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
	const _toast = toast.loading(`Updating schema for "${form.name}"`);
	try {
		const res = await (
			await fetch(`/api/schemas/${_id}`, {
				method: 'PUT',
				body: JSON.stringify(form),
			})
		).json();

		toast.success('Updated!!');
		return res;
	} catch (e) {
		toast.error('Something went wrong!');
	} finally {
		toast.dismiss(_toast);
	}
}
