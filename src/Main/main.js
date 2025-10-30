import React from 'react'
import './main.css'
import './home.css'
import { useState, useEffect } from 'react'
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faShieldAlt, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Squash as Hamburger } from 'hamburger-react'
import emailjs from 'emailjs-com';

import logo from '../LoghiTGM/ScrittaBianca.png';
import sun from './ImageTheme/sun.png';
import moon from './ImageTheme/moon.png';

import founder from '../LoghiTGM/founder-white.png';
import team from '../LoghiTGM/team-white.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import warner from '../Images/WMG_Logo.jpg'
import sony from '../Images/sony.png'
import universal from '../Images/universal.png'

import axos from '../Images/AxosProject_30.webp'
import faiv from '../Images/FaivProject_30.webp'
import slash from '../Images/SlashProject_30.webp'
import hellen from '../Images/HellenProject_30.webp'

import g1 from '../Images/gallery1.jpg'
import g2 from '../Images/gallery2.jpg'
import g3 from '../Images/gallery3.jpg'
import g4 from '../Images/gallery4.jpg'
import g5 from '../Images/gallery5.jpg'
import g6 from '../Images/gallery6.jpg'

import asssitant from '../Images/assistant.jpeg'

function Main() {
    const [toBottom, setToBottom] = useState(false)
    const [nav, setNav] = useState(false)
    const [menu, setMenu] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [sessionUUID, setSessionUUID] = useState(localStorage.getItem('sessionUUID'))

    function scrollToBottom() {
        const messageContainer = document.getElementById("messageFormeight");
        messageContainer.scrollTo({
            top: messageContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    //per avviare la conversazione.
    async function activateBot(event) {
        setNav(true);
        event.preventDefault();
        setToBottom(true);
        
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    
        const str_time = hour + ":" + minute;
        var rawText = $("#text").val();
    
        var userHtml = '<div class="d-flex justify-content-end mb-4"><div class="' + (invertTheme ? "msg_cotainer_send" : "msg_cotainer_send dark") + '">' + rawText + '<span class="msg_time_send">' + str_time + '</span></div><div class="img_cont_msg"><div class="' + (invertTheme ? "rounded-circle user_img_msg" : "rounded-circle user_img_msg dark") + '" style="display:flex; align-items:center; justify-content:center; height: 45px; width: 45px;"><i class="fas fa-user" style="font-size: 25px;"></i></div></div></div>';
    
        $("#text").val("");
        $("#messageFormeight").append(userHtml);
        scrollToBottom();

        // Aggiungi l'icona del bot e i pallini subito dopo l'invio del messaggio
        let $botMessageContainer = $('<div class="d-flex justify-content-start mb-4"></div>');
        let $botImage = $('<div class="img_cont_msg"><img src="' + asssitant + '" class="' + (invertTheme ? "rounded-circle user_img_msg" : "rounded-circle user_img_msg dark") + '" style="display:flex; align-items:center; justify-content:center; height: 45px; width: 45px;" alt="Assistant" /></div>');
        let $botMessage = $('<div class="' + (invertTheme ? "msg_cotainer" : "msg_cotainer dark") + '"></div>');
        const dots = $('<div class="typing-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>');

        $botMessage.append(dots);
        $botMessageContainer.append($botImage);
        $botMessageContainer.append($botMessage);
        $("#messageFormeight").append($botMessageContainer);

        async function startSession() {
            let uuid = '7f5e5376dbf045cd8c72c60f428653d1';
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MTA3ODMyMiwianRpIjoiOWJjNWE5ZTgtY2Y3NC00MmVhLTlkZjgtYWJkNjc3ZjI2MGZlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJhcGlfa2V5IjoiMGI3ZjkxMmY5NDM2M2M2NjZiNmQxODEwMmViMTBjYWU1NjYzMTBiY2QwMTk4M2RkZGQ0ZmZhM2YyNDdjZTU0MiJ9LCJuYmYiOjE3NDEwNzgzMjJ9.oCyzHr44yNDaT6Kw7Or4kj8cSRy_gsZytvjhpAunzNU';
            let url = `https://app.gpt-trainer.com/api/v1/chatbot/${uuid}/session/create`;
            let risposta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!risposta.ok) {
                throw new Error("Errore di rete", risposta.status);
            }
            return await risposta.json();
        }
    
        async function sendMessage(message, uuid) {
            let query = {
                'query': message
            };
            let url = `https://app.gpt-trainer.com/api/v1/session/${uuid}/message/stream`;
            let risposta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNDQ3MDA4NSwianRpIjoiMzg4ZWI4OTMtMmU1Ni00NDY1LWE4ZmYtOTZlMzFmMjc0ZDVkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJhcGlfa2V5IjoiZmNiOGM4ZjE1NWE5NTEzMDdkNWE1YTFjN2NmMjljMTY2MzdhODRkMzA1NzA0Y2E4YTI1MTUyZGFiMTVhYjNiOCJ9LCJuYmYiOjE3MTQ0NzAwODV9.gaDO2Mdii32YZ_WXcouEJfkyIptpOJXXISs-2h3hdhE`
                },
                body: JSON.stringify(query)
            });
            if (!risposta.ok) {
                console.log("errore");
            }

            return await risposta.text();
        }

        async function typeText(characters, container) {
            // Rimuovi i pallini dopo 4 secondi
            await new Promise(resolve => setTimeout(resolve, 4000));
            dots.remove();

            // Mostra l'intero messaggio
            $(container).html(characters.join(''));
            $(container).append('<span class="msg_time">' + str_time + '</span>');
            scrollToBottom();
        }
    
        if (!sessionUUID) {
            startSession().then(response => {
                setSessionUUID(response.uuid);
                localStorage.setItem('sessionUUID', response.uuid);
                sendMessage(rawText, response.uuid).then(async risposta => {
                    let characters = risposta.split('');
                    await typeText(characters, $botMessage);
                });
            });
        } else {
            sendMessage(rawText, sessionUUID).then(async risposta => {
                let characters = risposta.split('');
                await typeText(characters, $botMessage);
            });
        }
        
    
        $("#messageArea").off("submit");
    }   
    
    const [invertTheme, setInvertTheme] = useState(false)
    //per invertire i colori in base al tema selezionato
    useEffect(() => {
        const body = document.body;
        const main = document.querySelector('.main-container');
        const powered = document.querySelector('.powered');
        const navbarLi = document.querySelectorAll('.navbar-container .navbar-list li ');
        const navbarBG = document.querySelector('.navbar-container');
        const label = document.querySelector('.display-mode-container');
        const img = document.querySelector('.thinkgood');
        const card = document.querySelector('.card');

        const chatInput = document.querySelector('.chatbot-input-container');
        const chatInputText = document.querySelector('.chatbot-input');
        const msgBot= document.querySelectorAll('.msg_cotainer', '.msg_cotainer.dark');
        const timeBot = document.querySelectorAll('.msg_time');
        const msgUser = document.querySelectorAll('.msg_cotainer_send, .msg_cotainer_send.dark');
        const timeUser = document.querySelectorAll('.msg_time_send');
        const imgUser = document.querySelectorAll('.user_img_msg, .user_img_msg.dark');

        const homeContainer = document.querySelector('.home-container');
        const ChiSiamoContainer = document.querySelector('.chi-siamo-container');
        const chiSiamo = document.querySelector('.chi-siamo-text');
        const founder = document.querySelectorAll('.founder-text');
        const member  = document.querySelectorAll('.member');
        const desc = document.querySelectorAll('.desc');
        const memberH2 = document.querySelectorAll('.member h2');
        const OzStudioContainer = document.querySelectorAll('.oz-studio-container');
        const OzStudio = document.querySelectorAll('.oz-text');
        const ContactContainer = document.querySelector('.contact-us-container');
        const ContactText = document.querySelector('.contact-text');
        const Border1 = document.querySelectorAll('.contact__form .form-control');
        const Border2 = document.querySelectorAll('.contact__form .form-control-l');
        const divider = document.querySelector('.custom-divider');
        const dot = document.querySelectorAll('.typing-dots span');
        const warner = document.querySelector('.warner');
        const sony = document.querySelector('.sony');
        const uni = document.querySelector('.uni');

        const next = document.querySelectorAll('.swiper-button-next');
        const prev = document.querySelectorAll('.swiper-button-prev');
        
        const projectTitle = document.querySelectorAll('.project-title');

        const scrollBar = document.querySelector('::-webkit-scrollbar-thumb');

        //white theme
        if (invertTheme) {
            setTimeout(() => {
                if(scrollBar){
                    scrollBar.style.backgroundColor = 'white';
                }            
                body.style.backgroundColor = 'white';    
                main.style.backgroundColor = 'white';
                navbarBG.style.backgroundColor = `rgba(221,221,221,1)`;
                if (menu || nav) {
                    setTimeout(() => {
                        const navbarBGColor = getComputedStyle(navbarBG).backgroundColor;
                        navbarBG.style.backgroundColor = navbarBGColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 1)');
                        
                        navbarLi.forEach(li => {
                            const liColor = getComputedStyle(li).color;
                            li.style.color = liColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.8)');
                            
                            li.addEventListener('mouseover', function() {
                                const liHoverColor = getComputedStyle(li).color;
                                li.style.color = liHoverColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.5)');
                            });
            
                            li.addEventListener('mouseout', function() {
                                const liMouseOutColor = getComputedStyle(li).color;
                                li.style.color = liMouseOutColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.8)');
                            });
                        });
                    }, 100);
                }

                navbarLi.forEach(li => {
                    li.style.color = 'black';
                    li.addEventListener('mouseover', function() {
                        li.style.color = 'rgba(1,1,1,0.7)';
                    });
                    
                    li.addEventListener('mouseout', function() {
                        li.style.color = 'black';
                    });
                });
                img.classList.add('invert');
                label.classList.add('invert');
                label.style.filter = 'invert(100%)';
                img.style.filter = 'invert(100%)';
                warner.style.filter = 'invert(0%)';
                sony.style.filter = 'invert(0%)';
                uni.style.filter = 'invert(0%)';

                card.style.backgroundColor = '#dddddd';
                chatInput.style.backgroundColor = '#dddddd';
                chatInputText.style.backgroundColor = '#dddddd';
                chatInputText.style.color = 'black';
                if(msgUser) {
                    msgUser.forEach(x => {
                        x.style.color = 'black';
                    });
                    imgUser.forEach(x => {
                        x.style.color = 'black';
                        x.style.border = ' 0.5px solid black'
                    });
                    timeUser.forEach(x => {
                        x.style.color = 'black';
                    });
                }
                if(msgBot) {
                    msgBot.forEach(x => {
                        x.style.color = 'black';
                    });
                    timeBot.forEach(x => {
                        x.style.color = 'black';
                    });
                }
                
                if(homeContainer) {
                    powered.style.color = 'rgba(1,1,1,0.7)';
                    homeContainer.style.backgroundColor = 'white';
                    ChiSiamoContainer.style.backgroundColor = 'white';
                    chiSiamo.style.backgroundColor = 'white';
                    chiSiamo.style.color = 'black';
                    divider.style.border = "1px solid #222222"
                    dot.forEach(d => {
                        d.style.backgroundColor = 'black';
                    });
                    projectTitle.forEach(p => {
                        p.style.color = 'black';
                    });
                    next.forEach(n => {
                        n.style.color = 'black';
                    });
                    prev.forEach(p => {
                        p.style.color = 'black';
                    });
                    member.forEach(m => {
                        m.style.backgroundColor = '#dddddd';
                    });
                    founder.forEach(f => {
                        f.style.color = 'rgba(1,1,1,0.8)';
                    })
                    desc.forEach(m => {
                        m.style.color = 'rgba(1,1,1,0.8)';
                    });
                    memberH2.forEach(m => {
                        m.style.color = 'black';
                    });
                    OzStudioContainer.forEach(o => {
                        o.style.backgroundColor = 'white';

                    });
                    OzStudio.forEach(o => {
                        o.style.color = 'black';

                    }); 
                    ContactContainer.style.backgroundColor = 'white';
                    ContactText.style.color = 'black';
                    Border1.forEach(b=> {
                        b.style.border = '1px solid #222222';
                    });
                    Border2.forEach(b=> {
                        b.style.border = '1px solid #222222';
                    });

                }
                
            }, 100);
        } else {
            setTimeout(() => {
                if(scrollBar){
                    scrollBar.style.backgroundColor = 'black';
                }
                body.style.backgroundColor = 'black';    
                main.style.backgroundColor = 'black';  
                navbarBG.style.backgroundColor = `rgba(34,34,34,1)`;
                if (menu) {
                    setTimeout(() => {
                        const navbarBGColor = getComputedStyle(navbarBG).backgroundColor;
                        navbarBG.style.backgroundColor = navbarBGColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 1)');
                        
                        navbarLi.forEach(li => {
                            const liColor = getComputedStyle(li).color;
                            li.style.color = liColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.8)');
                            
                            li.addEventListener('mouseover', function() {
                                const liHoverColor = getComputedStyle(li).color;
                                li.style.color = liHoverColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.5)');
                            });
            
                            li.addEventListener('mouseout', function() {
                                const liMouseOutColor = getComputedStyle(li).color;
                                li.style.color = liMouseOutColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.8)');
                            });
                        });
                    }, 100);
                }
                navbarLi.forEach(li => {
                    li.style.color = 'white';
                    li.addEventListener('mouseover', function() {
                        li.style.color = 'rgba(255,255,255,0.7)';
                    });
                    
                    li.addEventListener('mouseout', function() {
                        li.style.color = 'white';
                    });
                });
                label.style.filter = 'invert(0%)';
                img.style.filter = 'invert(0%)';
                warner.style.filter = 'invert(100%)';
                sony.style.filter = 'invert(100%)';
                uni.style.filter = 'invert(100%)';

                card.style.backgroundColor = '#222222';
                chatInput.style.backgroundColor = '#222222';
                chatInputText.style.backgroundColor = '#222222';
                chatInputText.style.color = 'white';
                if(msgUser) {
                    msgUser.forEach(x => {
                        x.style.color = 'white';
                    });
                    imgUser.forEach(x => {
                        x.style.color = 'white';
                        x.style.border = ' 0.5px solid white'
                    });
                    timeUser.forEach(x => {
                        x.style.color = 'white';
                    });
                }
                if(msgBot) {
                    msgBot.forEach(x => {
                        x.style.color = 'white';
                    });
                    timeBot.forEach(x => {
                        x.style.color = 'white';
                    });
                }
                if(homeContainer) {
                    dot.forEach(d => {
                        d.style.backgroundColor = 'white';
                    });
                    powered.style.color = 'rgba(255,255,255,0.7)';
                    homeContainer.style.backgroundColor = 'black';
                    ChiSiamoContainer.style.backgroundColor = 'black';
                    chiSiamo.style.backgroundColor = 'black';
                    chiSiamo.style.color = 'white';
                    divider.style.border = "1px solid rgba(255,255,255,0.8)"

                    projectTitle.forEach(p => {
                        p.style.color = 'white';
                    });
                    next.forEach(n => {
                        n.style.color = 'white';
                    });
                    prev.forEach(p => {
                        p.style.color = 'white';
                    });
                    member.forEach(m => {
                        m.style.backgroundColor = '#222222';
                    });
                    founder.forEach(f => {
                        f.style.color = 'rgba(255,255,255,0.8)';
                    })
                    desc.forEach(m => {
                        m.style.color = 'rgba(255,255,255,0.8)';
                    });
                    memberH2.forEach(m => {
                        m.style.color = 'white';
                    });
                    OzStudioContainer.forEach(o => {
                        o.style.backgroundColor = 'black';

                    });     
                    OzStudio.forEach(o => {
                        o.style.color = 'white';

                    });                
                    ContactContainer.style.backgroundColor = 'black';
                    ContactText.style.color = 'white';
                    Border1.forEach(b=> {
                        b.style.border = '1px solid white';
                    });
                    Border2.forEach(b=> {
                        b.style.border = '1px solid white';
                    });
                }            
            }, 100);
        }
    }, [invertTheme, menu, nav]);

    //cambiare il tema
    function handleThemeChange() {
        setInvertTheme(!invertTheme);
    }

    //andare nella sezione cliccata
    const moveTo = (id) => {
        setMenu(true);
        setTimeout(() => {
            const section = document.getElementById(id);
            if (section) {
                const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: sectionPosition,
                    behavior: 'smooth'
                });
            }
        }, 150);
    }

    //una volta cliccata una sezione, la navbar diventa più trasparente
    useEffect(() => {
        const navbarBG = document.querySelector('.navbar-container');
        const navbarLi = document.querySelectorAll('.navbar-container .navbar-list li');
    
        if (menu) {
            setTimeout(() => {
                const navbarBGColor = getComputedStyle(navbarBG).backgroundColor;
                navbarBG.style.backgroundColor = navbarBGColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.8)');
                
                navbarLi.forEach(li => {
                    const liColor = getComputedStyle(li).color;
                    li.style.color = liColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.8)');
                    
                    li.addEventListener('mouseover', function() {
                        const liHoverColor = getComputedStyle(li).color;
                        li.style.color = liHoverColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.5)');
                    });
    
                    li.addEventListener('mouseout', function() {
                        const liMouseOutColor = getComputedStyle(li).color;
                        li.style.color = liMouseOutColor.replace(/rgba?\((\d+), (\d+), (\d+)(, \d+(\.\d+)?)?\)/, 'rgba($1, $2, $3, 0.8)');
                    });
                });
            }, 100);
        }
    }, [menu, nav]);

    const members = [
        { name: "Lorenzo D'Ercole", role: 'A&R', image: team, desc: 'A&R', linkedin: 'https://www.linkedin.com/in/lorenzo-d-ercole-77682a224/' },
        { name: 'Simone Scarfone', role: 'Head of Visual & Branding', image: team, desc: 'Head of Visual & Branding', linkedin: 'https://www.linkedin.com/in/simone-scarfone-383b742b5/' },
        { name: 'Alessio Cristello', role: 'Head of Sales', image: team, desc: 'Head of Sales', linkedin: 'https://www.linkedin.com/in/alessio-cristello-7b136a1bb/' }
    ];

    // Modifica la funzione di invio del modulo
    const handleSubmit = (event) => {
        event.preventDefault(); // Previene il comportamento predefinito del modulo

        const form = event.target; // Ottieni il modulo

        // Invia l'email utilizzando EmailJS
        emailjs.sendForm('service_a1a5ueq', 'template_974wxjq', form, 'NOucoWq9rU7rXkm34')
            .then((result) => {
                console.log('Email inviata con successo:', result.text);
            }, (error) => {
                console.log('Errore nell\'invio dell\'email:', error.text);
            });

        emailjs.sendForm('service_a1a5ueq', 'template_6eu1n9l', form, 'NOucoWq9rU7rXkm34')
            .then((result) => {
                console.log('Email inviata con successo:', result.text);
            }, (error) => {
                console.log('Errore nell\'invio dell\'email:', error.text);
            });

        // Resetta il modulo dopo l'invio
        form.reset();
    };

    // Aggiungi questa nuova funzione per gestire il refresh
    const handleRefresh = () => {
        // Pulisci la chat
        $("#messageFormeight").empty();
        // Resetta la sessione UUID
        setSessionUUID(null);
        localStorage.removeItem('sessionUUID');

    }

  return (
    <div className='main-container' id='main'>
        <p className='n_null' style={{display: 'none'}} />
        <div className={toBottom ?'navbar-container bars' : 'navbar-container'}>
            <ul className='navbar-list'>
                <li onClick={() => moveTo('chi-siamo')}>Chi Siamo</li>
                <li onClick={() => moveTo('40oz-studio')}>40oz Studio</li>
                <li onClick={() => moveTo('lavori')}>I Nostri Lavori</li>
                <li onClick={() => moveTo('contatti')}>Contatti</li>
            </ul>
        </div>

        <div className='navbar-container-mobile'>
            <Hamburger size={30} toggle={setIsMenuOpen} toggled={isMenuOpen} color='white'/>
            <div className={`menu-appear ${!isMenuOpen ? '' : 'view'}`}>
                <p className='menu-item' onClick={() => { moveTo('chi-siamo'); setIsMenuOpen(false); }}>Chi Siamo</p>
                <p className='menu-item' onClick={() => { moveTo('40oz-studio'); setIsMenuOpen(false); }}>40oz Studio</p>
                <p className='menu-item' onClick={() => { moveTo('lavori'); setIsMenuOpen(false); }}>I Nostri Lavori</p>
                <p className='menu-item' onClick={() => { moveTo('contatti'); setIsMenuOpen(false); }}>Contatti</p>
                <div className={toBottom ? "display-mode-container-mobile" : "display-mode-container-mobile nav"}>
                    <input className='input-mode' type='checkbox' id='dark-toggle'onChange={handleThemeChange} checked={invertTheme}/>
                    <label className='display-mode' htmlFor='dark-toggle'>
                        <img className="moon" src={moon} alt='' />
                        <img className="sun" src={sun} alt='' />
                    </label>
                </div>
            </div>
        </div>
       
        <div className={toBottom ? 'center-block beetween' : 'center-block'}>
            <img className={toBottom ? 'thinkgood beetween' : 'thinkgood'} src={logo} alt='Thinkgood' />
            <div className={toBottom ? 'chat-container view' : 'chat-container'}>
                <div className="card">
                    <div  className={toBottom ? 'refresh-icon view' : 'refresh-icon'}>
                        <FontAwesomeIcon 
                            icon={faRotateRight} 
                            onClick={handleRefresh}
                            style={{ color: invertTheme ? '#000' : '#fff', fontSize: '20px' }}
                        />
                    </div>
                    <div id="messageFormeight" className="card-body msg_card_body">

                        
                    </div>
                </div>  
            </div>
            <div className='chatbot-input-container' style={{zIndex:"2 !important"}}>
                <form id="messageArea" className="form-group" 
                onSubmit={activateBot}>
                    <textarea type='text' id="text" name="msg" className={invertTheme ? 'chatbot-input dark' : 'chatbot-input'} placeholder='Raccontaci il tuo progetto...' autoComplete='off' required rows="1"/>
                    <button type="submit" id="send" className='chatbot-start'>Invia</button>
                </form>
            </div>
        </div>

        <div className={toBottom ? "display-mode-container" : "display-mode-container nav"}>
            <input className='input-mode' type='checkbox' id='dark-toggle'onChange={handleThemeChange} checked={invertTheme}/>
            <label className='display-mode' htmlFor='dark-toggle'>
                <img className="moon" src={moon} alt='' />
                <img className="sun" src={sun} alt='' />
            </label>
        </div>

        <div className={menu ? 'home-container' : 'home-container none'}>
            <div className='chi-siamo-container' id='chi-siamo'>
                <p className='chi-siamo-text'>Chi Siamo</p>
                <div className='desc-oz'>
                    <p className='desc'>Fondata nel 2018 a Milano, Thinkgood Music è una realtà specializzata in Management, Publishing e Distribuzione Digitale. 
                                        Con sede in Via Lanzone 25, la nostra struttura offre un ecosistema multiservizi che accompagna gli artisti dalla fase iniziale di progettualità fino alla creazione di percorsi di formazione direttamente all'interno dei nostri studi di registrazione.
                                        Alla guida di Thinkgood Music c'è il CEO e Producer Pitto Stail, professionista attivo dal 2009, che ha collaborato con artisti di spicco come Axos, Dani Faiv, Zoda, Hellen, Ensi e su progetti di rilevanza nazionale, tra cui Sanremo 2019. 
                                        Attualmente Pitto Stail è il direttore artistico di molti dei progetti che prendono vita nel 40oz Studio, il cuore pulsante della nostra struttura. Questo studio di registrazione è specializzato nella produzione musicale, garantendo un approccio altamente professionale e innovativo.
                                        <br></br><br></br>
                                        Oltre a supportare gli artisti nelle loro carriere, Thinkgood Music crede fermamente nella formazione dei nuovi talenti. Organizziamo masterclass esclusive in collaborazione con artisti e professionisti del settore discografico, 
                                        offrendo un'opportunità unica per apprendere i segreti del mestiere e sviluppare le proprie competenze artistiche e tecniche.
                                        Con un'attenzione costante alla qualità e un team appassionato, Thinkgood Music è il punto di riferimento per chi desidera trasformare la propria musica in un progetto di successo</p>
                </div>
                <p className='founder-text' font-size="40px !important">Founder</p>
                <div className='team-container'>
                    <div className='member'>
                        <div className='image-content'>
                            <span className='overlay'></span>
                        
                            <div className='member-image'>
                                <img src={founder} alt='prova' className='member-img'/>
                            </div>
                        </div>
                        <div className='member-content'>
                            <h2 className='name'>Tony Pensabene</h2>
                            <p className='desc'>CEO</p>
                        </div>
                        <div class="icons">
                            <a href="https://www.linkedin.com/in/tonypensabene00/" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="mailto:tony.paolopensabene@gmail.com" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <p className='founder-text' font-size="40px !important">Soci</p>
                <div className='team-container'>
                    <div className='member'>
                        <div className='image-content'>
                            <span className='overlay'></span>
                        
                            <div className='member-image'>
                                <img src={founder} alt='prova' className='member-img'/>
                            </div>
                        </div>
                        <div className='member-content'>
                            <h2 className='name'>Alessio Chiapino</h2>
                            <p className='desc'>COO</p>
                        </div>
                        <div class="icons">
                            <a href="https://www.linkedin.com/in/alessio-chiapino-457013254/" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="mailto:alessiochiapino025@gmail.com" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                    <div className='member'>
                        <div className='image-content'>                        
                            <div className='member-image'>
                                <img src={founder} alt='prova' className='member-img'/>
                            </div>
                        </div>
                        <div className='member-content'>
                            <h2 className='name'>Giuseppe Anselmo</h2>
                            <p className='desc'>CFO</p>
                        </div>
                        <div class="icons">
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <p className='founder-text' font-size="40px !important">Team</p>
                    <Swiper
                        modules={[Pagination, Navigation]}
                        initialSlide={1}
                        slidesPerView={1} 
                        spaceBetween={10} 
                        centeredSlides={true}
                        grabCursor={true}
                        navigation={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            1024: {
                                slidesPerView: 3,
                            }
                        }}
                        className="custom-swiper"
                    >
                        {members.map((member, index) => (
                            <SwiperSlide key={index}>
                                <div className="member">
                                    <div className="image-content">
                                        <div className="member-image">
                                            <img src={member.image} alt={member.name} className="member-img"/>
                                        </div>
                                    </div>
                                    <div className="member-content">
                                        <h2 className="name">{member.name}</h2>
                                        <p className="desc">{member.role}</p>
                                    </div>
                                    <div className="icons">
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
            </div>

            <div className='oz-studio-container' id='40oz-studio'>
                <p className='oz-text'>40oz Studio</p>
                <div className='desc-oz'>
                    <p className='desc'> 40oz Studio, con sede a Milano, è il luogo dove sono nati molti dei successi dell'ambito rap. Con
                                        una forte esperienza nella produzione musicale, lo studio si distingue per la sua capacità di spaziare
                                        tra diversi generi, tra cui Rap, RnB, Pop, Elettronica e Rock, offrendo una versatilità unica nel
                                        panorama musicale.<br></br>
                                        All'interno del 40oz si trova un team dedicato di professionisti, ciascuno specializzato in un aspetto
                                        specifico: dalla fonia, alla produzione, alla direzione musicale. Questo approccio mirato ci consente
                                        di ottimizzare i tempi senza mai sacrificare la qualità del risultato.<br/>
                                        Il nostro obiettivo non è solo creare musica, ma far sì che ogni progetto funzioni a livello numerico
                                        e di successo commerciale. Al 40oz, creiamo pacchetti personalizzati, focalizzandoci sul progetto e
                                        non semplicemente sul prodotto. Puntiamo a rendere sostenibile il percorso artistico, assicurandoci
                                        che il risultato sia vincente sul mercato, perché per noi, un progetto deve funzionare prima ancora di
                                        essere solo bello.</p>
                </div>

                <div className="carousel-oz">
                    <div className="masonry-gallery">
                        <div className="gallery-column">
                            <div className="image-container">
                                <img src={g1} alt="Studio" />
                            </div>
                            <div className="image-container">
                                <img src={g2} alt="Studio" />
                            </div>
                            <div className="image-container">
                                <img src={g3} alt="Studio" />
                            </div>
                            <div className="image-container">
                                <img src={g4} alt="Studio" />
                            </div>
                            <div className="image-container">
                                <img src={g5} alt="Studio" />
                            </div>
                            <div className="image-container">
                                <img src={g6} alt="Studio" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='oz-studio-container' id='lavori'>
                <p className='oz-text'>I Nostri Lavori</p>
                <div className='desc-oz'>
                    <p className='desc'> Thinkgood è una label discografica e un hub creativo a Milano, dedicato a trasformare le idee in progetti musicali e visivi di alto livello. Offriamo un percorso completo per artisti e creativi, dalla musica all'immagine.

Nel nostro studio di registrazione lavoriamo con professionisti esperti per offrirti registrazioni di qualità, mix e mastering impeccabili e produzioni musicali su misura, con strumentali personalizzate che si adattano a ogni stile e budget.

Completiamo il tuo progetto con una direzione creativa e una brand identity studiate per valorizzare il tuo talento e rendere il tuo messaggio unico e riconoscibile.

Pensiamo anche alla parte visiva: shooting fotografici, creazione di cover e video musicali curati nei minimi dettagli da un team specializzato per rappresentare al meglio la tua estetica.

Thinkgood è il punto di riferimento per chi cerca un ambiente creativo, professionale e accessibile, dove ogni artista trova gli strumenti e il supporto per esprimere al meglio la propria arte.</p>
                </div>

                <div className="carousel-lavori">
                    <Swiper
                        className="custom-swiper-lavori"
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        initialSlide={0}
                        slidesPerView={1}
                        grabCursor={true}
                        centeredSlides={true}
                        navigation={true}
                        pagination={true}
                        effect={'coverflow'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                            scale: 0.85,
                        }}
                        
                    >
                        
                        <SwiperSlide >
                            <div className="lavori-slide-container" >
                                <div style={{ flex: '1 1', position: 'relative' }}>
                                    <img src={axos} alt="Axos" className="lavori-image"  />
                                </div>
                                <div style={{ flex: '1', padding: '20px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h1 className='project-title' style={{ textAlign: 'center' }}>Axos</h1>
                                    <h2 style={{ fontSize: '16px', marginTop: '10px', width:"100%"}} className='desc'>
                                        Nato dalla collaborazione tra Axos e Pitto Stail, "17.5" è il risultato di un processo creativo rigoroso e dettagliato. Prodotto interamente al 40oz Studio, 
                                        ogni traccia è stata scolpita nel minimo dettaglio, dalla scrittura alle registrazioni al mixaggio.
                                        Thinkgood Music ha curato a 360 gradi la comunicazione del progetto insieme all'artista, creando una strategia social coinvolgente e un evento esclusivo per i fan. 
                                        Il listening party a scatola chiusa ha generato un'attesa febbrile e ha permesso ai fan di vivere in anteprima l'esperienza sonora di "17.5".
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div className="lavori-slide-container" >
                                <div style={{ flex: '1 1', position: 'relative' }}>
                                    <img src={faiv} alt="Dani Faiv" className="lavori-image"  />
                                </div>
                                <div style={{ flex: '1', padding: '20px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h1 className='project-title' style={{ textAlign: 'center' }}>Dani Faiv</h1>
                                    <h2 style={{ fontSize: '16px', marginTop: '10px', width:"100%"}} className='desc'>
                                    Nata all'interno del 40oz Studio, la traccia Piccolo Faiv di Dani Faiv, prodotta da Pitto Stail è un'esplorazione sonora intima e personale. Il brano è nato in una sessione creativa dedicata alla ricerca di un sound che potesse trasmettere l'amore paterno, creando un'atmosfera che sia energica ma anche introspettiva per il progetto TDC2.
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div className="lavori-slide-container" >
                                <div style={{ flex: '1 1', position: 'relative' }}>
                                    <img src={slash} alt="Slash x Delarue" className="lavori-image"  />
                                </div>
                                <div style={{ flex: '1', padding: '20px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h1 className='project-title' style={{ textAlign: 'center' }}>Young Slash</h1>
                                    <h2 style={{ fontSize: '16px', marginTop: '10px', width:"100%"}} className='desc'>
                                    Nato dalla collaborazione tra Young Slash e Delarue, 'CALLE' è il primo singolo tra Thinkgood e Ada Music Italy che da inizio a un percorso progettuale. 
                                    Registrato, mixato e masterizzato ai 40oz Studio, il brano è un perfetto connubio tra le sonorità tipiche della strada e una produzione di livello.
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div className="lavori-slide-container" >
                                <div style={{ flex: '1 1', position: 'relative' }}>
                                    <img src={hellen} alt="Hellen" className="lavori-image"  />
                                </div>
                                <div style={{ flex: '1', padding: '20px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h1 className='project-title' style={{ textAlign: 'center' }}>Hellen</h1>
                                    <h2 style={{ fontSize: '16px', marginTop: '10px', width:"100%"}} className='desc'>
                                    Nata da una sessione creativa all'interno dei 40oz Studio, 'Mamma Italiana' di Hellen è il frutto di una stretta collaborazione tra l'artista e il suo team. 
                                    Insieme, hanno dato vita a un brano che cattura l'essenza del sound unico di Hellen dove si è posizionata per la prima volta come cantante.
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <div className='contact-us-container' id='contatti'>
                <p className='contact-text'>Contattaci</p>
                <div className='map-form-container'>
                    <div className="map-container">
                        <iframe title="Thinkgood" border-radius="15px" width="80%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Via%20Lanzone%2025%2020123%20Milano,%20Lombardia+(Thinkgood)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            <a href="https://www.gps.ie/">gps devices</a>
                        </iframe>
                    </div>
                    <div className='form-container'>
                        <form className="contact__form w-100" onSubmit={handleSubmit}>
                            <div className='row-input'>
                                <input
                                    className="form-control-l"
                                    id="name"
                                    name="to_name"
                                    placeholder="Nome" 
                                    type="text"
                                    required 
                                />
                                <input
                                    className="form-control-l"
                                    id="surname"
                                    name="to_surname"
                                    placeholder="Cognome" 
                                    type="text"
                                    required 
                                />
                            </div>
                            <input
                                className="form-control rounded-0"
                                id="phone"
                                name="to_phone"
                                placeholder="Telefono"
                                type="tel" 
                                required 
                            />
                            <input
                                className="form-control rounded-0"
                                id="email"
                                name="to_email"
                                placeholder="Email"
                                type="email" 
                                required 
                            />
                            <textarea
                                className="form-control rounded-0"
                                id="message"
                                name="message"
                                placeholder="Messaggio"
                                rows="5" 
                                required
                            ></textarea>
                            <br />
                            <button className="submit-button" type="submit"> 
                                Invia
                            </button>
                        </form>
                    </div>
                </div>
                <hr className='custom-divider'></hr>
                <div style={{ display: 'flex', flexDirection:'column', marginBottom:20, gap:10}}>
                    <div className='contact-box-icons'>
                        <a className='mini-footer-text-a'  href="https://www.instagram.com/thinkgood_music/"><FontAwesomeIcon className="footer-icon" icon={faInstagram} /></a>
                        <a className='mini-footer-text-a'  href="https://www.linkedin.com/company/thinkgood/"><FontAwesomeIcon className="footer-icon" icon={faLinkedin} /></a>
                    </div>
                    <p className='mini-footer-text'style={{marginBottom: 0}}>Thinkgood Srls - Via Lanzone 25 Milano 20123 - P.IVA 12414860960</p>
                    <div className='contact-box'>
                        <FontAwesomeIcon className="footer-icon" icon={faPhone} />
                        <a className='mini-footer-text-a' style={{marginRight: 20}} href="tel:3472988931">+39 3472988931</a>
                        <FontAwesomeIcon className="footer-icon" icon={faEnvelope} />
                        <a className='mini-footer-text-a' style={{marginRight: 20}} href="mailto:amministrazione@thinkgoodmusic.com">amministrazione@thinkgoodmusic.com</a>
                        <FontAwesomeIcon className="footer-icon" icon={faShieldAlt} />
                        <a className='mini-footer-text-a' style={{marginRight: 20}} href="mailto:thinkgood@pec.it" >thinkgood@pec.it</a>
                    </div>
                    <div className='contact-box-powered' style={{gap: 20}}>
                        <a className='mini-footer-text powered'style={{marginBottom: 5}} href="/privacy" >Privacy & Policy</a>
                        <a className='mini-footer-text powered'style={{marginBottom: 5}} href="https://www.hi-dev.it/"  >Powered by Hidev</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="logo-container">
            <p style={{ fontSize: '12px', textAlign: 'center', marginBottom:"0px", zIndex:"2" }}>Supported by</p>
            <div style={{zIndex:"1", backgroundColor:"transparent !important", display:"flex", justifyContent:"center", alignItems:"center", gap:10, marginLeft:"5px"}}>
                <img className="warner" src={warner} alt="Logo 1" />
                <img className="sony"src={sony} alt="Logo 2" />
                <img className="uni"src={universal} alt="Logo 3" />
            </div>
        </div>
    </div>
  )
}

export default Main
