import React, { useState } from 'react'

const STORAGE_KEY = 'hcp_patient_profile'

const DEFAULT_PROFILE = {
  fullName: 'Abinandan G',
  email: 'gabinandan@gmail.com',
  phone: '9841012345',
  // date input requires YYYY-MM-DD
  dob: '1990-06-05',
  height: '173cm',
  weight: '70kg',
  allergies: 'antibiotics',
  medications: 'Telmisvan 40 for BP'
}

export default function ProfilePage(){
  const [profile, setProfile] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return DEFAULT_PROFILE
      const parsed = JSON.parse(raw)
      // Merge parsed values with defaults so missing/empty fields fall back to defaults
      const merged = {}
      for(const key of Object.keys(DEFAULT_PROFILE)){
        const val = parsed[key]
        merged[key] = (val === undefined || val === null || val === '') ? DEFAULT_PROFILE[key] : val
      }
      return merged
    }catch(err){
      console.error('profile load error', err)
      return DEFAULT_PROFILE
    }
  })

  const [editing, setEditing] = useState(false)
  const [errors, setErrors] = useState({})

  function handleChange(e){
    const {name, value} = e.target
    setProfile(p => ({...p, [name]: value}))
  }

  function save(e){
    e && e.preventDefault()
    // validate required fields
    const required = ['fullName','email','phone','dob','height','weight']
    const missing = required.filter(k => {
      const v = profile[k]
      return v === undefined || v === null || (typeof v === 'string' && v.trim() === '')
    })
    if(missing.length > 0){
      const errObj = {}
      missing.forEach(k => errObj[k] = true)
      setErrors(errObj)
      setEditing(true)
      return
    }
    setErrors({})
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    setEditing(false)
  }

  function cancel(){
    const raw = localStorage.getItem(STORAGE_KEY)
    if(raw){
      try{
        setProfile(JSON.parse(raw))
      }catch(err){
        console.error('profile parse error', err)
      }
    }
    setEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="bg-white rounded-xl p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Patient Profile</h2>
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <button className="px-3 py-1 rounded border border-slate-200 text-slate-800" onClick={cancel}>Cancel</button>
                <button className="px-3 py-1 rounded bg-sky-500 text-white font-semibold" onClick={save}>Save</button>
              </>
            ) : (
              <button className="px-3 py-1 rounded bg-sky-500 text-white font-semibold" onClick={() => setEditing(true)}>Edit Profile</button>
            )}
          </div>
        </div>

        <form className="grid md:grid-cols-2 gap-4" onSubmit={save}>
          <label className="block">
            <div className="text-sm font-semibold mb-1">Full name</div>
            <input className={`w-full px-3 py-2 border rounded-md bg-white text-slate-900 ${errors.fullName ? 'border-red-500' : ''}`} name="fullName" value={profile.fullName} onChange={handleChange} disabled={!editing} />
            {errors.fullName && <div className="text-red-600 text-sm mt-1">Full name is required</div>}
          </label>

          <label className="block">
            <div className="text-sm font-semibold mb-1">Email</div>
            <input className={`w-full px-3 py-2 border rounded-md bg-white text-slate-900 ${errors.email ? 'border-red-500' : ''}`} name="email" value={profile.email} onChange={handleChange} disabled={!editing} />
            {errors.email && <div className="text-red-600 text-sm mt-1">Email is required</div>}
          </label>

          <label className="block">
            <div className="text-sm font-semibold mb-1">Phone</div>
            <input className={`w-full px-3 py-2 border rounded-md bg-white text-slate-900 ${errors.phone ? 'border-red-500' : ''}`} name="phone" value={profile.phone} onChange={handleChange} disabled={!editing} />
            {errors.phone && <div className="text-red-600 text-sm mt-1">Phone is required</div>}
          </label>

          <label className="block">
            <div className="text-sm font-semibold mb-1">Date of birth</div>
            <input className={`w-full px-3 py-2 border rounded-md bg-white text-slate-900 ${errors.dob ? 'border-red-500' : ''}`} name="dob" type="date" value={profile.dob} onChange={handleChange} disabled={!editing} />
            {errors.dob && <div className="text-red-600 text-sm mt-1">Date of birth is required</div>}
          </label>

          <label className="block">
            <div className="text-sm font-semibold mb-1">Height</div>
            <input className={`w-full px-3 py-2 border rounded-md bg-white text-slate-900 ${errors.height ? 'border-red-500' : ''}`} name="height" value={profile.height} onChange={handleChange} disabled={!editing} placeholder="e.g. 170 cm" />
            {errors.height && <div className="text-red-600 text-sm mt-1">Height is required</div>}
          </label>

          <label className="block">
            <div className="text-sm font-semibold mb-1">Weight</div>
            <input className={`w-full px-3 py-2 border rounded-md bg-white text-slate-900 ${errors.weight ? 'border-red-500' : ''}`} name="weight" value={profile.weight} onChange={handleChange} disabled={!editing} placeholder="e.g. 68 kg" />
            {errors.weight && <div className="text-red-600 text-sm mt-1">Weight is required</div>}
          </label>

          <label className="block md:col-span-2">
            <div className="text-sm font-semibold mb-1">Allergies</div>
            <textarea className="w-full px-3 py-2 border rounded-md bg-white text-slate-900" name="allergies" value={profile.allergies} onChange={handleChange} disabled={!editing} placeholder="e.g. Penicillin, Peanuts" />
          </label>

          <label className="block md:col-span-2">
            <div className="text-sm font-semibold mb-1">Current medications</div>
            <textarea className="w-full px-3 py-2 border rounded-md bg-white text-slate-900" name="medications" value={profile.medications} onChange={handleChange} disabled={!editing} placeholder="e.g. Lisinopril 10mg once daily" />
          </label>

          {/* Hidden submit so Enter can save when editing */}
          {editing && <button type="submit" style={{display:'none'}}>save</button>}
        </form>
      </div>
    </div>
  )
}
