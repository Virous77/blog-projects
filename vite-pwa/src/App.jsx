import { useEffect } from "react";

const url = import.meta.env.DEV
  ? "./src/service-worker.js"
  : "./service-worker.js";

const App = () => {
  // app/page.js -> Next.js
  // src/index.js -> React

  // We modified the useEffect hook to subscribe to push notification

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const handleServiceWorker = async () => {
        const register = await navigator.serviceWorker.register(url);
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            "BGVEG7NlwRDeS0QOO6BUeioKKOF1Ay7zxop0vKZzXr6w1Osa6osDanK8aWTuJKu2mXbDj59yod3z7uXoQPXdrXM",
        });

        const data = await fetch("http://localhost:4000/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "content-type": "application/json",
          },
        });

        const res = await data.json();
        console.log(res);
      };
      handleServiceWorker();
    }
  }, []);
  return <div>App</div>;
};

export default App;
