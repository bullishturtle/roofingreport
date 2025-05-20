import { screen, waitFor, fireEvent } from "@/lib/test-utils"
import { render } from "@/lib/test-utils"
import { HeroSearch } from "./hero-search"

// Mock the window.location.href assignment
const mockAssign = jest.fn()
Object.defineProperty(window, "location", {
  value: { href: mockAssign },
  writable: true,
})

describe("HeroSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the search input and button", () => {
    render(<HeroSearch />)

    expect(screen.getByPlaceholderText(/enter any property address/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /get instant report/i })).toBeInTheDocument()
  })

  it("shows validation error for empty address", async () => {
    render(<HeroSearch />)

    const input = screen.getByPlaceholderText(/enter any property address/i)
    fireEvent.focus(input)
    fireEvent.blur(input)

    await waitFor(() => {
      expect(screen.getByText(/please enter an address/i)).toBeInTheDocument()
    })
  })

  it("clears the input when clear button is clicked", async () => {
    render(<HeroSearch />)

    const input = screen.getByPlaceholderText(/enter any property address/i)
    fireEvent.change(input, { target: { value: "123 Main St" } })

    await waitFor(() => {
      expect(input).toHaveValue("123 Main St")
    })

    const clearButton = screen.getByRole("button", { name: /clear/i })
    fireEvent.click(clearButton)

    await waitFor(() => {
      expect(input).toHaveValue("")
    })
  })

  it("submits the form and redirects on valid address", async () => {
    render(<HeroSearch />)

    const input = screen.getByPlaceholderText(/enter any property address/i)
    fireEvent.change(input, { target: { value: "123 Main St, Anytown, USA" } })

    const submitButton = screen.getByRole("button", { name: /get instant report/i })
    fireEvent.click(submitButton)

    // Check if button shows loading state
    await waitFor(() => {
      expect(screen.getByText(/searching/i)).toBeInTheDocument()
    })

    // Wait for the simulated API call to complete
    await waitFor(
      () => {
        expect(mockAssign).toHaveBeenCalledWith("/report?address=123%20Main%20St%2C%20Anytown%2C%20USA")
      },
      { timeout: 2000 },
    )
  })
})
