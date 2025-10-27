import { useState } from "react";
import type { DeviceModifications } from "../fitEncoder";

interface FieldEditorProps {
    currentDevice?: {
        manufacturer?: string;
        product?: string;
        serialNumber?: number | null;
        softwareVersion?: number | null;
    };
    onModify: (modifications: DeviceModifications) => void;
    onCancel: () => void;
}

export default function FieldEditor({
    currentDevice,
    onModify,
    onCancel,
}: FieldEditorProps) {
    const [manufacturer, setManufacturer] = useState(
        currentDevice?.manufacturer || ""
    );
    const [product, setProduct] = useState(currentDevice?.product || "");
    const [serialNumber, setSerialNumber] = useState(
        currentDevice?.serialNumber?.toString() || ""
    );
    const [softwareVersion, setSoftwareVersion] = useState(
        currentDevice?.softwareVersion?.toString() || ""
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const modifications: DeviceModifications = {};

        // Only include fields that have been changed
        if (manufacturer && manufacturer !== currentDevice?.manufacturer) {
            modifications.manufacturer = manufacturer;
        }
        if (product && product !== currentDevice?.product) {
            modifications.product = product;
        }
        if (serialNumber) {
            const num = parseInt(serialNumber, 10);
            if (!isNaN(num) && num !== currentDevice?.serialNumber) {
                modifications.serialNumber = num;
            }
        }
        if (softwareVersion) {
            const num = parseFloat(softwareVersion);
            if (!isNaN(num) && num !== currentDevice?.softwareVersion) {
                modifications.softwareVersion = num;
            }
        }

        onModify(modifications);
    };

    const hasChanges = () => {
        return (
            manufacturer !== (currentDevice?.manufacturer || "") ||
            product !== (currentDevice?.product || "") ||
            serialNumber !== (currentDevice?.serialNumber?.toString() || "") ||
            softwareVersion !==
                (currentDevice?.softwareVersion?.toString() || "")
        );
    };

    return (
        <div className="field-editor">
            <h3>Edit Device Information</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="manufacturer">
                        Manufacturer:
                        <input
                            type="text"
                            id="manufacturer"
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                            placeholder="e.g., garmin, wahoo, etc."
                        />
                    </label>
                    <small className="form-hint">
                        Current: {currentDevice?.manufacturer || "N/A"}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="product">
                        Product:
                        <input
                            type="text"
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            placeholder="e.g., edge1030, fenix7, etc."
                        />
                    </label>
                    <small className="form-hint">
                        Current: {currentDevice?.product || "N/A"}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="serialNumber">
                        Serial Number:
                        <input
                            type="number"
                            id="serialNumber"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            placeholder="e.g., 123456789"
                        />
                    </label>
                    <small className="form-hint">
                        Current: {currentDevice?.serialNumber || "N/A"}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="softwareVersion">
                        Software Version:
                        <input
                            type="number"
                            id="softwareVersion"
                            step="0.01"
                            value={softwareVersion}
                            onChange={(e) => setSoftwareVersion(e.target.value)}
                            placeholder="e.g., 5.20"
                        />
                    </label>
                    <small className="form-hint">
                        Current: {currentDevice?.softwareVersion || "N/A"}
                    </small>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="button-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="button-primary"
                        disabled={!hasChanges()}
                    >
                        Apply Changes & Download
                    </button>
                </div>
            </form>
        </div>
    );
}
