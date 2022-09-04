import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function App() {
  const [propertyData, setPropertyData] = useState(null);
  const [searchString, setSearchString] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resp = await fetch(`/lrProperty/${searchString}`);
    const json = await resp.json();
    if (json.success) setPropertyData(json.lrProperty);
  }

  return (
    <div className="App">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="align-items-center">
            <Col sm={10}>
              <Form.Control placeholder="Search for property." onChange={(e) => setSearchString(e.target.value)} />
            </Col>
            <Col sm={2}>
              <Button type="submit">Submit!</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <br />
      <Container>
        {propertyData && 
        <strong>{propertyData.paon}, {propertyData.street}, {propertyData.outcode.toString() + " " + propertyData.incode.toString()} </strong>}
      </Container>
      <br />
      <Container>
        {propertyData &&
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Property ID</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {propertyData && propertyData.lrTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.date}</td>
                  <td>{tx.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        }
      </Container>
    </div>
  );
}

export default App;


