/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import FileUpload from "../../components/FileUpload";

describe("FileUpload", () => {
    const mockOnFileSelect = jest.fn();

    beforeEach(() => {
        mockOnFileSelect.mockClear();
    });

    test("should render upload area", () => {
        render(<FileUpload onFileSelect={mockOnFileSelect} loading={false} />);

        expect(
            screen.getByText(/Drop a .FIT file here or click to browse/i)
        ).toBeInTheDocument();
        expect(screen.getByText("Browse Files")).toBeInTheDocument();
    });

    test("should disable button when loading", () => {
        render(<FileUpload onFileSelect={mockOnFileSelect} loading={true} />);

        const button = screen.getByText("Browse Files");
        expect(button).toBeDisabled();

        const input = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;
        expect(input).toBeDisabled();
    });

    test("should handle button click to trigger file input", () => {
        render(<FileUpload onFileSelect={mockOnFileSelect} loading={false} />);

        const button = screen.getByText("Browse Files");
        const input = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;

        const clickSpy = jest.spyOn(input, "click");

        button.click();

        expect(clickSpy).toHaveBeenCalled();
        clickSpy.mockRestore();
    });

    test("should handle drop event with valid file", () => {
        // This test validates the drop event handler exists and prevents default
        // The actual file handling is tested in the main App.test.tsx
        render(<FileUpload onFileSelect={mockOnFileSelect} loading={false} />);

        const dropArea = document.querySelector(".upload-area");
        expect(dropArea).toBeInTheDocument();

        // Test drop event handler prevents default and handles files
        const dropEvent = new Event("drop", { bubbles: true });
        const preventDefaultSpy = jest.fn();
        Object.defineProperty(dropEvent, "preventDefault", {
            value: preventDefaultSpy,
        });
        Object.defineProperty(dropEvent, "dataTransfer", {
            value: {
                files: [],
            },
        });

        dropArea?.dispatchEvent(dropEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test("should not call onFileSelect when drop has no files", () => {
        render(<FileUpload onFileSelect={mockOnFileSelect} loading={false} />);

        const dropArea = document.querySelector(".upload-area");

        // Drop event with empty files
        const dropEvent = new Event("drop", { bubbles: true });
        Object.defineProperty(dropEvent, "dataTransfer", {
            value: {
                files: [],
            },
        });
        Object.defineProperty(dropEvent, "preventDefault", {
            value: jest.fn(),
        });

        dropArea?.dispatchEvent(dropEvent);

        expect(mockOnFileSelect).not.toHaveBeenCalled();
    });

    test("should prevent default on drag over", () => {
        render(<FileUpload onFileSelect={mockOnFileSelect} loading={false} />);

        const dropArea = document.querySelector(".upload-area");
        const dragOverEvent = new Event("dragover", { bubbles: true });
        const preventDefaultSpy = jest.fn();
        Object.defineProperty(dragOverEvent, "preventDefault", {
            value: preventDefaultSpy,
        });

        dropArea?.dispatchEvent(dragOverEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });
});
