import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { BannerHeader } from './BannerHeader';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/ppts");
  }, [location.pathname, navigate])

  return (
    // TODO: Not trying to worry about devices below 600px screen width for now.
    <div className="min-w-[600px]">
      <BannerHeader />
      <div className="p-8 bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
