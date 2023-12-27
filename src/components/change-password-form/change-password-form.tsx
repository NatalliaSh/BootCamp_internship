import styles from './change-password-form.module.scss';
import {useState, FC} from 'react';
import {EmptyForm} from '../empty-form';
import {SubmitButton} from '../submit-button';
import {errorMessages, inputName, successMessages} from '../../constants';
import {
  checkPasswordField,
  checkConfirmField,
} from '../../functions/validation/validators';
import {ModalWindow} from '../modal-window';
import {ConfirmForm} from '../confirm-form';
import {InputDataType} from '../../types/input-data';
import {useInputs} from '../../hooks/inputs-hook';
import {User} from '../../types/users';
import {useEditUserPasswordMutation} from '../../api/endpoints';
import {useAppDispatch} from '../../store/hooks/redux-hooks';
import {ToastType, toastsActions} from '../../store/slices/toasts-slice';

type ChangePasswordFormProps = {
  onClose: () => void;
  onSetTransparent: (isTransparent: boolean) => void;
  user: User;
};

const inputs: InputDataType[] = [
  {
    name: inputName.password,
    label: 'Password',
    value: '',
    maxLength: 30,
    placeholder: 'Please enter password',
    errorMessage: '',
    hint: "Use 8-30 characters (at least one uppercase letter, one lowercase letter and one number)\nSpecial characters !@#$%^&* (don't start or end with special characters)\nOnly the Latin alphabet",
    validationFn: checkPasswordField,
    isAfterError: false,
  },
  {
    name: inputName.confirm,
    label: 'Confirm',
    value: '',
    maxLength: 30,
    placeholder: 'Please confirm password',
    errorMessage: '',
    hint: '',
    validationFn: checkConfirmField,
    isAfterError: false,
  },
];

const PASSWORD_INDEX = 0;
//const CONFIRM_INDEX = 1;

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  onClose,
  onSetTransparent,
  user,
}) => {
  const dispatch = useAppDispatch();
  const [isShowConfirm, setShowConfirm] = useState(false);
  const {inputData, validate, validateApiErrors, inputsLayout} =
    useInputs(inputs);
  const [changePassword, {isLoading}] = useEditUserPasswordMutation();
  const onCloseForm = () => {
    setShowConfirm(true);
    onSetTransparent(true);
  };

  const submitBtnHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    // VALIDATION
    if (validate(inputData[PASSWORD_INDEX].value)) {
      return;
    }

    //VALIDATION PASSED
    try {
      const requestData = {
        userId: user.id,
        role: user.role,
        password: inputData[PASSWORD_INDEX].value,
      };
      await changePassword(requestData).unwrap();
      onClose();
      dispatch(
        toastsActions.showToast({
          type: ToastType.Success,
          message: successMessages.changePasswordForm,
        }),
      );
    } catch (e: any) {
      const title = e.data?.title;
      const errors = e.data?.errors;

      //IF THERE IS BACKEND VALIDATION ERRORS
      if (errors && title === errorMessages.validationErrors) {
        validateApiErrors(errors);
      }
    }
  };

  return (
    <>
      <EmptyForm
        title="Change password"
        isCloseButtonNeeded={true}
        onClose={onCloseForm}
      >
        <form className={styles.form}>
          <>
            {inputsLayout}
            <div className={styles['buttons-wrapper']}>
              <SubmitButton
                text={'Cancel'}
                onClick={onCloseForm}
                isSmall={true}
                isSecondary={true}
              />
              <SubmitButton
                text={'Change password'}
                onClick={submitBtnHandler}
                type="submit"
                isSmall={true}
                isLoading={isLoading}
              />
            </div>
          </>
        </form>
      </EmptyForm>
      {isShowConfirm && (
        <ModalWindow isVisible={true}>
          <ConfirmForm
            onClose={() => {
              onClose();
              onSetTransparent(false);
            }}
            onCancel={() => {
              setShowConfirm(false);
              onSetTransparent(false);
            }}
          />
        </ModalWindow>
      )}
    </>
  );
};
