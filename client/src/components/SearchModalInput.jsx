import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Autocomplete from '@mui/joy/Autocomplete';
import axios from 'axios';

// Make a call to server to fetch the movie titles
export default function FreeSolo() {
    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        axios.get('http://localhost:3001').then((response) => {
            setMovies(response.data);
            setLoading(false);
            console.log(response.data);
        });
    }, []);

    return (
    <Stack spacing={2} sx={{ width: 300 }}>
        <FormControl id="free-solo-demo">
        <FormLabel>🎬 👀</FormLabel>
        <Autocomplete
            freeSolo
            placeholder="Search for film"
            options={top100Films.map((option) => option.title)}
        />
        </FormControl>
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [];
