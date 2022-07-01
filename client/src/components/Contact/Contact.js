import React from 'react';

import './Contact.css';

const Contact = () => {
    return(
        <div id="Contact">
            <div className="contact-container">
                <div className="contact-title">
                    <h1>Skontaktuj się ze mną</h1>
                </div>
                <form>
                    <input type="text" id="name" name="name" placeholder="Imię" />
                    <input type="text" id="email" name="email" placeholder="Email" />
                    <input type="text" id="subject" name="subject" placeholder="Temat" />
                    <textarea id="message" name="message" placeholder="Napisz coś.."></textarea>
                    <p>Wyślij</p>
                </form>
            </div>
        </div>
    )
};

export default Contact;