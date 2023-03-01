//d in filename are type definition files so typescript can recognize
import mongoose from 'mongoose';

declare module 'express-session' {
	interface SessionData {
		userId: mongoose.Types.ObjectId;
	}
}

//you need to change tsconfig typeRoots file
//add nodemodule/types and types folder in a string so typescript can recognize the type declaration

//add this code so ts-node can recognize in node

// "ts-node": {
// 	"files":true
// }
