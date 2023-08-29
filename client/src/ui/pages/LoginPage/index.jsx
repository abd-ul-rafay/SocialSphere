import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as yup from "yup";
import { loginUser, registerUser } from '../../../state/slices/authSlice';

const registerSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  image: yup.string().required("required"),
});

const initialValuesRegister = {
  fullName: '',
  email: '',
  password: '',
  image: '',
  bio: '',
  location: '',
  dob: '',
  gender: '',
  contact: ''
};

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required")
});

const initialValuesLogin = {
  email: '',
  password: ''
};

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const dispatch = useDispatch();

  const toggleRegisterLogin = (resetForm) => {
    resetForm();
    setIsRegister(value => !value);
  }

  const handleFormSubmit = async (values) => {
    isRegister ? dispatch(registerUser(values)) : dispatch(loginUser(values));
  };

  return (
    <section className='login-container'>
      <div className="login widget">
        <p>Welcome to SocialSphere</p>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isRegister ? initialValuesRegister : initialValuesLogin}
          validationSchema={isRegister ? registerSchema : loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm
          }) => (
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} />
              <p className='error-text'>{touched.email && errors.email}</p>
              <input type="password" name="password" placeholder="Password" onBlur={handleBlur} onChange={handleChange} value={values.password} />
              <p className='error-text'>{touched.password && errors.password}</p>

              {isRegister && (
                <>
                  <input type="text" name="fullName" placeholder="Full Name" onBlur={handleBlur} onChange={handleChange} value={values.fullName} />
                  <p className='error-text'>{touched.fullName && errors.fullName}</p>
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue('image', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div className='dropzone-container' {...getRootProps()}>
                          <input {...getInputProps()} />
                          {!values.image ? (
                            <p style={{ color: 'var(--grey-400)' }}>Add your image here</p>
                          ) : (
                            <p>{values.image.name}</p>
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <p className='error-text'>{touched.image && errors.image}</p>
                  <input type="text" name="bio" placeholder="Your bio" onBlur={handleBlur} onChange={handleChange} value={values.bio} />
                  <input type="text" name="location" placeholder="Location" onBlur={handleBlur} onChange={handleChange} value={values.location} />
                  <input type="text" name="dob" placeholder="Date of Birth" onBlur={handleBlur} onChange={handleChange} value={values.dob} />
                  <input type="text" name="gender" placeholder="Gender" onBlur={handleBlur} onChange={handleChange} value={values.gender} />
                  <input type="text" name="contact" placeholder="Contact" onBlur={handleBlur} onChange={handleChange} value={values.contact} />
                </>
              )}
              <button type='submit'>{isRegister ? 'Register' : 'Login'}</button>
              <p className='toggleLogin' onClick={() => toggleRegisterLogin(resetForm)}>
                {isRegister ? "Already have an Account? Login" : "Don't have an Account? Register"}
              </p>
            </form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default LoginPage;
