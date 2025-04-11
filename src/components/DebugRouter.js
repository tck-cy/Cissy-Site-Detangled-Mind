import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const DebugRouter = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  return null;
};

// Then add to App.js:
<BrowserRouter>
  <DebugRouter />
  {/* ... rest of your app ... */}
</BrowserRouter>;
