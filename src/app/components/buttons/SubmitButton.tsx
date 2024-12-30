import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface SubmitButtonProps {
  label: string; 
  isLoading?: boolean; // ローディング状態かどうか
  onClick?: () => void; // ボタンクリック時の処理
  type:string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, isLoading = false, onClick,}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={isLoading} // ローディング中は無効化
      fullWidth
      type="submit"
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : label}
    </Button>
  );
};

export default SubmitButton;
