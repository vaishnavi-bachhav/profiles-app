import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';

export default function App() {
  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
      <Row xs={1} md={2} lg={3}>
        {profiles.map(p => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}