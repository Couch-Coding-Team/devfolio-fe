import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (history.action === "POP") {
      window.scrollTo(0, sessionStorage.getItem("scrollTo"));
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
