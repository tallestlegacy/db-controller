import { Primitive } from './cms';

export const FieldTypes = [
	[Primitive.BOOLEAN, 'Boolean (true/false)'],
	[Primitive.NUMBER, 'Numeric'],
	[Primitive.STRING, 'Short text'],
	[Primitive.TEXT, 'Long text'],
	[Primitive.DATE, 'Date'],
	[Primitive.MARKDOWN, 'Prose'],
].map(([value, label]) => ({ value, label }));
