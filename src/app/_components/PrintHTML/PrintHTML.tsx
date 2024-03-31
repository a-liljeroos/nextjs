import React from "react";
import ReactDOMServer from "react-dom/server";
const beautify = require("beautify");

const PrintHTML = ({ input }: { input: React.ReactNode }) => {
  const code = ReactDOMServer.renderToStaticMarkup(input);
  return <pre style={{ fontSize: 10 }}> {beautify(code, { format: "html" })}</pre>;
};

export default PrintHTML;
