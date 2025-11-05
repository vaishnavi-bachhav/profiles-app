import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

export default function App() {
  return (
    <Container className="py-5">
      <Alert variant="primary" className="text-center mb-0">
        Hello React
      </Alert>
    </Container>
  );
}