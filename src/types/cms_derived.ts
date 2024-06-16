import { Primitive } from './cms';

export const FieldTypes = [
	[Primitive.BOOLEAN, 'Switch'],
	[Primitive.NUMBER, 'Numeric'],
	[Primitive.STRING, 'Short text'],
	[Primitive.TEXT, 'Long text'],
	[Primitive.DATE, 'Date']
].map(([value, label]) => ({ value, label }));
