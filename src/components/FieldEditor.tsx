import { useState, useMemo } from "react";
import type { DeviceModifications } from "../fitEncoder";
import { MANUFACTURERS, getManufacturerName } from "../manufacturerMap";
import { getProductsForManufacturer, getProductName } from "../productMap";

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

    // Get products for the selected manufacturer, sorted alphabetically
    const availableProducts = useMemo(() => {
        if (!manufacturer) return [];
        const products = getProductsForManufacturer(parseInt(manufacturer, 10));
        return products.sort((a, b) => a.name.localeCompare(b.name));
    }, [manufacturer]);

    // Get sorted manufacturers for the dropdown
    const sortedManufacturers = useMemo(() => {
        return [...MANUFACTURERS].sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    // When manufacturer changes, clear product if it's not valid for the new manufacturer
    const handleManufacturerChange = (newManufacturer: string) => {
        setManufacturer(newManufacturer);

        // If we have a product selected, check if it's valid for this manufacturer
        if (product && newManufacturer) {
            const manufacturerId = parseInt(newManufacturer, 10);
            const productsForMfr = getProductsForManufacturer(manufacturerId);
            const isProductValid = productsForMfr.some(
                (p) => p.id.toString() === product
            );

            // Clear product if it's not valid for the new manufacturer
            if (!isProductValid) {
                setProduct("");
            }
        }
    };

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
                            onChange={(e) =>
                                handleManufacturerChange(e.target.value)
                            }
                        >
                            <option value="">-- Select Manufacturer --</option>
                            {sortedManufacturers.map((m) => (
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
                        {manufacturer && availableProducts.length > 0 ? (
                            <select
                                id="product"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                            >
                                <option value="">-- Select Product --</option>
                                {availableProducts.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="number"
                                id="product"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                placeholder={
                                    manufacturer
                                        ? "No products available"
                                        : "Select manufacturer first"
                                }
                                disabled={!manufacturer}
                            />
                        )}
                    </label>
                    <small className="form-hint">
                        Current:{" "}
                        {currentDevice?.product && currentDevice?.manufacturer
                            ? getProductName(
                                  currentDevice.product,
                                  currentDevice.manufacturer
                              )
                            : currentDevice?.product || "N/A"}
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
