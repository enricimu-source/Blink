const verifyEmailTemplate = ({name,url}) => {
return `
<p>Thank you for registering with us, ${name}. Please click the link below to verify your email address:</p>
<button><a href="${url}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></button>
`
}
export default verifyEmailTemplate;