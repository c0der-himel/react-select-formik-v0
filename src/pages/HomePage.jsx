import { useState } from 'react';
import Select from 'react-select';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'chocolate', label: '🍫Chocolate' },
    { value: 'strawberry', label: '🍓Strawberry' },
    { value: 'pizza', label: '🍕Pizza' },
  ];

  console.log('selected option: ', selectedOption);

  const initialValues = {
    option: selectedOption,
  };

  const validationSchema = Yup.object().shape({
    option: Yup.array()
      .min(2, 'select at least 2 options')
      .nullable()
      .required('Required'),
  });

  const onSubmit = (values) => {
    console.log('values: ', values);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="form-content shadow-lg p-5 m-5 rounded-4">
              <div className="row">
                <div className="col">
                  <div className="title text-center mb-4">
                    <h1>React Select</h1>
                    <hr />
                  </div>
                </div>
              </div>
              <Formik
                className="row"
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(props) => {
                  console.log('props: ', props);
                  const { setFieldValue, errors, touched, setFieldTouched } =
                    props;
                  return (
                    <Form>
                      <div className="col-12">
                        <div className="mb-3">
                          <div className="d-flex">
                            <label htmlFor="option" className="form-label ms-1">
                              Select Option
                            </label>
                            <span className="text-danger fw-bold ms-1">*</span>
                          </div>
                          <Select
                            isMulti
                            id="option"
                            name="option"
                            className={
                              errors.option && touched
                                ? 'form-control py-1 px-1 is-invalid'
                                : 'form-control py-1 px-1'
                            }
                            defaultValue={selectedOption}
                            onBlur={() => setFieldTouched('option', true)}
                            onChange={(e) => {
                              setSelectedOption(e);
                              setFieldValue('option', e);
                            }}
                            options={options}
                            placeholder="Select option . . ."
                          />
                          <ErrorMessage
                            name="option"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-dark px-4">
                          Submit
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
