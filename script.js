$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Biodiversity Conservation","Biodiversity Governance","Climate Action","Climate Adaptation","Climate Justice","Conservation Governance","Data Analysis","Ecosystem Services","Environmental Data Science","Environmental Governance","Environmental Justice","Environmental Management","GIS & Remote Sensing","Interdisciplinary Research","Land-Use Change","Natural Resource Rights","Nature-Based Solutions","Open to Internships","Open to PhD Opportunities","Participatory Research","Policy Analysis","Power BI","Research","SDGs","Scientific Writing","Socio-Ecological Systems","Spatial Analysis","Stakeholder Engagement","Sustainable Rural Development"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Biodiversity Conservation","Biodiversity Governance","Climate Action","Climate Adaptation","Climate Justice","Conservation Governance","Data Analysis","Ecosystem Services","Environmental Data Science","Environmental Governance","Environmental Justice","Environmental Management","GIS & Remote Sensing","Interdisciplinary Research","Land-Use Change","Natural Resource Rights","Nature-Based Solutions","Open to Internships","Open to PhD Opportunities","Participatory Research","Policy Analysis","Power BI","Research","SDGs","Scientific Writing","Socio-Ecological Systems","Spatial Analysis","Stakeholder Engagement","Sustainable Rural Development"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});


/* =====================================================================
   Added features: analytics, contact form, scroll tracker, tilt, link previews
   ===================================================================== */

/* ---- 1. Visitor tracker (GoatCounter: cookieless, GDPR-friendly) ----
   1) Sign up free at https://www.goatcounter.com and pick a code (e.g. "mehedi").
   2) Put that code between the quotes below. Leave empty to keep tracking off. */
var GOATCOUNTER_CODE = "";
(function () {
    if (!GOATCOUNTER_CODE) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://" + GOATCOUNTER_CODE + ".goatcounter.com/count");
    document.body.appendChild(s);
    var f = document.querySelector("footer");
    if (f) {
        var p = document.createElement("p");
        p.className = "privacy-note";
        p.textContent = "This site uses cookieless, privacy-friendly visit statistics (GoatCounter). No personal profiles are built.";
        f.appendChild(p);
    }
})();

/* ---- 2. Contact form: sends the message by email (FormSubmit; optional Web3Forms) ---- */
(function () {
    var form = document.forms["contact-form"];
    var msg = document.getElementById("msg");
    if (!form || !msg) return;
    var TO = "mh0212999@gmail.com";
    /* Optional, more reliable second service: get a free access key at https://web3forms.com
       (it asks for your email), paste it here and it is used instead of FormSubmit. */
    var WEB3FORMS_KEY = "";
    function say(html, ok) { msg.style.color = ok ? "#1a7f37" : "#b3261e"; msg.style.fontWeight = "500"; msg.innerHTML = html; }
    function mailto(d) {
        return "mailto:" + TO + "?subject=" + encodeURIComponent("Message from your portfolio website") +
            "&body=" + encodeURIComponent((d.message || "") + "\n\n" + (d.name || "") + " (" + (d.email || "") + ")");
    }
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = document.getElementById("formButton");
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        if (data._honey) return;                                   // spam trap
        delete data.privacy_consent;
        var fallback = '<a href="' + mailto(data) + '">Click here to send it from your email app instead</a>.';
        if (location.protocol === "file:") {
            say("Sending only works on the published website (https), not from a file opened on your computer. " + fallback, false);
            return;
        }
        btn.disabled = true; btn.textContent = "Sending...";
        var w3 = !!WEB3FORMS_KEY;
        var url = w3 ? "https://api.web3forms.com/submit" : "https://formsubmit.co/ajax/" + TO;
        var payload = w3 ? { access_key: WEB3FORMS_KEY, name: data.name, email: data.email, message: data.message, subject: data._subject } : data;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(payload)
        }).then(function (r) {
            return r.text().then(function (t) { var j = {}; try { j = JSON.parse(t); } catch (x) {} return j; });
        }).then(function (j) {
            if (j.success === true || j.success === "true") { say("Thank you! Your message has been sent.", true); form.reset(); }
            else { throw new Error(j.message || "the mail service did not accept the message"); }
        }).catch(function (err) {
            console.error("Contact form:", err);
            say("Sorry, the message could not be sent automatically. " + fallback, false);
        }).finally(function () { btn.disabled = false; btn.textContent = "Send Message"; });
    });
})();

/* ---- 3. Right-edge scroll tracker: progress, section titles (click to jump), drag to scroll ---- */
(function () {
    var box = document.getElementById("scrollTracker");
    if (!box) return;
    var track = box.querySelector(".st-track");
    var pct = box.querySelector(".st-pct");
    var list = box.querySelector(".st-list");
    var root = document.documentElement;
    var SECTIONS = [["home","Home"],["about","About"],["experience","Experience"],["project","Projects"],["education","Education"],["training","Training"],["research","Publications"],["awards","Awards"],["ielts-score","Languages"],["skills","Skills"],["contact","Contact"]];
    var items = [];
    SECTIONS.forEach(function (s) {
        var el = document.getElementById(s[0]); if (!el) return;
        var li = document.createElement("li"), b = document.createElement("button");
        b.type = "button"; b.textContent = s[1];
        b.addEventListener("click", function () {
            window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
        });
        li.appendChild(b); list.appendChild(li); items.push({ el: el, li: li });
    });
    function maxScroll() { return Math.max(1, root.scrollHeight - window.innerHeight); }
    function layout() {                       // place titles where their sections start, keeping a minimum gap
        var H = list.clientHeight || box.clientHeight, gap = 26, n = items.length, ys = [], i;
        for (i = 0; i < n; i++) {
            var y = (items[i].el.getBoundingClientRect().top + window.scrollY) / maxScroll() * H;
            ys.push(Math.max(12, i ? Math.max(y, ys[i - 1] + gap) : y));
        }
        for (i = n - 1; i >= 0; i--) { ys[i] = Math.min(ys[i], i === n - 1 ? H - 12 : ys[i + 1] - gap); }
        items.forEach(function (it, k) { it.li.style.top = Math.max(12, ys[k]) + "px"; });
    }
    function update() {
        var p = Math.min(1, Math.max(0, window.scrollY / maxScroll()));
        box.style.setProperty("--p", (p * 100) + "%");
        pct.textContent = Math.round(p * 100) + "%";
        var cur = 0, probe = window.scrollY + window.innerHeight * 0.35;
        items.forEach(function (it, i) { if (it.el.getBoundingClientRect().top + window.scrollY <= probe) cur = i; });
        items.forEach(function (it, i) { it.li.classList.toggle("active", i === cur); });
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", function () { layout(); update(); });
    window.addEventListener("load", function () { layout(); update(); });
    box.addEventListener("mouseenter", function () { layout(); });
    layout(); update();
    function jump(clientY, instant) {
        var r = track.getBoundingClientRect();
        var p = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
        window.scrollTo({ top: p * maxScroll(), behavior: instant ? "instant" : "smooth" });
    }
    var dragging = false;
    track.addEventListener("pointerdown", function (e) { dragging = true; box.classList.add("dragging"); track.setPointerCapture(e.pointerId); jump(e.clientY, true); e.preventDefault(); });
    track.addEventListener("pointermove", function (e) { if (dragging) jump(e.clientY, true); });
    function stop() { dragging = false; box.classList.remove("dragging"); }
    track.addEventListener("pointerup", stop);
    track.addEventListener("pointercancel", stop);
    box.querySelector(".st-top").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    box.querySelector(".st-bottom").addEventListener("click", function () { window.scrollTo({ top: maxScroll(), behavior: "smooth" }); });
})();

/* ---- 4. Hover tilt + zoom on cards, publications and boxes ---- */
(function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    document.querySelectorAll(".serv-content > .card .box, .edu-card, .publication, .score-details, .trf-preview").forEach(function (el) {
        el.classList.add("tilt");
        el.addEventListener("mousemove", function (e) {
            var r = el.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width - 0.5;
            var y = (e.clientY - r.top) / r.height - 0.5;
            el.style.setProperty("--ry", (x * 7) + "deg");
            el.style.setProperty("--rx", (-y * 7) + "deg");
        });
        el.addEventListener("mouseleave", function () {
            el.style.setProperty("--ry", "0deg");
            el.style.setProperty("--rx", "0deg");
        });
    });
})();

/* ---- 5. Link preview cards: hover shows a screenshot of the linked page ----
   Screenshots come from thum.io (fallback: WordPress mShots), so hovering a link sends that
   link's address to those services. Set LINK_SCREENSHOTS to false to use local-only cards. */
var LINK_SCREENSHOTS = true;
(function () {
    if (!window.matchMedia("(hover: hover)").matches) return;
    var MAP = [
        { m: /linkedin\.com/, icon: "fab fa-linkedin-in", c: "#0a66c2", t: "LinkedIn", d: "Professional profile, experience and recommendations." },
        { m: /github\.com/, icon: "fab fa-github", c: "#24292f", t: "GitHub", d: "Code, websites and open projects." },
        { m: /facebook\.com/, icon: "fab fa-facebook", c: "#1877f2", t: "Facebook", d: "Personal social profile." },
        { m: /instagram\.com/, icon: "fa-brands fa-instagram", c: "#c13584", t: "Instagram", d: "Personal social profile." },
        { m: /(^|\.)x\.com|twitter\.com/, icon: "fa-brands fa-x-twitter", c: "#111", t: "X (Twitter)", d: "Short updates and conservation news." },
        { m: /t\.me/, icon: "fa-brands fa-telegram", c: "#229ed9", t: "Telegram", d: "Message me on Telegram." },
        { m: /orcid\.org/, icon: "fab fa-orcid", c: "#a6ce39", t: "ORCID iD 0000-0003-3999-2740", d: "Persistent identifier linking my research outputs." },
        { m: /doi\.org/, icon: "fas fa-book-open", c: "#08283F", t: "Journal article (DOI)", d: "Opens the full article on the publisher's website." },
        { m: /bangladesh-unfccc-factsheet/, icon: "fas fa-globe-asia", c: "#08283F", t: "UNFCCC in Bangladesh", d: "Interactive factsheet: commitments, NDCs, adaptation actions and climate finance." },
        { m: /netlify\.app/, icon: "fas fa-link", c: "#0b6fa4", t: "Personal website", d: "My other personal website." },
        { m: /rsc-bd\.org/, icon: "fas fa-industry", c: "#08283F", t: "RMG Sustainability Council", d: "Remediation programme for factory safety in Bangladesh." },
        { m: /oxfam\.org/, icon: "fas fa-hands-helping", c: "#e4002b", t: "Oxfam in Bangladesh", d: "Climate justice and natural resource rights portfolio." },
        { m: /ceccr\.com/, icon: "fas fa-flask", c: "#08283F", t: "CECCR", d: "Centre for Environment and Climate Change Research." },
        { m: /fao\.org/, icon: "fas fa-seedling", c: "#08283F", t: "FAO", d: "Food and Agriculture Organization of the United Nations." },
        { m: /scbeurope\.org|conbio\.org/, icon: "fas fa-leaf", c: "#0b6fa4", t: "SCB Europe Region", d: "Society for Conservation Biology Europe: communicating conservation science." }
    ];
    var card = document.createElement("div");
    card.className = "link-preview";
    card.innerHTML = '<div class="lp-banner"><i class="lp-icon"></i><img class="lp-shot" alt="" referrerpolicy="no-referrer"></div><div class="lp-body"><div class="lp-title"></div><div class="lp-desc"></div><div class="lp-host"></div></div>';
    document.body.appendChild(card);
    var banner = card.querySelector(".lp-banner"), icon = card.querySelector(".lp-icon"), shot = card.querySelector(".lp-shot"),
        title = card.querySelector(".lp-title"), desc = card.querySelector(".lp-desc"), host = card.querySelector(".lp-host");
    function info(url, el) {
        var u; try { u = new URL(url); } catch (e) { return null; }
        var hit = MAP.filter(function (x) { return x.m.test(u.hostname + u.pathname); })[0] || {};
        var pub = el.closest(".publication");
        var h3 = pub && pub.querySelector("h3");
        var cardText = el.querySelector && el.querySelector(".text");
        return {
            icon: hit.icon || "fas fa-external-link-alt", c: hit.c || "#08283F",
            t: (h3 ? h3.textContent.trim() : hit.t) || (cardText ? cardText.textContent.trim() : u.hostname),
            d: hit.d && h3 ? hit.t + ": " + hit.d : (hit.d || "Opens in a new tab."),
            host: u.hostname.replace(/^www\./, ""), url: url
        };
    }
    function show(el, url, e) {
        var i = info(url, el); if (!i) return;
        icon.className = "lp-icon " + i.icon;
        banner.style.background = "linear-gradient(135deg," + i.c + ",#0f1720)";
        shot.classList.remove("ready"); shot.removeAttribute("src");
        if (LINK_SCREENSHOTS) {
            shot.dataset.fb = "";
            shot.onload = function () { shot.classList.add("ready"); };
            shot.onerror = function () {
                if (!shot.dataset.fb) { shot.dataset.fb = "1"; shot.src = "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(i.url) + "?w=580&h=320"; }
            };
            shot.src = "https://image.thum.io/get/width/580/crop/320/" + i.url;
        }
        title.textContent = i.t; desc.textContent = i.d; host.textContent = "↗ " + i.host;
        card.classList.add("show"); move(e);
    }
    function move(e) {
        var w = card.offsetWidth, hh = card.offsetHeight, x = e.clientX + 18, y = e.clientY + 18;
        if (x + w > window.innerWidth - 10) x = e.clientX - w - 18;
        if (y + hh > window.innerHeight - 10) y = e.clientY - hh - 18;
        card.style.left = Math.max(8, x) + "px"; card.style.top = Math.max(8, y) + "px";
    }
    function hide() { card.classList.remove("show"); }
    function bind(el, url) {
        el.addEventListener("mouseenter", function (e) { show(el, url, e); });
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", hide);
    }
    document.querySelectorAll('a[href^="http"]').forEach(function (a) {
        if (a.closest(".navbar") || a.closest(".publication")) return;
        bind(a, a.href);
        if (!a.getAttribute("aria-label") && !a.textContent.trim()) {
            var i = info(a.href, a); if (i) a.setAttribute("aria-label", i.t);
        }
    });
    document.querySelectorAll(".publication").forEach(function (p) {
        var a = p.querySelector('a[href^="http"]'); if (a) bind(p, a.href);
    });
    window.addEventListener("scroll", hide, { passive: true });
})();

/* ---- 6. Cover photos only exist while the home screen is in view; hide scroll hint after scrolling ---- */
(function () {
    var covers = document.querySelector(".cover-slides"), home = document.getElementById("home"), hint = document.querySelector(".scroll-hint");
    function chk() {
        var past = home && home.getBoundingClientRect().bottom <= 0;
        if (covers) covers.style.visibility = past ? "hidden" : "visible";
        if (hint) hint.classList.toggle("hide", window.scrollY > 60);
    }
    window.addEventListener("scroll", chk, { passive: true });
    chk();
})();
