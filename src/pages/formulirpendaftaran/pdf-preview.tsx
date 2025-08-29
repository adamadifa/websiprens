import React, { useEffect, useState } from "react";

export default function PdfPreviewPage() {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        const url = localStorage.getItem("pdfPreview");
        setPdfUrl(url);
    }, []);

    const handleDownload = () => {
        if (pdfUrl) {
            const a = document.createElement("a");
            a.href = pdfUrl;
            a.download = "Formulir-Pendaftaran.pdf";
            a.click();
        }
    };

    const handlePrint = () => {
        const iframe = document.getElementById("pdf-iframe") as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl flex flex-col items-center">
                <h1 className="text-xl font-bold mb-4 text-teal-800">Preview Formulir Pendaftaran (PDF)</h1>
                {pdfUrl ? (
                    <>
                        <div className="flex gap-3 mb-4">
                            <button
                                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition shadow"
                                onClick={handleDownload}
                            >
                                Download PDF
                            </button>
                            <button
                                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition shadow"
                                onClick={handlePrint}
                            >
                                Print
                            </button>
                        </div>
                        <iframe
                            id="pdf-iframe"
                            src={pdfUrl}
                            title="Preview PDF"
                            className="w-full min-h-[70vh] border rounded shadow"
                        />
                    </>
                ) : (
                    <div className="text-rose-600 font-semibold">PDF tidak ditemukan. Silakan generate ulang dari halaman formulir.</div>
                )}
            </div>
        </div>
    );
}
