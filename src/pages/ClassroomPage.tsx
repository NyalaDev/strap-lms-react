import { useContext, useEffect, useState } from 'react';
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

type ClassroomPageProps = RouteComponentProps<{ id: number }>;

const ClassroomPage: React.FC<ClassroomPageProps> = ({ id }) => {
  const [fetching, setFetching] = useState(true);
  const [classroom, setClassroom] = useState<Classroom>({} as Classroom);

  useEffect(() => {
    const getClassroomDetail = async () => {
      try {
        if (!id) {
          return navigate('/');
        }
        setClassroom(await getSingleClassRoom(id));
      } catch (e) {
        //
      } finally {
        setFetching(false);
      }
    };

    getClassroomDetail();
  }, [id]);

  const handleListItemClick = (tutorial: Tutorial) => {
    console.log(tutorial);
  };

  return (
    <ActivityIndicator active={fetching}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ClassroomCard classroom={classroom} />
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List component='nav' aria-label='main mailbox folders'>
              {classroom.tutorials.map(tutorial => (
                <ListItemButton onClick={() => handleListItemClick(tutorial)}>
                  <ListItemIcon>
                    {tutorial.type === 'text' ? <TextIcon /> : <VideoIcon />}
                  </ListItemIcon>
                  <ListItemText primary={tutorial.title} />
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
