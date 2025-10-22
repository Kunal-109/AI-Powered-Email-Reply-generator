import { 
  Box, 
  Button,
  CircularProgress, 
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField, 
  Typography 
} from '@mui/material';
import './App.css';
import { useState } from 'react';
import axios from 'axios'; // Added missing import

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Added error state

  const handleSubmit = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });

      setGeneratedReply(typeof response.data === 'string' ? // Fixed: lowercase 'string'
        response.data : JSON.stringify(response.data)
      );

    } catch (error) {
      console.error('Error generating reply:', error);
      setError('Failed to generate reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply); // Fixed: writeText instead of write
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{ mx: 3 }}>
        <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem> {/* Fixed typo */}
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button 
          variant="contained"
          sx={{ mb: 2 }}
          onClick={handleSubmit}
          disabled={!emailContent || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"} {/* Fixed typo */}
        </Button>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
      </Box>

      <Box sx={{ mx: 3 }}>
        <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Generated Reply"
          value={generatedReply || ''}
          InputProps={{ readOnly: true }} // Fixed: InputProps not inputProps
          sx={{ mb: 2 }}
        />
        <Button
          variant='outlined'
          onClick={handleCopy} // Fixed: use dedicated handler
          disabled={!generatedReply}
        >
          Copy To Clipboard
        </Button>
      </Box>
    </Container>
  );
}

export default App;