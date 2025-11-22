import React from 'react';
import styles from './WellnessGoalsList.module.css';
import useGoalsStore from '../../store/useGoalsStore';
import { Link } from 'react-router-dom';

const GoalCard = ({ goal }) => {
    const { title, description, priority, targetDate, predefined, metric = {} } = goal;

    const renderSteps = () => {
        const target = Number(metric.count) || 0;
        const current = Number(metric.current) || 0;
        const pct = target ? Math.min(100, Math.round((current / target) * 100)) : 0;
        return (
            <>
                <div className={styles.bigValue}>
                    {current}/{target} steps
                </div>
                <div className={styles.progress}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                    </div>
                    <div className={styles.pct}>{pct}%</div>
                </div>
            </>
        );
    };

    const renderActive = () => {
        const target = Number(metric.minutes) || 0;
        const current = Number(metric.current) || 0;
        const pct = target ? Math.min(100, Math.round((current / target) * 100)) : 0;
        return (
            <>
                <div className={styles.bigValue}>
                    {current} / {target} mins
                </div>
                <div className={styles.metaInline}>
                    <span className={styles.smallNote}>{metric.kcal ? `${metric.kcal} Kcal` : ''}</span>
                    <span className={styles.smallNote}>{metric.distance ? `${metric.distance} km` : ''}</span>
                </div>
            </>
        );
    };

    const renderSleep = () => {
        const hrs = Number(metric.hours) || 0;
        const mins = Number(metric.minutes) || 0;
        const formatted = `${hrs} hrs ${mins} mins`;
        return (
            <>
                <div className={styles.bigValue}>{formatted}</div>
                <div className={styles.smallNote}>{metric.range || ''}</div>
            </>
        );
    };

    return (
        <article className={styles.card}>
            <div className={styles.topRow}>
                <div className={styles.icon}>
                    {predefined === 'steps' && '👣'}
                    {predefined === 'activeTime' && '⏱️'}
                    {predefined === 'sleep' && '🌙'}
                    {!predefined && '🎯'}
                </div>
                <div className={styles.titleBlock}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.sub}>{description}</div>
                </div>
                <div className={styles.rightMeta}>
                    <div className={styles.priority}>{priority}</div>
                    <div className={styles.date}>{targetDate || ''}</div>
                </div>
            </div>

            <div className={styles.body}>
                {predefined === 'steps' && renderSteps()}
                {predefined === 'activeTime' && renderActive()}
                {predefined === 'sleep' && renderSleep()}
                {!predefined && <div className={styles.bigValue}>No predefined metric</div>}
            </div>
        </article>
    );
};

const WellnessGoalsList = () => {
    const goals = useGoalsStore((state) => state.goals); // Fetch goals from Zustand store

    console.log("Goals..", goals)

    if (!Array.isArray(goals) || goals.length === 0) {
        return (
            <>
                <div className={styles.empty}>No wellness goals yet.</div>
                <Link to={"/dashboard/add-goal"}>+Add</Link>
            </>)
    }

    return (
        <>
            <Link to={"/dashboard/add-goal"}>+Add</Link>
            <section className={styles.list}>
                {goals.map((g) => (
                    <GoalCard key={g.id} goal={g} />
                ))}
            </section>
        </>
    );
};

export default WellnessGoalsList;