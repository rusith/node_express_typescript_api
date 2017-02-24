import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from './user'

let schema: Schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
    time: { type: Date, required: true}
});

/**
 * a successful login attempt
 */
export interface ILogin extends Document {
    user: Schema.Types.ObjectId;
    time: Date;
}

export const Login: Model<ILogin> = model<ILogin>('Logins', schema);