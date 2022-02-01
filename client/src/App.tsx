import { FC } from 'react';
import { useLocation, useRoutes } from "react-router-dom";
import { routes } from './routes/routes';

const App: FC = () => {
  const location = useLocation();
  const elements = useRoutes(routes, location);
  return ( elements );
}

export default App;
