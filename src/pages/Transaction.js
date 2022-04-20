import { useEffect, useState } from 'react'
import { Alert, Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'

const fetchData = async (setTransactions) => {
    const response = await API.get("/transaction");
    setTransactions(response.data.data.transactions);
}

const TableRow = (props) => {
    const { no, id, user, remainingActive, statusUser, statusPayment, setTransactions, setAlert } = props
    let { buktiTransfer } = props
    const [display, setDisplay] = useState('d-none')

    if (buktiTransfer.split('-').length > 1) {
        buktiTransfer = buktiTransfer.split('-')
        buktiTransfer.splice(0, 1)
        buktiTransfer = buktiTransfer.join('-')
    }

    const statusUserColor = statusUser === 'Active' ? 'success' : 'danger'
    let statusPaymentColor
    switch (statusPayment) {
        case 'Approved':
            statusPaymentColor = 'success'
            break;
        case 'Cancel':
            statusPaymentColor = 'danger'
            break;
        default:
            statusPaymentColor = 'warning'
            break;
    }

    const handleApprove = async () => {
        try {
            let token;
            try {
                token = JSON.parse(localStorage.token)
            } catch (error) {
                token = localStorage.token

            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            };
            await API.patch('transaction/' + id, { paymentStatus: "Approved" }, config)
            setAlert({
                display: true,
                color: 'success',
                message: `${user} has been Approved`
            })
            fetchData(setTransactions)
        } catch (error) {
            setAlert({
                display: true,
                color: 'danger',
                message: error.response.data.message
            })
        }
        setDisplay('d-none')
    }

    const handleCancel = async () => {
        try {
            let token;
            try {
                token = JSON.parse(localStorage.token)
            } catch (error) {
                token = localStorage.token

            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            };
            await API.patch('transaction/' + id, { paymentStatus: "Cancel" }, config)
            setAlert({
                display: true,
                color: 'success',
                message: `${user} has been Canceled`
            })
            fetchData(setTransactions)
        } catch (error) {
            setAlert({
                display: true,
                color: 'danger',
                message: error.response.data.message
            })
        }
        setDisplay('d-none')
    }

    return (
        <tr>
            <th scope="row" className='fw-normal'>
                {no}
            </th>
            <td>
                {user}
            </td>
            <td>
                {buktiTransfer}
            </td>
            <td>
                {remainingActive} / Hari
            </td>
            <td>
                <span className={'text-' + statusUserColor} >{statusUser}</span>
            </td>
            <td>
                <span className={'text-' + statusPaymentColor} >{statusPayment}</span>
            </td>
            <td>
                <i
                    className="fa-solid fa-sort-desc fa-2x text-primary"
                    onMouseEnter={() => { setDisplay('') }}
                ></i>
                <Card
                    className={display} style={{ position: 'absolute' }}
                    onMouseLeave={() => { setDisplay('d-none') }}
                >
                    <CardBody>
                        <div onClick={handleApprove} style={{ cursor: 'pointer' }} ><span className='text-success' >Approve</span></div>
                        <div onClick={handleCancel} style={{ cursor: 'pointer' }} ><span className='text-danger' >Cancel</span></div>
                    </CardBody>
                </Card>
            </td>
        </tr>
    )
}

const Transaction = () => {
    const [transactions, setTransactions] = useState()
    const [alert, setAlert] = useState({
        display: false,
        color: '',
        message: ""
    })

    useEffect(() => {
        try {
            fetchData(setTransactions)
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <Container>
                        <h3 className='mt-5 mb-5' >Incoming Transaction</h3>
                        {alert.display ? <Alert color={alert.color} >{alert.message}</Alert> : <></>}
                        <Table striped borderless>
                            <thead className='text-danger' >
                                <tr>
                                    <th>
                                        No
                                    </th>
                                    <th>
                                        Users
                                    </th>
                                    <th>
                                        Bukti Transfer
                                    </th>
                                    <th>
                                        Remaining Active
                                    </th>
                                    <th>
                                        Status User
                                    </th>
                                    <th>
                                        Status Payment
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions && transactions.map((transaction, i) => <TableRow
                                    key={transaction.id}
                                    no={i + 1}
                                    id={transaction.id}
                                    user={transaction.users.name}
                                    buktiTransfer={transaction.transferProof}
                                    remainingActive={transaction.remainingStatus}
                                    statusUser={transaction.userStatus}
                                    statusPayment={transaction.paymentStatus}
                                    setTransactions={setTransactions}
                                    setAlert={setAlert}
                                />)}
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Transaction