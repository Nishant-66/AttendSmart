import {mongoose, Schema} from mongoose;
const AttendanceTrackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true }, 
    status: { type: String, enum: ['present', 'absent', 'cancelled'], required: true }
  });
const AttendanceTrack=mongoose.model('AttendanceTrack', AttendanceTrackSchema);
export default AttendanceTrack;