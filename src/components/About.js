import React from 'react';

function About() {
  return (
    <div className='container'>
      <div style={{ textAlign: "center", color: "brown" }}>
        <h2>
          About iNotebook App
        </h2>
      </div>
      <div className='my-3'>
        Welcome to the most convenient way to keep track of your thoughts, tasks, and ideas - <b>iNotebook</b>
      </div>
      <div>
        <b>iNotebook</b> is designed with simplicity and productivity in mind.
      </div>
      <hr />
      <div className='my-3'>
        <p>
          Here's what sets us apart:
        </p>
        <p><b>User-Friendly:</b> We've created an intuitive and easy-to-use interface so you can start jotting down notes right away, without a learning curve.</p>
        <p><b> Accessibility:</b> Access your notes from any device with an internet connection. Whether you're at home, work, or on the go, your notes are always at your fingertips.</p>
        <p><b> Thoughts:</b> Categorize your notes with tags, folders, or labels, making it simple to find what you need when you need it.</p>
        <p><b> Secure:</b> Your data is important to us. We prioritize your privacy and security, ensuring your notes are kept safe.</p>
        <p><b>Customizable:</b> Personalize your notes with different fonts, colors, and formatting options to make them truly yours.</p>
      </div>
      <hr />
      <div className='my-3'>
        <p>Get Started Today Join thousands of users who have already simplified their note-taking experience.</p>
        <p>Sign up now and start organizing your life with <b>iNotebook</b>.</p>
      </div>
      <hr />
      <div style={{ textAlign: "center" }}>
        Have questions or suggestions? We'd love to hear from you! Contact our support team at
        <p>
          <i class="fa-regular fa-envelope"> findtanmay10@gmail.com </i>
        </p>
        <p>
          <i class="fa-brands fa-whatsapp">(+91)7096754251</i>
        </p>
        <p><i class="fa-brands fa-instagram">_tanmaynaik</i></p>
        <p><i class="fa-brands fa-threads">_tanmaynaik</i></p>
        Thank you for choosing <b>iNotebook</b>!
      </div>
    </div>
  )
}

export default About