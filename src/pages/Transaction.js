import React from 'react'
import { Col, Container, Row, Table } from 'reactstrap'
import Sidebar from '../components/Sidebar'

const transactions = [
    {
        no: 1,
        user: 'Radif Ganteng',
        buktiTransfer: 'bca.jpg',
        remainingActive: 26,
        statusUser: 'Active',
        statusPayment: 'Approve'
    },
    {
        no: 2,
        user: 'Haris Rahman',
        buktiTransfer: 'bni.jpg',
        remainingActive: 26,
        statusUser: 'Active',
        statusPayment: 'Approve'
    },
    {
        no: 3,
        user: 'Amin Subagiyo',
        buktiTransfer: 'permata.jpg',
        remainingActive: 0,
        statusUser: 'Not Active',
        statusPayment: 'Cancel'
    },
    {
        no: 4,
        user: 'Haris Astina',
        buktiTransfer: 'permata.jpg',
        remainingActive: 0,
        statusUser: 'Not Active',
        statusPayment: 'Pending'
    },
    {
        no: 5,
        user: 'Aziz Oni On',
        buktiTransfer: 'bi.jpg',
        remainingActive: 0,
        statusUser: 'Not Active',
        statusPayment: 'Pending'
    },
    {
        no: 6,
        user: 'Sugeng No Pants',
        buktiTransfer: 'bni.jpg',
        remainingActive: 0,
        statusUser: 'Not Active',
        statusPayment: 'Pending'
    },
]
const TableRow = (props) => {
    const { no, user, buktiTransfer, remainingActive, statusUser, statusPayment } = props

    const statusUserColor = statusUser === 'Active' ? 'success' : 'danger'
    let statusPaymentColor
    switch (statusPayment) {
        case 'Approve':
            statusPaymentColor = 'success'
            break;
        case 'Cancel':
            statusPaymentColor = 'danger'
            break;
        default:
            statusPaymentColor = 'warning'
            break;
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
                <i class="fa-solid fa-sort-desc fa-2x text-primary"></i>
            </td>
        </tr>
    )
}

const Transaction = () => {
    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <Container>
                        <h3 className='mt-5 mb-5' >Incoming Transaction</h3>
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
                                {transactions.map(transaction => <TableRow
                                    no={transaction.no}
                                    user={transaction.user}
                                    buktiTransfer={transaction.buktiTransfer}
                                    remainingActive={transaction.remainingActive}
                                    statusUser={transaction.statusUser}
                                    statusPayment={transaction.statusPayment}
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