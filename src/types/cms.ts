// primitive types

enum Primitive {
	BOOLEAN = 'BOOLEAN',
	NUMBER = 'NUMBER',
	STRING = 'STRING',
	TEXT = 'TEXT',
	DATE = 'DATE'
	// DATETIME = 'DATETIME'
	// GEOPOINT = "GEOPOINT",
}

interface Field {
	title: string; // eg. Blog post title
	name: string; // unique identifier (ie. to be used as JSON key),
	description: string | undefined; // the field description or question
}

interface Collection {
	title: string; // eg. Blog posts
	name: string; // eg. blog_posts
	description: string | undefined; // eg. Periodic publications that I think up regularly
	schema: Field[];
}

// Datasets contain multiple collections
export interface Dataset {
	title: string;
	name: string;
	collections: Collection[];
}
