import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
function PdfViewer({ fileURL, closePreview }) {
    if (isMobile) {
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
        return (
            <><div className="overlay">
                <button
                    type="button"
                    className="pdf-viewer-item"
                    className="overlay-close pdf-viewer-close"
                    onClick={e => closePreview()}
                >
                    Close
                </button>
                
                <Document  file={fileURL} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <div className="controls">
                   
                    <button type="button" style={{marginRight:"15px"}}disabled={pageNumber <= 1} onClick={previousPage}>
                        Previous
                    </button>
                    <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
                        Next
                    </button>
                </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <button type="button" className="overlay-close pdf-viewer-close" onClick={e => closePreview()}>
                    Close
                </button>

                <div className="scroll-wrapper">
                    <iframe title="image" src={fileURL} frameBorder="0" allowFullScreen />
                </div>
                </>
        );
    }
}

PdfViewer.defaultProps = {};

PdfViewer.propTypes = {};

export default PdfViewer;
