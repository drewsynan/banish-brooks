function banishBrooks () {
    function killNavLinks () {
        // remove mini-nav links and sidebar links
        document.querySelectorAll("a[href='https://www.nytimes.com/section/opinion']").forEach(function(e){ e.remove() })

        // remove main opinion secion
        document.querySelectorAll("section.opinion").forEach(function(e){ e.remove() })

        // remove from bottom nav
        document.querySelectorAll("div .menu-heading").forEach(function(e){
            if (e.textContent.toLowerCase().includes('opinion')) {
                e.parentElement.remove()
            }
        })
    }

    function killFeatureSections () {
        // remove opinion options from the bottom "well" sections

         document.querySelectorAll("div section h2 a[href='https://www.nytimes.com/pages/opinion/index.html'").forEach(function(e){
            e.parentElement.parentElement.parentElement.remove()
         })

        document.querySelectorAll("li section h2 a[href='https://www.nytimes.com/pages/opinion/index.html'").forEach(function(e){
            e.parentElement.parentElement.parentElement.remove()
        })
    }

    function colorRemainingLinks () {
        document.querySelectorAll("a[href]").forEach(function(link){
            var linkColor = "#eee";

            function setColor(el, color) {
                var preamble = el.getAttribute("style") ? el.getAttribute("style") + "; " : "";
                el.setAttribute("style", preamble + "color: " + color + " !important");
            }

            function colorAll(el, linkColor) {
                if(el.nodeType === Node.ELEMENT_NODE) {
                    setColor(el, linkColor);
                    if(el.childNodes) {
                        el.childNodes.forEach(function(e) {
                            colorAll(e, linkColor)
                        })
                    }
                }
            }

            if (link.href.match("https?://www.nytimes.com/.*/opinion/.*")) {
                var parent = link.parentNode;
                if (parent.nodeName === "LI") { // recommended for you lists
                    parent.remove();
                } else {
                    colorAll(link, linkColor);
                }
            }
        })
    }

    killNavLinks()
    killFeatureSections()
    colorRemainingLinks()
}
if (window.location.href.match('https?://www.nytimes.com/.*/opinion/.*') || 
    window.location.href.match('https?://www.nytimes.com/section/opinion') ||
    window.location.href.match('https?://www.nytimes.com/column/*')) {
    var root_site = window.location.href.match('https?://www.nytimes.com/')[0];
    // window.location.href = root_site;
    window.location.replace(root_site);
}
document.addEventListener("DOMContentLoaded", function(e){
    banishBrooks();
});
window.setInterval(banishBrooks, 750);