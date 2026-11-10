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

/* ---- 2. Contact form: email or phone (with country picker), sent by email via FormSubmit ---- */
(function () {
    var form = document.forms["contact-form"];
    var msg = document.getElementById("msg");
    if (!form || !msg) return;
    var TO = "mh0212999@gmail.com";
    /* Optional: free key from https://web3forms.com, used instead of FormSubmit when set. */
    var WEB3FORMS_KEY = "";
    /* ISO code, name, dial code. Listed by priority: the first entry wins when a dial code is shared (e.g. +1). */
    var COUNTRIES = [["BD","Bangladesh","880"],["PT","Portugal","351"],["ES","Spain","34"],["GB","United Kingdom","44"],["IN","India","91"],["PK","Pakistan","92"],["US","United States","1"],["CA","Canada","1"],["MX","Mexico","52"],["DE","Germany","49"],["FR","France","33"],["IT","Italy","39"],["NL","Netherlands","31"],["BE","Belgium","32"],["IE","Ireland","353"],["CH","Switzerland","41"],["AT","Austria","43"],["SE","Sweden","46"],["NO","Norway","47"],["DK","Denmark","45"],["FI","Finland","358"],["PL","Poland","48"],["GR","Greece","30"],["TR","Turkey","90"],["RU","Russia","7"],["UA","Ukraine","380"],["BR","Brazil","55"],["AR","Argentina","54"],["CL","Chile","56"],["CO","Colombia","57"],["PE","Peru","51"],["CN","China","86"],["JP","Japan","81"],["KR","South Korea","82"],["TH","Thailand","66"],["MY","Malaysia","60"],["SG","Singapore","65"],["ID","Indonesia","62"],["PH","Philippines","63"],["VN","Vietnam","84"],["LK","Sri Lanka","94"],["NP","Nepal","977"],["MM","Myanmar","95"],["AE","United Arab Emirates","971"],["SA","Saudi Arabia","966"],["QA","Qatar","974"],["EG","Egypt","20"],["NG","Nigeria","234"],["KE","Kenya","254"],["ZA","South Africa","27"],["AU","Australia","61"],["NZ","New Zealand","64"]];
    var byIso = {}, byCode = {};
    COUNTRIES.forEach(function (c) { byIso[c[0]] = c; if (!byCode[c[2]]) byCode[c[2]] = c[0]; });
    function flag(iso) { return String.fromCodePoint.apply(null, iso.split("").map(function (ch) { return 127397 + ch.charCodeAt(0); })); }

    var sel = document.getElementById("ccSelect");
    var box = form.elements["contact_method"];
    var hint = document.getElementById("contactHint");
    var manual = false;
    var region = ((navigator.language || "").split("-")[1] || "").toUpperCase();
    sel.innerHTML = COUNTRIES.slice().sort(function (a, b) { return a[1].localeCompare(b[1]); }).map(function (c) {
        return '<option value="' + c[0] + '">' + flag(c[0]) + " " + c[1] + " (+" + c[2] + ")</option>";
    }).join("");
    sel.value = byIso[region] ? region : "PT";

    function kind(v) {
        v = v.trim();
        if (!v) return "none";
        if (v.indexOf("@") > -1) return "email";
        return /^[+\d(]/.test(v) ? "phone" : "email";
    }
    function parse(raw) {
        raw = raw.trim();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw)) return { email: raw };
        if (!/^[+\d][\d\s().-]*$/.test(raw)) return null;
        var s = raw.replace(/[\s().-]/g, ""), intl = s.charAt(0) === "+" || s.slice(0, 2) === "00";
        var digits = s.replace(/^\+/, "").replace(/^00/, "").replace(/\D/g, "");
        var full = intl ? digits : byIso[sel.value][2] + digits.replace(/^0+/, "");
        return (full.length >= 8 && full.length <= 15) ? { phone: "+" + full, country: intl ? "" : byIso[sel.value][1] } : null;
    }
    function detect(raw) {                     // "+351..." or "00351..." picks the matching country
        var s = raw.trim().replace(/[\s().-]/g, "");
        if (s.charAt(0) !== "+" && s.slice(0, 2) !== "00") return;
        var d = s.replace(/^\+/, "").replace(/^00/, "");
        for (var n = 3; n >= 1; n--) { if (byCode[d.slice(0, n)]) { sel.value = byCode[d.slice(0, n)]; return; } }
    }
    function refresh() {
        var k = kind(box.value);
        if (k === "phone") detect(box.value);   // only acts on +/00 prefixes
        sel.hidden = k !== "phone";
        box.setAttribute("inputmode", k === "phone" ? "tel" : "text");
        var p = parse(box.value);
        box.setCustomValidity(p ? "" : "Please enter a valid email address or phone number.");
        hint.textContent = p && p.phone ? "Will be sent as " + p.phone : "";
    }
    box.addEventListener("input", function () { if (!box.value.trim()) manual = false; refresh(); });
    sel.addEventListener("change", function () { manual = true; refresh(); });
    refresh();

    function say(html, ok) { msg.style.color = ok ? "#1a7f37" : "#b3261e"; msg.style.fontWeight = "500"; msg.innerHTML = html; }
    function mailto(d) {
        return "mailto:" + TO + "?subject=" + encodeURIComponent("Message from your portfolio website") +
            "&body=" + encodeURIComponent((d.message || "") + "\n\n" + (d.name || "") + " (" + (d.email || d.phone || "") + ")");
    }
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = document.getElementById("formButton");
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        if (data._honey) return;                                   // spam trap
        var p = parse(data.contact_method || "");
        if (!p) { refresh(); form.reportValidity(); return; }
        delete data.contact_method; delete data.privacy_consent;
        if (p.email) data.email = p.email; else { data.phone = p.phone; if (p.country) data.country = p.country; }
        var fallback = '<a href="' + mailto(data) + '">Click here to send it from your email app instead</a>.';
        if (location.protocol === "file:") {
            say("Sending only works on the published website (https), not from a file opened on your computer. " + fallback, false);
            return;
        }
        btn.disabled = true; btn.textContent = "Sending...";
        var w3 = !!WEB3FORMS_KEY;
        var url = w3 ? "https://api.web3forms.com/submit" : "https://formsubmit.co/ajax/" + TO;
        var payload = w3 ? { access_key: WEB3FORMS_KEY, name: data.name, email: data.email, phone: data.phone, message: data.message, subject: data._subject } : data;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(payload)
        }).then(function (r) {
            return r.text().then(function (t) { var j = {}; try { j = JSON.parse(t); } catch (x) {} return j; });
        }).then(function (j) {
            if (j.success === true || j.success === "true") { say("Thank you! Your message has been sent.", true); form.reset(); manual = false; refresh(); }
            else { throw new Error(j.message || "the mail service did not accept the message"); }
        }).catch(function (err) {
            console.error("Contact form:", err);
            var why = String((err && err.message) || err).replace(/[<>&"]/g, "").slice(0, 200);
            say("Sorry, the message could not be sent automatically. " + fallback + '<br><small style="opacity:.75">Technical detail: ' + why + "</small>", false);
        }).finally(function () { btn.disabled = false; btn.textContent = "Send Message"; });
    });
})();

/* ---- 3. Right-edge scroll tracker (cached positions + one update per frame) ---- */
(function () {
    var box = document.getElementById("scrollTracker");
    if (!box) return;
    var track = box.querySelector(".st-track"), pct = box.querySelector(".st-pct"), list = box.querySelector(".st-list");
    var root = document.documentElement;
    var SECTIONS = [["home","Home"],["about","About"],["education","Education"],["research","Research"],["experience","Experience"],["project","Projects"],["skills","Skills"],["training","Training"],["awards","Awards"],["ielts-score","Languages"],["contact","Contact"]];
    var items = [], maxS = 1, ticking = false;
    SECTIONS.forEach(function (s) {
        var el = document.getElementById(s[0]); if (!el) return;
        var li = document.createElement("li"), b = document.createElement("button");
        b.type = "button"; b.textContent = s[1];
        b.addEventListener("click", function () { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" }); });
        li.appendChild(b); list.appendChild(li); items.push({ el: el, li: li, top: 0 });
    });
    function measure() {
        maxS = Math.max(1, root.scrollHeight - window.innerHeight);
        var H = list.clientHeight || box.clientHeight, gap = 26, n = items.length, ys = [], i;
        for (i = 0; i < n; i++) {
            items[i].top = items[i].el.getBoundingClientRect().top + window.scrollY;
            var y = items[i].top / maxS * H;
            ys.push(Math.max(12, i ? Math.max(y, ys[i - 1] + gap) : y));
        }
        for (i = n - 1; i >= 0; i--) { ys[i] = Math.min(ys[i], i === n - 1 ? H - 12 : ys[i + 1] - gap); }
        items.forEach(function (it, k) { it.li.style.top = Math.max(12, ys[k]) + "px"; });
    }
    var activeIdx = -1;
    function update() {
        ticking = false;
        var y = window.scrollY, p = Math.min(1, Math.max(0, y / maxS));
        box.style.setProperty("--p", (p * 100) + "%");
        pct.textContent = Math.round(p * 100) + "%";
        var cur = 0, probe = y + window.innerHeight * 0.35;
        for (var i = 0; i < items.length; i++) { if (items[i].top <= probe) cur = i; }
        if (cur !== activeIdx) { items.forEach(function (it, k) { it.li.classList.toggle("active", k === cur); }); activeIdx = cur; }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { measure(); update(); });
    window.addEventListener("load", function () { measure(); update(); setTimeout(function () { measure(); update(); }, 1500); });
    box.addEventListener("mouseenter", function () { measure(); });
    measure(); update();
    function jump(clientY, instant) {
        var r = track.getBoundingClientRect();
        var p = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
        window.scrollTo({ top: p * maxS, behavior: instant ? "instant" : "smooth" });
    }
    var dragging = false;
    track.addEventListener("pointerdown", function (e) { dragging = true; box.classList.add("dragging"); track.setPointerCapture(e.pointerId); jump(e.clientY, true); e.preventDefault(); });
    track.addEventListener("pointermove", function (e) { if (dragging) jump(e.clientY, true); });
    function stop() { dragging = false; box.classList.remove("dragging"); }
    track.addEventListener("pointerup", stop);
    track.addEventListener("pointercancel", stop);
    box.querySelector(".st-top").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    box.querySelector(".st-bottom").addEventListener("click", function () { window.scrollTo({ top: maxS, behavior: "smooth" }); });
})();

/* ---- 4. Hover tilt + zoom on cards, publications and boxes ---- */
(function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    document.querySelectorAll(".publication, .score-details, .trf-preview, .skill-group, .about-photo, .edu-card, .exp-card, .ielts-overall, .ielts-bands > div").forEach(function (el) {
        el.classList.add("tilt");
        el.addEventListener("mousemove", function (e) {
            var r = el.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
            el.style.setProperty("--ry", (x * 5) + "deg");
            el.style.setProperty("--rx", (-y * 5) + "deg");
        });
        el.addEventListener("mouseleave", function () { el.style.setProperty("--ry", "0deg"); el.style.setProperty("--rx", "0deg"); });
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
        { m: /^meh-ha\.github\.io\/p\/?$/, icon: "fas fa-user-circle", c: "#08283F", t: "Mehedi Hasan's Portfolio", d: "My personal portfolio website." },
        { m: /aanbangladesh\.org/, icon: "fas fa-tint", c: "#08283F", t: "Asia Arsenic Network Bangladesh", d: "Arsenic mitigation and public health work in Bangladesh." },
        { m: /rsc-bd\.org/, icon: "fas fa-industry", c: "#08283F", t: "RMG Sustainability Council", d: "Remediation programme for factory safety in Bangladesh." },
        { m: /oxfam\.org/, icon: "fas fa-hands-helping", c: "#e4002b", t: "Oxfam in Bangladesh", d: "Climate justice and natural resource rights portfolio." },
        { m: /ceccr\.gov\.bd|ceccr\.com/, icon: "fas fa-flask", c: "#08283F", t: "CECCR", d: "Centre for Environment and Climate Change Research." },
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
                if (!shot.dataset.fb) { shot.dataset.fb = "1"; shot.src = "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(i.url) + "?w=840&h=460"; }
            };
            shot.src = "https://image.thum.io/get/width/840/crop/460/" + i.url;
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

/* ---- 6. Cover photos: load the rest after the page is ready, pause when off screen; hide the scroll hint ---- */
(function () {
    var covers = document.querySelector(".cover-slides"), home = document.getElementById("home"), hint = document.querySelector(".scroll-hint");
    if (covers) {
        window.addEventListener("load", function () {
            var slides = [].slice.call(covers.querySelectorAll(".cover-slide[data-bg]")), i = 0;
            (function next() {
                if (i >= slides.length) return;
                var s = slides[i++], im = new Image();
                im.onload = im.onerror = function () { s.style.backgroundImage = 'url("' + s.getAttribute("data-bg") + '")'; setTimeout(next, 500); };
                im.src = s.getAttribute("data-bg");
            })();
        });
        if ("IntersectionObserver" in window && home) {
            new IntersectionObserver(function (en) {
                var vis = en[0].isIntersecting;
                covers.style.visibility = vis ? "visible" : "hidden";
                covers.classList.toggle("paused", !vis);
            }, { threshold: 0 }).observe(home);
        }
    }
    if (hint) {
        var t = false;
        window.addEventListener("scroll", function () {
            if (t) return; t = true;
            requestAnimationFrame(function () { t = false; hint.classList.toggle("hide", window.scrollY > 60); });
        }, { passive: true });
    }
})();

/* ---- 7. Top bar: glass bar + smaller texts once you start scrolling (works without jQuery too) ---- */
(function () {
    var nav = document.querySelector(".navbar"); if (!nav) return;
    var t = false;
    function chk() { t = false; nav.classList.toggle("sticky", window.scrollY > 20); }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(chk); } }, { passive: true });
    chk();
})();

/* ---- 8. Touch screens: tap a card to show its details (hover is not available) ---- */
(function () {
    if (window.matchMedia("(hover: hover)").matches) return;
    var all = [].slice.call(document.querySelectorAll(".edu-card, .exp-card, .publication[tabindex]"));
    all.forEach(function (el) {
        el.addEventListener("click", function (e) {
            if (e.target.closest("a")) return;
            var was = el.classList.contains("open");
            all.forEach(function (o) { o.classList.remove("open"); });
            if (!was) el.classList.add("open");
        });
    });
})();

/* ---- 9. Timelines: equal-size cards and a zig-zag offset that fits the card height ---- */
(function () {
    var timer;
    function run() {
        document.querySelectorAll(".timeline").forEach(function (tl) {
            var cards = [].slice.call(tl.querySelectorAll(".edu-card, .exp-card")), m = 0;
            cards.forEach(function (c) { c.style.minHeight = ""; });
            if (window.innerWidth <= 768) { tl.style.setProperty("--tl-off", "0px"); return; }   // phones: natural card heights
            cards.forEach(function (c) { m = Math.max(m, c.offsetHeight); });
            cards.forEach(function (c) { c.style.minHeight = m + "px"; });
            var pill = tl.querySelector(".tl-date"), ph = pill ? pill.offsetHeight + 10 : 40;
            tl.style.setProperty("--tl-off", Math.round((m + ph + 30) / 2) + "px");
        });
    }
    function later() { clearTimeout(timer); timer = setTimeout(run, 120); }
    window.addEventListener("load", run);
    window.addEventListener("resize", later);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    run();
})();
