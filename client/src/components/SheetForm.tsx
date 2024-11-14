import React, { useState } from 'react';
import { FormControl, Box, TextField, Button } from '@mui/material';
import { SheetItem } from '../../../types/globals';

interface SheetFormProps {
  onSubmit: (formData: SheetItem) => void;
  onCancel: () => void;
}

function SheetForm({ onSubmit, onCancel }: SheetFormProps) {
  const [formData, setFormData] = useState<SheetItem>({
    Date: new Date().toISOString().split('T')[0],
    Duration: 0,
    Place: '',
    Comment: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'Duration' ? Number(value) : value, // Convert Duration to a number
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
				backgroundColor: (theme) => theme.palette.background.paper,
        padding: 3,
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <FormControl fullWidth margin="normal">
        <TextField
          name="Date"
          type="date"
          value={formData.Date}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="How many minutes did you practice?"
          name="Duration"
          type="number"
          value={formData.Duration || ''}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Where were you practicing?"
          name="Place"
          type="text"
          value={formData.Place}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Additional comments:"
          name="Comment"
          type="text"
          value={formData.Comment}
          onChange={handleChange}
        />
      </FormControl>
      <div className="buttons">
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ ml: 2 }}>
          Submit
        </Button>
      </div>
    </Box>
  );
}

export default SheetForm;
