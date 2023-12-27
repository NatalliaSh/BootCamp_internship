import {ToastType, toastsActions} from '../../store/slices/toasts-slice';
import {EditTableCell, EditTableResp} from '../../types/table';
import {bootCampBoardAPI} from '../api';
import {API_URL} from '../api-url';
import {tableErrors} from '../../constants';

export const editTableCell = bootCampBoardAPI.injectEndpoints({
  endpoints: (builder) => ({
    editTableCell: builder.mutation<EditTableResp, EditTableCell>({
      query: (data) => ({
        url: API_URL.editTableCell,
        method: 'PATCH',
        body: data,
      }),

      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          const {status} = e.error;

          dispatch(
            toastsActions.showToast({
              type: ToastType.Error,
              message:
                status === 400
                  ? tableErrors.validationError
                  : status === 409
                  ? tableErrors.concurrencyStampError
                  : tableErrors.otherErrors,
            }),
          );
        }
      },
      invalidatesTags: ['tableData', 'tableFilteredData'],
    }),
  }),
});
