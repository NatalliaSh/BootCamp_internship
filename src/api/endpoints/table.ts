import {ToastType, toastsActions} from '../../store/slices/toasts-slice';
import {TableData} from '../../types/table';
import {bootCampBoardAPI} from '../api';
import {API_URL} from '../api-url';

export const tableData = bootCampBoardAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTableData: builder.query<TableData, string>({
      query: (id) => ({
        url: API_URL.tableData(id),
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (e) {
          dispatch(
            toastsActions.showToast({
              type: ToastType.Error,
              message: 'Something went wrong',
            }),
          );
        }
      },
      providesTags: (result) => ['tableData'],
    }),
  }),
});
