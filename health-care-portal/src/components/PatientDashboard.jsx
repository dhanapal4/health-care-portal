import React from 'react'
import useGoalsStore from '../store/useGoalsStore'

const sampleGoals = [
  {
    id: 'steps',
    title: 'Steps',
    value: '3,620',
    goalText: 'Goal: 6,000 steps',
    pct: 60,
    note: '60%'
  },
  {
    id: 'active',
    title: 'Active Time',
    value: '56 mins',
    goalText: '171.2 Kcal | 1.23km',
    pct: 0,
    note: ''
  },
  {
    id: 'sleep',
    title: 'Sleep',
    value: '6h 30m',
    goalText: '11:30 PM - 06:00 AM',
    pct: 0,
    note: ''
  }
]

const reminders = [
  { id: 1, text: 'Additional Vitamin D3/K2 until 2026' },
  { id: 2, text: 'Annual blood test - Scheduled for Dec 15, 2025' }
]

const PatientDashboard = () => {
  const storeGoals = useGoalsStore((s) => s.goals)

  const buildDisplayGoals = () => {
    if (!Array.isArray(storeGoals) || storeGoals.length === 0) return sampleGoals

    // Map store goals to the compact cards used on the dashboard
    const mapped = []
    for (const g of storeGoals) {
      const predefined = g.predefined
      const metric = g.metric || {}

      if (predefined === 'steps') {
        const target = metric.count || 0
        const current = metric.current || Math.round(target * 0.6) || target
        const pct = target ? Math.min(100, Math.round((current / target) * 100)) : 0
        mapped.push({
          id: g.id || `steps-${g.id}`,
          title: g.title || 'Steps',
          value: current.toLocaleString(),
          goalText: `Goal: ${target.toLocaleString()} steps`,
          pct,
          note: pct ? `${pct}%` : ''
        })
        continue
      }

      if (predefined === 'activeTime') {
        const mins = metric.minutes || 0
        mapped.push({
          id: g.id || `active-${g.id}`,
          title: g.title || 'Active Time',
          value: `${mins} mins`,
          goalText: g.description || '',
          pct: 0,
          note: ''
        })
        continue
      }

      if (predefined === 'sleep') {
        const hrs = metric.hours || 0
        const mins = metric.minutes || 0
        mapped.push({
          id: g.id || `sleep-${g.id}`,
          title: g.title || 'Sleep',
          value: `${hrs}h ${mins}m`,
          goalText: g.description || '',
          pct: 0,
          note: ''
        })
        continue
      }

      // Generic goal
      mapped.push({
        id: g.id || `goal-${g.id}`,
        title: g.title || 'Goal',
        value: g.metric && g.metric.count ? `${g.metric.count}` : '',
        goalText: g.description || '',
        pct: 0,
        note: ''
      })
    }

    // Ensure we always show up to three cards; if fewer, pad with samples
    while (mapped.length < 3) mapped.push(sampleGoals[mapped.length])
    return mapped.slice(0, 3)
  }

  const displayGoals = buildDisplayGoals()

  return (
    <div className="p-6 space-y-6">
      <header className="bg-white rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold text-slate-900">Welcome, Test</h1>
        <p className="text-slate-500 mt-1">Track your wellness goals and stay on top of preventive care</p>
      </header>

      <section>
        <h3 className="text-lg font-semibold mb-3">Wellness Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayGoals.map((g) => (
            <article key={g.id} className="bg-white rounded-lg p-5 shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm text-slate-500">{g.title}</div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-2">{g.value}</div>
                  <div className="text-sm text-slate-400 mt-1">{g.goalText}</div>
                </div>
                {g.note && <div className="text-sky-600 font-semibold">{g.note}</div>}
              </div>

              {g.pct > 0 && (
                <div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-2 rounded-full" style={{width: `${g.pct}%`}} />
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="bg-white rounded-lg p-5 shadow">
          <h4 className="font-semibold mb-3">Preventive Care Reminders</h4>
          <div className="space-y-3">
            {reminders.map((r) => (
              <div key={r.id} className="bg-slate-50 border-l-4 border-sky-200 p-3 rounded">
                {r.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="bg-white rounded-lg p-5 shadow">
          <h4 className="font-semibold mb-3">Health Tip of the Day</h4>
          <div className="bg-emerald-50 p-4 rounded text-slate-700">💧 Stay hydrated. Aim to drink at least 8 glasses of water per day.</div>
        </div>
      </section>
    </div>
  )
}

export default PatientDashboard
