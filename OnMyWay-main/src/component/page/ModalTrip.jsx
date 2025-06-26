import * as React from 'react';
import { TextField, Button } from '@mui/material';

function ModalTrip({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="w-250 bg-gray-100 border border-blue-500 p-6 rounded-lg mx-auto mt-10 shadow-md z-50 ">
      <h2 className="text-center text-blue-600 font-semibold mb-6">Create Your Trip</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Map Box */}
        <div className="bg-red-600 text-white flex items-center justify-center h-48 rounded-md">
          ปักหมุดใน Map
        </div>

        {/* Right Form Fields */}
        <div className="flex flex-col gap-4">
          {/* Label + Input */}
          <div className="flex items-center gap-4">
            <label className="w-24 text-right text-gray-700">ชื่อ Trip</label>
            <TextField size="small" fullWidth />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-24 text-right text-gray-700">ชื่อสถานที่</label>
            <TextField size="small" fullWidth />
          </div>
          <div className="flex items-start gap-4">
            <label className="w-24 text-right text-gray-700 mt-2">คำอธิบาย</label>
            <TextField multiline rows={3} fullWidth />
          </div>
        </div>
      </div>

      {/* Bottom Fields */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-4">
          <label className="w-24 text-right text-gray-700">จำนวนคน</label>
          <TextField size="small" fullWidth />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-right text-gray-700">งบการเที่ยว</label>
          <TextField size="small" fullWidth />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-24 text-right text-gray-700">วัน/เดือน/ปี</label>
          <TextField size="small" fullWidth />
        </div>
      </div>

      {/* Add / Delete Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="contained" size="small" className="!bg-blue-600">
          +
        </Button>
        <Button variant="contained" size="small" className="!bg-red-600">
          ลบ
        </Button>
      </div>

      {/* Save / Cancel */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="contained" className="!bg-indigo-600 text-white">
          Save
        </Button>
        <Button variant="contained" className="!bg-gray-600 text-white"
        onClick={() => onClose(false)}>
          Cancel
        </Button>
      </div>
    </div>
    </div>
  );
}

export default ModalTrip;
