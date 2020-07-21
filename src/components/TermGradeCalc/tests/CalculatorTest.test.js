import React from "react";
import {
  scoreWithCoeffCount,
  ExamScoreWithCoeffCount,
  ExamScoreCount,
} from "../Calculator";

describe("Calculating score with coefficient correctly", () => {
  test("Function is defined", () => {
    expect(scoreWithCoeffCount).toBeDefined();
  });

  describe("Calculations", () => {
    test.each([
      [80, 1, "56.00"],
      [85, 1, "59.50"],
      [62, 0.6, "26.04"],
      [79.21, 0.4, "22.18"],
      [89, 0.3, "18.69"],
      [79, 0.2, "11.06"],
      [87, 0.5, "30.45"],
      [70, 0.25, "12.25"],
      [100, 0.25, "17.50"],
    ])("where score = %d, coeff = %d", (score, coeff, expected) => {
      expect(scoreWithCoeffCount(score, coeff, 0.7).toFixed(2)).toEqual(
        expected
      );
    });
  });
});

describe("Calculating examination score with coefficient correctly", () => {
  test("Function is defined", () => {
    expect(ExamScoreWithCoeffCount).toBeDefined();
  });

  describe("Calculations", () => {
    test.each([
      [1, [0], "100.00"],
      [1, [56], "44.00"],
      [1, [59.5], "40.50"],

      [2, [26.04, 22.18], "51.78"],
      [2, [33.03, 23.46], "43.51"],
      [2, [39.55, 21.55], "38.90"],

      [3, [18.69, 11.06, 30.45], "39.80"],
      [3, [15.70, 11.78, 29.95], "42.57"],
      [3, [20.25, 12.52, 29.87], "37.36"],

      [4, [12.25, 12.25, 17.5, 17.5], "40.50"],
      [4, [13.36, 12.48, 27.57, 7.81], "38.78"],
      [4, [14.78, 11.15, 20.78, 9.62], "43.67"],
    ])("where num = %i and scores: %o", (num, scoreWithCoeff, expected) => {
      let termsInfo = [];

      for (let index = 0; index < num; index++) {
        termsInfo.push({
          num: index + 1,
          scoreWithCoeff: scoreWithCoeff[index],
        });
      }

      expect(ExamScoreWithCoeffCount(termsInfo)).toEqual(expected);
    });
  });
});

describe("Calculating examination score correctly", () => {
  test("Function is defined", () => {
    expect(ExamScoreCount).toBeDefined();
  });

  describe("Calculations", () => {
    test.each([
      [35, false, false, ":("],
      [35, false, true, ":("],
      [35, true, false, ":("],
      [35, true, true, ":("],
      [32, false, false, ":("],
      [32, false, true, "106.67"],
      [32, true, false, ":("],
      [32, true, true, "106.67"],
      [31.55, false, false, ":("],
      [31.55, false, true, "105.17"],
      [31.55, true, false, ":("],
      [31.55, true, true, "105.17"],
      [30, false, false, "100.00"],
      [30, false, true, "100.00"],
      [30, true, false, "100.00"],
      [30, true, true, "100.00"],
      [25, false, false, "83.33"],
      [25, false, true, "83.33"],
      [25, true, false, "83.33"],
      [25, true, true, "83.33"],
      [21, false, false, ":)"],
      [21, false, true, ":)"],
      [21, true, false, "70.00"],
      [21, true, true, "70.00"],
      [20, false, false, ":)"],
      [20, false, true, ":)"],
      [20, true, false, "66.67"],
      [20, true, true, "66.67"],
      [19, false, false, ":)"],
      [19, false, true, ":)"],
      [19, true, false, ":)"],
      [19, true, true, ":)"],
      [18, false, false, ":)"],
      [18, false, true, ":)"],
      [18, true, false, ":)"],
      [18, true, true, ":)"],
    ])("where score = %d and downgrade: %s, increased: %s", (x, CanBeDowngrade, CanBeIncreased, expected) => {
      expect(ExamScoreCount(x, CanBeDowngrade, CanBeIncreased, 0.3)).toEqual(expected);
    });
  });
});
