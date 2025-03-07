// import { render, screen, fireEvent } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Volume } from "./Volume";
import { useState } from "react";

describe("Volume Component", () => {
  test("renders without crashing", () => {
    render(<Volume value={0.5} onChange={jest.fn()} />);
    expect(screen.getByTitle("Mute")).toBeInTheDocument();
    expect(screen.getByTitle("Volume")).toBeInTheDocument();
  });

  test("toggles mute state when button is clicked", async () => {
    const mockOnChange = jest.fn();
    render(<Volume value={0.5} onChange={mockOnChange} />);

    await userEvent.click(screen.getByTitle("Mute"));

    expect(mockOnChange).toHaveBeenCalledWith(0);
  });

  test("restores last volume when unmuted", async () => {
    const mockOnChange = jest.fn();
    const volume = 0.5;

    function TestEnv() {
      const [value, setValue] = useState<number>(volume);
  
      const handleVolumeChange = (value: number) => {
        mockOnChange(value);
        setValue(value);
      };
  
      return <Volume value={value} onChange={handleVolumeChange} />;
    }

    render(<TestEnv />);

    const muteButton = screen.getByTitle("Mute");

    await userEvent.click(muteButton);

    expect(mockOnChange).toHaveBeenCalledWith(0);

    await userEvent.click(muteButton);

    expect(mockOnChange).toHaveBeenCalledWith(volume);
  });

  test("updates volume when slider is moved", async () => {
    const mockOnChange = jest.fn();
    render(<Volume value={0.5} onChange={mockOnChange} />);

    const slider = screen.getByTitle("Volume");
    const thumb = slider.querySelector("[role='slider']")!;

    await userEvent.click(thumb); // Click to focus
    await userEvent.keyboard("{ArrowRight}"); // Simulate right arrow key

    expect(mockOnChange).toHaveBeenCalled();
  });
});
