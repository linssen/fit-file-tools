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
        manufacturer: "garmin",
        product: "edge1030",
        serialNumber: 123456789,
        softwareVersion: 5.2,
    };

    beforeEach(() => {
        jest.clearAllMocks();
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

            expect(screen.getByText(/Current: garmin/)).toBeInTheDocument();
            expect(screen.getByText(/Current: edge1030/)).toBeInTheDocument();
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

            expect(screen.getByLabelText(/Manufacturer:/)).toHaveValue(
                "garmin"
            );
            expect(screen.getByLabelText(/Product:/)).toHaveValue("edge1030");
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
            fireEvent.change(input, { target: { value: "wahoo" } });

            expect(input).toHaveValue("wahoo");
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
            fireEvent.change(input, { target: { value: "elemnt" } });

            expect(input).toHaveValue("elemnt");
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
            fireEvent.change(manufacturerInput, { target: { value: "wahoo" } });

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
                manufacturer: "wahoo",
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
                target: { value: "wahoo" },
            });
            fireEvent.change(screen.getByLabelText(/Product:/), {
                target: { value: "elemnt" },
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
                manufacturer: "wahoo",
                product: "elemnt",
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
                        manufacturer: "garmin",
                        product: "edge",
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
    });
});
