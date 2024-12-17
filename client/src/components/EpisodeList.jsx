import * as React from 'react';
import Select from '@mui/joy/Select';
import Option, { optionClasses } from '@mui/joy/Option';
import ListItemDecorator, { listItemDecoratorClasses } from '@mui/joy/ListItemDecorator';
import Check from '@mui/icons-material/Check';

export default function EpisodeList({ seasons, changePointer, id, type }) {
  const [selectedValue, setSelectedValue] = React.useState("");

  // Filter out placeholder seasons like Season 0
  const validSeasons = seasons.filter((season) => season.season_number > 0 && season.episode_count > 0);

  const handleSelection = (value) => {
    if (!value) return; // Safeguard for null value
    const [season, episode] = value.split('-');
    const displayValue = `Season ${season}, Episode ${episode}`;
    setSelectedValue(displayValue);
    changePointer({ type, id, season: parseInt(season), episode: parseInt(episode) });
  };

  console.log(selectedValue);

  return (
    <Select
      placeholder={`${selectedValue || 'Select an episode'}`}
      value={selectedValue}
      onChange={(e, newValue) => handleSelection(newValue)}
      sx={{ width: 300 }}
    >
      {validSeasons.map((season) => (
        <React.Fragment key={season.season_number}>
          <Option
            value={`${season.season_number}-0`}
            sx={{ fontWeight: 'bold' }}
            disabled
          >
            {season.name} ({season.air_date})
          </Option>
          {Array.from({ length: season.episode_count }, (_, i) => i + 1).map((episode) => (
            <Option
              key={episode}
              value={`${season.season_number}-${episode}`}
              sx={{
                pl: 3,
                [`&.${optionClasses.selected} .${listItemDecoratorClasses.root}`]: {
                  opacity: 1,
                },
              }}
            >
              <ListItemDecorator sx={{ opacity: 0 }}>
                <Check />
              </ListItemDecorator>
              Episode {episode}
            </Option>
          ))}
        </React.Fragment>
      ))}
    </Select>
  );
}
