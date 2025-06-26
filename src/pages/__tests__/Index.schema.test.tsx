import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import Index from "../Index";

describe("Schema Markup en Index", () => {
  it("incluye schema Product y HowTo en el HTML y son JSON válidos", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      const scripts = Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'));
      expect(scripts.length).toBeGreaterThan(0);

      const foundProduct = scripts.some(script => script.innerHTML.includes('"@type":"Product"'));
      const foundHowTo = scripts.some(script => script.innerHTML.includes('"@type":"HowTo"'));

      expect(foundProduct).toBe(true);
      expect(foundHowTo).toBe(true);

      scripts.forEach((script) => {
        expect(() => JSON.parse(script.innerHTML)).not.toThrow();
      });
    });
  });
});
