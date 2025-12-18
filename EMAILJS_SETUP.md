# EmailJS Setup Guide

## Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)

## Step 2: Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy your Service ID** (you'll need this)

## Step 3: Create Email Template
1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Choose a template name (e.g., "Contact Form")
4. Set the **Subject** to: `Contact Us: {{lookingFor}}`
5. For the **Content**, you have two options:

### Option A: HTML Template (Recommended)
Copy the content from `emailjs-template.html` and paste it into the HTML editor in EmailJS.

### Option B: Plain Text Template
Copy the content from `emailjs-template-text.txt` and paste it into the text editor in EmailJS.

6. **Copy your Template ID** (you'll need this)

## Step 4: Get Your Public Key
1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** and copy it

## Step 5: Update ContactPopup.jsx
Open `src/components/ContactPopup.jsx` and replace these placeholders:

```javascript
await emailjs.send(
  "YOUR_SERVICE_ID",     // Replace with your Service ID from Step 2
  "YOUR_TEMPLATE_ID",    // Replace with your Template ID from Step 3
  templateParams,
  "YOUR_PUBLIC_KEY"      // Replace with your Public Key from Step 4
);
```

## Template Variables
The following variables are available in your EmailJS template:
- `{{firstName}}` - User's first name
- `{{lastName}}` - User's last name
- `{{email}}` - User's email address
- `{{phone}}` - User's phone number
- `{{company}}` - User's company name
- `{{lookingFor}}` - Selected service interest
- `{{budget}}` - Selected budget range
- `{{date}}` - Submission date
- `{{time}}` - Submission time

## Testing
1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the submission

## Troubleshooting
- Make sure all three IDs (Service ID, Template ID, Public Key) are correctly entered
- Verify that your email service is properly connected in EmailJS
- Check the browser console for any error messages
- Ensure all required fields in the form are filled before submission

