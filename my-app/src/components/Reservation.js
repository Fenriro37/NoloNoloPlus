import { Component} from "react"
import { Image, Container, Row, Col, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Reservation extends Component{
	render() {
		return (
			<> 
			<div>
				<Container className="mt-2">
					<Row>
						<Col sm="12" md="6">
							<Image thumbnail src={this.props.prenotazione.image} alt={this.props.prenotazione.productTitle} width="100%"/>
						<hr />
						</Col>
						<Col sm="12" md="6">
								<div>
									<h2>{this.props.prenotazione.productTitle} - {this.props.prenotazione.productBrand}</h2>
								</div>
							<Table bordered hover>
								<tbody>
									<tr>
										<td>Product Id:</td>
										<td>{this.props.prenotazione.productId}</td>
									</tr>
									<tr>
										<td>Booking Date:</td>
										<td>{this.props.prenotazione.bookingDate.year}-{this.props.prenotazione.bookingDate.month}-{this.props.prenotazione.bookingDate.day}</td>
									</tr>
									<tr>
										<td>Start Date:</td>
										<td>{this.props.prenotazione.startDate.year}-{this.props.prenotazione.startDate.month}-{this.props.prenotazione.startDate.day}</td>
									</tr>
									<tr>
										<td>End Date:</td>
										<td>{this.props.prenotazione.endDate.year}-{this.props.prenotazione.endDate.month}-{this.props.prenotazione.endDate.day}</td>
									</tr>
									<tr className="font-weight-bold">
										<td>Total Price:</td>
										<td>{this.props.prenotazione.price}€</td>
									</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
			</div> 
			</>
		);
	}
}

export default Reservation;

/*
								<tr>
									{this.props.prenotazione.bookingDate.map((prop) => (<td>{prop}</td>))}
								</tr>

<div> </div>
<div>clientEmail: {this.props.prenotazione.clientEmail}</div>
<hr />
<p>productId: {this.props.prenotazione.productId}</p>
<p> </p>
<p>day: </p>
<p>day: {this.props.prenotazione.startDate.day}</p>
<p>day: {this.props.prenotazione.endDate.day}</p>
<p>isTaken: {this.props.prenotazione.isTaken}</p>
<p>isReturned: {this.props.prenotazione.isReturned}</p>
<p>description: {this.props.prenotazione.description}</p>
<p>note: {this.props.prenotazione.note}</p>
<p>productTitle: {this.props.prenotazione.productTitle}</p>
<p>productBrand: {this.props.prenotazione.productBrand}</p>
<p>clientName: {this.props.prenotazione.clientName}</p>
<p>clientSurname: {this.props.prenotazione.clientSurname}</p>*/