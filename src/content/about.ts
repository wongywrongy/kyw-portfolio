export interface AboutSection {
  title: string
  content: string
}

export const aboutContent = {
  title: "About Me",
  sections: [
    {
      title: "Introduction",
      content: "I am a current sophomore at San José State University pursuing a B.S. in Computer Science. My academic and project experiences have cultivated a strong interest in systems-level work and a deep understanding of how software operates beneath the abstraction layers. I took a semester abroad at 성균관대학교 (Sungkyunkwan University) where I studied Applied Artificial Intelligence. I strive to maintain a diverse skill set and approach every project with efficiency, precision, and detail."
    },
    {
      title: "Foundations",
      content: "My coursework and projects span full-stack applications through kernel-adjacent and embedded systems. I am well-versed in theory—data structures, algorithms, programming paradigms, and elements of big-data thinking—and I translate that theory into robust implementations. Studies in Korea broadened my perspective into machine learning and AI, helping me connect traditional systems engineering with modern AI-driven approaches."
    },
    {
      title: "Spartan Racing",
      content: "I am part of Spartan Racing (FSAE) in both R&D and Software roles. I helped modernize a legacy VCU codebase in C into a coherent embedded architecture, improving algorithmic efficiency under real-time constraints. I also designed a physics-informed torque-vectoring controller that allocates wheel torque deterministically in a time-critical environment. In parallel, I contribute to launch-control improvements where code decisions translate directly into on-track performance. These roles combine rigorous software engineering with vehicle dynamics to deliver measurable results."
    },
    {
      title: "Open Source w/ Debian",
      content: "I contribute to the Debian ecosystem, sustaining packages across x86 and ARM by reproducing crashes, diagnosing regressions, and landing architecture-aware patches. This work sharpened my debugging discipline, command of Linux tooling, and attention to portability and reliability across build and release pipelines. It has also deepened my understanding of how low-level choices ripple through system libraries in production."
    },
    {
      title: "Full-Stack Development",
      content: "Beyond systems work, I build end-to-end applications across the frontend and backend and deploy them on cloud platforms. I focus on responsive UX, clean interfaces, and reliable APIs, then leverage managed services to scale and simplify operations. These projects keep me fluent at the product layer while reinforcing engineering fundamentals learned at the systems layer."
    },
    {
      title: "Personal Interests",
      content: "Outside of academics and software, I enjoy playing badminton competitively where I made it to both the regional and state level. Badminton has been a passion that keeps me active and engaged with community events.\n\nI am also deeply interest in photography. I have a Fujifilm X-T5 with various prime lenses. I enjoy capturing street photography and portraits. I am still working on composition and perspective to enhance my visuals. This is my creative outlet and a fun hobby of mine."
    }
  ]
}
