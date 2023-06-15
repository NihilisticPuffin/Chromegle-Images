const ImageManager = {

    initialize: () => {
        ImageManager._chatStarted();
    },

    _chatStarted() {
        document.addEventListener("chatStarted", () => {
            ImageManager.statusObserver.disconnect();
            ImageManager.statusObserver.observe(
                document.getElementsByClassName("logbox")[0], {attributes: true, subtree: true, childList: true}
            );
        });
    },


    statusObserver: new MutationObserver((mutationRecord) => {
        mutationRecord.forEach((mutation) => {

            let maybeLog = $(mutation.addedNodes.item(0)).get(0);
            if (maybeLog == null) return;
            if (maybeLog.nodeName !== "DIV" || !maybeLog.classList.contains("logitem")) return;

            for (let span of maybeLog.getElementsByTagName("span")) {
                span.innerHTML = ImageManager.filterString(span.textContent);
            }

        })

    }),

    filterString(message) {
        //TODO: Get allowed domains from whitelist.txt
        return message.replace(/https?:\/\/i\.imgur\.com\/[a-zA-Z0-9]*\.(png|jpg|jpeg|gif|webp)/g, "<br /><a href='$&' target='_blank'><img src='$&' width='25%' height='25%' /></a><br />");
    }

}






