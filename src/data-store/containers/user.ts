import { ILogin } from './login';
import { Document, model, Model, Schema} from 'mongoose';


let schema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 8,
  },
  firstName: {
      type: String,
      maxlength: 50,
      required: true
  },
  lastName: {
      type: String,
      required: true,
      maxlength: 50
  }
});

export interface IUser extends Document {
  username: string;
  password: number;
  firstName: string;
  lastName: string;
  logins: Array<ILogin>;
}

export const  User: Model<IUser> = model<IUser>('Users', schema);
