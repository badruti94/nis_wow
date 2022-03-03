import wow from './wow.png'
import myImg from './my-img.jpg'
import './sidebar.css'
import { Col } from 'reactstrap'

const Sidebar = () => {

    return (
        <Col className='col-md-2'>
            <div className='text-center' >
                <div>
                    <img className='logo' src={wow} alt="" />
                </div>
                <div>
                    <img className='profile-image' src={myImg} alt="" />
                </div>
                <p className='text-dark fw-bold mt-3'>Egi Ganteng</p>
                <p className='text-danger fw-bold'>Not Subcribed Yet</p>
            </div>

            <hr />

            <ul className='text-secondary menu' >
                <li> <i class="fa-solid fa-user"></i> Profile</li>
                <li><i class="fa-solid fa-file-invoice-dollar"></i> Subcribe</li>
                <li><hr /></li>
                <li><i class="fa-solid fa-right-from-bracket"></i> Logout</li>
            </ul>
        </Col>
    )
}

export default Sidebar