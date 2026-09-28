export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Sahdan Ramadhan",
    url: "https://ndhasss.vercel.app",
    image: "https://ndhasss.vercel.app/pp2.jpeg",
    jobTitle: "Software Engineer",
    description: "Software engineer, fotografer, dan gamer.",
    sameAs: [
      "https://linkedin.com/in/muhammad-sahdan-ramadhan-9b464a411",
      "https://github.com/sahdanEl-Dev",
      "https://instagram.com/shdn_54",
      "https://tiktok.com/@ndhasss_",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}