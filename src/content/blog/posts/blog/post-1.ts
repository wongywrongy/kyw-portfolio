export const post = {
  id: 2,
  title: "Mathematical Foundations in Machine Learning",
  excerpt: "Exploring the mathematical concepts that power modern machine learning algorithms, from linear algebra to calculus and probability theory.",
  category: "blog",
  date: "2024-01-10",
  readTime: "8 min read",
  content: [
    {
      type: "text",
      content: "Machine learning is built on a solid foundation of mathematical concepts. Understanding these fundamentals is crucial for developing effective algorithms and interpreting their results."
    },
    {
      type: "heading",
      level: 2,
      content: "Basic Mathematical Concepts"
    },
    {
      type: "text",
      content: "Let's start with some fundamental mathematical expressions that you'll encounter in machine learning."
    },
    {
      type: "heading",
      level: 3,
      content: "Simple Equations"
    },
    {
      type: "text",
      content: "The most famous equation in physics:"
    },
    {
      type: "latex",
      display: true,
      content: "E = mc^2"
    },
    {
      type: "text",
      content: "The quadratic formula:"
    },
    {
      type: "latex",
      display: true,
      content: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
    },
    {
      type: "text",
      content: "A simple linear equation:"
    },
    {
      type: "latex",
      display: true,
      content: "y = mx + b"
    },
    {
      type: "heading",
      level: 3,
      content: "Calculus Examples"
    },
    {
      type: "text",
      content: "The derivative of a simple function:"
    },
    {
      type: "latex",
      display: true,
      content: "\\frac{d}{dx}(x^2) = 2x"
    },
    {
      type: "text",
      content: "An integral example:"
    },
    {
      type: "latex",
      display: true,
      content: "\\int_0^1 x^2 \\, dx = \\frac{1}{3}"
    },
    {
      type: "text",
      content: "A limit example:"
    },
    {
      type: "latex",
      display: true,
      content: "\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1"
    },
    {
      type: "heading",
      level: 2,
      content: "Linear Algebra Basics"
    },
    {
      type: "text",
      content: "Vectors and matrices are essential for representing data."
    },
    {
      type: "heading",
      level: 3,
      content: "Vector Operations"
    },
    {
      type: "text",
      content: "A simple 2D vector:"
    },
    {
      type: "latex",
      display: true,
      content: "\\mathbf{v} = \\begin{pmatrix} x \\\\ y \\end{pmatrix}"
    },
    {
      type: "text",
      content: "The dot product:"
    },
    {
      type: "latex",
      display: true,
      content: "\\mathbf{a} \\cdot \\mathbf{b} = a_1 b_1 + a_2 b_2"
    },
    {
      type: "heading",
      level: 2,
      content: "Probability Basics"
    },
    {
      type: "text",
      content: "Understanding probability is crucial for uncertainty quantification."
    },
    {
      type: "heading",
      level: 3,
      content: "Basic Probability"
    },
    {
      type: "text",
      content: "The probability of an event:"
    },
    {
      type: "latex",
      display: true,
      content: "P(A) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total outcomes}}"
    },
    {
      type: "text",
      content: "Bayes' Theorem:"
    },
    {
      type: "latex",
      display: true,
      content: "P(A|B) = \\frac{P(B|A) P(A)}{P(B)}"
    },
    {
      type: "heading",
      level: 2,
      content: "Code Example"
    },
    {
      type: "text",
      content: "Here's a simple Python function to calculate the derivative:"
    },
    {
      type: "image",
      src: "/assets/images/code-algorithms.jpg", // Local image path - just put your image files in public/assets/images/
      alt: "Code and algorithms",
      caption: "Implementation brings mathematical concepts to life",
      width: 1920, // Higher resolution for better quality
      height: 1080,
      quality: "high", // High quality setting
      format: "webp" // WebP format for best quality/size ratio
    },
    {
      type: "code",
      language: "python",
      filename: "derivative.py",
      content: `def derivative(f, x, h=0.0001):
    """
    Calculate the derivative of function f at point x
    using the limit definition
    """
    return (f(x + h) - f(x)) / h

# Example usage
def f(x):
    return x**2

# Calculate derivative of x^2 at x = 3
result = derivative(f, 3)
print(f"Derivative of x^2 at x=3: {result}")`
    },
    {
      type: "heading",
      level: 2,
      content: "Key Takeaways"
    },
    {
      type: "list",
      items: [
        "**Basic equations** are the foundation of mathematical thinking",
        "**Calculus concepts** like derivatives, integrals, and limits are essential",
        "**Linear algebra** provides tools for data representation",
        "**Probability** helps quantify uncertainty in predictions"
      ]
    },
    {
      type: "text",
      content: "These mathematical foundations provide the tools needed to understand, implement, and improve machine learning algorithms."
    }
  ],
  images: [
    {
      src: "/assets/images/math-chalkboard.jpg", // Local image path - just put your image files in public/assets/images/
      alt: "Mathematical equations on chalkboard",
      caption: "Mathematical concepts form the foundation of machine learning algorithms",
      width: 800,
      height: 400
    }
  ]
}
