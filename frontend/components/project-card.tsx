import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
  featured?: boolean;
}

export function ProjectCard({
  title,
  description,
  image,
  tags = [],
  link = '#',
  featured = false,
}: ProjectCardProps) {
  return (
    <a
      href={link}
      className={`group rounded-lg border border-border hover:border-accent transition overflow-hidden hover:shadow-md ${
        featured ? 'col-span-full md:col-span-2' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden bg-card ${
          featured ? 'h-64' : 'h-40'
        }`}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-5 bg-card">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
