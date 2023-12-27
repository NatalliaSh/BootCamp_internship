import {ToastType, toastsActions} from '../../store/slices/toasts-slice';
import {UpdateUserData} from '../../types/api';
import {bootCampBoardAPI} from '../api';
import {API_URL} from '../api-url';

export const editUserPassword = bootCampBoardAPI.injectEndpoints({
  endpoints: (builder) => ({
    editUserPassword: builder.mutation<void, UpdateUserData>({
      query: (userData) => ({
        url: API_URL.updateUserPassword,
        method: 'PATCH',
        body: userData,
      }),

      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          const {status} = e.error;
          if (status !== 400) {
            dispatch(
              toastsActions.showToast({
                type: ToastType.Error,
                message: 'Something went wrong',
              }),
            );
          }
        }
      },

      invalidatesTags: ['users'],
    }),
  }),
});
