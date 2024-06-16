// primitive types

export enum Primitive {
	BOOLEAN = 'BOOLEAN',
	NUMBER = 'NUMBER',
	STRING = 'STRING',
	TEXT = 'TEXT',
	DATE = 'DATE'
	// DATETIME = 'DATETIME'
	// GEOPOINT = "GEOPOINT",
}

export type FieldType = keyof typeof Primitive;

export interface Field {
	title: string; // eg. Blog post title
	name: string; // unique identifier (ie. to be used as JSON key),
	description: string; // the field description or question,
	type: keyof typeof Primitive; // for reusable form component to bind to
}

export interface Collection {
	title: string; // eg. Blog posts
	name: string; // eg. blog_posts
	description: string; // eg. Periodic publications that I think up regularly
	fields: Field[];
}

// Datasets contain multiple collections
export interface Dataset {
	title: string;
	name: string;
	collections: Collection[];
}
