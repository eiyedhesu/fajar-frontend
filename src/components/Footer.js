import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiPhoneCall } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { TfiLocationPin } from 'react-icons/tfi';
import { LuInstagram, LuFacebook, LuTwitter } from 'react-icons/lu';

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3'>
      <Container className="text-center bg-dark text-light p-3">
        <Row>
        <Col>
      <h3>Tentang kami</h3>
      <p>
        lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed
        quia non numquam eius modi tempora incidunt, ut labore et dolore magnam
        aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
        commodi.
      </p>
    </Col>
    <Col>
      <h3>Hubungi kami</h3>
      <p>
        <FiPhoneCall /> (+62) 81234567890
        <br></br>
        <MdOutlineEmail /> admin@fajarstore.com
        <br></br>
        <TfiLocationPin /> Jl. sesama 123 , Jakarta, Indonesia
      </p>
    </Col>
    <Col>
      <h3>Ikuti kami</h3>
      <p>
        <LuFacebook /> FajarStore
        <br></br>
        <LuInstagram /> @FajarStore_
        <br></br>
        <LuTwitter /> @FajarStore_
      </p>
    </Col>
        </Row>
      </Container>
    </div>
  );
};


export default Footer;
