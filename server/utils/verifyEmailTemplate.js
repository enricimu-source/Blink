const verifyEmailTemplate = ({name,url}) => {
return `
<p>Hello ${name},</p>
<p>Thank you for registering with us, ${name}. Please click the link below to verify your email address:</p>
<button><a href="${url}" style="background-color:orange; color: black; margin-top:10px,padding:20px; display:block">Verify Email</a></button>
`
}
export default verifyEmailTemplate;