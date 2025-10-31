/**
 * Tests for FieldEditor component
 */

import { render, screen, fireEvent } from "@testing-library/react";
import FieldEditor from "../../components/FieldEditor";
import type { DeviceModifications } from "../../fitEncoder";

describe("FieldEditor", () => {
    const mockOnModify = jest.fn();
    const mockOnCancel = jest.fn();

    const defaultDevice = {
        manufacturer: 1, // Garmin
        product: 2713, // Edge 1030
        serialNumber: 123456789,
        softwareVersion: 5.2,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        // Clear localStorage before each test
        localStorage.clear();
    });

    describe("Rendering", () => {
        it("should render the form with all fields", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            expect(
                screen.getByText("Edit Device Information")
            ).toBeInTheDocument();
            expect(screen.getByLabelText(/Manufacturer:/)).toBeInTheDocument();
            expect(screen.getByLabelText(/Product:/)).toBeInTheDocument();
            expect(screen.getByLabelText(/Serial Number:/)).toBeInTheDocument();
            expect(
                screen.getByLabelText(/Software Version:/)
            ).toBeInTheDocument();
        });

        it("should display current values in hints", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            expect(screen.getByText(/Current: Garmin/)).toBeInTheDocument();
            // Product now shows product name instead of just ID
            expect(screen.getByText(/Current: Edge 1030/)).toBeInTheDocument();
            expect(screen.getByText(/Current: 123456789/)).toBeInTheDocument();
            expect(screen.getByText(/Current: 5.2/)).toBeInTheDocument();
        });

        it("should pre-fill inputs with current values", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            expect(screen.getByLabelText(/Manufacturer:/)).toHaveValue("1");
            // Product is now a select dropdown when manufacturer is set
            expect(screen.getByLabelText(/Product:/)).toHaveValue("2713");
            expect(screen.getByLabelText(/Serial Number:/)).toHaveValue(
                123456789
            );
            expect(screen.getByLabelText(/Software Version:/)).toHaveValue(5.2);
        });

        it("should handle missing device info gracefully", () => {
            render(
                <FieldEditor onModify={mockOnModify} onCancel={mockOnCancel} />
            );

            expect(screen.getAllByText(/Current: N\/A/)).toHaveLength(4);
            expect(screen.getByLabelText(/Manufacturer:/)).toHaveValue("");
        });
    });

    describe("User Interactions", () => {
        it("should update manufacturer field on input", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const input = screen.getByLabelText(/Manufacturer:/);
            fireEvent.change(input, { target: { value: "32" } }); // Wahoo Fitness

            expect(input).toHaveValue("32");
        });

        it("should update product field on input", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const input = screen.getByLabelText(/Product:/);
            // Product is now a select dropdown, so value is a string
            fireEvent.change(input, { target: { value: "2238" } }); // Venu 2

            expect(input).toHaveValue("2238");
        });

        it("should update serial number field on input", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const input = screen.getByLabelText(/Serial Number:/);
            fireEvent.change(input, { target: { value: "999999999" } });

            expect(input).toHaveValue(999999999);
        });

        it("should update software version field on input", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const input = screen.getByLabelText(/Software Version:/);
            fireEvent.change(input, { target: { value: "6.5" } });

            expect(input).toHaveValue(6.5);
        });

        it("should call onCancel when Cancel button is clicked", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const cancelButton = screen.getByText("Cancel");
            fireEvent.click(cancelButton);

            expect(mockOnCancel).toHaveBeenCalledTimes(1);
            expect(mockOnModify).not.toHaveBeenCalled();
        });
    });

    describe("Form Submission", () => {
        it("should disable submit button when no changes are made", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const submitButton = screen.getByText("Apply Changes & Download");
            expect(submitButton).toBeDisabled();
        });

        it("should enable submit button when changes are made", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const input = screen.getByLabelText(/Manufacturer:/);
            fireEvent.change(input, { target: { value: "wahoo" } });

            const submitButton = screen.getByText("Apply Changes & Download");
            expect(submitButton).not.toBeDisabled();
        });

        it("should call onModify with only changed fields", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // Change only manufacturer
            const manufacturerInput = screen.getByLabelText(/Manufacturer:/);
            fireEvent.change(manufacturerInput, { target: { value: "32" } }); // Wahoo Fitness

            // Submit form
            const form = screen
                .getByText("Edit Device Information")
                .closest("div")
                ?.querySelector("form");
            if (form) {
                fireEvent.submit(form);
            }

            expect(mockOnModify).toHaveBeenCalledTimes(1);
            expect(mockOnModify).toHaveBeenCalledWith({
                manufacturer: 32,
            });
        });

        it("should call onModify with multiple changed fields", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // Change multiple fields
            fireEvent.change(screen.getByLabelText(/Manufacturer:/), {
                target: { value: "32" }, // Wahoo Fitness
            });
            // After manufacturer changes, product field should be available
            fireEvent.change(screen.getByLabelText(/Product:/), {
                target: { value: "16" }, // ELEMNT BOLT for Wahoo
            });
            fireEvent.change(screen.getByLabelText(/Serial Number:/), {
                target: { value: "999999" },
            });

            // Submit form
            const form = screen
                .getByText("Edit Device Information")
                .closest("div")
                ?.querySelector("form");
            if (form) {
                fireEvent.submit(form);
            }

            const expectedModifications: DeviceModifications = {
                manufacturer: 32,
                product: 16, // ELEMNT BOLT for Wahoo
                serialNumber: 999999,
            };

            expect(mockOnModify).toHaveBeenCalledWith(expectedModifications);
        });

        it("should handle numeric field validation", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // Change serial number to invalid value then valid
            const serialInput = screen.getByLabelText(/Serial Number:/);
            fireEvent.change(serialInput, {
                target: { value: "999999" },
            });

            // Submit form
            const form = screen
                .getByText("Edit Device Information")
                .closest("div")
                ?.querySelector("form");
            if (form) {
                fireEvent.submit(form);
            }

            expect(mockOnModify).toHaveBeenCalledWith({
                serialNumber: 999999,
            });
        });

        it("should not include unchanged fields in modifications", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // Change only one field
            fireEvent.change(screen.getByLabelText(/Software Version:/), {
                target: { value: "7.0" },
            });

            // Submit form
            const form = screen
                .getByText("Edit Device Information")
                .closest("div")
                ?.querySelector("form");
            if (form) {
                fireEvent.submit(form);
            }

            // Should only include the changed field
            expect(mockOnModify).toHaveBeenCalledWith({
                softwareVersion: 7.0,
            });
        });

        it("should handle empty modifications object when no valid changes", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // Change serial number to NaN
            const serialInput = screen.getByLabelText(/Serial Number:/);
            fireEvent.change(serialInput, {
                target: { value: "" },
            });

            // Submit form (button should be disabled, but test the logic)
            const form = screen
                .getByText("Edit Device Information")
                .closest("div")
                ?.querySelector("form");
            if (form) {
                fireEvent.submit(form);
            }

            // Should be called with empty object or not include invalid fields
            expect(mockOnModify).toHaveBeenCalledWith({});
        });
    });

    describe("Edge Cases", () => {
        it("should handle device with null values", () => {
            render(
                <FieldEditor
                    currentDevice={{
                        manufacturer: 1, // Garmin
                        product: 1735, // Edge 820
                        serialNumber: null,
                        softwareVersion: null,
                    }}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // Check for multiple "N/A" hints (serial number and software version)
            const naHints = screen.getAllByText(/Current: N\/A/);
            expect(naHints).toHaveLength(2);
            expect(screen.getByLabelText(/Serial Number:/)).toHaveValue(null);
            expect(screen.getByLabelText(/Software Version:/)).toHaveValue(
                null
            );
        });

        it("should render buttons with correct classes", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const cancelButton = screen.getByText("Cancel");
            const submitButton = screen.getByText("Apply Changes & Download");

            expect(cancelButton).toHaveClass("button-secondary");
            expect(submitButton).toHaveClass("button-primary");
        });

        it("should sort manufacturers alphabetically in dropdown", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const manufacturerSelect = screen.getByLabelText(
                /Manufacturer:/
            ) as HTMLSelectElement;
            const options = Array.from(manufacturerSelect.options).slice(1); // Skip the "-- Select --" option

            // Check that options are sorted alphabetically
            const optionTexts = options.map((opt) => opt.text);
            const sortedTexts = [...optionTexts].sort((a, b) =>
                a.localeCompare(b)
            );

            expect(optionTexts).toEqual(sortedTexts);
        });

        it("should sort products alphabetically within manufacturer", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // Manufacturer 1 (Garmin) is already selected, products should be sorted
            const productSelect = screen.getByLabelText(
                /Product:/
            ) as HTMLSelectElement;
            const options = Array.from(productSelect.options).slice(1); // Skip the "-- Select --" option

            // Check that product options are sorted alphabetically
            const productTexts = options.map((opt) => opt.text);
            const sortedProducts = [...productTexts].sort((a, b) =>
                a.localeCompare(b)
            );

            expect(productTexts).toEqual(sortedProducts);
        });

        it("should show placeholder when manufacturer has no products", () => {
            render(
                <FieldEditor
                    currentDevice={{
                        manufacturer: 5, // Polar - has no products in our map
                        product: undefined,
                        serialNumber: 123456,
                        softwareVersion: 1.0,
                    }}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // Should show enabled input with "No products available" placeholder
            const productInput = screen.getByLabelText(/Product:/);
            expect(productInput).toHaveAttribute("type", "number");
            expect(productInput).toHaveAttribute(
                "placeholder",
                "No products available"
            );
            expect(productInput).not.toBeDisabled();
        });
    });

    describe("LocalStorage Persistence", () => {
        it("should save manufacturer selection to localStorage", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const manufacturerSelect = screen.getByLabelText(/Manufacturer:/);
            fireEvent.change(manufacturerSelect, { target: { value: "32" } }); // Wahoo

            expect(
                localStorage.getItem("fitfiles_preferred_manufacturer")
            ).toBe("32");
        });

        it("should save product selection to localStorage", () => {
            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // First select a manufacturer
            const manufacturerSelect = screen.getByLabelText(/Manufacturer:/);
            fireEvent.change(manufacturerSelect, { target: { value: "1" } }); // Garmin

            // Then select a product
            const productSelect = screen.getByLabelText(/Product:/);
            fireEvent.change(productSelect, { target: { value: "2238" } }); // Venu 2

            expect(localStorage.getItem("fitfiles_preferred_product")).toBe(
                "2238"
            );
        });

        it("should load manufacturer from localStorage on mount", () => {
            localStorage.setItem("fitfiles_preferred_manufacturer", "32"); // Wahoo

            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const manufacturerSelect = screen.getByLabelText(
                /Manufacturer:/
            ) as HTMLSelectElement;
            expect(manufacturerSelect.value).toBe("32");
        });

        it("should load product from localStorage on mount", () => {
            localStorage.setItem("fitfiles_preferred_manufacturer", "1"); // Garmin
            localStorage.setItem("fitfiles_preferred_product", "2238"); // Venu 2

            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const productSelect = screen.getByLabelText(
                /Product:/
            ) as HTMLSelectElement;
            expect(productSelect.value).toBe("2238");
        });

        it("should clear product from localStorage when manufacturer changes", () => {
            localStorage.setItem("fitfiles_preferred_manufacturer", "1"); // Garmin
            localStorage.setItem("fitfiles_preferred_product", "2238"); // Venu 2

            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // Change to a different manufacturer
            const manufacturerSelect = screen.getByLabelText(/Manufacturer:/);
            fireEvent.change(manufacturerSelect, { target: { value: "32" } }); // Wahoo

            // Product should be cleared from localStorage since it's not valid for Wahoo
            expect(
                localStorage.getItem("fitfiles_preferred_product")
            ).toBeNull();
        });

        it("should remove manufacturer from localStorage when cleared", () => {
            localStorage.setItem("fitfiles_preferred_manufacturer", "1");

            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            const manufacturerSelect = screen.getByLabelText(/Manufacturer:/);
            fireEvent.change(manufacturerSelect, { target: { value: "" } });

            expect(
                localStorage.getItem("fitfiles_preferred_manufacturer")
            ).toBeNull();
        });

        it("should remove product from localStorage when cleared", () => {
            localStorage.setItem("fitfiles_preferred_product", "2238");

            render(
                <FieldEditor
                    currentDevice={defaultDevice}
                    onModify={mockOnModify}
                    onCancel={mockOnCancel}
                />
            );

            // First select manufacturer to enable product select
            const manufacturerSelect = screen.getByLabelText(/Manufacturer:/);
            fireEvent.change(manufacturerSelect, { target: { value: "1" } });

            const productSelect = screen.getByLabelText(/Product:/);
            fireEvent.change(productSelect, { target: { value: "" } });

            expect(
                localStorage.getItem("fitfiles_preferred_product")
            ).toBeNull();
        });
    });
});
