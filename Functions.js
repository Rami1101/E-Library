'use strict';

//!-----------------------------------------------------------------------------------------
//! for both html pages

//? nav
const nav = document.querySelector('.nav');

const handleOver = function (value, target) {
    const link = target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const title = link.closest('.nav').querySelector('.nav_title');

    if (!target.classList.contains('nav__link')) return;

    siblings.forEach(s => {
        if (s !== link) s.style.opacity = value;
        title.style.opacity = value;
    });
}

//---------------------------------

nav.addEventListener('mouseover', function (e) {
    handleOver(0.5, e.target);
})

nav.addEventListener('mouseout', function (e) {
    handleOver(1, e.target);
})

//!-----------------------------------------------------------------------------------------
//! books js

function books() {
    //? hide and show books
    const table = document.querySelector('.table');
    const showInfoButton = document.querySelectorAll('.table__infoButton');

    table.addEventListener('click', function (e) {
        const clickedButton = e.target.closest('.table__infoButton');

        //? change the color of the button
        if (!clickedButton) return;
        let clickedInfo = document.querySelector(`.table__infoRow--${clickedButton.dataset.tab}`);
        clickedInfo.classList.toggle('hidden');

        if (clickedInfo.classList.contains('hidden')) {
            clickedButton.style.background = '#f3f3f3';
        }
        else {
            clickedButton.style.background = '#999';
        }
    })

    //? choose button
    let selectedBooks = [];
    let totalPrice = 0;

    const chooseButton = document.querySelectorAll(".table__chooseButton");
    table.addEventListener("click", function (e) {
        const clickedButton = e.target.closest(".table__chooseButton");
        if (!clickedButton) return;

        if (clickedButton.classList.contains("active_button")) {
            totalPrice = totalPrice - Number(clickedButton.closest("tr").querySelector("td:nth-child(3)").innerText);

            clickedButton.classList.remove("active_button");

            selectedBooks = [...selectedBooks].filter((book) => {
                return book.id !== clickedButton.closest("tr").id;
            });

        } else {
            totalPrice = totalPrice + Number(clickedButton.closest("tr").querySelector("td:nth-child(3)").innerText);
            selectedBooks.push({
                id: clickedButton.closest("tr").id,
                الكاتب: clickedButton.closest("tr").querySelector("td:nth-child(1)").innerText,
                ISBN: clickedButton.closest("tr").querySelector("td:nth-child(2)").innerText,
                السعر: +clickedButton.closest("tr").querySelector("td:nth-child(3)")
                    .innerText,
            });

            clickedButton.classList.add("active_button");
        }
    });

    //? form
    function send() {
        console.log(selectedBooks);
        const email = document.getElementById("email").value;
        const nationalNumber = document.getElementById("national-number").value;
        const phoneNumber = document.getElementById("phone-number").value;
        const captchaInput = document.getElementById("captcha-input").value;
        const username = document.getElementById("username").value;
        const usernamePattern = /^[\u0600-\u06FF\s]+$/;

        if (/^(0[1-9]|1[0-5])[0-9]{9}$/.test(nationalNumber) && username === "" && email === "" && captchaInput === "" && phoneNumber === "") {
            alert(`${JSON.stringify(selectedBooks)}
  المجموع الكلي :${totalPrice}`);
            return true;
        } else {
            if (!usernamePattern.test(username)) {
                alert("الرجاء إدخال الاسم باللغة العربية بدون أرقام أو رموز");
                return false;
            }

            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("يرجى إدخال عنوان بريد إلكتروني صالح");
                return false;
            }

            let numberPattern = /^(0[1-9]|1[0-5])[0-9]{9}$/;
            if (!numberPattern.test(nationalNumber)) {
                alert("يرجى إدخال رقم وطني صالح بين 01 و 15");
                return false;
            }

            let phonePattern =
                /((0)(93|94|95|96|98|99)([0-9]{7}))|((0)(92|95|96|97)([0-9]{7}))/;
            if (!phonePattern.test(phoneNumber)) {
                alert("يرجى إدخال رقم هاتف صالح مع رمز (مثال: 0992034996)");
                return false;
            }

            if (captchaInput === "") {
                alert("يرجى إدخال رمز التحقق من الكابتشا");
                return false;
            }

            if (captcha !== captchaInput) {
                alert("رمز التحقق من الكابتشا غير صحيح");
                return false;
            }

            alert(`${JSON.stringify(selectedBooks)}
  المجموع الكلي :${totalPrice}`);
            return true;
        }
    }

    //?-------------------

    //?captcha
    let captcha, chars;

    const refreshbtn = document.getElementById('refreshbtn');
    const checkbtn2 = document.getElementById('checkbtn-2');

    function genNewCaptcha() {
        chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        captcha = chars[Math.floor(Math.random() * chars.length)];
        for (let i = 0; i < 6; i++) {
            captcha = captcha + chars[Math.floor(Math.random() * chars.length)];
        }

        form1.text.value = captcha;
    }

    refreshbtn.addEventListener('click', function () {
        genNewCaptcha();
    })
    checkbtn2.addEventListener('click', function () {
        send();
        genNewCaptcha();
    })

    //? scroll
    const checkbtn1 = document.getElementById('checkbtn-1');
    checkbtn1.addEventListener('click', function () {
        const section_form = document.querySelector('.section_form')
        checkbtn1.addEventListener('click', function (e) {

            if (!selectedBooks.length == 0) {

                const s1coords = section_form.getBoundingClientRect();
                section_form.classList.remove('hidden');
                section_form.scrollIntoView({ behavior: "smooth" })
            }
            else {
                alert('اختر كتاب');
            }

        })
    });
}

function aboutus() {
    // Particle.js Configuration
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}