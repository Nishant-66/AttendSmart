import Attendance from "../models/attendTrack.model.js";
import moment from 'moment';

export const trackAttendance = async (req, res) => {
  const { status } = req.body;
  const classId = req.params.classId;
  const userId = req.user.id;  
  const currentDate = moment().format("YYYY-MM-DD");

  try {
    let attendanceRecord = await Attendance.findOne({ userId, classId, date: currentDate });

    if (!attendanceRecord) {
      attendanceRecord = new Attendance({ userId, classId, date: currentDate, status });
    } else {
     
      attendanceRecord.status = status;
    }
    await attendanceRecord.save();

    res.status(200).json({
      message: "Attendance tracked successfully.",
    });
  } catch (error) {
    console.error("Error tracking attendance:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const calculateAttendanceStatus = async (req, res) => {
    const userId = req.user.id;
    const classId = req.params.classId;
  
    try {
      const totalClasses = await Attendance.countDocuments({ userId, classId });
      const presentClasses = await Attendance.countDocuments({ userId, classId, status: 'present' });
      
      const attendancePercentage = (presentClasses / totalClasses) * 100;
  
      if (attendancePercentage >= 75) {
        return res.status(200).json({
          message: `Your attendance is ${attendancePercentage.toFixed(2)}%. You are meeting the 75% requirement.`,
        });
      }
  
      
      const requiredClasses = Math.ceil((0.75 * totalClasses - presentClasses) / (1 - 0.75));
      
      res.status(200).json({
        message: `Your attendance is currently ${attendancePercentage.toFixed(2)}%. You need to attend ${requiredClasses} more class(es) to reach 75%.`,
      });
    } catch (error) {
      console.error("Error in calculating attendance status:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
