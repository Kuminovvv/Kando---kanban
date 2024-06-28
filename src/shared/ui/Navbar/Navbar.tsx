
import { ModalAddTask } from '../ModalAddTask/ModalAddTask'
import './Navbar.scss'


const Navbar = () => {
   
    return (
        <div className='navbar'>
            <h1>КанДО</h1>
            <ModalAddTask />
        </div>
    )
}

export default Navbar