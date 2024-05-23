import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  http.post("/api/bill", () => {
    return HttpResponse.json({
      id: "99",
    });
  }),
  http.put("/api/bill", async ({ request }) => {
    const data = await request.json();

    return HttpResponse.json(data);
  }),
  http.get("*", () => {
    return HttpResponse.json();
  })
);

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});
beforeEach(() => {
  server.resetHandlers();
});

export { server };
