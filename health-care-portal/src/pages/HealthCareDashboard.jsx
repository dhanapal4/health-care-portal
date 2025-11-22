import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Material UI imports - ensure these packages are installed in your project
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

const samplePatients = [
  { id: 1, name: 'David Johnson', age: 39, lastVisit: 'Nov 15, 2025', goalsStatus: 'Partial', compliance: 'Up to date', allergies: 'Penicillin, Shellfish', meds: 'Vitamin D3, Multivitamin', bloodType: 'A+', steps: '3,620 / 6,000', stepPct: 60, scheduled: 'Dec 15, 2025' },
  { id: 2, name: 'Sarah Williams', age: 45, lastVisit: 'Nov 10, 2025', goalsStatus: 'Goal Met', compliance: 'Up to date', allergies: 'None', meds: 'Metformin', bloodType: 'B+' , steps: '6,200 / 6,000', stepPct: 103, scheduled: 'Jan 05, 2026'},
  { id: 3, name: 'Michael Brown', age: 52, lastVisit: 'Oct 28, 2025', goalsStatus: 'Not Met', compliance: 'Missed Checkup', allergies: 'Aspirin', meds: 'Atorvastatin', bloodType: 'O-', steps: '1,200 / 6,000', stepPct: 20, scheduled: 'Dec 01, 2025'},
  { id: 4, name: 'Emily Davis', age: 34, lastVisit: 'Nov 18, 2025', goalsStatus: 'Goal Met', compliance: 'Up to date', allergies: 'Peanuts', meds: 'None', bloodType: 'AB+', steps: '6,100 / 6,000', stepPct: 102, scheduled: 'Dec 20, 2025'}
]

export default function Dashboard(){
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  function openDetails(patient){
    setSelected(patient)
    setOpen(true)
  }
  function close(){ setOpen(false); setSelected(null) }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold">Patient Overview</h1>
        <p className="text-slate-500">Monitor your patients' wellness goals and compliance</p>
      </div>

      <TableContainer component={Paper} className="rounded-lg overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Last Visit</TableCell>
              <TableCell>Goals Status</TableCell>
              <TableCell>Compliance</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {samplePatients.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.lastVisit}</TableCell>
                <TableCell>
                  <Chip label={p.goalsStatus} color={p.goalsStatus === 'Goal Met' ? 'success' : (p.goalsStatus === 'Not Met' ? 'error' : 'warning')} size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={p.compliance} color={p.compliance.includes('Missed') ? 'error' : 'success'} size="small" />
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => openDetails(p)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
        <DialogTitle>{selected?.name}</DialogTitle>
        <DialogContent>
          {selected && (
            <Box className="grid md:grid-cols-2 gap-6">
              <Box>
                <Typography variant="subtitle1" className="font-bold mb-2">Patient Information</Typography>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between border-b pb-2"> <span>Age</span> <strong>{selected.age}</strong></div>
                  <div className="flex justify-between border-b pb-2"> <span>Blood Type</span> <strong>{selected.bloodType}</strong></div>
                  <div className="flex justify-between border-b pb-2"> <span>Last Visit</span> <strong>{selected.lastVisit}</strong></div>
                </div>
              </Box>
              <Box>
                <Typography variant="subtitle1" className="font-bold mb-2">Health Information</Typography>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between border-b pb-2"> <span>Allergies</span> <strong>{selected.allergies}</strong></div>
                  <div className="flex justify-between border-b pb-2"> <span>Current Medications</span> <strong>{selected.meds}</strong></div>
                </div>
              </Box>

              <Box className="md:col-span-2">
                <Typography variant="h6" className="mt-4 mb-3">Current Goals & Compliance</Typography>
                <div className="space-y-3">
                  <Paper className="p-4 rounded border">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">Daily Steps Goal</div>
                        <div className="text-sm text-slate-500">Current: {selected.steps}</div>
                      </div>
                      <Chip label={`${selected.stepPct}% Complete`} className="ml-4" color="warning" />
                    </div>
                  </Paper>

                  <Paper className="p-4 rounded border">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">Preventive Care - Blood Test</div>
                        <div className="text-sm text-slate-500">Scheduled: {selected.scheduled}</div>
                      </div>
                      <Chip label="Scheduled" color="success" />
                    </div>
                  </Paper>

                  <Paper className="p-4 rounded border">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">Vitamin Supplementation</div>
                        <div className="text-sm text-slate-500">D3/K2 regimen until 2026</div>
                      </div>
                      <Chip label="Compliant" color="success" />
                    </div>
                  </Paper>
                </div>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
