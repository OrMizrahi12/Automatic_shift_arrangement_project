
import { useSelector } from 'react-redux';
import './App.css';
import Main from './comps/Main';
import WellcomePaga from './comps/wellcomePaga';

function App() {

  const CanStartThePeoses = useSelector(state => state.getClick.getClick)

  return (
    <div className="container">
     {
      CanStartThePeoses ?  <Main /> : <WellcomePaga />
     }
    </div>
  );
}

export default App;
