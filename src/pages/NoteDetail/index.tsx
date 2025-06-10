import Button from '../../components/Button';
import IconClock from '../../components/Icons/IconClock';
import IconTag from '../../components/Icons/IconTag';
import styles from './style.module.css';

export default function NoteDetail({ title }) {
    return (
        <>
            <div className={styles.navContainer}>
                <Button variant="ghost" buttonText="Go Back" leftIcon="arrowLeft" />
                <div className={styles.rightControl}>
                    <Button variant="ghost" leftIcon="delete" />
                    <Button variant="ghost" leftIcon="archive" />
                    <Button variant="ghost" buttonText="Cancel" />
                    <Button variant="ghost" buttonText="Save Note" color="blue" />
                </div>
            </div>
            <h1 className={styles.title}>React Performance Optimization</h1>
            <div className={styles.property}>
                <IconTag className={styles.propertyIcon} />
                <div className={styles.propertyName}>Tags</div>
                <div>Dev, React</div>
                <IconClock className={styles.propertyIcon} />
                <div className={styles.propertyName}>Last edited</div>
                <time>29 Oct 2024</time>
            </div>
            <p className={styles.text}>
                Key performance optimization techniques:
                <br />
                <br />
                1. Code Splitting
                - Use React.lazy() for route-based splitting
                - Implement dynamic imports for heavy components
                <br />
                <br />
                2. Memoization
                - useMemo for expensive calculations
                - useCallback for function props
                - React.memo for component optimization
                <br />
                <br />
                3. Virtual List Implementation
                - Use react-window for long lists
                - Implement infinite scrolling
                <br />
                <br />
                TODO: Benchmark current application and identify bottlenecks
            </p>
        </>
    );
}
