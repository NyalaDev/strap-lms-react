import { CircularProgress } from '@mui/material';

type ActivityIndicatorProps = {
  active?: boolean;
};
const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  active,
  children,
}) => {
  if (!active) {
    return <>{children}</>;
  }
  return <CircularProgress />;
};

export default ActivityIndicator;
