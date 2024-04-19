import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';

const Main = () => {
  const [signature, setSignature] = useState(null);
  const [signerName, setSignerName] = useState('');
  const [signerPosition, setSignerPosition] = useState('');
  const [Name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [today] = useState(new Date().toISOString().slice(0, 10));
  const [selectedTitle, setSelectedTitle] = useState("");
  const [userPdf, setUserPdf] = useState(null);


  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSignature(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file (JPEG or PNG)');
    }
  };

  const handleGenerateQR = () => {
    const formData = {
      Name,
      subject,
      content,
      signature: signature ? signature : '',
      signerName,
      signerPosition,
      today,
      selectedTitle
    };
    setQrValue(JSON.stringify(formData));
    setShowDownloadButton(true);
  };

  const handleTitleButtonClick = (title) => {
    setSelectedTitle(title);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted and PDF generated!');
  };  

  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      setUserPdf(pdfDoc);
    } else {
      alert('Please select a valid PDF file');
    }
  };


  const generatePDF = async () => {
    if (!userPdf) {
      alert('Please select a PDF file before generating the PDF');
      return;
    }
  
    const formData = {
      Name,
      subject,
      content,
      signature: signature ? signature : '',
      signerName,
      signerPosition,
      today,
      selectedTitle
    };
  
    // Load the submitted PDF
    const pdfBytes = await userPdf.save();
    const submittedPdfDoc = await PDFDocument.load(pdfBytes);
  
    // Embed the form data into the submitted PDF
    const submittedPdfPage = submittedPdfDoc.getPages()[0];
  
    submittedPdfPage.drawText(formData.Name, {
      x: 10,
      y: submittedPdfPage.getHeight() - 180,
      size: 14,
      align: 'center'
    });
  
    submittedPdfPage.drawText(formData.today, {
      x: 10,
      y: submittedPdfPage.getHeight() - 200,
      size: 12
    });
  
    submittedPdfPage.drawText(`Title: ${formData.selectedTitle}`, {
      x: 10,
      y: submittedPdfPage.getHeight() - 160,
      size: 14
    });
  
    submittedPdfPage.drawText(formData.subject, {
      x: 150,
      y: submittedPdfPage.getHeight() - 250,
      size: 12
    });
  
    submittedPdfPage.drawText(formData.content, {
      x: 10,
      y: submittedPdfPage.getHeight() - 350,
      size: 12
    });
  
    if (formData.signature) {
      const signatureImage = await submittedPdfDoc.embedPng(formData.signature);
      submittedPdfPage.drawImage(signatureImage, {
        x: 10,
        y: 230,
        width: 40,
        height: 40
      });
    }
  
    submittedPdfPage.drawText(formData.signerName, {
      x: 10,
      y: 215,
      size: 12
    });
  
    submittedPdfPage.drawText(formData.signerPosition, {
      x: 10,
      y: 225,
      size: 12
    });
  
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas.toDataURL('image/png');
    const qrCodeImage = await submittedPdfDoc.embedPng(pngUrl);
    submittedPdfPage.drawImage(qrCodeImage, {
      x: 450,
      y: 620,
      width: 80,
      height: 80
    });
  
    // Save the modified PDF with form data
    const modifiedPdfBytes = await submittedPdfDoc.save();
  
    // Create Blob for the modified PDF
    const modifiedBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const modifiedPdfUrl = URL.createObjectURL(modifiedBlob);
  
    // Download the modified PDF
    const modifiedLink = document.createElement('a');
    modifiedLink.href = modifiedPdfUrl;
    modifiedLink.download = 'modified_submission.pdf';
    modifiedLink.click();
    URL.revokeObjectURL(modifiedPdfUrl);
  };
    

  return (
    <div className="form-container">
      <h1>Letterhead Form</h1>
      <Form onSubmit={handleFormSubmit}>
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

        <Form.Group as={Row} controlId="formHorizontalyName">
          <Form.Label column sm={2}>
            Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Receiver Name" value={Name} onChange={(e) => setName(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalSubject">
          <Form.Label column sm={2}>
            Subject:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
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
            <Form.Control type="text" placeholder="Enter Signer Name" value={signerName} onChange={(e) => setSignerName(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalSignerPosition">
          <Form.Label column sm={2}>
            Position:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Signer Position" value={signerPosition} onChange={(e) => setSignerPosition(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPdf">
        <Form.Label column sm={2}>
          PDF:
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="file" onChange={handlePdfChange} />
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
