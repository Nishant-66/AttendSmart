import cron from 'node-cron';
import nodemailer from 'nodemailer';
import moment from 'moment';
import Class from '../models/class.model.js';
import User from '../models/user.model.js';

// Set up email transporter using nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});
cron.schedule('*/5 * * * *', async () => {
  try {
    const upcomingClasses = await Class.find({
      startTime: moment().add(30, 'minutes').toDate(),
    });

    for (const classItem of upcomingClasses) {
      const user = await User.findById(classItem.userId);

      // Check if notifications are enabled for the user
      if (!user || !user.notificationsEnabled) {
        continue; // Skip if user not found or notifications are disabled
      }

      // Prepare the email notification
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Reminder: Upcoming Class ${classItem.className}`,
        text: `Hi ${user.name}, your class "${classItem.className}" with ${classItem.facultyName} is starting in 30 minutes at ${moment(classItem.startTime).format('h:mm A')}.`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log(`Notification sent to ${user.email} for class ${classItem.className}`);
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
});

// Export the transporter for use elsewhere if needed
export { transporter };
