import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: "Post title 1",
            body: "This is the body of post 1",
            userId: 1
          },
          {
            id: 2,
            title: "Post title 2",
            body: "This is the body of post 2",
            userId: 2
          }
        ])
    });
    global.fetch = fetchMock;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("loads and displays posts", async () => {
    render(<App />);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const postTitles = await screen.findAllByText(/Post title [1-2]i/);
    expect(postTitles.length).toBeGreaterThan(0);

    const postBodies = await screen.findAllByText(
      /This is the body of post [1-2]i/
    );
    expect(postTitles.length).toBeGreaterThan(0);
  });
});
