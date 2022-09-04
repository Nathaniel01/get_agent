import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function App() {
  const [propertyData, setPropertyData] = useState(null);
  const [searchString, setSearchString] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const resp = await fetch(`/lrProperty/${searchString}`);
      const json = await resp.json();
      if (json.success){
        setPropertyData(json.lrProperty);
        setErrorMessage("")
      }
      else if (json.error){
        setErrorMessage(json.msg)
        setPropertyData(null)
      }
    } catch (e) {
      console.log(e)
    }

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
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <br />
      <Container>
        {  errorMessage && errorMessage.length > 0 && <strong>{errorMessage}</strong>}
      </Container>
      <Container>
        {propertyData &&
          <strong>{propertyData.paon}, {propertyData.street}, {propertyData.outcode.toString() + " " + propertyData.incode.toString()} </strong>}
      </Container>

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
                  <td>{tx.price.toLocaleString()}</td>
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


