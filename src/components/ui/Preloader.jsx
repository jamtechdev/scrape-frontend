"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsVisible(true);
    if (document.body) {
      document.body.classList.add("preloader-active");
    }

    const handleLoad = () => {
      const preloaderElement = document.getElementById("preloader");
      if (preloaderElement) {
        setTimeout(() => {
          preloaderElement.classList.add("hide");
          setIsVisible(false);

          setTimeout(() => {
            if (document.body) {
              document.body.classList.remove("preloader-active");
            }
          }, 500);
        }, 500);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsVisible(true);
    if (document.body) {
      document.body.classList.add("preloader-active");
    }

    const preloaderElement = document.getElementById("preloader");
    if (preloaderElement) {
      preloaderElement.classList.remove("hide");
    }

    const timer = setTimeout(() => {
      const preloaderElement = document.getElementById("preloader");
      if (preloaderElement) {
        preloaderElement.classList.add("hide");
        setIsVisible(false);

        setTimeout(() => {
          if (document.body) {
            document.body.classList.remove("preloader-active");
          }
        }, 500);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div id="preloader" className={isVisible ? "" : "hide"}>
      <div className="preloader">
        <div className="loader">
          <div></div>
        </div>
        <div className="waviy">
          <span className="d-inline-block">A</span>
          <span className="d-inline-block">D</span>
          <span className="d-inline-block">T</span>
          <span className="d-inline-block">R</span>
          <span className="d-inline-block">O</span>
          <span className="d-inline-block">V</span>
          <span className="d-inline-block">A</span>
        </div>
      </div>
    </div>
  );
}
