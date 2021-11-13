import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ReactPlayer from 'react-player';
import { Tutorial } from '../types/api.types';

type TutorialViewProps = {
  tutorial: Tutorial;
};
const TutorialView: React.FC<TutorialViewProps> = ({ tutorial }) => {
  if (!tutorial) return null;
  return (
    <Box sx={{ pb: 2 }}>
      <Typography variant='h5' component='div'>
        {tutorial.title}
      </Typography>
      <Divider />
      <Typography sx={{ pb: 2, pt: 2 }} component='div'>
        {tutorial.summary}
      </Typography>
      {tutorial.type === 'text' ? (
        <Typography>{tutorial.contents}</Typography>
      ) : (
        <Box sx={{ minHeight: 350 }}>
          <ReactPlayer
            className='absolute top-0 right-0'
            url={tutorial.url}
            width='100%'
            height={350}
            controls
          />
        </Box>
      )}
    </Box>
  );
};

export default TutorialView;
