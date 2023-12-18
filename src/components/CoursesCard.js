import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const CourseCard = (props) => {
  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Col key={index}>
          <Card className="bg-black rounded">
            <Card.Body>
              <Card.Title className="text-white text-xl">{props.title}</Card.Title>
              <Card.Text className="overline text-white">Points required: {props.points}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CourseCard;
