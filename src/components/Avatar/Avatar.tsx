import styles from './Avatar.module.scss';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'normal' | 'small';
}

export function Avatar({ src, alt, size = 'normal' }: AvatarProps) {
  const className = size === 'small' ? styles.avatarSmall : styles.avatar;

  return <img src={src} alt={alt} className={className} loading="lazy" />;
}
