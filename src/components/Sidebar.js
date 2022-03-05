import wow from './wow.png'
import myImg from './my-img.jpg'
import './sidebar.css'
import { Col } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

const Menu = () => {
    return (
        <>
            <li> <Link className='text-secondary text-decoration-none' to={'/profile'}><i class="fa-solid fa-user"></i> Profile</Link> </li>
            <li> <Link className='text-secondary text-decoration-none' to={'/subcribe'} ><i class="fa-solid fa-file-invoice-dollar"></i> Subcribe</Link> </li>
        </>
    )
}
const AdminMenu = () => {
    return (
        <>
            <li> <Link className='text-secondary text-decoration-none' to={'/transaction'}><i class="fa-solid fa-file-invoice-dollar"></i> Transaction</Link> </li>
            <li> <Link className='text-secondary text-decoration-none' to={'/add-book'}><i class="fa-solid fa-book"></i> Add Book</Link> </li>
        </>
    )
}

const Sidebar = () => {
    const navigate = useNavigate()
    const isAdmin = JSON.parse(localStorage.getItem('is_admin'))
    const isSubcribe = JSON.parse(localStorage.getItem('is_subcribe'))

    const handleLogout = e => {
        localStorage.clear()
        navigate('/')
    }



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
                {
                    isSubcribe ? (<p className='text-success fw-bold'>Subcribed</p>) : <p className='text-danger fw-bold'>Not Subcribed Yet</p>
                }

            </div>

            <hr />

            <ul className='menu' >
                <li> <Link className='text-secondary text-decoration-none' to={'/home'}><i class="fa-solid fa-home"></i> Home</Link> </li>
                {isAdmin ? <AdminMenu /> : <Menu />}
                <li><hr /></li>
                <li style={{ cursor: 'pointer' }} className='text-secondary' onClick={handleLogout} ><i class="fa-solid fa-right-from-bracket"></i> Logout</li>
            </ul>
        </Col>
    )
}

export default Sidebar