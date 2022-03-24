import Router from './routes';
import { ContextWrapper } from './user-context';
import './App.css';

function App() {
  return (
    <ContextWrapper>
      <div className="content">
        <Router />
      </div>
    </ContextWrapper>
  );
}

export default App;
