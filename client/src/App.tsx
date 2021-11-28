import { FC } from 'react';
import { useRoutes } from "react-router-dom";
import { routes } from './routes/routes';

const App: FC = () => {

  const elements = useRoutes(routes);
  return ( elements );

}

export default App;
