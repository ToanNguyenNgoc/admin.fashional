import { useCallback, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import queryString from 'query-string'
import { useMutation } from 'react-query'
import { BodyForgot } from 'app/models'
import { _auth } from 'app/apis'
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { useMessage } from 'app/hooks'
import { AxiosError } from 'axios'
import { Snack } from 'app/components'

export function ForgotPassword() {
  const token:any = queryString.parse(useLocation().search).token
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false)
  const { resultLoad, noti, onCloseNoti } = useMessage()
  const [captcha, setCaptcha] = useState('')
  const verifyRecaptchaCallback = useCallback((tokenCaptcha: string) => {
    setCaptcha(tokenCaptcha)
  }, [])
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: BodyForgot) => _auth.forgot(body),
    onSuccess: (data) => {
      setRefreshReCaptcha(r => !r)
      resultLoad({
        message: data.context.message,
        color: 'success',
      })
    },
    onError: (err) => {
      const error = err as AxiosError
      resultLoad({
        message: error.response?.data.message,
        color: 'error'
      })
      setRefreshReCaptcha(r => !r)
    }
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      platform: 'ADMIN',
      password: '',
      password_confirm: ''
    },
    onSubmit: (values) => {
      mutate({
        recaptcha: captcha,
        email: values.email,
        platform: 'ADMIN',
        password: values.password,
        token:token
      })
    }
  })
  console.log(isLoading)
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY || ''}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Snack open={noti.openAlert} onClose={onCloseNoti} severity={noti.color} message={noti.message} />
      {
        !token ?
          <>
            <form
              className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
              noValidate
              id='kt_login_password_reset_form'
              onSubmit={formik.handleSubmit}
            >
              <div className='text-center mb-10'>
                <h1 className='text-dark mb-3'>Quên mật khẩu ?</h1>
                <div className='text-gray-400 fw-bold fs-4'>Nhập địa chỉ Email để thay đổi mật khẩu.</div>
              </div>
              <div className='fv-row mb-10'>
                <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
                <input
                  type='email'
                  placeholder=''
                  autoComplete='off'
                  {...formik.getFieldProps('email')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    { 'is-invalid': formik.touched.email && formik.errors.email },
                    {
                      'is-valid': formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
                <button
                  type='submit'
                  id='kt_password_reset_submit'
                  className='btn btn-lg btn-primary fw-bolder me-4'
                >
                  <span className='indicator-label'>Submit</span>
                  {isLoading && (
                    <span className='indicator-progress'>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
                <Link to='/auth/login'>
                  <button
                    type='button'
                    id='kt_login_password_reset_form_cancel_button'
                    className='btn btn-lg btn-light-primary fw-bolder'
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    Cancel
                  </button>
                </Link>{' '}
              </div>
            </form>
          </>
          :
          <>
            <form
              className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
              noValidate
              id='kt_login_password_reset_form'
              onSubmit={formik.handleSubmit}
            >
              <div className='text-center mb-10'>
                <h1 className='text-dark mb-3'>Thay đổi mật khẩu</h1>
              </div>
              <div className='fv-row mb-10'>
                <label className='form-label fw-bolder text-gray-900 fs-6'>Mật khẩu</label>
                <input
                  type='password'
                  placeholder=''
                  autoComplete='off'
                  {...formik.getFieldProps('password')}
                  className="form-control form-control-lg form-control-solid"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='fv-row mb-10'>
                <label className='form-label fw-bolder text-gray-900 fs-6'>Nhập lại mật khẩu</label>
                <input
                  type='password'
                  placeholder=''
                  autoComplete='off'
                  {...formik.getFieldProps('password_confirm')}
                  className="form-control form-control-lg form-control-solid"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
                <button
                  type='submit'
                  id='kt_password_reset_submit'
                  className='btn btn-lg btn-primary fw-bolder me-4'
                >
                  <span className='indicator-label'>Submit</span>
                  {isLoading && (
                    <span className='indicator-progress'>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </>
      }
      <GoogleReCaptcha refreshReCaptcha={refreshReCaptcha} onVerify={verifyRecaptchaCallback} />
    </GoogleReCaptchaProvider>
  )
}
