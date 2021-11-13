import { CircularProgress } from '@mui/material';

type ActivityIndicatorProps = {
  active?: boolean;
  size?: number;
};
const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  active,
  children,
  size = 35,
}) => {
  if (!active) {
    return <>{children}</>;
  }
  return <CircularProgress size={size} />;
};

export default ActivityIndicator;
