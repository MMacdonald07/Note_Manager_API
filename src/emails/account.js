const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'matthew.mmacdonald@gmail.com',
        subject: 'Thanks for signing up!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'matthew.mmacdonald@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. Let me know if there was anything to be done to improve my app.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}