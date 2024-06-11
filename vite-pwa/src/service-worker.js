/* eslint-disable no-undef */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./src/service-worker", { scope: "/" });
  });
}

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.title;
  const body = data.body;

  const notificationOptions = {
    body: body,
    tag: String(new Date().getTime()),
    icon: "https://res.cloudinary.com/dw6wav4jg/image/upload/v1717917998/Vitejs-logo_nobmjz.svg",
    data: {
      url: "https://reetesh.in",
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, notificationOptions)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const urlToOpen = new URL(
          event.notification.data.url,
          self.location.origin
        ).href;

        const client = clientList.find(
          (client) => client.url === urlToOpen && "focus" in client
        );

        if (client) {
          return client.focus();
        }

        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
