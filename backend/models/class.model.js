import {mongoose, Schema} from mongoose;
const ClassSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    className: { type: String, required: true },
    facultyName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
  });
  const Class=mongoose.model('Class', ClassSchema);
  export default Class;