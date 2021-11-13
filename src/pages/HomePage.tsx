import { useContext, useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { RouteComponentProps } from '@reach/router';
import ActivityIndicator from '../components/ActivityIndicator';
import ClassroomCard from '../components/ClassroomCard';
import { AuthContext } from '../context/AuthContext';
import { getClassrooms } from '../services/api';
import { Classroom } from '../types/api.types';

const HomePage: React.FC<RouteComponentProps> = () => {
  const { currentUser } = useContext(AuthContext);
  const [fetching, setFetching] = useState(true);
  const [studetnClassrooms, setStudetnClassrooms] = useState<Classroom[]>();
  const [classrooms, setClassrooms] = useState<Classroom[]>();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const data = await getClassrooms();
        const userClassrooms = data.filter(item => {
          return item.students.find(s => s.id === currentUser?.id);
        });
        setStudetnClassrooms(userClassrooms);
        setClassrooms(data);
      } catch (e) {
        //
      } finally {
        setFetching(false);
      }
    };

    fetchClassrooms();
  }, []);

  return (
    <ActivityIndicator active={fetching}>
      <Typography variant='h5' gutterBottom>
        Your Classrooms
        <Divider />
      </Typography>
      {studetnClassrooms?.length === 0 ? (
        <Typography>You have no classrooms</Typography>
      ) : (
        <Grid container spacing={2}>
          {studetnClassrooms?.map(classroom => (
            <Grid key={classroom.id} item xs={6} md={4}>
              <ClassroomCard
                classroom={classroom}
                link={`/classrooms/${classroom.id}`}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <br />

      <Typography variant='h5' gutterBottom>
        All Classrooms
        <Divider />
      </Typography>

      <Grid container spacing={2}>
        {classrooms?.map(classroom => (
          <Grid key={classroom.id} item xs={6} md={4}>
            <ClassroomCard
              classroom={classroom}
              link={`/classrooms/${classroom.id}`}
            />
          </Grid>
        ))}
      </Grid>
    </ActivityIndicator>
  );
};

export default HomePage;
