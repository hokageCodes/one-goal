const nodemailer = require('nodemailer');

// Test function - call this to verify nodemailer works
const testEmail = async () => {
  const testAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransporter({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Test" <test@example.com>',
    to: 'recipient@example.com',
    subject: 'Test Email',
    html: '<b>If you see this, nodemailer works!</b>',
  });

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP configuration is missing. Please check your environment variables.');
  }

  // Try Gmail's direct service first (easier)
  if (process.env.SMTP_HOST.includes('gmail')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback to manual SMTP configuration
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });
};

// Main send email function with retry logic
const sendEmail = async (options, retries = 3) => {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const transporter = createTransporter();

      // Verify connection before sending
      await transporter.verify();
      console.log('SMTP connection verified');

      const mailOptions = {
        from: `"One Goal" <${process.env.SMTP_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return info;

    } catch (error) {
      lastError = error;
      console.error(`Email send attempt ${attempt} failed:`, error.message);

      if (attempt < retries) {
        // Wait before retrying (exponential backoff)
        const waitTime = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${waitTime / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  // If all retries failed, throw the last error
  throw lastError;
};

module.exports = sendEmail;
module.exports.testEmail = testEmail;