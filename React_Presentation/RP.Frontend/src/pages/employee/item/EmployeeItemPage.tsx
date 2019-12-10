import { Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {
  FGCheckboxInput,
  FGCustomPanel,
  FGDateInput,
  FGSuggestSelectInput,
  FGTextInput,
  FieldGroup,
  FormGenerator,
  PageLayout,
  showError,
  showSuccess,
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
    dateOfBirth: Yup.date()
      .required(t(ETLCodes.ErrorMessage_DateOfBirthRequired))
      .min(new Date(1950, 1, 1), t(ETLCodes.ErrorMessage_DateOfBirthMin))
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
      setSaving(false);
    },
    [employeeApi, employeeId, history, setData, t]
  );

  const [deleting, setDeleting] = React.useState(false);
  const deleteEmployee = React.useCallback(() => {
    try {
      setDeleting(true);
      employeeApi.apiEmployeeEmployeeIdDelete({ employeeId: employeeId });
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
        <FormGenerator
          initialValues={data}
          fill
          onSubmit={(values: EmployeeDto) => save(values)}
          inline
          showColons
          editMode
          minLabelWidth={150}
          labelAlignment="right"
          formatDate="DD/MM/YYYY"
          validationSchema={validationSchema}
          showButtons={false}
        >
          <FieldGroup columns={2} fieldsetProps={{ title: t(ETLCodes.Private) }}>
            <FGTextInput name="firstName" label={t(ETLCodes.FirstName)} requiredMark />
            <FGTextInput name="lastName" label={t(ETLCodes.LastName)} requiredMark />
            <FGTextInput name="phoneNumber" label={t(ETLCodes.PhoneNumber)} requiredMark />
            <FGDateInput
              name="dateOfBirth"
              label={t(ETLCodes.Birthday)}
              requiredMark
              minDate={new Date(1900, 1, 1)}
              maxDate={new Date(2100, 1, 1)}
            />
          </FieldGroup>
          <FieldGroup fieldsetProps={{ title: t(ETLCodes.Work), collapsable: false }}>
            <FGTextInput name="email" label={t(ETLCodes.Email)} requiredMark />
            <FGSuggestSelectInput name="companyId" label={t(ETLCodes.Company)} items={companyItems} />
            <FGCheckboxInput name="active" label={t(ETLCodes.Active)} />
          </FieldGroup>
          <FieldGroup>
            <FGCustomPanel>
              {ctx => (
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
                      onClick={() => ctx.formik.handleSubmit()}
                    />
                  </RightButtons>
                </ButtonContainer>
              )}
            </FGCustomPanel>
          </FieldGroup>
        </FormGenerator>
        //   fieldGroups={[
        //     {
        //       columns: 2,
        //       fieldSetTitle: t(ETLCodes.Private),
        //       fields: [
        //         {
        //           name: "firstName",
        //           type: "text",
        //           label: t(ETLCodes.FirstName),
        //           requiredMark: true,
        //           validate: Yup.string().required("First name is required")
        //         },
        //         {
        //           name: "lastName",
        //           type: "text",
        //           label: t(ETLCodes.LastName),
        //           requiredMark: true,
        //           validate: Yup.string().required("Last name is required")
        //         },
        //         {
        //           name: "phoneNumber",
        //           type: "text",
        //           label: t(ETLCodes.PhoneNumber),
        //           requiredMark: true,
        //           validate: Yup.string().required("Phone number is required")
        //         },
        //         {
        //           name: "dateOfBirth",
        //           type: "date",
        //           label: t(ETLCodes.Birthday),
        //           requiredMark: true,
        //           validate: Yup.date().required("Birthday is required")
        //         }
        //       ]
        //     },
        //     {
        //       columns: 1,
        //       fieldSetTitle: t(ETLCodes.Work),
        //       fields: [
        //         {
        //           name: "email",
        //           type: "text",
        //           label: t(ETLCodes.Email),
        //           requiredMark: true,
        //           validate: Yup.string()
        //             .email()
        //             .required("Email is required")
        //         },
        //         {
        //           name: "companyId",
        //           type: "suggestSelect",
        //           items: companyItems,
        //           label: t(ETLCodes.Company)
        //         },
        //         {
        //           name: "active",
        //           type: "checkbox",
        //           label: t(ETLCodes.Active)
        //         }
        //       ]
        //     }
        //   ]}
        // ></FormGenerator>
        // <Formik
        //   enableReinitialize={true}
        //   initialValues={data}
        //   onSubmit={(values: EmployeeDto) => save(values)}
        //   validationSchema={validationSchema}
        // >
        //   {(formikProps: FormikProps<EmployeeDto>) => (
        //     <>
        //       <Container>
        //         <FormAlignContainer>
        //           <TextInputField
        //             label={t(ETLCodes.FirstName)}
        //             showColon
        //             requiredMark
        //             inline
        //             fill
        //             formikProps={formikProps}
        //             name="firstName"
        //           />
        //           <TextInputField
        //             label={t(ETLCodes.LastName)}
        //             showColon
        //             requiredMark
        //             inline
        //             fill
        //             formikProps={formikProps}
        //             name="lastName"
        //           />
        //           <TextInputField
        //             label={t(ETLCodes.Email)}
        //             showColon
        //             requiredMark
        //             inline
        //             fill
        //             formikProps={formikProps}
        //             name="email"
        //           />
        //           <TextInputField
        //             label={t(ETLCodes.PhoneNumber)}
        //             showColon
        //             requiredMark
        //             inline
        //             fill
        //             formikProps={formikProps}
        //             name="phoneNumber"
        //           />
        //           <SwitchInputField
        //             label={t(ETLCodes.Active)}
        //             showColon
        //             requiredMark
        //             inline
        //             formikProps={formikProps}
        //             name="active"
        //           />
        //           <SuggestSelectBox
        //             label={t(ETLCodes.Company)}
        //             items={companyItems}
        //             showColon
        //             requiredMark
        //             inline
        //             fill
        //             formikProps={formikProps}
        //             name="companyId"
        //           />
        //           <DateInputField
        //             label={t(ETLCodes.Birthday)}
        //             showColon
        //             requiredMark
        //             inline
        //             fill
        //             formikProps={formikProps}
        //             name="dateOfBirth"
        //           />
        //         </FormAlignContainer>
        //       </Container>
        //       <ButtonContainer>
        //         <LeftButtons>
        //           <Button
        //             icon={IconNames.DELETE}
        //             text={t(ETLCodes.Delete)}
        //             intent={Intent.DANGER}
        //             disabled={employeeId <= 0}
        //             loading={deleting}
        //             onClick={deleteEmployee}
        //           />
        //         </LeftButtons>
        //         <RightButtons>
        //           <Button
        //             icon={IconNames.RESET}
        //             text={t(ETLCodes.Cancel)}
        //             intent={Intent.NONE}
        //             onClick={() => {
        //               history.push(ERoutes.employee);
        //             }}
        //           />
        //           <Button
        //             icon={IconNames.FLOPPY_DISK}
        //             text={t(ETLCodes.Save)}
        //             intent={Intent.PRIMARY}
        //             loading={saving}
        //             onClick={() => formikProps.handleSubmit()}
        //           />
        //         </RightButtons>
        //       </ButtonContainer>
        //     </>
        //   )}
        // </Formik>
      )}
    </PageLayout>
  );
};
