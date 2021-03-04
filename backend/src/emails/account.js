const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendSignupEmail = async ({ email, host, token }) => {
  try {
    await sgMail.send({
      to: email,
      from: 'contact@alexandrewolff.com',
      subject: 'Thanks for trying my app Fevernote !',
      text: `
        Welcome to Fevernote.\n
        Please verify your account by clicking the following link:\nhttp://${host}/verify/${token}\n
        And let me know what you think about it !
      `
    })
  } catch (error) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
  }
}
