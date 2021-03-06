import { ComponentChildren, render } from "preact";
import { useMemo, useRef } from "preact/hooks";
import version from "../version.json";

export function clsx(...classes: (string | null | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function compact<T>(array: (T | false | null | undefined | 0)[]) {
  return array.filter(Boolean) as T[];
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait = 200
) {
  let timer: number;

  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = window.setTimeout(() => func(...args), wait);
  };
}

export function rgbToHex(r: number, g: number, b: number) {
  //eslint-disable-next-line
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function renderModal(
  renderer: (unmount: () => void) => ComponentChildren
) {
  const modal = document.createElement("div");
  document.body.appendChild(modal);

  function unmount() {
    render(null, modal);
    modal.remove();
  }

  render(renderer(unmount), modal);
}

export function saveValue(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadValue<T>(key: string): T | undefined {
  try {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  } catch (_) {
    return undefined;
  }
}

export function autoUpdater() {
  if (process.env.NODE_ENV === "development") {
    return;
  }

  console.log("Looking for a new version...");
  fetch(`./latest.json?c=${Date.now()}`)
    .then((res) => res.json())
    .catch(() => undefined)
    .then((latest) => {
      if (latest && latest !== version) {
        console.log("Loading the new version...");
        const url = new URL(window.location.href);
        url.searchParams.set("version", latest);
        window.location.assign(url.toString());
      }
    });
}

export function loadCordovaJS() {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://localhost/cordova.js";

    script.onload = () => {
      document.addEventListener("deviceready", onDeviceReady, false);

      function onDeviceReady() {
        document.body.classList.add("cordova");
        //@ts-expect-error no typings for cordova
        NavigationBar.show();
        //@ts-expect-error no typings for cordova
        NavigationBar.backgroundColorByHexString("#24324b");
        resolve(true);
      }
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T
) {
  const callbackRef = useRef(callback);

  return useMemo(() => {
    return debounce((...args) => {
      callbackRef.current(...args);
    });
  }, []) as T;
}

export const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  //@ts-expect-error Bad browser typings
  navigator.msMaxTouchPoints > 0;

export function formatNumericValue(value: string | number, suffix: string) {
  const formatted = (Math.round(Number(value) * 10) / 10).toFixed(1);
  return `${formatted}${suffix}`;
}

export type RGB = [number, number, number];

export function getContrastColor(color: RGB) {
  // https://stackoverflow.com/a/3943023/112731
  return color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114 > 186
    ? "#000000"
    : "#FFFFFF";
}
