const verificationEmail = (verificationUrl, firstName = 'there') => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #ffffff;">
          <tr>
            <td style="padding: 40px 30px; text-align: center; background-color: #000000;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">ONE GOAL</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 24px; font-weight: 600;">Verify Your Email</h2>
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Hey ${firstName},
              </p>
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                You signed up for One Goal. Nice. Now verify your email and get to work.
              </p>
              <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Click the button below to verify your email address. This link expires in 24 hours.
              </p>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 0 0 30px 0;">
                    <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 16px 40px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px;">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin: 0 0 30px 0; color: #0066cc; font-size: 14px; line-height: 1.6; word-break: break-all;">
                ${verificationUrl}
              </p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6;">
                If you didn't sign up for One Goal, ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; text-align: center; background-color: #f5f5f5;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                © ${new Date().getFullYear()} One Goal. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

module.exports = verificationEmail;
