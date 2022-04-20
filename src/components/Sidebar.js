import './sidebar.css'
import { Col } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'

const Menu = () => {
    return (
        <>
            <li> <Link className='text-secondary text-decoration-none' to={'/home'}><i className="fa-solid fa-home"></i> Home</Link> </li>
            <li> <Link className='text-secondary text-decoration-none' to={'/profile'}><i className="fa-solid fa-user"></i> Profile</Link> </li>
            <li> <Link className='text-secondary text-decoration-none' to={'/subcribe'} ><i className="fa-solid fa-file-invoice-dollar"></i> Subcribe</Link> </li>
        </>
    )
}
const AdminMenu = () => {
    return (
        <>
            <li> <Link className='text-secondary text-decoration-none' to={'/transaction'}><i className="fa-solid fa-file-invoice-dollar"></i> Transaction</Link> </li>
            <li> <Link className='text-secondary text-decoration-none' to={'/book'}><i className="fa-solid fa-book"></i> Book</Link> </li>
            <li> <Link className='text-secondary text-decoration-none' to={'/user'}><i className="fa-solid fa-users"></i> User</Link> </li>
        </>
    )
}

const Sidebar = () => {
    const navigate = useNavigate()
    const isAdmin = JSON.parse(localStorage.getItem('is_admin'))
    const [isSubcribe, setIsSubcribe] = useState(false)
    const [state, dispatch] = useContext(UserContext);

    const fullName = JSON.parse(localStorage.getItem('user')).name

    useEffect(() => {
        try {
            (async () => {
                const userId = JSON.parse(localStorage.getItem('user')).id
                let response = await API.get(`is-subcribed/${userId}`);
                setIsSubcribe(response.data.data.isSubcribed)

                response = await API.get(`user/${userId}/profile`);

                if (response.data.data.profile.photo) {
                    dispatch({
                        type: "SET_IMAGE",
                        payload: response.data.data.profile.photo,
                    });
                }
            })()
        } catch (error) {
            console.log(error);
        }

    }, [])

    const handleLogout = () => {
        localStorage.clear()
        dispatch({ type: 'RESET' })
        navigate('/')
    }

    return (
        <Col className='col-md-2'>
            <div className='text-center' >
                <div>
                    <img className='logo' src="/wow-2.png" alt="" />
                </div>
                <div>
                    {!isAdmin ? (<img className='profile-image' src={'http://localhost:3000/uploads/' + state.profileImage} alt="" />) : <></>}
                </div>
                <p className='text-dark fw-bold mt-3'>{fullName}</p>
                {
                    !isAdmin ?
                        isSubcribe ? (<p className='text-success fw-bold'>Subcribed</p>) : <p className='text-danger fw-bold'>Not Subcribed Yet</p>
                        : <></>
                }

            </div>
            <hr />
            <ul className='menu' >
                {isAdmin ? <AdminMenu /> : <Menu />}
                <li><hr /></li>
                <li
                    style={{ cursor: 'pointer' }}
                    className='text-secondary'
                    onClick={handleLogout}
                >
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                </li>
            </ul>
        </Col>
    )
}

export default Sidebar