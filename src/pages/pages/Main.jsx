import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './main.css';

const Main = () => {
  const [referenceNo, setReferenceNo] = useState('');
  const [logo, setLogo] = useState(null);
  const [phone, setPhone] = useState('');
  const [signature, setSignature] = useState(null);
  const [signerName, setSignerName] = useState('');
  const [signerPosition, setSignerPosition] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  useEffect(() => {
    const generatedRefNo = generateReferenceNumber();
    setReferenceNo(generatedRefNo);
  }, []);

  const generateReferenceNumber = () => {
    return 'REF' + Math.floor(Math.random() * 1000000);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setLogo(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file (JPEG or PNG)');
    }
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSignature(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file (JPEG or PNG)');
    }
  };

  const handleGenerateQR = () => {
    const doc = new jsPDF();
    const formData = {
      referenceNo,
      logo: logo ? logo.split('/').pop() : '',
      companyName,
      address,
      phone,
      subject,
      content,
      signature: signature ? signature.split('/').pop() : '',
      signerName,
      signerPosition,
      today,
      selectedTitle
    };
  
    let textValue = '';
    for (const key in formData) {
      textValue += `${key}: ${formData[key]}\n`;
    }
  
    setQrValue(textValue);
    setShowDownloadButton(true);
  };
  

  const today = new Date().toISOString().slice(0, 10);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
  };

  const [selectedTitle, setSelectedTitle] = useState(""); // State variable to store the selected title

  const handleTitleButtonClick = (title) => {
    setSelectedTitle(title);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const formData = {
      referenceNo,
      logo: logo ? logo : '',
      companyName,
      address,
      phone,
      subject,
      content,
      signature: signature ? signature : '',
      signerName,
      signerPosition,
      today,
      selectedTitle
    };
  
    // Set the logo at the top center
    if (formData.logo) {
      doc.addImage(formData.logo, 'JPEG', 10, 10, 40, 40);
    }
  
    // Set the company name below the logo
    doc.setFontSize(18);
    doc.text(formData.companyName, 69, 20, { align: 'center' });
  
    // Set the address below the company name
    doc.setFontSize(14);
    doc.text(formData.address, 73, 29, { align: 'center' });

    //Set the address below the address
    doc.setFontSize(12);
    doc.text(`Phone: ${formData.phone}`, 69, 35, {align: 'center'});

    // Set the title and subject below the Reference No and Timestamp
    doc.setFontSize(12);
    doc.text(formData.referenceNo, 10, 60);
    doc.text(`Title: ${formData.selectedTitle}`, 10, 70);
    doc.text(formData.today, 160, 60);

    doc.text(formData.subject, 90, 80);
    doc.text(formData.content, 10, 100);


    // Set the signature, name, and position at the footer
      if (formData.signature) {
        doc.addImage(formData.signature, 'JPEG', 10, 230, 40, 40);
      }
      doc.text(formData.signerName, 10, 215);
      doc.text(formData.signerPosition, 10, 225);
    
      const canvas = document.getElementById('qrcode');
    const pngUrl = canvas.toDataURL('image/png');
    doc.addImage(pngUrl, 'PNG', 160, 15, 30, 30); // Adjust the position and size as needed

    doc.save('formdata.pdf');
  };
  
  

  return (
    <div className="form-container">
      <h1>Letterhead Form</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group as={Row} controlId="formHorizontalReferenceNo">
          <Form.Label column sm={2}>
            Reference No:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" value={referenceNo} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalLogo">
          <Form.Label column sm={2}>
            Company Logo:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="file" accept="image/jpeg, image/png" onChange={handleLogoChange} />
            {logo && <img src={logo} alt="Company Logo" className="logo-preview" />}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalTimestamp">
          <Form.Label column sm={2}>
            Timestamp:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" value={today} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalTitle">
          <Form.Label column sm={2}>
            Title:
          </Form.Label>
          <Col sm={10}>
            <Button className="title-button" onClick={() => handleTitleButtonClick("Mr")}>Mr</Button>
            <Button className="title-button" onClick={() => handleTitleButtonClick("Mrs")}>Mrs</Button>
            <Button className="title-button" onClick={() => handleTitleButtonClick("Ms")}>Ms</Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalCompanyName">
          <Form.Label column sm={2}>
            Company Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalAddress">
          <Form.Label column sm={2}>
            Address:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPhone">
          <Form.Label column sm={2}>
            Phone:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="tel" placeholder="Enter phone number" value={phone} onChange={handlePhoneChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalSubject">
          <Form.Label column sm={2}>
            Subject:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalContent">
          <Form.Label column sm={2}>
            Content:
          </Form.Label>
          <Col sm={10}>
            <Editor
              apiKey="an20wm2xrsiy2x8klldb9l7qgrtpiekr1yt03j55ekrjs2h1"
              initialValue=""
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              value={content}
              onEditorChange={(content) => setContent(content)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalSignature">
          <Form.Label column sm={2}>
            Signature:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="file" accept="image/jpeg, image/png" onChange={handleSignatureChange} />
            {signature && <img src={signature} alt="Signature" className="signature-preview" />}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalSignerName">
          <Form.Label column sm={2}>
            Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter signer's name" value={signerName} onChange={(e) => setSignerName(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalSignerPosition">
          <Form.Label column sm={2}>
            Position:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter signer's position" value={signerPosition} onChange={(e) => setSignerPosition(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" className='Button-submit'>Submit</Button>
          </Col>
        </Form.Group>
        </Form>
        <Button onClick={handleGenerateQR}>Generate QR Code</Button>
      {qrValue && <QRCode id="qrcode" value={qrValue} />}
      {showDownloadButton && <Button onClick={generatePDF}>Generate PDF</Button>}

    </div>
  );
};

export default Main;
