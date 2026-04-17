import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Snackbar from '@mui/material/Snackbar';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { clsx } from 'clsx';
import { memo, useCallback, useId } from 'react';
import type { ReactNode, SyntheticEvent } from 'react';

import { InteractiveIcon } from '../interactive-icon';
import { InteractiveIconTypeEnum } from '../interactive-icon/InteractiveIcon.types';
import { ToastTypeEnum, type ToastType } from './Toast.types';

const iconsMap: Record<ToastType, ReactNode> = {
  [ToastTypeEnum.SUCCESS]: <CheckCircleOutlined />,
  [ToastTypeEnum.WARNING]: <ErrorOutlineIcon />,
  [ToastTypeEnum.INFO]: <InfoOutlined />,
};

export interface ToastPropsModel {
  ariaLabel: string;
  children: ReactNode;
  handleClose: () => void;
  type?: ToastType;
}

export const Toast = memo((props: ToastPropsModel) => {
  const { handleClose } = props;
  const id = useId();
  const type = props.type ?? ToastTypeEnum.SUCCESS;
  const [isSuccess, isWarning, isInfo] = [
    ToastTypeEnum.SUCCESS,
    ToastTypeEnum.WARNING,
    ToastTypeEnum.INFO,
  ].map((toastType: ToastType) => type === toastType);

  const closeHandler = useCallback(
    (_: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
      reason === 'timeout' && handleClose();
    },
    [handleClose],
  );

  return (
    <Snackbar
      key={id}
      open={true}
      autoHideDuration={5000}
      onClose={closeHandler}
    >
      <SnackbarContent
        aria-label={props.ariaLabel}
        className={clsx({
          '!bg-red-500': isWarning,
          '!bg-accent': isSuccess,
          '!bg-primary': isInfo,
        })}
        classes={{
          message: 'w-[calc(100%-40px)] p-0 self-center',
          root: 'max-w-full w-[612px] items-start py-3',
        }}
        action={
          <InteractiveIcon
            ariaLabel={`${props.ariaLabel} Close Icon`}
            onClick={props.handleClose}
            type={InteractiveIconTypeEnum.WHITE}
          >
            <CloseOutlinedIcon />
          </InteractiveIcon>
        }
        message={
          <div className={'flex gap-x-4'}>
            {iconsMap[type]}
            <div className={'text-md'}>{props.children}</div>
          </div>
        }
      ></SnackbarContent>
    </Snackbar>
  );
});

Toast.displayName = 'Toast';
