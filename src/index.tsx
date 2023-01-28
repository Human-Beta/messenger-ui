import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import App from './App';
import { AxiosInterceptor } from './AxiosInterceptor';
import './index.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </BrowserRouter>
    </Provider>,
  );
}
