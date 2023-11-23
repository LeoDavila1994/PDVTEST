import { BrowserRouter } from 'react-router-dom';
import Routing from './components/Routing';
import { MenuProvider } from './hooks/useMenu';
import './scss/app.scss';

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <MenuProvider>
        <Routing />
      </MenuProvider>
    </BrowserRouter>
  );
};

export default App;
