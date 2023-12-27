import {ToastType, toastsActions} from '../../store/slices/toasts-slice';
import {EditTableColumnOrRow, EditTableResp} from '../../types/table';
import {bootCampBoardAPI} from '../api';
import {API_URL} from '../api-url';
import {tableErrors} from '../../constants';

export const editTableRow = bootCampBoardAPI.injectEndpoints({
  endpoints: (builder) => ({
    editTableRow: builder.mutation<EditTableResp, EditTableColumnOrRow>({
      query: (data) => ({
        url: API_URL.editTableRow,
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
