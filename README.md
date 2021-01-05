# Mail
<p>A front-end for an email client that makes API calls to send and receive emails.
The complete implementation of a single-page-app email client is done using JavaScript, HTML, and CSS. </p>

## API
<p> We’ll get mail, send mail, and update emails by using this application’s API. 
This application supports the following API routes: </p>

#### *GET /emails/<str:mailbox>*
<p> Sending a GET request to /emails/<mailbox> where <mailbox> is either inbox, sent, or archive returns back (in JSON form) a list of all emails in that mailbox, in reverse chronological order.
    
#### GET /emails/<int:email_id>
<p> Sending a GET request to /emails/email_id where email_id is an integer id for an email will return a JSON representation of the email.
Note that if the email doesn’t exist, or if the user does not have access to the email, the route instead return a 404 Not Found error with a JSON response of {"error": "Email not found."}. </p>

#### POST /emails
<p> To send an email, a POST request to the /emails route is sent. The route requires three pieces of data to be submitted: a recipients value (a comma-separated string of all users to send an email to), a subject string, and a body string. </p>
<p> If the email is sent successfully, the route will respond with a 201 status code and a JSON response of {"message": "Email sent successfully."}. </p>

#### PUT /emails/<int:email_id>
<p> To mark an email as read/unread or as archived/unarchived a PUT request is sent to /emails/<email_id> where email_id is the id of the email we’re trying to modify.</p>

<p> Using these four API routes (getting all emails in a mailbox, getting a single email, sending an email, and updating an existing email), this project is completed. </p>

The following requirements are fullfilled:

### Send Mail: 
- When a user submits the email composition form, the JavaScript code actually sends the email.
It makes a POST request to /emails, passing in values for recipients, subject, and body.
- Once the email has been sent, the user’s sent mailbox is loaded.

### Mailbox: 
- When a user visits their Inbox, Sent mailbox, or Archive, appropriate mailbox is loaded. A GET request to /emails/<mailbox> is made to request the emails for a particular mailbox.
- When a mailbox is visited, the application first queries the API for the latest emails in that mailbox.
- When a mailbox is visited, the name of the mailbox appears at the top of the page.
- Each email is rendered in its own box that displays who the email is from, what the subject line is, and the timestamp of the email.
- If the email is unread, it appears with a white background. If the email is read, it appears with a gray background.

### View Email: 
- When a user clicks on an email, the user is taken to a view where they see the content of that email.
The application makes a GET request to /emails/<email_id> to request the email.
- The application shows the email’s sender, recipients, subject, timestamp, and body.
- Once the email has been clicked on, it is marked as read. A PUT request is sent to /emails/<email_id> to update whether an email is read or not.

### Archive and Unarchive: 
- The application allows users to archive and unarchive emails that they have received.
- When viewing an Inbox email, the user is presented with a button that lets them archive the email. When viewing an Archive email, the user is presented with a button that lets them unarchive the email. This requirement does not apply to emails in the Sent mailbox.
- A PUT request is sent to /emails/<email_id> to mark an email as archived or unarchived.
- Once an email has been archived or unarchived, the user’s inbox is loaded.

### Reply: 
- Users can reply to an email.
- When viewing an email, the user is presented with a “Reply” button that lets them reply to the email.
- When the user clicks the “Reply” button, they are taken to the email composition form.
- The composition form is pre-filled with the recipient field set to whoever sent the original email.
- The subject line is pre-filled. If the original email had a subject line of foo, the new subject line is Re: foo. 
- The body of the email is pre-filled with a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original text of the email.
