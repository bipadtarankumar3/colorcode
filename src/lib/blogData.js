export const BLOG_POSTS = [
  {
    slug: "color-theory-basics",
    title: "A Practical Guide to Color Theory & Harmonies for Digital Designers",
    date: "October 18, 2026",
    readTime: "6 min read",
    category: "Color Theory",
    summary: "Understand complementary, analogous, triadic, and monochromatic harmonies—and how to apply them directly into real-world UI design systems.",
    content: `
Color theory is often taught as an abstract, academic discipline rooted in traditional painting pigments (RYB). But on computer screens, we work with additive light (RGB), pixels, and digital color spaces. Understanding how color relationships translate to digital product design can turn an ordinary layout into an elegant, coherent user experience.

### The Foundation: The Digital Color Wheel

The digital color wheel represents the continuous spectrum of visible hues arranged in a 360-degree circle:
- **0° / 360°**: Red
- **60°**: Yellow
- **120°**: Green
- **180°**: Cyan
- **240°**: Blue
- **300°**: Magenta

When selecting colors for web applications, mathematical relationships along this wheel create specific emotional and visual responses.

### 1. Complementary Harmonies (180° Apart)
Complementary colors sit directly opposite each other on the color wheel—such as blue and orange, or teal and coral. Because they have maximum hue contrast, complementary pairs create strong visual energy.

**How to use in UI:**
Never use complementary colors in equal 50/50 proportions, as this causes eye vibration. Instead, designate one hue as the dominant background or brand tone (85–90% of the surface area), and use the complement strictly as a high-visibility accent for Call-to-Action (CTA) buttons, notifications, or key focal points.

### 2. Analogous Harmonies (Adjacent Hues, ±30°)
Analogous colors sit next to each other on the wheel—for example, deep blue, cyan, and teal. Because they share underlying color characteristics, they produce a naturally serene, unified aesthetic found frequently in nature.

**How to use in UI:**
Analogous palettes are ideal for data visualizations, dashboards, and background gradients where multiple related categories need visual distinction without jarring contrast.

### 3. Triadic Harmonies (120° Equidistant)
Triadic schemes use three colors evenly spaced around the circle (e.g. violet, amber, and mint). This offers high visual variety while maintaining balance.

**How to use in UI:**
Pick one hue as the core anchor. Use the second hue for secondary interactive states, and reserve the third hue for warnings or special highlights.

### 4. Monochromatic Palettes
A monochromatic palette relies on a single hue, varying only in saturation and lightness. This is the backbone of modern minimalist design (such as Stripe, Linear, or Apple).

**Pro-Tip:**
When building dark mode or light gray UI surfaces, avoid pure neutral grays (\`#808080\`). Instead, tint your grays with 2–5% of your primary brand hue (e.g., cool slate for blue brands, or warm stone for terracotta brands). This subtle tint grounds the interface and makes it feel cohesive.
    `
  },
  {
    slug: "wcag-contrast-standards",
    title: "Demystifying WCAG 2.1 Contrast: Making Web Apps Accessible to Everyone",
    date: "October 12, 2026",
    readTime: "7 min read",
    category: "Accessibility",
    summary: "Learn how the Web Content Accessibility Guidelines calculate contrast ratios, why AA compliance matters for legal and user experience reasons, and practical tips to pass every test.",
    content: `
Web accessibility isn't just a legal checkbox or an edge-case consideration. Over 2.2 billion people worldwide live with some form of vision impairment, including low vision, color blindness, and age-related loss of contrast sensitivity. Moreover, every user experiences situational disability—such as attempting to read a phone screen outdoors in bright sunlight.

### What is Relative Luminance?

The Web Content Accessibility Guidelines (WCAG) calculate contrast by measuring **relative luminance**—the relative brightness of any point in a colorspace, normalized to 0 for the darkest black and 1 for the lightest white.

The contrast ratio formula is:
\`\`\`
Ratio = (L1 + 0.05) / (L2 + 0.05)
\`\`\`
Where \`L1\` is the relative luminance of the lighter color, and \`L2\` is the relative luminance of the darker color. The resulting ratio ranges from **1:1** (no contrast, identical colors) to **21:1** (black on white).

### WCAG 2.1 Conformance Levels

1. **Level AA (Minimum Standard for Modern Web):**
   - **Regular Text (under 18pt or 14pt bold):** Requires at least **4.5:1** contrast ratio.
   - **Large Text (18pt+ or 14pt+ bold):** Requires at least **3.0:1** contrast ratio.
   - **UI Components & Graphical Objects:** Form inputs, borders, icons, and focus indicators require at least **3.0:1** against adjacent colors.

2. **Level AAA (Enhanced Standard):**
   - **Regular Text:** Requires at least **7.0:1**.
   - **Large Text:** Requires at least **4.5:1**.

### Common Contrast Traps in Modern Web Design

- **Light gray placeholders in inputs:** Many forms use placeholder text with a contrast ratio of 2:1 or lower, making instructions invisible to millions of users.
- **Orange and yellow buttons with white text:** Yellow and light orange have high inherent luminance. Placing white text on an orange button almost always fails Level AA. Use dark charcoal text or a deeper amber hue instead.
- **Subtle borders on active focus rings:** Ensure your keyboard focus outline has at least a 3:1 contrast against both the inner button and the outer background.

Using the built-in WCAG Contrast Checker in Color Codes lets you test both foreground and background combinations with real-time AA/AAA validation before writing a single line of CSS.
    `
  },
  {
    slug: "understanding-oklch-hex-rgb",
    title: "From HEX to OKLCH: The Evolution of Color on the Modern Web",
    date: "September 28, 2026",
    readTime: "8 min read",
    category: "CSS & Web",
    summary: "Why traditional sRGB and HSL spaces fail in modern browser design systems, and how OKLCH brings perceptual uniformity and wider gamuts to CSS Color 4.",
    content: `
For over twenty-five years, web developers have relied on hexadecimal values (\`#ff0000\`) and \`rgb()\` or \`hsl()\` strings to style web pages. But as display technology advanced to wide-gamut P3 screens (like modern iPhones, MacBooks, and high-end monitors), the flaws of the legacy sRGB model became glaringly apparent.

Enter **OKLCH**, introduced in CSS Color Module Level 4 and supported across all modern browsers today.

### The Problem With Traditional HSL

HSL (Hue, Saturation, Lightness) was designed in the 1970s as a human-friendly model of RGB. However, HSL is **not perceptually uniform**.

In HSL:
- Pure Yellow (\`hsl(60, 100%, 50%)\`) has a lightness of 50%.
- Pure Blue (\`hsl(240, 100%, 50%)\`) also has a lightness of 50%.

To human eyes, however, yellow appears blindingly bright, while blue appears dark and heavy. If you programmatically build a design system palette in HSL by keeping lightness constant while changing the hue, your yellow button will be unreadable with white text, while your blue button will pass contrast tests.

### How OKLCH Solves This

OKLCH stands for:
- **L (Lightness):** 0% to 100% (or 0.0 to 1.0). Perceptually uniform across all hues!
- **C (Chroma):** The color saturation/purity (typically 0.0 to 0.4+).
- **H (Hue):** The hue angle from 0 to 360 degrees.

Because OKLCH is based on human visual perception (modeled by Björn Ottosson in 2020), a Lightness of \`0.6\` in OKLCH has the **exact same perceived brightness** whether the hue is yellow, green, blue, or purple.

### Native CSS Syntax

In modern CSS, you can use OKLCH directly:
\`\`\`css
:root {
  --brand-primary: oklch(0.65 0.22 250);
  --brand-accent:  oklch(0.65 0.22 30);
}
\`\`\`

Because both colors share the exact same lightness (\`0.65\`) and chroma (\`0.22\`), swapping them in buttons, borders, or navigation bars maintains identical contrast against white or dark backgrounds.
    `
  },
  {
    slug: "creating-design-system-palettes",
    title: "How to Build Predictable, Scalable Color Palettes for Design Systems",
    date: "September 14, 2026",
    readTime: "7 min read",
    category: "Design Systems",
    summary: "Step-by-step strategy for crafting systematic 50–950 shade scales, semantic color tokens, and robust theme architectures.",
    content: `
A robust design system needs more than just a primary and secondary color. When engineering real-world applications with modals, tooltips, data tables, badges, and interactive form states, you need a predictable scale of tints and shades.

### The 10-Step Scale (50 to 950)

Popularized by Tailwind CSS and Material Design, the numeric 50–950 naming convention has become the industry standard:
- **50–100:** Subtle background washes, hover tints, and table zebra striping.
- **200–300:** Card borders, divider rules, and disabled input backgrounds.
- **400–500:** Secondary icons, placeholder text, and active indicators.
- **600:** The primary brand anchor for buttons, links, and key highlights.
- **700–800:** Hover and active button states; high-contrast headings.
- **900–950:** Deep charcoal typography and solid background surfaces in dark themes.

### Decoupling Primitives From Semantics

One of the most common mistakes when authoring CSS is hardcoding brand names directly into component classes (e.g. \`.btn-blue\`).

Instead, structure your tokens in two distinct layers:
1. **Primitive Tokens (Raw values):**
   \`--blue-500: #3b82f6;\`
   \`--emerald-500: #10b981;\`

2. **Semantic Tokens (Intent & Context):**
   \`--color-interactive: var(--blue-500);\`
   \`--color-success: var(--emerald-500);\`
   \`--surface-card: #ffffff;\`
   \`--border-subtle: #e2e8f0;\`

When you decide to rebrand or introduce a dark theme, your components remain untouched—you simply swap the semantic token references at the root.
    `
  }
];
