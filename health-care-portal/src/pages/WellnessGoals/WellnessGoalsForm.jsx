import React, { useState } from 'react';
import styles from './WellnessGoalsForm.module.css';
import useGoalsStore from '../../store/useGoalsStore';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const WellnessGoalsForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [priority, setPriority] = useState('medium');

    // new states for predefined goal and its metrics
    const [predefined, setPredefined] = useState('');
    const [stepsCount, setStepsCount] = useState('');
    const [activeMinutes, setActiveMinutes] = useState('');
    const [sleepHours, setSleepHours] = useState('');
    const [sleepMinutes, setSleepMinutes] = useState('');

    const navigate = useNavigate()

    // Zustand Store
    const { addGoals } = useGoalsStore()

    // Snackbar state
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    const [snackSeverity, setSnackSeverity] = useState('success');

    const reset = () => {
        setTitle('');
        setDescription('');
        setTargetDate('');
        setPriority('medium');
        setPredefined('');
        setStepsCount('');
        setActiveMinutes('');
        setSleepHours('');
        setSleepMinutes('');
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setSnackMsg('Please enter a title for the goal.');
            setSnackSeverity('error');
            setSnackOpen(true);
            return;
        }

        // validate predefined metric if selected
        let metric = null;
        if (predefined === 'steps') {
            const count = Number(stepsCount);
            if (!Number.isFinite(count) || count <= 0) {
                setSnackMsg('Please enter a valid steps count.');
                setSnackSeverity('error');
                setSnackOpen(true);
                return;
            }
            metric = { type: 'steps', count };
        } else if (predefined === 'activeTime') {
            const mins = Number(activeMinutes);
            if (!Number.isFinite(mins) || mins <= 0) {
                setSnackMsg('Please enter valid active minutes.');
                setSnackSeverity('error');
                setSnackOpen(true);
                return;
            }
            metric = { type: 'activeTime', minutes: mins };
        } else if (predefined === 'sleep') {
            const hrs = Number(sleepHours || 0);
            const mins = Number(sleepMinutes || 0);
            if ((!Number.isFinite(hrs) || hrs < 0) || (!Number.isFinite(mins) || mins < 0 || mins >= 60) || (hrs === 0 && mins === 0)) {
                setSnackMsg('Please enter valid sleep hours/minutes (minutes 0-59).');
                setSnackSeverity('error');
                setSnackOpen(true);
                return;
            }
            metric = { type: 'sleep', hours: hrs, minutes: mins };
        }

        const newGoal = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            targetDate: targetDate || null,
            priority,
            predefined: predefined || null,
            metric, // may be null if user didn't choose predefined option
        };

        try {
            addGoals(newGoal);
            reset();
            setSnackMsg('Wellness goal added');
            setSnackSeverity('success');
            setSnackOpen(true);
            // optionally navigate to list after short delay
            setTimeout(() => navigate('/list-goals'), 800);
        } catch (err) {
            setSnackMsg('Failed to add goal');
            setSnackSeverity('error');
            setSnackOpen(true);
        }
    };

    return (
        <div className={styles.fullPage}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <h4 className={styles.heading}>Add Wellness Goal</h4>

                <label className={styles.field}>
                    <span className={styles.label}>Title</span>
                    <input
                        className={styles.input}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Walk 30 minutes daily"
                        required
                        aria-required="true"
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Description</span>
                    <textarea
                        className={styles.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional details"
                        rows={3}
                    />
                </label>

                {/* new predefined wellness goal selector */}
                <label className={styles.field}>
                    <span className={styles.label}>Predefined wellness goal</span>
                    <select
                        className={styles.select}
                        value={predefined}
                        onChange={(e) => setPredefined(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="steps">Steps</option>
                        <option value="activeTime">Active time</option>
                        <option value="sleep">Sleep</option>
                    </select>
                </label>

                {/* conditional metric inputs */}
                {predefined === 'steps' && (
                    <label className={styles.field}>
                        <span className={styles.label}>Steps count</span>
                        <input
                            className={styles.input}
                            type="number"
                            min="0"
                            value={stepsCount}
                            onChange={(e) => setStepsCount(e.target.value)}
                            placeholder="e.g. 5000"
                        />
                    </label>
                )}

                {predefined === 'activeTime' && (
                    <label className={styles.field}>
                        <span className={styles.label}>Active time (minutes)</span>
                        <input
                            className={styles.input}
                            type="number"
                            min="0"
                            value={activeMinutes}
                            onChange={(e) => setActiveMinutes(e.target.value)}
                            placeholder="e.g. 30"
                        />
                    </label>
                )}

                {predefined === 'sleep' && (
                    <div className={styles.row}>
                        <label className={styles.fieldInline}>
                            <span className={styles.label}>Sleep hours</span>
                            <input
                                className={styles.input}
                                type="number"
                                min="0"
                                value={sleepHours}
                                onChange={(e) => setSleepHours(e.target.value)}
                                placeholder="Hours"
                            />
                        </label>

                        <label className={styles.fieldInline}>
                            <span className={styles.label}>Sleep minutes</span>
                            <input
                                className={styles.input}
                                type="number"
                                min="0"
                                max="59"
                                value={sleepMinutes}
                                onChange={(e) => setSleepMinutes(e.target.value)}
                                placeholder="Minutes"
                            />
                        </label>
                    </div>
                )}

                <div className={styles.row}>
                    <label className={styles.fieldInline}>
                        <span className={styles.label}>Target date</span>
                        <input
                            className={styles.input}
                            type="date"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                        />
                    </label>

                    <label className={styles.fieldInline}>
                        <span className={styles.label}>Priority</span>
                        <select
                            className={styles.select}
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                </div>

                <div className={styles.actions}>
                    <button type="submit" className={styles.primary}>Add goal</button>
                    <button
                        type="button"
                        className={styles.secondary}
                        onClick={() => {
                            reset();
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackClose} severity={snackSeverity} sx={{ width: '100%' }}>
                    {snackMsg}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default WellnessGoalsForm;