import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import './App.scss'
import Navbar from '../shared/ui/Navbar/Navbar';
import PageHome from '../pages/PageHome/PageHome';

function App() {

  return (
    <Theme preset={presetGpnDefault}>
      <Navbar />
      <PageHome />
    </Theme>
  )
}

export default App
