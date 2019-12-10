import * as React from "react";
import { PageLayout, useGridState, useSearchApi, FieldSet, SearchCriteriaPanel, DataTable } from "nsitools-react";
import { ETLCodes } from "../../../locales";
import { useTl } from "../../../hooks";
import { EmployeeApi, EmployeeGridDto, EmployeeSearch, EmployeeGridDtoPaginatedResults } from "../../../api";
import { apiConfiguration } from "../../../apiConfig";
import { useHistory } from "react-router";
import { IconNames } from "@blueprintjs/icons";
import { ERoutes } from "../../../AppRouter";
import { Button, Intent } from "@blueprintjs/core";

interface IEmployeeListPageProps {}

export const EmployeeListPage: React.FunctionComponent<IEmployeeListPageProps> = props => {
  const { t } = useTl();
  const history = useHistory();
  const employeeApi = React.useMemo(() => new EmployeeApi(apiConfiguration()), []);

  const tableState = useGridState<EmployeeGridDto>({
    serverMode: true,
    sortKeys: {
      firstName: "ASC"
    }
  });

  const { search, loading } = useSearchApi<EmployeeSearch, EmployeeGridDtoPaginatedResults>({
    searchFunction: React.useCallback(
      (nextSearch?: EmployeeSearch) => {
        return employeeApi.apiEmployeeSearchPost({
          EmployeeSearch: {
            ...nextSearch
          }
        });
      },
      [employeeApi]
    ),
    tableState
  });

  const columns = React.useMemo(
    () => [
      {
        header: () => t(ETLCodes.FirstName),
        fieldName: "firstName"
      },
      {
        header: () => t(ETLCodes.LastName),
        fieldName: "lastName"
      },
      {
        header: () => t(ETLCodes.PhoneNumber),
        fieldName: "phoneNumber"
      },
      {
        header: () => t(ETLCodes.Email),
        fieldName: "email"
      },
      {
        computed: true,
        fieldName: "actions",
        autoFitContent: true,
        render: (data: EmployeeGridDto) => (
          <Button
            icon={IconNames.EDIT}
            minimal={true}
            onClick={() => history.push(`${ERoutes.employee}/${data.employeeId}`)}
          />
        )
      }
    ],
    [history, t]
  );

  return (
    <PageLayout title={t(ETLCodes.Employees)} withCard>
      <FieldSet title={t(ETLCodes.TableCriterias)} collapsable={true}>
        <SearchCriteriaPanel
          searchFunc={() => employeeApi.apiEmployeeCriteriasGet({ includeListsValues: true })}
          onSearch={search}
          triggerInitialSearch={true}
          defaultVisibleCriterias={["LastName"]}
          overrideListValues={{
            CompanyId: e => e.displayValue!
          }}
        ></SearchCriteriaPanel>
      </FieldSet>
      <FieldSet
        title={t(ETLCodes.TableResults)}
        collapsable={true}
        rightElement={
          <>
            <Button
              text={t(ETLCodes.Add)}
              key="AddEmployee"
              intent={Intent.PRIMARY}
              icon={IconNames.PLUS}
              onClick={e => {
                e.stopPropagation();
                history.push(`${ERoutes.employee}/0`);
              }}
            />
          </>
        }
      >
        <DataTable tableState={tableState} loading={loading} columns={columns}></DataTable>
      </FieldSet>
    </PageLayout>
  );
};
