import styles from './add-user-form.module.scss';
import {useState, ChangeEvent, FC} from 'react';
import {EmptyForm} from '../empty-form';
import {RadioInput} from '../radio-input';
import {SubmitButton} from '../submit-button';
import {errorMessages, inputName, successMessages} from '../../constants';
import {
  checkFirstLastNameField,
  checkUserNameField,
  checkPasswordField,
} from '../../functions/validation/validators';
import {ModalWindow} from '../modal-window';
import {ConfirmForm} from '../confirm-form';
import {useAddNewUserMutation} from '../../api/endpoints';
import {NewUser} from '../../types/users';
import {getNewInputData} from '../../functions/utils/utils';
import {InputDataType} from '../../types/input-data';
import {useInputs} from '../../hooks/inputs-hook';
import {useAppDispatch} from '../../store/hooks/redux-hooks';
import {ToastType, toastsActions} from '../../store/slices/toasts-slice';

type AddUserFormProps = {
  onClose: () => void;
  onSetTransparent: (isTransparent: boolean) => void;
};

const inputs: InputDataType[] = [
  {
    name: inputName.lastName,
    label: 'Last Name',
    value: '',
    maxLength: 20,
    placeholder: 'Please enter last name',
    errorMessage: '',
    hint: '',
    validationFn: checkFirstLastNameField,
    isAfterError: false,
  },
  {
    name: inputName.firstName,
    label: 'First Name',
    value: '',
    maxLength: 20,
    placeholder: 'Please enter first name',
    errorMessage: '',
    hint: '',
    validationFn: checkFirstLastNameField,
    isAfterError: false,
  },
  {
    name: inputName.userName,
    label: 'Username',
    value: '',
    maxLength: 20,
    placeholder: 'Please enter username',
    errorMessage: '',
    hint: 'Use 4-20 characters (uppercase, lowercase, numbers)\nSpecial characters:  _ (underscore),- (hyphen), . (dot)\nOnly the Latin alphabet',
    validationFn: checkUserNameField,
    isAfterError: false,
  },
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
];

const LAST_NAME_INDEX = 0;
const FIRST_NAME_INDEX = 1;
const USER_NAME_INDEX = 2;
const PASSWORD_INDEX = 3;

export const AddUserForm: FC<AddUserFormProps> = ({
  onClose,
  onSetTransparent,
}) => {
  const dispatch = useAppDispatch();
  const [addNewUserTrigger, {isLoading}] = useAddNewUserMutation();
  const [checkedRadioValue, setCheckedRadioValue] = useState('User');
  const [isShowConfirm, setShowConfirm] = useState(false);

  const {
    inputData,
    inputsLayout,
    setInputData,
    validate,
    focusInput,
    validateApiErrors,
  } = useInputs(inputs);

  const onCloseForm = () => {
    setShowConfirm(true);
    onSetTransparent(true);
  };

  const changeRadioHandler = (eo: ChangeEvent<HTMLInputElement>) => {
    setCheckedRadioValue(eo.target.value);
  };

  const submitBtnHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    // VALIDATION
    if (validate()) {
      return;
    }

    // VALIDATION PASSED
    try {
      const requestData: NewUser = {
        userName: inputData[USER_NAME_INDEX].value,
        firstName: inputData[FIRST_NAME_INDEX].value,
        lastName: inputData[LAST_NAME_INDEX].value,
        password: inputData[PASSWORD_INDEX].value,
        role: checkedRadioValue,
      };
      await addNewUserTrigger(requestData).unwrap();
      const userName = inputData[USER_NAME_INDEX].value;

      onClose();
      dispatch(
        toastsActions.showToast({
          type: ToastType.Success,
          message: successMessages.addUserForm(userName),
        }),
      );
    } catch (e: any) {
      const {title, errors} = e;

      //IF THERE IS VALIDATION ERRORS
      if (title || errors) {
        if (title === errorMessages.userNameTaken) {
          //RERENDER ALL FORM
          setInputData(
            getNewInputData(inputData, USER_NAME_INDEX, {
              errorMessage: errorMessages.userNameTaken,
              isAfterError: true,
            }),
          );
          //SET ERROR FOCUS
          focusInput(inputData[USER_NAME_INDEX].name);
        }

        if (errors && title === errorMessages.validationErrors) {
          validateApiErrors(errors);
        }
      }
    }
  };

  return (
    <>
      <EmptyForm
        title="Add User"
        isCloseButtonNeeded={true}
        onClose={onCloseForm}
      >
        <form className={styles.form}>
          <>
            {inputsLayout}
            <div className={styles['radio-wrapper']}>
              <p>Please choose role</p>
              <RadioInput
                label="User"
                name="role"
                value="User"
                isChecked={checkedRadioValue === 'User'}
                onChange={changeRadioHandler}
              />
              <RadioInput
                label="Administrator"
                name="role"
                value="Administrator"
                isChecked={checkedRadioValue === 'Administrator'}
                onChange={changeRadioHandler}
              />
            </div>
            <div className={styles['buttons-wrapper']}>
              <SubmitButton
                text={'Cancel'}
                onClick={onCloseForm}
                isSmall={true}
                isSecondary={true}
              />
              <SubmitButton
                text={'Add'}
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
