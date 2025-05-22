import Link from 'next/link';

interface CardProps {
  title: string;
  tags?: string[];
  period?: string;
  description: string;
  links?: Array<{ url: string; label: string; icon?: string }>;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  tagsClassName?: string;
  tagClassName?: string;
  linksClassName?: string;
  linkClassName?: string;
}

export default function Card({
  title,
  tags = [],
  period,
  description,
  links = [],
  className = "project-card",
  headerClassName = "project-header",
  bodyClassName = "project-body",
  tagsClassName = "project-tags",
  tagClassName = "project-tag",
  linksClassName = "project-links",
  linkClassName = "project-link"
}: CardProps) {
  return (
    <div className={className}>
      <div className={headerClassName}>
        <h3>{title}</h3>
        {period && <p className="work-period">{period}</p>}
        {tags.length > 0 && tagsClassName.includes("project") && (
          <div className={tagsClassName}>
            {tags.map((tag, index) => (
              <span key={index} className={tagClassName}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className={bodyClassName}>
        <p>{description}</p>
        {links.length > 0 && (
          <div className={linksClassName}>
            {links.map((link, index) => (
              <Link key={index} href={link.url} className={linkClassName} target="_blank" rel="noopener noreferrer">
                {link.icon && <i className={link.icon}></i>} {link.label}
              </Link>
            ))}
          </div>
        )}
        {tags.length > 0 && tagsClassName.includes("work") && (
          <div className={tagsClassName}>
            {tags.map((tag, index) => (
              <span key={index} className={tagClassName}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
