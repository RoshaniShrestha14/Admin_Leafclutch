import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = hash.replace("#", "");
    const element = document.querySelector(`[data-scroll="${id}"]`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;