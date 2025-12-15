import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Generate PDF from CV preview
 * @param {string} elementId - ID of the element to convert to PDF
 * @param {string} filename - Name of the PDF file
 */
export const generatePDF = async (
  elementId = "cv-preview-wrapper",
  filename = "CV.pdf"
) => {
  try {
    const element =
      document.querySelector(`.${elementId}`) ||
      document.querySelector(`#${elementId}`);

    if (!element) {
      throw new Error("CV preview element not found");
    }

    // Create canvas from the CV preview
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;

    // Calculate image dimensions to fit A4
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: imgHeight > pdfHeight ? "portrait" : "portrait",
      unit: "mm",
      format: "a4",
    });

    // If content is longer than one page, add multiple pages
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Save the PDF
    pdf.save(filename);

    return { success: true, message: "PDF generated successfully" };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return { success: false, message: error.message };
  }
};

/**
 * Share CV via Web Share API or copy link
 * @param {string} cvId - ID of the CV to share
 * @param {string} cvName - Name for the share title
 */

export const shareCV = async (cvId, cvName = "My CV") => {
  const shareUrl = `${window.location.origin}/cv/${cvId}`; // ALWAYS root

  const shareData = {
    title: cvName,
    text: "Check out my CV!",
    url: shareUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return { success: true, message: "Shared successfully" };
    } else {
      await navigator.clipboard.writeText(shareUrl);
      return {
        success: true,
        message: `Share link copied to clipboard: ${shareUrl}`,
        url: shareUrl,
      };
    }
  } catch (error) {
    console.error("Error sharing:", error);
    return { success: false, message: error.message };
  }
};

export default {
  generatePDF,
  shareCV,
};
