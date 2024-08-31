let inFrame;

try {
    inFrame = window !== top;
} catch (e) {
    inFrame = true;
}
if (!localStorage.getItem("ab")) localStorage.setItem("ab", true);
if (
    !inFrame &&
    !navigator.userAgent.includes("Firefox") &&
    localStorage.getItem("ab") === "true"
) {
    const popup = open("about:blank", "_blank");
    if (!popup || popup.closed) {
        alert(
            "Please allow popups for this site. Doing so will allow us to open the site in a about:blank tab and preventing this site from showing up in your history. You can turn this off in the site settings.\n\nBy using Interstellar services, you confirm you have read and agreed to the terms listed in our Terms of Service and Privacy Policy, which can be found on the bottom of the settings page."
        );
    } else {
        const doc = popup.document;
        const iframe = doc.createElement("iframe");
        const style = iframe.style;
        const link = doc.createElement("link");

        const name = localStorage.getItem("name") || "My Drive - Google Drive";
        const icon =
            localStorage.getItem("icon") ||
            "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

        doc.title = name;
        link.rel = "icon";
        link.href = icon;

        iframe.src = location.href;
        style.position = "fixed";
        style.top = style.bottom = style.left = style.right = 0;
        style.border = style.outline = "none";
        style.width = style.height = "100%";

        doc.head.appendChild(link);
        doc.body.appendChild(iframe);

        const pLink = localStorage.getItem(encodeURI("pLink")) || getRandomUrl();
        location.replace(pLink);

        const script = doc.createElement("script");
        script.textContent = `
      window.onbeforeunload = function (event) {
        const confirmationMessage = 'Leave Site?';
        (event || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      };
    `;
        doc.head.appendChild(script);
    }
}