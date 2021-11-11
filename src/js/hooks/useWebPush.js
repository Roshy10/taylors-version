import axios from "axios";
import config from "config";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {showSnackbar} from "../actions/NotificationActions";

function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const useWebPush = () => {
    const dispatch = useDispatch();
    const canUsePush = "serviceWorker" in navigator && "PushManager" in window;
    const [isSubscribed, setIsSubscribed] = useState(false);
    if (!canUsePush) {
        console.warn("Web Push is not supported by this browser");
        return {};
    }

    navigator.serviceWorker.ready
        .then((reg) => reg.pushManager.getSubscription())
        .then(console.debug);

    navigator.serviceWorker.ready
        .then((reg) => reg.pushManager.getSubscription())
        .then((subscription) => setIsSubscribed(Boolean(subscription)))
        .catch(() => setIsSubscribed(false));

    const unsubscribe = () => navigator.serviceWorker.ready
        .then((reg) => reg.pushManager.getSubscription())
        .then((subscription) => {
            const webPush = JSON.stringify(subscription);
            subscription.unsubscribe();
            return axios.delete(
                "/prod/notifications/subscribe",
                {data: {webPush}},
            ).then(() => {
                dispatch(showSnackbar("success", "pushNotifications.snackbar.unsubscribe.success"));
            });
        }).catch((error) => {
            console.error(error);
            dispatch(showSnackbar("error", "pushNotifications.snackbar.unsubscribe.error"));
        });

    const subscribe = () => navigator.serviceWorker.ready
        .then((reg) => reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(config.vapidKey),
        })).then((subscription) => {
            axios.post(
                "/prod/notifications/subscribe",
                {webPush: JSON.stringify(subscription)},
            ).then(() => {
                dispatch(showSnackbar("success", "pushNotifications.snackbar.subscribe.success"));
            }).catch((error) => {
                console.error(error);
                dispatch(showSnackbar("error", "pushNotifications.snackbar.subscribe.error"));
                // remove the subscription from the browser if the subscribe failed
                subscription.unsubscribe();
            });
        });

    return {canUsePush, isSubscribed, subscribe, unsubscribe};
};

export default useWebPush;