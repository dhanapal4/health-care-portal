import React, { useState } from 'react'
import '../App.css'

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

  function handleChange(e){
    const {name, value} = e.target
    setProfile(p => ({...p, [name]: value}))
  }

  function save(e){
    e && e.preventDefault()
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
    <div className="container profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Patient Profile</h2>
          <div className="profile-actions">
            {editing ? (
              <>
                <button className="btn ghost" onClick={cancel}>Cancel</button>
                <button className="btn primary" onClick={save}>Save</button>
              </>
            ) : (
              <button className="btn primary" onClick={() => setEditing(true)}>Edit Profile</button>
            )}
          </div>
        </div>

        <form className="profile-form" onSubmit={save}>
          <label>
            <div className="label-text">Full name</div>
            <input name="fullName" value={profile.fullName} onChange={handleChange} disabled={!editing} />
          </label>

          <label>
            <div className="label-text">Email</div>
            <input name="email" value={profile.email} onChange={handleChange} disabled={!editing} />
          </label>

          <label>
            <div className="label-text">Phone</div>
            <input name="phone" value={profile.phone} onChange={handleChange} disabled={!editing} />
          </label>

          <label>
            <div className="label-text">Date of birth</div>
            <input name="dob" type="date" value={profile.dob} onChange={handleChange} disabled={!editing} />
          </label>

          <label>
            <div className="label-text">Height</div>
            <input name="height" value={profile.height} onChange={handleChange} disabled={!editing} placeholder="e.g. 170 cm" />
          </label>

          <label>
            <div className="label-text">Weight</div>
            <input name="weight" value={profile.weight} onChange={handleChange} disabled={!editing} placeholder="e.g. 68 kg" />
          </label>

          <label>
            <div className="label-text">Allergies</div>
            <textarea name="allergies" value={profile.allergies} onChange={handleChange} disabled={!editing} placeholder="e.g. Penicillin, Peanuts" />
          </label>

          <label>
            <div className="label-text">Current medications</div>
            <textarea name="medications" value={profile.medications} onChange={handleChange} disabled={!editing} placeholder="e.g. Lisinopril 10mg once daily" />
          </label>

          {/* Hidden submit so Enter can save when editing */}
          {editing && <button type="submit" style={{display:'none'}}>save</button>}
        </form>
      </div>
    </div>
  )
}
