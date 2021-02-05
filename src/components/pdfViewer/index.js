import React, {useState} from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
function PdfViewer({ fileURL, closePreview }) {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  //var encodedUrl = encodeURIComponent(fileURL);
  //let googleDocsBaseURL = 'https://docs.google.com/viewer?url=';

  //console.log(" file url ",fileURL);

//const pdfURL = googleDocsBaseURL +encodedUrl + '&embedded=true';
//const u ="https://360host.me/brochure/Portfolio/v1.pdf"
  return (
    <div className="d-flex pdf-display-overlay">
       <button
        type="button"
        className="pdf-viewer-item"
        className="overlay-close pdf-viewer-close"
        onClick={e => closePreview()}
      >
        Close
      </button>
      
      <Document
        className="doc-pdf-viewer-item"
        file={fileURL}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="controls-pdf-viewer-item">
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      {/* <iframe title="image" src={fileURL} style={{width:"1000px", height:"800px"}} frameBorder="0" allowFullScreen></iframe> */}
        </div>
  )
}

PdfViewer.defaultProps = {}

PdfViewer.propTypes = {}

export default PdfViewer
