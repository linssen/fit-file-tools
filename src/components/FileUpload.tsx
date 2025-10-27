interface FileUploadProps {
    onFileSelect: (file: File) => void;
    loading: boolean;
}

export default function FileUpload({ onFileSelect, loading }: FileUploadProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith(".fit")) {
            alert("Please select a .fit file");
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            alert("File too large. Maximum size is 50MB");
            return;
        }

        onFileSelect(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const input = document.createElement("input");
            input.type = "file";
            input.files = e.dataTransfer.files;
            handleFileChange({
                target: input,
            } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div
            className="upload-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                type="file"
                id="fileInput"
                accept=".fit"
                onChange={handleFileChange}
                disabled={loading}
                style={{ display: "none" }}
            />
            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <h2>📁 Drop a .FIT file here or click to browse</h2>
                <p>Click or drag and drop your Garmin FIT file here</p>
                <button
                    onClick={() =>
                        document.getElementById("fileInput")?.click()
                    }
                    disabled={loading}
                >
                    Browse Files
                </button>
            </label>
        </div>
    );
}
