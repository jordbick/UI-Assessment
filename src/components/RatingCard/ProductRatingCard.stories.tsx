import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { ProductRatingCard } from "./ProductRatingCard";

const meta: Meta<typeof ProductRatingCard> = {
  title: "Components/ProductRatingCard",
  component: ProductRatingCard,
  argTypes: {
    desc: {
      control: "boolean",
      description: "Descending order of ratings in the bar",
      defaultValue: true,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Displays an aggregate rating card with star rating, brand, and breakdown. Counts are normalized so missing buckets become 0, negatives are clamped to 0, and outOf is derived from the largest positive key.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductRatingCard>;

export const FiveStarTypical: Story = {
  name: "5-star typical distribution",
  args: {
    counts: { 5: 952, 4: 171, 3: 55, 2: 14, 1: 40 },
    desc: true,
  },
};

export const DerivedOutOf6WithGaps: Story = {
  name: "Derived outOf=6 with gaps normalized",
  args: {
    counts: { 6: 2, 5: 1, 3: 4 }, // 1,2,4 missing; will be 0
    desc: true,
  },
};

export const NegativeKeysAndValuesIgnored: Story = {
  name: "Negative keys and values are ignored/clamped",
  args: {
    counts: { [-1]: 10, 0: 5, 2: 3, 4: -13 } as unknown as Record<
      number,
      number
    >,
    desc: true,
  },
};

export const NonFiniteAndStringValues: Story = {
  name: "Non-finite & string values normalize",
  args: {
    counts: {
      2: "7" as unknown as number,
      4: "abc" as unknown as number,
      1: Number.NaN as unknown as number,
      3: Infinity as unknown as number,
    },
    desc: true,
  },
};

export const Empty: Story = {
  name: "Empty input",
  args: {
    counts: {},
    desc: true,
  },
};
``;
