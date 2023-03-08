// node model for data for mongoose
// defines the schema for the db

import { InferSchemaType, Schema, model } from 'mongoose';

//how the data will be structured
const noteSchema = new Schema(
	{
		//saves user id to each notes
		userId: { type: Schema.Types.ObjectId, required: true },
		//datatype has to be capitalize
		title: { type: String, required: true },
		text: { type: String },
	},
	//js has timestamps default, just needs to be after the main schema
	{ timestamps: true }
);
//creating new type for ts
//make sure note follows the schema of note Schema
type Note = InferSchemaType<typeof noteSchema>;

//name of collection
//exported to use in code
export default model<Note>('Note', noteSchema);
