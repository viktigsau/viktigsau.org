function fixAds() {
    document.querySelectorAll('.ad-container').forEach(ad => {
        if (ad.parentNode.classList.contains("ad-wrapper")) return;
        let wrapper = document.createElement("div");
        wrapper.classList.add("ad-wrapper");
        ad.parentNode.insertBefore(wrapper, ad);
        wrapper.appendChild(ad);

        wrapper.addEventListener("click", () => {
            let adIframe = wrapper.querySelector("iframe");
            adIframe.contentWindow.postMessage("fakeClick", "*");
            reloadAd(ad)
        });
    });

    if (window.visualViewport.width < 468) {
        document.querySelectorAll('.ad-computer').forEach(ad => ad.style.display = 'none');
        document.querySelectorAll('.ad-mobile').forEach(ad => ad.style.display = 'block');
    } else {
        document.querySelectorAll('.ad-computer').forEach(ad => ad.style.display = 'block');
        document.querySelectorAll('.ad-mobile').forEach(ad => ad.style.display = 'none');
    }
}

function reloadAds() {
    console.log("Reloading all ads...");
    document.querySelectorAll('.ad-container').forEach(ad => reloadAd(ad));
}

function reloadAd(ad) {
    if (ad instanceof HTMLIFrameElement) {
        console.log("Reloading ad:", ad.src);
        ad.src = ad.src;
    } else {
        console.warn("Ad is not an iframe, cannot reload.");
    }
}

function loadADs(loc) {
    if (!loc) loc = "ad.html";
    
    document.querySelectorAll(".ad").forEach(adDiv => {
        const adHTML = `
            <iframe src="${loc}?type=pc" class="ad-computer ad-container" width="468px" height="60px" frameborder="0"></iframe>
            <iframe src="${loc}?type=mobile" class="ad-mobile ad-container" width="320px" height="50px" frameborder="0"></iframe>
        `;
        adDiv.outerHTML = adHTML;
    });
}

function addAD(parent, loc) {
    const adMobile = document.createElement("iframe");
    const adComputer = document.createElement("iframe");

    adComputer.src = "/ad.html?type=pc";
    if (loc) adComputer.src = `${loc}?type=pc`;
    adComputer.className = "ad-computer ad-container";
    adComputer.width = "468px";
    adComputer.height = "60px"
    adComputer.style = "display: block;"

    adMobile.src = "/ad.html?type=mobile";
    if (loc) adMobile.src = `${loc}?type=mobile`;
    adMobile.className = "ad-mobile ad-container";
    adMobile.width = "320px";
    adMobile.height = "50px"
    adMobile.style = "display: none;"

    parent.appendChild(adComputer);
    parent.appendChild(adMobile);

    fixAds();
}

document.addEventListener("DOMContentLoaded", () => {
    fixAds();
});

window.visualViewport.addEventListener("resize", fixAds);

const date = new Date().getDate();

setInterval(reloadAds, 15000);
