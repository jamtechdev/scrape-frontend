"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentPage = pathname;
    const lastPreloaderPage = sessionStorage.getItem("lastPreloaderPage");

    if (lastPreloaderPage !== currentPage) {
      setIsVisible(true);
      if (document.body) {
        document.body.classList.add("preloader-active");
      }
      sessionStorage.setItem("lastPreloaderPage", currentPage);
    } else {
      const preloaderElement = document.getElementById("preloader");
      if (preloaderElement) {
        preloaderElement.style.display = "none";
      }
      if (document.body) {
        document.body.classList.remove("preloader-active");
      }
    }

    const handleLoad = () => {
      if (!isVisible) return;

      const preloaderElement = document.getElementById("preloader");
      setTimeout(() => {
        if (preloaderElement) {
          preloaderElement.classList.add("hide");

          setTimeout(() => {
            if (preloaderElement) {
              preloaderElement.style.display = "none";
            }
            if (document.body) {
              document.body.classList.remove("preloader-active");
            }

            window.dispatchEvent(new CustomEvent("preloaderHidden"));
          }, 500);
        } else {
          if (document.body) {
            document.body.classList.remove("preloader-active");
          }
        }
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [pathname, isVisible]);

  if (!isVisible) return null;

  return (
    <div id="preloader">
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
