
import './PageHome.scss'
import { columnsFromAbit } from '../../entities/models/ServicesTest'
import { DropAndDrag } from '../../features/ui/DropAndDrag/DropAndDrag'

const PageHome = () => {

    return (
        <DropAndDrag data={columnsFromAbit}  />
    )
}

export default PageHome
