const PDFMerger = require("pdf-merger-js");
const path = require("path");

var merger = new PDFMerger();

const mergepdf_fun = async (pdffiles) => {
  for (const files in pdffiles) {
    console.log("file in loop", files);
    await merger.add(path.join(__dirname, pdffiles[files].path));
  }

  let d = new Date().getTime();

  await merger.save(`public/merged_${d}.pdf`); //save under given name and reset the internal document
  return d;

  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
};

module.exports = mergepdf_fun;
