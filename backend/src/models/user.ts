import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	//select means email/password wont be returned, not visible from frontend/json
	email: { type: String, required: true, select: false, unique: true },
	password: { type: String, required: true, select: false, unique: true },
});
//creating new type for ts
//make sure note follows the schema of user Schema
type User = InferSchemaType<typeof userSchema>;

//name of collection
//exported to use in code
export default model<User>('User', userSchema);
