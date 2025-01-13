import { v4 as uuidv4 } from "uuid"
import {backendBaseUrl} from "../environment.ts"

export const sessionId = uuidv4()
export const sessionHeaders = {
    "Session-ID": sessionId,
}

function track(path: "hello" | "page", event: object): void {
    const headers = new Headers(sessionHeaders)
    fetch(`${backendBaseUrl}/api/${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify(event),
    })
}

export function trackHello(): void {
    track("hello", getClientInfo())
}

export function trackPage(path: string): void {
    track("page", {
        path: path,
    })
}

const getClientInfo = () => ({
    ...getOs(),
    ...getBrowser(),
    ...getReferrer(),
    "$screen_height": window.screen.height,
    "$screen_width": window.screen.width,
    "$screen_dpi": window.devicePixelRatio,
})

function getOs(): { "$os": string, "$os_version": string } {
    const userAgent = navigator.userAgent;

    let os = "Unknown";
    let osVersion = "Unknown";

    if (/iPhone OS/.test(userAgent) || /iPad/.test(userAgent)) {
        os = /iPad/.test(userAgent) ? "iPadOS" : "iOS";
        const versionMatch = userAgent.match(/OS ([\d_]+)/);
        osVersion = versionMatch ? versionMatch[1].replace(/_/g, ".") : "Unknown";
    } else if (/Mac OS X/.test(userAgent)) {
        os = "macOS";
        const versionMatch = userAgent.match(/Mac OS X ([\d_]+)/);
        osVersion = versionMatch ? versionMatch[1].replace(/_/g, ".") : "Unknown";
    } else if (/Windows NT/.test(userAgent)) {
        os = "Windows";
        const ntVersionMatch = userAgent.match(/Windows NT ([\d.]+)/);
        if (ntVersionMatch) {
            const ntVersion = ntVersionMatch[1];
            const versionMap: { [key: string]: string } = {
                "10.0": "10",
                "6.3": "8.1",
                "6.2": "8",
                "6.1": "7",
                "6.0": "Vista",
                "5.1": "XP",
                "5.0": "2000",
            };
            osVersion = versionMap[ntVersion] || `NT ${ntVersion}`;
        }
    } else if (/Android/.test(userAgent)) {
        os = "Android";
        const versionMatch = userAgent.match(/Android ([\d.]+)/);
        osVersion = versionMatch ? versionMatch[1] : "Unknown";
    } else if (/Linux/.test(userAgent)) {
        os = "Linux";
        const versionMatch = userAgent.match(/Linux ([\w\d._-]+)/);
        osVersion = versionMatch ? versionMatch[1] : "Unknown";
    }

    return { "$os": os, "$os_version": osVersion };
}

function getBrowser(): { "$browser": string, "$browser_version": string } {
    const userAgent = navigator.userAgent;

    let browser = "Unknown";
    let browserVersion = "Unknown";

    if (/Edg\//.test(userAgent)) {
        browser = "Microsoft Edge";
        const versionMatch = userAgent.match(/Edg\/([\d.]+)/);
        browserVersion = versionMatch ? versionMatch[1] : "Unknown";
    } else if (/Chrome\//.test(userAgent) && !/Edg\//.test(userAgent) && !/OPR\//.test(userAgent)) {
        browser = "Google Chrome";
        const versionMatch = userAgent.match(/Chrome\/([\d.]+)/);
        browserVersion = versionMatch ? versionMatch[1] : "Unknown";
    } else if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) {
        browser = "Safari";
        const versionMatch = userAgent.match(/Version\/([\d.]+)/);
        browserVersion = versionMatch ? versionMatch[1] : "Unknown";
    } else if (/Firefox\//.test(userAgent)) {
        browser = "Mozilla Firefox";
        const versionMatch = userAgent.match(/Firefox\/([\d.]+)/);
        browserVersion = versionMatch ? versionMatch[1] : "Unknown";
    } else if (/OPR\//.test(userAgent)) {
        browser = "Opera";
        const versionMatch = userAgent.match(/OPR\/([\d.]+)/);
        browserVersion = versionMatch ? versionMatch[1] : "Unknown";
    } else if (/MSIE/.test(userAgent) || /Trident/.test(userAgent)) {
        browser = "Internet Explorer";
        const versionMatch = userAgent.match(/(?:MSIE |rv:)([\d.]+)/);
        browserVersion = versionMatch ? versionMatch[1] : "Unknown";
    }

    return { "$browser": browser, "$browser_version": browserVersion };
}

function getReferrer(): {"$initial_referrer": string, "$initial_referring_domain": string} {
    const referrer = document.referrer
    const getReferringDomain = () => {
        try {
            return new URL(document.referrer).hostname
        } catch {
            return "unknown"
        }
    }
    return {
        "$initial_referrer": referrer ?? "unknown",
        "$initial_referring_domain": getReferringDomain(),
    }
}