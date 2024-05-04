import Link from 'next/link';
import styles from './Breadcrumb.module.scss';

interface BreadcrumbProps {
    trails: { name: string; link: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ trails }) => {
    return (
        <nav className={styles.breadcrumb}>
            <ul>
                {trails.map((trail, index) => (
                    <li key={index}>
                        <Link href={trail.link}>
                            {trail.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
