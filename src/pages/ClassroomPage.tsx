import { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import TextIcon from '@mui/icons-material/TextFormat';
import VideoIcon from '@mui/icons-material/Videocam';
import { navigate, RouteComponentProps } from '@reach/router';
import ActivityIndicator from '../components/ActivityIndicator';
import ClassroomCard from '../components/ClassroomCard';
import { getSingleClassRoom } from '../services/api';
import { Classroom, Tutorial } from '../types/api.types';
import TutorialView from '../components/TutorialView';

type ClassroomPageProps = RouteComponentProps<{ id: number }>;

const ClassroomPage: React.FC<ClassroomPageProps> = ({ id }) => {
  const [fetching, setFetching] = useState(true);
  const [classroom, setClassroom] = useState<Classroom>({} as Classroom);
  const [activeTutorial, setActiveTutorial] = useState<Tutorial>(
    {} as Tutorial
  );

  useEffect(() => {
    const getClassroomDetail = async () => {
      try {
        if (!id) {
          return navigate('/');
        }
        const data = await getSingleClassRoom(id);
        setClassroom(data);
        setActiveTutorial(data.tutorials[0]);
      } catch (e) {
        //
      } finally {
        setFetching(false);
      }
    };

    getClassroomDetail();
  }, [id]);

  return (
    <ActivityIndicator active={fetching}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ClassroomCard classroom={classroom} />
        </Grid>
        <Grid item xs={8}>
          <TutorialView tutorial={activeTutorial} />
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List component='nav' aria-label='main mailbox folders'>
              {classroom.tutorials?.map(tutorial => (
                <ListItemButton
                  key={tutorial.slug}
                  onClick={() => setActiveTutorial(tutorial)}
                  selected={activeTutorial.id === tutorial.id}
                >
                  <ListItemIcon>
                    {tutorial.type === 'text' ? <TextIcon /> : <VideoIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={tutorial.title}
                    secondary={tutorial.summary}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </ActivityIndicator>
  );
};

export default ClassroomPage;
