import { useState } from "react";
import type { DeviceModifications } from "../fitEncoder";
import { MANUFACTURERS, getManufacturerName } from "../manufacturerMap";

interface FieldEditorProps {
    currentDevice?: {
        manufacturer?: number;
        product?: number;
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
        currentDevice?.manufacturer?.toString() || ""
    );
    const [product, setProduct] = useState(
        currentDevice?.product?.toString() || ""
    );
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
        if (
            manufacturer &&
            manufacturer !== currentDevice?.manufacturer?.toString()
        ) {
            modifications.manufacturer = parseInt(manufacturer, 10);
        }
        if (product && product !== currentDevice?.product?.toString()) {
            modifications.product = parseInt(product, 10);
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
            manufacturer !== (currentDevice?.manufacturer?.toString() || "") ||
            product !== (currentDevice?.product?.toString() || "") ||
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
                        <select
                            id="manufacturer"
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                        >
                            <option value="">-- Select Manufacturer --</option>
                            {MANUFACTURERS.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <small className="form-hint">
                        Current:{" "}
                        {currentDevice?.manufacturer
                            ? getManufacturerName(currentDevice.manufacturer)
                            : "N/A"}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="product">
                        Product:
                        <input
                            type="number"
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            placeholder="e.g., 1735 for Edge 820"
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
