self.addEventListener("push", function(event) {
    const message = event.data.json();
    const options = {
        actions: [
            {
                action: "update",
                title: "See latest updates",
            },
        ],
        badge: "/android-chrome-192x192.png",
        body: message.text,
        icon: "/android-chrome-192x192.png",
        image: "/img_preview.png",
        tag: message.snsId,
    };

    self.registration.showNotification(message.title, options);
});

self.addEventListener("notificationclick", function(event) {
    event.notification.close();
    // eslint-disable-next-line no-undef
    const promiseChain = clients.openWindow("/");
    event.waitUntil(promiseChain);
});

self.addEventListener("pushsubscriptionchange", event => {
    // eslint-disable-next-line no-undef
    event.waitUntil(swRegistration.pushManager.subscribe(event.oldSubscription.options)
        .then(subscription => {
            return fetch("/prod/notifications/subscribe", {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    webPush: subscription.endpoint,
                }),
            });
        }),
    );
}, false);