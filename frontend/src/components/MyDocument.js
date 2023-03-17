import React from "react";
import { pdf, Document, Page, Text, PDFViewer } from "@react-pdf/renderer";

const MyDocument = () => {
  return (
    <div>
      <Document>
        <Page>
          <Text>Hello, world!</Text>
        </Page>
      </Document>
    </div>
  );
};

export default MyDocument;
