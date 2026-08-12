export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type HowToStep = {
  name: string;
  text: string;
  image?: string;
  url?: string;
};

export type HowToSupply = {
  name: string;
};

export type HowToTool = {
  name: string;
};

export type MonetaryAmount = {
  currency: string;
  value: string;
};

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFAQPage(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildHowTo(options: {
  name: string;
  description?: string;
  steps: HowToStep[];
  image?: string;
  totalTime?: string;
  supply?: HowToSupply[];
  tool?: HowToTool[];
  estimatedCost?: MonetaryAmount;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: options.name,
    description: options.description || "",
    ...(options.image ? { image: options.image } : {}),
    ...(options.totalTime ? { totalTime: options.totalTime } : {}),
    ...(options.estimatedCost
      ? {
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: options.estimatedCost.currency,
            value: options.estimatedCost.value,
          },
        }
      : {}),
    ...(options.supply
      ? {
          supply: options.supply.map((s) => ({
            "@type": "HowToSupply",
            name: s.name,
          })),
        }
      : {}),
    ...(options.tool
      ? {
          tool: options.tool.map((t) => ({
            "@type": "HowToTool",
            name: t.name,
          })),
        }
      : {}),
    step: options.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
      ...(step.image ? { image: step.image } : {}),
      ...(step.url ? { url: step.url } : {}),
    })),
  };
}

export function buildAggregateRating(options: {
  ratingValue: string;
  reviewCount: string;
  bestRating?: string;
  worstRating?: string;
}) {
  return {
    "@type": "AggregateRating",
    ratingValue: options.ratingValue,
    reviewCount: options.reviewCount,
    bestRating: options.bestRating || "5",
    worstRating: options.worstRating || "1",
  };
}

export function buildReview(options: {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: string;
  name?: string;
  bestRating?: string;
  worstRating?: string;
}) {
  return {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: options.author,
    },
    datePublished: options.datePublished,
    reviewBody: options.reviewBody,
    ...(options.name ? { name: options.name } : {}),
    reviewRating: {
      "@type": "Rating",
      ratingValue: options.ratingValue,
      bestRating: options.bestRating || "5",
      worstRating: options.worstRating || "1",
    },
  };
}
