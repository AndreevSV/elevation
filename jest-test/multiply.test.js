import { multiply } from "./multiply";

describe("multiply", () => {
  it("should multiplay two positive numbers", () => {
    const expectedResult = 9;
    const actualResult = multiply(3, 3);
    expect(actualResult).toBe(expectedResult);
  });


  it('should multiplay two negative numbers', () => {
    const expectedResult = 9;
    const actualResult = multiply(-3, -3);
    expect(actualResult).toBe(expectedResult);
  })

  it('should multiply one positive and one negative numbers', () => {
    const expectedResult = -9;
    const actualResult = multiply(-3, 3);
    expect(actualResult).toBe(expectedResult);
  })
});
