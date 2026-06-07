import ReactGA from "react-ga4";

export const initGA = () => {
    ReactGA.initialize("G-62VM7YNX8L");
};

export const trackPageView = () => {
    ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
    });
};