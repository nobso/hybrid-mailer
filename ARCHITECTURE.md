The sequence diagram of Ad Campaign via Email


![Ad Campaign Email Sequence](https://user-images.githubusercontent.com/3447433/73823634-8b49b800-47ad-11ea-8584-b0e9c77ecbae.png)


1. The browser submits the form with data
1. The Mailer is an abstraction layer that connects to the multiple email clients like Mailgun, SendGrid etc. 
1. Mailer validates the inputs sent by the user, if everything is good, it will start requesting the email client for sending an email
1. First it contacts the Mailgun with the user data to send an email
    1. If the email is sent successfully, the browser will be notified the same
    1. If it fails, the Mailer will ask the MailGun to retry a given number of times
1. If all the retries by the Mailgun fail, Mailer will failover to SendGrid email client
    1. If the email is sent successfully, the browser will be notified the same
    1. If it fails, the Mailer will ask the SendGrid to retry a given number of times
1. If all the attempts fail, the browser will be notified
