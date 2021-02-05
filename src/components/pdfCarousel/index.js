import React, { useState } from 'react';
import * as Icon from 'react-feather';
import PdfViewer from '../../components/pdfViewer';
import MyApp from '../pdfViewer/MyApp';
function PdfCarousel({ documents, removeOverlay, pdfSlice }) {
  const [open, setOpen] = React.useState(true);
  const [activePdfUrl, setActivePdfUrl] = React.useState(undefined);
  const [openPDFViewer, setOpenPDFViewer] = React.useState(false);
  const [imageURL, setImageURL] = React.useState(pdfSlice.document_image_1.url);
  let [imageIndex, setImageIndex] = React.useState(1);
  const [documentURL, setDocumentURL] = React.useState(documents[0].url);
  let noOfDocuments = documents.length;
 

  const handleRightClick = async (isEnd) => {
    imageIndex = isEnd?  1:imageIndex + 1;
    await setImageIndex(imageIndex);
    await setImageURL(pdfSlice['document_image_' + `${imageIndex}`]['url']);
    await setDocumentURL(documents[imageIndex - 1].url);
  };
  const handleLeftClick = async (isEnd) => {
    imageIndex = isEnd?  noOfDocuments :imageIndex - 1;
    await setImageIndex(imageIndex);
    await setImageURL(pdfSlice['document_image_' + `${imageIndex}`]['url']);
    await setDocumentURL(documents[imageIndex - 1].url);
  };
  return (
    <>
    {openPDFViewer && (
      <PdfViewer
        fileURL={activePdfUrl}
        closePreview={() => {
          setOpenPDFViewer(false);
          setOpen(true);
        }}
      />
    )}
    { !openPDFViewer && (<div className="overlay">
        <button type="button" className="overlay-close" onClick={e => removeOverlay()}/>
      {open && (
        <div>
          <div className="pdf-flex-item">
            <img
              alt=""
              src={imageURL}
              onClick={e => {
                setActivePdfUrl(documentURL);
                setOpenPDFViewer(true);
                setOpen(false);
              }}
            />
          </div>

          <div className="pdf-flex-bottom-item">
            <Icon.ArrowLeftCircle
              onClick={() => {
                if (imageIndex === 1) {
                  handleLeftClick(true);
                } else {
                  handleLeftClick(false);
                }
              }}
            />
            <p>{imageIndex}</p>
            <Icon.ArrowRightCircle
              onClick={() => {
                if (imageIndex === noOfDocuments) {
                  handleRightClick(true);
                } else {
                  handleRightClick(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>)}
    </>
  );
}

PdfCarousel.defaultProps = {};

PdfCarousel.propTypes = {};

export default PdfCarousel;
