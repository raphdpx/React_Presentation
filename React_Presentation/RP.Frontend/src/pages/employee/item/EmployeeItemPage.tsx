import { Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Formik, FormikProps } from "formik";
import {
  DateInputField,
  FormAlignContainer,
  PageLayout,
  showError,
  showSuccess,
  SuggestSelectBox,
  SwitchInputField,
  TextInputField,
  useApiEffect
} from "nsitools-react";
import * as React from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import * as Yup from "yup";

import { EmployeeApi, EmployeeDto, EReferentialTypes } from "../../../api";
import { apiConfiguration } from "../../../apiConfig";
import { ERoutes } from "../../../AppRouter";
import { useTl } from "../../../hooks";
import { useReferential } from "../../../hooks/useReferential";
import { ETLCodes } from "../../../locales";

interface IEmployeeItemPageProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

const LeftButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
  & > * + * {
    margin-left: 1em;
  }
`;

const RightButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 1em;
  & > * + * {
    margin-left: 1em;
  }
`;

export const EmployeeItemPage: React.FunctionComponent<IEmployeeItemPageProps> = props => {
  const { t } = useTl();
  const { id } = useParams<{ id: string }>();
  const employeeId = React.useMemo(() => +id, [id]);
  const employeeApi = React.useMemo(() => new EmployeeApi(apiConfiguration()), []);
  const history = useHistory();

  const [data, loading, , , setData] = useApiEffect<EmployeeDto>(() => {
    if (employeeId > 0) {
      return employeeApi.apiEmployeeEmployeeIdGet({
        employeeId
      });
    } else {
      return {
        employeeId: -1,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyId: 0,
        active: false,
        dateOfBirth: new Date()
      };
    }
  });

  const [companyItems, cLoading] = useReferential({
    referential: EReferentialTypes.Company,
    withNull: true,
    keepStringValue: false
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t(ETLCodes.ErrorMessage_FirstNameRequired)),
    lastName: Yup.string().required(t(ETLCodes.ErrorMessage_LastNameRequired)),
    email: Yup.string().email(t(ETLCodes.ErrorMessage_NotValidEmail)),
    phoneNumber: Yup.string().required(t(ETLCodes.ErrorMessage_PhoneNumberRequired)),
    dateOfBirth: Yup.date().required(t(ETLCodes.ErrorMessage_DateOfBirthRequired))
  });

  const [saving, setSaving] = React.useState(false);
  const save = React.useCallback(
    async (employee: EmployeeDto) => {
      try {
        setSaving(true);
        const savedEmployee = await employeeApi.apiEmployeeSavePost({
          EmployeeDto: employee
        });

        if (employeeId > 0) {
          setData(savedEmployee);
        } else {
          setData(savedEmployee);
          history.push(`${ERoutes.employee}/${savedEmployee.employeeId}`);
        }
        showSuccess(t(ETLCodes.EmployeeSaveSuccess));
      } catch (err) {
        showError(t(ETLCodes.EmployeeSaveError));
      }
    },
    [employeeApi, employeeId, history, setData, t]
  );

  const [deleting, setDeleting] = React.useState(false);
  const deleteEmployee = React.useCallback(async () => {
    try {
      setDeleting(true);
      await employeeApi.apiEmployeeEmployeeIdDelete({ employeeId: employeeId });
    } catch (err) {
      showError(t(ETLCodes.UnableToDelete));
    }
    setDeleting(false);
    history.push(ERoutes.employee);
    showSuccess(t(ETLCodes.DeleteSuccess, { name: `${data ? data.firstName : ""} ${data ? data.lastName : ""}` }));
  }, [data, employeeApi, employeeId, history, t]);

  return (
    <PageLayout
      isLoading={loading && cLoading}
      withCard
      title={
        data && data.firstName !== "" && data.lastName !== ""
          ? `${data.firstName} ${data.lastName}`
          : t(ETLCodes.NewEmployee)
      }
    >
      {!loading && !cLoading && (
        <Formik
          enableReinitialize={true}
          initialValues={data}
          onSubmit={(values: EmployeeDto) => save(values)}
          validationSchema={validationSchema}
        >
          {(formikProps: FormikProps<EmployeeDto>) => (
            <>
              <Container>
                <FormAlignContainer>
                  <TextInputField
                    label={t(ETLCodes.FirstName)}
                    showColon
                    requiredMark
                    inline
                    fill
                    formikProps={formikProps}
                    name="firstName"
                  />
                  <TextInputField
                    label={t(ETLCodes.LastName)}
                    showColon
                    requiredMark
                    inline
                    fill
                    formikProps={formikProps}
                    name="lastName"
                  />
                  <TextInputField
                    label={t(ETLCodes.Email)}
                    showColon
                    requiredMark
                    inline
                    fill
                    formikProps={formikProps}
                    name="email"
                  />
                  <TextInputField
                    label={t(ETLCodes.PhoneNumber)}
                    showColon
                    requiredMark
                    inline
                    fill
                    formikProps={formikProps}
                    name="phoneNumber"
                  />
                  <SwitchInputField
                    label={t(ETLCodes.Active)}
                    showColon
                    requiredMark
                    inline
                    formikProps={formikProps}
                    name="active"
                  />
                  <SuggestSelectBox
                    label={t(ETLCodes.Company)}
                    items={companyItems}
                    showColon
                    requiredMark
                    inline
                    fill
                    formikProps={formikProps}
                    name="companyId"
                  />
                  <DateInputField
                    label={t(ETLCodes.Birthday)}
                    showColon
                    requiredMark
                    inline
                    fill
                    formikProps={formikProps}
                    name="dateOfBirth"
                  />
                </FormAlignContainer>
              </Container>
              <ButtonContainer>
                <LeftButtons>
                  <Button
                    icon={IconNames.DELETE}
                    text={t(ETLCodes.Delete)}
                    intent={Intent.DANGER}
                    disabled={employeeId <= 0}
                    loading={deleting}
                    onClick={deleteEmployee}
                  />
                </LeftButtons>
                <RightButtons>
                  <Button
                    icon={IconNames.RESET}
                    text={t(ETLCodes.Cancel)}
                    intent={Intent.NONE}
                    onClick={() => {
                      history.push(ERoutes.employee);
                    }}
                  />
                  <Button
                    icon={IconNames.FLOPPY_DISK}
                    text={t(ETLCodes.Save)}
                    intent={Intent.PRIMARY}
                    loading={saving}
                    onClick={() => formikProps.handleSubmit()}
                  />
                </RightButtons>
              </ButtonContainer>
            </>
          )}
        </Formik>
      )}
    </PageLayout>
  );
};
