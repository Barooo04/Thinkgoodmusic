import React from 'react';
import { useState } from 'react'
import './privacy.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


function Privacy() {

    const [menu, setMenu] = useState(false)
    const [toBottom, setToBottom] = useState(false)

    const moveTo = (id) => {
        setMenu(true);
        setTimeout(() => {
            window.location.href = `/main/#${id}`;

        }, 150);
    }
    return (
        <div className="privacy-policy-container">
            <div className={toBottom ?'navbar-container bars' : 'navbar-container'}>
            <ul className='navbar-list'>
                <li onClick={() => moveTo('chi-siamo')}>Chi Siamo</li>
                <li onClick={() => moveTo('40oz-studio')}>40oz Studio</li>
                <li onClick={() => moveTo('lavori')}>I Nostri Lavori</li>
                <li onClick={() => moveTo('contatti')}>Contatti</li>
            </ul>
        </div>
            <h1>Privacy Policy</h1>
            <div className="section">
                <h2>1. Tipologia di Dati Raccolti</h2>
                <p>
                    Raccogliamo solo i dati strettamente necessari per rispondere alle richieste dei nostri utenti. Questi dati includono:
                </p>
                <ul>
                    <li>Nome</li>
                    <li>Cognome</li>
                    <li>Indirizzo email</li>
                </ul>
            </div>

            <div className="section">
                <h2>2. Modalità di Raccolta dei Dati</h2>
                <p>
                    I dati personali vengono raccolti esclusivamente tramite:
                </p>
                <ul>
                    <li>Form di Contatto: quando l’utente ci invia una richiesta di informazioni tramite il nostro modulo.</li>
                    <li>Chatbot: quando l’utente interagisce con il chatbot per chiarimenti o per discutere di eventuali progetti.</li>
                </ul>
            </div>

            <div className="section">
                <h2>3. Finalità del Trattamento dei Dati</h2>
                <p>
                    Utilizziamo i dati raccolti per rispondere alle domande e fornire informazioni sui nostri servizi. In particolare:
                </p>
                <ul>
                    <li>Rispondere a domande o dubbi sull’attività.</li>
                    <li>Inviare una email di contatto per fornire risposte o dettagli su progetti presentati tramite il chatbot.</li>
                </ul>
            </div>

            <div className="section">
                <h2>4. Periodo di Conservazione dei Dati</h2>
                <p>
                    I dati personali raccolti vengono utilizzati esclusivamente per inviare un’email di resoconto e non vengono conservati in alcun database. Non è previsto un periodo di conservazione specifico, poiché i dati non vengono archiviati dopo l'invio dell'email.
                </p>
            </div>

            <div className="section">
                <h2>5. Condivisione dei Dati</h2>
                <p>
                    I dati raccolti sono condivisi con provider di posta elettronica, come Gmail, esclusivamente per il contatto e la comunicazione con l’utente. Non condividiamo i dati con altri soggetti o terze parti per fini di marketing o pubblicitari.
                </p>
            </div>

            <div className="section">
                <h2>6. Utilizzo di Cookie</h2>
                <p>
                    Il nostro sito non utilizza cookie o altre tecnologie di tracciamento per monitorare l'attività dell'utente. Nessun dato di navigazione o preferenze viene raccolto o salvato.
                </p>
            </div>

            <div className="section">
                <h2>7. Diritti dell'Utente</h2>
                <p>
                    Gli utenti non hanno la possibilità di esercitare diritti sui dati poiché nessun dato personale viene trattenuto o salvato in modo permanente.
                </p>
            </div>

            <div className="section">
                <h2>8. Misure di Sicurezza</h2>
                <p>
                    I dati vengono protetti attraverso le misure standard del motore di ricerca utilizzato per garantire la sicurezza delle informazioni durante la trasmissione.
                </p>
            </div>

            <div className="section">
                <h2>9. Contatto per la Privacy</h2>
                <p>
                    Per qualsiasi domanda o richiesta di chiarimento riguardo alla gestione dei dati personali, potete contattare il nostro responsabile della protezione dei dati all’indirizzo email:
                </p>
                <p>Email: <a href="mailto:amministrazione@thinkgoodmusic.com">amministrazione@thinkgoodmusic.com</a></p>
            </div>

            <hr className='custom-divider'></hr>
                <div style={{display: 'flex', flexDirection:'column', marginBottom:20, gap:10}}>
                    <div className='contact-box-privacy'>
                        <a className='mini-footer-text-a' style={{marginRight: 20}}  href="https://www.instagram.com/thinkgood_music/"><FontAwesomeIcon className="footer-icon" icon={faInstagram} /></a>
                        <a className='mini-footer-text-a' style={{marginRight: 20}} href="https://www.linkedin.com/company/thinkgood/"><FontAwesomeIcon className="footer-icon" icon={faLinkedin} /></a>
                    </div>
                    <p className='mini-footer-text'style={{marginBottom: 0}}>Thinkgood Srls - Via Lanzone 25 Milano 20123 - P.IVA 12414860960</p>
                    <div className='contact-box-privacy'>
                        <FontAwesomeIcon className="footer-icon" icon={faPhone} />
                        <a className='mini-footer-text-a' style={{marginRight: 20}}  href="tel:3472988931">+39 3472988931</a>
                        <FontAwesomeIcon className="footer-icon" icon={faEnvelope} />
                        <a className='mini-footer-text-a' style={{marginRight: 20}} href="mailto:amministrazione@thinkgoodmusic.com">amministrazione@thinkgoodmusic.com</a>
                        <FontAwesomeIcon className="footer-icon" icon={faShieldAlt} />
                        <a className='mini-footer-text-a' style={{marginRight: 20}} href="mailto:thinkgood@pec.it" >thinkgood@pec.it</a>
                    </div>
                    <div className='contact-box-h' style={{gap: 20}}>
                        <a className='mini-footer-text powered'style={{marginBottom: 0}} href="/privacy" >Privacy & Policy</a>
                        <a className='mini-footer-text powered'style={{marginBottom: 0}} href="https://www.hi-dev.it/" >Powered by Hidev</a>
                    </div>
                </div>
        </div>
    )
}

export default Privacy;