import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectForm({ label, value, list, handleChange }: { label: string, value: string, list: string[] | undefined, handleChange: (event: SelectChangeEvent) => null }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel className="capitalize" id="select-test">{label}</InputLabel>
        <Select
          labelId="select-test"
          id="select-test"
          value={value}
          label={label}
          className="capitalize"
          onChange={handleChange}
        >
            {
                list && list?.length > 0 ? list?.map((data: string) => <MenuItem key={data} className="capitalize" value={data}>{data}</MenuItem>) : null
            }
        </Select>
      </FormControl>
    </Box>
  );
}