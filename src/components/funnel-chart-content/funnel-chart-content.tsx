import {FC, useState} from 'react';
import {TableToolbar} from '../table-toolbar';
import {useGetTableFilteredDataQuery} from '../../api/endpoints';
import {Table} from '../table';
import {TableFilter} from '../../types/table';
import {tableID, columnID, previewChartDataID} from '../../constants';
import {SubmitButton} from '../submit-button';
import {ModalWindow} from '../modal-window';
import {EmptyForm} from '../empty-form';
import {EmptyFormTypes} from '../empty-form/types';
import {Trapezoid} from '../trapezoid';

export const FunnelChartContent: FC = () => {
  const defaultData: TableFilter = {
    id: tableID.fullDataTable,
    columnId: columnID.releaseFullDataTable,
    filterValue: '3',
  };

  const {data} = useGetTableFilteredDataQuery(defaultData);
  const [isModal, setIsModal] = useState(false);

  const totalData = data
    ? data.rows.find((row) => row.id === previewChartDataID.totalRow)?.cells
    : null;

  const previewChartData = totalData
    ? {
        applications: totalData.find(
          (cell) => cell.columnId === previewChartDataID.applicationsCol,
        )?.value,
        tests: totalData.find(
          (cell) => cell.columnId === previewChartDataID.testsCol,
        )?.value,
        interview: totalData.find(
          (cell) => cell.columnId === previewChartDataID.interviewCol,
        )?.value,
        joinTeam: totalData.find(
          (cell) => cell.columnId === previewChartDataID.joinTeamCol,
        )?.value,
      }
    : null;

  return (
    <>
      <TableToolbar>
        {
          <SubmitButton
            text="Preview chart"
            isSmallSlim={true}
            onClick={() => setIsModal(true)}
          />
        }
      </TableToolbar>
      {data && <Table data={data} isReadOnlyTable={true} withFooter />}
      {isModal && (
        <ModalWindow isVisible={true} isSmallForm={true}>
          <EmptyForm
            title="Funnel chart"
            secondaryTitle={`Release ${defaultData.filterValue}`}
            isCloseButtonNeeded={true}
            onClose={() => setIsModal(false)}
            type={EmptyFormTypes.Chart}
          >
            {previewChartData && <Trapezoid {...previewChartData} />}
          </EmptyForm>
        </ModalWindow>
      )}
    </>
  );
};
