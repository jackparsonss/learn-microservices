import mongoose from 'mongoose';
import { Password } from '../services/password';

// interface to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// interface for a User model
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

// interface for a user instance
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
